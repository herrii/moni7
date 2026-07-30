<script setup lang="ts">
interface Props {
  type?: 'spinner' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  skeletonRows?: number
}

withDefaults(defineProps<Props>(), {
  type: 'spinner',
  size: 'md',
  skeletonRows: 3
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <!-- Spinner loader state -->
    <div
      v-if="type === 'spinner'"
      class="animate-spin text-brand-500"
      :class="[
        size === 'sm' ? 'text-lg' : '',
        size === 'md' ? 'text-2xl' : '',
        size === 'lg' ? 'text-4xl' : ''
      ]"
      role="progressbar"
      aria-label="Loading"
    >
      <i class="fa-solid fa-spinner-third"></i>
    </div>

    <!-- Skeleton loader state -->
    <div
      v-else-if="type === 'skeleton'"
      class="w-full flex flex-col gap-3.5"
    >
      <div
        v-for="i in skeletonRows"
        :key="i"
        class="w-full animate-pulse flex flex-col gap-2 bg-white p-4 rounded-2xl border border-slate-100/50"
      >
        <!-- Skeleton components -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-200 rounded-xl"></div>
          <div class="flex flex-col gap-1.5 flex-1">
            <div class="h-3 w-1/3 bg-slate-200 rounded"></div>
            <div class="h-2 w-1/4 bg-slate-100 rounded"></div>
          </div>
          <div class="h-3 w-16 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
