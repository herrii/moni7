<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { message, type, visible, hideToast } = useToast()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="absolute bottom-20 left-6 right-6 z-50 p-4 rounded-2xl shadow-soft-lg flex items-center justify-between text-white text-xs font-semibold gap-3 select-none pointer-events-auto"
      :class="[
        type === 'success' ? 'bg-emerald-500 shadow-emerald-100' : '',
        type === 'error' ? 'bg-red-500 shadow-red-100' : '',
        type === 'warning' ? 'bg-orange-500 shadow-orange-100' : '',
        type === 'info' ? 'bg-slate-800 shadow-slate-200' : ''
      ]"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <!-- Toast icon -->
        <span class="text-sm shrink-0">
          <i v-if="type === 'success'" class="fa-solid fa-circle-check"></i>
          <i v-else-if="type === 'error'" class="fa-solid fa-circle-xmark"></i>
          <i v-else-if="type === 'warning'" class="fa-solid fa-triangle-exclamation"></i>
          <i v-else-if="type === 'info'" class="fa-solid fa-circle-info"></i>
        </span>
        <span class="truncate leading-tight">{{ message }}</span>
      </div>

      <button
        type="button"
        class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/15 active:scale-90 transition-all text-white shrink-0 ml-2"
        aria-label="Tutup"
        @click="hideToast"
      >
        <i class="fa-solid fa-xmark text-[10px]"></i>
      </button>
    </div>
  </Transition>
</template>
