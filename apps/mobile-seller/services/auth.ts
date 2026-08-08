import { api } from './api'
import type { AuthUser, SellerRole } from '../types/seller'

export interface LoginResult {
  accessToken: string
  user: AuthUser
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResult> {
    const { data } = await api.post<LoginResult>('/api/v1/auth/login', { email, password })
    return data
  },

  async register(payload: {
    name: string
    email: string
    phone: string
    password: string
    role: SellerRole
    cnpj?: string
  }): Promise<LoginResult> {
    const { data } = await api.post<LoginResult>('/api/v1/auth/register', payload)
    return data
  },
}
