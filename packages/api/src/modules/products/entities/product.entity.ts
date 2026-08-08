import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm'
import { Category } from './category.entity'
import { ProductImage } from './product-image.entity'
import { ProductVariant } from './product-variant.entity'

export enum SellerType {
  STORE = 'store',
  INDUSTRY = 'industry',
}

export enum ProductUnit {
  KG = 'kg',
  G = 'g',
  TON = 't',
  M = 'm',
  M2 = 'm2',
  M3 = 'm3',
  L = 'l',
  ML = 'ml',
  UN = 'un',
  CX = 'cx',
  SC = 'sc',
  BLD = 'bld',
  PC = 'pc',
  ROLO = 'rolo',
  FARDO = 'fardo',
}

@Entity('products')
@Index(['sellerId', 'sellerType'])
@Index(['categoryId'])
@Index(['isActive', 'isApproved'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'seller_id' })
  sellerId: string

  @Column({ name: 'seller_type', type: 'enum', enum: SellerType })
  sellerType: SellerType

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => Category, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[]

  @OneToMany(() => ProductVariant, (v) => v.product, { cascade: true })
  variants: ProductVariant[]

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ nullable: true, type: 'text' })
  description?: string

  @Column({ nullable: true })
  sku?: string

  @Column({ nullable: true })
  brand?: string

  @Column({ name: 'ncm_code', nullable: true, length: 8 })
  ncmCode?: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number

  @Column({ name: 'price_b2b', type: 'decimal', precision: 12, scale: 2, nullable: true })
  priceB2B?: number

  @Column({ type: 'enum', enum: ProductUnit, default: ProductUnit.UN })
  unit: ProductUnit

  @Column({ name: 'minimum_quantity', type: 'decimal', precision: 10, scale: 3, default: 1 })
  minimumQuantity: number

  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  stock: number

  @Column({ name: 'weight_kg', type: 'decimal', precision: 10, scale: 3, nullable: true })
  weightKg?: number

  @Column({ name: 'length_cm', type: 'decimal', precision: 8, scale: 2, nullable: true })
  lengthCm?: number

  @Column({ name: 'width_cm', type: 'decimal', precision: 8, scale: 2, nullable: true })
  widthCm?: number

  @Column({ name: 'height_cm', type: 'decimal', precision: 8, scale: 2, nullable: true })
  heightCm?: number

  @Column({ name: 'attributes', type: 'jsonb', nullable: true })
  attributes?: Record<string, string | number>

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number

  @Column({ name: 'total_reviews', default: 0 })
  totalReviews: number

  @Column({ name: 'total_sold', default: 0 })
  totalSold: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_approved', default: false })
  isApproved: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
