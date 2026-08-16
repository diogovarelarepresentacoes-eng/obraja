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

@Entity('password_reset_tokens')
@Index(['tokenHash'])
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'token_hash' })
  tokenHash: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'expires_at' })
  expiresAt: Date

  @Column({ name: 'used_at', nullable: true })
  usedAt?: Date

  @Column({ name: 'ip_address', nullable: true, length: 45 })
  ipAddress?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
