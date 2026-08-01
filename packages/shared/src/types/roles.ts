export type UserRole =
  | 'consumer'
  | 'store'
  | 'industry'
  | 'contractor'
  | 'delivery_own'
  | 'delivery_third'
  | 'admin'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'in_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type DeliveryMode = 'own' | 'third_party' | 'pickup'

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'boleto' | 'account_credit'

export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded'

export type SellerType = 'store' | 'industry'
