<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <div class="py-8 w-full flex justify-center">
    <BaseEmptyState
      title="Belum Ada Pengguna"
      description="Buat profil pengguna baru untuk mulai mencatat keuangan Anda."
      icon="fa-users"
      action-text="Tambah Pengguna"
      @action-click="$emit('create')"
    />
  </div>
</template>
