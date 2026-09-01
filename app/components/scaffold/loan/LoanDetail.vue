<script setup lang="ts">
import { computed } from 'vue'
import type { LoanInterface } from '@/models/loan.model'
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import { getLoanStatus } from '@/services/loan.service'
import { formatCurrency } from '@/helpers/currency.helper'
import LoanStatusBadge from '~/components/scaffold/loan/LoanStatusBadge.vue'
import LoanInstallmentList from '~/components/scaffold/loan/LoanInstallmentList.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import moment from 'moment'

interface Props {
  loan: LoanInterface
  payments: LoanPaymentInterface[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (e: 'add-payment'): void
  (e: 'mark-paid'): void
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'delete-payment', paymentId: number): void
}>()

const computedStatus = computed(() => getLoanStatus(props.loan))

const formattedLoanDate = computed(() => {
  if (!props.loan.loan_date) return null
  return moment(props.loan.loan_date).format('DD MMMM YYYY')
})

const formattedDueDate = computed(() => {
  if (!props.loan.due_date) return null
  return moment(props.loan.due_date).format('DD MMMM YYYY')
})

const initial = computed(() => {
  return props.loan.name.trim().charAt(0).toUpperCase() || '?'
})
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <!-- Header Card -->
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3.5 min-w-0">
          <div
            class="w-13 h-13 rounded-2xl flex items-center justify-center text-lg font-extrabold shadow-sm flex-shrink-0"
            :class="
              loan.type === 'receivable'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-amber-50 text-amber-600 border border-amber-100'
            "
          >
            {{ initial }}
          </div>
          <div class="flex flex-col min-w-0">
            <h2 class="text-base font-extrabold text-slate-800 leading-snug truncate">
              {{ loan.name }}
            </h2>
            <span class="text-xs font-semibold text-slate-400">
              {{ loan.type === 'receivable' ? 'Piutang (Dia Meminjam)' : 'Hutang (Anda Meminjam)' }}
            </span>
          </div>
        </div>

        <LoanStatusBadge :status="computedStatus" />
      </div>

      <!-- Description if exists -->
      <p v-if="loan.description" class="text-xs text-slate-600 font-medium bg-slate-50 rounded-2xl p-3 border border-slate-100/80">
        {{ loan.description }}
      </p>

      <!-- Amount Breakdown Grid (Original, Paid, Remaining) -->
      <div class="grid grid-cols-3 gap-2 text-center pt-1">
        <div class="bg-slate-50 rounded-2xl p-2.5 border border-slate-100/80 flex flex-col">
          <span class="text-[10px] text-slate-400 font-medium">Total Awal</span>
          <span class="text-xs font-extrabold text-slate-800 truncate">{{ formatCurrency(loan.total_amount) }}</span>
        </div>

        <div class="bg-slate-50 rounded-2xl p-2.5 border border-slate-100/80 flex flex-col">
          <span class="text-[10px] text-slate-400 font-medium">Sudah Dibayar</span>
          <span class="text-xs font-extrabold text-emerald-600 truncate">{{ formatCurrency(loan.paid_amount) }}</span>
        </div>

        <div class="bg-slate-50 rounded-2xl p-2.5 border border-slate-100/80 flex flex-col">
          <span class="text-[10px] text-slate-400 font-medium">Sisa Sisa</span>
          <span
            class="text-xs font-extrabold truncate"
            :class="loan.type === 'receivable' ? 'text-emerald-600' : 'text-amber-600'"
          >
            {{ formatCurrency(loan.remaining_amount) }}
          </span>
        </div>
      </div>

      <!-- Dates metadata footer -->
      <div class="flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-50 pt-3">
        <span>Tanggal: {{ formattedLoanDate || '-' }}</span>
        <span>Tempo: {{ formattedDueDate || 'Tanpa tenggat' }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col gap-3">
      <!-- Add Payment Button (if remaining > 0) -->
      <BaseButton
        v-if="loan.remaining_amount > 0"
        variant="primary"
        size="lg"
        class="w-full shadow-md shadow-brand-200"
        :disabled="loading"
        @click="$emit('add-payment')"
      >
        <i class="fa-solid fa-plus mr-1"></i>
        Tambah Pembayaran Cicilan
      </BaseButton>

      <!-- Mark as Paid Button (if remaining > 0) -->
      <button
        v-if="loan.remaining_amount > 0"
        type="button"
        class="w-full py-3 px-4 rounded-2xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
        :disabled="loading"
        @click="$emit('mark-paid')"
      >
        <i class="fa-solid fa-circle-check"></i>
        Tandai Lunas (Pelunasan Otomatis)
      </button>

      <!-- Paid Banner if remaining <= 0 -->
      <div
        v-else
        class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center flex flex-col items-center gap-1 text-emerald-800"
      >
        <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg mb-1 shadow-sm">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="text-sm font-extrabold">Catatan Ini Telah Lunas 🎉</span>
        <span class="text-xs text-emerald-600 font-medium">Seluruh kewajiban telah diselesaikan sepenuhnya.</span>
      </div>

      <!-- Secondary Edit and Delete Actions -->
      <div class="grid grid-cols-2 gap-3 pt-2">
        <BaseButton
          variant="secondary"
          size="md"
          :disabled="loading"
          @click="$emit('edit')"
        >
          <i class="fa-solid fa-pen-to-square mr-1"></i>
          Edit Catatan
        </BaseButton>

        <BaseButton
          variant="danger"
          size="md"
          :disabled="loading"
          @click="$emit('delete')"
        >
          <i class="fa-solid fa-trash-can mr-1"></i>
          Hapus Catatan
        </BaseButton>
      </div>
    </div>

    <!-- Installment History List -->
    <LoanInstallmentList
      :payments="payments"
      :disabled="loading"
      @delete-payment="$emit('delete-payment', $event)"
    />

    <!-- Informational Note -->
    <div class="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/60 flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed">
      <i class="fa-solid fa-circle-info text-brand-500 mt-0.5 text-xs flex-shrink-0"></i>
      <span>
        Fitur Hutang Piutang bersifat pencatatan mandiri. Pembayaran cicilan tidak memotong saldo akun secara otomatis.
      </span>
    </div>
  </div>
</template>
