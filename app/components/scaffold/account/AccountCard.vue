<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import { formatCurrency } from '@/helpers/currency.helper'

defineProps<{
  account: AccountInterface
}>()

defineEmits<{
  (e: 'edit', account: AccountInterface): void
  (e: 'delete', account: AccountInterface): void
}>()
</script>

<template>
  <div
    class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/80 transition-all flex items-center justify-between gap-3 group hover:border-slate-200"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <!-- Account Icon -->
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-105"
        :style="{ backgroundColor: account.color + '18', color: account.color }"
      >
        <i :class="`fa-solid ${account.icon}`"></i>
      </div>

      <!-- Name & Balance -->
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-slate-800 truncate">{{ account.name }}</span>
          <span
            v-if="account.is_default"
            class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600 shrink-0"
          >Default</span>
        </div>
        <span class="text-xs font-semibold mt-0.5 truncate" :style="{ color: account.color }">
          {{ formatCurrency(account.balance) }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 shrink-0" @click.stop>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-brand-600 transition-colors"
        title="Edit Akun"
        aria-label="Edit Akun"
        @click="$emit('edit', account)"
      >
        <i class="fa-solid fa-pen text-xs"></i>
      </button>

      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
        title="Hapus Akun"
        aria-label="Hapus Akun"
        @click="$emit('delete', account)"
      >
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  </div>
</template>
