<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import { restoreDefaultData, resetDatabase } from '@/services/user.service'
import {
  exportTransactionsToCsv,
  exportAccountsToCsv,
  exportCategoriesToCsv,
  exportGoalsToCsv,
  exportLoansToCsv,
  importTransactionsFromCsv,
  downloadCsvFile
} from '@/services/csv.service'
import SettingGroup from '~/components/scaffold/settings/SettingGroup.vue'
import SettingItem from '~/components/scaffold/settings/SettingItem.vue'
import ImportCsvDialog from '~/components/scaffold/settings/ImportCsvDialog.vue'
import ExportCsvDialog from '~/components/scaffold/settings/ExportCsvDialog.vue'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'

const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const showImportDialog = ref(false)
const showExportDialog = ref(false)
const showSeederDialog = ref(false)
const showResetDialog = ref(false)
const showAboutDialog = ref(false)

const loadingAction = ref(false)

onMounted(() => {
  refreshActiveUser()
})

// 1. Import CSV Handler
const handleImportCsv = async (csvContent: string) => {
  if (!activeUser.value?.id) {
    showToast('User tidak ditemukan', 'error')
    return
  }

  loadingAction.value = true
  try {
    const result = await importTransactionsFromCsv(activeUser.value.id, csvContent)
    showImportDialog.value = false

    if (result.importedCount > 0) {
      showToast(`Berhasil mengimpor ${result.importedCount} transaksi! 📥`, 'success')
    }

    if (result.errors.length > 0) {
      globalThis.setTimeout(() => {
        showToast(`${result.skippedCount} baris dilewati karena format tidak sesuai`, 'info')
      }, 1500)
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mengimpor file CSV'
    showToast(msg, 'error')
  } finally {
    loadingAction.value = false
  }
}

// 2. Export CSV Handlers
const handleExportModule = async (moduleKey: 'transactions' | 'accounts' | 'categories' | 'goals' | 'loans') => {
  if (!activeUser.value?.id) return

  loadingAction.value = true
  try {
    const dateStr = new Date().toISOString().slice(0, 10)
    let content = ''
    let filename = ''

    switch (moduleKey) {
      case 'transactions':
        content = await exportTransactionsToCsv(activeUser.value.id)
        filename = `Transactions-${dateStr}.csv`
        break
      case 'accounts':
        content = await exportAccountsToCsv(activeUser.value.id)
        filename = `Accounts-${dateStr}.csv`
        break
      case 'categories':
        content = await exportCategoriesToCsv(activeUser.value.id)
        filename = `Categories-${dateStr}.csv`
        break
      case 'goals':
        content = await exportGoalsToCsv(activeUser.value.id)
        filename = `Goals-${dateStr}.csv`
        break
      case 'loans':
        content = await exportLoansToCsv(activeUser.value.id)
        filename = `Loans-${dateStr}.csv`
        break
    }

    downloadCsvFile(filename, content)
    showToast(`File ${filename} berhasil diunduh! 📤`, 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mengekspor data'
    showToast(msg, 'error')
  } finally {
    loadingAction.value = false
  }
}

const handleExportAll = async () => {
  if (!activeUser.value?.id) return

  loadingAction.value = true
  try {
    const dateStr = new Date().toISOString().slice(0, 10)
    const userId = activeUser.value.id

    const [txCsv, accCsv, catCsv, goalCsv, loanCsv] = await Promise.all([
      exportTransactionsToCsv(userId),
      exportAccountsToCsv(userId),
      exportCategoriesToCsv(userId),
      exportGoalsToCsv(userId),
      exportLoansToCsv(userId)
    ])

    downloadCsvFile(`Transactions-${dateStr}.csv`, txCsv)
    downloadCsvFile(`Accounts-${dateStr}.csv`, accCsv)
    downloadCsvFile(`Categories-${dateStr}.csv`, catCsv)
    downloadCsvFile(`Goals-${dateStr}.csv`, goalCsv)
    downloadCsvFile(`Loans-${dateStr}.csv`, loanCsv)

    showExportDialog.value = false
    showToast('Seluruh modul data berhasil diekspor ke CSV! 📦', 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mengekspor seluruh data'
    showToast(msg, 'error')
  } finally {
    loadingAction.value = false
  }
}

// 3. Restore Seeder Handler
const handleRunSeeder = async () => {
  loadingAction.value = true
  try {
    const result = await restoreDefaultData()
    await refreshActiveUser()
    showSeederDialog.value = false
    showToast(`Data default berhasil diperiksa & ditambahkan! (${result.categoriesCount} kategori)`, 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal merestorasi data default'
    showToast(msg, 'error')
  } finally {
    loadingAction.value = false
  }
}

// 4. Reset Database Handler
const handleResetDatabase = async () => {
  loadingAction.value = true
  try {
    await resetDatabase()
    await refreshActiveUser()
    showResetDialog.value = false
    showToast('Database berhasil direset penuh & disiapkan ulang! 🧹', 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal mereset database'
    showToast(msg, 'error')
  } finally {
    loadingAction.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Active User Profile Card -->
    <NuxtLink
      to="/profile/users"
      class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex items-center justify-between gap-4 cursor-pointer hover:border-slate-200 transition-all select-none"
    >
      <div class="flex items-center gap-4 min-w-0">
        <div class="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-md shadow-brand-100 flex-shrink-0">
          {{ activeUser?.name ? activeUser.name.charAt(0).toUpperCase() : 'Y' }}
        </div>
        <div class="flex flex-col min-w-0">
          <h3 class="text-lg font-bold text-slate-800 truncate">
            {{ activeUser?.name || 'Pengguna' }}
          </h3>
          <span class="text-xs text-slate-400 font-medium">Pengguna Utama Moni7</span>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right text-slate-300 text-xs flex-shrink-0"></i>
    </NuxtLink>

    <!-- Group 1: Pengelolaan / Management -->
    <SettingGroup title="Pengelolaan">
      <SettingItem
        title="Kelola Pengguna"
        subtitle="Ganti atau tambah profil pengguna"
        icon="fa-users"
        icon-color="text-indigo-500"
        to="/profile/users"
      />

      <SettingItem
        title="Kelola Akun / Dompet"
        subtitle="Atur dompet Cash, Bank, E-Wallet"
        icon="fa-wallet"
        icon-color="text-emerald-500"
        to="/profile/settings/accounts"
      />

      <SettingItem
        title="Kelola Kategori"
        subtitle="Atur kategori pemasukan & pengeluaran"
        icon="fa-tags"
        icon-color="text-amber-500"
        to="/profile/settings/categories"
      />
    </SettingGroup>

    <!-- Group 2: Data & Cadangan / Import Export & Database -->
    <SettingGroup title="Data & Cadangan">
      <SettingItem
        title="Impor Transaksi (CSV)"
        subtitle="Impor riwayat transaksi dari file CSV"
        icon="fa-file-import"
        icon-color="text-brand-500"
        @click="showImportDialog = true"
      />

      <SettingItem
        title="Ekspor Data (CSV)"
        subtitle="Unduh data transaksi, akun, target, dll."
        icon="fa-file-export"
        icon-color="text-purple-500"
        @click="showExportDialog = true"
      />

      <SettingItem
        title="Restorasi Data Default (Seeder)"
        subtitle="Pulihkan akun cash & kategori awal"
        icon="fa-database"
        icon-color="text-cyan-500"
        @click="showSeederDialog = true"
      />

      <SettingItem
        title="Reset Database"
        subtitle="Hapus seluruh data & buat ulang database"
        icon="fa-triangle-exclamation"
        danger
        @click="showResetDialog = true"
      />
    </SettingGroup>

    <!-- Group 3: Informasi Aplikasi -->
    <SettingGroup title="Tentang">
      <SettingItem
        title="Informasi Aplikasi Moni7"
        subtitle="PWA Offline-First Mobile Finance"
        icon="fa-circle-info"
        icon-color="text-slate-500"
        badge="v1.0.0"
        @click="showAboutDialog = true"
      />
    </SettingGroup>

    <!-- Modals & BottomSheets -->

    <!-- 1. Import CSV BottomSheet -->
    <ImportCsvDialog
      v-model:show="showImportDialog"
      :loading="loadingAction"
      @import="handleImportCsv"
    />

    <!-- 2. Export CSV BottomSheet -->
    <ExportCsvDialog
      v-model:show="showExportDialog"
      :loading="loadingAction"
      @export-module="handleExportModule"
      @export-all="handleExportAll"
    />

    <!-- 3. Restore Default Data (Seeder) Confirmation Dialog -->
    <BaseDialog
      :show="showSeederDialog"
      title="Restorasi Data Default?"
      description="Tindakan ini akan memeriksa dan menambahkan data awal (Akun Cash & Kategori standar) jika belum ada tanpa menghapus data Anda saat ini."
      variant="info"
      confirm-text="Jalankan Restorasi"
      cancel-text="Batal"
      :loading="loadingAction"
      @confirm="handleRunSeeder"
      @cancel="showSeederDialog = false"
      @update:show="showSeederDialog = $event"
    />

    <!-- 4. Reset Database Confirmation Dialog -->
    <BaseDialog
      :show="showResetDialog"
      title="Reset Seluruh Database?"
      description="PERINGATAN: Seluruh data (Pengguna, Akun, Transaksi, Target, Hutang) akan DIHAPUS PERMANEN. Database akan diinisialisasi ulang dari awal."
      variant="danger"
      confirm-text="Ya, Reset Database"
      cancel-text="Batal"
      :loading="loadingAction"
      @confirm="handleResetDatabase"
      @cancel="showResetDialog = false"
      @update:show="showResetDialog = $event"
    />

    <!-- 5. About App BottomSheet -->
    <BaseBottomSheet
      v-model:show="showAboutDialog"
      title="Tentang Moni7"
    >
      <div class="flex flex-col items-center text-center gap-3 py-2">
        <div class="w-16 h-16 rounded-3xl bg-brand-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-md shadow-brand-200 mb-1">
          M7
        </div>
        <h3 class="text-base font-extrabold text-slate-800">Moni7 Personal Finance</h3>
        <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Versi 1.0.0 Production Ready</span>

        <p class="text-xs text-slate-500 leading-relaxed max-w-xs mt-2">
          Aplikasi pencatat keuangan pribadi modern berbasis PWA Offline-First. Seluruh data Anda tersimpan 100% aman di dalam perangkat lokal menggunakan IndexedDB.
        </p>

        <div class="w-full grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 pt-3 border-t border-slate-100">
          <div class="bg-slate-50 rounded-xl p-2.5 flex flex-col items-center">
            <span class="text-[9px] text-slate-400 font-medium">Framework</span>
            <span>Nuxt 4 & Vue 3</span>
          </div>
          <div class="bg-slate-50 rounded-xl p-2.5 flex flex-col items-center">
            <span class="text-[9px] text-slate-400 font-medium">Penyimpanan</span>
            <span>Native IndexedDB</span>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  </div>
</template>
