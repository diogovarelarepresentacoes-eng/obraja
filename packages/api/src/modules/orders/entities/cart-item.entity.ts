import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Cart } from './cart.entity'
import { SellerType } from '../../products/entities/product.entity'

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'cart_id' })
  cartId: string

  @ManyToOne(() => Cart, (c) => c.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart

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

  @Column({ name: 'product_unit', nullable: true })
  productUnit?: string

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantity: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
