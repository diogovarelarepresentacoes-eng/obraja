import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  categoryId: z.string().uuid(),
  images: z.array(z.string().url()).min(1),
  priceRetail: z.number().positive(),
  priceWholesale: z.number().positive().optional(),
  minWholesaleQty: z.number().int().positive().optional(),
  unit: z.string().min(1),
  stock: z.number().int().min(0),
  weight: z.number().positive().optional(),
  attributes: z.record(z.string()),
})

export type ProductInput = z.infer<typeof ProductSchema>
