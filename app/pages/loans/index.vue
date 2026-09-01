<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { LoanInterface, LoanStatus, LoanType } from '@/models/goal.model'
import { getLoans } from '@/services/loan.service'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import { formatCurrency } from '@/helpers/currency.helper'
import LoanList from '~/components/scaffold/loan/LoanList.vue'
import LoanEmptyState from '~/components/scaffold/loan/LoanEmptyState.vue'
import BaseLoading from '~/components/base/feedback/BaseLoading.vue'

const router = useRouter()
const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const loans = ref<LoanInterface[]>([])
const loading = ref(true)

// Filter states
const selectedType = ref<LoanType | 'all'>('all')
const selectedStatus = ref<LoanStatus | 'all'>('all')
const searchQuery = ref('')

/**
 * Load loans from service
 */
const loadLoans = async () => {
  if (!activeUser.value?.id) return

  loading.value = true
  try {
    const filterOptions = {
      type: selectedType.value === 'all' ? undefined : selectedType.value,
      status: selectedStatus.value === 'all' ? undefined : selectedStatus.value,
      search: searchQuery.value
    }
    loans.value = await getLoans(activeUser.value.id, filterOptions)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal memuat catatan hutang piutang'
    showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}

// Watch filters with debounce for search
let searchTimer: ReturnType<typeof globalThis.setTimeout> | null = null
watch([selectedType, selectedStatus], () => {
  loadLoans()
})

watch(searchQuery, () => {
  if (searchTimer) globalThis.clearTimeout(searchTimer)
  searchTimer = globalThis.setTimeout(() => {
    loadLoans()
  }, 250)
})

onMounted(async () => {
  await refreshActiveUser()
  await loadLoans()
})

watch(() => activeUser.value?.id, (newId) => {
  if (newId) loadLoans()
})

// Summary metrics (calculated across all user loans or currently loaded loans)
const totalReceivable = computed(() => {
  return loans.value
    .filter((l) => l.type === 'receivable')
    .reduce((sum, l) => sum + l.remaining_amount, 0)
})

const totalDebt = computed(() => {
  return loans.value
    .filter((l) => l.type === 'debt')
    .reduce((sum, l) => sum + l.remaining_amount, 0)
})

const netBalance = computed(() => {
  return totalReceivable.value - totalDebt.value
})

const handleCreateLoan = () => {
  router.push('/loans/create')
}

const handleSelectLoan = (loan: LoanInterface) => {
  if (loan.id) {
    router.push(`/loans/${loan.id}`)
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-5">
    <!-- Header with Action -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-base font-extrabold text-slate-800">Hutang & Piutang</h2>
        <p class="text-[11px] text-slate-400 font-medium">Pantau pinjaman & cicilan mandiri Anda</p>
      </div>

      <button
        type="button"
        class="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-full text-xs font-bold shadow-md shadow-brand-200 flex items-center gap-1.5 transition-all"
        @click="handleCreateLoan"
      >
        <i class="fa-solid fa-plus text-[10px]"></i>
        <span>Tambah</span>
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading && loans.length === 0" class="py-6 flex flex-col gap-4">
      <BaseLoading type="skeleton" :skeleton-rows="4" />
    </div>

    <template v-else>
      <!-- Summary Card -->
      <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3">
        <div class="flex justify-between items-center text-xs border-b border-slate-50 pb-3">
          <span class="text-slate-400 font-medium">Ringkasan Sisa Saldo</span>
          <span class="text-slate-400 font-semibold">Buku Catatan</span>
        </div>

        <div class="flex flex-col gap-2.5 text-xs">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px]">
                <i class="fa-solid fa-arrow-down-left"></i>
              </div>
              <span class="text-slate-500 font-medium">Piutang (Dia berhutang)</span>
            </div>
            <span class="font-bold text-emerald-600">{{ formatCurrency(totalReceivable) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px]">
                <i class="fa-solid fa-arrow-up-right"></i>
              </div>
              <span class="text-slate-500 font-medium">Hutang (Anda berhutang)</span>
            </div>
            <span class="font-bold text-amber-600">{{ formatCurrency(totalDebt) }}</span>
          </div>

          <div class="flex justify-between items-center border-t border-slate-50 pt-2 font-bold text-xs">
            <span class="text-slate-800">Saldo Bersih Catatan</span>
            <span :class="netBalance >= 0 ? 'text-emerald-600' : 'text-amber-600'">
              {{ netBalance >= 0 ? '+' : '-' }}{{ formatCurrency(Math.abs(netBalance)) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Search Input Bar -->
      <div class="relative flex items-center">
        <i class="fa-solid fa-magnifying-glass absolute left-4 text-xs text-slate-400"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama kontak atau keterangan..."
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

      <!-- Filter Controls: Type & Status Pill Buttons -->
      <div class="flex flex-col gap-2">
        <!-- Type Filter Pills -->
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedType === 'all' }"
            @click="selectedType = 'all'"
          >
            Semua Tipe
          </button>

          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedType === 'receivable' }"
            @click="selectedType = 'receivable'"
          >
            Piutang
          </button>

          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedType === 'debt' }"
            @click="selectedType = 'debt'"
          >
            Hutang
          </button>
        </div>

        <!-- Status Filter Pills -->
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedStatus === 'all' }"
            @click="selectedStatus = 'all'"
          >
            Semua Status
          </button>

          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedStatus === 'active' }"
            @click="selectedStatus = 'active'"
          >
            Aktif
          </button>

          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedStatus === 'overdue' }"
            @click="selectedStatus = 'overdue'"
          >
            Jatuh Tempo
          </button>

          <button
            type="button"
            class="loan-filter-pill"
            :class="{ active: selectedStatus === 'paid' }"
            @click="selectedStatus = 'paid'"
          >
            Lunas
          </button>
        </div>
      </div>

      <!-- Loan List or Empty State -->
      <div v-if="loans.length > 0">
        <LoanList :loans="loans" @select-loan="handleSelectLoan" />
      </div>

      <LoanEmptyState v-else @create-loan="handleCreateLoan" />
    </template>
  </div>
</template>

<style scoped>
.loan-filter-pill {
  @apply px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap
    bg-white text-slate-500 border border-slate-100 shadow-sm
    hover:text-slate-700 hover:border-slate-200
    active:scale-[0.97] transition-all duration-200;
}

.loan-filter-pill.active {
  @apply bg-brand-500 text-white border-brand-500 shadow-sm;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
