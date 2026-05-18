<template>
  <div class="min-h-screen bg-zinc-900 flex items-center justify-center py-4 px-4">
    <!-- Phone Frame Container -->
    <div class="w-full max-w-[400px] bg-[#F5A623] min-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative border-4 border-zinc-800">
      <!-- Top Bar -->
      <div class="sticky top-0 z-50 bg-[#E0941A]/95 backdrop-blur-lg border-b-2 border-white/30 shadow-xl">
        <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/logo.jpg" alt="Timer PS" class="w-full h-full object-cover" />
            </div>
            <div>
              <h1 class="font-rajdhani font-bold text-2xl text-white leading-none tracking-wide italic text-glow">Timer PS</h1>
              <p class="text-white/85 text-xs font-barlow">Rental PlayStation</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="px-3 py-1.5 bg-white/20 rounded-full">
              <span class="text-white font-barlow font-medium text-xs">{{ activeTimers.length }} Timer</span>
            </div>
            <button
              @click="logout"
              class="px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 rounded-lg border-2 border-white/30 text-white transition-all font-barlow text-xs flex items-center justify-center"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- Main Content -->
      <div class="px-4 py-6 pb-24 space-y-4">
        <!-- Timer List -->
        <div v-if="activeTimers.length === 0" class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border-2 border-white/30">
          <Icon name="ph:timer-duo" size="64" class="text-white/60 mb-3" />
          <h2 class="font-rajdhani font-bold text-xl text-white mb-1">Belum Ada Timer</h2>
          <p class="text-white/80 text-xs font-barlow">Klik tombol "Tambah Timer" untuk memulai</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="timer in activeTimers"
            :key="timer.id"
            :class="[
              'bg-white/10 backdrop-blur-lg rounded-xl px-3 py-2.5 border-2 transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98]',
              timer.isPaused ? 'border-yellow-500/70' : 'border-white/40',
              timer.isFinished ? 'border-red-500/70' : 'hover:border-white/60'
            ]"
            @click="openTimerMenu(timer, $event)"
          >
            <!-- Single Bar Layout -->
            <div class="flex items-center gap-2">
              <!-- Status Icon -->
              <div class="w-8 h-8 rounded-md flex items-center justify-center border-2 border-white/50 flex-shrink-0" :class="timer.isFinished ? 'bg-red-500/30' : (timer.isPaused ? 'bg-yellow-500/30' : 'bg-green-500/30')">
                <Icon v-if="timer.isFinished" name="ph:check-circle-duo" size="18" class="text-red-400" />
                <Icon v-else-if="timer.isPaused" name="ph:pause-duo" size="18" class="text-yellow-400" />
                <Icon v-else name="ph:hourglass-duo" size="18" class="text-green-400" />
              </div>

              <!-- Timer Name -->
              <div class="flex-shrink-0 min-w-[55px]">
                <h3 class="font-rajdhani font-bold text-base text-white leading-none tracking-wide italic">{{ timer.name }}</h3>
              </div>

              <!-- Timer Display (Large) -->
              <div class="flex-shrink-0">
                <div class="font-rajdhani font-bold text-xl text-white leading-none tracking-wide tabular-nums" :class="timer.isFinished ? 'text-red-400' : 'text-white'">
                  {{ formatTimerDisplay(timer.remainingTime) }}
                </div>
              </div>

              <!-- Progress Bar (Compact) -->
              <div class="flex-1 min-w-[70px]">
                <div class="bg-black/30 rounded-full h-1.5 overflow-hidden border border-white/20">
                  <div
                    class="h-full transition-all duration-1000 ease-linear relative"
                    :class="getProgressColor(timer)"
                    :style="{ width: `${getProgress(timer)}%` }"
                  >
                    <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div class="text-white/60 text-[10px] font-barlow mt-0.5 text-center">
                  {{ getProgress(timer).toFixed(0) }}%
                </div>
              </div>

              <!-- Total Time -->
              <div class="flex-shrink-0 min-w-[50px] text-center">
                <p class="text-white/70 text-[10px] font-barlow leading-none">Total</p>
                <p class="font-barlow font-semibold text-xs text-white leading-none mt-0.5 tabular-nums">
                  {{ formatTimerDisplay(timer.totalTime) }}
                </p>
              </div>

              <!-- Action Button -->
              <button
                @click.stop="openTimerMenu(timer, $event)"
                class="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <Icon name="ph:dots-three-vertical-duo" size="20" />
              </button>
            </div>
          </div>
        </div>

        <!-- Clear Finished Button -->
        <div v-if="hasFinishedTimers" class="text-center space-y-3">
          <!-- Stop Alarm Button (when alarm is playing) -->
          <div v-if="isAlarmPlaying" class="bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-2xl p-4 border-2 border-red-400/50 animate-pulse">
            <button
              @click="stopAlarm"
              class="w-full px-6 py-4 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold font-rajdhani text-xl transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="animate-pulse">
                <path fill="currentColor" d="M6 6h12v12H6z" />
              </svg>
              STOP ALARM 🔔
            </button>
            <p class="text-white/80 text-xs font-barlow mt-2 text-center">Alarm akan berhenti otomatis dalam 5 menit</p>
          </div>

          <!-- Selesai Button - Process all finished timers to history & income -->
          <button
            @click="processAllFinishedTimers"
            class="px-6 py-4 bg-green-500 hover:bg-green-600 rounded-2xl border-2 border-white/40 text-white font-bold font-rajdhani text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Selesai & Catat Pendapatan ({{ finishedTimersCount }} Timer)
          </button>

          <!-- Optional: Delete without recording -->
          <button
            @click="clearFinishedTimers"
            class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-white/70 font-barlow text-sm transition-all flex items-center justify-center gap-1"
          >
            <Icon name="ph:trash-duo" size="16" />
            Hapus tanpa catat
          </button>
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

          <!-- Center: Tambah Timer (Floating - Absolute Centered) -->
          <button
            @click="openAddTimerModal"
            class="absolute left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center gap-1"
          >
            <div class="w-16 h-16 bg-white hover:bg-white/90 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#F5A623] transition-all hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" class="text-[#F5A623]">
  <path fill="currentColor" d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z" />
