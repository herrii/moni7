<script setup lang="ts">
import BaseInput from '~/components/base/input/BaseInput.vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="w-full">
    <BaseInput
      id="search-transaction"
      :model-value="modelValue"
      placeholder="Cari transaksi berdasarkan deskripsi..."
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
