<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  error?: string
  helper?: string
  disabled?: boolean
  required?: boolean
  type?: string
  id?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  label: '',
  placeholder: '',
  error: '',
  helper: '',
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- Input Label -->
    <label
      v-if="label"
      :for="id"
      class="text-xs font-bold text-slate-400 uppercase tracking-wider select-none"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Input Box wrapper -->
    <div class="relative w-full">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : (helper ? `${id}-helper` : undefined)"
        class="w-full border p-3.5 rounded-2xl text-sm font-semibold text-slate-700 bg-slate-50/50 hover:bg-slate-100/30 transition-all focus:outline-none focus:bg-white focus:ring-2 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
        :class="[
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
            : 'border-slate-100 hover:border-slate-200 focus:border-brand-500 focus:ring-brand-100'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
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
