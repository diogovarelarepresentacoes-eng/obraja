import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity'
import { Cart } from './entities/cart.entity'
import { CartItem } from './entities/cart-item.entity'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Cart, CartItem]),
    ProductsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