</svg>
            </div>
            <span class="text-xs font-barlow font-bold text-white">Tambah</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Timer Menu Dropdown -->
    <div
      v-if="showTimerMenu && selectedTimer"
      class="fixed z-50"
      :style="{ top: timerMenuPosition.top + 'px', left: timerMenuPosition.left + 'px' }"
    >
      <div class="bg-[#E0941A] rounded-xl shadow-2xl border-2 border-white/30 overflow-hidden min-w-[180px]" @click.stop>
        <button
          @click="saveTimer(selectedTimer)"
          class="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-all font-barlow text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="text-white">
            <path d="M0 0h24v24H0z" fill="none" />
	                <path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" />
          </svg>
          Simpan
        </button>
        <button
          v-if="!selectedTimer.isFinished"
          @click="togglePause(selectedTimer.id); closeTimerMenu()"
          class="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-all font-barlow text-sm flex items-center gap-2"
        >
          <Icon :name="selectedTimer.isPaused ? 'ph:play-duo' : 'ph:pause-duo'" size="20" />
          {{ selectedTimer.isPaused ? 'Lanjut' : 'Pause' }}
        </button>
        <button
          @click="finishTimer(selectedTimer)"
          class="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-all font-barlow text-sm flex items-center gap-2"
        >
          <Icon name="ph:check-circle-duo" size="20" />
          Selesaikan
        </button>
        <button
          @click="cancelTimer(selectedTimer)"
          class="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-all font-barlow text-sm flex items-center gap-2"
        >
          <Icon name="ph:trash-duo" size="20" />
          Hapus
        </button>
      </div>
    </div>

    <!-- Click outside to close menu -->
    <div
      v-if="showTimerMenu"
      @click="closeTimerMenu"
      class="fixed inset-0 z-40"
    ></div>

    <!-- Add Timer Modal -->
    <div
      v-if="showAddTimerModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-[#F5A623] rounded-3xl p-6 w-full max-w-[400px] border-4 border-white/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          @click="showAddTimerModal = false"
          class="absolute top-4 right-4 text-white/60 hover:text-white z-10 transition-colors"
        >
          <Icon name="ph:x-duo" size="24" />
        </button>

        <div class="mb-5">
          <h2 class="font-rajdhani font-bold text-3xl text-white text-center leading-none tracking-wide italic mb-2 text-glow">Tambah Timer</h2>
          <p class="text-white/80 text-center font-barlow text-sm">Masukkan detail timer baru</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">Nama / No. PS</label>
            <input
              v-model="newTimer.name"
              type="text"
              placeholder="Contoh: PS 1"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-xl border-2 border-white/40 focus:border-white focus:outline-none font-barlow text-base"
            >
          </div>

          <!-- Payment Input -->
          <div class="bg-white/5 rounded-xl p-3 border border-white/20">
            <p class="text-white/50 text-xs font-barlow text-center mb-2 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="text-white/50">
                <path fill="currentColor" d="M5 6h18v2H5zm0 5h14v2H5zm0 5h18v2H5z" />
              </svg>
              Atau masukkan nominal pembayaran
            </p>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 font-barlow font-semibold">Rp</span>
              <input
                :value="addTimerPaymentDisplay"
                @input="handlePaymentInputChange"
                @focus="isPaymentInputFocused = true"
                @blur="isPaymentInputFocused = false"
                type="text"
                placeholder="0"
                class="w-full pl-10 pr-3 py-2 bg-white/10 text-white text-center rounded-lg border border-white/20 focus:border-white focus:outline-none font-rajdhani font-bold text-2xl"
              >
            </div>
            <p v-if="addTimerPayment > 0" class="text-white font-barlow font-bold text-sm mt-2 text-center">
              {{ terbilang(addTimerPayment) }} Rupiah
            </p>
            <p v-if="isPaymentInputFocused && addTimerPayment > 0" class="text-green-400 text-[10px] font-barlow mt-1 text-center">
              ≈ {{ addTimerPaymentTime.display }}
            </p>
          </div>

          <!-- Time Input -->
          <div class="bg-white/5 rounded-xl p-3 border border-white/20">
            <p class="text-white/50 text-xs font-barlow text-center mb-2 flex items-center justify-center gap-1">
              <Icon name="ph:timer-duo" size="14" />
              Atau masukkan durasi langsung
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <input
                  v-model.number="newTimer.hours"
                  @focus="isHoursInputFocused = true"
                  @blur="isHoursInputFocused = false"
                  type="number"
                  placeholder="0"
                  class="w-full px-3 py-2 bg-white/10 text-white text-center rounded-lg border border-white/20 focus:border-white focus:outline-none font-rajdhani font-bold text-2xl"
                >
                <p class="text-white/60 text-[10px] font-barlow mt-1">Jam</p>
              </div>
              <div class="text-center">
                <input
                  v-model.number="newTimer.minutes"
                  @focus="isMinutesInputFocused = true"
                  @blur="isMinutesInputFocused = false"
                  type="number"
                  placeholder="0"
                  class="w-full px-3 py-2 bg-white/10 text-white text-center rounded-lg border border-white/20 focus:border-white focus:outline-none font-rajdhani font-bold text-2xl"
                >
                <p class="text-white/60 text-[10px] font-barlow mt-1">Menit</p>
              </div>
            </div>
            <p v-if="(isHoursInputFocused || isMinutesInputFocused) && calculatedPaymentFromTime > 0" class="text-green-400 text-[10px] font-barlow mt-2 text-center">
              ≈ Rp {{ calculatedPaymentFromTime.toLocaleString('id-ID') }}
            </p>
          </div>

          <!-- Pricing Info -->
          <div class="bg-blue-500/10 rounded-xl p-3 border border-blue-400/30">
            <p class="text-blue-300 text-[10px] font-barlow text-center">
              💰 Rp 10.000 = 3 jam | Tambahan Rp 4.000/jam
            </p>
          </div>

          <div class="flex gap-2 pt-2">
            <button
              @click="showAddTimerModal = false"
              class="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl border-2 border-white/40 text-white font-bold font-barlow text-sm transition-all"
            >
              Batal
            </button>
            <button
              @click="addTimerFromModal"
              class="flex-1 py-3 bg-white text-[#F5A623] font-bold rounded-xl hover:bg-white/90 font-rajdhani text-base transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Icon name="ph:rocket-launch-duo" size="20" />
              Mulai
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Permission Prompt -->
    <div
      v-if="showNotificationPrompt"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
    >
      <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 w-full max-w-[380px] border-4 border-white/40 shadow-2xl">
        <div class="text-center mb-5">
          <div class="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="ph:bell-ringing-duo" size="48" class="text-white animate-bounce" />
          </div>
          <h2 class="font-rajdhani font-bold text-2xl text-white leading-none tracking-wide italic mb-2">Aktifkan Notifikasi?</h2>
          <p class="text-white/90 font-barlow text-sm">Dapatkan notifikasi & getar saat timer selesai, bahkan saat browser tertutup!</p>
        </div>

        <div class="bg-white/10 rounded-xl p-3 mb-5 border border-white/20">
          <div class="flex items-center gap-2 text-white/90 text-sm font-barlow">
            <Icon name="ph:check-circle-duo" size="18" class="text-green-300" />
            <span>Suara alarm berdering 3x</span>
          </div>
          <div class="flex items-center gap-2 text-white/90 text-sm font-barlow mt-1">
            <Icon name="ph:check-circle-duo" size="18" class="text-green-300" />
            <span>HP bergetar</span>
          </div>
          <div class="flex items-center gap-2 text-white/90 text-sm font-barlow mt-1">
            <Icon name="ph:check-circle-duo" size="18" class="text-green-300" />
            <span>Notifikasi di layar</span>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="denyNotification"
            class="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl border-2 border-white/40 text-white font-bold font-barlow text-sm transition-all"
          >
            Nanti Saja
          </button>
          <button
            @click="grantNotification"
            class="flex-1 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-white/90 font-rajdhani text-base transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <Icon name="ph:bell-duo" size="20" />
            Izinkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Auth check disabled for static version
