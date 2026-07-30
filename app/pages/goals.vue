<script setup lang="ts">
// Goals page placeholder
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Active Goals list header -->
    <div class="flex justify-between items-center">
      <h3 class="text-sm font-bold text-slate-800">Target Aktif</h3>
      <button type="button" class="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
        <i class="fa-solid fa-plus text-[10px]"></i>
        <span>Tambah</span>
      </button>
    </div>

    <!-- Active Budget/Goal Cards -->
    <div class="flex flex-col gap-4">
      <!-- Goal Item 1 -->
      <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3">
        <div class="flex justify-between items-start">
          <div class="flex gap-3 items-center">
            <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-base">
              <i class="fa-solid fa-laptop"></i>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Beli Macbook Pro</span>
              <span class="text-[10px] text-slate-400">Target: 31 Des 2026</span>
            </div>
          </div>
          <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            45%
          </span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full transition-all" style="width: 45%"></div>
        </div>

        <div class="flex justify-between items-center text-xs mt-1">
          <span class="text-slate-400">Terkumpul: <strong class="text-slate-700">Rp9.000.000</strong></span>
          <span class="text-slate-400">Target: <strong class="text-slate-700">Rp20.000.000</strong></span>
        </div>
      </div>

      <!-- Goal Item 2 -->
      <div class="bg-white rounded-3xl p-5 shadow-soft-sm border border-slate-100/50 flex flex-col gap-3">
        <div class="flex justify-between items-start">
          <div class="flex gap-3 items-center">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-base">
              <i class="fa-solid fa-umbrella-beach"></i>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800">Liburan Ke Bali</span>
              <span class="text-[10px] text-slate-400">Target: 30 Sep 2026</span>
            </div>
          </div>
          <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            75%
          </span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full transition-all" style="width: 75%"></div>
        </div>

        <div class="flex justify-between items-center text-xs mt-1">
          <span class="text-slate-400">Terkumpul: <strong class="text-slate-700">Rp3.750.000</strong></span>
          <span class="text-slate-400">Target: <strong class="text-slate-700">Rp5.000.000</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>
