import { STORES } from '@/config/database.config'
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryType } from '@/models/category.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'
import { findAccountById, updateAccountBalance } from './account.service'
import { findCategoryById } from './category.service'

export interface TransactionFilterOptions {
  accountId?: number
  categoryId?: number
  type?: CategoryType
  startDate?: number
  endDate?: number
  search?: string
  limit?: number
  offset?: number
}

/**
 * Validates transaction fields.
 */
async function validateTransaction(data: {
  account_id: number
  category_id: number
  amount: number
  type: CategoryType
  description: string
}) {
  if (!data.description || !data.description.trim()) {
    throw new Error('Deskripsi transaksi harus diisi')
  }

  if (data.description.trim().length > 100) {
    throw new Error('Deskripsi transaksi maksimal 100 karakter')
  }

  if (data.amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih besar dari 0')
  }

  const account = await findAccountById(data.account_id)
  if (!account) {
    throw new Error('Akun / Dompet yang dipilih tidak ditemukan')
  }

  const category = await findCategoryById(data.category_id)
  if (!category) {
    throw new Error('Kategori yang dipilih tidak ditemukan')
  }

  if (category.type !== data.type) {
    throw new Error(`Kategori "${category.name}" (${category.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}) tidak sesuai dengan tipe transaksi (${data.type === 'income' ? 'Pemasukan' : 'Pengeluaran'})`)
  }
}

/**
 * Creates a transaction and automatically syncs account balance.
 */
export async function createTransaction(
  data: Omit<TransactionInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<TransactionInterface> {
  await validateTransaction({
    account_id: data.account_id,
    category_id: data.category_id,
    amount: data.amount,
    type: data.type,
    description: data.description
  })

  const now = Date.now()
  const txData: Omit<TransactionInterface, 'id'> = {
    ...data,
    amount: Math.round(data.amount),
    description: data.description.trim(),
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<TransactionInterface, 'id'>>(STORES.TRANSACTIONS, txData)
  const createdTx: TransactionInterface = { id, ...txData }

  // Update account balance (Income += amount, Expense -= amount)
  const balanceDelta = createdTx.type === 'income' ? createdTx.amount : -createdTx.amount
  await updateAccountBalance(createdTx.account_id, balanceDelta)

  return createdTx
}

/**
 * Updates an existing transaction and adjusts account balance diffs.
 */
export async function updateTransaction(
  id: number,
  data: Partial<Omit<TransactionInterface, 'id' | 'user_id' | 'created_at'>>
): Promise<TransactionInterface> {
  const existing = await findTransactionById(id)
  if (!existing) {
    throw new Error(`Transaksi dengan ID ${id} tidak ditemukan`)
  }

  const updatedTx: TransactionInterface = {
    ...existing,
    ...data,
    amount: data.amount !== undefined ? Math.round(data.amount) : existing.amount,
    description: data.description !== undefined ? data.description.trim() : existing.description,
    updated_at: Date.now()
  }

  await validateTransaction({
    account_id: updatedTx.account_id,
    category_id: updatedTx.category_id,
    amount: updatedTx.amount,
    type: updatedTx.type,
    description: updatedTx.description
  })

  // 1. Rollback old balance impact on old account
  const oldDelta = existing.type === 'income' ? -existing.amount : existing.amount
  await updateAccountBalance(existing.account_id, oldDelta)

  // 2. Update record
  await updateInStore<TransactionInterface>(STORES.TRANSACTIONS, updatedTx)

  // 3. Apply new balance impact on updated account
  const newDelta = updatedTx.type === 'income' ? updatedTx.amount : -updatedTx.amount
  await updateAccountBalance(updatedTx.account_id, newDelta)

  return updatedTx
}

/**
 * Deletes a transaction and rolls back its account balance.
 */
export async function deleteTransaction(id: number): Promise<void> {
  const existing = await findTransactionById(id)
  if (!existing) {
    throw new Error(`Transaksi dengan ID ${id} tidak ditemukan`)
  }

  // Rollback balance impact
  const rollbackDelta = existing.type === 'income' ? -existing.amount : existing.amount
  await updateAccountBalance(existing.account_id, rollbackDelta)

  await deleteFromStore(STORES.TRANSACTIONS, id)
}

/**
 * Finds a transaction by ID.
 */
export async function findTransactionById(id: number): Promise<TransactionInterface | null> {
  return await getByIdFromStore<TransactionInterface>(STORES.TRANSACTIONS, id)
}

/**
 * Gets transactions for a user with optional filter, search, and pagination.
 */
export async function getTransactions(
  userId: number,
  options: TransactionFilterOptions = {}
): Promise<TransactionInterface[]> {
  const range = IDBKeyRange.only(userId)
  let transactions = await getAllFromStore<TransactionInterface>(
    STORES.TRANSACTIONS,
    'user_id',
    range,
    'prev'
  )

  // Sort by transaction_date descending (newest first)
  transactions.sort((a, b) => b.transaction_date - a.transaction_date)

  // Filters
  if (options.accountId) {
    transactions = transactions.filter((t) => t.account_id === options.accountId)
  }
  if (options.categoryId) {
    transactions = transactions.filter((t) => t.category_id === options.categoryId)
  }
  if (options.type) {
    transactions = transactions.filter((t) => t.type === options.type)
  }
  if (options.startDate) {
    transactions = transactions.filter((t) => t.transaction_date >= options.startDate!)
  }
  if (options.endDate) {
    transactions = transactions.filter((t) => t.transaction_date <= options.endDate!)
  }
  if (options.search) {
    const q = options.search.toLowerCase()
    transactions = transactions.filter(
      (t) => t.description.toLowerCase().includes(q)
    )
  }

  // Pagination / Offset Limit
  if (options.offset !== undefined || options.limit !== undefined) {
    const start = options.offset ?? 0
    const end = options.limit ? start + options.limit : transactions.length
    return transactions.slice(start, end)
  }

  return transactions
}

/**
 * Counts total transactions matching filters.
 */
export async function countTransactions(
  userId: number,
  options: TransactionFilterOptions = {}
): Promise<number> {
  const items = await getTransactions(userId, { ...options, limit: undefined, offset: undefined })
  return items.length
}
