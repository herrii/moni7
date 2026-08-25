<script setup lang="ts">
import { createAccount } from '@/services/account.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import AccountForm from '~/components/scaffold/account/AccountForm.vue'
import type { AccountFormData } from '~/components/scaffold/account/AccountForm.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()
const saving = ref(false)

const handleCreateAccount = async (data: AccountFormData) => {
  if (!activeUser.value?.id) {
    showToast('Pengguna aktif tidak ditemukan', 'error')
    return
  }

  saving.value = true
  try {
    const newAccount = await createAccount({
      user_id: activeUser.value.id,
      name: data.name,
      balance: data.balance,
      icon: data.icon,
      color: data.color,
      is_default: false
    })
    showToast(`Akun "${newAccount.name}" berhasil dibuat`, 'success')
    router.push('/profile/settings/accounts')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal membuat akun'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <AccountForm
        submit-text="Simpan Akun Baru"
        :loading="saving"
        @submit="handleCreateAccount"
      />
    </div>
  </div>
</template>
