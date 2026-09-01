<script setup lang="ts">
import type { LoanInterface } from '@/models/loan.model'
import LoanCard from '~/components/scaffold/loan/LoanCard.vue'

interface Props {
  loans: LoanInterface[]
}

defineProps<Props>()

defineEmits<{
  (e: 'select-loan', loan: LoanInterface): void
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5 w-full">
    <LoanCard
      v-for="loan in loans"
      :key="loan.id"
      :loan="loan"
      @click="$emit('select-loan', loan)"
    />
  </div>
</template>
