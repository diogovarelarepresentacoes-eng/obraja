import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '../users/users.module'
import { AuditModule } from '../audit/audit.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { EmailService } from '../../common/services/email.service'
import { RefreshToken } from './entities/refresh-token.entity'
import { PasswordResetToken } from './entities/password-reset-token.entity'

@Module({
  imports: [
    UsersModule,
    AuditModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([RefreshToken, PasswordResetToken]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, EmailService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
