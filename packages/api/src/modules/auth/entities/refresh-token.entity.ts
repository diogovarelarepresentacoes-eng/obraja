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

@Entity('refresh_tokens')
@Index(['tokenHash'])
@Index(['userId', 'revokedAt'])
export class RefreshToken {
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

  @Column({ name: 'revoked_at', nullable: true })
  revokedAt?: Date

  @Column({ name: 'ip_address', nullable: true, length: 45 })
  ipAddress?: string

  @Column({ name: 'user_agent', nullable: true, length: 500 })
  userAgent?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
