<script setup lang="ts">
import type { UserInterface } from '@/models/user.model'
import BaseBadge from '~/components/base/display/BaseBadge.vue'

defineProps<{
  user: UserInterface
  isActive?: boolean
}>()

defineEmits<{
  (e: 'select', user: UserInterface): void
  (e: 'edit', user: UserInterface): void
  (e: 'delete', user: UserInterface): void
}>()
</script>

<template>
  <div
    class="bg-white rounded-2xl p-4 shadow-soft-sm border transition-all flex items-center justify-between gap-3 cursor-pointer group"
    :class="isActive ? 'border-brand-500 bg-brand-50/20 shadow-brand-100/50' : 'border-slate-100/80 hover:border-slate-200'"
    @click="$emit('select', user)"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <!-- Initial Avatar -->
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-extrabold shrink-0 transition-transform group-hover:scale-105"
        :class="isActive ? 'bg-brand-500 text-white shadow-md shadow-brand-100' : 'bg-slate-100 text-slate-600'"
      >
        {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
      </div>

      <!-- Name & Metadata -->
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-slate-800 truncate">{{ user.name }}</span>
          <BaseBadge v-if="isActive" variant="primary" size="sm">Aktif</BaseBadge>
        </div>
        <span class="text-[10px] text-slate-400 font-medium truncate mt-0.5">
          ID: {{ user.id }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 shrink-0" @click.stop>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-brand-600 transition-colors"
        title="Edit Profil"
        aria-label="Edit Profil"
        @click="$emit('edit', user)"
      >
        <i class="fa-solid fa-pen text-xs"></i>
      </button>

      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
        title="Hapus Profil"
        aria-label="Hapus Profil"
        @click="$emit('delete', user)"
      >
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  </div>
</template>
