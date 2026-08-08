import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment, PaymentStatus } from './entities/payment.entity'
import { PaymentSplit, SplitRecipientType, SplitStatus } from './entities/payment-split.entity'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentMethod } from '../orders/entities/order.entity'

const COMMISSION_RATES: Record<string, number> = {
  store_consumer: 0.10,
  store_contractor: 0.06,
  industry_store: 0.04,
  industry_contractor: 0.04,
}

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(PaymentSplit) private readonly splitRepo: Repository<PaymentSplit>,
  ) {}

  async createPayment(dto: CreatePaymentDto, sellerId: string, sellerType: string): Promise<Payment> {
    const payment = await this.paymentRepo.save(this.paymentRepo.create({
      orderId: dto.orderId,
      amount: dto.amount,
      method: dto.method,
      status: PaymentStatus.PENDING,
    }))

    const commissionKey = `${sellerType}_consumer`
    const commissionRate = COMMISSION_RATES[commissionKey] ?? 0.08
    const platformAmount = dto.amount * commissionRate
    const sellerAmount = dto.amount - platformAmount

    await this.splitRepo.save([
      this.splitRepo.create({
        paymentId: payment.id,
        recipientId: sellerId,
        recipientType: sellerType as SplitRecipientType,
        amount: sellerAmount,
        commissionRate: 1 - commissionRate,
        status: SplitStatus.PENDING,
      }),
      this.splitRepo.create({
        paymentId: payment.id,
        recipientId: 'platform',
        recipientType: SplitRecipientType.PLATFORM,
        amount: platformAmount,
        commissionRate,
        status: SplitStatus.PENDING,
      }),
    ])

    return this.findOne(payment.id)
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { id }, relations: { splits: true } })
    if (!payment) throw new NotFoundException('Pagamento não encontrado')
    return payment
  }

  async findByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentRepo.find({ where: { orderId }, relations: { splits: true } })
  }

  async handleWebhook(gatewayId: string, status: string, raw: Record<string, unknown>): Promise<void> {
    const payment = await this.paymentRepo.findOne({ where: { gatewayId } })
    if (!payment) return

    const newStatus = status === 'paid' ? PaymentStatus.PAID
      : status === 'failed' ? PaymentStatus.FAILED
      : PaymentStatus.PROCESSING

    const updatePayload: Partial<Payment> = { status: newStatus, gatewayResponse: raw }
    if (newStatus === PaymentStatus.PAID) updatePayload.paidAt = new Date()
    if (newStatus === PaymentStatus.FAILED) updatePayload.failedAt = new Date()

    await this.paymentRepo.update(payment.id, updatePayload as any)

    if (newStatus === PaymentStatus.PAID) {
      await this.splitRepo.update({ paymentId: payment.id }, { status: SplitStatus.TRANSFERRED })
    }
  }
}
