import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { PaymentMethod } from '../../orders/entities/order.entity'
import { PaymentSplit } from './payment-split.entity'

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

@Entity('payments')
@Index(['orderId'])
@Index(['status'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'order_id' })
  orderId: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus

  @Column({ name: 'gateway_id', nullable: true })
  gatewayId?: string

  @Column({ name: 'gateway_name', nullable: true })
  gatewayName?: string

  @Column({ name: 'gateway_response', type: 'jsonb', nullable: true })
  gatewayResponse?: Record<string, unknown>

  @Column({ name: 'pix_qrcode', nullable: true, type: 'text' })
  pixQrcode?: string

  @Column({ name: 'pix_copy_paste', nullable: true, type: 'text' })
  pixCopyPaste?: string

  @Column({ name: 'boleto_url', nullable: true })
  boletoUrl?: string

  @Column({ name: 'boleto_barcode', nullable: true })
  boletoBarcode?: string

  @Column({ name: 'boleto_due_date', nullable: true })
  boletoDueDate?: Date

  @OneToMany(() => PaymentSplit, (s) => s.payment, { cascade: true })
  splits: PaymentSplit[]

  @Column({ name: 'paid_at', nullable: true })
  paidAt?: Date

  @Column({ name: 'failed_at', nullable: true })
  failedAt?: Date

  @Column({ name: 'refunded_at', nullable: true })
  refundedAt?: Date

  @Column({ name: 'refunded_amount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  refundedAmount?: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
