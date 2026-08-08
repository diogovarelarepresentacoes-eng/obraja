import { api } from './api'
import type { Order, OrderStatus, DashboardMetrics, Product } from '../types/seller'

export const sellerService = {
  async getDashboard(): Promise<DashboardMetrics> {
    const { data } = await api.get<DashboardMetrics>('/api/v1/seller/dashboard')
    return data
  },

  async getOrders(status?: OrderStatus): Promise<Order[]> {
    const params = status ? { status } : {}
    const { data } = await api.get<Order[]>('/api/v1/orders/seller', { params })
    return data
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const { data } = await api.patch<Order>(`/api/v1/orders/${orderId}/status`, { status })
    return data
  },

  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/api/v1/products/seller')
    return data
  },

  async updateStock(productId: string, stock: number): Promise<Product> {
    const { data } = await api.patch<Product>(`/api/v1/products/${productId}/stock`, { stock })
    return data
  },

  async toggleProductActive(productId: string, isActive: boolean): Promise<Product> {
    const { data } = await api.patch<Product>(`/api/v1/products/${productId}`, { isActive })
    return data
  },
}
