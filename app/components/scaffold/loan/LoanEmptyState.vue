<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create-loan'): void
}>()
</script>

<template>
  <div class="py-8">
    <BaseEmptyState
      title="Belum Ada Catatan Hutang / Piutang"
      description="Catat pinjaman uang atau piutang ke teman/keluarga agar dapat dipantau cicilannya hingga lunas."
      icon="fa-handshake"
      action-text="Buat Catatan Baru"
      @action-click="$emit('create-loan')"
    />
  </div>
</template>
