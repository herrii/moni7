<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <BaseEmptyState
    title="Belum Ada Kategori"
    description="Tambahkan kategori pemasukan atau pengeluaran untuk mengelompokkan transaksi Anda."
    icon="fa-solid fa-tags"
    action-text="Tambah Kategori"
    @action-click="$emit('create')"
  />
</template>
