<script setup lang="ts">
import { findCategoryById, updateCategory } from '@/services/category.service'
import { useToast } from '@/composables/useToast'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import CategoryForm from '~/components/scaffold/category/CategoryForm.vue'
import type { CategoryFormData } from '~/components/scaffold/category/CategoryForm.vue'

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

const categoryId = computed(() => parseInt(route.params.id as string, 10))
const initialData = ref<Partial<CategoryFormData>>({})
const loading = ref(true)
const saving = ref(false)

const loadCategoryData = async () => {
  if (!categoryId.value) {
    showToast('ID kategori tidak valid', 'error')
    router.push('/profile/settings/categories')
    return
  }

  loading.value = true
  try {
    const category = await findCategoryById(categoryId.value)
    if (!category) {
      showToast('Kategori tidak ditemukan', 'error')
      router.push('/profile/settings/categories')
      return
    }
    initialData.value = {
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat data kategori'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategoryData()
})

const handleUpdateCategory = async (data: CategoryFormData) => {
  if (!categoryId.value) return

  saving.value = true
  try {
    const updated = await updateCategory(categoryId.value, {
      name: data.name,
      type: data.type,
      icon: data.icon,
      color: data.color
    })
    showToast(`Kategori "${updated.name}" berhasil diperbarui`, 'success')
    router.push('/profile/settings/categories')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memperbarui kategori'
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
      <CategoryForm
        :initial-data="initialData"
        submit-text="Simpan Perubahan"
        :loading="saving"
        @submit="handleUpdateCategory"
      />
    </div>
  </div>
</template>
