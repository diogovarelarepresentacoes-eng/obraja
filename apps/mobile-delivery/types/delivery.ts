export type VehicleType = 'bicycle' | 'motorcycle' | 'car' | 'van' | 'truck'

export type DeliveryStatus =
  | 'available'
  | 'accepted'
  | 'pickup_confirmed'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'

export interface DriverProfile {
  id: string
  userId: string
  vehicleType: VehicleType
  vehiclePlate: string | null
  cpf: string
  isOnline: boolean
  currentLat: number | null
  currentLng: number | null
  rating: number
  totalDeliveries: number
}

export interface AvailableDelivery {
  id: string
  storeName: string
  storeAddress: string
  deliveryAddress: string
  customerName: string
  products: string
  distanceKm: number
  estimatedMinutes: number
  earningBase: number
  earningBonus: number
  earningTotal: number
  distanceFromDriverKm?: number
  createdAt: string
}

export interface ActiveDelivery extends AvailableDelivery {
  status: DeliveryStatus
  acceptedAt: string | null
  pickupConfirmedAt: string | null
  deliveredAt: string | null
}

export interface DeliveryHistoryItem {
  id: string
  storeName: string
  storeAddress: string
  deliveryAddress: string
  distanceKm: number
  earningTotal: number
  status: 'delivered' | 'cancelled'
  deliveredAt: string | null
  createdAt: string
}

export interface DriverStats {
  totalDeliveries: number
  rating: number
  earningsToday: number
  earningsThisWeek: number
  earningsThisMonth: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
  phone: string
  role: string
  avatarUrl?: string
}

export interface AuthTokens {
  accessToken: string
  user: AuthUser
}
