<script setup lang="ts">
import moment from 'moment'

export type ReportPeriod = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom'

interface PeriodOption {
  value: ReportPeriod
  label: string
  icon: string
}

const periodOptions: PeriodOption[] = [
  { value: 'this_month', label: 'Bulan Ini', icon: 'fa-calendar-day' },
  { value: 'last_month', label: 'Bulan Lalu', icon: 'fa-calendar-minus' },
  { value: 'last_3_months', label: '3 Bulan', icon: 'fa-calendar-week' },
  { value: 'last_6_months', label: '6 Bulan', icon: 'fa-calendar' },
  { value: 'this_year', label: 'Tahun Ini', icon: 'fa-calendar-days' }
]

interface Props {
  modelValue: ReportPeriod
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ReportPeriod): void
  (e: 'date-range-change', start: number, end: number): void
}>()

// Custom date range refs
const customStart = ref('')
const customEnd = ref('')
const showCustomPicker = ref(false)

/**
 * Compute date range label text for the selected period
 */
const dateRangeLabel = computed(() => {
  const range = getDateRange(props.modelValue)
  if (!range) return ''
  const startStr = moment(range.start).format('DD MMM YYYY')
  const endStr = moment(range.end).format('DD MMM YYYY')
  return `${startStr} — ${endStr}`
})

/**
 * Get date range from the period
 */
function getDateRange(period: ReportPeriod): { start: number; end: number } | null {
  const now = moment()
  switch (period) {
    case 'this_month':
      return { start: now.clone().startOf('month').valueOf(), end: now.clone().endOf('month').valueOf() }
    case 'last_month':
      return {
        start: now.clone().subtract(1, 'month').startOf('month').valueOf(),
        end: now.clone().subtract(1, 'month').endOf('month').valueOf()
      }
    case 'last_3_months':
      return {
        start: now.clone().subtract(2, 'months').startOf('month').valueOf(),
        end: now.clone().endOf('month').valueOf()
      }
    case 'last_6_months':
      return {
        start: now.clone().subtract(5, 'months').startOf('month').valueOf(),
        end: now.clone().endOf('month').valueOf()
      }
    case 'this_year':
      return {
        start: now.clone().startOf('year').valueOf(),
        end: now.clone().endOf('year').valueOf()
      }
    case 'custom': {
      if (customStart.value && customEnd.value) {
        return {
          start: moment(customStart.value).startOf('day').valueOf(),
          end: moment(customEnd.value).endOf('day').valueOf()
        }
      }
      return null
    }
  }
}

function selectPeriod(period: ReportPeriod) {
  if (period === 'custom') {
    showCustomPicker.value = true
    emit('update:modelValue', period)
    return
  }
  showCustomPicker.value = false
  emit('update:modelValue', period)
  const range = getDateRange(period)
  if (range) emit('date-range-change', range.start, range.end)
}

function applyCustomRange() {
  if (!customStart.value || !customEnd.value) return
  const range = getDateRange('custom')
  if (range) {
    emit('date-range-change', range.start, range.end)
    showCustomPicker.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Period Pill Buttons -->
    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        v-for="opt in periodOptions"
        :key="opt.value"
        type="button"
        class="report-filter-pill"
        :class="{ active: modelValue === opt.value }"
        @click="selectPeriod(opt.value)"
      >
        <i :class="opt.icon" class="text-[10px]"></i>
        {{ opt.label }}
      </button>

      <!-- Custom period button -->
      <button
        type="button"
        class="report-filter-pill"
        :class="{ active: modelValue === 'custom' }"
        @click="selectPeriod('custom')"
      >
        <i class="fa-sliders text-[10px]"></i>
        Kustom
      </button>
    </div>

    <!-- Custom Date Picker (only shown when custom is selected) -->
    <div
      v-if="showCustomPicker"
      class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3 animate-slide-down"
    >
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Dari</label>
          <input
            v-model="customStart"
            type="date"
            class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-200 focus:border-brand-400 outline-none transition-all"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Sampai</label>
          <input
            v-model="customEnd"
            type="date"
            class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-200 focus:border-brand-400 outline-none transition-all"
          />
        </div>
      </div>
      <button
        type="button"
        class="w-full py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
        :disabled="!customStart || !customEnd"
        @click="applyCustomRange"
      >
        Terapkan Rentang
      </button>
    </div>

    <!-- Period Date Range Label -->
    <div v-if="dateRangeLabel && modelValue !== 'custom'" class="flex items-center gap-2 text-[10px] text-slate-400 font-medium px-1">
      <i class="fa-clock text-slate-300"></i>
      <span>{{ dateRangeLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.report-filter-pill {
  @apply flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap
    bg-white text-slate-500 border border-slate-100 shadow-sm
    hover:text-slate-700 hover:border-slate-200
    active:scale-[0.97] transition-all duration-200;
}

.report-filter-pill.active {
  @apply bg-brand-500 text-white border-brand-500 shadow-md;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-down {
  animation: slide-down 0.25s ease-out;
}
</style>
