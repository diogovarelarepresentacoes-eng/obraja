import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from './order.entity'
import { SellerType } from '../../products/entities/product.entity'

export enum OrderItemStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'order_id' })
  orderId: string

  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column({ name: 'product_id' })
  productId: string

  @Column({ name: 'variant_id', nullable: true })
  variantId?: string

  @Column({ name: 'seller_id' })
  sellerId: string

  @Column({ name: 'seller_type', type: 'enum', enum: SellerType })
  sellerType: SellerType

  @Column({ name: 'product_name' })
  productName: string

  @Column({ name: 'product_sku', nullable: true })
  productSku?: string

  @Column({ name: 'product_unit', nullable: true })
  productUnit?: string

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantity: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number

  @Column({ type: 'enum', enum: OrderItemStatus, default: OrderItemStatus.PENDING })
  status: OrderItemStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
