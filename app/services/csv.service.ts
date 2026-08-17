import { getTransactions, createTransaction } from './transaction.service'
import { getAccounts } from './account.service'
import { getCategories } from './category.service'
import type { CategoryType } from '@/models/category.model'

/**
 * Escapes CSV field values. Wraps strings containing commas, quotes, or newlines in double quotes.
 */
function escapeCsvField(val: string | number | boolean | undefined | null): string {
  if (val === null || val === undefined) return ''
  const str = String(val)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * Parses a single CSV line handling quotes and commas.
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let cur = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim())
      cur = ''
    } else {
      cur += char
    }
  }
  result.push(cur.trim())
  return result
}

/**
 * Exports all transactions for a user to CSV string.
 */
export async function exportTransactionsToCsv(userId: number): Promise<string> {
  const transactions = await getTransactions(userId)
  const accounts = await getAccounts(userId)
  const categories = await getCategories(userId)

  const accountMap = new Map(accounts.map((a) => [a.id, a.name]))
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]))

  const headers = ['ID', 'Tanggal', 'Tipe', 'Kategori', 'Dompet', 'Jumlah', 'Catatan']
  const rows: string[][] = [headers]

  for (const t of transactions) {
    const dateStr = new Date(t.transaction_date).toISOString()
    const categoryName = categoryMap.get(t.category_id) || 'Uncategorized'
    const accountName = accountMap.get(t.account_id) || 'Unknown'

    rows.push([
      escapeCsvField(t.id),
      escapeCsvField(dateStr),
      escapeCsvField(t.type),
      escapeCsvField(categoryName),
      escapeCsvField(accountName),
      escapeCsvField(t.amount),
      escapeCsvField(t.description)
    ])
  }

  return rows.map((r) => r.join(',')).join('\n')
}

/**
 * Exports all user accounts to CSV string.
 */
export async function exportAccountsToCsv(userId: number): Promise<string> {
  const accounts = await getAccounts(userId)

  const headers = ['ID', 'Nama Dompet', 'Saldo', 'Default', 'Tgl Dibuat']
  const rows: string[][] = [headers]

  for (const a of accounts) {
    const dateStr = new Date(a.created_at).toISOString()
    rows.push([
      escapeCsvField(a.id),
      escapeCsvField(a.name),
      escapeCsvField(a.balance),
      escapeCsvField(a.is_default ? 'Ya' : 'Tidak'),
      escapeCsvField(dateStr)
    ])
  }

  return rows.map((r) => r.join(',')).join('\n')
}

/**
 * Imports transactions from CSV string into IndexedDB.
 */
export async function importTransactionsFromCsv(
  userId: number,
  csvContent: string
): Promise<{ importedCount: number; errors: string[] }> {
  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (lines.length <= 1) {
    return { importedCount: 0, errors: ['File CSV kosong atau tidak memiliki data'] }
  }

  const accounts = await getAccounts(userId)
  const categories = await getCategories(userId)

  if (accounts.length === 0) {
    return { importedCount: 0, errors: ['Belum ada dompet/akun aktif. Harap buat dompet terlebih dahulu.'] }
  }

  const defaultAccount = accounts.find((a) => a.is_default) || accounts[0]
  const accountByName = new Map(accounts.map((a) => [a.name.toLowerCase(), a]))
  const categoryByName = new Map(categories.map((c) => [c.name.toLowerCase(), c]))
  const defaultCategory = categories[0]

  const errors: string[] = []
  let importedCount = 0

  // Header line is index 0
  for (let i = 1; i < lines.length; i++) {
    try {
      const cols = parseCsvLine(lines[i])
      if (cols.length < 5) {
        errors.push(`Baris ${i + 1}: Kolom kurang lengkap`)
        continue
      }

      // Expected order: [ID, Tanggal, Tipe, Kategori, Dompet, Jumlah, Catatan]
      const rawDate = cols[1]
      const rawType = cols[2].toLowerCase()
      const rawCategory = cols[3]
      const rawAccount = cols[4]
      const rawAmount = cols[5]
      const description = cols[6] || ''

      const amount = Math.abs(parseInt(rawAmount, 10))
      if (isNaN(amount) || amount <= 0) {
        errors.push(`Baris ${i + 1}: Jumlah transaksi "${rawAmount}" tidak valid`)
        continue
      }

      const type: CategoryType = rawType === 'income' || rawType === 'pemasukan' ? 'income' : 'expense'
      const account = accountByName.get(rawAccount.toLowerCase()) || defaultAccount
      const category = categoryByName.get(rawCategory.toLowerCase()) || defaultCategory

      const dateMs = Date.parse(rawDate)
      const transactionDate = isNaN(dateMs) ? Date.now() : dateMs

      await createTransaction({
        user_id: userId,
        account_id: account.id!,
        category_id: category.id!,
        type,
        amount,
        description,
        transaction_date: transactionDate
      })

      importedCount++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengimpor'
      errors.push(`Baris ${i + 1}: ${msg}`)
    }
  }

  return { importedCount, errors }
}
