import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { VehicleType } from '../entities/delivery-person.entity'

export class CreateDeliveryPersonDto {
  @ApiProperty({ example: 'Carlos Silva' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: '(11) 98765-4321' })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({ enum: VehicleType, example: VehicleType.MOTORCYCLE })
  @IsEnum(VehicleType)
  vehicleType: VehicleType

  @ApiPropertyOptional({ example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  vehiclePlate?: string
}
