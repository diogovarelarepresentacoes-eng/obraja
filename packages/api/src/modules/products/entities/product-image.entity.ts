import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, (p) => p.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  url: string

  @Column({ name: 'alt_text', nullable: true })
  altText?: string

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean
}
