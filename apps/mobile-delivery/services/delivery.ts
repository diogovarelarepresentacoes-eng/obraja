import { api } from './api'
import type {
  AvailableDelivery,
  ActiveDelivery,
  DeliveryHistoryItem,
  DriverStats,
  DriverProfile,
} from '../types/delivery'

export const deliveryService = {
  async getAvailable(): Promise<AvailableDelivery[]> {
    const { data } = await api.get<AvailableDelivery[]>('/delivery/available')
    return data
  },

  async getActive(): Promise<ActiveDelivery | null> {
    const { data } = await api.get<ActiveDelivery | null>('/delivery/active')
    return data
  },

  async accept(deliveryId: string): Promise<ActiveDelivery> {
    const { data } = await api.post<ActiveDelivery>(`/delivery/${deliveryId}/accept`)
    return data
  },

  async updateStatus(
    deliveryId: string,
    status: 'pickup_confirmed' | 'delivered' | 'cancelled',
  ): Promise<ActiveDelivery> {
    const { data } = await api.patch<ActiveDelivery>(`/delivery/${deliveryId}/status`, { status })
    return data
  },

  async getHistory(): Promise<DeliveryHistoryItem[]> {
    const { data } = await api.get<DeliveryHistoryItem[]>('/delivery/history')
    return data
  },

  async getStats(): Promise<DriverStats> {
    const { data } = await api.get<DriverStats>('/delivery/stats')
    return data
  },

  async getProfile(): Promise<DriverProfile | null> {
    const { data } = await api.get<DriverProfile | null>('/delivery/profile')
    return data
  },

  async updateLocation(lat: number, lng: number): Promise<void> {
    await api.post('/delivery/location', { lat, lng })
  },

  async setOnlineStatus(isOnline: boolean): Promise<void> {
    await api.patch('/delivery/profile', { isOnline })
  },
}
