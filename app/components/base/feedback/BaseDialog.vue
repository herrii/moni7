<script setup lang="ts">
import BaseButton from '~/components/base/button/BaseButton.vue'

interface Props {
  show: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  type?: 'info' | 'danger' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Konfirmasi',
  cancelText: 'Batal',
  type: 'info',
  description: ''
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const close = () => {
  emit('update:show', false)
  emit('cancel')
}

const confirm = () => {
  emit('update:show', false)
  emit('confirm')
}

// Close dialog on escape key press
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="relative">
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div
        v-if="show"
        class="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-40 transition-opacity duration-200"
        aria-hidden="true"
        @click="close"
      ></div>
    </Transition>

    <!-- Dialog modal wrapper -->
    <Transition name="fade">
      <div
        v-if="show"
        class="absolute inset-0 flex items-center justify-center p-6 z-50 pointer-events-none"
      >
        <div
          class="bg-white w-full max-w-[320px] rounded-3xl p-6 shadow-soft-lg border border-slate-100/50 flex flex-col items-center text-center transform scale-100 transition-all pointer-events-auto"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${title}-title`"
        >
          <!-- Custom header icon based on type -->
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-lg"
            :class="[
              type === 'info' ? 'bg-brand-50 text-brand-500' : '',
              type === 'danger' ? 'bg-red-50 text-red-500' : '',
              type === 'warning' ? 'bg-orange-50 text-orange-500' : ''
            ]"
          >
            <i v-if="type === 'info'" class="fa-solid fa-circle-info"></i>
            <i v-else-if="type === 'danger'" class="fa-solid fa-triangle-exclamation"></i>
            <i v-else-if="type === 'warning'" class="fa-solid fa-circle-exclamation"></i>
          </div>

          <!-- Dialog Title -->
          <h3 :id="`${title}-title`" class="text-base font-bold text-slate-800 mb-1 select-none">
            {{ title }}
          </h3>

          <!-- Dialog Description -->
          <p v-if="description" class="text-xs text-slate-500 font-medium leading-relaxed mb-6 select-none">
            {{ description }}
          </p>

          <!-- Action buttons layout -->
          <div class="flex gap-2 w-full">
            <BaseButton
              variant="secondary"
              size="sm"
              full-width
              @click="close"
            >
              {{ cancelText }}
            </BaseButton>
            <BaseButton
              :variant="type === 'danger' ? 'danger' : 'primary'"
              size="sm"
              full-width
              @click="confirm"
            >
              {{ confirmText }}
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
