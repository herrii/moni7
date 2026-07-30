<script setup lang="ts">
interface Props {
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'md' | 'xl' | '2xl' | '3xl'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  shadow: 'sm',
  rounded: '3xl',
  padding: 'md',
  bordered: true
})
</script>

<template>
  <div
    class="bg-white transition-all overflow-hidden"
    :class="[
      // Shadow variant
      shadow === 'none' ? 'shadow-none' : '',
      shadow === 'sm' ? 'shadow-soft-sm' : '',
      shadow === 'md' ? 'shadow-soft-md' : '',
      shadow === 'lg' ? 'shadow-soft-lg' : '',

      // Rounded border variant
      rounded === 'none' ? 'rounded-none' : '',
      rounded === 'md' ? 'rounded-md' : '',
      rounded === 'xl' ? 'rounded-xl' : '',
      rounded === '2xl' ? 'rounded-2xl' : '',
      rounded === '3xl' ? 'rounded-3xl' : '',

      // Border outline
      bordered ? 'border border-slate-100/50' : 'border-none'
    ]"
  >
    <!-- Card Header -->
    <div
      v-if="$slots.header"
      class="border-b border-slate-50"
      :class="[
        padding === 'none' ? 'p-0' : '',
        padding === 'sm' ? 'px-4 py-3' : '',
        padding === 'md' ? 'px-5 py-4' : '',
        padding === 'lg' ? 'px-6 py-5' : ''
      ]"
    >
      <slot name="header" />
    </div>

    <!-- Card Body -->
    <div
      :class="[
        padding === 'none' ? 'p-0' : '',
        padding === 'sm' ? 'p-4' : '',
        padding === 'md' ? 'p-5' : '',
        padding === 'lg' ? 'p-6' : ''
      ]"
    >
      <slot />
    </div>

    <!-- Card Footer -->
    <div
      v-if="$slots.footer"
      class="border-t border-slate-50 bg-slate-50/30"
      :class="[
        padding === 'none' ? 'p-0' : '',
        padding === 'sm' ? 'px-4 py-3' : '',
        padding === 'md' ? 'px-5 py-4' : '',
        padding === 'lg' ? 'px-6 py-5' : ''
      ]"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
