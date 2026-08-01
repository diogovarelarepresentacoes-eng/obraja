import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty,
  Min,
  Length,
  Matches,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateStoreDto {
  @ApiProperty({ example: 'Materiais Souza' })
  @IsString()
  @IsNotEmpty()
  tradeName: string

  @ApiProperty({ example: 'Materiais Souza Comércio Ltda' })
  @IsString()
  @IsNotEmpty()
  legalName: string

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  cnpj: string

  @ApiPropertyOptional({ example: 'Loja de materiais de construção com atendimento B2B e B2C' })
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

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({ example: 'contato@materiaisouza.com.br' })
  @IsEmail()
  email: string

  @ApiPropertyOptional({ example: 'https://materiaisouza.com.br' })
  @IsOptional()
  @IsString()
  website?: string

  @ApiProperty({ example: 'Rua das Obras' })
  @IsString()
  @IsNotEmpty()
  street: string

  @ApiProperty({ example: '420' })
  @IsString()
  @IsNotEmpty()
  number: string

  @ApiPropertyOptional({ example: 'Loja 2' })
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

  @ApiPropertyOptional({ example: 15, description: 'Raio de entrega em km' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  deliveryRadius?: number

  @ApiPropertyOptional({ example: 9.9, description: 'Taxa de entrega em reais' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  deliveryFee?: number

  @ApiPropertyOptional({ example: 150, description: 'Valor mínimo do pedido em reais' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minimumOrderValue?: number

  @ApiPropertyOptional({ example: true, description: 'Possui frota própria de entrega' })
  @IsOptional()
  @IsBoolean()
  ownDelivery?: boolean

  @ApiPropertyOptional({ example: true, description: 'Aceita entregadores terceiros' })
  @IsOptional()
  @IsBoolean()
  acceptsThirdPartyDelivery?: boolean

  @ApiPropertyOptional({
    example: ['pix', 'credit_card', 'boleto', 'account_credit'],
    type: [String],
    description: 'Métodos de pagamento aceitos',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  paymentMethods?: string[]

  @ApiPropertyOptional({ example: 'Seg-Sex 8h-18h, Sáb 8h-13h' })
  @IsOptional()
  @IsString()
  openingHours?: string
}
