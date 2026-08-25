<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import type { CategoryInterface, CategoryType } from '@/models/category.model'

export interface FilterState {
  type?: CategoryType
  accountId?: number
  categoryId?: number
}

const props = defineProps<{
  modelValue: FilterState
  accounts: AccountInterface[]
  categories: CategoryInterface[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterState): void
}>()

const filteredCategories = computed(() => {
  if (!props.modelValue.type) return props.categories
  return props.categories.filter((cat) => cat.type === props.modelValue.type)
})

const setType = (type?: CategoryType) => {
  emit('update:modelValue', {
    ...props.modelValue,
    type,
    categoryId: undefined // Reset category if type changes
  })
}

const setAccount = (event: Event) => {
  const val = (event.target as HTMLSelectElement).value
  emit('update:modelValue', {
    ...props.modelValue,
    accountId: val ? parseInt(val, 10) : undefined
  })
}

const setCategory = (event: Event) => {
  const val = (event.target as HTMLSelectElement).value
  emit('update:modelValue', {
    ...props.modelValue,
    categoryId: val ? parseInt(val, 10) : undefined
  })
}

const resetFilter = () => {
  emit('update:modelValue', {})
}

const hasActiveFilter = computed(() => {
  return !!(props.modelValue.type || props.modelValue.accountId || props.modelValue.categoryId)
})
</script>

<template>
  <div class="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-100/80 shadow-soft-sm">
    <!-- Type Filter Tabs -->
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full">
        <button
          type="button"
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center"
          :class="!modelValue.type ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="setType(undefined)"
        >
          Semua
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center"
          :class="modelValue.type === 'expense' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="setType('expense')"
        >
          Pengeluaran
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center"
          :class="modelValue.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="setType('income')"
        >
          Pemasukan
        </button>
      </div>

      <button
        v-if="hasActiveFilter"
        type="button"
        class="text-xs font-bold text-rose-500 hover:text-rose-600 shrink-0 px-2 py-1"
        @click="resetFilter"
      >
        Reset
      </button>
    </div>

    <!-- Dropdowns Filter -->
    <div class="grid grid-cols-2 gap-2">
      <!-- Account Dropdown -->
      <select
        :value="modelValue.accountId || ''"
        class="w-full p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 bg-slate-50/50 focus:outline-none focus:border-brand-500 focus:bg-white"
        @change="setAccount"
      >
        <option value="">Semua Akun</option>
        <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
          {{ acc.name }}
        </option>
      </select>

      <!-- Category Dropdown -->
      <select
        :value="modelValue.categoryId || ''"
        class="w-full p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 bg-slate-50/50 focus:outline-none focus:border-brand-500 focus:bg-white"
        @change="setCategory"
      >
        <option value="">Semua Kategori</option>
        <option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
          {{ cat.name }} ({{ cat.type === 'income' ? 'Masuk' : 'Keluar' }})
        </option>
      </select>
    </div>
  </div>
</template>
