<script setup lang="ts">
import BaseEmptyState from '~/components/base/feedback/BaseEmptyState.vue'

defineEmits<{
  (e: 'create-goal'): void
}>()
</script>

<template>
  <div class="py-8">
    <BaseEmptyState
      title="Belum Ada Target"
      description="Rencanakan impian keuangan Anda seperti beli gadget, liburan, atau dana darurat."
      icon="fa-bullseye"
      action-text="Buat Target Baru"
      @action-click="$emit('create-goal')"
    />
  </div>
</template>
