<script setup lang="ts">
import type { CategoryType } from '@/models/category.model'
import BaseBadge from '~/components/base/display/BaseBadge.vue'

defineProps<{
  type: CategoryType
}>()
</script>

<template>
  <BaseBadge
    :variant="type === 'income' ? 'success' : 'warning'"
    size="sm"
  >
    {{ type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}
  </BaseBadge>
</template>
