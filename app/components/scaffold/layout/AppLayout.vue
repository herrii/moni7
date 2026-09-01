<script setup lang="ts">
import AppHeader from '~/components/scaffold/layout/AppHeader.vue'
import AppNavigation from '~/components/scaffold/layout/AppNavigation.vue'
import BaseBottomSheet from '~/components/base/navigation/BaseBottomSheet.vue'
import BaseToast from '~/components/base/feedback/BaseToast.vue'

const showBottomSheet = ref(false)
const router = useRouter()

const openMenu = () => {
  showBottomSheet.value = true
}

const navigateTo = (path: string) => {
  showBottomSheet.value = false
  router.push(path)
}
</script>

<template>
  <div class="relative w-full max-w-md min-h-screen mx-auto bg-slate-50 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto no-scrollbar w-full pb-20">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <div class="absolute bottom-0 left-0 right-0 w-full z-30">
      <AppNavigation @fab-click="openMenu" />
    </div>

    <!-- Global Bottom Sheet -->
    <BaseBottomSheet v-model:show="showBottomSheet" :show-close-button="false">
      <div class="flex flex-col gap-4 text-center">
        <h3 class="text-lg font-bold text-slate-800 mb-2">Catat Transaksi</h3>
        
        <div class="grid grid-cols-3 gap-3">
          <!-- Income Button -->
          <button
            type="button"
            class="flex flex-col items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100/80 rounded-2xl border border-emerald-100 transition-all duration-300 active:scale-95 group"
            @click="navigateTo('/transaction/income')"
          >
            <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg mb-2 shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-arrow-down"></i>
            </div>
            <span class="text-xs font-semibold text-emerald-800">Pemasukan</span>
          </button>

          <!-- Expense Button -->
          <button
            type="button"
            class="flex flex-col items-center justify-center p-4 bg-orange-50 hover:bg-orange-100/80 rounded-2xl border border-orange-100 transition-all duration-300 active:scale-95 group"
            @click="navigateTo('/transaction/expense')"
          >
            <div class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg mb-2 shadow-md shadow-orange-200 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-arrow-up"></i>
            </div>
            <span class="text-xs font-semibold text-orange-800">Pengeluaran</span>
          </button>

          <!-- Debt / Loan Button -->
          <button
            type="button"
            class="flex flex-col items-center justify-center p-4 bg-cyan-50 hover:bg-cyan-100/80 rounded-2xl border border-cyan-100 transition-all duration-300 active:scale-95 group"
            @click="navigateTo('/loans/create')"
          >
            <div class="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center text-lg mb-2 shadow-md shadow-cyan-200 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-handshake"></i>
            </div>
            <span class="text-xs font-semibold text-cyan-800">Hutang</span>
          </button>
        </div>

        <button
          type="button"
          class="mt-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          @click="showBottomSheet = false"
        >
          Batal
        </button>
      </div>
    </BaseBottomSheet>

    <!-- Global Toast notification feedback -->
    <BaseToast />
  </div>
</template>
