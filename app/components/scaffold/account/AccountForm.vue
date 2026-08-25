<script setup lang="ts">
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import { ACCOUNT_ICONS, ACCOUNT_COLORS, ACCOUNT_FORM_DEFAULTS } from '@/constants/account.constants'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'

export interface AccountFormData {
  name: string
  balance: number
  icon: string
  color: string
}

const props = withDefaults(defineProps<{
  initialData?: Partial<AccountFormData>
  submitText?: string
  loading?: boolean
  balanceEditable?: boolean
}>(), {
  initialData: () => ({}),
  submitText: 'Simpan Akun',
  loading: false,
  balanceEditable: true
})

const emit = defineEmits<{
  (e: 'submit', data: AccountFormData): void
}>()

const name = ref(props.initialData.name ?? ACCOUNT_FORM_DEFAULTS.name)
const balanceRaw = ref(
  props.initialData.balance !== undefined
    ? props.initialData.balance.toString()
    : ACCOUNT_FORM_DEFAULTS.balance.toString()
)
const selectedIcon = ref(props.initialData.icon ?? ACCOUNT_FORM_DEFAULTS.icon)
const selectedColor = ref(props.initialData.color ?? ACCOUNT_FORM_DEFAULTS.color)

const errors = ref<Record<string, string>>({})

// Watch for initial data changes (e.g. when loading finishes)
watch(() => props.initialData, (newVal) => {
  if (newVal.name !== undefined) name.value = newVal.name
  if (newVal.balance !== undefined) balanceRaw.value = newVal.balance.toString()
  if (newVal.icon !== undefined) selectedIcon.value = newVal.icon
  if (newVal.color !== undefined) selectedColor.value = newVal.color
}, { deep: true })

const balanceDisplay = computed(() => {
  const parsed = parseCurrencyInput(balanceRaw.value)
  return formatCurrency(parsed)
})

const handleSubmit = () => {
  const trimmedName = name.value.trim()
  const balance = parseCurrencyInput(balanceRaw.value)
  const newErrors: Record<string, string> = {}

  if (!trimmedName) {
    newErrors.name = 'Nama akun harus diisi'
  } else if (trimmedName.length > 50) {
    newErrors.name = 'Nama akun tidak boleh lebih dari 50 karakter'
  }

  if (props.balanceEditable && balance < 0) {
    newErrors.balance = 'Saldo awal tidak boleh kurang dari 0'
  }

  errors.value = newErrors

  if (Object.keys(newErrors).length > 0) return

  emit('submit', {
    name: trimmedName,
    balance: props.balanceEditable ? balance : (props.initialData.balance ?? 0),
    icon: selectedIcon.value,
    color: selectedColor.value
  })
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <!-- Name -->
    <BaseInput
      v-model="name"
      label="Nama Akun"
      placeholder="Masukkan nama akun (misal: Cash, Mandiri)"
      :error="errors.name"
      required
    />

    <!-- Balance -->
    <div class="flex flex-col gap-1.5">
      <BaseInput
        v-if="balanceEditable"
        v-model="balanceRaw"
        label="Saldo Awal"
        placeholder="0"
        type="number"
        :error="errors.balance"
        :helper="balanceDisplay"
        required
      />
      <div v-else class="flex flex-col gap-1.5">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Saat Ini</span>
        <div class="p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-semibold text-slate-600">
          {{ balanceDisplay }}
        </div>
        <span class="text-xs text-slate-400 font-medium mt-0.5">
          Saldo dikelola otomatis oleh transaksi
        </span>
      </div>
    </div>

    <!-- Icon Selection -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Ikon</span>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="iconOption in ACCOUNT_ICONS"
          :key="iconOption.value"
          type="button"
          class="flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all"
          :class="selectedIcon === iconOption.value
            ? 'border-brand-500 bg-brand-50/50 scale-105 shadow-sm'
            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'"
          :title="iconOption.label"
          @click="selectedIcon = iconOption.value"
        >
          <i
            :class="`fa-solid ${iconOption.value}`"
            class="text-lg"
            :style="{ color: selectedIcon === iconOption.value ? selectedColor : '#94a3b8' }"
          ></i>
          <span class="text-[9px] font-semibold text-slate-400 truncate w-full text-center">{{ iconOption.label }}</span>
        </button>
      </div>
    </div>

    <!-- Color Selection -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Warna</span>
      <div class="grid grid-cols-5 gap-3">
        <button
          v-for="colorOption in ACCOUNT_COLORS"
          :key="colorOption.value"
          type="button"
          class="w-full aspect-square rounded-2xl border-2 transition-all flex items-center justify-center"
          :class="selectedColor === colorOption.value
            ? 'border-slate-800 scale-110 shadow-md'
            : 'border-transparent hover:scale-105'"
          :style="{ backgroundColor: colorOption.value }"
          :title="colorOption.label"
          @click="selectedColor = colorOption.value"
        >
          <i
            v-if="selectedColor === colorOption.value"
            class="fa-solid fa-check text-white text-sm drop-shadow"
          ></i>
        </button>
      </div>
    </div>

    <!-- Preview -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Pratinjau</span>
      <div class="bg-white rounded-2xl p-4 border border-slate-100/80 flex items-center gap-3.5">
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0"
          :style="{ backgroundColor: selectedColor + '18', color: selectedColor }"
        >
          <i :class="`fa-solid ${selectedIcon}`"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-bold text-slate-800 truncate">{{ name || 'Nama Akun' }}</span>
          <span class="text-xs font-semibold mt-0.5" :style="{ color: selectedColor }">
            {{ balanceDisplay }}
          </span>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <BaseButton
      type="submit"
      variant="primary"
      size="md"
      full-width
      :loading="loading"
    >
      {{ submitText }}
    </BaseButton>
  </form>
</template>
