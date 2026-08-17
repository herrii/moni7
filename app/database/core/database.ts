import { openConnection, closeConnection, getConnection } from './connection'

/**
 * Initializes the Moni7 IndexedDB database instance.
 */
export const initDatabase = (): Promise<IDBDatabase> => {
  return openConnection()
}

/**
 * Gets the current active IndexedDB database connection or null.
 */
export const getDatabase = (): IDBDatabase | null => {
  return getConnection()
}

/**
 * Closes the active IndexedDB connection.
 */
export const closeDatabase = (): void => {
  closeConnection()
}
