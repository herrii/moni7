<script setup lang="ts">
import type { UserInterface } from '@/models/user.model'
import { useActiveUser } from '@/composables/useActiveUser'

defineProps<{
  users: UserInterface[]
}>()

const { activeUser, switchUser } = useActiveUser()

const handleSelect = async (e: Event) => {
  const target = e.target as HTMLSelectElement
  const id = parseInt(target.value, 10)
  if (id) {
    await switchUser(id)
  }
}
</script>

<template>
  <div class="relative w-full">
    <select
      :value="activeUser?.id || ''"
      class="w-full bg-white border border-slate-200/80 rounded-2xl p-3 pr-8 text-xs font-bold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-brand-500 shadow-soft-sm"
      @change="handleSelect"
    >
      <option
        v-for="u in users"
        :key="u.id"
        :value="u.id"
      >
        {{ u.name }} {{ u.id === activeUser?.id ? '(Aktif)' : '' }}
      </option>
    </select>
    
    <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs">
      <i class="fa-solid fa-chevron-down"></i>
    </span>
  </div>
</template>
