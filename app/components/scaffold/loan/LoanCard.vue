<script setup lang="ts">
import type { LoanInterface } from '@/models/loan.model'
import { getLoanStatus } from '@/services/loan.service'
import { formatCurrency } from '@/helpers/currency.helper'
import LoanStatusBadge from '~/components/scaffold/loan/LoanStatusBadge.vue'
import moment from 'moment'

interface Props {
  loan: LoanInterface
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'click'): void
}>()

const computedStatus = computed(() => getLoanStatus(props.loan))

const formattedDueDate = computed(() => {
  if (!props.loan.due_date) return null
  return moment(props.loan.due_date).format('DD MMM YYYY')
})

const initial = computed(() => {
  return props.loan.name.trim().charAt(0).toUpperCase() || '?'
})
</script>

<template>
  <div
    class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3.5 hover:shadow-soft-md active:scale-[0.99] transition-all duration-200 cursor-pointer select-none"
    @click="$emit('click')"
  >
    <!-- Top Row: Initial Avatar, Name, Type Pill, Status Badge -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <!-- Initial Avatar -->
        <div
          class="w-11 h-11 rounded-2xl flex items-center justify-center text-base font-extrabold shadow-sm flex-shrink-0"
          :class="
            loan.type === 'receivable'
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-amber-50 text-amber-600 border border-amber-100'
          "
        >
          {{ initial }}
        </div>

        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-bold text-slate-800 truncate leading-snug">
              {{ loan.name }}
            </h4>
          </div>

          <!-- Type Indicator Pill -->
          <div class="flex items-center gap-1.5 mt-0.5">
            <span
              class="text-[10px] font-bold px-2 py-0.5 rounded-full"
              :class="
                loan.type === 'receivable'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              "
            >
              {{ loan.type === 'receivable' ? 'Piutang (Dia Meminjam)' : 'Hutang (Anda Meminjam)' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Status Badge -->
      <LoanStatusBadge :status="computedStatus" />
    </div>

    <!-- Middle/Bottom: Remaining Amount & Due Date -->
    <div class="flex items-center justify-between pt-1 border-t border-slate-50">
      <div class="flex flex-col">
        <span class="text-[10px] text-slate-400 font-medium">Sisa Sisa</span>
        <span
          class="text-sm font-extrabold"
          :class="loan.type === 'receivable' ? 'text-emerald-600' : 'text-amber-600'"
        >
          {{ formatCurrency(loan.remaining_amount) }}
        </span>
      </div>

      <div class="flex flex-col items-end">
        <span class="text-[10px] text-slate-400 font-medium">Jatuh Tempo</span>
        <span v-if="formattedDueDate" class="text-xs font-semibold text-slate-700">
          {{ formattedDueDate }}
        </span>
        <span v-else class="text-xs text-slate-400 font-medium">
          Tanpa tenggat
        </span>
      </div>
    </div>
  </div>
</template>
