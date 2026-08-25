<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'

defineProps<{
  totalBalance: number
  accountCount: number
}>()
</script>

<template>
  <div class="bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl p-5 shadow-lg shadow-brand-100/50 text-white">
    <div class="flex items-center gap-2 mb-1">
      <i class="fa-solid fa-wallet text-white/70 text-xs"></i>
      <span class="text-xs font-semibold text-white/70 uppercase tracking-wider">Total Saldo</span>
    </div>
    <p class="text-2xl font-extrabold tracking-tight">
      {{ formatCurrency(totalBalance) }}
    </p>
    <span class="text-xs text-white/60 font-medium mt-1 block">
      {{ accountCount }} akun terdaftar
    </span>
  </div>
</template>
