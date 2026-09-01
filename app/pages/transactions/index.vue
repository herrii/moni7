<script setup lang="ts">
import type { TransactionInterface } from '@/models/transaction.model'
import type { CategoryInterface } from '@/models/category.model'
import type { AccountInterface } from '@/models/account.model'
import { getTransactions, deleteTransaction } from '@/services/transaction.service'
import { getCategories } from '@/services/category.service'
import { getAccounts } from '@/services/account.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import TransactionSearch from '~/components/scaffold/transaction/TransactionSearch.vue'
import TransactionFilter from '~/components/scaffold/transaction/TransactionFilter.vue'
import type { FilterState } from '~/components/scaffold/transaction/TransactionFilter.vue'
import TransactionList from '~/components/scaffold/transaction/TransactionList.vue'
import TransactionDetail from '~/components/scaffold/transaction/TransactionDetail.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()

const transactions = ref<TransactionInterface[]>([])
const categories = ref<CategoryInterface[]>([])
const accounts = ref<AccountInterface[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const hasMore = ref(true)
const offset = ref(0)
const LIMIT = 10

const searchQuery = ref('')
const filterState = ref<FilterState>({})

const selectedTx = ref<TransactionInterface | null>(null)
const showDetailModal = ref(false)

const txToDelete = ref<TransactionInterface | null>(null)
const showDeleteDialog = ref(false)

const loadMasterData = async () => {
  if (!activeUser.value?.id) return
  try {
    const [catList, accList] = await Promise.all([
      getCategories(activeUser.value.id),
      getAccounts(activeUser.value.id)
    ])
    categories.value = catList
    accounts.value = accList
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data kategori & akun'
    showToast(msg, 'warning')
  }
}

const fetchTransactionsList = async (isReset = true) => {
  if (!activeUser.value?.id) return

  if (isReset) {
    loading.value = true
    offset.value = 0
    hasMore.value = true
  } else {
    loadingMore.value = true
  }

  try {
    const newItems = await getTransactions(activeUser.value.id, {
      accountId: filterState.value.accountId,
      categoryId: filterState.value.categoryId,
      type: filterState.value.type,
      search: searchQuery.value,
      limit: LIMIT,
      offset: offset.value
    })

    if (isReset) {
      transactions.value = newItems
    } else {
      transactions.value = [...transactions.value, ...newItems]
    }

    if (newItems.length < LIMIT) {
      hasMore.value = false
    } else {
      offset.value += LIMIT
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat transaksi'
    showToast(msg, 'error')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

onMounted(async () => {
  await loadMasterData()
  await fetchTransactionsList(true)
})

// Debounced search & filter watchers
let searchTimeout: ReturnType<typeof globalThis.setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimeout) globalThis.clearTimeout(searchTimeout)
  searchTimeout = globalThis.setTimeout(() => {
    fetchTransactionsList(true)
  }, 300)
})

watch(filterState, () => {
  fetchTransactionsList(true)
}, { deep: true })

const handleLoadMore = () => {
  if (hasMore.value && !loadingMore.value) {
    fetchTransactionsList(false)
  }
}

const handleSelectTx = (tx: TransactionInterface) => {
  selectedTx.value = tx
  showDetailModal.value = true
}

const handleEditTx = (tx: TransactionInterface) => {
  if (tx.id) {
    router.push(`/transactions/${tx.id}`)
  }
}

const handleConfirmDelete = (tx: TransactionInterface) => {
  txToDelete.value = tx
  showDeleteDialog.value = true
}

const executeDelete = async () => {
  if (!txToDelete.value?.id) return

  try {
    await deleteTransaction(txToDelete.value.id)
    showToast('Transaksi berhasil dihapus & saldo akun diperbarui', 'success')
    await fetchTransactionsList(true)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus transaksi'
    showToast(msg, 'error')
  } finally {
    txToDelete.value = null
  }
}

const navigateToCreate = () => {
  router.push('/transactions/create')
}

const getCategoryObj = (catId?: number) => {
  if (!catId) return null
  return categories.value.find((c) => c.id === catId) || null
}

const getAccountObj = (accId?: number) => {
  if (!accId) return null
  return accounts.value.find((a) => a.id === accId) || null
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <!-- Header Add Button -->
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Riwayat Transaksi</span>
      <BaseButton
        variant="primary"
        size="sm"
        @click="navigateToCreate"
      >
        <template #leftIcon>
          <i class="fa-solid fa-plus text-xs"></i>
        </template>
        Catat Transaksi
      </BaseButton>
    </div>

    <!-- Search Bar -->
    <TransactionSearch v-model="searchQuery" />

    <!-- Filter Bar -->
    <TransactionFilter
      v-model="filterState"
      :accounts="accounts"
      :categories="categories"
    />

    <!-- Loading State -->
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <!-- Transaction List with Infinite Scroll -->
    <TransactionList
      v-else
      :transactions="transactions"
      :categories="categories"
      :accounts="accounts"
      :has-more="hasMore"
      :loading-more="loadingMore"
      @click="handleSelectTx"
      @edit="handleEditTx"
      @delete="handleConfirmDelete"
      @create="navigateToCreate"
      @load-more="handleLoadMore"
    />

    <!-- Detail Dialog -->
    <TransactionDetail
      v-model:show="showDetailModal"
      :transaction="selectedTx"
      :category="getCategoryObj(selectedTx?.category_id)"
      :account="getAccountObj(selectedTx?.account_id)"
      @edit="handleEditTx"
      @delete="handleConfirmDelete"
    />

    <!-- Delete Confirmation Dialog -->
    <BaseDialog
      v-model:show="showDeleteDialog"
      title="Hapus Transaksi?"
      description="Penghapusan transaksi ini akan mengembalikan saldo akun terkait secara otomatis. Apakah Anda yakin?"
      type="danger"
      confirm-text="Hapus & Kembalikan Saldo"
      cancel-text="Batal"
      @confirm="executeDelete"
    />
  </div>
</template>
