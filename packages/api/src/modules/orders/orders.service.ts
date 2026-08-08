import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order, BuyerType, PaymentMethod, DeliveryMethod, OrderStatus } from './entities/order.entity'
import { OrderItem, OrderItemStatus } from './entities/order-item.entity'
import { Cart } from './entities/cart.entity'
import { CartItem } from './entities/cart-item.entity'
import { CreateOrderDto, AddToCartDto } from './dto/create-order.dto'
import { ProductsService } from '../products/products.service'
import { SellerType } from '../products/entities/product.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly itemRepo: Repository<OrderItem>,
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepo: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepo.findOne({ where: { userId } })
    if (!cart) cart = await this.cartRepo.save(this.cartRepo.create({ userId }))
    return cart
  }

  async addToCart(userId: string, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId)
    const product = await this.productsService.findOne(dto.productId)

    const existing = await this.cartItemRepo.findOne({
      where: { cartId: cart.id, productId: dto.productId, variantId: dto.variantId ?? undefined },
    })

    if (existing) {
      await this.cartItemRepo.update(existing.id, {
        quantity: Number(existing.quantity) + dto.quantity,
      })
    } else {
      const unitPrice = dto.variantId
        ? product.price
        : product.price
      await this.cartItemRepo.save(this.cartItemRepo.create({
        cartId: cart.id,
        productId: dto.productId,
        variantId: dto.variantId,
        sellerId: dto.sellerId,
        sellerType: product.sellerType,
        productName: product.name,
        productUnit: product.unit,
        quantity: dto.quantity,
        unitPrice,
      }))
    }

    return this.cartRepo.findOne({ where: { id: cart.id }, relations: { items: true } }) as Promise<Cart>
  }

  async removeFromCart(userId: string, cartItemId: string): Promise<void> {
    const cart = await this.cartRepo.findOne({ where: { userId } })
    if (!cart) throw new NotFoundException('Carrinho não encontrado')
    await this.cartItemRepo.delete({ id: cartItemId, cartId: cart.id })
  }

  async createOrder(buyerId: string, dto: CreateOrderDto): Promise<Order> {
    if (dto.items.length === 0) throw new BadRequestException('Pedido sem itens')

    const orderItems: Partial<OrderItem>[] = []
    let subtotal = 0

    for (const item of dto.items) {
      const product = await this.productsService.findOne(item.productId)
      const unitPrice = Number(product.price)
      const itemSubtotal = unitPrice * item.quantity
      subtotal += itemSubtotal
      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        sellerId: item.sellerId,
        sellerType: product.sellerType,
        productName: product.name,
        productUnit: product.unit,
        quantity: item.quantity,
        unitPrice,
        subtotal: itemSubtotal,
        status: OrderItemStatus.PENDING,
      })
    }

    const total = subtotal
    const order = await this.orderRepo.save(this.orderRepo.create({
      buyerId,
      buyerType: dto.buyerType,
      paymentMethod: dto.paymentMethod,
      deliveryMethod: dto.deliveryMethod,
      deliveryAddress: dto.deliveryAddress,
      deliveryNotes: dto.deliveryNotes,
      couponCode: dto.couponCode,
      subtotal,
      deliveryFee: 0,
      discount: 0,
      total,
    }))

    await this.itemRepo.save(orderItems.map(i => this.itemRepo.create({ ...i, orderId: order.id })))

    return this.orderRepo.findOne({ where: { id: order.id }, relations: { items: true } }) as Promise<Order>
  }

  async findByBuyer(buyerId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { buyerId },
      relations: { items: true },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id }, relations: { items: true, buyer: true } })
    if (!order) throw new NotFoundException('Pedido não encontrado')
    return order
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    await this.orderRepo.update(id, { status })
    return this.findOne(id)
  }
}
