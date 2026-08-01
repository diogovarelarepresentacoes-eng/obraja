import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { UserRole } from '../../users/entities/user.entity'

export class RegisterDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'joao@empresa.com.br' })
  @IsEmail()
  email: string

  @ApiProperty({ example: '+5511999999999' })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({ example: 'Senha@123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string

  @ApiProperty({ enum: UserRole, example: UserRole.CONSUMER })
  @IsEnum(UserRole)
  role: UserRole

  @ApiPropertyOptional({ example: '12.345.678/0001-90', description: 'CNPJ para lojas, indústrias e construtoras' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, {
    message: 'cnpj deve estar no formato 00.000.000/0000-00 ou 14 dígitos',
  })
  cnpj?: string
}
