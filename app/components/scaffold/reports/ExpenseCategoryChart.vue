<script setup lang="ts">
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import type { CategoryExpenseData } from '@/services/transaction.service'
import { formatCurrency } from '@/helpers/currency.helper'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

interface Props {
  categories: CategoryExpenseData[]
  totalExpense: number
}

const props = defineProps<Props>()

const canvasRef = ref<globalThis.HTMLElement | null>(null)
let chartInstance: Chart | null = null

const hasData = computed(() => props.categories.length > 0 && props.totalExpense > 0)

function createChart() {
  if (!canvasRef.value || !hasData.value) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const ctx = (canvasRef.value as globalThis.HTMLCanvasElement).getContext('2d')
  if (!ctx) return

  const labels = props.categories.map((c) => c.categoryName)
  const data = props.categories.map((c) => c.total)
  const colors = props.categories.map((c) => c.categoryColor)

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
          borderRadius: 4,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#f8fafc',
          bodyColor: '#e2e8f0',
          padding: 12,
          cornerRadius: 12,
          displayColors: true,
          boxWidth: 10,
          boxHeight: 10,
          boxPadding: 4,
          callbacks: {
            label: (context) => {
              const val = context.parsed
              const pct = props.totalExpense > 0 ? Math.round((val / props.totalExpense) * 100) : 0
              return ` ${formatCurrency(val)} (${pct}%)`
            }
          }
        }
      }
    }
  })
}

watch(
  () => [props.categories, props.totalExpense],
  () => {
    nextTick(() => createChart())
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => createChart())
})

// eslint-disable-next-line no-undef
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
    <h4 class="text-sm font-bold text-slate-800 mb-4">Pengeluaran per Kategori</h4>

    <div v-if="hasData" class="flex flex-col items-center gap-4">
      <!-- Doughnut Chart -->
      <div class="relative w-[160px] h-[160px]">
        <canvas ref="canvasRef" width="160" height="160"></canvas>
        <!-- Center text -->
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-[9px] text-slate-400 font-medium">Total</span>
          <span class="text-[11px] font-extrabold text-slate-800">{{ formatCurrency(totalExpense) }}</span>
        </div>
      </div>

      <!-- Category Legend Grid -->
      <div class="w-full grid grid-cols-2 gap-x-4 gap-y-2">
        <div
          v-for="cat in categories"
          :key="cat.categoryId"
          class="flex items-center gap-2 min-w-0"
        >
          <div
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: cat.categoryColor }"
          ></div>
          <span class="text-[10px] text-slate-500 font-medium truncate">{{ cat.categoryName }}</span>
          <span class="text-[10px] font-bold text-slate-600 ml-auto flex-shrink-0">{{ cat.percentage }}%</span>
        </div>
      </div>
    </div>

    <!-- No data state -->
    <div v-else class="text-center py-6">
      <div class="w-12 h-12 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-2 text-lg">
        <i class="fa-chart-pie"></i>
      </div>
      <p class="text-xs text-slate-400 font-medium">Belum ada pengeluaran untuk periode ini</p>
    </div>
  </div>
</template>
