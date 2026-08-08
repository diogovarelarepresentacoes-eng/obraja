import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'
import type { AuthUser } from '../types/delivery'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isHydrated: boolean
  setAuth: (user: AuthUser, token: string) => Promise<void>
  clearAuth: () => Promise<void>
  hydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  setAuth: async (user, token) => {
    await SecureStore.setItemAsync('auth_token', token)
    await SecureStore.setItemAsync('auth_user', JSON.stringify(user))
    set({ user, token })
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync('auth_token')
    await SecureStore.deleteItemAsync('auth_user')
    set({ user: null, token: null })
  },

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token')
      const userJson = await SecureStore.getItemAsync('auth_user')
      if (token && userJson) {
        set({ token, user: JSON.parse(userJson) })
      }
    } finally {
      set({ isHydrated: true })
    }
  },
}))
