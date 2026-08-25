<script setup lang="ts">
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import type { CashFlowPoint } from '@/services/transaction.service'
import { formatCurrencyShort } from '@/helpers/currency.helper'

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend)

interface Props {
  cashFlowData: CashFlowPoint[]
}

const props = defineProps<Props>()

const canvasRef = ref<globalThis.HTMLElement | null>(null)
let chartInstance: Chart | null = null

const hasData = computed(() => props.cashFlowData.length > 0)

function createChart() {
  if (!canvasRef.value || !hasData.value) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const ctx = (canvasRef.value as globalThis.HTMLCanvasElement).getContext('2d')
  if (!ctx) return

  const labels = props.cashFlowData.map((d) => d.label)
  const incomeData = props.cashFlowData.map((d) => d.income)
  const expenseData = props.cashFlowData.map((d) => d.expense)

  // Create gradient fills
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 200)
  incomeGradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)')
  incomeGradient.addColorStop(1, 'rgba(16, 185, 129, 0.01)')

  const expenseGradient = ctx.createLinearGradient(0, 0, 0, 200)
  expenseGradient.addColorStop(0, 'rgba(244, 63, 94, 0.15)')
  expenseGradient.addColorStop(1, 'rgba(244, 63, 94, 0.01)')

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Pemasukan',
          data: incomeData,
          borderColor: '#10b981',
          backgroundColor: incomeGradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6
        },
        {
          label: 'Pengeluaran',
          data: expenseData,
          borderColor: '#f43f5e',
          backgroundColor: expenseGradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#f43f5e',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: { size: 9, weight: '500' as const },
            color: '#94a3b8',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8
          },
          border: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(226, 232, 240, 0.5)'
          },
          ticks: {
            font: { size: 9, weight: '500' as const },
            color: '#94a3b8',
            callback: (value) => formatCurrencyShort(Number(value)),
            maxTicksLimit: 5
          },
          border: {
            display: false
          }
        }
      },
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
              return ` ${context.dataset.label}: ${formatCurrencyShort(context.parsed.y)}`
            }
          }
        }
      }
    }
  })
}

watch(
  () => props.cashFlowData,
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
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold text-slate-800">Tren Arus Kas</h4>
      <!-- Inline mini legend -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span class="text-[9px] text-slate-400 font-medium">Masuk</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 rounded-full bg-rose-500"></div>
          <span class="text-[9px] text-slate-400 font-medium">Keluar</span>
        </div>
      </div>
    </div>

    <div v-if="hasData" class="w-full h-[200px]">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- No data state -->
    <div v-else class="text-center py-6">
      <div class="w-12 h-12 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-2 text-lg">
        <i class="fa-chart-line"></i>
      </div>
      <p class="text-xs text-slate-400 font-medium">Belum ada data arus kas untuk periode ini</p>
    </div>
  </div>
</template>
