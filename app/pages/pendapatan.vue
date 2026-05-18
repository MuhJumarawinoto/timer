<template>
  <div class="min-h-screen bg-zinc-900 flex items-center justify-center py-4 px-4">
    <!-- Phone Frame Container -->
    <div class="w-full max-w-[400px] bg-[#F5A623] min-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative border-4 border-zinc-800">
      <!-- Top Bar -->
      <div class="sticky top-0 z-50 bg-[#E0941A]/95 backdrop-blur-lg border-b-2 border-white/30 shadow-xl">
        <div class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="flex-1 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-white">
                <path d="M0 0h24v24H0z" fill="none" />
                <defs>
                  <path id="SVGS9q3IkIf" d="M21.5 11v10h-19V11z" />
                </defs>
                <g fill="none">
                  <use href="#SVGS9q3IkIf" />
                  <path d="M12 13.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m5.136-7.209L19 5.67l1.824 5.333H3.002L3 11.004L14.146 2.1z" />
                  <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M21 11.003h-.176L19.001 5.67L3.354 11.003L3 11m-.5.004H3L14.146 2.1l2.817 3.95" />
                  <g stroke="currentColor" stroke-linecap="square" stroke-width="2">
                    <path d="M14.5 16a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                    <use href="#SVGS9q3IkIf" />
                    <path d="M2.5 11h2a2 2 0 0 1-2 2zm19 0h-2a2 2 0 0 0 2 2zm-19 10h2.002A2 2 0 0 0 2.5 18.998zm19 0h-2a2 2 0 0 1 2-2z" />
                  </g>
                </g>
              </svg>
              <div>
                <h1 class="font-rajdhani font-bold text-2xl text-white leading-none tracking-wide italic text-glow">Pendapatan</h1>
                <p class="text-white/85 text-xs font-barlow">Rincian pendapatan harian</p>
              </div>
            </div>
            <NuxtLink to="/" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="0.5em" height="1em" viewBox="0 0 12 24" class="text-white">
                <path d="M0 0h12v24H0z" fill="none" />
                <path fill="currentColor" fill-rule="evenodd" d="M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5L10 4.563L2.682 12z" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-4 py-6 pb-24 space-y-4">
        <!-- Total Summary -->
        <div class="bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl p-5 border-2 border-white/30">
          <p class="text-white/70 text-xs font-barlow mb-1">Total Pendapatan</p>
          <h2 class="font-rajdhani font-bold text-4xl text-white leading-none mb-2">
            Rp {{ totalPendapatan.toLocaleString('id-ID') }}
          </h2>
          <p class="text-white/60 text-[10px] font-barlow">{{ completedHistory.length }} transaksi selesai</p>
        </div>

        <!-- Empty State -->
        <div v-if="completedHistory.length === 0" class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" class="text-white/40 mb-3">
            <path d="M0 0h24v24H0z" fill="none" />
            <defs>
              <path id="SVGS9q3IkIf" d="M21.5 11v10h-19V11z" />
            </defs>
            <g fill="none">
              <use href="#SVGS9q3IkIf" />
              <path d="M12 13.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m5.136-7.209L19 5.67l1.824 5.333H3.002L3 11.004L14.146 2.1z" />
              <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M21 11.003h-.176L19.001 5.67L3.354 11.003L3 11m-.5.004H3L14.146 2.1l2.817 3.95" />
              <g stroke="currentColor" stroke-linecap="square" stroke-width="2">
                <path d="M14.5 16a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                <use href="#SVGS9q3IkIf" />
                <path d="M2.5 11h2a2 2 0 0 1-2 2zm19 0h-2a2 2 0 0 0 2 2zm-19 10h2.002A2 2 0 0 0 2.5 18.998zm19 0h-2a2 2 0 0 1 2-2z" />
              </g>
            </g>
          </svg>
          <h3 class="font-rajdhani font-bold text-2xl text-white mb-2">Belum Ada Pendapatan</h3>
          <p class="text-white/70 font-barlow text-sm">Pendapatan dari timer selesai akan muncul di sini</p>
        </div>

        <!-- History List -->
        <div v-else class="space-y-3">
          <div
            v-for="item in completedHistory"
            :key="item.id"
            class="bg-white/10 rounded-xl p-4 border-2 border-white/30"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <Icon name="ph:check-circle-duo" size="20" class="text-green-400" />
                </div>
                <div>
                  <h3 class="font-rajdhani font-bold text-white italic">{{ item.name }}</h3>
                  <p class="text-white/60 text-[10px] font-barlow">{{ formatDateTime(item.completedAt) }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-rajdhani font-bold text-lg text-green-400">Rp {{ item.payment.toLocaleString('id-ID') }}</p>
                <p class="text-white/50 text-[10px] font-barlow">{{ formatTimerDisplay(item.totalTime) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#E0941A]/95 backdrop-blur-lg border-t-2 border-white/30 px-6 py-3">
        <div class="flex items-center justify-between relative h-16">
          <!-- Left: Simpan Waktu -->
          <NuxtLink to="/simpan" class="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all">
            <div class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center border-2 border-white/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-white">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zm-4.875 9.275Q15 16.25 15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18t2.125-.875M6 10h9V6H6zM5 7.85V19V5z" />
              </svg>
            </div>
            <span class="text-xs font-barlow font-medium">Simpan</span>
            <span v-if="savedTimers.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold">{{ savedTimers.length }}</span>
          </NuxtLink>

          <!-- Center: Tambah Timer -->
          <button
            @click="$router.push('/')"
            class="absolute left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all">
            <div class="w-16 h-16 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[#F5A623] transition-all hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" class="text-[#F5A623]">
                <path fill="currentColor" d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z" />
              </svg>
            </div>
            <span class="text-xs font-barlow font-medium">Tambah</span>
          </button>

          <!-- Right Side Group -->
          <div class="flex items-center gap-3">
            <!-- Pendapatan (Active) -->
            <div class="flex flex-col items-center gap-1 text-white">
              <div class="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center border-2 border-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-white">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <defs>
                    <path id="SVGS9q3IkIf2" d="M21.5 11v10h-19V11z" />
                  </defs>
                  <g fill="none">
                    <use href="#SVGS9q3IkIf2" />
                    <path d="M12 13.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m5.136-7.209L19 5.67l1.824 5.333H3.002L3 11.004L14.146 2.1z" />
                    <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M21 11.003h-.176L19.001 5.67L3.354 11.003L3 11m-.5.004H3L14.146 2.1l2.817 3.95" />
                    <g stroke="currentColor" stroke-linecap="square" stroke-width="2">
                      <path d="M14.5 16a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                      <use href="#SVGS9q3IkIf2" />
                      <path d="M2.5 11h2a2 2 0 0 1-2 2zm19 0h-2a2 2 0 0 0 2 2zm-19 10h2.002A2 2 0 0 0 2.5 18.998zm19 0h-2a2 2 0 0 1 2-2z" />
                    </g>
                  </g>
                </svg>
              </div>
              <span class="text-xs font-barlow font-bold">Pendapatan</span>
            </div>

            <!-- Riwayat -->
            <NuxtLink to="/riwayat" class="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all">
              <div class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center border-2 border-white/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-white">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" />
                </svg>
              </div>
              <span class="text-xs font-barlow font-medium">Riwayat</span>
              <span v-if="history.length > 0" class="absolute -top-1 right-1 w-5 h-5 bg-zinc-600 rounded-full text-white text-xs flex items-center justify-center font-bold">{{ history.length }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const history = useHistory()
const savedTimers = useSavedTimers()

// Completed history only (with payment)
const completedHistory = computed(() => {
  return history.value.filter(item => item.status === 'completed')
})

// Total pendapatan
const totalPendapatan = computed(() => {
  return completedHistory.value.reduce((sum, item) => sum + (item.payment || 0), 0)
})

function formatTimerDisplay(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}j ${minutes}m`
  }
  return `${minutes}m`
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
</script>
