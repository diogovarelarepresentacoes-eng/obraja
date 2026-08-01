import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Industry } from './entities/industry.entity'
import { CreateIndustryDto } from './dto/create-industry.dto'
import { UpdateIndustryDto } from './dto/update-industry.dto'

export interface PaginationFilters {
  page?: number
  limit?: number
  status?: string
}

export interface IndustryStats {
  ordersReceived: number
  revenue: number
  topProducts: { name: string; sales: number }[]
  pendingOrders: number
  activeProducts: number
}

@Injectable()
export class IndustryService {
  private readonly logger = new Logger(IndustryService.name)

  constructor(
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}

  async findByUserId(userId: string): Promise<Industry> {
    const industry = await this.industryRepository.findOne({
      where: { userId },
      relations: { user: true },
    })
    if (!industry) {
      throw new NotFoundException('Perfil de indústria não encontrado')
    }
    return industry
  }

  async findById(id: string): Promise<Industry> {
    const industry = await this.industryRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!industry) {
      throw new NotFoundException(`Indústria ${id} não encontrada`)
    }
    return industry
  }

  async create(userId: string, dto: CreateIndustryDto): Promise<Industry> {
    const existing = await this.industryRepository.findOne({ where: { userId } })
    if (existing) {
      throw new ConflictException('Perfil de indústria já existe para este usuário')
    }

    const byCnpj = await this.industryRepository.findOne({ where: { cnpj: dto.cnpj } })
    if (byCnpj) {
      throw new ConflictException('CNPJ já cadastrado')
    }

    const industry = this.industryRepository.create({ ...dto, userId })
    const saved = await this.industryRepository.save(industry)
    this.logger.log(`Indústria criada: ${saved.id} para usuário ${userId}`)
    return saved
  }

  async update(userId: string, dto: UpdateIndustryDto): Promise<Industry> {
    const industry = await this.findByUserId(userId)
    Object.assign(industry, dto)
    return this.industryRepository.save(industry)
  }

  async getStats(userId: string): Promise<IndustryStats> {
    await this.findByUserId(userId)
    // Mock stats — replace with real queries when order module is connected
    return {
      ordersReceived: 0,
      revenue: 0,
      topProducts: [],
      pendingOrders: 0,
      activeProducts: 0,
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
}
