import { migrateV1 } from '../migrations/v1'

/**
 * Dispatches database schema upgrade operations based on previous database version.
 */
export const handleMigration = (
  db: IDBDatabase,
  transaction: IDBTransaction | null,
  oldVersion: number,
  newVersion: number | null
): void => {
  console.info(`IndexedDB migrating from version ${oldVersion} to ${newVersion}`)

  if (oldVersion < 1) {
    migrateV1(db)
  }

  // Future version migrations will append conditional steps here
  // e.g., if (oldVersion < 2) migrateV2(db, transaction)
}

export const runMigration = handleMigration

