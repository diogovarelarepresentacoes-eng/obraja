import { create } from 'zustand'
import type {
  AvailableDelivery,
  ActiveDelivery,
  DeliveryHistoryItem,
  DriverStats,
} from '../types/delivery'

interface DeliveryState {
  available: AvailableDelivery[]
  active: ActiveDelivery | null
  history: DeliveryHistoryItem[]
  stats: DriverStats | null
  isOnline: boolean
  isLoadingAvailable: boolean
  isLoadingActive: boolean
  setAvailable: (items: AvailableDelivery[]) => void
  setActive: (delivery: ActiveDelivery | null) => void
  setHistory: (items: DeliveryHistoryItem[]) => void
  setStats: (stats: DriverStats) => void
  setOnline: (online: boolean) => void
  setLoadingAvailable: (v: boolean) => void
  setLoadingActive: (v: boolean) => void
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  available: [],
  active: null,
  history: [],
  stats: null,
  isOnline: false,
  isLoadingAvailable: false,
  isLoadingActive: false,
  setAvailable: (items) => set({ available: items }),
  setActive: (delivery) => set({ active: delivery }),
  setHistory: (items) => set({ history: items }),
  setStats: (stats) => set({ stats }),
  setOnline: (online) => set({ isOnline: online }),
  setLoadingAvailable: (v) => set({ isLoadingAvailable: v }),
  setLoadingActive: (v) => set({ isLoadingActive: v }),
}))