// onMounted(() => {
//   if (import.meta.client) {
//     const authData = localStorage.getItem('ps-timer-auth')
//     if (!authData) {
//       navigateTo('/login')
//       return
//     }
//     try {
//       const parsed = JSON.parse(authData)
//       if (!parsed.isLoggedIn) {
//         navigateTo('/login')
//       }
//     } catch (e) {
//       navigateTo('/login')
//     }
//   }
// })

// Auth - disabled for static version
const logout = () => {
  if (confirm('Hapus semua data localStorage?')) {
    if (import.meta.client) {
      localStorage.clear()
      location.reload()
    }
  }
}

// Timer State
const activeTimers = useActiveTimers()
const savedTimers = useSavedTimers()
const savedPresets = useSavedPresets()
const history = useHistory()

// Modal States
const showAddTimerModal = ref(false)
const selectedTimer = ref(null)
const timerMenuPosition = ref({ top: 0, left: 0 })
const showTimerMenu = ref(false)

// New Timer Form
const newTimer = ref({
  name: '',
  hours: 0,
  minutes: 0,
  presetId: null
})

// Payment State
const addTimerPayment = ref(0)
const addTimerPaymentDisplay = ref('0')
const isPaymentInputFocused = ref(false)
const isHoursInputFocused = ref(false)
const isMinutesInputFocused = ref(false)
const isUpdatingFromPayment = ref(false)

