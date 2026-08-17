import { STORES } from '@/config/database.config'
import type { UserInterface } from '@/models/user.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore,
  runSeeders,
  openDatabase
} from '@/helpers/indexed-db.helper'

const ACTIVE_USER_STORAGE_KEY = 'moni7_active_user_id'

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
 * Prevents deleting the last user. If deleting active user, auto-switches active user to another available user.
 */
export async function deleteUser(id: number): Promise<void> {
  const users = await getUsers()
  if (users.length <= 1) {
    throw new Error('Tidak dapat menghapus pengguna terakhir')
  }

  const existing = await findUserById(id)
  if (!existing) {
    throw new Error(`User dengan ID ${id} tidak ditemukan`)
  }

  const activeUser = await getActiveUser()
  const isActiveUserBeingDeleted = activeUser.id === id

  await deleteFromStore(STORES.USERS, id)

  if (isActiveUserBeingDeleted) {
    const remainingUsers = users.filter((u) => u.id !== id)
    if (remainingUsers.length > 0 && remainingUsers[0].id) {
      await setActiveUser(remainingUsers[0].id)
    }
  }
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
 * Searches users by name (case-insensitive).
 */
export async function searchUsers(query: string): Promise<UserInterface[]> {
  const users = await getUsers()
  const q = query.trim().toLowerCase()
  if (!q) return users

  return users.filter((user) => user.name.toLowerCase().includes(q))
}

/**
 * Sets active user by ID and saves to localStorage.
 */
export async function setActiveUser(id: number): Promise<UserInterface> {
  const user = await findUserById(id)
  if (!user) {
    throw new Error(`User dengan ID ${id} tidak ditemukan`)
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(ACTIVE_USER_STORAGE_KEY, String(id))
  }

  return user
}

/**
 * Gets the active user. If no user exists, seeds default user.
 */
export async function getActiveUser(): Promise<UserInterface> {
  let users = await getUsers()
  
  if (users.length === 0) {
    // Seed default data if database has no users yet
    const db = await openDatabase()
    await runSeeders(db)
    users = await getUsers()
  }

  if (users.length === 0) {
    throw new Error('Gagal menginisialisasi data pengguna default')
  }

  // Check localStorage for active user ID preference
  if (typeof window !== 'undefined' && window.localStorage) {
    const activeIdStr = window.localStorage.getItem(ACTIVE_USER_STORAGE_KEY)
    if (activeIdStr) {
      const activeId = parseInt(activeIdStr, 10)
      const found = users.find((u) => u.id === activeId)
      if (found) {
        return found
      }
    }
  }

  // Default to first user and set as active
  const firstUser = users[0]
  if (firstUser.id && typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(ACTIVE_USER_STORAGE_KEY, String(firstUser.id))
  }

  return firstUser
}
