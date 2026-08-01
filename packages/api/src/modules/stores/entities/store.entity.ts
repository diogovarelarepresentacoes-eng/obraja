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

@Entity('stores')
export class Store {
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
  phone: string

  @Column()
  email: string

  @Column({ nullable: true })
  website?: string

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

  @Column({ name: 'delivery_radius', default: 10 })
  deliveryRadius: number

  @Column({ name: 'delivery_fee', type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveryFee: number

  @Column({ name: 'minimum_order_value', type: 'decimal', precision: 12, scale: 2, default: 0 })
  minimumOrderValue: number

  @Column({ name: 'own_delivery', default: true })
  ownDelivery: boolean

  @Column({ name: 'accepts_third_party_delivery', default: true })
  acceptsThirdPartyDelivery: boolean

  @Column({ name: 'payment_methods', type: 'simple-array', nullable: true })
  paymentMethods: string[]

  @Column({ name: 'opening_hours', nullable: true })
  openingHours?: string

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
