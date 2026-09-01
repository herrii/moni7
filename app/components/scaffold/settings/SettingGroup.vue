<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <h4 v-if="title" class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
      {{ title }}
    </h4>
    <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
      <slot />
    </div>
  </div>
</template>
