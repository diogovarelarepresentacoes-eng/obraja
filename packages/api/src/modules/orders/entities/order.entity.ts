import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { OrderItem } from './order-item.entity'

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  IN_DELIVERY = 'in_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BOLETO = 'boleto',
  INVOICE = 'invoice',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum DeliveryMethod {
  OWN = 'own',
  THIRD_PARTY = 'third_party',
  PICKUP = 'pickup',
}

export enum BuyerType {
  CONSUMER = 'consumer',
  CONTRACTOR = 'contractor',
}

@Entity('orders')
@Index(['buyerId', 'status'])
@Index(['createdAt'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'buyer_id' })
  buyerId: string

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'buyer_id' })
  buyer: User

  @Column({ name: 'buyer_type', type: 'enum', enum: BuyerType })
  buyerType: BuyerType

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[]

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number

  @Column({ name: 'delivery_fee', type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveryFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number

  @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod

  @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus

  @Column({ name: 'delivery_method', type: 'enum', enum: DeliveryMethod, default: DeliveryMethod.OWN })
  deliveryMethod: DeliveryMethod

  @Column({ name: 'delivery_address', type: 'jsonb', nullable: true })
  deliveryAddress?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    lat?: number
    lng?: number
  }

  @Column({ name: 'delivery_notes', nullable: true, type: 'text' })
  deliveryNotes?: string

  @Column({ name: 'coupon_code', nullable: true })
  couponCode?: string

  @Column({ name: 'estimated_delivery_at', nullable: true })
  estimatedDeliveryAt?: Date

  @Column({ name: 'delivered_at', nullable: true })
  deliveredAt?: Date

  @Column({ name: 'cancelled_at', nullable: true })
  cancelledAt?: Date

  @Column({ name: 'cancellation_reason', nullable: true, type: 'text' })
  cancellationReason?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
