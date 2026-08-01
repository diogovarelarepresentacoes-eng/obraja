import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contractor } from './entities/contractor.entity'
import { QuoteRequest } from './entities/quote-request.entity'
import { QuoteResponse } from './entities/quote-response.entity'
import { ContractorService } from './contractor.service'
import { ContractorController } from './contractor.controller'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Contractor, QuoteRequest, QuoteResponse]),
    UsersModule,
  ],
  providers: [ContractorService],
  controllers: [ContractorController],
  exports: [ContractorService],
})
export class ContractorModule {}
