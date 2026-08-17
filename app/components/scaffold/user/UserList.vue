<script setup lang="ts">
import type { UserInterface } from '@/models/user.model'
import BaseInput from '~/components/base/input/BaseInput.vue'
import UserCard from './UserCard.vue'
import UserEmptyState from './UserEmptyState.vue'

const props = defineProps<{
  users: UserInterface[]
  activeUserId?: number | null
}>()

defineEmits<{
  (e: 'select', user: UserInterface): void
  (e: 'edit', user: UserInterface): void
  (e: 'delete', user: UserInterface): void
  (e: 'create'): void
}>()

const searchQuery = ref('')

const filteredUsers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.users
  return props.users.filter((u) => u.name.toLowerCase().includes(q))
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Search Bar -->
    <BaseInput
      v-model="searchQuery"
      placeholder="Cari pengguna..."
    />

    <!-- User Cards List -->
    <div v-if="filteredUsers.length > 0" class="flex flex-col gap-3">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        :is-active="user.id === activeUserId"
        @select="$emit('select', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- Empty State -->
    <UserEmptyState v-else @create="$emit('create')" />
  </div>
</template>