// Notification Permission
const notificationPermission = ref<'default' | 'granted' | 'denied'>('default')
const showNotificationPrompt = ref(false)

// Check notification permission on mount
onMounted(() => {
  if (import.meta.client && 'Notification' in window) {
    notificationPermission.value = Notification.permission
  }

  // Initialize audio on first user interaction
  if (import.meta.client) {
    const handleFirstInteraction = () => {
      initAudioContext()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })
  }
})

// Computed
const hasFinishedTimers = computed(() => {
  return activeTimers.value.some(t => t.isFinished)
})

const finishedTimersCount = computed(() => {
  return activeTimers.value.filter(t => t.isFinished).length
})

// Payment calculation
const addTimerPaymentTime = computed(() => {
  const amount = addTimerPayment.value || 0
  const basePrice = 10000
  const hourlyRate = 4000

  if (amount <= 0) {
    return { hours: 0, minutes: 0, display: '0j 0m' }
  }

  if (amount < basePrice) {
    const totalMinutesFromPayment = Math.floor((amount / hourlyRate) * 60)
    const hours = Math.floor(totalMinutesFromPayment / 60)
    const minutes = totalMinutesFromPayment % 60
    return { hours, minutes, display: `${hours}j ${minutes}m` }
  }

  if (amount === basePrice) {
    return { hours: 3, minutes: 0, display: '3j 0m' }
  }

  const remainingAmount = amount - basePrice
  const additionalMinutesFromPayment = Math.floor((remainingAmount / hourlyRate) * 60)
  const totalHours = 3 + Math.floor(additionalMinutesFromPayment / 60)
  const totalMinutes = additionalMinutesFromPayment % 60

  return {
    hours: totalHours,
    minutes: totalMinutes,
    display: `${totalHours}j ${totalMinutes}m`
  }
})

