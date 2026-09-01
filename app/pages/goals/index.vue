<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import { getGoals } from '@/services/goal.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import { formatCurrency } from '@/helpers/currency.helper'
import GoalList from '~/components/scaffold/goal/GoalList.vue'
import GoalEmptyState from '~/components/scaffold/goal/GoalEmptyState.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const goals = ref<GoalInterface[]>([])
const loading = ref(true)
const searchQuery = ref('')

/**
 * Load goals from GoalService
 */
const loadGoals = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    goals.value = await getGoals(activeUser.value.id, searchQuery.value)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat daftar target'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

// Watch search query with slight debounce
let searchTimer: ReturnType<typeof globalThis.setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimer) globalThis.clearTimeout(searchTimer)
  searchTimer = globalThis.setTimeout(() => {
    loadGoals()
  }, 250)
})

onMounted(async () => {
  await refreshActiveUser()
  await loadGoals()
})

watch(() => activeUser.value?.id, (newId) => {
  if (newId) loadGoals()
})

// Summary metrics
const totalTargetAmount = computed(() => {
  return goals.value.reduce((sum, g) => sum + g.target_amount, 0)
})

const totalCurrentAmount = computed(() => {
  return goals.value.reduce((sum, g) => sum + g.current_amount, 0)
})

const completedCount = computed(() => {
  return goals.value.filter((g) => g.completed || g.current_amount >= g.target_amount).length
})

const handleCreateGoal = () => {
  router.push('/goals/create')
}

const handleSelectGoal = (goal: GoalInterface) => {
  if (goal.id) {
    router.push(`/goals/${goal.id}`)
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <!-- Header with Action -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-base font-extrabold text-slate-800">Target Impian</h2>
        <p class="text-[11px] text-slate-400 font-medium">Kelola impian dan target tabungan Anda</p>
      </div>

      <button
        type="button"
        class="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-full text-xs font-bold shadow-md shadow-brand-200 flex items-center gap-1.5 transition-all"
        @click="handleCreateGoal"
      >
        <i class="fa-solid fa-plus text-[10px]"></i>
        <span>Tambah</span>
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading && goals.length === 0" class="py-6 flex flex-col gap-4">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <template v-else>
      <!-- Summary Card -->
      <div
        v-if="goals.length > 0 || searchQuery"
        class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 text-white shadow-soft-md flex flex-col gap-3"
      >
        <div class="flex items-center justify-between border-b border-slate-700/60 pb-3 text-xs">
          <span class="text-slate-400 font-medium">Total Capaian Impian</span>
          <span class="text-emerald-400 font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            {{ completedCount }} Selesai
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-1">
          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 font-medium">Total Terkumpul</span>
            <span class="text-base font-extrabold text-emerald-400">{{ formatCurrency(totalCurrentAmount) }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 font-medium">Total Target</span>
            <span class="text-base font-extrabold text-slate-200">{{ formatCurrency(totalTargetAmount) }}</span>
          </div>
        </div>
      </div>

      <!-- Search Input Bar -->
      <div class="relative flex items-center">
        <i class="fa-solid fa-magnifying-glass absolute left-4 text-xs text-slate-400"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari target impian..."
          class="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 shadow-soft-sm"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-3 text-xs text-slate-400 hover:text-slate-600"
          @click="searchQuery = ''"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Goal List or Empty State -->
      <div v-if="goals.length > 0">
        <GoalList :goals="goals" @select-goal="handleSelectGoal" />
      </div>

      <GoalEmptyState v-else @create-goal="handleCreateGoal" />
    </template>
  </div>
</template>
