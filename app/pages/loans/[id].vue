<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LoanInterface } from '@/models/loan.model'
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import {
  findLoanById,
  updateLoan,
  deleteLoan
} from '@/services/loan.service'
import {
  getLoanPayments,
  addLoanPayment,
  deleteLoanPayment,
  markLoanAsPaid
} from '@/services/loan-payment.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import LoanDetail from '~/components/scaffold/loan/LoanDetail.vue'
import LoanForm from '~/components/scaffold/loan/LoanForm.vue'
import LoanPaymentDialog from '~/components/scaffold/loan/LoanPaymentDialog.vue'
import BaseHeader from '~/components/base/BaseHeader.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'

const route = useRoute()
const router = useRouter()
const { refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const loan = ref<LoanInterface | null>(null)
const payments = ref<LoanPaymentInterface[]>([])
const loading = ref(true)
const actionLoading = ref(false)

const showPaymentDialog = ref(false)
const showEditForm = ref(false)
const showDeleteConfirm = ref(false)
const showMarkPaidConfirm = ref(false)
const targetPaymentIdToDelete = ref<number | null>(null)

const loanId = computed(() => {
  const rawId = route.params.id
  const idStr = Array.isArray(rawId) ? rawId[0] : rawId
  return idStr ? parseInt(idStr, 10) : NaN
})

const fetchLoanData = async () => {
  if (isNaN(loanId.value)) {
    showToast('ID Catatan tidak valid', 'error')
    router.push('/loans')
    return
  }

  loading.value = true
  try {
    const [fetchedLoan, fetchedPayments] = await Promise.all([
      findLoanById(loanId.value),
      getLoanPayments(loanId.value)
    ])

    if (!fetchedLoan) {
      showToast('Catatan hutang/piutang tidak ditemukan', 'error')
      router.push('/loans')
      return
    }

    loan.value = fetchedLoan
    payments.value = fetchedPayments
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat detail catatan'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshActiveUser()
  await fetchLoanData()
})

const handleBack = () => {
  if (showEditForm.value) {
    showEditForm.value = false
  } else {
    router.push('/loans')
  }
}

// 1. Add Installment Payment
const handleAddPayment = async (data: { amount: number; payment_date: number; note?: string }) => {
  if (!loan.value?.id) return

  actionLoading.value = true
  try {
    await addLoanPayment({
      loan_id: loan.value.id,
      amount: data.amount,
      payment_date: data.payment_date,
      note: data.note || ''
    })
    showToast('Pembayaran cicilan berhasil dicatat! 💸', 'success')
    showPaymentDialog.value = false
    await fetchLoanData()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mencatat pembayaran'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 2. Mark Loan as Paid ("Lunas")
const handleMarkPaidConfirm = async () => {
  if (!loan.value?.id) return

  actionLoading.value = true
  try {
    await markLoanAsPaid(loan.value.id)
    showToast('Catatan berhasil ditandai LUNAS! 🎉', 'success')
    showMarkPaidConfirm.value = false
    await fetchLoanData()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menandai lunas'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 3. Edit Loan
const handleEditSubmit = async (formData: Omit<LoanInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  if (!loan.value?.id) return

  actionLoading.value = true
  try {
    loan.value = await updateLoan(loan.value.id, formData)
    showToast('Perubahan catatan berhasil disimpan! ✨', 'success')
    showEditForm.value = false
    await fetchLoanData()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal merubah catatan'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 4. Delete Loan
const handleDeleteConfirm = async () => {
  if (!loan.value?.id) return

  actionLoading.value = true
  try {
    await deleteLoan(loan.value.id)
    showToast('Catatan hutang/piutang telah dihapus', 'info')
    showDeleteConfirm.value = false
    router.push('/loans')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus catatan'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 5. Delete Installment Payment
const handleDeletePaymentConfirm = async () => {
  if (!targetPaymentIdToDelete.value) return

  actionLoading.value = true
  try {
    await deleteLoanPayment(targetPaymentIdToDelete.value)
    showToast('Pembayaran cicilan dihapus & sisa diperbarui', 'info')
    targetPaymentIdToDelete.value = null
    await fetchLoanData()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus pembayaran'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <BaseHeader
      :title="showEditForm ? 'Edit Catatan' : 'Detail Hutang / Piutang'"
      show-back
      @back="handleBack"
    />

    <!-- Loading Skeleton -->
    <div v-if="loading" class="py-6 flex flex-col gap-4">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <template v-else-if="loan">
      <!-- Edit Form mode -->
      <div v-if="showEditForm" class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
        <LoanForm
          :initial-values="loan"
          is-edit
          :loading="actionLoading"
          @submit="handleEditSubmit"
          @cancel="showEditForm = false"
        />
      </div>

      <!-- Detail view mode -->
      <LoanDetail
        v-else
        :loan="loan"
        :payments="payments"
        :loading="actionLoading"
        @add-payment="showPaymentDialog = true"
        @mark-paid="showMarkPaidConfirm = true"
        @edit="showEditForm = true"
        @delete="showDeleteConfirm = true"
        @delete-payment="targetPaymentIdToDelete = $event"
      />

      <!-- Payment BottomSheet Dialog -->
      <LoanPaymentDialog
        v-model:show="showPaymentDialog"
        :loan="loan"
        :loading="actionLoading"
        @submit="handleAddPayment"
      />

      <!-- Mark Paid Confirmation Dialog -->
      <BaseDialog
        :show="showMarkPaidConfirm"
        title="Tandai Lunas?"
        description="Pelunasan otomatis akan dicatat untuk sisa sisa saat ini dan status catatan akan diubah menjadi Lunas."
        variant="info"
        confirm-text="Ya, Tandai Lunas"
        cancel-text="Batal"
        :loading="actionLoading"
        @confirm="handleMarkPaidConfirm"
        @cancel="showMarkPaidConfirm = false"
        @update:show="showMarkPaidConfirm = $event"
      />

      <!-- Delete Loan Confirmation Dialog -->
      <BaseDialog
        :show="showDeleteConfirm"
        title="Hapus Catatan?"
        description="Apakah Anda yakin ingin menghapus catatan ini beserta seluruh riwayat cicilannya?"
        variant="danger"
        confirm-text="Ya, Hapus Catatan"
        cancel-text="Batal"
        :loading="actionLoading"
        @confirm="handleDeleteConfirm"
        @cancel="showDeleteConfirm = false"
        @update:show="showDeleteConfirm = $event"
      />

      <!-- Delete Payment Confirmation Dialog -->
      <BaseDialog
        :show="targetPaymentIdToDelete !== null"
        title="Hapus Pembayaran Cicilan?"
        description="Data pembayaran ini akan dihapus dan sisa saldo akan otomatis dikembalikan."
        variant="danger"
        confirm-text="Ya, Hapus"
        cancel-text="Batal"
        :loading="actionLoading"
        @confirm="handleDeletePaymentConfirm"
        @cancel="targetPaymentIdToDelete = null"
        @update:show="(val: boolean) => { if (!val) targetPaymentIdToDelete = null }"
      />
    </template>
  </div>
</template>
