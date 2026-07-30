<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="px-6 py-4 flex items-center justify-between">
    <div class="flex flex-col flex-1 min-w-0">
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 truncate">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-xs text-slate-500 mt-0.5 truncate">
        {{ subtitle }}
      </p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <slot name="actions" />
    </div>
  </header>
</template>
