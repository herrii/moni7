<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import DashboardTransactionItem from '~/components/scaffold/dashboard/DashboardTransactionItem.vue'
import DashboardEmptyState from '~/components/scaffold/dashboard/DashboardEmptyState.vue'

const props = defineProps<{
  transactions: TransactionInterface[]
  categories: CategoryInterface[]
}>()

defineEmits<{
  (e: 'create'): void
}>()

const getCategoryObj = (categoryId: number) => {
  return props.categories.find((c) => c.id === categoryId) || null
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Header -->
    <div class="flex justify-between items-center px-1">
      <h3 class="text-sm font-bold text-slate-800">Transaksi Terbaru</h3>
      <NuxtLink
        v-if="transactions.length > 0"
        to="/transactions"
        class="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors flex items-center gap-1"
      >
        <span>Lihat semua</span>
        <i class="fa-solid fa-chevron-right text-[10px]"></i>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <DashboardEmptyState
      v-if="transactions.length === 0"
      @create="$emit('create')"
    />

    <!-- Transactions List (Max 5) -->
    <div v-else class="bg-white rounded-3xl p-2 shadow-soft-sm border border-slate-100/80 divide-y divide-slate-50">
      <DashboardTransactionItem
        v-for="tx in transactions.slice(0, 5)"
        :key="tx.id"
        :transaction="tx"
        :category="getCategoryObj(tx.category_id)"
      />
    </div>
  </div>
</template>
