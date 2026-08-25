<script setup lang="ts">
import { findAccountById, updateAccount } from '@/services/account.service'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import AccountForm from '~/components/scaffold/account/AccountForm.vue'
import type { AccountFormData } from '~/components/scaffold/account/AccountForm.vue'

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

const accountId = computed(() => parseInt(route.params.id as string, 10))
const initialData = ref<Partial<AccountFormData>>({})
const loading = ref(true)
const saving = ref(false)

// For now, balance is always editable since transaction validation comes in Sprint 09
const balanceEditable = ref(true)

const loadAccountData = async () => {
  if (!accountId.value) {
    showToast('ID akun tidak valid', 'error')
    router.push('/profile/settings/accounts')
    return
  }

  loading.value = true
  try {
    const account = await findAccountById(accountId.value)
    if (!account) {
      showToast('Akun tidak ditemukan', 'error')
      router.push('/profile/settings/accounts')
      return
    }
    initialData.value = {
      name: account.name,
      balance: account.balance,
      icon: account.icon,
      color: account.color
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data akun'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAccountData()
})

const handleUpdateAccount = async (data: AccountFormData) => {
  if (!accountId.value) return

  saving.value = true
  try {
    const updated = await updateAccount(accountId.value, {
      name: data.name,
      balance: data.balance,
      icon: data.icon,
      color: data.color
    })
    showToast(`Akun "${updated.name}" berhasil diperbarui`, 'success')
    router.push('/profile/settings/accounts')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memperbarui akun'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <div v-else class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <AccountForm
        :initial-data="initialData"
        submit-text="Simpan Perubahan"
        :loading="saving"
        :balance-editable="balanceEditable"
        @submit="handleUpdateAccount"
      />
    </div>
  </div>
</template>
