<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import { calculateGoalProgress } from '@/services/goal.service'
import GoalProgress from '~/components/scaffold/goal/GoalProgress.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import moment from 'moment'

interface Props {
  goal: GoalInterface
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (e: 'add-contribution'): void
  (e: 'complete-goal'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const progressInfo = computed(() => calculateGoalProgress(props.goal))

const formattedDate = computed(() => {
  if (!props.goal.target_date) return null
  return moment(props.goal.target_date).format('DD MMMM YYYY')
})

const iconClass = computed(() => {
  const ic = props.goal.icon || 'fa-piggy-bank'
  return ic.startsWith('fa-') ? `fa-solid ${ic}` : `fa-solid fa-${ic}`
})
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <!-- Main Card Header -->
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md flex-shrink-0"
          :style="{ backgroundColor: goal.color || '#3b82f6' }"
        >
          <i :class="iconClass"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <h2 class="text-base font-extrabold text-slate-800 leading-snug truncate">
            {{ goal.title }}
          </h2>
          <span v-if="formattedDate" class="text-xs text-slate-400 font-medium flex items-center gap-1 mt-1">
            <i class="fa-regular fa-calendar text-[11px]"></i>
            Target: {{ formattedDate }}
          </span>
          <span v-else class="text-xs text-slate-400 font-medium mt-1">
            Tanpa tenggat waktu
          </span>
        </div>
      </div>

      <!-- Goal Progress Visual Breakdown -->
      <GoalProgress
        :target-amount="goal.target_amount"
        :current-amount="goal.current_amount"
        :percentage="progressInfo.percentage"
        :remaining="progressInfo.remaining"
        :completed="progressInfo.isCompleted"
        :color="goal.color"
      />
    </div>

    <!-- Main Action Buttons -->
    <div class="flex flex-col gap-3">
      <!-- Add Contribution Button (if not completed) -->
      <BaseButton
        v-if="!progressInfo.isCompleted"
        variant="primary"
        size="lg"
        class="w-full shadow-md shadow-brand-200"
        :disabled="loading"
        @click="$emit('add-contribution')"
      >
        <i class="fa-solid fa-plus mr-1"></i>
        Tambah Kontribusi
      </BaseButton>

      <!-- Complete Goal Button (if not completed) -->
      <button
        v-if="!progressInfo.isCompleted"
        type="button"
        class="w-full py-3 px-4 rounded-2xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
        :disabled="loading"
        @click="$emit('complete-goal')"
      >
        <i class="fa-solid fa-circle-check"></i>
        Tandai Selesai (100%)
      </button>

      <!-- Completed Success Banner -->
      <div
        v-else
        class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center flex flex-col items-center gap-1 text-emerald-800"
      >
        <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg mb-1 shadow-sm">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <span class="text-sm font-extrabold">Selamat! Target Tersebut Telah Tercapai 🎉</span>
        <span class="text-xs text-emerald-600 font-medium">Anda telah memenuhi seluruh jumlah target tabungan ini.</span>
      </div>

      <!-- Secondary Edit and Delete Actions -->
      <div class="grid grid-cols-2 gap-3 pt-2">
        <BaseButton
          variant="secondary"
          size="md"
          :disabled="loading"
          @click="$emit('edit')"
        >
          <i class="fa-solid fa-pen-to-square mr-1"></i>
          Edit Target
        </BaseButton>

        <BaseButton
          variant="danger"
          size="md"
          :disabled="loading"
          @click="$emit('delete')"
        >
          <i class="fa-solid fa-trash-can mr-1"></i>
          Hapus Target
        </BaseButton>
      </div>
    </div>

    <!-- Informational Note -->
    <div class="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/60 flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed">
      <i class="fa-solid fa-circle-info text-brand-500 mt-0.5 text-xs flex-shrink-0"></i>
      <span>
        Target Impian berfungsi sebagai pengingat target keuangan. Kontribusi tidak memotong saldo akun secara otomatis.
      </span>
    </div>
  </div>
</template>
