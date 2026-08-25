<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import TransactionAmount from '~/components/scaffold/transaction/TransactionAmount.vue'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const props = defineProps<{
  transaction: TransactionInterface
  category?: CategoryInterface | null
}>()

const formattedDate = computed(() => {
  const dateMoment = moment(props.transaction.transaction_date)
  if (dateMoment.isSame(moment(), 'day')) return 'Hari ini'
  if (dateMoment.isSame(moment().subtract(1, 'day'), 'day')) return 'Kemarin'
  return dateMoment.format('DD MMM YYYY')
})
</script>

<template>
  <div class="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
    <div class="flex items-center gap-3 min-w-0">
      <!-- Category Icon -->
      <div
        class="w-10 h-10 rounded-2xl flex items-center justify-center text-sm shrink-0"
        :style="{
          backgroundColor: (category?.color || '#94a3b8') + '18',
          color: category?.color || '#64748b'
        }"
      >
        <i :class="`fa-solid ${category?.icon || 'fa-receipt'}`"></i>
      </div>

      <!-- Description & Date -->
      <div class="flex flex-col min-w-0">
        <span class="text-sm font-bold text-slate-800 truncate">
          {{ transaction.description || category?.name || 'Transaksi' }}
        </span>
        <div class="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <span>{{ category?.name || 'Kategori' }}</span>
          <span>•</span>
          <span>{{ formattedDate }}</span>
        </div>
      </div>
    </div>

    <!-- Amount Badge -->
    <TransactionAmount
      :amount="transaction.amount"
      :type="transaction.type"
      size="sm"
    />
  </div>
</template>
