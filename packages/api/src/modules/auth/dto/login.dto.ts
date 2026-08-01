import { IsEmail, IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'joao@empresa.com.br' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Senha@123' })
  @IsString()
  @IsNotEmpty()
  password: string
}
