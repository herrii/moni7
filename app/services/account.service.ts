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
 * Checks if an account name already exists for a user.
 * Used for duplicate validation during create/update.
 */
export async function isAccountNameDuplicate(
  userId: number,
  name: string,
  excludeId?: number
): Promise<boolean> {
  const accounts = await getAccounts(userId)
  const normalizedName = name.trim().toLowerCase()
  return accounts.some(
    (acc) => acc.name.toLowerCase() === normalizedName && acc.id !== excludeId
  )
}

/**
 * Creates a new financial account.
 */
export async function createAccount(
  data: Omit<AccountInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<AccountInterface> {
  const trimmedName = data.name.trim()
  if (!trimmedName) {
    throw new Error('Nama akun tidak boleh kosong')
  }

  if (data.balance < 0) {
    throw new Error('Saldo awal tidak boleh kurang dari 0')
  }

  // Check duplicate name for user
  const isDuplicate = await isAccountNameDuplicate(data.user_id, trimmedName)
  if (isDuplicate) {
    throw new Error(`Akun dengan nama "${trimmedName}" sudah ada`)
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
    throw new Error(`Akun dengan ID ${id} tidak ditemukan`)
  }

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error('Nama akun tidak boleh kosong')
  }

  // Check duplicate name for user (excluding self)
  if (data.name !== undefined) {
    const isDuplicate = await isAccountNameDuplicate(
      existing.user_id,
      data.name.trim(),
      id
    )
    if (isDuplicate) {
      throw new Error(`Akun dengan nama "${data.name.trim()}" sudah ada`)
    }
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
 * Prevents deleting the last remaining account for a user.
 */
export async function deleteAccount(id: number): Promise<void> {
  const existing = await findAccountById(id)
  if (!existing) {
    throw new Error(`Akun dengan ID ${id} tidak ditemukan`)
  }

  // Prevent deleting last account
  const userAccounts = await getAccounts(existing.user_id)
  if (userAccounts.length <= 1) {
    throw new Error('Tidak dapat menghapus akun terakhir')
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
 * Gets all accounts belonging to a user, sorted by name.
 */
export async function getAccounts(userId: number): Promise<AccountInterface[]> {
  const range = IDBKeyRange.only(userId)
  const accounts = await getAllFromStore<AccountInterface>(STORES.ACCOUNTS, 'user_id', range)
  return accounts.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Searches accounts by name (case-insensitive).
 */
export async function searchAccounts(userId: number, query: string): Promise<AccountInterface[]> {
  const accounts = await getAccounts(userId)
  const q = query.trim().toLowerCase()
  if (!q) return accounts

  return accounts.filter((acc) => acc.name.toLowerCase().includes(q))
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
    throw new Error(`Akun dengan ID ${accountId} tidak ditemukan`)
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
