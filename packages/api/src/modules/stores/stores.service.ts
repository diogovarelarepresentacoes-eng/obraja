import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Store } from './entities/store.entity'
import { DeliveryPerson } from './entities/delivery-person.entity'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { CreateDeliveryPersonDto } from './dto/create-delivery-person.dto'

export interface StoreStatsDto {
  ordersToday: number
  revenueMonth: number
  productsActive: number
  deliveryPersonsActive: number
  pendingOrders: number
  inDeliveryOrders: number
  averageDeliveryTime: number
  rating: number
}

export interface PaginationFilters {
  page?: number
  limit?: number
  status?: string
  category?: string
}

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name)

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(DeliveryPerson)
    private readonly deliveryPersonRepository: Repository<DeliveryPerson>,
  ) {}

  async findByUserId(userId: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { userId },
      relations: { user: true },
    })
    if (!store) {
      throw new NotFoundException('Perfil de loja não encontrado')
    }
    return store
  }

  async findById(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!store) {
      throw new NotFoundException(`Loja ${id} não encontrada`)
    }
    return store
  }

  async create(userId: string, dto: CreateStoreDto): Promise<Store> {
    const existing = await this.storeRepository.findOne({ where: { userId } })
    if (existing) {
      throw new ConflictException('Perfil de loja já existe para este usuário')
    }

    const byCnpj = await this.storeRepository.findOne({ where: { cnpj: dto.cnpj } })
    if (byCnpj) {
      throw new ConflictException('CNPJ já cadastrado')
    }

    const store = this.storeRepository.create({ ...dto, userId })
    const saved = await this.storeRepository.save(store)
    this.logger.log(`Loja criada: ${saved.id} para usuário ${userId}`)
    return saved
  }

  async update(userId: string, dto: UpdateStoreDto): Promise<Store> {
    const store = await this.findByUserId(userId)
    Object.assign(store, dto)
    return this.storeRepository.save(store)
  }

  async getStats(userId: string): Promise<StoreStatsDto> {
    await this.findByUserId(userId)
    // Mock stats — replace with real queries when orders/products modules are connected
    return {
      ordersToday: 18,
      revenueMonth: 127450.80,
      productsActive: 234,
      deliveryPersonsActive: 5,
      pendingOrders: 6,
      inDeliveryOrders: 3,
      averageDeliveryTime: 47,
      rating: 4.7,
    }
  }

  async getOrders(
    userId: string,
    filters: PaginationFilters,
  ): Promise<{ data: unknown[]; total: number; page: number }> {
    await this.findByUserId(userId)
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10

    // Mock orders — wire to orders module when available
    const mockOrders = [
      {
        id: 'ord-001',
        customer: 'Construtora Alves',
        status: filters.status ?? 'pending',
        total: 3840.50,
        items: 12,
        createdAt: new Date().toISOString(),
        address: 'Rua Flores, 200 — Centro, São Paulo/SP',
      },
      {
        id: 'ord-002',
        customer: 'João Pereira',
        status: 'in_delivery',
        total: 980.00,
        items: 4,
        createdAt: new Date().toISOString(),
        address: 'Av. Brasil, 550 — Jardins, São Paulo/SP',
      },
      {
        id: 'ord-003',
        customer: 'Reforma Fácil ME',
        status: 'delivered',
        total: 5200.00,
        items: 20,
        createdAt: new Date().toISOString(),
        address: 'Rua das Palmeiras, 77 — Vila Madalena, São Paulo/SP',
      },
    ]

    const filtered = filters.status
      ? mockOrders.filter(o => o.status === filters.status)
      : mockOrders

    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return { data, total: filtered.length, page }
  }

  async getDeliveryPersons(storeId: string): Promise<DeliveryPerson[]> {
    return this.deliveryPersonRepository.find({
      where: { storeId, isActive: true },
    })
  }

  async addDeliveryPerson(
    storeId: string,
    dto: CreateDeliveryPersonDto,
  ): Promise<DeliveryPerson> {
    const person = this.deliveryPersonRepository.create({ ...dto, storeId })
    const saved = await this.deliveryPersonRepository.save(person)
    this.logger.log(`Entregador ${saved.id} adicionado à loja ${storeId}`)
    return saved
  }

  async updateDeliveryPersonAvailability(
    storeId: string,
    personId: string,
    isAvailable: boolean,
  ): Promise<DeliveryPerson> {
    const person = await this.deliveryPersonRepository.findOne({
      where: { id: personId, storeId, isActive: true },
    })
    if (!person) {
      throw new NotFoundException(`Entregador ${personId} não encontrado nesta loja`)
    }
    person.isAvailable = isAvailable
    return this.deliveryPersonRepository.save(person)
  }

  async getProductCatalog(
    userId: string,
    filters: PaginationFilters,
  ): Promise<{ data: unknown[]; total: number }> {
    await this.findByUserId(userId)
    const page = filters.page ?? 1
    const limit = filters.limit ?? 20

    // Mock products — wire to products module when available
    const mockProducts = [
      {
        id: 'prod-001',
        name: 'Cimento CP-II 50kg',
        category: 'cimento',
        price: 38.90,
        stock: 480,
        unit: 'saca',
        isActive: true,
      },
      {
        id: 'prod-002',
        name: 'Tijolo Cerâmico 9 furos (cx 100un)',
        category: 'alvenaria',
        price: 89.00,
        stock: 120,
        unit: 'cx',
        isActive: true,
      },
      {
        id: 'prod-003',
        name: 'Areia Média m³',
        category: 'agregados',
        price: 210.00,
        stock: 50,
        unit: 'm³',
        isActive: true,
      },
      {
        id: 'prod-004',
        name: 'Tinta Acrílica Branco 18L',
        category: 'tintas',
        price: 189.90,
        stock: 75,
        unit: 'lata',
        isActive: true,
      },
      {
        id: 'prod-005',
        name: 'Vergalhão CA-50 12mm (barra 12m)',
        category: 'ferragens',
        price: 97.50,
        stock: 200,
        unit: 'barra',
        isActive: true,
      },
    ]

    const filtered = filters.category
      ? mockProducts.filter(p => p.category === filters.category)
      : mockProducts

    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return { data, total: filtered.length }
  }
}
