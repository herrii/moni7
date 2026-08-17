import type { UserInterface } from '@/models/user.model'
import { STORES } from '@/config/database.config'

export const DEFAULT_USER_DATA: Omit<UserInterface, 'id'> = {
  name: 'Yogi',
  created_at: Date.now(),
  updated_at: Date.now()
}

/**
 * Seeds default user into the database if no user exists.
 */
export const seedDefaultUser = (db: IDBDatabase): Promise<number> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.USERS, 'readwrite')
    const store = tx.objectStore(STORES.USERS)

    const countReq = store.count()
    countReq.onsuccess = () => {
      if (countReq.result > 0) {
        // User already exists, resolve with existing first key if possible or 1
        const getAllKeysReq = store.getAllKeys()
        getAllKeysReq.onsuccess = () => {
          const firstKey = getAllKeysReq.result[0]
          resolve(typeof firstKey === 'number' ? firstKey : 1)
        }
        getAllKeysReq.onerror = () => resolve(1)
        return
      }

      const addReq = store.add(DEFAULT_USER_DATA)
      addReq.onsuccess = () => resolve(addReq.result as number)
      addReq.onerror = () => reject(new Error(`Failed to seed user: ${addReq.error?.message}`))
    }

    countReq.onerror = () => reject(new Error(`Failed to count users: ${countReq.error?.message}`))
  })
}
