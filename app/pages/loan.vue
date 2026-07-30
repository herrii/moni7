<script setup lang="ts">
// Hutang Piutang page placeholder
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Quick filter tabs -->
    <div class="flex gap-2">
      <button type="button" class="px-4 py-1.5 bg-brand-500 text-white rounded-full text-xs font-semibold shadow-sm">
        Semua
      </button>
      <button type="button" class="px-4 py-1.5 bg-white text-slate-500 hover:text-slate-700 rounded-full text-xs font-semibold border border-slate-100 shadow-sm">
        Piutang (Anda meminjamkan)
      </button>
      <button type="button" class="px-4 py-1.5 bg-white text-slate-500 hover:text-slate-700 rounded-full text-xs font-semibold border border-slate-100 shadow-sm">
        Hutang (Anda meminjam)
      </button>
    </div>

    <!-- Active loans summary card -->
    <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3">
      <div class="flex justify-between items-center text-xs border-b border-slate-50 pb-3">
        <span class="text-slate-400 font-medium">Ringkasan Saldo</span>
        <span class="text-slate-400 font-semibold">Aktif</span>
      </div>

      <div class="flex flex-col gap-2 text-sm">
        <div class="flex justify-between">
          <span class="text-slate-500">Piutang (Dia berhutang)</span>
          <span class="font-bold text-emerald-500">Rp250.000</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Hutang (Anda berhutang)</span>
          <span class="font-bold text-orange-500">Rp100.000</span>
        </div>
        <div class="flex justify-between border-t border-slate-50 pt-2 font-bold">
          <span class="text-slate-800">Saldo Bersih</span>
          <span class="text-emerald-500">+Rp150.000</span>
        </div>
      </div>
    </div>

    <!-- Debt/Loan List -->
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-bold text-slate-800">Daftar Kontak</h3>
        <button type="button" class="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
          <i class="fa-solid fa-plus text-[10px]"></i>
          <span>Tambah</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl p-2 shadow-soft-sm border border-slate-100/50 divide-y divide-slate-50">
        <!-- Item 1 -->
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold">
              B
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Budi</span>
              <span class="text-[10px] text-slate-400">Piutang &bull; Tempo: 15 Agt 2026</span>
            </div>
          </div>
          <span class="text-sm font-bold text-emerald-500">+Rp250.000</span>
        </div>

        <!-- Item 2 -->
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold">
              A
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Andi</span>
              <span class="text-[10px] text-slate-400">Hutang &bull; Tempo: 10 Agt 2026</span>
            </div>
          </div>
          <span class="text-sm font-bold text-orange-500">-Rp100.000</span>
        </div>
      </div>
    </div>
  </div>
</template>
