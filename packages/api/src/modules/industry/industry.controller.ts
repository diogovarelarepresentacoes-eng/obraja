import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import {
  ApiTags,
  ApiSecurity,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { IndustryService } from './industry.service'
import { CreateIndustryDto } from './dto/create-industry.dto'
import { UpdateIndustryDto } from './dto/update-industry.dto'

@ApiTags('Industry')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('v1/industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post('me')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar perfil de indústria' })
  @ApiCreatedResponse({ description: 'Perfil criado com sucesso' })
  async createProfile(
    @CurrentUser() user: User,
    @Body() dto: CreateIndustryDto,
  ) {
    return this.industryService.create(user.id, dto)
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil da indústria autenticada' })
  @ApiOkResponse({ description: 'Dados do perfil da indústria' })
  async getMyProfile(@CurrentUser() user: User) {
    return this.industryService.findByUserId(user.id)
  }

  @Put('me')
  @ApiOperation({ summary: 'Atualizar perfil da indústria' })
  @ApiOkResponse({ description: 'Perfil atualizado com sucesso' })
  async updateMyProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateIndustryDto,
  ) {
    return this.industryService.update(user.id, dto)
  }

  @Get('me/stats')
  @ApiOperation({ summary: 'Estatísticas do dashboard da indústria' })
  @ApiOkResponse({ description: 'Métricas de pedidos, receita e produtos' })
  async getStats(@CurrentUser() user: User) {
    return this.industryService.getStats(user.id)
  }

  @Get('me/orders')
  @ApiOperation({ summary: 'Listar pedidos recebidos pela indústria (paginado)' })
  @ApiOkResponse({ description: 'Lista paginada de pedidos' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, type: String, example: 'pending' })
  async getOrders(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.industryService.getOrders(user.id, { page, limit, status })
  }

  @Get('me/products')
  @ApiOperation({ summary: 'Listar produtos da indústria' })
  @ApiOkResponse({ description: 'Lista de produtos ativos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getProducts(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // Placeholder — wire to products module when available
    return { data: [], total: 0, page: page ?? 1, limit: limit ?? 10 }
  }
}
