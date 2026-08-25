<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import type { CategoryInterface } from '@/models/category.model'
import { createTransaction } from '@/services/transaction.service'
import { getCategories } from '@/services/category.service'
import { getAccounts } from '@/services/account.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import TransactionForm from '~/components/scaffold/transaction/TransactionForm.vue'
import type { TransactionFormData } from '~/components/scaffold/transaction/TransactionForm.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()

const categories = ref<CategoryInterface[]>([])
const accounts = ref<AccountInterface[]>([])
const loading = ref(true)
const saving = ref(false)

const loadFormData = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    const [catList, accList] = await Promise.all([
      getCategories(activeUser.value.id, 'expense'),
      getAccounts(activeUser.value.id)
    ])
    categories.value = catList
    accounts.value = accList

    if (accList.length === 0) {
      showToast('Anda belum memiliki akun / dompet. Silakan buat akun terlebih dahulu.', 'warning')
      router.push('/profile/settings/accounts/create')
      return
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data pendukung'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFormData()
})

const handleCreateTransaction = async (formData: TransactionFormData) => {
  if (!activeUser.value?.id) return

  saving.value = true
  try {
    await createTransaction({
      user_id: activeUser.value.id,
      account_id: formData.account_id,
      category_id: formData.category_id,
      type: 'expense',
      amount: formData.amount,
      description: formData.description,
      transaction_date: formData.transaction_date
    })

    showToast('Pengeluaran berhasil dicatat & saldo diperbarui', 'success')
    router.push('/transactions')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mencatat pengeluaran'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}

const handleCancel = () => {
  router.push('/')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="5" />
    </div>

    <div v-else class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <h2 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-arrow-up"></i>
        </span>
        Catat Pengeluaran
      </h2>

      <TransactionForm
        :accounts="accounts"
        :categories="categories"
        fixed-type="expense"
        submit-text="Simpan Pengeluaran"
        :loading="saving"
        @submit="handleCreateTransaction"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
