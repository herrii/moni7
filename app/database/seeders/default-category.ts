import type { CategoryInterface } from '@/models/category.model'
import { STORES } from '@/config/database.config'

export const getDefaultCategoriesData = (userId: number): Array<Omit<CategoryInterface, 'id'>> => {
  const now = Date.now()
  return [
    // Income Categories
    { user_id: userId, type: 'income', name: 'Gaji', icon: 'fa-money-bill-wave', color: '#10b981', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Bonus', icon: 'fa-gift', color: '#06b6d4', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Investasi', icon: 'fa-chart-line', color: '#8b5cf6', created_at: now, updated_at: now },
    { user_id: userId, type: 'income', name: 'Lainnya', icon: 'fa-circle-plus', color: '#64748b', created_at: now, updated_at: now },

    // Expense Categories
    { user_id: userId, type: 'expense', name: 'Makan & Minum', icon: 'fa-utensils', color: '#f97316', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Transportasi', icon: 'fa-bus', color: '#3b82f6', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Bensin', icon: 'fa-gas-pump', color: '#ef4444', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Jajan', icon: 'fa-cookie-bite', color: '#amber-500', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Belanja', icon: 'fa-cart-shopping', color: '#ec4899', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Tagihan', icon: 'fa-file-invoice-dollar', color: '#6366f1', created_at: now, updated_at: now },
    { user_id: userId, type: 'expense', name: 'Lain-lain', icon: 'fa-circle-question', color: '#64748b', created_at: now, updated_at: now }
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
