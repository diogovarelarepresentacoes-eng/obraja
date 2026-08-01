import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Contractor } from './entities/contractor.entity'
import { QuoteRequest, QuoteRequestStatus } from './entities/quote-request.entity'
import { QuoteResponse, QuoteResponseStatus } from './entities/quote-response.entity'
import { CreateContractorDto } from './dto/create-contractor.dto'
import { UpdateContractorDto } from './dto/update-contractor.dto'
import { CreateQuoteDto } from './dto/create-quote.dto'

export interface PaginationFilters {
  page?: number
  limit?: number
  status?: string
}

export interface ContractorStats {
  totalOrders: number
  totalSpent: number
  pendingOrders: number
  activeQuotes: number
  savingsFromQuotes: number
}

@Injectable()
export class ContractorService {
  private readonly logger = new Logger(ContractorService.name)

  constructor(
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
    @InjectRepository(QuoteRequest)
    private readonly quoteRequestRepository: Repository<QuoteRequest>,
    @InjectRepository(QuoteResponse)
    private readonly quoteResponseRepository: Repository<QuoteResponse>,
  ) {}

  async findByUserId(userId: string): Promise<Contractor> {
    const contractor = await this.contractorRepository.findOne({
      where: { userId },
      relations: { user: true },
    })
    if (!contractor) {
      throw new NotFoundException('Perfil de construtora não encontrado')
    }
    return contractor
  }

  async findById(id: string): Promise<Contractor> {
    const contractor = await this.contractorRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!contractor) {
      throw new NotFoundException(`Construtora ${id} não encontrada`)
    }
    return contractor
  }

  async create(userId: string, dto: CreateContractorDto): Promise<Contractor> {
    const existing = await this.contractorRepository.findOne({ where: { userId } })
    if (existing) {
      throw new ConflictException('Perfil de construtora já existe para este usuário')
    }

    const byCnpj = await this.contractorRepository.findOne({ where: { cnpj: dto.cnpj } })
    if (byCnpj) {
      throw new ConflictException('CNPJ já cadastrado')
    }

    const contractor = this.contractorRepository.create({ ...dto, userId })
    const saved = await this.contractorRepository.save(contractor)
    this.logger.log(`Construtora criada: ${saved.id} para usuário ${userId}`)
    return saved
  }

  async update(userId: string, dto: UpdateContractorDto): Promise<Contractor> {
    const contractor = await this.findByUserId(userId)
    Object.assign(contractor, dto)
    return this.contractorRepository.save(contractor)
  }

  async getStats(userId: string): Promise<ContractorStats> {
    await this.findByUserId(userId)
    // Mock stats — replace with real aggregation queries when order module is connected
    return {
      totalOrders: 0,
      totalSpent: 0,
      pendingOrders: 0,
      activeQuotes: 0,
      savingsFromQuotes: 0,
    }
  }

  async getOrders(
    userId: string,
    filters: PaginationFilters,
  ): Promise<{ data: unknown[]; total: number; page: number; limit: number }> {
    await this.findByUserId(userId)
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    // Placeholder — wire to orders module when available
    return { data: [], total: 0, page, limit }
  }

  async createQuoteRequest(contractorId: string, dto: CreateQuoteDto): Promise<QuoteRequest> {
    const quoteRequest = this.quoteRequestRepository.create({
      contractorId,
      items: dto.items,
      deadline: new Date(dto.deadline),
      notes: dto.notes,
      status: QuoteRequestStatus.OPEN,
    })
    const saved = await this.quoteRequestRepository.save(quoteRequest)
    this.logger.log(`Cotação criada: ${saved.id} para construtora ${contractorId}`)
    return saved
  }

  async getQuoteRequests(contractorId: string): Promise<QuoteRequest[]> {
    return this.quoteRequestRepository.find({
      where: { contractorId },
      relations: { quotes: true },
      order: { createdAt: 'DESC' },
    })
  }

  async acceptQuoteResponse(
    contractorId: string,
    quoteResponseId: string,
  ): Promise<QuoteResponse> {
    const response = await this.quoteResponseRepository.findOne({
      where: { id: quoteResponseId },
    })
    if (!response) {
      throw new NotFoundException(`Resposta de cotação ${quoteResponseId} não encontrada`)
    }

    const quoteRequest = await this.quoteRequestRepository.findOne({
      where: { id: response.quoteRequestId },
    })
    if (!quoteRequest || quoteRequest.contractorId !== contractorId) {
      throw new ForbiddenException('Sem permissão para aceitar esta cotação')
    }

    response.status = QuoteResponseStatus.ACCEPTED
    quoteRequest.status = QuoteRequestStatus.ACCEPTED

    await this.quoteRequestRepository.save(quoteRequest)
    const saved = await this.quoteResponseRepository.save(response)
    this.logger.log(`Cotação aceita: ${quoteResponseId}`)
    return saved
  }
}
