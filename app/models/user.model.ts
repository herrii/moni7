import { STORES } from '@/config/database.config'

export interface UserInterface {
  id?: number
  name: string
  created_at: number
  updated_at: number
}

export const USER_STORE_META = {
  storeName: STORES.USERS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'name', keyPath: 'name', options: { unique: false } }
  ]
} as const

export const DEFAULT_USER_VALUES: Omit<UserInterface, 'id' | 'created_at' | 'updated_at'> = {
  name: 'Yogi'
}
