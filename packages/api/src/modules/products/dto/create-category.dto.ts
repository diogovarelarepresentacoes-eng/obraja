import { IsString, IsOptional, IsBoolean, IsNumber, IsUUID } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  name: string

  @IsString()
  slug: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  iconUrl?: string

  @IsOptional()
  @IsUUID()
  parentId?: string

  @IsOptional()
  @IsNumber()
  displayOrder?: number

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
