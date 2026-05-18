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
                <path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" />
              </svg>
              <div>
                <h1 class="font-rajdhani font-bold text-2xl text-white leading-none tracking-wide italic text-glow">Simpan Waktu</h1>
                <p class="text-white/85 text-xs font-barlow">{{ savedTimers.length }} waktu tersimpan</p>
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
        <div v-if="savedTimers.length === 0" class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" class="text-white/40 mb-3">
            <path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" />
          </svg>
          <h3 class="font-rajdhani font-bold text-2xl text-white mb-2">Belum Ada Waktu Tersimpan</h3>
          <p class="text-white/70 font-barlow text-sm mb-4">Simpan timer aktif untuk melanjutkan nanti</p>
          <NuxtLink to="/" class="inline-block px-6 py-3 bg-white hover:bg-white/90 rounded-xl border-2 border-white/40 text-[#F5A623] font-bold font-rajdhani text-base transition-all flex items-center justify-center gap-2">
            <Icon name="ph:house-duo" size="20" />
            Kembali ke Beranda
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 gap-3">
          <div
            v-for="saved in savedTimers"
            :key="saved.id"
            class="bg-white/10 rounded-2xl p-4 border-2 border-white/30 hover:border-white/50 transition-all"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/40">
                <Icon name="ph:timer-duo" size="28" />
              </div>
              <div class="flex-1">
                <h3 class="font-rajdhani font-bold text-lg text-white italic">{{ saved.name }}</h3>
                <p class="text-white/70 font-barlow text-sm">Sisa: {{ formatTimerDisplay(saved.remainingTime) }}</p>
                <p class="text-white/50 text-xs font-barlow">Total: {{ formatTimerDisplay(saved.totalTime) }}</p>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                @click="continueSavedTimer(saved)"
                class="flex-1 py-2 bg-green-500/50 hover:bg-green-500 rounded-xl border-2 border-white/40 text-white font-barlow font-semibold text-xs transition-all flex items-center justify-center gap-1"
              >
                <Icon name="ph:play-duo" size="16" />
                Lanjutkan
              </button>
              <button
                @click="deleteSavedTimer(saved.id)"
                class="w-10 h-10 bg-red-500/50 hover:bg-red-500 rounded-xl border-2 border-white/40 text-white font-barlow font-semibold text-xs transition-all flex items-center justify-center"
                title="Hapus"
              >
                <Icon name="ph:trash-duo" size="18" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#E0941A]/95 backdrop-blur-lg border-t-2 border-white/30 px-6 py-3">
        <div class="flex items-center justify-between relative h-16">
          <!-- Left: Simpan Waktu (Active) -->
          <div class="flex flex-col items-center gap-1 text-white">
            <div class="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center border-2 border-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="text-white">
  <path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zm-4.875 9.275Q15 16.25 15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18t2.125-.875M6 10h9V6H6zM5 7.85V19V5z" />
</svg>
            </div>
            <span class="text-xs font-barlow font-bold">Simpan</span>
          </div>

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
            <!-- Pendapatan -->
            <NuxtLink to="/pendapatan" class="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all">
              <div class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center border-2 border-white/30 transition-all">
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
              </div>
              <span class="text-xs font-barlow font-medium">Pendapatan</span>
            </NuxtLink>

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
const activeTimers = useActiveTimers()
const savedTimers = useSavedTimers()
const history = useHistory()

function formatTimerDisplay(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function continueSavedTimer(savedTimer: any) {
  const timer = {
    id: Date.now(),
    name: savedTimer.name,
    totalTime: savedTimer.totalTime,
    remainingTime: savedTimer.remainingTime,
    isPaused: savedTimer.isPaused,
    isFinished: savedTimer.remainingTime === 0,
    createdAt: new Date().toISOString()
  }
  activeTimers.value.push(timer)

  const index = savedTimers.value.findIndex(t => t.id === savedTimer.id)
  if (index !== -1) {
    savedTimers.value.splice(index, 1)
  }

  navigateTo('/')
}

function deleteSavedTimer(savedTimerId: number) {
  if (confirm('Hapus waktu tersimpan ini?')) {
    const index = savedTimers.value.findIndex(t => t.id === savedTimerId)
    if (index !== -1) {
      savedTimers.value.splice(index, 1)
    }
  }
}
</script>
