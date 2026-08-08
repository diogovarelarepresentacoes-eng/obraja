import { api } from './api'
import type { AuthTokens } from '../types/delivery'

interface RegisterPayload {
  name: string
  email: string
  phone: string
  password: string
  role: 'delivery_own' | 'delivery_third'
  cpf: string
  vehicleType: string
  vehiclePlate?: string
}

export const authService = {
  async login(email: string, password: string): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/login', { email, password })
    return data
  },

  async register(payload: RegisterPayload): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/register', {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role: payload.role,
    })
    if (data.accessToken) {
      await api.post(
        '/delivery/profile',
        {
          cpf: payload.cpf,
          vehicleType: payload.vehicleType,
          vehiclePlate: payload.vehiclePlate,
        },
        { headers: { Authorization: `Bearer ${data.accessToken}` } },
      )
    }
    return data
  },
}
