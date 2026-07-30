<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-[0_8px_24px_rgba(0,171,200,0.4)] border-4 border-slate-50 transition-all duration-300 hover:scale-105 active:scale-95 z-40"
    aria-label="Add new record"
    @click="$emit('click')"
  >
    <span class="text-xl transition-transform duration-300">
      <i class="fa-solid fa-plus"></i>
    </span>
  </button>
</template>
