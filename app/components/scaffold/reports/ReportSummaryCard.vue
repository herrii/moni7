<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'

interface Props {
  totalIncome: number
  totalExpense: number
  netBalance: number
  totalTransactionCount: number
  periodLabel: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-4">
    <!-- Period Label -->
    <div class="flex items-center justify-between border-b border-slate-50 pb-3">
      <span class="text-[11px] text-slate-400 font-medium">Ringkasan Periode</span>
      <span class="text-[10px] text-slate-400 font-semibold">{{ periodLabel }}</span>
    </div>

    <!-- Summary Rows -->
    <div class="flex flex-col gap-2.5">
      <!-- Income -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[10px]">
            <i class="fa-arrow-trend-up"></i>
          </div>
          <span class="text-xs text-slate-500 font-medium">Pemasukan</span>
        </div>
        <span class="text-xs font-bold text-emerald-500">{{ formatCurrency(totalIncome) }}</span>
      </div>

      <!-- Expense -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-[10px]">
            <i class="fa-arrow-trend-down"></i>
          </div>
          <span class="text-xs text-slate-500 font-medium">Pengeluaran</span>
        </div>
        <span class="text-xs font-bold text-rose-500">{{ formatCurrency(totalExpense) }}</span>
      </div>

      <!-- Net Balance Divider -->
      <div class="border-t border-slate-50 pt-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-[10px]"
            :class="netBalance >= 0 ? 'bg-brand-50 text-brand-500' : 'bg-rose-50 text-rose-500'"
          >
            <i :class="netBalance >= 0 ? 'fa-scale-balanced' : 'fa-triangle-exclamation'"></i>
          </div>
          <span class="text-xs text-slate-800 font-bold">Selisih</span>
        </div>
        <span
          class="text-sm font-extrabold"
          :class="netBalance >= 0 ? 'text-brand-600' : 'text-rose-500'"
        >
          {{ netBalance >= 0 ? '' : '-' }}{{ formatCurrency(Math.abs(netBalance)) }}
        </span>
      </div>

      <!-- Transaction Count -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-[10px]">
            <i class="fa-receipt"></i>
          </div>
          <span class="text-xs text-slate-400 font-medium">Total Transaksi</span>
        </div>
        <span class="text-xs font-bold text-slate-600">{{ totalTransactionCount }} transaksi</span>
      </div>
    </div>
  </div>
</template>
