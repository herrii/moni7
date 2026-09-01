<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import {
  findGoalById,
  updateGoal,
  deleteGoal,
  addGoalContribution,
  completeGoal
} from '@/services/goal.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import GoalDetail from '~/components/scaffold/goal/GoalDetail.vue'
import GoalForm from '~/components/scaffold/goal/GoalForm.vue'
import GoalContributionDialog from '~/components/scaffold/goal/GoalContributionDialog.vue'
import BaseHeader from '~/components/base/BaseHeader.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'

const route = useRoute()
const router = useRouter()
const { refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const goal = ref<GoalInterface | null>(null)
const loading = ref(true)
const actionLoading = ref(false)

const showContributionDialog = ref(false)
const showEditForm = ref(false)
const showDeleteConfirm = ref(false)
const showCompleteConfirm = ref(false)

const goalId = computed(() => {
  const rawId = route.params.id
  const idStr = Array.isArray(rawId) ? rawId[0] : rawId
  return idStr ? parseInt(idStr, 10) : NaN
})

const fetchGoal = async () => {
  if (isNaN(goalId.value)) {
    showToast('ID Target tidak valid', 'error')
    router.push('/goals')
    return
  }

  loading.value = true
  try {
    const fetched = await findGoalById(goalId.value)
    if (!fetched) {
      showToast('Target impian tidak ditemukan', 'error')
      router.push('/goals')
      return
    }
    goal.value = fetched
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat detail target'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshActiveUser()
  await fetchGoal()
})

const handleBack = () => {
  if (showEditForm.value) {
    showEditForm.value = false
  } else {
    router.push('/goals')
  }
}

// 1. Add Contribution
const handleAddContribution = async (amount: number) => {
  if (!goal.value?.id) return

  actionLoading.value = true
  try {
    goal.value = await addGoalContribution(goal.value.id, amount)
    showToast('Kontribusi berhasil ditambahkan! 💰', 'success')
    showContributionDialog.value = false
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menambahkan kontribusi'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 2. Complete Goal directly
const handleCompleteGoalConfirm = async () => {
  if (!goal.value?.id) return

  actionLoading.value = true
  try {
    goal.value = await completeGoal(goal.value.id)
    showToast('Selamat! Target impian berhasil diselesaikan! 🏆', 'success')
    showCompleteConfirm.value = false
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menyelesaikan target'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 3. Edit Goal
const handleEditSubmit = async (formData: Omit<GoalInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  if (!goal.value?.id) return

  actionLoading.value = true
  try {
    goal.value = await updateGoal(goal.value.id, formData)
    showToast('Perubahan target berhasil disimpan! ✨', 'success')
    showEditForm.value = false
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal merubah target'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}

// 4. Delete Goal
const handleDeleteConfirm = async () => {
  if (!goal.value?.id) return

  actionLoading.value = true
  try {
    await deleteGoal(goal.value.id)
    showToast('Target impian telah dihapus', 'info')
    showDeleteConfirm.value = false
    router.push('/goals')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menghapus target'
    showToast(msg, 'error')
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <BaseHeader
      :title="showEditForm ? 'Edit Target Impian' : 'Detail Target'"
      show-back
      @back="handleBack"
    />

    <!-- Loading Skeleton -->
    <div v-if="loading" class="py-6 flex flex-col gap-4">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <template v-else-if="goal">
      <!-- Edit Form mode -->
      <div v-if="showEditForm" class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
        <GoalForm
          :initial-values="goal"
          is-edit
          :loading="actionLoading"
          @submit="handleEditSubmit"
          @cancel="showEditForm = false"
        />
      </div>

      <!-- Detail view mode -->
      <GoalDetail
        v-else
        :goal="goal"
        :loading="actionLoading"
        @add-contribution="showContributionDialog = true"
        @complete-goal="showCompleteConfirm = true"
        @edit="showEditForm = true"
        @delete="showDeleteConfirm = true"
      />

      <!-- Contribution BottomSheet Dialog -->
      <GoalContributionDialog
        v-model:show="showContributionDialog"
        :goal="goal"
        :loading="actionLoading"
        @submit="handleAddContribution"
      />

      <!-- Complete Confirmation Dialog -->
      <BaseDialog
        :show="showCompleteConfirm"
        title="Tandai Target Selesai?"
        description="Target ini akan langsung ditandai 100% selesai (Lunas)."
        variant="info"
        confirm-text="Ya, Selesaikan"
        cancel-text="Batal"
        :loading="actionLoading"
        @confirm="handleCompleteGoalConfirm"
        @cancel="showCompleteConfirm = false"
        @update:show="showCompleteConfirm = $event"
      />

      <!-- Delete Confirmation Dialog -->
      <BaseDialog
        :show="showDeleteConfirm"
        title="Hapus Target Impian?"
        description="Apakah Anda yakin ingin menghapus target ini? Data yang dihapus tidak dapat dikembalikan."
        variant="danger"
        confirm-text="Ya, Hapus Target"
        cancel-text="Batal"
        :loading="actionLoading"
        @confirm="handleDeleteConfirm"
        @cancel="showDeleteConfirm = false"
        @update:show="showDeleteConfirm = $event"
      />
    </template>
  </div>
</template>
