import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Payment } from './payment.entity'

export enum SplitRecipientType {
  STORE = 'store',
  INDUSTRY = 'industry',
  PLATFORM = 'platform',
}

export enum SplitStatus {
  PENDING = 'pending',
  TRANSFERRED = 'transferred',
  FAILED = 'failed',
}

@Entity('payment_splits')
export class PaymentSplit {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'payment_id' })
  paymentId: string

  @ManyToOne(() => Payment, (p) => p.splits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment

  @Column({ name: 'recipient_id' })
  recipientId: string

  @Column({ name: 'recipient_type', type: 'enum', enum: SplitRecipientType })
  recipientType: SplitRecipientType

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 4 })
  commissionRate: number

  @Column({ type: 'enum', enum: SplitStatus, default: SplitStatus.PENDING })
  status: SplitStatus

  @Column({ name: 'transfer_id', nullable: true })
  transferId?: string

  @Column({ name: 'transferred_at', nullable: true })
  transferredAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
