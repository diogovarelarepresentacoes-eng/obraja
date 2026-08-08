import { Controller, Get, Patch, Param, UseGuards, Request, Query } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(
    @Request() req: { user: { sub: string } },
    @Query('limit') limit?: string,
  ) {
    return this.notificationsService.findByUser(req.user.sub, limit ? parseInt(limit) : 30)
  }

  @Get('unread-count')
  unreadCount(@Request() req: { user: { sub: string } }) {
    return this.notificationsService.countUnread(req.user.sub)
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @Request() req: { user: { sub: string } }) {
    return this.notificationsService.markRead(id, req.user.sub)
  }

  @Patch('read-all')
  markAllRead(@Request() req: { user: { sub: string } }) {
    return this.notificationsService.markAllRead(req.user.sub)
  }
}
