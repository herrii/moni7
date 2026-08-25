<script setup lang="ts">
import type { ReportData } from '@/services/transaction.service'
import { getReportData } from '@/services/transaction.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import type { ReportPeriod } from '~/components/scaffold/reports/ReportFilter.vue'
import ReportFilter from '~/components/scaffold/reports/ReportFilter.vue'
import ReportSummaryCard from '~/components/scaffold/reports/ReportSummaryCard.vue'
import IncomeExpenseChart from '~/components/scaffold/reports/IncomeExpenseChart.vue'
import ExpenseCategoryChart from '~/components/scaffold/reports/ExpenseCategoryChart.vue'
import CashFlowChart from '~/components/scaffold/reports/CashFlowChart.vue'
import TopCategoryList from '~/components/scaffold/reports/TopCategoryList.vue'
import ReportEmptyState from '~/components/scaffold/reports/ReportEmptyState.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import moment from 'moment'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const selectedPeriod = ref<ReportPeriod>('this_month')
const loading = ref(true)
const reportData = ref<ReportData | null>(null)

// Current date range
const dateStart = ref(moment().startOf('month').valueOf())
const dateEnd = ref(moment().endOf('month').valueOf())

/**
 * Period label for the summary card
 */
const periodLabel = computed(() => {
  const start = moment(dateStart.value).format('DD MMM YY')
  const end = moment(dateEnd.value).format('DD MMM YY')
  return `${start} - ${end}`
})

/**
 * Whether the report has any transaction data
 */
const hasData = computed(() => {
  return reportData.value !== null && reportData.value.totalTransactionCount > 0
})

/**
 * Load report data from service
 */
async function loadReport() {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    reportData.value = await getReportData(
      activeUser.value.id,
      dateStart.value,
      dateEnd.value
    )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat laporan'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

/**
 * Handle date range change from filter
 */
function handleDateRangeChange(start: number, end: number) {
  dateStart.value = start
  dateEnd.value = end
  loadReport()
}

/**
 * Navigate to create transaction
 */
function handleCreateTransaction() {
  router.push('/transactions/create')
}

onMounted(async () => {
  await refreshActiveUser()
  await loadReport()
})

// Refresh when active user changes
watch(() => activeUser.value?.id, (newId) => {
  if (newId) loadReport()
})
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <!-- Period Filter -->
    <ReportFilter
      v-model="selectedPeriod"
      @date-range-change="handleDateRangeChange"
    />

    <!-- Loading Skeleton -->
    <div v-if="loading" class="py-6 flex flex-col gap-6">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <!-- Empty State -->
    <template v-else-if="!hasData">
      <ReportEmptyState @create-transaction="handleCreateTransaction" />
    </template>

    <!-- Report Content -->
    <template v-else-if="reportData">
      <!-- Summary Card -->
      <ReportSummaryCard
        :total-income="reportData.totalIncome"
        :total-expense="reportData.totalExpense"
        :net-balance="reportData.netBalance"
        :total-transaction-count="reportData.totalTransactionCount"
        :period-label="periodLabel"
      />

      <!-- Income vs Expense Doughnut -->
      <IncomeExpenseChart
        :total-income="reportData.totalIncome"
        :total-expense="reportData.totalExpense"
      />

      <!-- Expense by Category Chart -->
      <ExpenseCategoryChart
        :categories="reportData.expenseByCategory"
        :total-expense="reportData.totalExpense"
      />

      <!-- Cash Flow Trend Line Chart -->
      <CashFlowChart
        :cash-flow-data="reportData.cashFlowTrend"
      />

      <!-- Top Expense Categories -->
      <TopCategoryList
        :categories="reportData.expenseByCategory"
        title="Top Pengeluaran"
      />

      <!-- Top Income Categories -->
      <TopCategoryList
        :categories="reportData.incomeByCategory"
        title="Top Pemasukan"
      />
    </template>
  </div>
</template>
