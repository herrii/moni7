<script setup lang="ts">
import type { UserInterface } from '@/models/user.model'
import { getUsers, deleteUser } from '@/services/user.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import UserList from '~/components/scaffold/user/UserList.vue'

const router = useRouter()
const { activeUser, switchUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const users = ref<UserInterface[]>([])
const loading = ref(true)

const userToDelete = ref<UserInterface | null>(null)
const showDeleteDialog = ref(false)

const loadUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
    await refreshActiveUser()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat pengguna'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})

const handleSelectUser = async (user: UserInterface) => {
  if (!user.id) return
  if (user.id === activeUser.value?.id) return

  try {
    await switchUser(user.id)
    showToast(`Pengguna aktif diubah ke "${user.name}"`, 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mengubah pengguna aktif'
    showToast(msg, 'error')
  }
}

const handleEditUser = (user: UserInterface) => {
  if (user.id) {
    router.push(`/profile/users/${user.id}`)
  }
}

const handleConfirmDelete = (user: UserInterface) => {
  if (users.value.length <= 1) {
    showToast('Tidak dapat menghapus pengguna terakhir', 'warning')
    return
  }
  userToDelete.value = user
  showDeleteDialog.value = true
}

const executeDelete = async () => {
  if (!userToDelete.value?.id) return

  try {
    const name = userToDelete.value.name
    await deleteUser(userToDelete.value.id)
    showToast(`Pengguna "${name}" berhasil dihapus`, 'success')
    await loadUsers()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus pengguna'
    showToast(msg, 'error')
  } finally {
    userToDelete.value = null
  }
}

const navigateToCreate = () => {
  router.push('/profile/users/create')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Header Add Button -->
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Daftar Pengguna</span>
      <BaseButton
        variant="primary"
        size="sm"
        @click="navigateToCreate"
      >
        <template #leftIcon>
          <i class="fa-solid fa-plus text-xs"></i>
        </template>
        Tambah Pengguna
      </BaseButton>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="3" />
    </div>

    <!-- User List Scaffold Component -->
    <UserList
      v-else
      :users="users"
      :active-user-id="activeUser?.id"
      @select="handleSelectUser"
      @edit="handleEditUser"
      @delete="handleConfirmDelete"
      @create="navigateToCreate"
    />

    <!-- Delete Confirmation Dialog -->
    <BaseDialog
      v-model:show="showDeleteDialog"
      title="Hapus Pengguna?"
      :description="`Apakah Anda yakin ingin menghapus pengguna '${userToDelete?.name}'? Seluruh data terkait pengguna ini akan dihapus.`"
      type="danger"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="executeDelete"
    />
  </div>
</template>