const calculatedPaymentFromTime = computed(() => {
  const hours = newTimer.value.hours || 0
  const minutes = newTimer.value.minutes || 0
  const totalMinutes = (hours * 60) + minutes
  const basePrice = 10000
  const hourlyRate = 4000
  const threeHoursInMinutes = 180

  if (totalMinutes <= 0) return 0
  if (totalMinutes === threeHoursInMinutes) return basePrice
  if (totalMinutes < threeHoursInMinutes) {
    return Math.ceil((totalMinutes / 60) * hourlyRate)
  }

  const additionalMinutes = totalMinutes - threeHoursInMinutes
  const additionalCost = Math.ceil((additionalMinutes / 60) * hourlyRate)
  return basePrice + additionalCost
})

// Watch payment changes
watch([() => newTimer.value.hours, () => newTimer.value.minutes], () => {
  if (!isUpdatingFromPayment.value) {
    addTimerPayment.value = calculatedPaymentFromTime.value
    addTimerPaymentDisplay.value = formatCurrency(addTimerPayment.value)
  }
})

// Functions
function terbilang(nilai: number): string {
  const satuan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas']
  if (nilai < 12) return satuan[Math.floor(nilai)]
  if (nilai < 20) return terbilang(nilai - 10) + ' Belas'
  if (nilai < 100) return terbilang(Math.floor(nilai / 10)) + ' Puluh' + (nilai % 10 !== 0 ? ' ' + satuan[Math.floor(nilai % 10)] : '')
  if (nilai < 200) return 'Seratus' + (nilai % 100 !== 0 ? ' ' + terbilang(nilai % 100) : '')
  if (nilai < 1000) return terbilang(Math.floor(nilai / 100)) + ' Ratus' + (nilai % 100 !== 0 ? ' ' + terbilang(nilai % 100) : '')
  if (nilai < 2000) return 'Seribu' + (nilai % 1000 !== 0 ? ' ' + terbilang(nilai % 1000) : '')
  if (nilai < 1000000) return terbilang(Math.floor(nilai / 1000)) + ' Ribu' + (nilai % 1000 !== 0 ? ' ' + terbilang(nilai % 1000) : '')
  if (nilai < 1000000000) return terbilang(Math.floor(nilai / 1000000)) + ' Juta' + (nilai % 1000000 !== 0 ? ' ' + terbilang(nilai % 1000000) : '')
  return terbilang(Math.floor(nilai / 1000000000)) + ' Milyar' + (nilai % 1000000000 !== 0 ? ' ' + terbilang(nilai % 1000000000) : '')
}

function formatCurrency(nilai: number): string {
  return nilai.toLocaleString('id-ID')
}

function parseCurrencyInput(input: string): number {
  // Remove non-digit characters
  const clean = input.replace(/[^\d]/g, '')
  return clean ? parseInt(clean, 10) : 0
}

function handlePaymentInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const rawValue = target.value
  const numericValue = parseCurrencyInput(rawValue)

  addTimerPaymentDisplay.value = formatCurrency(numericValue)
  addTimerPayment.value = numericValue

  isUpdatingFromPayment.value = true
  const timeData = addTimerPaymentTime.value
  newTimer.value.hours = timeData.hours
  newTimer.value.minutes = timeData.minutes
  setTimeout(() => {
    isUpdatingFromPayment.value = false
  }, 50)
}

function handlePaymentInput() {
  isUpdatingFromPayment.value = true
  const timeData = addTimerPaymentTime.value
  newTimer.value.hours = timeData.hours
  newTimer.value.minutes = timeData.minutes
  setTimeout(() => {
    isUpdatingFromPayment.value = false
  }, 50)
}

function openAddTimerModal() {
  // Initialize audio context on user interaction
  initAudioContext()

  newTimer.value = { name: '', hours: 0, minutes: 0, presetId: null }
  addTimerPayment.value = 0
  addTimerPaymentDisplay.value = '0'
  isPaymentInputFocused.value = false
  isHoursInputFocused.value = false
  isMinutesInputFocused.value = false
  isUpdatingFromPayment.value = false

  // Show notification prompt if permission is default
  if (import.meta.client && 'Notification' in window && Notification.permission === 'default') {
    showNotificationPrompt.value = true
  } else {
    showAddTimerModal.value = true
  }
}

async function grantNotification() {
  if (import.meta.client && 'Notification' in window) {
    const permission = await Notification.requestPermission()
    notificationPermission.value = permission
  }
  showNotificationPrompt.value = false
  showAddTimerModal.value = true
}

function denyNotification() {
  showNotificationPrompt.value = false
  showAddTimerModal.value = true
}

function openTimerMenu(timer: any, event: Event) {
  initAudioContext()
  selectedTimer.value = timer
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  timerMenuPosition.value = {
    top: rect.bottom + 5,
    left: rect.left - 150
  }
  showTimerMenu.value = true
}

function closeTimerMenu() {
  showTimerMenu.value = false
  selectedTimer.value = null
}

async function addTimerFromModal() {
  if (!newTimer.value.name.trim()) {
    alert('Masukkan nama timer!')
    return
  }

  if (newTimer.value.hours === 0 && newTimer.value.minutes === 0) {
    alert('Masukkan durasi waktu!')
    return
  }

  const totalSeconds = (newTimer.value.hours * 3600) + (newTimer.value.minutes * 60)

  const timer = {
    id: Date.now(),
    name: newTimer.value.name,
    totalTime: totalSeconds,
    remainingTime: totalSeconds,
    isPaused: false,
    isFinished: false,
    createdAt: new Date().toISOString()
  }

  activeTimers.value.push(timer)

  if (newTimer.value.presetId) {
    const presetIndex = savedPresets.value.findIndex(p => p.id === newTimer.value.presetId)
    if (presetIndex !== -1) {
      savedPresets.value.splice(presetIndex, 1)
    }
  }

  newTimer.value = { name: '', hours: 0, minutes: 0, presetId: null }
  addTimerPayment.value = 0
  addTimerPaymentDisplay.value = '0'
  showAddTimerModal.value = false
}

function togglePause(timerId: number) {
  initAudioContext()
  const timer = activeTimers.value.find(t => t.id === timerId)
  if (timer) {
    timer.isPaused = !timer.isPaused
  }
}

function saveTimer(timer: any) {
  const savedTimer = {
    id: Date.now(),
    name: timer.name,
    totalTime: timer.totalTime,
    remainingTime: timer.remainingTime,
    isPaused: timer.isPaused,
    createdAt: new Date().toISOString(),
    savedAt: new Date().toISOString()
  }
  savedTimers.value.push(savedTimer)

  const index = activeTimers.value.findIndex(t => t.id === timer.id)
  if (index !== -1) {
    activeTimers.value.splice(index, 1)
  }
  closeTimerMenu()
}

