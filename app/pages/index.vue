<script setup lang="ts">
// Home page placeholder layout mirroring Moni
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Hero Box - Monthly Summary -->
    <div class="bg-white rounded-3xl p-6 shadow-soft-md border border-slate-100/50">
      <div class="flex justify-between items-center text-slate-400 text-xs font-medium">
        <span>Pengeluaran Juli 2026</span>
        <button type="button" class="w-6 h-6 flex items-center justify-center hover:bg-slate-50 rounded-full transition-colors">
          <i class="fa-regular fa-eye text-sm text-slate-400"></i>
        </button>
      </div>
      <div class="text-3xl font-extrabold text-orange-500 mt-2 tracking-tight">
        Rp332.035
      </div>
      <div class="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-2">
        <i class="fa-solid fa-arrow-down-long"></i>
        <span>Turun 55% (Rp411.965) dari Juni 2026</span>
      </div>
    </div>

    <!-- Quick Stats Cards (Grid) -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/50 flex gap-3 items-center">
        <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center text-sm shadow-inner shrink-0">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Saldo</span>
          <span class="text-sm font-bold text-slate-800 truncate">Rp712.542</span>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-4 shadow-soft-sm border border-slate-100/50 flex gap-3 items-center">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm shadow-inner shrink-0">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Sisa Anggaran</span>
          <span class="text-xs font-semibold text-slate-500 truncate">Belum ada</span>
        </div>
      </div>
    </div>

    <!-- Recent Transactions List -->
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-bold text-slate-800">Transaksi Terbaru</h3>
        <button type="button" class="text-xs font-bold text-brand-500 hover:text-brand-600">
          Lihat semua
        </button>
      </div>

      <div class="bg-white rounded-2xl p-2 shadow-soft-sm border border-slate-100/50 divide-y divide-slate-50">
        <!-- Item 1 -->
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <i class="fa-solid fa-gas-pump"></i>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Pertamax</span>
              <span class="text-[10px] text-slate-400">Hari ini &bull; Bensin</span>
            </div>
          </div>
          <span class="text-sm font-bold text-orange-500">-Rp30.000</span>
        </div>

        <!-- Item 2 -->
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <i class="fa-solid fa-cookie"></i>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Rokok Elektrik</span>
              <span class="text-[10px] text-slate-400">Kemarin &bull; Jajan</span>
            </div>
          </div>
          <span class="text-sm font-bold text-orange-500">-Rp34.000</span>
        </div>

        <!-- Item 3 -->
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <i class="fa-solid fa-bowl-food"></i>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Sambel Kacang</span>
              <span class="text-[10px] text-slate-400">Kemarin &bull; Makan</span>
            </div>
          </div>
          <span class="text-sm font-bold text-orange-500">-Rp20.000</span>
        </div>
      </div>
    </div>
  </div>
</template>
