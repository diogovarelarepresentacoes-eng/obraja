import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  Matches,
  Length,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateContractorDto {
  @ApiProperty({ example: 'Construtora ABC' })
  @IsString()
  @IsNotEmpty()
  tradeName: string

  @ApiProperty({ example: 'Construtora ABC Ltda' })
  @IsString()
  @IsNotEmpty()
  legalName: string

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  cnpj: string

  @ApiPropertyOptional({ example: 'Construtora com 20 anos de mercado' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string

  @ApiProperty({ example: 'Rua das Obras' })
  @IsString()
  @IsNotEmpty()
  street: string

  @ApiProperty({ example: '200' })
  @IsString()
  @IsNotEmpty()
  number: string

  @ApiPropertyOptional({ example: 'Sala 5' })
  @IsOptional()
  @IsString()
  complement?: string

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty({ example: 'SP', maxLength: 2 })
  @IsString()
  @Length(2, 2)
  state: string

  @ApiProperty({ example: '01310-100' })
  @IsString()
  @Matches(/^\d{5}-\d{3}$|^\d{8}$/, { message: 'CEP inválido' })
  zipCode: string

  @ApiPropertyOptional({ example: -23.5505 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lat?: number

  @ApiPropertyOptional({ example: -46.6333 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lng?: number

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  creditLimit?: number

  @ApiPropertyOptional({ example: '30 dias' })
  @IsOptional()
  @IsString()
  preferredPaymentTerms?: string
}
