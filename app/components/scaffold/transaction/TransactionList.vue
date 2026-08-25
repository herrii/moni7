<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import type { AccountInterface } from '@/models/account.model'
import TransactionCard from '~/components/scaffold/transaction/TransactionCard.vue'
import TransactionEmptyState from '~/components/scaffold/transaction/TransactionEmptyState.vue'

const props = withDefaults(defineProps<{
  transactions: TransactionInterface[]
  categories: CategoryInterface[]
  accounts: AccountInterface[]
  hasMore?: boolean
  loadingMore?: boolean
}>(), {
  hasMore: false,
  loadingMore: false
})

const emit = defineEmits<{
  (e: 'click', transaction: TransactionInterface): void
  (e: 'edit', transaction: TransactionInterface): void
  (e: 'delete', transaction: TransactionInterface): void
  (e: 'create'): void
  (e: 'load-more'): void
}>()

const getCategory = (categoryId: number) => {
  return props.categories.find((c) => c.id === categoryId) || null
}

const getAccount = (accountId: number) => {
  return props.accounts.find((a) => a.id === accountId) || null
}

// Target ref for Infinite Scroll observer
const loadMoreTrigger = ref<globalThis.HTMLElement | null>(null)

let observer: globalThis.IntersectionObserver | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new globalThis.IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && props.hasMore && !props.loadingMore) {
        emit('load-more')
      }
    }, { threshold: 0.1 })

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div>
    <!-- Empty State -->
    <TransactionEmptyState
      v-if="transactions.length === 0"
      @create="$emit('create')"
    />

    <!-- List -->
    <div v-else class="flex flex-col gap-3">
      <TransactionCard
        v-for="tx in transactions"
        :key="tx.id"
        :transaction="tx"
        :category="getCategory(tx.category_id)"
        :account="getAccount(tx.account_id)"
        @click="$emit('click', tx)"
        @edit="$emit('edit', tx)"
        @delete="$emit('delete', tx)"
      />

      <!-- Load More / Infinite Scroll Trigger -->
      <div
        ref="loadMoreTrigger"
        class="py-4 flex justify-center items-center text-xs font-semibold text-slate-400"
      >
        <span v-if="loadingMore" class="flex items-center gap-2">
          <i class="fa-solid fa-spinner animate-spin text-brand-500"></i>
          Memuat lebih banyak...
        </span>
        <span v-else-if="hasMore" class="cursor-pointer hover:text-brand-600" @click="$emit('load-more')">
          Tampilkan Lebih Banyak
        </span>
        <span v-else class="text-[10px] text-slate-300">
          Semua transaksi telah ditampilkan
        </span>
      </div>
    </div>
  </div>
</template>
