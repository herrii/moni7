<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import type { CategoryInterface } from '@/models/category.model'
import { findTransactionById, updateTransaction } from '@/services/transaction.service'
import { getCategories } from '@/services/category.service'
import { getAccounts } from '@/services/account.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import TransactionForm from '~/components/scaffold/transaction/TransactionForm.vue'
import type { TransactionFormData } from '~/components/scaffold/transaction/TransactionForm.vue'

const route = useRoute()
const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()

const txId = computed(() => parseInt(route.params.id as string, 10))
const initialData = ref<Partial<TransactionFormData>>({})
const categories = ref<CategoryInterface[]>([])
const accounts = ref<AccountInterface[]>([])
const loading = ref(true)
const saving = ref(false)

const loadTransactionData = async () => {
  if (!txId.value || !activeUser.value?.id) {
    showToast('ID transaksi tidak valid', 'error')
    router.push('/transactions')
    return
  }

  loading.value = true
  try {
    const [tx, catList, accList] = await Promise.all([
      findTransactionById(txId.value),
      getCategories(activeUser.value.id),
      getAccounts(activeUser.value.id)
    ])

    if (!tx) {
      showToast('Transaksi tidak ditemukan', 'error')
      router.push('/transactions')
      return
    }

    initialData.value = {
      type: tx.type,
      account_id: tx.account_id,
      category_id: tx.category_id,
      amount: tx.amount,
      description: tx.description,
      transaction_date: tx.transaction_date
    }
    categories.value = catList
    accounts.value = accList
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data transaksi'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTransactionData()
})

const handleUpdateTransaction = async (formData: TransactionFormData) => {
  if (!txId.value) return

  saving.value = true
  try {
    await updateTransaction(txId.value, {
      account_id: formData.account_id,
      category_id: formData.category_id,
      type: formData.type,
      amount: formData.amount,
      description: formData.description,
      transaction_date: formData.transaction_date
    })

    showToast('Transaksi berhasil diperbarui & saldo disesuaikan', 'success')
    router.push('/transactions')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memperbarui transaksi'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}

const handleCancel = () => {
  router.push('/transactions')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="5" />
    </div>

    <div v-else class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <TransactionForm
        :initial-data="initialData"
        :accounts="accounts"
        :categories="categories"
        submit-text="Simpan Perubahan"
        :loading="saving"
        @submit="handleUpdateTransaction"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
