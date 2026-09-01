import { getTransactions, createTransaction } from './transaction.service'
import { getAccounts } from './account.service'
import { getCategories } from './category.service'
import { getGoals } from './goal.service'
import { getLoans } from './loan.service'
import type { CategoryType } from '@/models/category.model'
import moment from 'moment'

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
 * Browser helper to trigger CSV file download with UTF-8 BOM (`\uFEFF`) for Excel compatibility.
 */
export function downloadCsvFile(filename: string, csvContent: string): void {
  if (typeof window === 'undefined') return
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Exports all transactions for a user to CSV string.
 */
export async function exportTransactionsToCsv(userId: number): Promise<string> {
  const transactions = await getTransactions(userId)
  const accounts = await getAccounts(userId)
  const categories = await getCategories(userId)

  const accountMap = new Map(
    accounts
      .filter((a): a is typeof a & { id: number } => a.id !== undefined)
      .map((a) => [a.id, a.name])
  )
  const categoryMap = new Map(
    categories
      .filter((c): c is typeof c & { id: number } => c.id !== undefined)
      .map((c) => [c.id, c.name])
  )

  const headers = ['ID', 'Tanggal', 'Tipe', 'Kategori', 'Dompet', 'Jumlah', 'Catatan']
  const rows: string[][] = [headers]

  for (const t of transactions) {
    const dateStr = moment(t.transaction_date).format('YYYY-MM-DD HH:mm:ss')
    const categoryName = categoryMap.get(t.category_id) || 'Uncategorized'
    const accountName = accountMap.get(t.account_id) || 'Unknown'

    rows.push([
      escapeCsvField(t.id ?? ''),
      escapeCsvField(dateStr),
      escapeCsvField(t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'),
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
    const dateStr = moment(a.created_at).format('YYYY-MM-DD HH:mm:ss')
    rows.push([
      escapeCsvField(a.id ?? ''),
      escapeCsvField(a.name),
      escapeCsvField(a.balance),
      escapeCsvField(a.is_default ? 'Ya' : 'Tidak'),
      escapeCsvField(dateStr)
    ])
  }

  return rows.map((r) => r.join(',')).join('\n')
}

/**
 * Exports all user categories to CSV string.
 */
export async function exportCategoriesToCsv(userId: number): Promise<string> {
  const categories = await getCategories(userId)

  const headers = ['ID', 'Nama Kategori', 'Tipe', 'Ikon', 'Warna', 'Tgl Dibuat']
  const rows: string[][] = [headers]

  for (const c of categories) {
    const dateStr = moment(c.created_at).format('YYYY-MM-DD HH:mm:ss')
    rows.push([
      escapeCsvField(c.id ?? ''),
      escapeCsvField(c.name),
      escapeCsvField(c.type === 'income' ? 'Pemasukan' : 'Pengeluaran'),
      escapeCsvField(c.icon),
      escapeCsvField(c.color),
      escapeCsvField(dateStr)
    ])
  }

  return rows.map((r) => r.join(',')).join('\n')
}

/**
 * Exports all user goals to CSV string.
 */
export async function exportGoalsToCsv(userId: number): Promise<string> {
  const goals = await getGoals(userId)

  const headers = ['ID', 'Nama Target', 'Target Amount', 'Terkumpul', 'Sisa', 'Status', 'Target Tanggal', 'Ikon', 'Warna']
  const rows: string[][] = [headers]

  for (const g of goals) {
    const remaining = Math.max(0, g.target_amount - g.current_amount)
    const status = g.completed || g.current_amount >= g.target_amount ? 'Selesai' : 'Aktif'
    const targetDateStr = g.target_date ? moment(g.target_date).format('YYYY-MM-DD') : '-'

    rows.push([
      escapeCsvField(g.id ?? ''),
      escapeCsvField(g.title),
      escapeCsvField(g.target_amount),
      escapeCsvField(g.current_amount),
      escapeCsvField(remaining),
      escapeCsvField(status),
      escapeCsvField(targetDateStr),
      escapeCsvField(g.icon || 'fa-piggy-bank'),
      escapeCsvField(g.color || '#3b82f6')
    ])
  }

  return rows.map((r) => r.join(',')).join('\n')
}

/**
 * Exports all user loans (Hutang Piutang) to CSV string.
 */
export async function exportLoansToCsv(userId: number): Promise<string> {
  const loans = await getLoans(userId)

  const headers = ['ID', 'Tipe', 'Nama Kontak', 'Total Nominal', 'Sudah Dibayar', 'Sisa Sisa', 'Status', 'Tgl Transaksi', 'Jatuh Tempo', 'Keterangan']
  const rows: string[][] = [headers]

  for (const l of loans) {
    const loanDateStr = moment(l.loan_date).format('YYYY-MM-DD')
    const dueDateStr = l.due_date ? moment(l.due_date).format('YYYY-MM-DD') : '-'
    const typeLabel = l.type === 'receivable' ? 'Piutang' : 'Hutang'
    const statusLabel = l.remaining_amount <= 0 ? 'Lunas' : (l.due_date && l.due_date < Date.now() ? 'Jatuh Tempo' : 'Aktif')

    rows.push([
      escapeCsvField(l.id ?? ''),
      escapeCsvField(typeLabel),
      escapeCsvField(l.name),
      escapeCsvField(l.total_amount),
      escapeCsvField(l.paid_amount),
      escapeCsvField(l.remaining_amount),
      escapeCsvField(statusLabel),
      escapeCsvField(loanDateStr),
      escapeCsvField(dueDateStr),
      escapeCsvField(l.description || '')
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
): Promise<{ importedCount: number; skippedCount: number; errors: string[] }> {
  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (lines.length <= 1) {
    return { importedCount: 0, skippedCount: 0, errors: ['File CSV kosong atau tidak memiliki data'] }
  }

  const accounts = await getAccounts(userId)
  const categories = await getCategories(userId)

  if (accounts.length === 0) {
    return { importedCount: 0, skippedCount: 0, errors: ['Belum ada dompet/akun aktif. Harap buat dompet terlebih dahulu.'] }
  }

  if (categories.length === 0) {
    return { importedCount: 0, skippedCount: 0, errors: ['Belum ada kategori aktif. Harap inisialisasi data default terlebih dahulu.'] }
  }

  const defaultAccount = accounts.find((a) => a.is_default) || accounts[0]
  const accountByName = new Map(accounts.map((a) => [a.name.toLowerCase(), a]))
  const categoryByName = new Map(categories.map((c) => [c.name.toLowerCase(), c]))
  const defaultCategory = categories[0]

  const errors: string[] = []
  let importedCount = 0
  let skippedCount = 0

  // Header line is index 0
  for (let i = 1; i < lines.length; i++) {
    try {
      const cols = parseCsvLine(lines[i])
      if (cols.length < 5) {
        errors.push(`Baris ${i + 1}: Jumlah kolom kurang lengkap`)
        skippedCount++
        continue
      }

      // Expected order: [ID, Tanggal, Tipe, Kategori, Dompet, Jumlah, Catatan]
      const rawDate = cols[1]
      const rawType = (cols[2] || '').toLowerCase()
      const rawCategory = cols[3] || ''
      const rawAccount = cols[4] || ''
      const rawAmount = cols[5] || ''
      const description = cols[6] || ''

      const amount = Math.abs(parseInt(rawAmount.replace(/[^\d]/g, ''), 10))
      if (isNaN(amount) || amount <= 0) {
        errors.push(`Baris ${i + 1}: Nominal "${rawAmount}" tidak valid`)
        skippedCount++
        continue
      }

      const type: CategoryType = rawType === 'income' || rawType === 'pemasukan' ? 'income' : 'expense'
      const account = accountByName.get(rawAccount.toLowerCase()) || defaultAccount
      const category = categoryByName.get(rawCategory.toLowerCase()) || defaultCategory

      if (!account.id || !category.id) {
        errors.push(`Baris ${i + 1}: ID dompet atau kategori tidak valid`)
        skippedCount++
        continue
      }

      const dateMs = moment(rawDate).isValid() ? moment(rawDate).valueOf() : Date.parse(rawDate)
      const transactionDate = isNaN(dateMs) ? Date.now() : dateMs

      await createTransaction({
        user_id: userId,
        account_id: account.id,
        category_id: category.id,
        type,
        amount,
        description,
        transaction_date: transactionDate
      })

      importedCount++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengimpor'
      errors.push(`Baris ${i + 1}: ${msg}`)
      skippedCount++
    }
  }

  return { importedCount, skippedCount, errors }
}
