<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import { calculateGoalProgress } from '@/services/goal.service'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseInput from '~/components/base/input/BaseInput.vue'

interface Props {
  show: boolean
  goal: GoalInterface | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'submit', amount: number): void
}>()

const amount = ref(0)
const amountInputStr = ref('')
const note = ref('')
const errorMsg = ref('')

const progressInfo = computed(() => {
  if (!props.goal) return { percentage: 0, remaining: 0, isCompleted: false }
  return calculateGoalProgress(props.goal)
})

watch(
  () => props.show,
  (val) => {
    if (val) {
      amount.value = 0
      amountInputStr.value = ''
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
    errorMsg.value = 'Jumlah kontribusi harus lebih besar dari 0'
    return false
  }

  if (progressInfo.value.remaining > 0 && amount.value > progressInfo.value.remaining) {
    errorMsg.value = `Kontribusi melebihi sisa target (${formatCurrency(progressInfo.value.remaining)})`
    return false
  }

  return true
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', amount.value)
}
</script>

<template>
  <BaseBottomSheet
    :show="show"
    title="Tambah Tabungan Target"
    @update:show="$emit('update:show', $event)"
  >
    <div v-if="goal" class="flex flex-col gap-4 py-2">
      <!-- Target Summary Pill -->
      <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
            :style="{ backgroundColor: goal.color || '#3b82f6' }"
          >
            <i :class="goal.icon ? (goal.icon.startsWith('fa-') ? `fa-solid ${goal.icon}` : `fa-solid fa-${goal.icon}`) : 'fa-solid fa-piggy-bank'"></i>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-800 truncate">{{ goal.title }}</span>
            <span class="text-[10px] text-slate-400">Sisa Target: <strong class="text-slate-600 font-semibold">{{ formatCurrency(progressInfo.remaining) }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Amount Input -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold text-slate-700">Nominal Kontribusi (Rp)</label>
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

      <!-- Quick Amount Suggestions -->
      <div v-if="progressInfo.remaining > 0" class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="amt in [50000, 100000, 250000, 500000, progressInfo.remaining]"
          :key="amt"
          type="button"
          class="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 text-[11px] font-semibold rounded-xl border border-slate-200/60 active:scale-95 transition-all whitespace-nowrap"
          @click="handleQuickAmount(amt)"
        >
          {{ amt === progressInfo.remaining ? 'Pelunasan Sisa' : formatCurrency(amt) }}
        </button>
      </div>

      <!-- Optional Note -->
      <BaseInput
        v-model="note"
        label="Catatan (Opsional)"
        placeholder="Contoh: Dari bonus kerja, hasil jualan"
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
          Simpan Kontribusi
        </BaseButton>
      </div>
    </div>
  </BaseBottomSheet>
</template>
