<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { LoanInterface } from '@/models/loan.model'
import { createLoan } from '@/services/loan.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import LoanForm from '~/components/scaffold/loan/LoanForm.vue'
import BaseHeader from '~/components/base/BaseHeader.vue'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const submitting = ref(false)

onMounted(async () => {
  await refreshActiveUser()
})

const handleCancel = () => {
  router.push('/loans')
}

const handleSubmit = async (formData: Omit<LoanInterface, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  if (!activeUser.value?.id) {
    showToast('User tidak ditemukan', 'error')
    return
  }

  submitting.value = true
  try {
    await createLoan({
      ...formData,
      user_id: activeUser.value.id
    })
    showToast('Catatan hutang/piutang berhasil dibuat! 📝', 'success')
    router.push('/loans')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal membuat catatan'
    showToast(msg, 'error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <BaseHeader title="Buat Catatan Hutang / Piutang" show-back @back="handleCancel" />

    <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50">
      <LoanForm
        :loading="submitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
