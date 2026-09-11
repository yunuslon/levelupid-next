import { z } from 'zod'

export const UserRole = z.enum([
  'super_admin',
  'admin',
  'support',
  'store_owner',
  'staff',
])
export type UserRole = z.infer<typeof UserRole>

export const OrderStatus = z.enum([
  'pending',
  'processing',
  'shipped',
  'completed',
  'cancelled',
])
export type OrderStatus = z.infer<typeof OrderStatus>

export const PaymentStatus = z.enum(['unpaid', 'paid', 'refunded', 'failed'])
export type PaymentStatus = z.infer<typeof PaymentStatus>
