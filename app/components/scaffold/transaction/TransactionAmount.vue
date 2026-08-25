<script setup lang="ts">
import type { CategoryType } from '@/models/category.model'
import { formatCurrency } from '@/helpers/currency.helper'

const props = withDefaults(defineProps<{
  amount: number
  type: CategoryType
  showSign?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  showSign: true,
  size: 'md'
})

const formattedText = computed(() => {
  const formatted = formatCurrency(props.amount)
  if (!props.showSign) return formatted
  return props.type === 'income' ? `+ ${formatted}` : `- ${formatted}`
})
</script>

<template>
  <span
    class="font-extrabold tracking-tight truncate"
    :class="[
      type === 'income' ? 'text-emerald-600' : 'text-rose-500',
      size === 'sm' ? 'text-xs' : '',
      size === 'md' ? 'text-sm' : '',
      size === 'lg' ? 'text-lg' : ''
    ]"
  >
    {{ formattedText }}
  </span>
</template>
