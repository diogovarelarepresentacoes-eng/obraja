import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeliveryOrder } from './entities/delivery-order.entity'
import { DriverProfile } from './entities/driver-profile.entity'
import { DeliveryService } from './delivery.service'
import { DeliveryController } from './delivery.controller'

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrder, DriverProfile])],
  providers: [DeliveryService],
  controllers: [DeliveryController],
  exports: [DeliveryService],
})
export class DeliveryModule {}
