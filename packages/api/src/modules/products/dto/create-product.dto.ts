import {
  IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsUUID, Min,
} from 'class-validator'
import { SellerType, ProductUnit } from '../entities/product.entity'

export class CreateProductDto {
  @IsUUID()
  categoryId: string

  @IsString()
  name: string

  @IsString()
  slug: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  sku?: string

  @IsOptional()
  @IsString()
  brand?: string

  @IsNumber()
  @Min(0)
  price: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceB2B?: number

  @IsOptional()
  @IsEnum(ProductUnit)
  unit?: ProductUnit

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumQuantity?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number

  @IsOptional()
  @IsNumber()
  weightKg?: number

  @IsOptional()
  attributes?: Record<string, string | number>
}

export class UpdateProductDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceB2B?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  attributes?: Record<string, string | number>
}
