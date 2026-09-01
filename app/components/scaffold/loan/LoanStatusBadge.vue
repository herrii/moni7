<script setup lang="ts">
import type { LoanStatus } from '@/models/loan.model'

interface Props {
  status: LoanStatus
}

defineProps<Props>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm select-none"
    :class="{
      'bg-blue-50 text-blue-600 border border-blue-200/80': status === 'active',
      'bg-emerald-50 text-emerald-600 border border-emerald-200/80': status === 'paid',
      'bg-rose-50 text-rose-600 border border-rose-200/80': status === 'overdue'
    }"
  >
    <span
      class="w-1.5 h-1.5 rounded-full"
      :class="{
        'bg-blue-500': status === 'active',
        'bg-emerald-500': status === 'paid',
        'bg-rose-500 animate-pulse': status === 'overdue'
      }"
    ></span>
    <span>
      {{ status === 'active' ? 'Aktif' : status === 'paid' ? 'Lunas' : 'Jatuh Tempo' }}
    </span>
  </span>
</template>
