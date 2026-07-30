<script setup lang="ts">
// Profile / settings page placeholder
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- User Card -->
    <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex items-center gap-4">
      <div class="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-md shadow-brand-100 shrink-0">
        Y
      </div>
      <div class="flex flex-col min-w-0">
        <h3 class="text-lg font-bold text-slate-800 truncate">Yogi</h3>
        <span class="text-xs text-slate-400">Pengguna Moni7 Sejak Juli 2026</span>
      </div>
    </div>

    <!-- Settings Group 1 -->
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Data & Keamanan</h4>
      <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
        <!-- Item -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-file-export text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Ekspor Transaksi (CSV)</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
        
        <!-- Item -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-file-import text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Impor Transaksi (CSV)</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>

        <!-- Item -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-shield-halved text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Keamanan PIN</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
      </div>
    </div>

    <!-- Settings Group 2 -->
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Tentang</h4>
      <div class="bg-white rounded-2xl shadow-soft-sm border border-slate-100/50 overflow-hidden divide-y divide-slate-50">
        <!-- Item -->
        <div class="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
          <div class="flex items-center gap-3 text-slate-700">
            <i class="fa-solid fa-info text-slate-400 w-5"></i>
            <span class="text-sm font-semibold">Informasi Aplikasi</span>
          </div>
          <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">v1.0.0</span>
        </div>
      </div>
    </div>
  </div>
</template>
