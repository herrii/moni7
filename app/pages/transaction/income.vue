<script setup lang="ts">
// Catat Pemasukan page placeholder
const router = useRouter()
const goBack = () => router.push('/')
</script>

<template>
  <div class="px-6 py-4 flex flex-col gap-6">
    <!-- Form Layout mockup -->
    <div class="bg-white rounded-3xl p-6 shadow-soft-sm border border-slate-100/50 flex flex-col gap-5">
      <!-- Amount Input -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Jumlah Pemasukan</label>
        <div class="flex items-center border-b-2 border-slate-100 focus-within:border-emerald-500 py-2 transition-colors">
          <span class="text-xl font-bold text-slate-400 mr-2">Rp</span>
          <input
            type="number"
            placeholder="0"
            class="w-full text-2xl font-extrabold text-slate-800 placeholder-slate-300 focus:outline-none bg-transparent"
            readonly
          />
        </div>
      </div>

      <!-- Category Select -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori</label>
        <div class="flex items-center justify-between border border-slate-100 hover:border-slate-200 p-3.5 rounded-xl bg-slate-50/50 cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm">
              <i class="fa-solid fa-circle-question"></i>
            </div>
            <span class="text-sm font-semibold text-slate-500">Pilih Kategori</span>
          </div>
          <i class="fa-solid fa-chevron-down text-slate-300 text-xs"></i>
        </div>
      </div>

      <!-- Wallet Select -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Simpan Ke Dompet</label>
        <div class="flex items-center justify-between border border-slate-100 hover:border-slate-200 p-3.5 rounded-xl bg-slate-50/50 cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-sm">
              <i class="fa-solid fa-wallet"></i>
            </div>
            <span class="text-sm font-semibold text-slate-500">Pilih Dompet</span>
          </div>
          <i class="fa-solid fa-chevron-down text-slate-300 text-xs"></i>
        </div>
      </div>

      <!-- Note Input -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Catatan</label>
        <input
          type="text"
          placeholder="Tulis catatan di sini..."
          class="w-full border border-slate-100 hover:border-slate-200 p-3.5 rounded-xl bg-slate-50/50 text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          readonly
        />
      </div>

      <!-- Action Button mockup -->
      <button
        type="button"
        class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 text-center transition-all mt-4"
        @click="goBack"
      >
        Simpan Pemasukan
      </button>
    </div>
  </div>
</template>
