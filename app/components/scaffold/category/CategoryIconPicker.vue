<script setup lang="ts">
import { CATEGORY_ICONS } from '@/constants/category.constants'
import type { CategoryType } from '@/models/category.model'

const props = defineProps<{
  modelValue: string
  selectedColor?: string
  categoryType?: CategoryType
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Filter icons by current type if applicable, or show all
const filteredIcons = computed(() => {
  if (!props.categoryType) return CATEGORY_ICONS
  return CATEGORY_ICONS.filter((item) => item.type === props.categoryType || item.type === 'expense')
})
</script>

<template>
  <div class="grid grid-cols-6 gap-2 max-h-56 overflow-y-auto p-1">
    <button
      v-for="iconOption in filteredIcons"
      :key="iconOption.value"
      type="button"
      class="flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all"
      :class="modelValue === iconOption.value
        ? 'border-brand-500 bg-brand-50/50 scale-105 shadow-sm'
        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'"
      :title="iconOption.label"
      @click="emit('update:modelValue', iconOption.value)"
    >
      <i
        :class="`fa-solid ${iconOption.value}`"
        class="text-lg"
        :style="{ color: modelValue === iconOption.value ? (selectedColor || '#00abc8') : '#94a3b8' }"
      ></i>
      <span class="text-[9px] font-semibold text-slate-400 truncate w-full text-center">{{ iconOption.label }}</span>
    </button>
  </div>
</template>
