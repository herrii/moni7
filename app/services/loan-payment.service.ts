import { STORES } from '@/config/database.config'
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'
import { findLoanById, updateLoan } from './loan.service'

/**
 * Adds an installment payment to a loan and updates loan balances/status.
 */
export async function addLoanPayment(
  data: Omit<LoanPaymentInterface, 'id' | 'created_at'>
): Promise<LoanPaymentInterface> {
  const loan = await findLoanById(data.loan_id)
  if (!loan) {
    throw new Error(`Hutang/Piutang dengan ID ${data.loan_id} tidak ditemukan`)
  }

  const paymentAmount = Math.round(data.amount)
  if (paymentAmount <= 0) {
    throw new Error('Jumlah pembayaran harus lebih besar dari 0')
  }

  const now = Date.now()
  const paymentData: Omit<LoanPaymentInterface, 'id'> = {
    ...data,
    amount: paymentAmount,
    note: data.note ? data.note.trim() : '',
    created_at: now
  }

  const id = await addToStore<Omit<LoanPaymentInterface, 'id'>>(STORES.LOAN_PAYMENTS, paymentData)

  // Update associated loan's paid_amount and status
  const newPaid = loan.paid_amount + paymentAmount
  await updateLoan(loan.id!, { paid_amount: newPaid })

  return { id, ...paymentData }
}

/**
 * Updates an existing loan payment and recalculates loan totals.
 */
export async function updateLoanPayment(
  id: number,
  data: Partial<Omit<LoanPaymentInterface, 'id' | 'loan_id' | 'created_at'>>
): Promise<LoanPaymentInterface> {
  const existing = await getByIdFromStore<LoanPaymentInterface>(STORES.LOAN_PAYMENTS, id)
  if (!existing) {
    throw new Error(`Pembayaran dengan ID ${id} tidak ditemukan`)
  }

  const newAmount = data.amount !== undefined ? Math.round(data.amount) : existing.amount
  if (newAmount <= 0) {
    throw new Error('Jumlah pembayaran harus lebih besar dari 0')
  }

  const amountDelta = newAmount - existing.amount
  const loan = await findLoanById(existing.loan_id)
  if (!loan) {
    throw new Error(`Hutang/Piutang terkait dengan ID ${existing.loan_id} tidak ditemukan`)
  }

  const updatedPayment: LoanPaymentInterface = {
    ...existing,
    ...data,
    amount: newAmount,
    note: data.note !== undefined ? data.note.trim() : existing.note
  }

  await updateInStore<LoanPaymentInterface>(STORES.LOAN_PAYMENTS, updatedPayment)

  // Recalculate loan totals
  const newPaid = Math.max(0, loan.paid_amount + amountDelta)
  await updateLoan(loan.id!, { paid_amount: newPaid })

  return updatedPayment
}

/**
 * Deletes a loan payment and reverts the loan's paid amount.
 */
export async function deleteLoanPayment(id: number): Promise<void> {
  const existing = await getByIdFromStore<LoanPaymentInterface>(STORES.LOAN_PAYMENTS, id)
  if (!existing) {
    throw new Error(`Pembayaran dengan ID ${id} tidak ditemukan`)
  }

  const loan = await findLoanById(existing.loan_id)
  if (loan && loan.id) {
    const newPaid = Math.max(0, loan.paid_amount - existing.amount)
    await updateLoan(loan.id, { paid_amount: newPaid })
  }

  await deleteFromStore(STORES.LOAN_PAYMENTS, id)
}

/**
 * Gets payment history for a specific loan.
 */
export async function getLoanPayments(loanId: number): Promise<LoanPaymentInterface[]> {
  const range = IDBKeyRange.only(loanId)
  return await getAllFromStore<LoanPaymentInterface>(STORES.LOAN_PAYMENTS, 'loan_id', range)
}

/**
 * Marks a loan completely as paid ("Lunas") by adding a payment for remaining_amount.
 */
export async function markLoanAsPaid(loanId: number): Promise<LoanPaymentInterface | null> {
  const loan = await findLoanById(loanId)
  if (!loan) {
    throw new Error(`Hutang/Piutang dengan ID ${loanId} tidak ditemukan`)
  }

  if (loan.remaining_amount <= 0) {
    return null
  }

  return await addLoanPayment({
    loan_id: loanId,
    amount: loan.remaining_amount,
    payment_date: Date.now(),
    note: 'Pelunasan otomatis ("Lunas")'
  })
}
