<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean
  showCloseButton?: boolean
}>(), {
  showCloseButton: true
})

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
        class="absolute bottom-0 left-0 right-0 w-full max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 pb-8 pt-4 z-50 flex flex-col"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Drag Handle Indicator -->
        <div 
          class="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mb-4 cursor-grab active:cursor-grabbing transition-colors mx-auto shrink-0"
          title="Drag down or click to close"
          @click="close"
        ></div>

        <!-- Sheet Header -->
        <div class="flex items-center justify-between mb-4 shrink-0">
          <div class="flex-1 min-w-0">
            <slot name="header" />
          </div>
          <button
            v-if="showCloseButton"
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 active:scale-90 transition-all ml-2"
            aria-label="Tutup"
            @click="close"
          >
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Sheet Content (Body) -->
        <div class="flex-1 overflow-y-auto no-scrollbar py-2">
          <slot />
        </div>

        <!-- Sheet Footer -->
        <div v-if="$slots.footer" class="mt-4 shrink-0">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>