function finishTimer(timer: any) {
  const hours = Math.floor(timer.totalTime / 3600)
  const minutes = Math.floor((timer.totalTime % 3600) / 60)
  const totalMinutes = (hours * 60) + minutes
  const basePrice = 10000
  const hourlyRate = 4000
  const threeHoursInMinutes = 180

  let payment = 0
  if (totalMinutes === threeHoursInMinutes) {
    payment = basePrice
  } else if (totalMinutes < threeHoursInMinutes) {
    payment = Math.ceil((totalMinutes / 60) * hourlyRate)
  } else {
    const additionalMinutes = totalMinutes - threeHoursInMinutes
    const additionalCost = Math.ceil((additionalMinutes / 60) * hourlyRate)
    payment = basePrice + additionalCost
  }

  const historyEntry = {
    id: Date.now(),
    name: timer.name,
    totalTime: timer.totalTime,
    remainingTime: timer.remainingTime,
    payment: payment,
    status: 'completed',
    completedAt: new Date().toISOString()
  }
  history.value.unshift(historyEntry)

  const index = activeTimers.value.findIndex(t => t.id === timer.id)
  if (index !== -1) {
    activeTimers.value.splice(index, 1)
  }

  // Stop alarm when manually finishing a timer
  if (!activeTimers.value.some(t => t.isFinished)) {
    stopAlarm()
  }

  closeTimerMenu()
}

function cancelTimer(timer: any) {
  const historyEntry = {
    id: Date.now(),
    name: timer.name,
    totalTime: timer.totalTime,
    remainingTime: timer.remainingTime,
    payment: 0,
    status: 'cancelled',
    cancelledAt: new Date().toISOString()
  }
  history.value.unshift(historyEntry)

  const index = activeTimers.value.findIndex(t => t.id === timer.id)
  if (index !== -1) {
    activeTimers.value.splice(index, 1)
  }

  // Stop alarm if no more finished timers
  if (!activeTimers.value.some(t => t.isFinished)) {
    stopAlarm()
  }

  closeTimerMenu()
}

function deleteTimer(timerId: number) {
  const index = activeTimers.value.findIndex(t => t.id === timerId)
  if (index !== -1) {
    if (confirm('Hapus timer ini?')) {
      activeTimers.value.splice(index, 1)
    }
  }
}

function clearFinishedTimers() {
  if (confirm(`Hapus ${finishedTimersCount.value} timer yang sudah selesai?`)) {
    stopAlarm() // Stop alarm when clearing finished timers
    activeTimers.value = activeTimers.value.filter(t => !t.isFinished)
  }
}

// Process all finished timers - add to history with payment
function processAllFinishedTimers() {
  const finished = activeTimers.value.filter(t => t.isFinished)

  if (finished.length === 0) return

  // Process each finished timer
  finished.forEach(timer => {
    const hours = Math.floor(timer.totalTime / 3600)
    const minutes = Math.floor((timer.totalTime % 3600) / 60)
    const totalMinutes = (hours * 60) + minutes
    const basePrice = 10000
    const hourlyRate = 4000
    const threeHoursInMinutes = 180

    let payment = 0
    if (totalMinutes === threeHoursInMinutes) {
      payment = basePrice
    } else if (totalMinutes < threeHoursInMinutes) {
      payment = Math.ceil((totalMinutes / 60) * hourlyRate)
    } else {
      const additionalMinutes = totalMinutes - threeHoursInMinutes
      const additionalCost = Math.ceil((additionalMinutes / 60) * hourlyRate)
      payment = basePrice + additionalCost
    }

    // Add to history with payment
    const historyEntry = {
      id: Date.now() + timer.id, // Unique ID
      name: timer.name,
      totalTime: timer.totalTime,
      remainingTime: 0,
      payment: payment,
      status: 'completed',
      completedAt: new Date().toISOString()
    }
    history.value.unshift(historyEntry)
  })

  // Stop alarm and remove finished timers
  stopAlarm()
  activeTimers.value = activeTimers.value.filter(t => !t.isFinished)
}

