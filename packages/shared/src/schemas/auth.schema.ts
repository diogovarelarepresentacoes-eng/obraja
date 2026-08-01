import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+55\d{10,11}$/, 'Telefone inválido (formato: +5511999999999)'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
  role: z.enum(['consumer', 'store', 'industry', 'contractor', 'delivery_third']),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
