<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import type { CategoryInterface, CategoryType } from '@/models/category.model'
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import TransactionDatePicker from '~/components/scaffold/transaction/TransactionDatePicker.vue'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'
import BaseIconSelect from '~/components/base/input/BaseIconSelect.vue'
import type { IconSelectOption } from '~/components/base/input/BaseIconSelect.vue'

// Map categories to IconSelectOptions
const categoryOptions = computed<IconSelectOption[]>(() => {
  return availableCategories.value.map((cat) => ({
    label: cat.name,
    value: cat.id!,
    icon: cat.icon,
    color: cat.color,
    sublabel: cat.type === 'income' ? 'Pemasukan' : 'Pengeluaran'
  }))
})

// Map accounts to IconSelectOptions
const accountOptions = computed<IconSelectOption[]>(() => {
  return props.accounts.map((acc) => ({
    label: acc.name,
    value: acc.id!,
    icon: acc.icon,
    color: acc.color,
    sublabel: `Saldo: ${formatCurrency(acc.balance)}`
  }))
})

export interface TransactionFormData {
  type: CategoryType
  account_id: number
  category_id: number
  amount: number
  transaction_date: number
  description: string
}

const props = withDefaults(defineProps<{
  initialData?: Partial<TransactionFormData>
  accounts: AccountInterface[]
  categories: CategoryInterface[]
  submitText?: string
  loading?: boolean
  fixedType?: CategoryType
}>(), {
  initialData: () => ({}),
  submitText: 'Simpan Transaksi',
  loading: false,
  fixedType: undefined
})

const emit = defineEmits<{
  (e: 'submit', data: TransactionFormData): void
  (e: 'cancel'): void
}>()

const type = ref<CategoryType>(
  props.fixedType || props.initialData.type || 'expense'
)
const accountId = ref<number>(
  props.initialData.account_id || (props.accounts.length > 0 ? props.accounts[0].id! : 0)
)
const categoryId = ref<number>(
  props.initialData.category_id || 0
)
const amountRaw = ref<string>(
  props.initialData.amount !== undefined ? props.initialData.amount.toString() : ''
)
const transactionDate = ref<number>(
  props.initialData.transaction_date || Date.now()
)
const description = ref<string>(
  props.initialData.description || ''
)

const errors = ref<Record<string, string>>({})

// Filter categories strictly by active Type
const availableCategories = computed(() => {
  return props.categories.filter((cat) => cat.type === type.value)
})

// Automatically pick first category if current selection is invalid for active type
watch(availableCategories, (newCategories) => {
  const currentValid = newCategories.some((cat) => cat.id === categoryId.value)
  if (!currentValid && newCategories.length > 0) {
    categoryId.value = newCategories[0].id!
  }
}, { immediate: true })

watch(type, () => {
  if (availableCategories.value.length > 0) {
    categoryId.value = availableCategories.value[0].id!
  }
})

// Format helper display
const amountDisplay = computed(() => {
  const parsed = parseCurrencyInput(amountRaw.value)
  return formatCurrency(parsed)
})

const handleSubmit = () => {
  const newErrors: Record<string, string> = {}
  const parsedAmount = parseCurrencyInput(amountRaw.value)
  const trimmedDesc = description.value.trim()

  if (!accountId.value) {
    newErrors.account_id = 'Pilih akun / dompet'
  }
  if (!categoryId.value) {
    newErrors.category_id = 'Pilih kategori'
  }
  if (parsedAmount <= 0) {
    newErrors.amount = 'Jumlah transaksi harus lebih besar dari 0'
  }
  if (!trimmedDesc) {
    newErrors.description = 'Deskripsi transaksi harus diisi'
  } else if (trimmedDesc.length > 100) {
    newErrors.description = 'Deskripsi maksimal 100 karakter'
  }

  errors.value = newErrors

  if (Object.keys(newErrors).length > 0) return

  emit('submit', {
    type: type.value,
    account_id: accountId.value,
    category_id: categoryId.value,
    amount: parsedAmount,
    transaction_date: transactionDate.value,
    description: trimmedDesc
  })
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <!-- Type Selector (Income vs Expense) if not fixed -->
    <div v-if="!fixedType" class="flex flex-col gap-1.5">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipe Transaksi</span>
      <div class="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
        <button
          type="button"
          class="py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          :class="type === 'expense' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="type = 'expense'"
        >
          <i class="fa-solid fa-arrow-up-from-bracket text-xs"></i>
          Pengeluaran
        </button>
        <button
          type="button"
          class="py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          :class="type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="type = 'income'"
        >
          <i class="fa-solid fa-arrow-down-to-bracket text-xs"></i>
          Pemasukan
        </button>
      </div>
    </div>

    <!-- Amount Input -->
    <div class="flex flex-col gap-1.5">
      <BaseInput
        id="transaction-amount"
        v-model="amountRaw"
        label="Jumlah Transaksi (Rp)"
        placeholder="0"
        type="number"
        :error="errors.amount"
        :helper="amountDisplay"
        required
      />
    </div>

    <!-- Category Dropdown Select with Icons -->
    <BaseIconSelect
      id="transaction-category"
      v-model="categoryId"
      label="Kategori"
      placeholder="Pilih Kategori"
      :options="categoryOptions"
      :error="errors.category_id"
      required
    />

    <!-- Account Dropdown Select with Icons -->
    <BaseIconSelect
      id="transaction-account"
      v-model="accountId"
      label="Akun / Dompet"
      placeholder="Pilih Akun / Dompet"
      :options="accountOptions"
      :error="errors.account_id"
      required
    />

    <!-- Date Picker -->
    <TransactionDatePicker
      v-model="transactionDate"
      label="Tanggal Transaksi"
    />

    <!-- Description Input -->
    <BaseInput
      id="transaction-description"
      v-model="description"
      label="Deskripsi / Keterangan"
      placeholder="Misal: Makan Siang Nasi Padang"
      :error="errors.description"
      required
    />

    <!-- Actions -->
    <div class="flex items-center gap-3 mt-2">
      <BaseButton
        type="button"
        variant="secondary"
        size="md"
        class="flex-1"
        @click="emit('cancel')"
      >
        Batal
      </BaseButton>

      <BaseButton
        type="submit"
        :variant="type === 'income' ? 'primary' : 'danger'"
        size="md"
        class="flex-1"
        :loading="loading"
      >
        {{ submitText }}
      </BaseButton>
    </div>
  </form>
</template>
