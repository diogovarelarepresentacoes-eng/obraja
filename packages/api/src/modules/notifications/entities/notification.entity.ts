import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

export enum NotificationType {
  ORDER = 'order',
  DELIVERY = 'delivery',
  PROMOTION = 'promotion',
  SYSTEM = 'system',
  QUOTE = 'quote',
  PAYMENT = 'payment',
  REVIEW = 'review',
}

@Entity('notifications')
@Index(['userId', 'isRead'])
@Index(['userId', 'createdAt'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  title: string

  @Column({ type: 'text' })
  body: string

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType

  @Column({ name: 'reference_id', nullable: true })
  referenceId?: string

  @Column({ type: 'jsonb', nullable: true })
  data?: Record<string, unknown>

  @Column({ name: 'is_read', default: false })
  isRead: boolean

  @Column({ name: 'read_at', nullable: true })
  readAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
