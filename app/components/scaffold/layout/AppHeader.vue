<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// Determine if we are on the home screen
const isHome = computed(() => route.path === '/')

// Determine title and subtitle based on route
const headerConfig = computed(() => {
  const path = route.path
  
  if (path === '/') {
    return { title: 'Selamat datang, Yogi', subtitle: 'Komisi Tak Terbatas' }
  } else if (path === '/reports') {
    return { title: 'Laporan', subtitle: 'Ikhtisar keuangan Anda' }
  } else if (path === '/goals') {
    return { title: 'Anggaran', subtitle: 'Rencana & target tabungan' }
  } else if (path === '/profile') {
    return { title: 'Akun', subtitle: 'Profil & pengaturan aplikasi' }
  } else if (path === '/transaction/income') {
    return { title: 'Catat Pemasukan', subtitle: 'Tambah pemasukan baru', isSubpage: true }
  } else if (path === '/transaction/expense') {
    return { title: 'Catat Pengeluaran', subtitle: 'Tambah pengeluaran baru', isSubpage: true }
  } else if (path === '/loan') {
    return { title: 'Hutang Piutang', subtitle: 'Catat pinjaman & piutang', isSubpage: true }
  }
  
  return { title: 'Moni7', subtitle: '', isSubpage: true }
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <header
    class="transition-colors duration-300 w-full z-20"
    :class="isHome ? 'bg-brand-500 text-white pb-8 rounded-b-[2rem] shadow-md' : 'bg-slate-50 text-slate-900'"
  >
    <!-- Home Header style -->
    <div v-if="isHome" class="px-6 pt-6 pb-2">
      <div class="flex items-center justify-between">
        <!-- User Info & Avatar -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
            <!-- Panda or avatar icon -->
            <i class="fa-solid fa-user text-lg"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-white/80">Selamat datang,</span>
            <span class="text-base font-bold tracking-wide">Yogi</span>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2">
          <!-- Moni Premium / Badge -->
          <div class="flex items-center gap-1 bg-white/25 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/30 cursor-pointer active:scale-95 transition-all">
            <i class="fa-solid fa-crown text-amber-300"></i>
            <span>Komisi Tak Terbatas</span>
          </div>
          
          <!-- Cards/Wallet Icon -->
          <button 
            type="button" 
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="Wallet"
          >
            <i class="fa-solid fa-wallet text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Subpage / Regular Header Style -->
    <div v-else class="px-4 py-3 flex items-center justify-between border-b border-slate-100">
      <div class="flex items-center gap-3 min-w-0">
        <!-- Back button for subpages -->
        <button
          v-if="headerConfig.isSubpage"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-700 active:scale-95 transition-all"
          aria-label="Kembali"
          @click="goBack"
        >
          <i class="fa-solid fa-arrow-left text-lg"></i>
        </button>

        <div class="flex flex-col min-w-0">
          <h1 class="text-xl font-bold text-slate-800 leading-tight truncate">
            {{ headerConfig.title }}
          </h1>
          <span v-if="headerConfig.subtitle" class="text-xs text-slate-500 truncate mt-0.5">
            {{ headerConfig.subtitle }}
          </span>
        </div>
      </div>

      <!-- Actions slot for normal headers -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          v-if="route.path === '/reports'"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-600 active:scale-95 transition-all"
          title="Filter/Settings"
        >
          <i class="fa-solid fa-cog text-lg"></i>
        </button>
        <button
          v-if="route.path === '/goals'"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-600 active:scale-95 transition-all"
          title="Info"
        >
          <i class="fa-solid fa-circle-info text-lg"></i>
        </button>
        <button
          v-if="route.path === '/profile'"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-600 active:scale-95 transition-all"
          title="Edit Profil"
        >
          <i class="fa-solid fa-pen text-sm"></i>
        </button>
      </div>
    </div>
  </header>
</template>
