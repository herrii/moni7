import { DB_NAME, DB_VERSION } from '@/config/database.config'
import { handleMigration } from './migration'

let dbInstance: IDBDatabase | null = null

/**
 * Opens or retrieves the active IDBDatabase connection instance.
 */
export const openConnection = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance)
      return
    }

    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'))
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result
      const transaction = request.transaction
      handleMigration(db, transaction, event.oldVersion, event.newVersion)
    }

    request.onsuccess = () => {
      dbInstance = request.result

      // Handle unexpected connection closure or error
      dbInstance.onversionchange = () => {
        closeConnection()
      }

      dbInstance.onerror = (event) => {
        console.error('IndexedDB runtime error:', (event.target as IDBRequest).error)
      }

      resolve(dbInstance)
    }

    request.onerror = () => {
      reject(new Error(`Failed to open IndexedDB "${DB_NAME}": ${request.error?.message}`))
    }

    request.onblocked = () => {
      console.warn(`IndexedDB open blocked for "${DB_NAME}". Please close other tabs.`)
    }
  })
}

/**
 * Safely closes the active IDBDatabase connection.
 */
export const closeConnection = (): void => {
  if (dbInstance) {
    dbInstance.close()
    dbInstance = null
  }
}

/**
 * Gets the current connection instance (nullable).
 */
export const getConnection = (): IDBDatabase | null => {
  return dbInstance
}
