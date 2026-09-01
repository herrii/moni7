<script setup lang="ts">
import { formatCurrency } from '@/helpers/currency.helper'

interface Props {
  targetAmount: number
  currentAmount: number
  percentage: number
  remaining: number
  completed?: boolean
  color?: string
}

withDefaults(defineProps<Props>(), {
  completed: false,
  color: '#3b82f6'
})
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <!-- Header Percent & Badge -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-700">Progres Capaian</span>
        <span
          v-if="completed"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200"
        >
          <i class="fa-solid fa-circle-check"></i>
          Selesai
        </span>
      </div>
      <span
        class="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
        :class="completed ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'"
      >
        {{ percentage }}%
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
        :style="{
          width: `${percentage}%`,
          backgroundColor: completed ? '#10b981' : color
        }"
      ></div>
    </div>

    <!-- Amounts Grid (Target, Terkumpul, Sisa) -->
    <div class="grid grid-cols-3 gap-2 text-center pt-1">
      <div class="bg-slate-50 rounded-xl p-2 border border-slate-100/80 flex flex-col">
        <span class="text-[10px] text-slate-400 font-medium">Terkumpul</span>
        <span class="text-xs font-bold text-emerald-600 truncate">{{ formatCurrency(currentAmount) }}</span>
      </div>

      <div class="bg-slate-50 rounded-xl p-2 border border-slate-100/80 flex flex-col">
        <span class="text-[10px] text-slate-400 font-medium">Sisa</span>
        <span class="text-xs font-bold text-slate-600 truncate">{{ formatCurrency(remaining) }}</span>
      </div>

      <div class="bg-slate-50 rounded-xl p-2 border border-slate-100/80 flex flex-col">
        <span class="text-[10px] text-slate-400 font-medium">Target</span>
        <span class="text-xs font-bold text-slate-800 truncate">{{ formatCurrency(targetAmount) }}</span>
      </div>
    </div>
  </div>
</template>
