<script setup lang="ts">
import BaseInput from '~/components/base/input/BaseInput.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'

const props = withDefaults(defineProps<{
  initialName?: string
  submitText?: string
  loading?: boolean
}>(), {
  initialName: '',
  submitText: 'Simpan Pengguna',
  loading: false
})

const emit = defineEmits<{
  (e: 'submit', name: string): void
}>()

const name = ref(props.initialName)
const error = ref('')

watch(() => props.initialName, (newVal) => {
  name.value = newVal
})

const handleSubmit = () => {
  const trimmed = name.value.trim()
  if (!trimmed) {
    error.value = 'Nama pengguna harus diisi'
    return
  }
  if (trimmed.length > 50) {
    error.value = 'Nama pengguna tidak boleh lebih dari 50 karakter'
    return
  }

  error.value = ''
  emit('submit', trimmed)
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <BaseInput
      v-model="name"
      label="Nama Pengguna"
      placeholder="Masukkan nama pengguna (misal: Yogi)"
      :error="error"
      required
    />

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
