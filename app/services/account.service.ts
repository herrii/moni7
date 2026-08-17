import { STORES } from '@/config/database.config'
import type { AccountInterface } from '@/models/account.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'

/**
 * Creates a new financial account.
 */
export async function createAccount(
  data: Omit<AccountInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<AccountInterface> {
  const trimmedName = data.name.trim()
  if (!trimmedName) {
    throw new Error('Nama dompet/akun tidak boleh kosong')
  }

  const now = Date.now()
  const accountData: Omit<AccountInterface, 'id'> = {
    ...data,
    name: trimmedName,
    balance: Math.round(data.balance || 0),
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<AccountInterface, 'id'>>(STORES.ACCOUNTS, accountData)
  return { id, ...accountData }
}

/**
 * Updates an existing account.
 */
export async function updateAccount(
  id: number,
  data: Partial<Omit<AccountInterface, 'id' | 'user_id' | 'created_at'>>
): Promise<AccountInterface> {
  const existing = await findAccountById(id)
  if (!existing) {
    throw new Error(`Account dengan ID ${id} tidak ditemukan`)
  }

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error('Nama dompet/akun tidak boleh kosong')
  }

  const updatedAccount: AccountInterface = {
    ...existing,
    ...data,
    name: data.name !== undefined ? data.name.trim() : existing.name,
    balance: data.balance !== undefined ? Math.round(data.balance) : existing.balance,
    updated_at: Date.now()
  }

  await updateInStore<AccountInterface>(STORES.ACCOUNTS, updatedAccount)
  return updatedAccount
}

/**
 * Deletes an account by ID.
 */
export async function deleteAccount(id: number): Promise<void> {
  const existing = await findAccountById(id)
  if (!existing) {
    throw new Error(`Account dengan ID ${id} tidak ditemukan`)
  }
  await deleteFromStore(STORES.ACCOUNTS, id)
}

/**
 * Finds an account by ID.
 */
export async function findAccountById(id: number): Promise<AccountInterface | null> {
  return await getByIdFromStore<AccountInterface>(STORES.ACCOUNTS, id)
}

/**
 * Gets all accounts belonging to a user.
 */
export async function getAccounts(userId: number): Promise<AccountInterface[]> {
  const range = IDBKeyRange.only(userId)
  return await getAllFromStore<AccountInterface>(STORES.ACCOUNTS, 'user_id', range)
}

/**
 * Gets the default account for a user.
 */
export async function getDefaultAccount(userId: number): Promise<AccountInterface | null> {
  const accounts = await getAccounts(userId)
  const defaultAcc = accounts.find((acc) => acc.is_default)
  return defaultAcc ?? (accounts.length > 0 ? accounts[0] : null)
}

/**
 * Adjusts an account's balance by deltaAmount (+/- integer).
 */
export async function updateAccountBalance(
  accountId: number,
  deltaAmount: number
): Promise<AccountInterface> {
  const account = await findAccountById(accountId)
  if (!account) {
    throw new Error(`Account dengan ID ${accountId} tidak ditemukan`)
  }

  const newBalance = Math.round(account.balance + deltaAmount)
  return await updateAccount(accountId, { balance: newBalance })
}

/**
 * Calculates the total balance across all accounts for a user.
 */
export async function getTotalBalance(userId: number): Promise<number> {
  const accounts = await getAccounts(userId)
  return accounts.reduce((sum, acc) => sum + acc.balance, 0)
}
