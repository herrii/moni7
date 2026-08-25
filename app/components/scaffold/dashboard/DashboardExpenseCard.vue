<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'

defineProps<{
  expenseAmount: number
}>()
</script>

<template>
  <div class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/80 flex items-center gap-3.5">
    <div class="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-lg shrink-0 shadow-sm shadow-rose-100">
      <i class="fa-solid fa-arrow-up-long"></i>
    </div>
    <div class="flex flex-col min-w-0">
      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pengeluaran Bulan Ini</span>
      <span class="text-sm font-extrabold text-rose-500 truncate mt-0.5">
        {{ formatCurrency(expenseAmount) }}
      </span>
    </div>
  </div>
</template>
