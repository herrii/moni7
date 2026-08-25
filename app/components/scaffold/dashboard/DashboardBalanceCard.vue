<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'

defineProps<{
  totalBalance: number
  accountCount: number
}>()
</script>

<template>
  <div class="bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl p-6 shadow-lg shadow-brand-100/50 text-white flex flex-col justify-between relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none"></div>
    <div class="absolute right-12 -top-10 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>

    <div class="flex items-center justify-between z-10 mb-2">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white text-sm">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <span class="text-xs font-bold text-white/80 uppercase tracking-wider">Total Saldo</span>
      </div>

      <NuxtLink
        to="/profile/settings/accounts"
        class="text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
      >
        <span>{{ accountCount }} Akun</span>
        <i class="fa-solid fa-chevron-right text-[10px]"></i>
      </NuxtLink>
    </div>

    <div class="z-10 mt-1">
      <span class="text-3xl font-extrabold tracking-tight block">
        {{ formatCurrency(totalBalance) }}
      </span>
      <span class="text-[11px] font-medium text-white/70 mt-1 block">
        Gabungan saldo seluruh akun aktif
      </span>
    </div>
  </div>
</template>