function saveTimerAsPreset(timer) {
  const hours = Math.floor(timer.totalTime / 3600)
  const minutes = Math.floor((timer.totalTime % 3600) / 60)
  const defaultName = `${timer.name} - ${hours}j ${minutes}m`
  const presetName = prompt(`Simpan durasi "${formatTimerDisplay(timer.totalTime)}" sebagai preset:`, defaultName)

  if (presetName && presetName.trim()) {
    const preset = {
      id: Date.now(),
      name: presetName.trim(),
      hours: hours,
      minutes: minutes
    }

    savedPresets.value.push(preset)

    const timerIndex = activeTimers.value.findIndex(t => t.id === timer.id)
    if (timerIndex !== -1) {
      activeTimers.value.splice(timerIndex, 1)
    }
  }
}

// Utility Functions
function formatTimerDisplay(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function getProgress(timer: any) {
  return ((timer.totalTime - timer.remainingTime) / timer.totalTime) * 100
}

function getProgressColor(timer: any) {
  const progress = getProgress(timer)
  if (progress < 33) return 'bg-green-500'
  if (progress < 66) return 'bg-yellow-500'
  if (progress < 90) return 'bg-orange-500'
  return 'bg-red-500'
}

// Timer Update
let timerInterval = null
let audioContext: AudioContext | null = null
let alarmInterval: ReturnType<typeof setInterval> | null = null
const isAlarmPlaying = ref(false)

// Initialize audio context on user interaction
function initAudioContext() {
  if (import.meta.client && !audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume()
  }
}

// Stop alarm
function stopAlarm() {
  if (alarmInterval) {
    clearInterval(alarmInterval)
    alarmInterval = null
  }
  isAlarmPlaying.value = false
  if (import.meta.client && 'vibrate' in navigator) {
    navigator.vibrate(0) // Stop vibration
  }
}

onMounted(() => {
  timerInterval = setInterval(() => {
    let hasChanges = false

    activeTimers.value.forEach(timer => {
      if (!timer.isPaused && !timer.isFinished && timer.remainingTime > 0) {
        timer.remainingTime--

        if (timer.remainingTime === 0) {
          timer.isFinished = true
          timer.justFinished = true // Mark for notification
          playAlarm()
        }
        hasChanges = true
      }
    })
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

function playAlarm() {
  // Initialize audio context if needed
  initAudioContext()

  // Don't play if already playing
  if (isAlarmPlaying.value) return

  isAlarmPlaying.value = true
  let alarmDuration = 0 // Track seconds played
  const maxDuration = 300 // 5 minutes = 300 seconds

  // Vibrate device continuously (Android support)
  if (import.meta.client && 'vibrate' in navigator) {
    // Vibrate pattern: 500ms on, 500ms off, repeating
    navigator.vibrate([500, 500])
  }

  // Browser Notification
  if (import.meta.client && 'Notification' in window && Notification.permission === 'granted') {
    const finishedTimers = activeTimers.value.filter(t => t.isFinished && t.justFinished)
    finishedTimers.forEach(timer => {
      const notification = new Notification('⏰ Timer PS - Waktu Habis!', {
        body: `${timer.name} telah selesai. Klik untuk membuka.`,
        icon: '/logo.jpg',
        badge: '/logo.jpg',
        tag: `timer-${timer.id}`,
        requireInteraction: true,
        vibrate: [500, 500]
      })

      // Click to focus window
      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      // Mark as notified
      timer.justFinished = false
    })
  }

  // Continuous Audio Alarm (ringing pattern)
  if (audioContext) {
    const playBeep = () => {
      if (!audioContext || !isAlarmPlaying.value) return

      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // Higher pitch and louder volume
        oscillator.frequency.value = 1000 // Higher frequency
        oscillator.type = 'square' // More aggressive waveform

        // Louder volume (0.5 instead of 0.3)
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      } catch (error) {
        console.log('Audio error:', error)
      }
    }

    // Play beep immediately
    playBeep()

    // Continue playing beeps every 600ms (ring pattern)
    alarmInterval = setInterval(() => {
      alarmDuration += 0.6

      // Stop after 5 minutes
      if (alarmDuration >= maxDuration) {
        stopAlarm()
        return
      }

      // Vibrate again
      if (import.meta.client && 'vibrate' in navigator) {
        navigator.vibrate([500, 500])
      }

      // Play beep
      playBeep()
    }, 600)
  }
}
</script>
