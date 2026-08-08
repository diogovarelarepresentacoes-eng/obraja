import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

export enum VehicleType {
  BICYCLE = 'bicycle',
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  VAN = 'van',
  TRUCK = 'truck',
}

@Entity('driver_profiles')
@Index(['userId'], { unique: true })
export class DriverProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ type: 'enum', enum: VehicleType, name: 'vehicle_type' })
  vehicleType: VehicleType

  @Column({ name: 'vehicle_plate', nullable: true })
  vehiclePlate: string | null

  @Column()
  cpf: string

  @Column({ name: 'is_online', default: false })
  isOnline: boolean

  @Column({ name: 'current_lat', type: 'float', nullable: true })
  currentLat: number | null

  @Column({ name: 'current_lng', type: 'float', nullable: true })
  currentLng: number | null

  @Column({ type: 'float', default: 5.0 })
  rating: number

  @Column({ name: 'total_deliveries', default: 0 })
  totalDeliveries: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
