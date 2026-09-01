<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon: string
  iconColor?: string
  badge?: string
  to?: string
  danger?: boolean
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  iconColor: 'text-slate-400',
  badge: '',
  to: '',
  danger: false
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    :to="to || undefined"
    class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors select-none"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <div
        class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
        :class="danger ? 'bg-rose-50 text-rose-500' : 'bg-slate-50'"
      >
        <i :class="[icon.startsWith('fa-') ? `fa-solid ${icon}` : `fa-solid fa-${icon}`, danger ? 'text-rose-500' : iconColor]"></i>
      </div>
      <div class="flex flex-col min-w-0">
        <span
          class="text-sm font-semibold truncate"
          :class="danger ? 'text-rose-600 font-bold' : 'text-slate-700'"
        >
          {{ title }}
        </span>
        <span v-if="subtitle" class="text-[11px] text-slate-400 font-medium truncate mt-0.5">
          {{ subtitle }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2 flex-shrink-0">
      <span
        v-if="badge"
        class="text-xs font-bold px-2 py-0.5 rounded-full"
        :class="danger ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'"
      >
        {{ badge }}
      </span>
      <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
    </div>
  </component>
</template>
