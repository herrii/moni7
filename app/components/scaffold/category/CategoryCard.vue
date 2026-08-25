<script setup lang="ts">
import type { CategoryInterface } from '@/models/category.model'
import CategoryTypeBadge from '~/components/scaffold/category/CategoryTypeBadge.vue'

defineProps<{
  category: CategoryInterface
}>()

defineEmits<{
  (e: 'edit', category: CategoryInterface): void
  (e: 'delete', category: CategoryInterface): void
}>()
</script>

<template>
  <div
    class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/80 transition-all flex items-center justify-between gap-3 group hover:border-slate-200"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <!-- Category Icon -->
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-105"
        :style="{ backgroundColor: category.color + '18', color: category.color }"
      >
        <i :class="`fa-solid ${category.icon}`"></i>
      </div>

      <!-- Name & Type Badge -->
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-slate-800 truncate">{{ category.name }}</span>
          <CategoryTypeBadge :type="category.type" />
        </div>
        <span class="text-xs text-slate-400 font-medium mt-0.5 truncate">
          {{ category.type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 shrink-0" @click.stop>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-brand-600 transition-colors"
        title="Edit Kategori"
        aria-label="Edit Kategori"
        @click="$emit('edit', category)"
      >
        <i class="fa-solid fa-pen text-xs"></i>
      </button>

      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
        title="Hapus Kategori"
        aria-label="Hapus Kategori"
        @click="$emit('delete', category)"
      >
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  </div>
</template>
