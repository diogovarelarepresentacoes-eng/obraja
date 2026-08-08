export type SellerRole = 'store' | 'industry'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: SellerRole
  isVerified: boolean
  createdAt: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'in_delivery'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Order {
  id: string
  buyerName: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  paymentMethod: string
  createdAt: string
  address: string
}

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  priceB2B?: number
  stock: number
  unit: string
  category: string
  isActive: boolean
  imageUrl?: string
}

export interface DashboardMetrics {
  ordersToday: number
  revenueToday: number
  pendingOrders: number
  lowStockCount: number
  activeDeliveries: number
  revenueMonth: number
}
