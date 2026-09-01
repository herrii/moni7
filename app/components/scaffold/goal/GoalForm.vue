<script setup lang="ts">
import { reactive } from 'vue'
import type { GoalInterface } from '@/models/goal.model'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseInput from '~/components/base/input/BaseInput.vue'
import moment from 'moment'

interface Props {
  initialValues?: Partial<GoalInterface>
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
  isEdit: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'submit', form: Omit<GoalInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>): void
  (e: 'cancel'): void
}>()

const availableIcons = [
  { name: 'fa-piggy-bank', label: 'Celengan' },
  { name: 'fa-laptop', label: 'Laptop' },
  { name: 'fa-house', label: 'Rumah' },
  { name: 'fa-car', label: 'Kendaraan' },
  { name: 'fa-plane', label: 'Liburan' },
  { name: 'fa-graduation-cap', label: 'Pendidikan' },
  { name: 'fa-gift', label: 'Hadiah' },
  { name: 'fa-sack-dollar', label: 'Tabungan' },
  { name: 'fa-heart-pulse', label: 'Darurat' },
  { name: 'fa-gem', label: 'Investasi' }
]

const availableColors = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
  '#64748b'
]

const form = reactive({
  title: props.initialValues.title || '',
  target_amount: props.initialValues.target_amount || 0,
  target_date_str: props.initialValues.target_date
    ? moment(props.initialValues.target_date).format('YYYY-MM-DD')
    : '',
  icon: props.initialValues.icon || 'fa-piggy-bank',
  color: props.initialValues.color || '#3b82f6'
})

const targetAmountInput = ref(
  props.initialValues.target_amount ? formatCurrency(props.initialValues.target_amount) : ''
)

const titleError = ref('')
const amountError = ref('')

function handleAmountInput(e: Event) {
  const target = e.target as globalThis.HTMLInputElement
  const rawValue = target.value
  const parsed = parseCurrencyInput(rawValue)
  form.target_amount = parsed
  targetAmountInput.value = parsed > 0 ? formatCurrency(parsed) : ''
  if (parsed > 0) amountError.value = ''
}

function validate(): boolean {
  let valid = true
  titleError.value = ''
  amountError.value = ''

  if (!form.title.trim()) {
    titleError.value = 'Nama target harus diisi'
    valid = false
  } else if (form.title.trim().length > 100) {
    titleError.value = 'Nama target maksimal 100 karakter'
    valid = false
  }

  if (form.target_amount <= 0) {
    amountError.value = 'Jumlah target harus lebih besar dari 0'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  const targetDateTimestamp = form.target_date_str
    ? moment(form.target_date_str).endOf('day').valueOf()
    : undefined

  emit('submit', {
    title: form.title.trim(),
    target_amount: form.target_amount,
    current_amount: props.initialValues.current_amount || 0,
    target_date: targetDateTimestamp,
    completed: props.initialValues.completed || false,
    icon: form.icon,
    color: form.color
  })
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <!-- Goal Name Input -->
    <BaseInput
      v-model="form.title"
      label="Nama Target Impian"
      placeholder="Contoh: Beli Laptop Baru, Dana Darurat"
      icon="fa-bullseye"
      :error-message="titleError"
      required
    />

    <!-- Target Amount Input -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>Jumlah Target (Rp) <span class="text-rose-500">*</span></span>
      </label>
      <div class="relative flex items-center">
        <span class="absolute left-4 text-sm font-bold text-brand-600 select-none">Rp</span>
        <input
          :value="targetAmountInput"
          type="text"
          inputmode="numeric"
          placeholder="0"
          class="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-300"
          :class="{ 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10': amountError }"
          @input="handleAmountInput"
        />
      </div>
      <span v-if="amountError" class="text-[11px] text-rose-500 font-medium pl-1">
        {{ amountError }}
      </span>
    </div>

    <!-- Optional Target Date Input -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-700">
        Target Tanggal Pencapaian <span class="text-slate-400 font-normal">(Opsional)</span>
      </label>
      <div class="relative flex items-center">
        <input
          v-model="form.target_date_str"
          type="date"
          class="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
        />
      </div>
    </div>

    <!-- Icon Selection Grid -->
    <div class="flex flex-col gap-2">
      <label class="text-xs font-semibold text-slate-700">Ikon Target</label>
      <div class="grid grid-cols-5 gap-2.5">
        <button
          v-for="ic in availableIcons"
          :key="ic.name"
          type="button"
          class="flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all active:scale-95"
          :class="
            form.icon === ic.name
              ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-sm font-bold'
              : 'border-slate-100 bg-white text-slate-400 hover:text-slate-600 hover:border-slate-200'
          "
          @click="form.icon = ic.name"
        >
          <i :class="ic.name.startsWith('fa-') ? `fa-solid ${ic.name}` : `fa-solid fa-${ic.name}`" class="text-base mb-1"></i>
          <span class="text-[9px] truncate max-w-full">{{ ic.label }}</span>
        </button>
      </div>
    </div>

    <!-- Color Palette Selection -->
    <div class="flex flex-col gap-2">
      <label class="text-xs font-semibold text-slate-700">Warna Tema</label>
      <div class="flex items-center gap-3 overflow-x-auto pb-1">
        <button
          v-for="c in availableColors"
          :key="c"
          type="button"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
          :style="{ backgroundColor: c }"
          @click="form.color = c"
        >
          <i v-if="form.color === c" class="fa-solid fa-check text-white text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Submit / Cancel Buttons -->
    <div class="flex items-center gap-3 pt-3">
      <BaseButton
        type="button"
        variant="secondary"
        class="flex-1"
        :disabled="loading"
        @click="$emit('cancel')"
      >
        Batal
      </BaseButton>

      <BaseButton
        type="submit"
        variant="primary"
        class="flex-1"
        :loading="loading"
      >
        {{ isEdit ? 'Simpan Perubahan' : 'Buat Target' }}
      </BaseButton>
    </div>
  </form>
</template>
