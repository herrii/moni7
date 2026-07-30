<script setup lang="ts">
interface NavItem {
  label: string
  icon: string
  route: string
}

defineProps<{
  items: NavItem[]
}>()

const route = useRoute()

// Check if a route is currently active
const isActive = (itemRoute: string) => {
  if (itemRoute === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(itemRoute)
}
</script>

<template>
  <nav class="relative border-t border-slate-100 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.03)] rounded-t-3xl py-2 px-2 flex justify-around items-center z-30 h-16">
    <template v-for="(item, index) in items" :key="item.label">
      <!-- Empty spacer for the center FAB -->
      <div v-if="index === 2" class="w-16 h-12 flex-shrink-0" aria-hidden="true"></div>
      
      <!-- Nav Button -->
      <NuxtLink
        :to="item.route"
        class="flex flex-col items-center justify-center flex-1 h-12 text-center transition-all duration-300 relative group"
        :class="isActive(item.route) ? 'text-brand-500 font-medium' : 'text-slate-400 hover:text-slate-600'"
      >
        <span class="text-lg mb-0.5 transition-transform duration-300 group-active:scale-90">
          <i :class="item.icon"></i>
        </span>
        <span class="text-[10px] tracking-wide select-none">
          {{ item.label }}
        </span>
        
        <!-- Subtle Active Indicator Dot -->
        <span 
          class="absolute bottom-0 w-1 h-1 rounded-full bg-brand-500 transition-all duration-300"
          :class="isActive(item.route) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        ></span>
      </NuxtLink>
    </template>
  </nav>
</template>
