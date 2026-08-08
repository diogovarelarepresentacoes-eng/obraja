import {
  IsEnum, IsNumber, IsOptional, IsString, IsArray, ValidateNested, Min, IsUUID,
} from 'class-validator'
import { Type } from 'class-transformer'
import { PaymentMethod, DeliveryMethod, BuyerType } from '../entities/order.entity'

export class DeliveryAddressDto {
  @IsString() street: string
  @IsString() number: string
  @IsOptional() @IsString() complement?: string
  @IsString() neighborhood: string
  @IsString() city: string
  @IsString() state: string
  @IsString() zipCode: string
}

export class CreateOrderItemDto {
  @IsUUID() productId: string
  @IsOptional() @IsUUID() variantId?: string
  @IsUUID() sellerId: string
  @IsNumber() @Min(0.001) quantity: number
}

export class CreateOrderDto {
  @IsEnum(BuyerType)
  buyerType: BuyerType

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsEnum(DeliveryMethod)
  deliveryMethod: DeliveryMethod

  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress?: DeliveryAddressDto

  @IsOptional()
  @IsString()
  deliveryNotes?: string

  @IsOptional()
  @IsString()
  couponCode?: string
}

export class AddToCartDto {
  @IsUUID() productId: string
  @IsOptional() @IsUUID() variantId?: string
  @IsUUID() sellerId: string
  @IsNumber() @Min(0.001) quantity: number
}
