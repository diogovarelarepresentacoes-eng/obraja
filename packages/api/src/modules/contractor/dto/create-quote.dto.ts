import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class QuoteItemDto {
  @ApiProperty({ example: 'Cimento CP-II 50kg' })
  @IsString()
  @IsNotEmpty()
  productName: string

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number

  @ApiProperty({ example: 'saca' })
  @IsString()
  @IsNotEmpty()
  unit: string

  @ApiPropertyOptional({ example: 'Preferência por CP-II-F-32' })
  @IsOptional()
  @IsString()
  description?: string
}

export class CreateQuoteDto {
  @ApiProperty({ type: [QuoteItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items: QuoteItemDto[]

  @ApiProperty({ example: '2026-08-31T00:00:00.000Z' })
  @IsDateString()
  deadline: string

  @ApiPropertyOptional({ example: 'Entrega no canteiro de obras em SP' })
  @IsOptional()
  @IsString()
  notes?: string
}
