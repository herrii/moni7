import { STORES } from '@/config/database.config'
import type { CategoryInterface, CategoryType } from '@/models/category.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore,
  openDatabase
} from '@/helpers/indexed-db.helper'
import { seedDefaultCategories, restoreDefaultCategoriesSeeder } from '@/database/seeders/default-category'

/**
 * Checks if a category name already exists for a user under the same category type.
 */
export async function isCategoryNameDuplicate(
  userId: number,
  name: string,
  type: CategoryType,
  excludeId?: number
): Promise<boolean> {
  const categories = await getCategories(userId, type)
  const normalizedName = name.trim().toLowerCase()
  return categories.some(
    (cat) => cat.name.toLowerCase() === normalizedName && cat.id !== excludeId
  )
}

/**
 * Creates a new transaction category.
 */
export async function createCategory(
  data: Omit<CategoryInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<CategoryInterface> {
  const trimmedName = data.name.trim()
  if (!trimmedName) {
    throw new Error('Nama kategori tidak boleh kosong')
  }

  const isDuplicate = await isCategoryNameDuplicate(data.user_id, trimmedName, data.type)
  if (isDuplicate) {
    throw new Error(`Kategori ${data.type === 'income' ? 'Pemasukan' : 'Pengeluaran'} dengan nama "${trimmedName}" sudah ada`)
  }

  const now = Date.now()
  const categoryData: Omit<CategoryInterface, 'id'> = {
    ...data,
    name: trimmedName,
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<CategoryInterface, 'id'>>(STORES.CATEGORIES, categoryData)
  return { id, ...categoryData }
}

/**
 * Updates an existing category.
 */
export async function updateCategory(
  id: number,
  data: Partial<Omit<CategoryInterface, 'id' | 'user_id' | 'created_at'>>
): Promise<CategoryInterface> {
  const existing = await findCategoryById(id)
  if (!existing) {
    throw new Error(`Kategori dengan ID ${id} tidak ditemukan`)
  }

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error('Nama kategori tidak boleh kosong')
  }

  const targetName = data.name !== undefined ? data.name.trim() : existing.name
  const targetType = data.type !== undefined ? data.type : existing.type

  if (data.name !== undefined || data.type !== undefined) {
    const isDuplicate = await isCategoryNameDuplicate(
      existing.user_id,
      targetName,
      targetType,
      id
    )
    if (isDuplicate) {
      throw new Error(`Kategori ${targetType === 'income' ? 'Pemasukan' : 'Pengeluaran'} dengan nama "${targetName}" sudah ada`)
    }
  }

  const updatedCategory: CategoryInterface = {
    ...existing,
    ...data,
    name: targetName,
    type: targetType,
    updated_at: Date.now()
  }

  await updateInStore<CategoryInterface>(STORES.CATEGORIES, updatedCategory)
  return updatedCategory
}

/**
 * Deletes a category by ID.
 */
export async function deleteCategory(id: number): Promise<void> {
  const existing = await findCategoryById(id)
  if (!existing) {
    throw new Error(`Kategori dengan ID ${id} tidak ditemukan`)
  }
  await deleteFromStore(STORES.CATEGORIES, id)
}

/**
 * Finds a category by ID.
 */
export async function findCategoryById(id: number): Promise<CategoryInterface | null> {
  return await getByIdFromStore<CategoryInterface>(STORES.CATEGORIES, id)
}

/**
 * Gets categories belonging to a user, optionally filtered by income/expense type, sorted alphabetically.
 */
export async function getCategories(
  userId: number,
  type?: CategoryType
): Promise<CategoryInterface[]> {
  const range = IDBKeyRange.only(userId)
  const categories = await getAllFromStore<CategoryInterface>(STORES.CATEGORIES, 'user_id', range)
  
  let filtered = categories
  if (type) {
    filtered = categories.filter((cat) => cat.type === type)
  }
  return filtered.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Searches categories by name (case-insensitive) for a user, optionally filtered by type.
 */
export async function searchCategories(
  userId: number,
  query: string,
  type?: CategoryType
): Promise<CategoryInterface[]> {
  const categories = await getCategories(userId, type)
  const q = query.trim().toLowerCase()
  if (!q) return categories

  return categories.filter((cat) => cat.name.toLowerCase().includes(q))
}

/**
 * Seeds default categories for a user if none exist.
 */
export async function seedCategories(userId: number): Promise<number> {
  const db = await openDatabase()
  return await seedDefaultCategories(db, userId)
}

/**
 * Restores missing default categories for a user without overwriting or creating duplicate categories.
 */
export async function restoreDefaultCategories(userId: number): Promise<number> {
  const db = await openDatabase()
  return await restoreDefaultCategoriesSeeder(db, userId)
}
