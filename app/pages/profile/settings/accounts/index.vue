<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import { searchAccounts, deleteAccount, getTotalBalance } from '@/services/account.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import AccountList from '~/components/scaffold/account/AccountList.vue'
import AccountBalance from '~/components/scaffold/account/AccountBalance.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()

const accounts = ref<AccountInterface[]>([])
const totalBalance = ref(0)
const loading = ref(true)
const searchQuery = ref('')

const accountToDelete = ref<AccountInterface | null>(null)
const showDeleteDialog = ref(false)

const loadAccounts = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    accounts.value = await searchAccounts(activeUser.value.id, searchQuery.value)
    totalBalance.value = await getTotalBalance(activeUser.value.id)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat akun'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAccounts()
})

// Debounced search
let searchTimeout: ReturnType<typeof globalThis.setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimeout) globalThis.clearTimeout(searchTimeout)
  searchTimeout = globalThis.setTimeout(() => {
    loadAccounts()
  }, 300)
})

const handleEditAccount = (account: AccountInterface) => {
  if (account.id) {
    router.push(`/profile/settings/accounts/${account.id}`)
  }
}

const handleConfirmDelete = (account: AccountInterface) => {
  accountToDelete.value = account
  showDeleteDialog.value = true
}

const executeDelete = async () => {
  if (!accountToDelete.value?.id) return

  try {
    const name = accountToDelete.value.name
    await deleteAccount(accountToDelete.value.id)
    showToast(`Akun "${name}" berhasil dihapus`, 'success')
    await loadAccounts()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus akun'
    showToast(msg, 'error')
  } finally {
    accountToDelete.value = null
  }
}

const navigateToCreate = () => {
  router.push('/profile/settings/accounts/create')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Total Balance -->
    <AccountBalance
      v-if="!loading && accounts.length > 0"
      :total-balance="totalBalance"
      :account-count="accounts.length"
    />

    <!-- Header + Add Button -->
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Daftar Akun</span>
      <BaseButton
        variant="primary"
        size="sm"
        @click="navigateToCreate"
      >
        <template #leftIcon>
          <i class="fa-solid fa-plus text-xs"></i>
        </template>
        Tambah Akun
      </BaseButton>
    </div>

    <!-- Search -->
    <BaseInput
      id="search-accounts"
      v-model="searchQuery"
      placeholder="Cari akun..."
    />

    <!-- Loading State -->
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="3" />
    </div>

    <!-- Account List -->
    <AccountList
      v-else
      :accounts="accounts"
      @edit="handleEditAccount"
      @delete="handleConfirmDelete"
      @create="navigateToCreate"
    />

    <!-- Delete Confirmation Dialog -->
    <BaseDialog
      v-model:show="showDeleteDialog"
      title="Hapus Akun?"
      :description="`Apakah Anda yakin ingin menghapus akun '${accountToDelete?.name}'? Tindakan ini tidak dapat dibatalkan.`"
      type="danger"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="executeDelete"
    />
  </div>
</template>
