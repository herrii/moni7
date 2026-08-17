export const DB_NAME = 'moni7_db'
export const DB_VERSION = 1

export const STORES = {
  USERS: 'users',
  ACCOUNTS: 'accounts',
  CATEGORIES: 'categories',
  TRANSACTIONS: 'transactions',
  GOALS: 'goals',
  LOANS: 'loans',
  LOAN_PAYMENTS: 'loan_payments'
} as const

export type StoreName = (typeof STORES)[keyof typeof STORES]
