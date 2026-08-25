<script setup lang="ts">
import type { CategoryInterface } from '@/models/category.model'
import CategoryCard from '~/components/scaffold/category/CategoryCard.vue'
import CategoryEmptyState from '~/components/scaffold/category/CategoryEmptyState.vue'

const props = defineProps<{
  categories: CategoryInterface[]
}>()

defineEmits<{
  (e: 'edit', category: CategoryInterface): void
  (e: 'delete', category: CategoryInterface): void
  (e: 'create'): void
}>()

// Group categories by Income & Expense
const incomeCategories = computed(() => {
  return props.categories.filter((cat) => cat.type === 'income')
})

const expenseCategories = computed(() => {
  return props.categories.filter((cat) => cat.type === 'expense')
})
</script>

<template>
  <div>
    <!-- Empty State -->
    <CategoryEmptyState
      v-if="categories.length === 0"
      @create="$emit('create')"
    />

    <div v-else class="flex flex-col gap-6">
      <!-- Expense Group -->
      <div v-if="expenseCategories.length > 0" class="flex flex-col gap-3">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pengeluaran ({{ expenseCategories.length }})
          </span>
        </div>
        <div class="flex flex-col gap-2.5">
          <CategoryCard
            v-for="cat in expenseCategories"
            :key="cat.id"
            :category="cat"
            @edit="$emit('edit', cat)"
            @delete="$emit('delete', cat)"
          />
        </div>
      </div>

      <!-- Income Group -->
      <div v-if="incomeCategories.length > 0" class="flex flex-col gap-3">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pemasukan ({{ incomeCategories.length }})
          </span>
        </div>
        <div class="flex flex-col gap-2.5">
          <CategoryCard
            v-for="cat in incomeCategories"
            :key="cat.id"
            :category="cat"
            @edit="$emit('edit', cat)"
            @delete="$emit('delete', cat)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
