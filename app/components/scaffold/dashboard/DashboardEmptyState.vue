<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <BaseEmptyState
    title="Belum Ada Transaksi"
    description="Mulai catat transaksi pertama Anda untuk melihat ringkasan keuangan di sini."
    icon="fa-solid fa-receipt"
    action-text="Catat Transaksi"
    @action-click="$emit('create')"
  />
</template>
