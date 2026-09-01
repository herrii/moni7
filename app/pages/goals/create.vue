<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import { createGoal } from '@/services/goal.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import GoalForm from '~/components/scaffold/goal/GoalForm.vue'
import BaseHeader from '~/components/base/BaseHeader.vue'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const submitting = ref(false)

onMounted(async () => {
  await refreshActiveUser()
})

const handleCancel = () => {
  router.push('/goals')
}

const handleSubmit = async (formData: Omit<GoalInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  if (!activeUser.value?.id) {
    showToast('User tidak ditemukan', 'error')
    return
  }

  submitting.value = true
  try {
    await createGoal({
      ...formData,
      user_id: activeUser.value.id
    })
    showToast('Target impian berhasil dibuat! 🎯', 'success')
    router.push('/goals')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal membuat target impian'
    showToast(msg, 'error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <BaseHeader title="Buat Target Impian" show-back @back="handleCancel" />

    <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
      <GoalForm
        :loading="submitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
