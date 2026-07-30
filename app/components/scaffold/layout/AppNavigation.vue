<script setup lang="ts">
import BaseBottomNavigation from '~/components/base/BaseBottomNavigation.vue'
import BaseFab from '~/components/base/BaseFab.vue'

defineEmits<{
  (e: 'fab-click'): void
}>()

const navItems = [
  { label: 'Beranda', icon: 'fa-solid fa-house', route: '/' },
  { label: 'Laporan', icon: 'fa-solid fa-chart-simple', route: '/reports' },
  // FAB spacer will be automatically inserted here at index 2 by BaseBottomNavigation
  { label: 'Anggaran', icon: 'fa-solid fa-sack-dollar', route: '/goals' },
  { label: 'Akun', icon: 'fa-solid fa-user', route: '/profile' }
]
</script>

<template>
  <div class="relative w-full">
    <!-- Center Floating Action Button (FAB) -->
    <div class="absolute left-1/2 -top-6 -translate-x-1/2 z-40">
      <BaseFab @click="$emit('fab-click')" />
    </div>

    <!-- Navigation Bar -->
    <BaseBottomNavigation :items="navItems" />
  </div>
</template>
