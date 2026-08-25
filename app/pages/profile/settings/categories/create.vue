<script setup lang="ts">
import { createCategory } from '@/services/category.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import CategoryForm from '~/components/scaffold/category/CategoryForm.vue'
import type { CategoryFormData } from '~/components/scaffold/category/CategoryForm.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()
const saving = ref(false)

const handleCreateCategory = async (data: CategoryFormData) => {
  if (!activeUser.value?.id) {
    showToast('Pengguna aktif tidak ditemukan', 'error')
    return
  }

  saving.value = true
  try {
    const newCategory = await createCategory({
      user_id: activeUser.value.id,
      name: data.name,
      type: data.type,
      icon: data.icon,
      color: data.color
    })
    showToast(`Kategori "${newCategory.name}" berhasil dibuat`, 'success')
    router.push('/profile/settings/categories')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal membuat kategori'
    showToast(msg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50">
      <CategoryForm
        submit-text="Simpan Kategori Baru"
        :loading="saving"
        @submit="handleCreateCategory"
      />
    </div>
  </div>
</template>
