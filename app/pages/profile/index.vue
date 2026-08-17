<script setup lang="ts">
import { useActiveUser } from '@/composables/useActiveUser'
import { useToast } from '@/composables/useToast'
import { openDatabase, runSeeders } from '@/helpers/indexed-db.helper'
import BaseDialog from '~/components/base/feedback/BaseDialog.vue'

const { activeUser, refreshActiveUser } = useActiveUser()
const { showToast } = useToast()

const showSeederDialog = ref(false)
const seeding = ref(false)

onMounted(() => {
  refreshActiveUser()
})

const handleRunSeeder = async () => {
  seeding.value = true
  try {
    const db = await openDatabase()
    const result = await runSeeders(db)
    await refreshActiveUser()
    showToast(`Inisialisasi database berhasil! ${result.categoriesCount} kategori dibuat.`, 'success')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gagal menginisialisasi database'
    showToast(msg, 'error')
  } finally {
    seeding.value = false
  }
}
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Active User Card -->
    <NuxtLink
      to="/profile/users"
      class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex items-center justify-between gap-4 cursor-pointer hover:border-slate-200 transition-colors"
    >
      <div class="flex items-center gap-4 min-w-0">
        <div class="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-md shadow-brand-100 shrink-0">
          {{ activeUser?.name ? activeUser.name.charAt(0).toUpperCase() : 'Y' }}
        </div>
        <div class="flex flex-col min-w-0">
          <h3 class="text-lg font-bold text-slate-800 truncate">
            {{ activeUser?.name || 'Yogi' }}
          </h3>
          <span class="text-xs text-slate-400 font-medium">Pengguna Aktif Moni7</span>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right text-slate-300 text-xs shrink-0"></i>
    </NuxtLink>

    <!-- Management Group -->
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Pengelolaan</h4>
      <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
        <!-- Kelola Pengguna -->
        <NuxtLink
          to="/profile/users"
          class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-users text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Kelola Pengguna</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </NuxtLink>
      </div>
    </div>

    <!-- Settings Group 1 -->
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Data & Keamanan</h4>
      <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
        <!-- Inisialisasi Database / Seeder -->
        <div
          class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors"
          @click="showSeederDialog = true"
        >
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-database text-brand-500 w-5"></i>
            <span class="text-sm font-semibold">Inisialisasi Database (Seeder)</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>

        <!-- Ekspor CSV -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-file-export text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Ekspor Transaksi (CSV)</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
        
        <!-- Impor CSV -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-file-import text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Impor Transaksi (CSV)</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
      </div>
    </div>

    <!-- Settings Group 2 -->
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Tentang</h4>
      <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-info text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Informasi Aplikasi</span>
          </div>
          <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">v1.0.0</span>
        </div>
      </div>
    </div>

    <!-- Manual Seeder Confirmation Dialog -->
    <BaseDialog
      v-model:show="showSeederDialog"
      title="Inisialisasi Database?"
      description="Tindakan ini akan memeriksa dan menambahkan data default (User Yogi, Akun Cash, dan Kategori awal) jika belum ada. Apakah Anda ingin melanjutkan?"
      type="info"
      confirm-text="Jalankan Seeder"
      cancel-text="Batal"
      @confirm="handleRunSeeder"
    />
  </div>
</template>
