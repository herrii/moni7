<script setup lang="ts">
import type { CategoryExpenseData } from '@/services/transaction.service'
import { formatCurrency } from '@/helpers/currency.helper'

interface Props {
  categories: CategoryExpenseData[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Kategori Teratas'
})
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
    <h4 class="text-sm font-bold text-slate-800 mb-4">{{ title }}</h4>

    <div v-if="categories.length > 0" class="flex flex-col gap-3">
      <div
        v-for="(cat, index) in categories.slice(0, 5)"
        :key="cat.categoryId"
        class="flex items-center gap-3"
      >
        <!-- Rank Badge -->
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
          :class="{
            'bg-amber-50 text-amber-600': index === 0,
            'bg-slate-50 text-slate-500': index > 0
          }"
        >
          {{ index + 1 }}
        </div>

        <!-- Category Icon -->
        <div
          class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
          :style="{ backgroundColor: cat.categoryColor }"
        >
          <i :class="cat.categoryIcon"></i>
        </div>

        <!-- Category Info + Progress Bar -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[11px] text-slate-700 font-semibold truncate">{{ cat.categoryName }}</span>
            <span class="text-[10px] font-bold text-slate-600 ml-2 flex-shrink-0">{{ formatCurrency(cat.total) }}</span>
          </div>
          <!-- Progress bar -->
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500 ease-out"
              :style="{
                width: `${cat.percentage}%`,
                backgroundColor: cat.categoryColor
              }"
            ></div>
          </div>
        </div>

        <!-- Percentage -->
        <span class="text-[10px] font-bold text-slate-400 flex-shrink-0 w-8 text-right">
          {{ cat.percentage }}%
        </span>
      </div>
    </div>

    <!-- No data state -->
    <div v-else class="text-center py-4">
      <p class="text-xs text-slate-400 font-medium">Belum ada data kategori</p>
    </div>
  </div>
</template>
