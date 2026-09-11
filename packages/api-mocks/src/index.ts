import { customerHandlers } from './handlers/customer'
import { productHandlers } from './handlers/product'

export const handlers = [...customerHandlers, ...productHandlers]
