<script setup lang="ts">
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import { formatCurrency } from '@/helpers/currency.helper'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

interface Props {
  totalIncome: number
  totalExpense: number
}

const props = defineProps<Props>()

const canvasRef = ref<globalThis.HTMLElement | null>(null)
let chartInstance: Chart | null = null

const hasData = computed(() => props.totalIncome > 0 || props.totalExpense > 0)

function createChart() {
  if (!canvasRef.value || !hasData.value) return

  // Destroy old instance before creating new one
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const ctx = (canvasRef.value as globalThis.HTMLCanvasElement).getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pemasukan', 'Pengeluaran'],
      datasets: [
        {
          data: [props.totalIncome, props.totalExpense],
          backgroundColor: ['#10b981', '#f43f5e'],
          borderColor: ['#ecfdf5', '#fff1f2'],
          borderWidth: 3,
          borderRadius: 6,
          hoverOffset: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
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
              return ` ${formatCurrency(val)}`
            }
          }
        }
      }
    }
  })
}

watch(
  () => [props.totalIncome, props.totalExpense],
  () => {
    nextTick(() => createChart())
  }
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

const incomePercentage = computed(() => {
  const total = props.totalIncome + props.totalExpense
  if (total === 0) return 0
  return Math.round((props.totalIncome / total) * 100)
})

const expensePercentage = computed(() => {
  const total = props.totalIncome + props.totalExpense
  if (total === 0) return 0
  return Math.round((props.totalExpense / total) * 100)
})
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
    <h4 class="text-sm font-bold text-slate-800 mb-4">Pemasukan vs Pengeluaran</h4>

    <div v-if="hasData" class="flex items-center gap-5">
      <!-- Doughnut Chart -->
      <div class="relative w-[120px] h-[120px] flex-shrink-0">
        <canvas ref="canvasRef" width="120" height="120"></canvas>
      </div>

      <!-- Legend -->
      <div class="flex flex-col gap-3 flex-1 min-w-0">
        <div class="flex items-center gap-2.5">
          <div class="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] text-slate-500 font-medium">Pemasukan</div>
            <div class="text-xs font-bold text-slate-800">{{ formatCurrency(totalIncome) }}</div>
          </div>
          <span class="text-[10px] font-bold text-emerald-500">{{ incomePercentage }}%</span>
        </div>

        <div class="flex items-center gap-2.5">
          <div class="w-3 h-3 rounded-full bg-rose-500 flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] text-slate-500 font-medium">Pengeluaran</div>
            <div class="text-xs font-bold text-slate-800">{{ formatCurrency(totalExpense) }}</div>
          </div>
          <span class="text-[10px] font-bold text-rose-500">{{ expensePercentage }}%</span>
        </div>
      </div>
    </div>

    <!-- No data state -->
    <div v-else class="text-center py-6">
      <div class="w-12 h-12 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-2 text-lg">
        <i class="fa-chart-pie"></i>
      </div>
      <p class="text-xs text-slate-400 font-medium">Belum ada data untuk periode ini</p>
    </div>
  </div>
</template>
