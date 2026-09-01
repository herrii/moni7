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

/**
 * Generic promise-based helper to insert a record into an ObjectStore.
 */
export const addToStore = <T>(storeName: string, data: T): Promise<number> => {
  return openConnection().then((db) => {
    return new Promise<number>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const req = store.add(data)

      req.onsuccess = () => resolve(req.result as number)
      req.onerror = () => reject(new Error(`Failed to add record to store "${storeName}": ${req.error?.message}`))
    })
  })
}

/**
 * Generic promise-based helper to update a record in an ObjectStore.
 */
export const updateInStore = <T>(storeName: string, data: T): Promise<void> => {
  return openConnection().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const req = store.put(data)

      req.onsuccess = () => resolve()
      req.onerror = () => reject(new Error(`Failed to update record in store "${storeName}": ${req.error?.message}`))
    })
  })
}

/**
 * Generic promise-based helper to delete a record from an ObjectStore by primary key.
 */
export const deleteFromStore = (storeName: string, id: number): Promise<void> => {
  return openConnection().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const req = store.delete(id)

      req.onsuccess = () => resolve()
      req.onerror = () => reject(new Error(`Failed to delete record ID ${id} from store "${storeName}": ${req.error?.message}`))
    })
  })
}

/**
 * Generic promise-based helper to fetch a single record by primary key.
 */
export const getByIdFromStore = <T>(storeName: string, id: number): Promise<T | null> => {
  return openConnection().then((db) => {
    return new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const req = store.get(id)

      req.onsuccess = () => resolve((req.result as T) ?? null)
      req.onerror = () => reject(new Error(`Failed to fetch record ID ${id} from store "${storeName}": ${req.error?.message}`))
    })
  })
}

/**
 * Generic promise-based helper to fetch all records from an ObjectStore or Index.
 */
export const getAllFromStore = <T>(
  storeName: string,
  indexName?: string,
  keyRange?: IDBKeyRange,
  direction: IDBCursorDirection = 'next'
): Promise<T[]> => {
  return openConnection().then((db) => {
    return new Promise<T[]>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly')
      const target: IDBObjectStore | IDBIndex = indexName
        ? tx.objectStore(storeName).index(indexName)
        : tx.objectStore(storeName)

      const req = target.getAll(keyRange)

      req.onsuccess = () => {
        let results = (req.result as T[]) ?? []
        if (direction === 'prev' || direction === 'prevunique') {
          results = results.reverse()
        }
        resolve(results)
      }
      req.onerror = () => reject(new Error(`Failed to fetch records from store "${storeName}": ${req.error?.message}`))
    })
  })
}

/**
 * Generic promise-based helper to count records in an ObjectStore or Index.
 */
export const countInStore = (
  storeName: string,
  indexName?: string,
  keyRange?: IDBKeyRange
): Promise<number> => {
  return openConnection().then((db) => {
    return new Promise<number>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly')
      const target: IDBObjectStore | IDBIndex = indexName
        ? tx.objectStore(storeName).index(indexName)
        : tx.objectStore(storeName)

      const req = target.count(keyRange)

      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(new Error(`Failed to count records in store "${storeName}": ${req.error?.message}`))
    })
  })
}
/**
 * Resets the entire database by closing connection, deleting IndexedDB, reopening connection, and running seeders.
 */
export const resetEntireDatabase = async (): Promise<{ userId: number; accountId: number; categoriesCount: number }> => {
  const { DB_NAME } = await import('@/config/database.config')
  closeConnection()
  await deleteDatabase(DB_NAME)
  const db = await openDatabase()
  return await runSeeders(db)
}
