import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

export enum UserRole {
  CONSUMER = 'consumer',
  STORE = 'store',
  INDUSTRY = 'industry',
  CONTRACTOR = 'contractor',
  DELIVERY_OWN = 'delivery_own',
  DELIVERY_THIRD = 'delivery_third',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean

  @Column({ name: 'last_logout_at', nullable: true })
  lastLogoutAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
