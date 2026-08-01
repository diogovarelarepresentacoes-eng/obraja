import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { QuoteResponse } from './quote-response.entity'

export enum QuoteRequestStatus {
  OPEN = 'open',
  QUOTED = 'quoted',
  ACCEPTED = 'accepted',
  CLOSED = 'closed',
}

export interface QuoteRequestItem {
  productName: string
  quantity: number
  unit: string
  description?: string
}

@Entity('quote_requests')
export class QuoteRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'contractor_id' })
  contractorId: string

  @Column({ type: 'jsonb' })
  items: QuoteRequestItem[]

  @Column({
    type: 'enum',
    enum: QuoteRequestStatus,
    default: QuoteRequestStatus.OPEN,
  })
  status: QuoteRequestStatus

  @Column({ type: 'timestamptz' })
  deadline: Date

  @Column({ nullable: true, type: 'text' })
  notes?: string

  @OneToMany(() => QuoteResponse, (response) => response.quoteRequestId, { cascade: true })
  quotes: QuoteResponse[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
