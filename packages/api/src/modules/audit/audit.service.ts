import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuditLog, AuditAction } from './audit-log.entity'

export interface AuditContext {
  userId?: string
  email?: string
  ipAddress?: string
  userAgent?: string
  metadata?: Record<string, unknown>
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>,
  ) {}

  log(action: AuditAction, ctx: AuditContext = {}): void {
    // Fire-and-forget — never blocks the request
    this.repo
      .save(this.repo.create({ action, ...ctx }))
      .catch((err) => console.error('[AuditService] Failed to save audit log:', err))
  }
}
