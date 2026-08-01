import type { UserRole, OrderStatus, DeliveryMode, PaymentMethod, PaymentStatus } from './roles'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  lat?: number
  lng?: number
}

export interface Store {
  id: string
  userId: string
  tradeName: string
  legalName: string
  cnpj: string
  description?: string
  logoUrl?: string
  coverUrl?: string
  address: Address
  minOrderValue?: number
  deliveryRadius?: number
  rating: number
  totalReviews: number
  isActive: boolean
  isApproved: boolean
  createdAt: Date
}

export interface Product {
  id: string
  storeId: string
  name: string
  description: string
  categoryId: string
  images: string[]
  priceRetail: number
  priceWholesale?: number
  minWholesaleQty?: number
  unit: string
  stock: number
  weight?: number
  isActive: boolean
  attributes: Record<string, string>
  createdAt: Date
}

export interface CartItem {
  productId: string
  storeId: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  buyerId: string
  items: OrderItem[]
  status: OrderStatus
  deliveryMode: DeliveryMode
  deliveryAddress: Address
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  scheduledAt?: Date
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  storeId: string
  quantity: number
  unitPrice: number
  total: number
}
