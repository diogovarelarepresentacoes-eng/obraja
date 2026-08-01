import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity('industries')
export class Industry {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @OneToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'trade_name' })
  tradeName: string

  @Column({ name: 'legal_name' })
  legalName: string

  @Column({ unique: true })
  cnpj: string

  @Column({ nullable: true, type: 'text' })
  description?: string

  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string

  @Column({ name: 'cover_url', nullable: true })
  coverUrl?: string

  @Column()
  street: string

  @Column()
  number: string

  @Column({ nullable: true })
  complement?: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column({ length: 2 })
  state: string

  @Column({ name: 'zip_code', length: 9 })
  zipCode: string

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lat?: number

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lng?: number

  @Column({ name: 'production_capacity', nullable: true })
  productionCapacity?: string

  @Column({ name: 'minimum_order_value', type: 'decimal', precision: 12, scale: 2, nullable: true })
  minimumOrderValue?: number

  @Column({ name: 'payment_terms', nullable: true })
  paymentTerms?: string

  @Column({ type: 'simple-array', nullable: true })
  certifications?: string[]

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number

  @Column({ name: 'total_reviews', default: 0 })
  totalReviews: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_approved', default: false })
  isApproved: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
