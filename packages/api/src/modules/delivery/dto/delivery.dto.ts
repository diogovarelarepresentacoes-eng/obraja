import { IsEnum, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { VehicleType } from '../entities/driver-profile.entity'

export class RegisterDriverProfileDto {
  @ApiProperty({ enum: VehicleType })
  @IsEnum(VehicleType)
  vehicleType: VehicleType

  @ApiPropertyOptional({ example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  vehiclePlate?: string

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @MinLength(11)
  cpf: string
}

export class UpdateDriverLocationDto {
  @ApiProperty()
  @IsNumber()
  lat: number

  @ApiProperty()
  @IsNumber()
  lng: number
}

export class UpdateDeliveryStatusDto {
  @ApiProperty({ enum: ['pickup_confirmed', 'delivered', 'cancelled'] })
  @IsEnum(['pickup_confirmed', 'delivered', 'cancelled'])
  status: 'pickup_confirmed' | 'delivered' | 'cancelled'
}

export class UpdateDriverOnlineDto {
  @ApiProperty()
  isOnline: boolean
}
