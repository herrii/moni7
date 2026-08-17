import { STORES } from '@/config/database.config'
import type { LoanInterface, LoanStatus } from '@/models/loan.model'
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'

/**
 * Creates a new debt/receivable loan record.
 */
export async function createLoan(
  data: Omit<LoanInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<LoanInterface> {
  const trimmedName = data.name.trim()
  if (!trimmedName) {
    throw new Error('Nama kontak hutang/piutang tidak boleh kosong')
  }
  if (data.total_amount <= 0) {
    throw new Error('Total nilai hutang/piutang harus lebih besar dari 0')
  }

  const totalAmount = Math.round(data.total_amount)
  const paidAmount = Math.round(data.paid_amount || 0)
  const remainingAmount = Math.max(0, totalAmount - paidAmount)
  const status: LoanStatus = remainingAmount <= 0 ? 'paid' : 'active'

  const now = Date.now()
  const loanData: Omit<LoanInterface, 'id'> = {
    ...data,
    name: trimmedName,
    total_amount: totalAmount,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    description: data.description ? data.description.trim() : '',
    status,
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

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error('Nama kontak hutang/piutang tidak boleh kosong')
  }

  const totalAmount = data.total_amount !== undefined ? Math.round(data.total_amount) : existing.total_amount
  const paidAmount = data.paid_amount !== undefined ? Math.round(data.paid_amount) : existing.paid_amount
  const remainingAmount = Math.max(0, totalAmount - paidAmount)
  const status: LoanStatus = data.status !== undefined ? data.status : (remainingAmount <= 0 ? 'paid' : 'active')

  const updatedLoan: LoanInterface = {
    ...existing,
    ...data,
    name: data.name !== undefined ? data.name.trim() : existing.name,
    total_amount: totalAmount,
    paid_amount: paidAmount,
    remaining_amount: remainingAmount,
    status,
    description: data.description !== undefined ? data.description.trim() : existing.description,
    updated_at: Date.now()
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
 * Gets loans for a user, optionally filtered by status ('active' | 'paid').
 */
export async function getLoans(
  userId: number,
  status?: LoanStatus
): Promise<LoanInterface[]> {
  const range = IDBKeyRange.only(userId)
  const loans = await getAllFromStore<LoanInterface>(STORES.LOANS, 'user_id', range)

  if (status) {
    return loans.filter((loan) => loan.status === status)
  }
  return loans
}
