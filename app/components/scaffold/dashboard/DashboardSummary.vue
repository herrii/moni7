<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

defineProps<{
  income: number
  expense: number
  netBalance: number
}>()

const currentMonthName = computed(() => {
  return moment().format('MMMM YYYY')
})
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/80 flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
      <div class="flex items-center gap-2">
        <i class="fa-regular fa-calendar-check text-brand-500 text-sm"></i>
        <span class="text-xs font-bold text-slate-700 capitalize">Ringkasan {{ currentMonthName }}</span>
      </div>
      <span
        class="text-[10px] font-bold px-2 py-0.5 rounded-full"
        :class="netBalance >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'"
      >
        {{ netBalance >= 0 ? 'Surplus' : 'Defisit' }}
      </span>
    </div>

    <!-- Stats breakdown -->
    <div class="grid grid-cols-3 gap-2 text-center">
      <!-- Income -->
      <div class="flex flex-col gap-0.5 p-2 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
        <span class="text-[10px] font-bold text-slate-400">Pemasukan</span>
        <span class="text-xs font-extrabold text-emerald-600 truncate">
          {{ formatCurrency(income) }}
        </span>
      </div>

      <!-- Expense -->
      <div class="flex flex-col gap-0.5 p-2 rounded-2xl bg-rose-50/50 border border-rose-100/50">
        <span class="text-[10px] font-bold text-slate-400">Pengeluaran</span>
        <span class="text-xs font-extrabold text-rose-500 truncate">
          {{ formatCurrency(expense) }}
        </span>
      </div>

      <!-- Net Balance -->
      <div class="flex flex-col gap-0.5 p-2 rounded-2xl bg-slate-50 border border-slate-100">
        <span class="text-[10px] font-bold text-slate-400">Sisa Bersih</span>
        <span
          class="text-xs font-extrabold truncate"
          :class="netBalance >= 0 ? 'text-slate-800' : 'text-rose-500'"
        >
          {{ formatCurrency(netBalance) }}
        </span>
      </div>
    </div>
  </div>
</template>
