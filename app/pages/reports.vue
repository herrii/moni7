<script setup lang="ts">
// Reports page placeholder
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Time period filters -->
    <div class="flex gap-2">
      <button type="button" class="px-4 py-1.5 bg-brand-500 text-white rounded-full text-xs font-semibold shadow-sm">
        Bulanan
      </button>
      <button type="button" class="px-4 py-1.5 bg-white text-slate-500 hover:text-slate-700 rounded-full text-xs font-semibold border border-slate-100 shadow-sm">
        Tahunan
      </button>
      <button type="button" class="px-4 py-1.5 bg-white text-slate-500 hover:text-slate-700 rounded-full text-xs font-semibold border border-slate-100 shadow-sm">
        Pilih tanggal
      </button>
    </div>

    <!-- Income vs Expense Summary card -->
    <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3">
      <div class="flex justify-between items-center text-xs border-b border-slate-50 pb-3">
        <span class="text-slate-400 font-medium">Juli 2026</span>
        <span class="text-slate-400 font-semibold">01 Jul '26 - 31 Jul '26</span>
      </div>

      <div class="flex flex-col gap-2 text-sm">
        <div class="flex justify-between">
          <span class="text-slate-500">Total Pemasukan</span>
          <span class="font-bold text-emerald-500">Rp128.000</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Total Pengeluaran</span>
          <span class="font-bold text-orange-500">Rp332.035</span>
        </div>
        <div class="flex justify-between border-t border-slate-50 pt-2 font-bold">
          <span class="text-slate-800">Selisih</span>
          <span class="text-rose-500">-Rp204.035</span>
        </div>
      </div>
    </div>

    <!-- Chart Placeholder Graphic -->
    <div class="bg-white rounded-3xl p-6 shadow-soft-md border border-slate-100/50 text-center flex flex-col items-center">
      <h4 class="text-sm font-bold text-slate-800 self-start mb-4">Total Pengeluaran</h4>
      
      <!-- Visual representation of a chart -->
      <div class="w-full h-40 flex items-end gap-3 justify-center border-b border-slate-100 pb-2">
        <div class="bg-brand-400/20 w-8 h-1/4 rounded-t-lg"></div>
        <div class="bg-brand-400/40 w-8 h-2/5 rounded-t-lg"></div>
        <div class="bg-brand-500 w-8 h-3/4 rounded-t-lg shadow-sm"></div>
        <div class="bg-brand-400/60 w-8 h-1/3 rounded-t-lg"></div>
        <div class="bg-brand-400/30 w-8 h-1/2 rounded-t-lg"></div>
      </div>
      <div class="flex justify-between w-full text-[10px] text-slate-400 mt-2 px-2">
        <span>01/07</span>
        <span>08/07</span>
        <span>15/07</span>
        <span>22/07</span>
        <span>31/07</span>
      </div>

      <span class="text-xs text-slate-400 font-medium mt-6 block">
        Chart.js visualisasi akan dimuat di sini.
      </span>
    </div>
  </div>
</template>
