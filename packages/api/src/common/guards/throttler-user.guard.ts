import { Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'
import type { Request } from 'express'

interface AuthRequest extends Request {
  user?: { id?: string }
}

@Injectable()
export class ThrottlerUserGuard extends ThrottlerGuard {
  protected override async getTracker(req: Record<string, unknown>): Promise<string> {
    const r = req as unknown as AuthRequest
    return r.user?.id ?? r.ip ?? 'anonymous'
  }
}
