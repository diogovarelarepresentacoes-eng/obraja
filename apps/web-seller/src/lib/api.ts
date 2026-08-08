const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export type UserRole = 'store' | 'industry' | 'contractor' | 'consumer' | 'delivery_own' | 'delivery_third'

export interface RegisterPayload {
  name: string
  email: string
  phone: string
  password: string
  role: UserRole
  cnpj?: string
}

export interface AuthResult {
  accessToken: string
  user: {
    id: string
    name: string
    email: string
    role: UserRole
    isVerified: boolean
    createdAt: string
  }
}

export async function register(payload: RegisterPayload): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message: string = body?.message ?? 'Erro ao criar conta. Tente novamente.'
    if (res.status === 409) throw new Error('Este e-mail já está cadastrado.')
    if (res.status === 400 && Array.isArray(body?.message)) throw new Error(body.message[0])
    throw new Error(message)
  }

  const json = await res.json() as { success?: boolean; data?: AuthResult } | AuthResult
  return ('success' in json && json.success === true && json.data !== undefined ? json.data : json) as AuthResult
}

export function saveSession(result: AuthResult): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('obraja_token', result.accessToken)
  localStorage.setItem('obraja_user', JSON.stringify(result.user))
}
