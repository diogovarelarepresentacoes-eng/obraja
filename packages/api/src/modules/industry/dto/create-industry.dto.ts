import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsPositive,
  Matches,
  Length,
  Min,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateIndustryDto {
  @ApiProperty({ example: 'Cimentos Brasil' })
  @IsString()
  @IsNotEmpty()
  tradeName: string

  @ApiProperty({ example: 'Cimentos Brasil Indústria e Comércio Ltda' })
  @IsString()
  @IsNotEmpty()
  legalName: string

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  cnpj: string

  @ApiPropertyOptional({ example: 'Fabricante de cimentos e argamassas há 30 anos' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverUrl?: string

  @ApiProperty({ example: 'Av. Industrial' })
  @IsString()
  @IsNotEmpty()
  street: string

  @ApiProperty({ example: '1500' })
  @IsString()
  @IsNotEmpty()
  number: string

  @ApiPropertyOptional({ example: 'Galpão B' })
  @IsOptional()
  @IsString()
  complement?: string

  @ApiProperty({ example: 'Distrito Industrial' })
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

  @ApiPropertyOptional({ example: '500 sacas/dia' })
  @IsOptional()
  @IsString()
  productionCapacity?: string

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  minimumOrderValue?: number

  @ApiPropertyOptional({ example: '30/60 dias' })
  @IsOptional()
  @IsString()
  paymentTerms?: string

  @ApiPropertyOptional({ example: ['ISO 9001', 'ABNT NBR 5732'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[]
}
