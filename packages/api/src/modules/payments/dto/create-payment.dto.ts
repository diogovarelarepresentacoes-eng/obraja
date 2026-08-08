import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { PaymentMethod } from '../../orders/entities/order.entity'

export class CreatePaymentDto {
  @IsUUID()
  orderId: string

  @IsNumber()
  @Min(0.01)
  amount: number

  @IsEnum(PaymentMethod)
  method: PaymentMethod
}

export class WebhookPaymentDto {
  @IsString()
  gatewayId: string

  @IsString()
  status: string

  @IsOptional()
  gatewayResponse?: Record<string, unknown>
}
