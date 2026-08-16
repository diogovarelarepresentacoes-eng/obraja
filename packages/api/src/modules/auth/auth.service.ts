import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createHash, randomBytes } from 'crypto'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { AuditService } from '../audit/audit.service'
import { AuditAction } from '../audit/audit-log.entity'
import { EmailService } from '../../common/services/email.service'
import { RefreshToken } from './entities/refresh-token.entity'
import { PasswordResetToken } from './entities/password-reset-token.entity'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { User, UserRole } from '../users/entities/user.entity'

const BCRYPT_ROUNDS = 12
const REFRESH_TOKEN_BYTES = 32
const RESET_TOKEN_BYTES = 32
const REFRESH_TTL_DAYS = 30
const RESET_TTL_MINUTES = 60

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  user: Omit<User, 'passwordHash'>
}

export interface AuditCtx {
  ipAddress?: string
  userAgent?: string
}

function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex')
}

function safeUser(user: User): Omit<User, 'passwordHash'> {
  const { passwordHash: _, ...safe } = user as User & { passwordHash: string }
  return safe as Omit<User, 'passwordHash'>
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
    private readonly emailService: EmailService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    @InjectRepository(PasswordResetToken)
    private readonly resetTokenRepo: Repository<PasswordResetToken>,
  ) {}

  // ─── Register ─────────────────────────────────────────────────────────────

  async register(dto: RegisterDto, ctx: AuditCtx = {}): Promise<AuthTokens> {
    const existing = await this.usersService.findByEmail(dto.email)
    if (existing) throw new ConflictException('Email já cadastrado')

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS)
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      role: dto.role,
    })

    this.auditService.log(AuditAction.REGISTER, {
      userId: user.id,
      email: user.email,
      ...ctx,
    })

    const accessToken = this.generateAccessToken(user.id, user.role)
    const refreshToken = await this.createRefreshToken(user.id, ctx)

    return { accessToken, refreshToken, user: safeUser(user) }
  }

  // ─── Login ────────────────────────────────────────────────────────────────

  async login(dto: LoginDto, ctx: AuditCtx = {}): Promise<AuthTokens> {
    const user = await this.usersService.findByEmail(dto.email)
    const passwordMatch = user
      ? await bcrypt.compare(dto.password, user.passwordHash)
      : false

    if (!user || !passwordMatch) {
      this.auditService.log(AuditAction.LOGIN_FAILED, { email: dto.email, ...ctx })
      throw new UnauthorizedException('Credenciais inválidas')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada. Entre em contato com o suporte.')
    }

    this.auditService.log(AuditAction.LOGIN_SUCCESS, {
      userId: user.id,
      email: user.email,
      ...ctx,
    })

    const accessToken = this.generateAccessToken(user.id, user.role)
    const refreshToken = await this.createRefreshToken(user.id, ctx)

    return { accessToken, refreshToken, user: safeUser(user) }
  }

  // ─── Refresh ──────────────────────────────────────────────────────────────

  async refresh(rawToken: string, ctx: AuditCtx = {}): Promise<AuthTokens> {
    const tokenHash = hashToken(rawToken)
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
      relations: { user: true },
    })

    if (!stored || stored.revokedAt || new Date() > stored.expiresAt) {
      throw new UnauthorizedException('Refresh token inválido ou expirado')
    }

    if (!stored.user.isActive) {
      throw new UnauthorizedException('Conta desativada')
    }

    // Rotate: revoke old token
    stored.revokedAt = new Date()
    await this.refreshTokenRepo.save(stored)

    const user = stored.user
    this.auditService.log(AuditAction.TOKEN_REFRESH, { userId: user.id, ...ctx })

    const accessToken = this.generateAccessToken(user.id, user.role)
    const refreshToken = await this.createRefreshToken(user.id, ctx)

    return { accessToken, refreshToken, user: safeUser(user) }
  }

  // ─── Logout ───────────────────────────────────────────────────────────────

  async logout(userId: string, rawRefreshToken?: string, ctx: AuditCtx = {}): Promise<void> {
    // Revoke the specific refresh token
    if (rawRefreshToken) {
      const tokenHash = hashToken(rawRefreshToken)
      await this.refreshTokenRepo.update({ tokenHash, userId }, { revokedAt: new Date() })
    }

    // Mark user's lastLogoutAt so all access tokens issued before now are invalidated
    await this.usersService.update(userId, { lastLogoutAt: new Date() })

    this.auditService.log(AuditAction.LOGOUT, { userId, ...ctx })
  }

  async logoutAll(userId: string, ctx: AuditCtx = {}): Promise<void> {
    // Revoke all active refresh tokens (where revokedAt IS NULL)
    await this.refreshTokenRepo
      .createQueryBuilder()
      .update()
      .set({ revokedAt: new Date() })
      .where('userId = :userId AND revokedAt IS NULL', { userId })
      .execute()

    // Invalidate all access tokens
    await this.usersService.update(userId, { lastLogoutAt: new Date() })

    this.auditService.log(AuditAction.LOGOUT_ALL, { userId, ...ctx })
  }

  // ─── Forgot Password ──────────────────────────────────────────────────────

  async forgotPassword(email: string, ctx: AuditCtx = {}): Promise<void> {
    const user = await this.usersService.findByEmail(email)

    // Always respond generically — never reveal if email exists
    if (!user || !user.isActive) {
      // Log attempt but return without error
      this.auditService.log(AuditAction.PASSWORD_RESET_REQUESTED, { email, ...ctx })
      return
    }

    // Invalidate previous reset tokens for this user
    await this.resetTokenRepo
      .createQueryBuilder()
      .update()
      .set({ usedAt: new Date() })
      .where('userId = :userId AND usedAt IS NULL', { userId: user.id })
      .execute()

    const rawToken = randomBytes(RESET_TOKEN_BYTES).toString('hex')
    const tokenHash = hashToken(rawToken)
    const expiresAt = new Date(Date.now() + RESET_TTL_MINUTES * 60 * 1000)

    await this.resetTokenRepo.save(
      this.resetTokenRepo.create({
        tokenHash,
        userId: user.id,
        expiresAt,
        ipAddress: ctx.ipAddress,
      }),
    )

    await this.emailService.sendPasswordReset(user.email, user.name, rawToken)

    this.auditService.log(AuditAction.PASSWORD_RESET_REQUESTED, {
      userId: user.id,
      email: user.email,
      ...ctx,
    })
  }

  // ─── Reset Password ───────────────────────────────────────────────────────

  async resetPassword(rawToken: string, newPassword: string, ctx: AuditCtx = {}): Promise<void> {
    const tokenHash = hashToken(rawToken)
    const stored = await this.resetTokenRepo.findOne({
      where: { tokenHash },
      relations: { user: true },
    })

    if (!stored || stored.usedAt || new Date() > stored.expiresAt) {
      throw new BadRequestException('Token inválido ou expirado')
    }

    const user = stored.user
    if (!user.isActive) throw new UnauthorizedException('Conta desativada')

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)

    // Mark token as used
    stored.usedAt = new Date()
    await this.resetTokenRepo.save(stored)

    // Update password and invalidate all sessions
    await this.usersService.updatePassword(user.id, passwordHash)
    await this.usersService.update(user.id, { lastLogoutAt: new Date() })

    // Revoke all refresh tokens
    await this.refreshTokenRepo.update({ userId: user.id }, { revokedAt: new Date() })

    // Notify user
    this.emailService.sendPasswordChanged(user.email, user.name).catch(() => null)

    this.auditService.log(AuditAction.PASSWORD_RESET_COMPLETED, {
      userId: user.id,
      email: user.email,
      ...ctx,
    })
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  generateAccessToken(userId: string, role: UserRole | string): string {
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '15m'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.jwtService.sign({ sub: userId, role }, { expiresIn: expiresIn as any })
  }

  private async createRefreshToken(userId: string, ctx: AuditCtx): Promise<string> {
    const rawToken = randomBytes(REFRESH_TOKEN_BYTES).toString('hex')
    const tokenHash = hashToken(rawToken)
    const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000)

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        tokenHash,
        userId,
        expiresAt,
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
      }),
    )

    return rawToken
  }
}
