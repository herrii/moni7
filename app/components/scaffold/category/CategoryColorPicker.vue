<script setup lang="ts">
import { CATEGORY_COLORS } from '@/constants/category.constants'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="grid grid-cols-5 gap-3">
    <button
      v-for="colorOption in CATEGORY_COLORS"
      :key="colorOption.value"
      type="button"
      class="w-full aspect-square rounded-2xl border-2 transition-all flex items-center justify-center cursor-pointer"
      :class="modelValue === colorOption.value
        ? 'border-slate-800 scale-110 shadow-md'
        : 'border-transparent hover:scale-105'"
      :style="{ backgroundColor: colorOption.value }"
      :title="colorOption.label"
      @click="emit('update:modelValue', colorOption.value)"
    >
      <i
        v-if="modelValue === colorOption.value"
        class="fa-solid fa-check text-white text-sm drop-shadow"
      ></i>
    </button>
  </div>
</template>
