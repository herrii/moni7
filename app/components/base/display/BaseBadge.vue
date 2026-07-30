<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md'
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center font-bold rounded-full select-none"
    :class="[
      // Size variants
      size === 'sm' ? 'px-2 py-0.5 text-[10px] tracking-wide' : '',
      size === 'md' ? 'px-3 py-1 text-xs tracking-wider' : '',

      // Color variants
      variant === 'primary' ? 'bg-brand-50 text-brand-600 border border-brand-100' : '',
      variant === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : '',
      variant === 'warning' ? 'bg-orange-50 text-orange-600 border border-orange-100' : '',
      variant === 'danger' ? 'bg-red-50 text-red-600 border border-red-100' : '',
      variant === 'neutral' ? 'bg-slate-100 text-slate-600 border border-slate-200/50' : ''
    ]"
  >
    <slot />
  </span>
</template>
