<script setup lang="ts">
export interface IconSelectOption {
  label: string
  value: string | number
  icon?: string
  color?: string
  sublabel?: string
}

interface Props {
  modelValue: string | number
  options: IconSelectOption[]
  label?: string
  placeholder?: string
  error?: string
  helper?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  placeholder: 'Pilih salah satu',
  label: '',
  error: '',
  helper: '',
  id: () => `icon-select-${Math.random().toString(36).substring(2, 9)}`
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<globalThis.HTMLElement | null>(null)

// Current selected item
const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue) || null
})

const toggleOpen = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const selectOption = (opt: IconSelectOption) => {
  emit('update:modelValue', opt.value)
  isOpen.value = false
}

// Close dropdown on click outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as globalThis.Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div ref="dropdownRef" class="flex flex-col gap-1.5 w-full relative">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="text-xs font-bold text-slate-400 uppercase tracking-wider select-none"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Trigger Button -->
    <div
      :id="id"
      class="w-full border p-3 rounded-2xl text-sm font-semibold text-slate-700 bg-slate-50/50 hover:bg-slate-100/30 transition-all focus:outline-none focus:bg-white focus:ring-2 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer flex items-center justify-between gap-3"
      :class="[
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
          : 'border-slate-100 hover:border-slate-200 focus:border-brand-500 focus:ring-brand-100',
        isOpen ? 'border-brand-500 bg-white ring-2 ring-brand-100' : ''
      ]"
      tabindex="0"
      @click="toggleOpen"
      @keydown.space.prevent="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.escape="isOpen = false"
    >
      <!-- Selected option item with icon -->
      <div v-if="selectedOption" class="flex items-center gap-3 min-w-0">
        <div
          v-if="selectedOption.icon"
          class="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
          :style="{
            backgroundColor: (selectedOption.color || '#94a3b8') + '18',
            color: selectedOption.color || '#64748b'
          }"
        >
          <i :class="`fa-solid ${selectedOption.icon}`"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-bold text-slate-800 truncate">{{ selectedOption.label }}</span>
          <span v-if="selectedOption.sublabel" class="text-[11px] font-semibold text-slate-400 truncate">
            {{ selectedOption.sublabel }}
          </span>
        </div>
      </div>

      <!-- Placeholder when nothing selected -->
      <span v-else class="text-sm font-semibold text-slate-400 truncate">
        {{ placeholder }}
      </span>

      <!-- Dropdown Chevron Icon -->
      <span class="text-slate-400 text-xs shrink-0 transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </div>

    <!-- Dropdown Options List -->
    <div
      v-if="isOpen"
      class="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto p-1.5 flex flex-col gap-1"
    >
      <div
        v-for="opt in options"
        :key="opt.value"
        class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
        :class="opt.value === modelValue ? 'bg-brand-50/50 text-brand-600 font-bold' : ''"
        @click="selectOption(opt)"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            v-if="opt.icon"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
            :style="{
              backgroundColor: (opt.color || '#94a3b8') + '18',
              color: opt.color || '#64748b'
            }"
          >
            <i :class="`fa-solid ${opt.icon}`"></i>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-bold text-slate-800 truncate">{{ opt.label }}</span>
            <span v-if="opt.sublabel" class="text-[11px] font-semibold text-slate-400 truncate">
              {{ opt.sublabel }}
            </span>
          </div>
        </div>

        <i v-if="opt.value === modelValue" class="fa-solid fa-check text-brand-500 text-xs shrink-0 mr-2"></i>
      </div>

      <div v-if="options.length === 0" class="p-4 text-center text-xs font-semibold text-slate-400">
        Tidak ada pilihan
      </div>
    </div>

    <!-- Error text -->
    <span
      v-if="error"
      :id="`${id}-error`"
      class="text-xs font-semibold text-red-500 mt-0.5"
      role="alert"
    >
      {{ error }}
    </span>

    <!-- Helper text -->
    <span
      v-else-if="helper"
      :id="`${id}-helper`"
      class="text-xs text-slate-400 font-medium mt-0.5"
    >
      {{ helper }}
    </span>
  </div>
</template>
