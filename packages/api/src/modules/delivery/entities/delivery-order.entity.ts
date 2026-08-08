import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

export enum DeliveryStatus {
  AVAILABLE = 'available',
  ACCEPTED = 'accepted',
  PICKUP_CONFIRMED = 'pickup_confirmed',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('delivery_orders')
@Index(['status', 'driverId'])
export class DeliveryOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'order_id' })
  orderId: string

  @Column({ name: 'driver_id', type: 'varchar', nullable: true })
  driverId: string | null

  @Column({ name: 'store_name' })
  storeName: string

  @Column({ name: 'store_address' })
  storeAddress: string

  @Column({ name: 'delivery_address' })
  deliveryAddress: string

  @Column({ name: 'customer_name' })
  customerName: string

  @Column({ type: 'text' })
  products: string

  @Column({ name: 'distance_km', type: 'float' })
  distanceKm: number

  @Column({ name: 'estimated_minutes' })
  estimatedMinutes: number

  @Column({ name: 'earning_base', type: 'decimal', precision: 10, scale: 2 })
  earningBase: number

  @Column({ name: 'earning_bonus', type: 'decimal', precision: 10, scale: 2, default: 0 })
  earningBonus: number

  @Column({ name: 'earning_total', type: 'decimal', precision: 10, scale: 2 })
  earningTotal: number

  @Column({ type: 'enum', enum: DeliveryStatus, default: DeliveryStatus.AVAILABLE })
  status: DeliveryStatus

  @Column({ name: 'accepted_at', type: 'timestamp', nullable: true })
  acceptedAt: Date | null

  @Column({ name: 'pickup_confirmed_at', type: 'timestamp', nullable: true })
  pickupConfirmedAt: Date | null

  @Column({ name: 'delivered_at', type: 'timestamp', nullable: true })
  deliveredAt: Date | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
