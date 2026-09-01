<script setup lang="ts">
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'
import BaseButton from '~/components/base/button/BaseButton.vue'

interface Props {
  show: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'export-module', moduleKey: 'transactions' | 'accounts' | 'categories' | 'goals' | 'loans'): void
  (e: 'export-all'): void
}>()

const modules = [
  { key: 'transactions', label: 'Transaksi', icon: 'fa-receipt', color: 'text-brand-500 bg-brand-50' },
  { key: 'accounts', label: 'Akun / Dompet', icon: 'fa-wallet', color: 'text-indigo-500 bg-indigo-50' },
  { key: 'categories', label: 'Kategori', icon: 'fa-tags', color: 'text-emerald-500 bg-emerald-50' },
  { key: 'goals', label: 'Target Impian', icon: 'fa-bullseye', color: 'text-purple-500 bg-purple-50' },
  { key: 'loans', label: 'Hutang & Piutang', icon: 'fa-handshake', color: 'text-amber-500 bg-amber-50' }
] as const
</script>

<template>
  <BaseBottomSheet
    :show="show"
    title="Ekspor Data CSV"
    @update:show="$emit('update:show', $event)"
  >
    <div class="flex flex-col gap-4 py-2">
      <p class="text-xs text-slate-500 font-medium leading-relaxed">
        Pilih modul data yang ingin Anda unduh dalam format CSV (UTF-8).
      </p>

      <!-- Module Export Items Grid -->
      <div class="flex flex-col gap-2.5">
        <div
          v-for="mod in modules"
          :key="mod.key"
          class="bg-white rounded-2xl p-3.5 border border-slate-100/80 shadow-soft-sm flex items-center justify-between hover:border-slate-200 transition-colors cursor-pointer"
          @click="$emit('export-module', mod.key)"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold" :class="mod.color">
              <i :class="mod.icon.startsWith('fa-') ? `fa-solid ${mod.icon}` : `fa-solid fa-${mod.icon}`"></i>
            </div>
            <span class="text-xs font-bold text-slate-800">{{ mod.label }}</span>
          </div>

          <button
            type="button"
            class="px-3 py-1.5 bg-slate-100 hover:bg-brand-500 hover:text-white text-slate-600 text-xs font-semibold rounded-xl active:scale-95 transition-all flex items-center gap-1.5"
            :disabled="loading"
          >
            <i class="fa-solid fa-download text-[10px]"></i>
            <span>Unduh</span>
          </button>
        </div>
      </div>

      <!-- Export All Button -->
      <div class="pt-2">
        <BaseButton
          variant="primary"
          class="w-full"
          :loading="loading"
          @click="$emit('export-all')"
        >
          <i class="fa-solid fa-file-arrow-down mr-1"></i>
          Ekspor Semua Modul Sekaligus
        </BaseButton>
      </div>
    </div>
  </BaseBottomSheet>
</template>
