import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import type { Request, Response } from 'express'

interface AuthRequest extends Request {
  user?: { id?: string; role?: string }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<AuthRequest>()
    const { method, url } = req
    const userTag = req.user?.id
      ? `user:${req.user.id.slice(0, 8)} role:${req.user.role}`
      : `ip:${req.ip}`
    const start = Date.now()

    this.logger.log(`→ ${method} ${url} [${userTag}]`)

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse<Response>()
          const ms = Date.now() - start
          this.logger.log(`← ${method} ${url} ${res.statusCode} (${ms}ms)`)
        },
        error: (err: unknown) => {
          const ms = Date.now() - start
          const status = (err as { status?: number }).status ?? 500
          const message = (err as { message?: string }).message ?? 'Unknown error'
          this.logger.warn(`✗ ${method} ${url} ${status} (${ms}ms) — ${message}`)
        },
      }),
    )
  }
}
