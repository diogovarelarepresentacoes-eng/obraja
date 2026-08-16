import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { IndustryModule } from './modules/industry/industry.module'
import { ContractorModule } from './modules/contractor/contractor.module'
import { StoresModule } from './modules/stores/stores.module'
import { DeliveryModule } from './modules/delivery/delivery.module'
import { ProductsModule } from './modules/products/products.module'
import { OrdersModule } from './modules/orders/orders.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { ThrottlerUserGuard } from './common/guards/throttler-user.guard'
import { AuditModule } from './modules/audit/audit.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { name: 'auth', ttl: 60000, limit: 10 },
      { name: 'default', ttl: 60000, limit: 100 },
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        logging: process.env.NODE_ENV === 'development' ? ['error'] : false,
      }),
    }),
    AuthModule,
    AuditModule,
    UsersModule,
    IndustryModule,
    ContractorModule,
    StoresModule,
    DeliveryModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerUserGuard },
  ],
})
export class AppModule {}
