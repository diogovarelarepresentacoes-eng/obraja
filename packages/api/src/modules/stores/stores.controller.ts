import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { StoresService } from './stores.service'
import { UpdateStoreDto } from './dto/update-store.dto'
import { CreateDeliveryPersonDto } from './dto/create-delivery-person.dto'

@ApiTags('Stores')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil da loja autenticada' })
  @ApiOkResponse({ description: 'Dados do perfil da loja' })
  async getMyProfile(@CurrentUser() user: User) {
    return this.storesService.findByUserId(user.id)
  }

  @Put('me')
  @ApiOperation({ summary: 'Atualizar perfil da loja' })
  @ApiOkResponse({ description: 'Perfil atualizado com sucesso' })
  async updateMyProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateStoreDto,
  ) {
    return this.storesService.update(user.id, dto)
  }

  @Get('me/stats')
  @ApiOperation({ summary: 'Estatísticas do dashboard da loja' })
  @ApiOkResponse({
    description: 'Métricas: pedidos hoje, receita mês, produtos ativos, entregadores, etc.',
  })
  async getStats(@CurrentUser() user: User) {
    return this.storesService.getStats(user.id)
  }

  @Get('me/orders')
  @ApiOperation({ summary: 'Listar pedidos recebidos pela loja (paginado)' })
  @ApiOkResponse({ description: 'Lista paginada de pedidos' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    example: 'pending',
    enum: ['pending', 'confirmed', 'in_delivery', 'delivered', 'cancelled'],
  })
  async getOrders(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.storesService.getOrders(user.id, { page, limit, status })
  }

  @Get('me/products')
  @ApiOperation({ summary: 'Listar catálogo de produtos da loja (paginado)' })
  @ApiOkResponse({ description: 'Lista paginada de produtos' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    example: 'cimento',
    description: 'Filtrar por categoria',
  })
  async getProducts(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string,
  ) {
    return this.storesService.getProductCatalog(user.id, { page, limit, category })
  }

  @Get('me/delivery-persons')
  @ApiOperation({ summary: 'Listar entregadores da frota própria da loja' })
  @ApiOkResponse({ description: 'Lista de entregadores ativos' })
  async getDeliveryPersons(@CurrentUser() user: User) {
    const store = await this.storesService.findByUserId(user.id)
    return this.storesService.getDeliveryPersons(store.id)
  }

  @Post('me/delivery-persons')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar entregador à frota própria da loja' })
  @ApiCreatedResponse({ description: 'Entregador cadastrado com sucesso' })
  async addDeliveryPerson(
    @CurrentUser() user: User,
    @Body() dto: CreateDeliveryPersonDto,
  ) {
    const store = await this.storesService.findByUserId(user.id)
    return this.storesService.addDeliveryPerson(store.id, dto)
  }

  @Patch('me/delivery-persons/:id/availability')
  @ApiOperation({ summary: 'Atualizar disponibilidade de entregador' })
  @ApiOkResponse({ description: 'Disponibilidade atualizada com sucesso' })
  @ApiParam({ name: 'id', description: 'ID do entregador' })
  async updateDeliveryPersonAvailability(
    @CurrentUser() user: User,
    @Param('id') personId: string,
    @Body() body: { isAvailable: boolean },
  ) {
    const store = await this.storesService.findByUserId(user.id)
    return this.storesService.updateDeliveryPersonAvailability(
      store.id,
      personId,
      body.isAvailable,
    )
  }
}
