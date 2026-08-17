import { STORES } from '@/config/database.config'

export interface AccountInterface {
  id?: number
  user_id: number
  name: string
  icon: string
  color: string
  balance: number
  is_default: boolean
  created_at: number
  updated_at: number
}

export const ACCOUNT_STORE_META = {
  storeName: STORES.ACCOUNTS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'user_id', keyPath: 'user_id', options: { unique: false } }
  ]
} as const

export const DEFAULT_ACCOUNT_VALUES: Omit<AccountInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  name: 'Cash',
  icon: 'fa-wallet',
  color: '#00abc8',
  balance: 0,
  is_default: true
}
