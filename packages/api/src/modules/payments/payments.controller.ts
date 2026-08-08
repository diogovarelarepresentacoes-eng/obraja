import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { CreatePaymentDto, WebhookPaymentDto } from './dto/create-payment.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.findByOrder(orderId)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id)
  }

  @Post('webhook')
  webhook(@Body() dto: WebhookPaymentDto) {
    return this.paymentsService.handleWebhook(dto.gatewayId, dto.status, dto.gatewayResponse ?? {})
  }
}
