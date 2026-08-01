import { z } from 'zod'

export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  storeId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1),
  deliveryMode: z.enum(['own', 'third_party', 'pickup']),
  deliveryAddressId: z.string().uuid(),
  paymentMethod: z.enum(['pix', 'credit_card', 'debit_card', 'boleto', 'account_credit']),
  scheduledAt: z.coerce.date().optional(),
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
