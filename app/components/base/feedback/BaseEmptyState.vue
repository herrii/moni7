<script setup lang="ts">
import BaseButton from '~/components/base/button/BaseButton.vue'

interface Props {
  title: string
  description?: string
  icon?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'fa-folder-open',
  description: '',
  actionText: ''
})

defineEmits<{
  (e: 'action-click'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center p-8 w-full max-w-[280px] mx-auto select-none">
    <!-- Icon header -->
    <div class="w-16 h-16 rounded-full bg-slate-100/80 text-slate-400 flex items-center justify-center text-2xl mb-4 border border-slate-50">
      <i :class="icon.startsWith('fa-') ? icon : `fa-${icon}`"></i>
    </div>

    <!-- Title & subtitle description -->
    <h3 class="text-sm font-bold text-slate-800 mb-1 leading-snug">
      {{ title }}
    </h3>
    <p v-if="description" class="text-xs text-slate-400 font-medium leading-relaxed mb-6">
      {{ description }}
    </p>

    <!-- Optional Action Button -->
    <slot name="action">
      <BaseButton
        v-if="actionText"
        variant="secondary"
        size="sm"
        @click="$emit('action-click')"
      >
        {{ actionText }}
      </BaseButton>
    </slot>
  </div>
</template>
