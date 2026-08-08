import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, (p) => p.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  name: string

  @Column({ nullable: true })
  sku?: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number

  @Column({ name: 'price_b2b', type: 'decimal', precision: 12, scale: 2, nullable: true })
  priceB2B?: number

  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  stock: number

  @Column({ name: 'attributes', type: 'jsonb', nullable: true })
  attributes?: Record<string, string | number>

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
