import { openConnection, closeConnection } from '@/database/core/connection'
import { seedDefaultUser } from '@/database/seeders/default-user'
import { seedDefaultAccount } from '@/database/seeders/default-account'
import { seedDefaultCategories } from '@/database/seeders/default-category'

export interface IndexSpec {
  name: string
  keyPath: string | string[]
  options?: IDBIndexParameters
}

export interface StoreSpec {
  storeName: string
  keyPath?: string
  autoIncrement?: boolean
  indexes?: IndexSpec[]
}

/**
 * Creates an ObjectStore on an IDBDatabase if it doesn't already exist.
 * Must be called during an IDBOpenDBRequest onupgradeneeded event.
 */
export const createStore = (
  db: IDBDatabase,
  spec: StoreSpec
): IDBObjectStore => {
  if (db.objectStoreNames.contains(spec.storeName)) {
    throw new Error(`ObjectStore "${spec.storeName}" already exists`)
  }

  const store = db.createObjectStore(spec.storeName, {
    keyPath: spec.keyPath ?? 'id',
    autoIncrement: spec.autoIncrement ?? true
  })

  if (spec.indexes && spec.indexes.length > 0) {
    createIndexes(store, spec.indexes)
  }

  return store
}

/**
 * Creates indexes on an IDBObjectStore.
 * Must be called during an IDBOpenDBRequest onupgradeneeded event.
 */
export const createIndexes = (
  store: IDBObjectStore,
  indexes: IndexSpec[]
): void => {
  for (const index of indexes) {
    if (!store.indexNames.contains(index.name)) {
      store.createIndex(index.name, index.keyPath, index.options)
    }
  }
}

/**
 * Deletes an entire IndexedDB database by name.
 */
export const deleteDatabase = (dbName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName)

    request.onsuccess = () => resolve()
    request.onerror = () => {
      reject(new Error(`Failed to delete database "${dbName}": ${request.error?.message}`))
    }
    request.onblocked = () => {
      console.warn(`Database deletion blocked for "${dbName}"`)
    }
  })
}

/**
 * Opens connection to IndexedDB database via core connection module.
 */
export const openDatabase = (): Promise<IDBDatabase> => {
  return openConnection()
}

/**
 * Closes current active IndexedDB connection via core connection module.
 */
export const closeDatabase = (): void => {
  closeConnection()
}

/**
 * Manual seeder runner infrastructure. Sequentially seeds default User, Account, and Categories.
 */
export const runSeeders = async (db: IDBDatabase): Promise<{ userId: number; accountId: number; categoriesCount: number }> => {
  const userId = await seedDefaultUser(db)
  const accountId = await seedDefaultAccount(db, userId)
  const categoriesCount = await seedDefaultCategories(db, userId)

  return { userId, accountId, categoriesCount }
}

export { runMigration } from '@/database/core/migration'

