import { STORES } from '@/config/database.config'
import type { CategoryType } from './category.model'

export interface TransactionInterface {
  id?: number
  user_id: number
  account_id: number
  category_id: number
  type: CategoryType
  amount: number
  description: string
  transaction_date: number
  created_at: number
  updated_at: number
}

export const TRANSACTION_STORE_META = {
  storeName: STORES.TRANSACTIONS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'user_id', keyPath: 'user_id', options: { unique: false } },
    { name: 'account_id', keyPath: 'account_id', options: { unique: false } },
    { name: 'category_id', keyPath: 'category_id', options: { unique: false } },
    { name: 'transaction_date', keyPath: 'transaction_date', options: { unique: false } }
  ]
} as const

export const DEFAULT_TRANSACTION_VALUES: Omit<TransactionInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  account_id: 0,
  category_id: 0,
  type: 'expense',
  amount: 0,
  description: '',
  transaction_date: Date.now()
}
