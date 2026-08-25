<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <BaseEmptyState
    title="Belum Ada Akun"
    description="Tambahkan akun pertama Anda untuk mulai mencatat keuangan."
    icon="fa-solid fa-wallet"
    action-text="Tambah Akun"
    @action-click="$emit('create')"
  />
</template>
