import { STORES } from '@/config/database.config'
import type { UserInterface } from '@/models/user.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore,
  runSeeders,
  openConnection
} from '@/helpers/indexed-db.helper'

/**
 * Creates a new user.
 */
export async function createUser(name: string): Promise<UserInterface> {
  const trimmedName = name.trim()
  if (!trimmedName) {
    throw new Error('Nama pengguna tidak boleh kosong')
  }

  const now = Date.now()
  const userData: Omit<UserInterface, 'id'> = {
    name: trimmedName,
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<UserInterface, 'id'>>(STORES.USERS, userData)
  return { id, ...userData }
}

/**
 * Updates an existing user by ID.
 */
export async function updateUser(
  id: number,
  data: Partial<Omit<UserInterface, 'id' | 'created_at'>>
): Promise<UserInterface> {
  const existing = await findUserById(id)
  if (!existing) {
    throw new Error(`User dengan ID ${id} tidak ditemukan`)
  }

  const updatedName = data.name !== undefined ? data.name.trim() : existing.name
  if (!updatedName) {
    throw new Error('Nama pengguna tidak boleh kosong')
  }

  const updatedUser: UserInterface = {
    ...existing,
    ...data,
    name: updatedName,
    updated_at: Date.now()
  }

  await updateInStore<UserInterface>(STORES.USERS, updatedUser)
  return updatedUser
}

/**
 * Deletes a user by ID.
 */
export async function deleteUser(id: number): Promise<void> {
  const existing = await findUserById(id)
  if (!existing) {
    throw new Error(`User dengan ID ${id} tidak ditemukan`)
  }
  await deleteFromStore(STORES.USERS, id)
}

/**
 * Finds a user by ID.
 */
export async function findUserById(id: number): Promise<UserInterface | null> {
  return await getByIdFromStore<UserInterface>(STORES.USERS, id)
}

/**
 * Gets all users.
 */
export async function getUsers(): Promise<UserInterface[]> {
  return await getAllFromStore<UserInterface>(STORES.USERS)
}

/**
 * Gets the active user. If no user exists, seeds default user, cash account, and categories.
 */
export async function getActiveUser(): Promise<UserInterface> {
  const users = await getUsers()
  if (users.length > 0) {
    return users[0]
  }

  // Seed default data if database has no users yet
  const db = await openConnection()
  await runSeeders(db)
  
  const seededUsers = await getUsers()
  if (seededUsers.length === 0) {
    throw new Error('Gagal menginisialisasi data pengguna default')
  }
  return seededUsers[0]
}
