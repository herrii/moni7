<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import { calculateGoalProgress } from '@/services/goal.service'
import { formatCurrency } from '@/helpers/currency.helper'
import moment from 'moment'

interface Props {
  goal: GoalInterface
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'click'): void
}>()

const progressInfo = computed(() => calculateGoalProgress(props.goal))

const formattedDate = computed(() => {
  if (!props.goal.target_date) return null
  return moment(props.goal.target_date).format('DD MMM YYYY')
})

const iconClass = computed(() => {
  const ic = props.goal.icon || 'fa-piggy-bank'
  return ic.startsWith('fa-') ? `fa-solid ${ic}` : `fa-solid fa-${ic}`
})
</script>

<template>
  <div
    class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3.5 hover:shadow-soft-md active:scale-[0.99] transition-all duration-200 cursor-pointer select-none"
    @click="$emit('click')"
  >
    <!-- Header: Icon, Name, Target Date, Completed Badge -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div
          class="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg shadow-sm flex-shrink-0"
          :style="{ backgroundColor: goal.color || '#3b82f6' }"
        >
          <i :class="iconClass"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <h4 class="text-sm font-bold text-slate-800 truncate leading-snug">
            {{ goal.title }}
          </h4>
          <span v-if="formattedDate" class="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
            <i class="fa-regular fa-calendar text-[9px]"></i>
            Target: {{ formattedDate }}
          </span>
          <span v-else class="text-[10px] text-slate-400 font-medium mt-0.5">
            Tanpa tenggat waktu
          </span>
        </div>
      </div>

      <div class="flex items-center gap-1.5 flex-shrink-0">
        <span
          v-if="progressInfo.isCompleted"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200"
        >
          <i class="fa-solid fa-circle-check text-[9px]"></i>
          Lunas
        </span>
        <span
          class="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
          :class="progressInfo.isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'"
        >
          {{ progressInfo.percentage }}%
        </span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :style="{
          width: `${progressInfo.percentage}%`,
          backgroundColor: progressInfo.isCompleted ? '#10b981' : (goal.color || '#3b82f6')
        }"
      ></div>
    </div>

    <!-- Footer Stats: Terkumpul vs Target -->
    <div class="flex justify-between items-center text-xs pt-0.5">
      <span class="text-slate-400">
        Terkumpul: <strong class="text-emerald-600 font-bold">{{ formatCurrency(goal.current_amount) }}</strong>
      </span>
      <span class="text-slate-400">
        Target: <strong class="text-slate-700 font-bold">{{ formatCurrency(goal.target_amount) }}</strong>
      </span>
    </div>
  </div>
</template>
