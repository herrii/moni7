<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { LoanInterface, LoanType } from '@/models/loan.model'
import { formatCurrency, parseCurrencyInput } from '@/helpers/currency.helper'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseInput from '~/components/base/input/BaseInput.vue'
import moment from 'moment'

interface Props {
  initialValues?: Partial<LoanInterface>
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
  isEdit: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'submit', form: Omit<LoanInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>): void
  (e: 'cancel'): void
}>()

const form = reactive({
  type: (props.initialValues.type || 'receivable') as LoanType,
  name: props.initialValues.name || '',
  total_amount: props.initialValues.total_amount || 0,
  loan_date_str: props.initialValues.loan_date
    ? moment(props.initialValues.loan_date).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD'),
  due_date_str: props.initialValues.due_date
    ? moment(props.initialValues.due_date).format('YYYY-MM-DD')
    : '',
  description: props.initialValues.description || ''
})

const amountInputStr = ref(
  props.initialValues.total_amount ? formatCurrency(props.initialValues.total_amount) : ''
)

const nameError = ref('')
const amountError = ref('')

const isAmountDisabled = computed(() => {
  return props.isEdit && (props.initialValues.paid_amount || 0) > 0
})

function handleAmountInput(e: Event) {
  if (isAmountDisabled.value) return
  const target = e.target as globalThis.HTMLInputElement
  const parsed = parseCurrencyInput(target.value)
  form.total_amount = parsed
  amountInputStr.value = parsed > 0 ? formatCurrency(parsed) : ''
  if (parsed > 0) amountError.value = ''
}

function validate(): boolean {
  let valid = true
  nameError.value = ''
  amountError.value = ''

  if (!form.name.trim()) {
    nameError.value = 'Nama kontak harus diisi'
    valid = false
  } else if (form.name.trim().length > 100) {
    nameError.value = 'Nama kontak maksimal 100 karakter'
    valid = false
  }

  if (form.total_amount <= 0) {
    amountError.value = 'Total nilai harus lebih besar dari 0'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  const loanDateTimestamp = moment(form.loan_date_str).startOf('day').valueOf()
  const dueDateTimestamp = form.due_date_str
    ? moment(form.due_date_str).endOf('day').valueOf()
    : 0

  emit('submit', {
    type: form.type,
    name: form.name.trim(),
    total_amount: form.total_amount,
    paid_amount: props.initialValues.paid_amount || 0,
    remaining_amount: Math.max(0, form.total_amount - (props.initialValues.paid_amount || 0)),
    description: form.description.trim(),
    loan_date: loanDateTimestamp,
    due_date: dueDateTimestamp,
    status: props.initialValues.status || 'active'
  })
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <!-- Type Selector Pills -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-700">Tipe Catatan</label>
      <div class="grid grid-cols-2 gap-3 p-1 bg-slate-100/70 rounded-2xl border border-slate-200/50">
        <!-- Piutang -->
        <button
          type="button"
          class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          :class="
            form.type === 'receivable'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          "
          @click="form.type = 'receivable'"
        >
          <i class="fa-solid fa-arrow-down-left"></i>
          <span>Piutang (Dia Meminjam)</span>
        </button>

        <!-- Hutang -->
        <button
          type="button"
          class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          :class="
            form.type === 'debt'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          "
          @click="form.type = 'debt'"
        >
          <i class="fa-solid fa-arrow-up-right"></i>
          <span>Hutang (Anda Meminjam)</span>
        </button>
      </div>
    </div>

    <!-- Person Name Input -->
    <BaseInput
      v-model="form.name"
      label="Nama Kontak / Orang"
      placeholder="Contoh: Budi, Andi, Kak Rina"
      icon="fa-user"
      :error-message="nameError"
      required
    />

    <!-- Total Amount Input -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>Total Nominal (Rp) <span class="text-rose-500">*</span></span>
        <span v-if="isAmountDisabled" class="text-[10px] text-amber-600 font-medium">Terkunci (sudah ada cicilan)</span>
      </label>
      <div class="relative flex items-center">
        <span class="absolute left-4 text-sm font-bold text-brand-600 select-none">Rp</span>
        <input
          :value="amountInputStr"
          type="text"
          inputmode="numeric"
          placeholder="0"
          :disabled="isAmountDisabled"
          class="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-300 disabled:bg-slate-100 disabled:text-slate-400"
          :class="{ 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10': amountError }"
          @input="handleAmountInput"
        />
      </div>
      <span v-if="amountError" class="text-[11px] text-rose-500 font-medium pl-1">
        {{ amountError }}
      </span>
    </div>

    <!-- Dates Grid (Loan Date & Due Date) -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold text-slate-700">Tanggal Transaksi</label>
        <input
          v-model="form.loan_date_str"
          type="date"
          class="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold text-slate-700">
          Jatuh Tempo <span class="text-slate-400 font-normal">(Opsional)</span>
        </label>
        <input
          v-model="form.due_date_str"
          type="date"
          class="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
        />
      </div>
    </div>

    <!-- Description / Note -->
    <BaseInput
      v-model="form.description"
      label="Keterangan / Catatan (Opsional)"
      placeholder="Contoh: Pinjaman modal usaha, patungan makan malam"
      icon="fa-align-left"
    />

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
        {{ isEdit ? 'Simpan Perubahan' : 'Buat Catatan' }}
      </BaseButton>
    </div>
  </form>
</template>
