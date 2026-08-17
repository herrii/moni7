<script setup lang="ts">
import { findUserById, updateUser } from '@/services/user.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import UserForm from '~/components/scaffold/user/UserForm.vue'

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()
const { activeUser, refreshActiveUser } = useActiveUser()

const userId = computed(() => parseInt(route.params.id as string, 10))
const userName = ref('')
const loading = ref(true)
const saving = ref(false)

const loadUserData = async () => {
  if (!userId.value) {
    showToast('ID pengguna tidak valid', 'error')
    router.push('/profile/users')
    return
  }

  loading.value = true
  try {
    const user = await findUserById(userId.value)
    if (!user) {
      showToast('Pengguna tidak ditemukan', 'error')
      router.push('/profile/users')
      return
    }
    userName.value = user.name
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data pengguna'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUserData()
})

const handleUpdateUser = async (name: string) => {
  if (!userId.value) return

  saving.value = true
  try {
    const updated = await updateUser(userId.value, { name })
    
    // Refresh active user state if the updated user is active
    if (activeUser.value?.id === updated.id) {
      await refreshActiveUser()
    }

    showToast(`Pengguna "${updated.name}" berhasil diperbarui`, 'success')
    router.push('/profile/users')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memperbarui pengguna'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="2" />
    </div>

    <div v-else class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <UserForm
        :initial-name="userName"
        submit-text="Simpan Perubahan"
        :loading="saving"
        @submit="handleUpdateUser"
      />
    </div>
  </div>
</template>
