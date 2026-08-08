import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { DeliveryOrder, DeliveryStatus } from './entities/delivery-order.entity'
import { DriverProfile } from './entities/driver-profile.entity'
import { RegisterDriverProfileDto, UpdateDeliveryStatusDto } from './dto/delivery.dto'

const ACTIVE_STATUSES = [
  DeliveryStatus.ACCEPTED,
  DeliveryStatus.PICKUP_CONFIRMED,
  DeliveryStatus.IN_TRANSIT,
]

const DONE_STATUSES = [DeliveryStatus.DELIVERED, DeliveryStatus.CANCELLED]

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private readonly orderRepo: Repository<DeliveryOrder>,
    @InjectRepository(DriverProfile)
    private readonly profileRepo: Repository<DriverProfile>,
  ) {}

  async getAvailable(driverId: string): Promise<DeliveryOrder[]> {
    return this.orderRepo.find({
      where: { status: DeliveryStatus.AVAILABLE },
      order: { createdAt: 'DESC' },
      take: 50,
    })
  }

  async getActive(driverId: string): Promise<DeliveryOrder | null> {
    return this.orderRepo.findOne({
      where: { driverId, status: In(ACTIVE_STATUSES) },
    }) ?? null
  }

  async getHistory(driverId: string): Promise<DeliveryOrder[]> {
    return this.orderRepo.find({
      where: { driverId, status: In(DONE_STATUSES) },
      order: { updatedAt: 'DESC' },
      take: 30,
    })
  }

  async accept(deliveryId: string, driverId: string): Promise<DeliveryOrder> {
    const delivery = await this.orderRepo.findOne({ where: { id: deliveryId } })
    if (!delivery) throw new NotFoundException('Entrega não encontrada')
    if (delivery.status !== DeliveryStatus.AVAILABLE) {
      throw new ConflictException('Esta entrega já foi aceita por outro entregador')
    }

    delivery.driverId = driverId
    delivery.status = DeliveryStatus.ACCEPTED
    delivery.acceptedAt = new Date()
    return this.orderRepo.save(delivery)
  }

  async updateStatus(
    deliveryId: string,
    driverId: string,
    dto: UpdateDeliveryStatusDto,
  ): Promise<DeliveryOrder> {
    const delivery = await this.orderRepo.findOne({ where: { id: deliveryId } })
    if (!delivery) throw new NotFoundException('Entrega não encontrada')
    if (delivery.driverId !== driverId) throw new ForbiddenException('Entrega não pertence a você')

    const validTransitions: Record<string, DeliveryStatus[]> = {
      pickup_confirmed: [DeliveryStatus.ACCEPTED],
      in_transit: [DeliveryStatus.PICKUP_CONFIRMED],
      delivered: [DeliveryStatus.IN_TRANSIT, DeliveryStatus.PICKUP_CONFIRMED, DeliveryStatus.ACCEPTED],
      cancelled: [DeliveryStatus.ACCEPTED, DeliveryStatus.PICKUP_CONFIRMED],
    }

    const allowed = validTransitions[dto.status] ?? []
    if (!allowed.includes(delivery.status)) {
      throw new BadRequestException(`Transição inválida: ${delivery.status} → ${dto.status}`)
    }

    delivery.status = dto.status as DeliveryStatus
    if (dto.status === 'pickup_confirmed') delivery.pickupConfirmedAt = new Date()
    if (dto.status === 'delivered') {
      delivery.deliveredAt = new Date()
      await this.profileRepo.increment({ userId: driverId }, 'totalDeliveries', 1)
    }

    return this.orderRepo.save(delivery)
  }

  async updateLocation(driverId: string, lat: number, lng: number): Promise<void> {
    await this.profileRepo.update({ userId: driverId }, { currentLat: lat, currentLng: lng })
  }

  async setOnlineStatus(driverId: string, isOnline: boolean): Promise<void> {
    await this.profileRepo.update({ userId: driverId }, { isOnline })
  }

  async getDriverProfile(userId: string): Promise<DriverProfile | null> {
    return this.profileRepo.findOne({ where: { userId } }) ?? null
  }

  async createDriverProfile(
    userId: string,
    dto: RegisterDriverProfileDto,
  ): Promise<DriverProfile> {
    const existing = await this.profileRepo.findOne({ where: { userId } })
    if (existing) return existing

    const profile = this.profileRepo.create({
      userId,
      vehicleType: dto.vehicleType,
      vehiclePlate: dto.vehiclePlate ?? null,
      cpf: dto.cpf.replace(/\D/g, ''),
    })
    return this.profileRepo.save(profile)
  }

  async getDriverStats(userId: string) {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const profile = await this.profileRepo.findOne({ where: { userId } })

    const allDelivered = await this.orderRepo.find({
      where: { driverId: userId, status: DeliveryStatus.DELIVERED },
    })

    const sum = (items: DeliveryOrder[]) =>
      items.reduce((acc, d) => acc + Number(d.earningTotal), 0)

    const today = allDelivered.filter(d => d.deliveredAt && d.deliveredAt >= startOfDay)
    const week = allDelivered.filter(d => d.deliveredAt && d.deliveredAt >= startOfWeek)
    const month = allDelivered.filter(d => d.deliveredAt && d.deliveredAt >= startOfMonth)

    return {
      totalDeliveries: profile?.totalDeliveries ?? 0,
      rating: profile?.rating ?? 5.0,
      earningsToday: sum(today),
      earningsThisWeek: sum(week),
      earningsThisMonth: sum(month),
    }
  }
}
