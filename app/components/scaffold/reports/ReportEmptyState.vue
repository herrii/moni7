<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create-transaction'): void
}>()
</script>

<template>
  <div class="py-8">
    <BaseEmptyState
      title="Belum Ada Laporan"
      description="Mulai catat pemasukan dan pengeluaran untuk melihat laporan keuangan Anda."
      icon="fa-chart-pie"
      action-text="Buat Transaksi"
      @action-click="$emit('create-transaction')"
    />
  </div>
</template>
