import { STORES } from '@/config/database.config'

export type CategoryType = 'income' | 'expense'

export interface CategoryInterface {
  id?: number
  user_id: number
  type: CategoryType
  name: string
  icon: string
  color: string
  created_at: number
  updated_at: number
}

export const CATEGORY_STORE_META = {
  storeName: STORES.CATEGORIES,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'user_id', keyPath: 'user_id', options: { unique: false } },
    { name: 'type', keyPath: 'type', options: { unique: false } }
  ]
} as const

export const DEFAULT_CATEGORY_VALUES: Omit<CategoryInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  type: 'expense',
  name: 'Lain-lain',
  icon: 'fa-circle-question',
  color: '#64748b'
}
