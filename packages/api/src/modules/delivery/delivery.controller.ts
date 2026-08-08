import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { DeliveryService } from './delivery.service'
import {
  RegisterDriverProfileDto,
  UpdateDriverLocationDto,
  UpdateDeliveryStatusDto,
  UpdateDriverOnlineDto,
} from './dto/delivery.dto'

@ApiTags('Delivery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('available')
  @ApiOperation({ summary: 'Listar entregas disponíveis' })
  getAvailable(@Request() req: any) {
    return this.deliveryService.getAvailable(req.user.id)
  }

  @Get('active')
  @ApiOperation({ summary: 'Entrega ativa do entregador' })
  getActive(@Request() req: any) {
    return this.deliveryService.getActive(req.user.id)
  }

  @Get('history')
  @ApiOperation({ summary: 'Histórico de entregas' })
  getHistory(@Request() req: any) {
    return this.deliveryService.getHistory(req.user.id)
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas do entregador' })
  getStats(@Request() req: any) {
    return this.deliveryService.getDriverStats(req.user.id)
  }

  @Get('profile')
  @ApiOperation({ summary: 'Perfil do entregador' })
  getProfile(@Request() req: any) {
    return this.deliveryService.getDriverProfile(req.user.id)
  }

  @Post('profile')
  @ApiOperation({ summary: 'Criar perfil do entregador' })
  createProfile(@Request() req: any, @Body() dto: RegisterDriverProfileDto) {
    return this.deliveryService.createDriverProfile(req.user.id, dto)
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Atualizar status online/offline' })
  updateOnline(@Request() req: any, @Body() dto: UpdateDriverOnlineDto) {
    return this.deliveryService.setOnlineStatus(req.user.id, dto.isOnline)
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Aceitar uma entrega' })
  accept(@Param('id') id: string, @Request() req: any) {
    return this.deliveryService.accept(id, req.user.id)
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status da entrega' })
  updateStatus(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveryService.updateStatus(id, req.user.id, dto)
  }

  @Post('location')
  @ApiOperation({ summary: 'Atualizar localização GPS do entregador' })
  updateLocation(@Request() req: any, @Body() dto: UpdateDriverLocationDto) {
    return this.deliveryService.updateLocation(req.user.id, dto.lat, dto.lng)
  }
}
