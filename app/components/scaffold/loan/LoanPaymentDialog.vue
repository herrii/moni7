<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { LoanInterface } from '@/models/loan.model'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseInput from '~/components/base/input/BaseInput.vue'
import moment from 'moment'

interface Props {
  show: boolean
  loan: LoanInterface | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'submit', data: { amount: number; payment_date: number; note?: string }): void
}>()

const amount = ref(0)
const amountInputStr = ref('')
const paymentDateStr = ref(moment().format('YYYY-MM-DD'))
const note = ref('')
const errorMsg = ref('')

const remainingAmount = computed(() => {
  if (!props.loan) return 0
  return props.loan.remaining_amount
})

watch(
  () => props.show,
  (val) => {
    if (val) {
      amount.value = 0
      amountInputStr.value = ''
      paymentDateStr.value = moment().format('YYYY-MM-DD')
      note.value = ''
      errorMsg.value = ''
    }
  }
)

function handleAmountInput(e: Event) {
  const target = e.target as globalThis.HTMLInputElement
  const parsed = parseCurrencyInput(target.value)
  amount.value = parsed
  amountInputStr.value = parsed > 0 ? formatCurrency(parsed) : ''
  if (parsed > 0) errorMsg.value = ''
}

function handleQuickAmount(value: number) {
  amount.value = value
  amountInputStr.value = formatCurrency(value)
  errorMsg.value = ''
}

function validate(): boolean {
  errorMsg.value = ''
  if (amount.value <= 0) {
    errorMsg.value = 'Jumlah cicilan harus lebih besar dari 0'
    return false
  }

  if (remainingAmount.value > 0 && amount.value > remainingAmount.value) {
    errorMsg.value = `Jumlah cicilan melebihi sisa sisa (${formatCurrency(remainingAmount.value)})`
    return false
  }

  return true
}

function handleSubmit() {
  if (!validate()) return
  const paymentTimestamp = moment(paymentDateStr.value).valueOf()
  emit('submit', {
    amount: amount.value,
    payment_date: paymentTimestamp,
    note: note.value.trim() || undefined
  })
}
</script>

<template>
  <BaseBottomSheet
    :show="show"
    title="Tambah Pembayaran Cicilan"
    @update:show="$emit('update:show', $event)"
  >
    <div v-if="loan" class="flex flex-col gap-4 py-2">
      <!-- Loan Info Pill -->
      <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
            :class="
              loan.type === 'receivable'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-amber-50 text-amber-600'
            "
          >
            {{ loan.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-800 truncate">{{ loan.name }}</span>
            <span class="text-[10px] text-slate-400">
              Sisa {{ loan.type === 'receivable' ? 'Piutang' : 'Hutang' }}:
              <strong class="text-slate-600 font-semibold">{{ formatCurrency(loan.remaining_amount) }}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Amount Input -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold text-slate-700">Nominal Cicilan (Rp)</label>
        <div class="relative flex items-center">
          <span class="absolute left-4 text-sm font-bold text-brand-600 select-none">Rp</span>
          <input
            :value="amountInputStr"
            type="text"
            inputmode="numeric"
            placeholder="0"
            class="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-300"
            :class="{ 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10': errorMsg }"
            @input="handleAmountInput"
          />
        </div>
        <span v-if="errorMsg" class="text-[11px] text-rose-500 font-medium pl-1">
          {{ errorMsg }}
        </span>
      </div>

      <!-- Quick Suggestions -->
      <div v-if="remainingAmount > 0" class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="amt in [50000, 100000, 250000, 500000, remainingAmount]"
          :key="amt"
          type="button"
          class="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 text-[11px] font-semibold rounded-xl border border-slate-200/60 active:scale-95 transition-all whitespace-nowrap"
          @click="handleQuickAmount(amt)"
        >
          {{ amt === remainingAmount ? 'Pelunasan Sisa' : formatCurrency(amt) }}
        </button>
      </div>

      <!-- Payment Date -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold text-slate-700">Tanggal Pembayaran</label>
        <input
          v-model="paymentDateStr"
          type="date"
          class="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
        />
      </div>

      <!-- Optional Note -->
      <BaseInput
        v-model="note"
        label="Catatan (Opsional)"
        placeholder="Contoh: Cicilan bulan pertama, transfer via BCA"
        icon="fa-note-sticky"
      />

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pt-2">
        <BaseButton
          type="button"
          variant="secondary"
          class="flex-1"
          :disabled="loading"
          @click="$emit('update:show', false)"
        >
          Batal
        </BaseButton>

        <BaseButton
          type="button"
          variant="primary"
          class="flex-1"
          :loading="loading"
          @click="handleSubmit"
        >
          Simpan Pembayaran
        </BaseButton>
      </div>
    </div>
  </BaseBottomSheet>
</template>
