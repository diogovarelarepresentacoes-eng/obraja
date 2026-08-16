import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm'

export enum AuditAction {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  LOGOUT_ALL = 'LOGOUT_ALL',
  REGISTER = 'REGISTER',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_COMPLETED = 'PASSWORD_RESET_COMPLETED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
}

@Entity('audit_logs')
@Index(['userId', 'createdAt'])
@Index(['action', 'createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', nullable: true })
  userId?: string

  @Column({ type: 'enum', enum: AuditAction })
  action: AuditAction

  @Column({ nullable: true, length: 254 })
  email?: string

  @Column({ name: 'ip_address', nullable: true, length: 45 })
  ipAddress?: string

  @Column({ name: 'user_agent', nullable: true, length: 500 })
  userAgent?: string

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
