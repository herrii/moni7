import type { AccountInterface } from '@/models/account.model'
import { STORES } from '@/config/database.config'

export const createDefaultAccountData = (userId: number): Omit<AccountInterface, 'id'> => ({
  user_id: userId,
  name: 'Cash',
  icon: 'fa-wallet',
  color: '#00abc8',
  balance: 0,
  is_default: true,
  created_at: Date.now(),
  updated_at: Date.now()
})

/**
 * Seeds default "Cash" account for a user if no account exists for that user.
 */
export const seedDefaultAccount = (db: IDBDatabase, userId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ACCOUNTS, 'readwrite')
    const store = tx.objectStore(STORES.ACCOUNTS)
    const index = store.index('user_id')

    const countReq = index.count(IDBKeyRange.only(userId))
    countReq.onsuccess = () => {
      if (countReq.result > 0) {
        // Account already exists
        resolve(0)
        return
      }

      const accountData = createDefaultAccountData(userId)
      const addReq = store.add(accountData)
      addReq.onsuccess = () => resolve(addReq.result as number)
      addReq.onerror = () => reject(new Error(`Failed to seed account: ${addReq.error?.message}`))
    }

    countReq.onerror = () => reject(new Error(`Failed to count accounts: ${countReq.error?.message}`))
  })
}
