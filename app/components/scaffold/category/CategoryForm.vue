<script setup lang="ts">
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'
import CategoryIconPicker from '~/components/scaffold/category/CategoryIconPicker.vue'
import CategoryColorPicker from '~/components/scaffold/category/CategoryColorPicker.vue'
import CategoryTypeBadge from '~/components/scaffold/category/CategoryTypeBadge.vue'
import { CATEGORY_FORM_DEFAULTS } from '@/constants/category.constants'
import type { CategoryType } from '@/models/category.model'

export interface CategoryFormData {
  name: string
  type: CategoryType
  icon: string
  color: string
}

const props = withDefaults(defineProps<{
  initialData?: Partial<CategoryFormData>
  submitText?: string
  loading?: boolean
}>(), {
  initialData: () => ({}),
  submitText: 'Simpan Kategori',
  loading: false
})

const emit = defineEmits<{
  (e: 'submit', data: CategoryFormData): void
}>()

const name = ref(props.initialData.name ?? CATEGORY_FORM_DEFAULTS.name)
const type = ref<CategoryType>(props.initialData.type ?? CATEGORY_FORM_DEFAULTS.type)
const icon = ref(props.initialData.icon ?? CATEGORY_FORM_DEFAULTS.icon)
const color = ref(props.initialData.color ?? CATEGORY_FORM_DEFAULTS.color)
const error = ref('')

watch(() => props.initialData, (newVal) => {
  if (newVal.name !== undefined) name.value = newVal.name
  if (newVal.type !== undefined) type.value = newVal.type
  if (newVal.icon !== undefined) icon.value = newVal.icon
  if (newVal.color !== undefined) color.value = newVal.color
}, { deep: true })

const handleSubmit = () => {
  const trimmedName = name.value.trim()
  if (!trimmedName) {
    error.value = 'Nama kategori harus diisi'
    return
  }
  if (trimmedName.length > 50) {
    error.value = 'Nama kategori tidak boleh lebih dari 50 karakter'
    return
  }

  error.value = ''
  emit('submit', {
    name: trimmedName,
    type: type.value,
    icon: icon.value,
    color: color.value
  })
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <!-- Category Type Selector -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipe Kategori</span>
      <div class="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
        <button
          type="button"
          class="py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          :class="type === 'expense' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="type = 'expense'"
        >
          <i class="fa-solid fa-arrow-up-from-bracket text-xs"></i>
          Pengeluaran
        </button>
        <button
          type="button"
          class="py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          :class="type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          @click="type = 'income'"
        >
          <i class="fa-solid fa-arrow-down-to-bracket text-xs"></i>
          Pemasukan
        </button>
      </div>
    </div>

    <!-- Category Name -->
    <BaseInput
      id="category-name"
      v-model="name"
      label="Nama Kategori"
      placeholder="Masukkan nama kategori (misal: Makanan, Gaji)"
      :error="error"
      required
    />

    <!-- Icon Selector -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Ikon</span>
      <CategoryIconPicker
        v-model="icon"
        :selected-color="color"
        :category-type="type"
      />
    </div>

    <!-- Color Selector -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Warna</span>
      <CategoryColorPicker v-model="color" />
    </div>

    <!-- Live Preview -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Pratinjau</span>
      <div class="bg-white rounded-2xl p-4 border border-slate-100/80 flex items-center gap-3.5">
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0"
          :style="{ backgroundColor: color + '18', color: color }"
        >
          <i :class="`fa-solid ${icon}`"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-slate-800 truncate">{{ name || 'Nama Kategori' }}</span>
            <CategoryTypeBadge :type="type" />
          </div>
          <span class="text-xs text-slate-400 font-medium mt-0.5">
            {{ type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <BaseButton
      type="submit"
      variant="primary"
      size="md"
      full-width
      :loading="loading"
    >
      {{ submitText }}
    </BaseButton>
  </form>
</template>
