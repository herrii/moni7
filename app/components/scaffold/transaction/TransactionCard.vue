<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import type { AccountInterface } from '@/models/account.model'
import TransactionAmount from '~/components/scaffold/transaction/TransactionAmount.vue'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const props = defineProps<{
  transaction: TransactionInterface
  category?: CategoryInterface | null
  account?: AccountInterface | null
}>()

defineEmits<{
  (e: 'click', transaction: TransactionInterface): void
  (e: 'edit', transaction: TransactionInterface): void
  (e: 'delete', transaction: TransactionInterface): void
}>()

const formattedDate = computed(() => {
  return moment(props.transaction.transaction_date).format('DD MMM YYYY')
})
</script>

<template>
  <div
    class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/80 hover:border-slate-200 transition-all flex items-center justify-between gap-3 group cursor-pointer"
    @click="$emit('click', transaction)"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <!-- Category Icon -->
      <div
        class="w-11 h-11 rounded-2xl flex items-center justify-center text-base shrink-0 transition-transform group-hover:scale-105"
        :style="{
          backgroundColor: (category?.color || '#94a3b8') + '18',
          color: category?.color || '#64748b'
        }"
      >
        <i :class="`fa-solid ${category?.icon || 'fa-receipt'}`"></i>
      </div>

      <!-- Description & Metadata -->
      <div class="flex flex-col min-w-0">
        <span class="text-sm font-bold text-slate-800 truncate">
          {{ transaction.description || category?.name || 'Transaksi' }}
        </span>
        <div class="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5 truncate">
          <span>{{ category?.name || 'Kategori' }}</span>
          <span>•</span>
          <span class="truncate">{{ account?.name || 'Akun' }}</span>
          <span>•</span>
          <span>{{ formattedDate }}</span>
        </div>
      </div>
    </div>

    <!-- Amount & Actions -->
    <div class="flex items-center gap-2 shrink-0">
      <TransactionAmount
        :amount="transaction.amount"
        :type="transaction.type"
      />

      <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity" @click.stop>
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-brand-600 transition-colors"
          title="Edit"
          @click="$emit('edit', transaction)"
        >
          <i class="fa-solid fa-pen text-[10px]"></i>
        </button>
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
          title="Hapus"
          @click="$emit('delete', transaction)"
        >
          <i class="fa-solid fa-trash-can text-[10px]"></i>
        </button>
      </div>
    </div>
  </div>
</template>
