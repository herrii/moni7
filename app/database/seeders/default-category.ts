import type { CategoryInterface } from '@/models/category.model'
import { STORES } from '@/config/database.config'

export const getDefaultCategoriesData = (userId: number): Array<Omit<CategoryInterface, 'id'>> => {
  const now = Date.now()
  return [
    // Income Categories
    { user_id: userId, type: 'income', name: 'Gaji', icon: 'fa-hand-holding-dollar', color: '#10b981', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Bonus', icon: 'fa-gift', color: '#06b6d4', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Hadiah', icon: 'fa-gift', color: '#ec4899', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Cashback', icon: 'fa-coins', color: '#f59e0b', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Investasi', icon: 'fa-chart-line', color: '#8b5cf6', created_at: now, updated_at: now },

    // Expense Categories
    { user_id: userId, type: 'expense', name: 'Makanan', icon: 'fa-utensils', color: '#f97316', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Minuman', icon: 'fa-mug-hot', color: '#f59e0b', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Transportasi', icon: 'fa-bus', color: '#3b82f6', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Belanja', icon: 'fa-cart-shopping', color: '#ec4899', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Tagihan', icon: 'fa-file-invoice-dollar', color: '#6366f1', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Kesehatan', icon: 'fa-heart-pulse', color: '#ef4444', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Pendidikan', icon: 'fa-graduation-cap', color: '#3b82f6', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Hiburan', icon: 'fa-film', color: '#8b5cf6', created_at: now, updated_at: now }
  ]
}

/**
 * Seeds default categories for a user if no categories exist for that user.
 */
export const seedDefaultCategories = (db: IDBDatabase, userId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.CATEGORIES, 'readwrite')
    const store = tx.objectStore(STORES.CATEGORIES)
    const index = store.index('user_id')

    const countReq = index.count(IDBKeyRange.only(userId))
    countReq.onsuccess = () => {
      if (countReq.result > 0) {
        // Categories already seeded for this user
        resolve(0)
        return
      }

      const categories = getDefaultCategoriesData(userId)
      let inserted = 0

      for (const cat of categories) {
        store.add(cat)
        inserted++
      }

      tx.oncomplete = () => resolve(inserted)
      tx.onerror = () => reject(new Error(`Failed to seed categories: ${tx.error?.message}`))
    }

    countReq.onerror = () => reject(new Error(`Failed to count categories: ${countReq.error?.message}`))
  })
}

/**
 * Restores missing default categories for a user without overwriting or duplicating existing ones.
 */
export const restoreDefaultCategoriesSeeder = (db: IDBDatabase, userId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.CATEGORIES, 'readwrite')
    const store = tx.objectStore(STORES.CATEGORIES)
    const index = store.index('user_id')

    const getReq = index.getAll(IDBKeyRange.only(userId))
    getReq.onsuccess = () => {
      const existing = (getReq.result as CategoryInterface[]) || []
      const defaultData = getDefaultCategoriesData(userId)
      let inserted = 0

      for (const defaultCat of defaultData) {
        const exists = existing.some(
          (c) => c.type === defaultCat.type && c.name.toLowerCase() === defaultCat.name.toLowerCase()
        )
        if (!exists) {
          store.add(defaultCat)
          inserted++
        }
      }

      tx.oncomplete = () => resolve(inserted)
      tx.onerror = () => reject(new Error(`Failed to restore categories: ${tx.error?.message}`))
    }

    getReq.onerror = () => reject(new Error(`Failed to fetch categories: ${getReq.error?.message}`))
  })
}
