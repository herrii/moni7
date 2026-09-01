import { STORES } from '@/config/database.config'

export interface GoalInterface {
  id?: number
  user_id: number
  title: string
  target_amount: number
  current_amount: number
  target_date?: number
  completed: boolean
  icon?: string
  color?: string
  created_at: number
  updated_at: number
}

export const GOAL_STORE_META = {
  storeName: STORES.GOALS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'user_id', keyPath: 'user_id', options: { unique: false } }
  ]
} as const

export const DEFAULT_GOAL_VALUES: Omit<GoalInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  title: '',
  target_amount: 0,
  current_amount: 0,
  target_date: undefined,
  completed: false,
  icon: 'fa-piggy-bank',
  color: '#3b82f6'
}

