import { createStore } from '@/helpers/indexed-db.helper'
import { USER_STORE_META } from '@/models/user.model'
import { ACCOUNT_STORE_META } from '@/models/account.model'
import { CATEGORY_STORE_META } from '@/models/category.model'
import { TRANSACTION_STORE_META } from '@/models/transaction.model'
import { GOAL_STORE_META } from '@/models/goal.model'
import { LOAN_STORE_META } from '@/models/loan.model'
import { LOAN_PAYMENT_STORE_META } from '@/models/loan-payment.model'

/**
 * Migration Version 1: Initial schema setup creating all core stores & indexes.
 */
export const migrateV1 = (db: IDBDatabase): void => {
  createStore(db, USER_STORE_META)
  createStore(db, ACCOUNT_STORE_META)
  createStore(db, CATEGORY_STORE_META)
  createStore(db, TRANSACTION_STORE_META)
  createStore(db, GOAL_STORE_META)
  createStore(db, LOAN_STORE_META)
  createStore(db, LOAN_PAYMENT_STORE_META)
}
