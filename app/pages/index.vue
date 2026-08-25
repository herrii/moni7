<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import type { CategoryInterface } from '@/models/category.model'
import type { TransactionInterface } from '@/models/transaction.model'
import { getTotalBalance, getAccounts } from '@/services/account.service'
import { getTransactions } from '@/services/transaction.service'
import { getCategories } from '@/services/category.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import DashboardBalanceCard from '~/components/scaffold/dashboard/DashboardBalanceCard.vue'
import DashboardIncomeCard from '~/components/scaffold/dashboard/DashboardIncomeCard.vue'
import DashboardExpenseCard from '~/components/scaffold/dashboard/DashboardExpenseCard.vue'
import DashboardSummary from '~/components/scaffold/dashboard/DashboardSummary.vue'
import DashboardRecentTransactions from '~/components/scaffold/dashboard/DashboardRecentTransactions.vue'
import moment from 'moment'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const accounts = ref<AccountInterface[]>([])
const categories = ref<CategoryInterface[]>([])
const recentTransactions = ref<TransactionInterface[]>([])
const totalBalance = ref(0)
const monthlyIncome = ref(0)
const monthlyExpense = ref(0)
const loading = ref(true)

const loadDashboardData = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    const userId = activeUser.value.id

    // Calculate current month date range
    const startOfMonth = moment().startOf('month').valueOf()
    const endOfMonth = moment().endOf('month').valueOf()

    const [accList, catList, totalBal, monthTxList, recentTxList] = await Promise.all([
      getAccounts(userId),
      getCategories(userId),
      getTotalBalance(userId),
      getTransactions(userId, { startDate: startOfMonth, endDate: endOfMonth }),
      getTransactions(userId, { limit: 5 })
    ])

    accounts.value = accList
    categories.value = catList
    totalBalance.value = totalBal
    recentTransactions.value = recentTxList

    // Calculate monthly income and expense from current month transactions
    let incomeSum = 0
    let expenseSum = 0
    for (const tx of monthTxList) {
      if (tx.type === 'income') incomeSum += tx.amount
      else if (tx.type === 'expense') expenseSum += tx.amount
    }

    monthlyIncome.value = incomeSum
    monthlyExpense.value = expenseSum
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data dashboard'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshActiveUser()
  await loadDashboardData()
})

// Refresh dashboard automatically when active user changes
watch(() => activeUser.value?.id, (newId) => {
  if (newId) loadDashboardData()
})

const netBalance = computed(() => {
  return monthlyIncome.value - monthlyExpense.value
})

const handleCreateTransaction = () => {
  router.push('/transactions/create')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Loading Skeleton -->
    <div v-if="loading" class="py-6 flex flex-col gap-6">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <template v-else>
      <!-- Total Balance Card -->
      <DashboardBalanceCard
        :total-balance="totalBalance"
        :account-count="accounts.length"
      />

      <!-- Quick Income & Expense Cards Grid -->
      <div class="grid grid-cols-2 gap-3">
        <DashboardIncomeCard :income-amount="monthlyIncome" />
        <DashboardExpenseCard :expense-amount="monthlyExpense" />
      </div>

      <!-- Monthly Summary Card -->
      <DashboardSummary
        :income="monthlyIncome"
        :expense="monthlyExpense"
        :net-balance="netBalance"
      />

      <!-- Recent Transactions Section -->
      <DashboardRecentTransactions
        :transactions="recentTransactions"
        :categories="categories"
        @create="handleCreateTransaction"
      />
    </template>
  </div>
</template>
