<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
  type: 'button'
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-bold transition-all duration-200 rounded-2xl select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-95 disabled:scale-100 disabled:opacity-50"
    :class="[
      // Size variants
      size === 'sm' ? 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]' : '',
      size === 'md' ? 'px-5 py-3 text-sm gap-2 min-h-[44px]' : '',
      size === 'lg' ? 'px-6 py-4 text-base gap-2.5 min-h-[52px]' : '',

      // Style variants
      variant === 'primary' ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-100' : '',
      variant === 'secondary' ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : '',
      variant === 'outline' ? 'bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-200' : '',
      variant === 'ghost' ? 'bg-transparent hover:bg-slate-50 text-slate-600' : '',
      variant === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-100' : '',

      // Layout sizing
      fullWidth ? 'w-full flex' : 'w-auto'
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="animate-spin text-current shrink-0">
      <i class="fa-solid fa-spinner-third"></i>
    </span>

    <!-- Left Icon slot -->
    <span v-if="!loading && $slots.leftIcon" class="shrink-0">
      <slot name="leftIcon" />
    </span>

    <!-- Label -->
    <span class="truncate">
      <slot />
    </span>

    <!-- Right Icon slot -->
    <span v-if="!loading && $slots.rightIcon" class="shrink-0">
      <slot name="rightIcon" />
    </span>
  </button>
</template>
