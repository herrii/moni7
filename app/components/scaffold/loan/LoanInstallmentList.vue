<script setup lang="ts">
import type { LoanPaymentInterface } from '@/models/loan-payment.model'
import { formatCurrency } from '@/helpers/currency.helper'
import moment from 'moment'

interface Props {
  payments: LoanPaymentInterface[]
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

defineEmits<{
  (e: 'delete-payment', paymentId: number): void
}>()

function formatDate(timestamp: number): string {
  return moment(timestamp).format('DD MMM YYYY, HH:mm')
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="flex items-center justify-between">
      <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
        Riwayat Cicilan ({{ payments.length }})
      </h4>
    </div>

    <!-- Payment List Container -->
    <div v-if="payments.length > 0" class="flex flex-col gap-2.5">
      <div
        v-for="pmt in payments"
        :key="pmt.id"
        class="bg-white rounded-2xl p-3.5 border border-slate-100/80 shadow-soft-sm flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
            <i class="fa-solid fa-receipt"></i>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-800">{{ formatCurrency(pmt.amount) }}</span>
            <span class="text-[10px] text-slate-400 font-medium">
              {{ formatDate(pmt.payment_date || pmt.created_at) }}
            </span>
            <span v-if="pmt.note" class="text-[11px] text-slate-500 font-normal italic truncate mt-0.5">
              "{{ pmt.note }}"
            </span>
          </div>
        </div>

        <!-- Delete Payment Button -->
        <button
          v-if="!disabled && pmt.id"
          type="button"
          class="w-7 h-7 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center text-xs transition-all active:scale-95 flex-shrink-0"
          title="Hapus Pembayaran"
          @click="$emit('delete-payment', pmt.id!)"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>

    <!-- Empty Installment State -->
    <div v-else class="bg-slate-50/60 rounded-2xl p-4 text-center border border-slate-100">
      <p class="text-xs text-slate-400 font-medium">Belum ada riwayat pembayaran cicilan.</p>
    </div>
  </div>
</template>
