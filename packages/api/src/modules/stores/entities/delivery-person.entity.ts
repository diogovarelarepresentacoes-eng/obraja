import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Store } from './store.entity'

export enum VehicleType {
  BIKE = 'bike',
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  VAN = 'van',
  TRUCK = 'truck',
}

@Entity('delivery_persons')
export class DeliveryPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'store_id' })
  storeId: string

  @ManyToOne(() => Store, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store

  @Column()
  name: string

  @Column()
  phone: string

  @Column({ name: 'vehicle_type', type: 'enum', enum: VehicleType })
  vehicleType: VehicleType

  @Column({ name: 'vehicle_plate', nullable: true })
  vehiclePlate?: string

  @Column({ name: 'is_available', default: true })
  isAvailable: boolean

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'current_lat', type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLat?: number

  @Column({ name: 'current_lng', type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLng?: number

  @Column({ name: 'total_deliveries', default: 0 })
  totalDeliveries: number

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
