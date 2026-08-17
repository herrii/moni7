import { STORES } from '@/config/database.config'
import type { CategoryInterface, CategoryType } from '@/models/category.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore,
  openConnection
} from '@/helpers/indexed-db.helper'
import { seedDefaultCategories } from '@/database/seeders/default-category'

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

  const updatedCategory: CategoryInterface = {
    ...existing,
    ...data,
    name: data.name !== undefined ? data.name.trim() : existing.name,
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
 * Gets categories belonging to a user, optionally filtered by income/expense type.
 */
export async function getCategories(
  userId: number,
  type?: CategoryType
): Promise<CategoryInterface[]> {
  const range = IDBKeyRange.only(userId)
  const categories = await getAllFromStore<CategoryInterface>(STORES.CATEGORIES, 'user_id', range)
  
  if (type) {
    return categories.filter((cat) => cat.type === type)
  }
  return categories
}

/**
 * Seeds default categories for a user if none exist.
 */
export async function seedCategories(userId: number): Promise<number> {
  const db = await openConnection()
  return await seedDefaultCategories(db, userId)
}
