<script setup lang="ts">
import type { CategoryInterface } from '@/models/category.model'
import { searchCategories, deleteCategory, restoreDefaultCategories } from '@/services/category.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'
import CategoryList from '~/components/scaffold/category/CategoryList.vue'

const router = useRouter()
const { activeUser } = useActiveUser()
const { showToast } = useToast()

const categories = ref<CategoryInterface[]>([])
const loading = ref(true)
const searchQuery = ref('')
const restoring = ref(false)

const categoryToDelete = ref<CategoryInterface | null>(null)
const showDeleteDialog = ref(false)
const showRestoreDialog = ref(false)

const loadCategories = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    categories.value = await searchCategories(activeUser.value.id, searchQuery.value)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat kategori'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategories()
})

// Debounced search
let searchTimeout: ReturnType<typeof globalThis.setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimeout) globalThis.clearTimeout(searchTimeout)
  searchTimeout = globalThis.setTimeout(() => {
    loadCategories()
  }, 300)
})

const handleEditCategory = (category: CategoryInterface) => {
  if (category.id) {
    router.push(`/profile/settings/categories/${category.id}`)
  }
}

const handleConfirmDelete = (category: CategoryInterface) => {
  categoryToDelete.value = category
  showDeleteDialog.value = true
}

const executeDelete = async () => {
  if (!categoryToDelete.value?.id) return

  try {
    const name = categoryToDelete.value.name
    await deleteCategory(categoryToDelete.value.id)
    showToast(`Kategori "${name}" berhasil dihapus`, 'success')
    await loadCategories()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus kategori'
    showToast(msg, 'error')
  } finally {
    categoryToDelete.value = null
  }
}

const handleExecuteRestore = async () => {
  if (!activeUser.value?.id) return

  restoring.value = true
  try {
    const count = await restoreDefaultCategories(activeUser.value.id)
    if (count > 0) {
      showToast(`${count} kategori default berhasil dipulihkan`, 'success')
    } else {
      showToast('Semua kategori default sudah ada', 'info')
    }
    await loadCategories()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memulihkan kategori default'
    showToast(msg, 'error')
  } finally {
    restoring.value = false
  }
}

const navigateToCreate = () => {
  router.push('/profile/settings/categories/create')
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Header + Action Buttons -->
    <div class="flex justify-between items-center gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Daftar Kategori</span>
      <div class="flex items-center gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          :loading="restoring"
          @click="showRestoreDialog = true"
        >
          <template #leftIcon>
            <i class="fa-solid fa-rotate-left text-xs"></i>
          </template>
          Pulihkan Default
        </BaseButton>

        <BaseButton
          variant="primary"
          size="sm"
          @click="navigateToCreate"
        >
          <template #leftIcon>
            <i class="fa-solid fa-plus text-xs"></i>
          </template>
          Tambah Kategori
        </BaseButton>
      </div>
    </div>

    <!-- Search Input -->
    <BaseInput
      id="search-categories"
      v-model="searchQuery"
      placeholder="Cari kategori..."
    />

    <!-- Loading State -->
    <div v-if="loading" class="py-8">
      <BaseLoading type="skeleton" :skeleton-rows="3" />
    </div>

    <!-- Category List -->
    <CategoryList
      v-else
      :categories="categories"
      @edit="handleEditCategory"
      @delete="handleConfirmDelete"
      @create="navigateToCreate"
    />

    <!-- Delete Confirmation Dialog -->
    <BaseDialog
      v-model:show="showDeleteDialog"
      title="Hapus Kategori?"
      :description="`Apakah Anda yakin ingin menghapus kategori '${categoryToDelete?.name}'?`"
      type="danger"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="executeDelete"
    />

    <!-- Restore Default Categories Dialog -->
    <BaseDialog
      v-model:show="showRestoreDialog"
      title="Pulihkan Kategori Default?"
      description="Tindakan ini akan menambahkan kategori default yang belum ada. Kategori yang sudah Anda buat atau edit tidak akan terhapus atau berubah."
      type="info"
      confirm-text="Pulihkan Kategori"
      cancel-text="Batal"
      @confirm="handleExecuteRestore"
    />
  </div>
</template>
