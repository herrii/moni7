<script setup lang="ts">
import type { GoalInterface } from '@/models/goal.model'
import GoalCard from '~/components/scaffold/goal/GoalCard.vue'

interface Props {
  goals: GoalInterface[]
}

defineProps<Props>()

defineEmits<{
  (e: 'select-goal', goal: GoalInterface): void
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5 w-full">
    <GoalCard
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
      @click="$emit('select-goal', goal)"
    />
  </div>
</template>
