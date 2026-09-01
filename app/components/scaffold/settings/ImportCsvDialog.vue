<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'

interface Props {
  show: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'import', csvContent: string): void
}>()

const selectedFile = ref<globalThis.File | null>(null)
const csvTextContent = ref<string>('')
const errorMessage = ref('')
const fileInputRef = ref<globalThis.HTMLInputElement | null>(null)

watch(
  () => props.show,
  (val) => {
    if (val) {
      selectedFile.value = null
      csvTextContent.value = ''
      errorMessage.value = ''
    }
  }
)

function handleFileSelect(e: Event) {
  const target = e.target as globalThis.HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  if (!file.name.toLowerCase().endsWith('.csv')) {
    errorMessage.value = 'Harap pilih file dengan format .csv'
    selectedFile.value = null
    csvTextContent.value = ''
    return
  }

  errorMessage.value = ''
  selectedFile.value = file

  const reader = new globalThis.FileReader()
  reader.onload = (event) => {
    csvTextContent.value = (event.target?.result as string) || ''
  }
  reader.onerror = () => {
    errorMessage.value = 'Gagal membaca isi file CSV'
  }
  reader.readAsText(file)
}

function triggerFileChoose() {
  fileInputRef.value?.click()
}

function handleStartImport() {
  if (!csvTextContent.value) {
    errorMessage.value = 'Harap pilih file CSV terlebih dahulu'
    return
  }
  emit('import', csvTextContent.value)
}
</script>

<template>
  <BaseBottomSheet
    :show="show"
    title="Impor Transaksi CSV"
    @update:show="$emit('update:show', $event)"
  >
    <div class="flex flex-col gap-4 py-2">
      <!-- File Selector Dropzone -->
      <div
        class="border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-all active:scale-[0.99]"
        :class="
          selectedFile
            ? 'border-brand-500 bg-brand-50/50'
            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300'
        "
        @click="triggerFileChoose"
      >
        <input
          ref="fileInputRef"
          type="file"
          accept=".csv"
          class="hidden"
          @change="handleFileSelect"
        />

        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-2 shadow-xs"
          :class="selectedFile ? 'bg-brand-500 text-white' : 'bg-white text-slate-400 border border-slate-100'"
        >
          <i :class="selectedFile ? 'fa-solid fa-file-csv' : 'fa-solid fa-file-arrow-up'"></i>
        </div>

        <template v-if="selectedFile">
          <span class="text-xs font-bold text-slate-800 truncate max-w-[240px]">
            {{ selectedFile.name }}
          </span>
          <span class="text-[10px] text-slate-400 font-medium mt-0.5">
            {{ (selectedFile.size / 1024).toFixed(1) }} KB &bull; Klik untuk mengganti
          </span>
        </template>

        <template v-else>
          <span class="text-xs font-bold text-slate-700">Pilih File CSV</span>
          <span class="text-[10px] text-slate-400 font-medium mt-0.5">
            Format: Tanggal, Tipe, Kategori, Dompet, Jumlah, Catatan
          </span>
        </template>
      </div>

      <!-- Error Message if any -->
      <div v-if="errorMessage" class="bg-rose-50 text-rose-600 rounded-xl p-3 text-xs font-medium border border-rose-100">
        {{ errorMessage }}
      </div>

      <!-- Import Confirmation Notice -->
      <div class="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/60 flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed">
        <i class="fa-solid fa-circle-info text-brand-500 mt-0.5 text-xs flex-shrink-0"></i>
        <span>
          Transaksi dari file CSV akan ditambahkan ke database. Saldo akun terkait akan disesuaikan secara otomatis.
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pt-2">
        <BaseButton
          type="button"
          variant="secondary"
          class="flex-1"
          :disabled="loading"
          @click="$emit('update:show', false)"
        >
          Batal
        </BaseButton>

        <BaseButton
          type="button"
          variant="primary"
          class="flex-1"
          :loading="loading"
          :disabled="!selectedFile || loading"
          @click="handleStartImport"
        >
          Mulai Impor
        </BaseButton>
      </div>
    </div>
  </BaseBottomSheet>
</template>
