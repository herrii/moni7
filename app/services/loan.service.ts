import { STORES } from '@/config/database.config'
import type { LoanInterface, LoanStatus, LoanType } from '@/models/loan.model'
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'

export interface LoanFilterOptions {
  type?: LoanType
  status?: LoanStatus
  search?: string
}

/**
 * Calculates the dynamic status of a loan ('paid' | 'overdue' | 'active').
 */
export function getLoanStatus(loan: LoanInterface): LoanStatus {
  if (loan.remaining_amount <= 0 || loan.status === 'paid') {
    return 'paid'
  }
  // Check if due_date has passed (end of day comparison or exact timestamp)
  if (loan.due_date && loan.due_date < Date.now()) {
    return 'overdue'
  }
  return 'active'
}

/**
 * Validates loan input data.
 */
export function validateLoanData(data: { name?: string; total_amount?: number }) {
  if (data.name !== undefined) {
    const trimmed = data.name.trim()
    if (!trimmed) {
      throw new Error('Nama kontak hutang/piutang tidak boleh kosong')
    }
    if (trimmed.length > 100) {
      throw new Error('Nama kontak maksimal 100 karakter')
    }
  }

  if (data.total_amount !== undefined && data.total_amount <= 0) {
    throw new Error('Total nilai hutang/piutang harus lebih besar dari 0')
  }
}

/**
 * Creates a new debt/receivable loan record.
 */
export async function createLoan(
  data: Omit<LoanInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<LoanInterface> {
  validateLoanData({ name: data.name, total_amount: data.total_amount })

  const totalAmount = Math.round(data.total_amount)
  const paidAmount = Math.round(data.paid_amount || 0)
  const remainingAmount = Math.max(0, totalAmount - paidAmount)

  const tempLoan: Omit<LoanInterface, 'id'> = {
    ...data,
    name: data.name.trim(),
    total_amount: totalAmount,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    description: data.description ? data.description.trim() : '',
    status: 'active',
    created_at: Date.now(),
    updated_at: Date.now()
  }

  const computedStatus = getLoanStatus(tempLoan as LoanInterface)
  const now = Date.now()
  const loanData: Omit<LoanInterface, 'id'> = {
    ...tempLoan,
    status: computedStatus,
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<LoanInterface, 'id'>>(STORES.LOANS, loanData)
  return { id, ...loanData }
}

/**
 * Updates an existing loan record.
 */
export async function updateLoan(
  id: number,
  data: Partial<Omit<LoanInterface, 'id' | 'user_id' | 'created_at'>>
): Promise<LoanInterface> {
  const existing = await findLoanById(id)
  if (!existing) {
    throw new Error(`Hutang/Piutang dengan ID ${id} tidak ditemukan`)
  }

  validateLoanData({ name: data.name, total_amount: data.total_amount })

  // Restrict updating total_amount if payments/installments already exist
  if (
    existing.paid_amount > 0 &&
    data.total_amount !== undefined &&
    Math.round(data.total_amount) !== existing.total_amount
  ) {
    throw new Error('Nilai total hutang/piutang tidak dapat diubah setelah ada cicilan pembayaran')
  }

  const totalAmount = data.total_amount !== undefined ? Math.round(data.total_amount) : existing.total_amount
  const paidAmount = data.paid_amount !== undefined ? Math.round(data.paid_amount) : existing.paid_amount
  const remainingAmount = Math.max(0, totalAmount - paidAmount)

  const updatedLoanTemp: LoanInterface = {
    ...existing,
    ...data,
    name: data.name !== undefined ? data.name.trim() : existing.name,
    total_amount: totalAmount,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    description: data.description !== undefined ? data.description.trim() : existing.description,
    updated_at: Date.now()
  }

  const computedStatus = data.status !== undefined ? data.status : getLoanStatus(updatedLoanTemp)
  const updatedLoan: LoanInterface = {
    ...updatedLoanTemp,
    status: computedStatus
  }

  await updateInStore<LoanInterface>(STORES.LOANS, updatedLoan)
  return updatedLoan
}

/**
 * Deletes a loan and cascade deletes all child loan payments.
 */
export async function deleteLoan(id: number): Promise<void> {
  const existing = await findLoanById(id)
  if (!existing) {
    throw new Error(`Hutang/Piutang dengan ID ${id} tidak ditemukan`)
  }

  // Delete child loan payments first
  const range = IDBKeyRange.only(id)
  const payments = await getAllFromStore<LoanPaymentInterface>(STORES.LOAN_PAYMENTS, 'loan_id', range)
  for (const payment of payments) {
    if (payment.id) {
      await deleteFromStore(STORES.LOAN_PAYMENTS, payment.id)
    }
  }

  await deleteFromStore(STORES.LOANS, id)
}

/**
 * Finds a loan by ID.
 */
export async function findLoanById(id: number): Promise<LoanInterface | null> {
  return await getByIdFromStore<LoanInterface>(STORES.LOANS, id)
}

/**
 * Gets loans for a user, with optional type, status, and search filters, sorted nearest Due Date first.
 */
export async function getLoans(
  userId: number,
  options: LoanFilterOptions = {}
): Promise<LoanInterface[]> {
  const range = IDBKeyRange.only(userId)
  let loans = await getAllFromStore<LoanInterface>(STORES.LOANS, 'user_id', range)

  // Ensure computed status is attached / checked
  loans = loans.map((loan) => ({
    ...loan,
    status: getLoanStatus(loan)
  }))

  if (options.type) {
    loans = loans.filter((loan) => loan.type === options.type)
  }

  if (options.status) {
    loans = loans.filter((loan) => loan.status === options.status)
  }

  if (options.search && options.search.trim()) {
    const q = options.search.trim().toLowerCase()
    loans = loans.filter(
      (loan) =>
        loan.name.toLowerCase().includes(q) ||
        (loan.description && loan.description.toLowerCase().includes(q))
    )
  }

  // Sort: Nearest Due Date first!
  return loans.sort((a, b) => {
    // Paid items go to bottom
    if (a.status === 'paid' && b.status !== 'paid') return 1
    if (a.status !== 'paid' && b.status === 'paid') return -1

    // If both have due date, sort ascending by due date
    if (a.due_date && b.due_date) {
      return a.due_date - b.due_date
    }
    if (a.due_date && !b.due_date) return -1
    if (!a.due_date && b.due_date) return 1

    return b.created_at - a.created_at
  })
}
