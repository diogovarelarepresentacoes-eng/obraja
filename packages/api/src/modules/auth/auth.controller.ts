import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import type { User } from '../users/entities/user.entity'

function auditCtx(req: Request) {
  return {
    ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip,
    userAgent: req.headers['user-agent'],
  }
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiConflictResponse({ description: 'Email já cadastrado' })
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    return this.authService.register(dto, auditCtx(req))
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiOkResponse({ description: 'Login realizado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, auditCtx(req))
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token usando refresh token' })
  @ApiOkResponse({ description: 'Tokens renovados com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Refresh token inválido ou expirado' })
  async refresh(@Body() dto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refresh(dto.refreshToken, auditCtx(req))
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout — revoga o refresh token atual' })
  async logout(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request & { user: User },
  ) {
    await this.authService.logout(req.user.id, dto.refreshToken, auditCtx(req))
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout em todos os dispositivos' })
  async logoutAll(@Req() req: Request & { user: User }) {
    await this.authService.logoutAll(req.user.id, auditCtx(req))
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar link de recuperação de senha' })
  @ApiOkResponse({ description: 'Se o e-mail existir, um link será enviado' })
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: Request) {
    await this.authService.forgotPassword(dto.email, auditCtx(req))
    return { message: 'Se existir uma conta associada a este e-mail, você receberá um link para redefinir sua senha.' }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Redefinir senha com token de recuperação' })
  @ApiOkResponse({ description: 'Senha redefinida com sucesso' })
  @ApiBadRequestResponse({ description: 'Token inválido ou expirado' })
  async resetPassword(@Body() dto: ResetPasswordDto, @Req() req: Request) {
    await this.authService.resetPassword(dto.token, dto.password, auditCtx(req))
    return { message: 'Senha redefinida com sucesso. Faça login com sua nova senha.' }
  }
}
