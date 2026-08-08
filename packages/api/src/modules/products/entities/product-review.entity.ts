import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Product } from './product.entity'

@Entity('product_reviews')
@Index(['productId', 'userId'], { unique: true })
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'order_id', nullable: true })
  orderId?: string

  @Column({ type: 'smallint' })
  rating: number

  @Column({ nullable: true, type: 'text' })
  comment?: string

  @Column({ name: 'is_verified_purchase', default: false })
  isVerifiedPurchase: boolean

  @Column({ name: 'is_approved', default: true })
  isApproved: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
