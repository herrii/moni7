<script setup lang="ts">
import { createUser } from '@/services/user.service'
import { useToast } from '@/composables/useToast'
import UserForm from '~/components/scaffold/user/UserForm.vue'

const router = useRouter()
const { showToast } = useToast()
const saving = ref(false)

const handleCreateUser = async (name: string) => {
  saving.value = true
  try {
    const newUser = await createUser(name)
    showToast(`Pengguna "${newUser.name}" berhasil dibuat`, 'success')
    router.push('/profile/users')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal membuat pengguna'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <UserForm
        submit-text="Simpan Pengguna Baru"
        :loading="saving"
        @submit="handleCreateUser"
      />
    </div>
  </div>
</template>
