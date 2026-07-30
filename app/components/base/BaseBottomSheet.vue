<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

const close = () => {
  emit('update:show', false)
  emit('close')
}

// Touch swipe down to close
let touchStartY = 0
let touchEndY = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndY = e.touches[0].clientY
}

const handleTouchEnd = () => {
  const swipeDistance = touchEndY - touchStartY
  // If user swiped down at least 50px, close the bottom sheet
  if (swipeDistance > 50 && touchEndY !== 0) {
    close()
  }
  // Reset
  touchStartY = 0
  touchEndY = 0
}
</script>

<template>
  <div>
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="show"
        class="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-40 transition-opacity duration-300"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <!-- Bottom Sheet Content -->
    <Transition name="slide">
      <div
        v-if="show"
        class="absolute bottom-0 left-0 right-0 w-full bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 pb-8 pt-4 z-50 flex flex-col items-center"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Drag Handle Indicator -->
        <div 
          class="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mb-6 cursor-grab active:cursor-grabbing transition-colors"
          title="Drag down or click to close"
          @click="close"
        ></div>

        <!-- Sheet Content -->
        <div class="w-full">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
