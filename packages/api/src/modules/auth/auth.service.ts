import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { User, UserRole } from '../users/entities/user.entity'

const BCRYPT_ROUNDS = 12

export interface AuthTokens {
  accessToken: string
  user: Omit<User, 'passwordHash'>
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthTokens> {
    const existing = await this.usersService.findByEmail(dto.email)
    if (existing) {
      throw new ConflictException('Email já cadastrado')
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS)

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      role: dto.role,
    })

    const accessToken = this.generateToken(user.id, user.role)
    const { passwordHash: _, ...safeUser } = user as User & { passwordHash: string }

    return { accessToken, user: safeUser as Omit<User, 'passwordHash'> }
  }

  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash)
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada')
    }

    const accessToken = this.generateToken(user.id, user.role)
    const { passwordHash: _, ...safeUser } = user as User & { passwordHash: string }

    return { accessToken, user: safeUser as Omit<User, 'passwordHash'> }
  }

  generateToken(userId: string, role: UserRole | string): string {
    return this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '7d' },
    )
  }
}
