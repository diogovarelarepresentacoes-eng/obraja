import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
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
  ApiParam,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { ContractorService } from './contractor.service'
import { CreateContractorDto } from './dto/create-contractor.dto'
import { UpdateContractorDto } from './dto/update-contractor.dto'
import { CreateQuoteDto } from './dto/create-quote.dto'

@ApiTags('Contractor')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('v1/contractor')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Post('me')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar perfil de construtora' })
  @ApiCreatedResponse({ description: 'Perfil criado com sucesso' })
  async createProfile(
    @CurrentUser() user: User,
    @Body() dto: CreateContractorDto,
  ) {
    return this.contractorService.create(user.id, dto)
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil da construtora autenticada' })
  @ApiOkResponse({ description: 'Dados do perfil da construtora' })
  async getMyProfile(@CurrentUser() user: User) {
    return this.contractorService.findByUserId(user.id)
  }

  @Put('me')
  @ApiOperation({ summary: 'Atualizar perfil da construtora' })
  @ApiOkResponse({ description: 'Perfil atualizado com sucesso' })
  async updateMyProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateContractorDto,
  ) {
    return this.contractorService.update(user.id, dto)
  }

  @Get('me/stats')
  @ApiOperation({ summary: 'Estatísticas do dashboard da construtora' })
  @ApiOkResponse({ description: 'Métricas de pedidos, gastos e cotações' })
  async getStats(@CurrentUser() user: User) {
    return this.contractorService.getStats(user.id)
  }

  @Get('me/orders')
  @ApiOperation({ summary: 'Histórico de pedidos da construtora (paginado)' })
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
    return this.contractorService.getOrders(user.id, { page, limit, status })
  }

  @Post('me/quotes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar pedido de cotação (RFQ)' })
  @ApiCreatedResponse({ description: 'Cotação criada com sucesso' })
  async createQuote(
    @CurrentUser() user: User,
    @Body() dto: CreateQuoteDto,
  ) {
    const contractor = await this.contractorService.findByUserId(user.id)
    return this.contractorService.createQuoteRequest(contractor.id, dto)
  }

  @Get('me/quotes')
  @ApiOperation({ summary: 'Listar cotações da construtora com respostas' })
  @ApiOkResponse({ description: 'Lista de RFQs e suas respostas recebidas' })
  async getQuotes(@CurrentUser() user: User) {
    const contractor = await this.contractorService.findByUserId(user.id)
    return this.contractorService.getQuoteRequests(contractor.id)
  }

  @Post('me/quotes/:quoteRequestId/accept/:responseId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aceitar uma resposta de cotação' })
  @ApiOkResponse({ description: 'Resposta de cotação aceita com sucesso' })
  @ApiParam({ name: 'quoteRequestId', description: 'ID do pedido de cotação' })
  @ApiParam({ name: 'responseId', description: 'ID da resposta a aceitar' })
  async acceptQuoteResponse(
    @CurrentUser() user: User,
    @Param('responseId') responseId: string,
  ) {
    const contractor = await this.contractorService.findByUserId(user.id)
    return this.contractorService.acceptQuoteResponse(contractor.id, responseId)
  }
}
