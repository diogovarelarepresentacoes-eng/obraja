import {
  Controller, Get, Post, Delete, Param, Body, UseGuards, Request,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto, AddToCartDto } from './dto/create-order.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('cart')
  getCart(@Request() req: { user: { sub: string } }) {
    return this.ordersService.getOrCreateCart(req.user.sub)
  }

  @Post('cart/items')
  addToCart(@Request() req: { user: { sub: string } }, @Body() dto: AddToCartDto) {
    return this.ordersService.addToCart(req.user.sub, dto)
  }

  @Delete('cart/items/:id')
  removeFromCart(@Request() req: { user: { sub: string } }, @Param('id') id: string) {
    return this.ordersService.removeFromCart(req.user.sub, id)
  }

  @Post()
  create(@Request() req: { user: { sub: string } }, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.sub, dto)
  }

  @Get()
  findAll(@Request() req: { user: { sub: string } }) {
    return this.ordersService.findByBuyer(req.user.sub)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }
}
