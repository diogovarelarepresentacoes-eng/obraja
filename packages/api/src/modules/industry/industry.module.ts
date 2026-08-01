import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Industry } from './entities/industry.entity'
import { IndustryService } from './industry.service'
import { IndustryController } from './industry.controller'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Industry]), UsersModule],
  providers: [IndustryService],
  controllers: [IndustryController],
  exports: [IndustryService],
})
export class IndustryModule {}
