<script setup lang="ts">
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const props = withDefaults(defineProps<{
  modelValue: number // Unix timestamp
  label?: string
  error?: string
}>(), {
  label: 'Tanggal Transaksi',
  error: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', timestamp: number): void
}>()

// Convert timestamp to YYYY-MM-DD for native date input
const dateInputValue = computed(() => {
  return moment(props.modelValue || Date.now()).format('YYYY-MM-DD')
})

// Display format: 08-Jul-2026
const formattedDisplay = computed(() => {
  return moment(props.modelValue || Date.now()).format('DD-MMM-YYYY')
})

const handleInput = (event: Event) => {
  const target = event.target as globalThis.HTMLInputElement
  if (target.value) {
    const timestamp = moment(target.value, 'YYYY-MM-DD').valueOf()
    emit('update:modelValue', timestamp)
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label class="text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
      {{ label }}
    </label>

    <div class="relative w-full">
      <input
        type="date"
        :value="dateInputValue"
        class="w-full border border-slate-100 hover:border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 p-3.5 rounded-2xl text-sm font-semibold text-slate-700 bg-slate-50/50 focus:bg-white focus:outline-none transition-all cursor-pointer"
        @input="handleInput"
      />
    </div>

    <span class="text-xs text-slate-400 font-medium">
      Terpilih: {{ formattedDisplay }}
    </span>

    <span v-if="error" class="text-xs font-semibold text-red-500">
      {{ error }}
    </span>
  </div>
</template>
