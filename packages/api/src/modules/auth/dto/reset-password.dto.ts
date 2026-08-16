import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token de recuperação recebido por e-mail' })
  @IsString()
  @IsNotEmpty()
  token: string

  @ApiProperty({ example: 'NovaSenha@123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas e números',
  })
  password: string
}
