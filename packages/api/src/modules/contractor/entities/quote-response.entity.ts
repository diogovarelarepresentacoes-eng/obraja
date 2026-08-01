import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

export enum SellerType {
  STORE = 'store',
  INDUSTRY = 'industry',
}

export enum QuoteResponseStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface QuoteResponseItem {
  productName: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

@Entity('quote_responses')
export class QuoteResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'quote_request_id' })
  quoteRequestId: string

  @Column({ name: 'seller_id' })
  sellerId: string

  @Column({ name: 'seller_type', type: 'enum', enum: SellerType })
  sellerType: SellerType

  @Column({ type: 'jsonb' })
  items: QuoteResponseItem[]

  @Column({ name: 'total_value', type: 'decimal', precision: 12, scale: 2 })
  totalValue: number

  @Column({ name: 'delivery_days' })
  deliveryDays: number

  @Column({ name: 'payment_terms' })
  paymentTerms: string

  @Column({ nullable: true, type: 'text' })
  notes?: string

  @Column({
    type: 'enum',
    enum: QuoteResponseStatus,
    default: QuoteResponseStatus.PENDING,
  })
  status: QuoteResponseStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
