<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import type { AccountInterface } from '@/models/account.model'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import TransactionAmount from '~/components/scaffold/transaction/TransactionAmount.vue'
import moment from 'moment'

const props = defineProps<{
  show: boolean
  transaction: TransactionInterface | null
  category?: CategoryInterface | null
  account?: AccountInterface | null
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'edit', transaction: TransactionInterface): void
  (e: 'delete', transaction: TransactionInterface): void
}>()

const formattedDate = computed(() => {
  if (!props.transaction) return ''
  return moment(props.transaction.transaction_date).format('DD MMMM YYYY')
})

const formattedCreated = computed(() => {
  if (!props.transaction) return ''
  return moment(props.transaction.created_at).format('DD MMM YYYY, HH:mm')
})
</script>

<template>
  <BaseDialog
    :show="show"
    title="Detail Transaksi"
    type="info"
    confirm-text="Tutup"
    :show-cancel="false"
    @update:show="emit('update:show', $event)"
  >
    <div v-if="transaction" class="flex flex-col gap-4 text-left my-2">
      <!-- Amount Badge Header -->
      <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
        <span class="text-xs font-semibold text-slate-400 mb-1">
          {{ transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}
        </span>
        <TransactionAmount
          :amount="transaction.amount"
          :type="transaction.type"
          size="lg"
        />
      </div>

      <!-- Detail Items -->
      <div class="flex flex-col gap-2.5 text-xs font-semibold text-slate-700">
        <div class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-400">Deskripsi:</span>
          <span class="font-bold text-slate-800">{{ transaction.description }}</span>
        </div>

        <div class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-400">Kategori:</span>
          <div class="flex items-center gap-1.5">
            <i :class="`fa-solid ${category?.icon || 'fa-tag'}`" :style="{ color: category?.color }"></i>
            <span>{{ category?.name || '-' }}</span>
          </div>
        </div>

        <div class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-400">Akun / Dompet:</span>
          <span>{{ account?.name || '-' }}</span>
        </div>

        <div class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-400">Tanggal:</span>
          <span>{{ formattedDate }}</span>
        </div>

        <div class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-400">Dibuat pada:</span>
          <span class="text-slate-400 font-normal">{{ formattedCreated }}</span>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center gap-2 mt-2">
        <button
          type="button"
          class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
          @click="emit('edit', transaction); emit('update:show', false)"
        >
          <i class="fa-solid fa-pen"></i>
          Edit
        </button>
        <button
          type="button"
          class="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
          @click="emit('delete', transaction); emit('update:show', false)"
        >
          <i class="fa-solid fa-trash-can"></i>
          Hapus
        </button>
      </div>
    </div>
  </BaseDialog>
</template>
