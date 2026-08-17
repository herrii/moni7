import { STORES } from '@/config/database.config'

export interface LoanPaymentInterface {
  id?: number
  loan_id: number
  amount: number
  payment_date: number
  note: string
  created_at: number
}

export const LOAN_PAYMENT_STORE_META = {
  storeName: STORES.LOAN_PAYMENTS,
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'loan_id', keyPath: 'loan_id', options: { unique: false } }
  ]
} as const

export const DEFAULT_LOAN_PAYMENT_VALUES: Omit<LoanPaymentInterface, 'id' | 'loan_id' | 'created_at'> = {
  amount: 0,
  payment_date: Date.now(),
  note: ''
}
