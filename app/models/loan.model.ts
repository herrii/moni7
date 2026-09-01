import { STORES } from '@/config/database.config'

export type LoanType = 'debt' | 'receivable'
export type LoanStatus = 'active' | 'paid' | 'overdue'

export interface LoanInterface {
  id?: number
  user_id: number
  type: LoanType
  name: string
  total_amount: number
  paid_amount: number
  remaining_amount: number
  description: string
  loan_date: number
  due_date: number
  status: LoanStatus
  created_at: number
  updated_at: number
}

export const LOAN_STORE_META = {
  storeName: STORES.LOANS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'user_id', keyPath: 'user_id', options: { unique: false } },
    { name: 'status', keyPath: 'status', options: { unique: false } }
  ]
} as const

export const DEFAULT_LOAN_VALUES: Omit<LoanInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  type: 'receivable',
  name: '',
  total_amount: 0,
  paid_amount: 0,
  remaining_amount: 0,
  description: '',
  loan_date: Date.now(),
  due_date: Date.now(),
  status: 'active'
}
