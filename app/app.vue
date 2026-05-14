<template>
  <!-- Login Page -->
  <div v-if="!isLoggedIn" class="min-h-screen bg-gradient-to-br from-zinc-900 via-orange-950 to-zinc-900 flex items-center justify-center px-4">
    <div class="relative w-full max-w-md bg-gradient-to-b from-[#F5A623] to-[#E0941A] rounded-4xl p-8 shadow-2xl border border-white/30 overflow-hidden">
      <!-- Background Watermark -->
      <div class="absolute top-4 right-[-30px] w-[200px] opacity-[0.18] pointer-events-none z-0">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="white" stroke-width="18" fill="none"/>
          <circle cx="100" cy="100" r="30" fill="white"/>
          <path d="M100 10 C100 10 60 55 30 65 L50 100 C50 100 65 80 100 80 C135 80 150 100 150 100 L170 65 C140 55 100 10 100 10Z" fill="white" opacity="0.5"/>
        </svg>
      </div>

      <div class="relative z-10">
        <!-- Logo -->
        <div class="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <span class="text-5xl">🎮</span>
        </div>

        <!-- Title -->
        <h1 class="font-rajdhani font-bold text-[42px] text-white text-center leading-none tracking-wide italic mb-2 text-glow">Timer PS</h1>
        <p class="text-white/85 text-base text-center mb-8">Rental PlayStation Timer</p>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">Username</label>
            <input
              v-model="loginForm.username"
              type="text"
              placeholder="Masukkan username"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-2xl border-2 border-white/30 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-barlow"
              :class="{ 'border-red-500': loginError }"
            >
          </div>

          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">Password</label>
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="Masukkan password"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-2xl border-2 border-white/30 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-barlow"
              :class="{ 'border-red-500': loginError }"
            >
          </div>

          <div v-if="loginError" class="bg-red-500/30 border-2 border-red-500/50 rounded-2xl p-3 text-red-200 text-sm text-center font-barlow">
            {{ loginError }}
          </div>

          <button
            type="submit"
            :disabled="isLoggingIn"
            class="w-full px-6 py-4 bg-white text-[#F5A623] font-bold rounded-2xl hover:bg-white/90 transition-all duration-200 shadow-xl font-rajdhani text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoggingIn">⏳ Login...</span>
            <span v-else>🔐 Login</span>
          </button>
        </form>

        <!-- Hint -->
        <div class="mt-8 bg-white/10 border-2 border-white/30 rounded-2xl p-4 text-center">
          <p class="text-white/90 text-sm font-barlow mb-2">🔑 Default Credentials:</p>
          <p class="text-white font-barlow">Username: <span class="text-yellow-300 font-semibold">admin</span></p>
          <p class="text-white font-barlow">Password: <span class="text-yellow-300 font-semibold">12345</span></p>
        </div>
      </div>
    </div>
  </div>

  <!-- Main App -->
  <div v-else class="min-h-screen bg-zinc-900 flex items-center justify-center py-4 px-4">
    <!-- Phone Frame Container -->
    <div class="w-full max-w-[400px] bg-[#F5A623] min-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative border-4 border-zinc-800">
      <!-- Top Bar -->
      <div class="sticky top-0 z-50 bg-[#E0941A]/95 backdrop-blur-lg border-b-2 border-white/30 shadow-xl">
        <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span class="text-xl">🎮</span>
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
              class="px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 rounded-lg border-2 border-white/30 text-white transition-all font-barlow text-xs"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 pb-8 space-y-4">
      <!-- Action Buttons -->
      <div class="flex gap-3">
        <button
          @click="openAddTimerModal"
          class="flex-1 py-3 bg-white hover:bg-white/90 rounded-2xl border-2 border-white/40 shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          <span class="text-2xl group-hover:scale-110 transition-transform">➕</span>
          <span class="text-[#F5A623] font-bold font-rajdhani text-base">Tambah Timer</span>
        </button>

        <button
          @click="showPresetsModal = true"
          class="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-2xl border-2 border-white/40 shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span class="text-2xl">💾</span>
          <span class="text-white font-bold font-barlow text-sm">Preset ({{ savedPresets.length }})</span>
        </button>
      </div>

      <!-- Timer List -->
      <div v-if="activeTimers.length === 0" class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border-2 border-white/30">
        <div class="text-4xl mb-2">⏱️</div>
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
          @click="openTimerActions(timer)"
        >
          <!-- Single Bar Layout -->
          <div class="flex items-center gap-2">
            <!-- Status Icon -->
            <div class="w-8 h-8 rounded-md flex items-center justify-center border-2 border-white/50 flex-shrink-0" :class="timer.isFinished ? 'bg-red-500/30' : (timer.isPaused ? 'bg-yellow-500/30' : 'bg-green-500/30')">
              <span class="text-sm">{{ timer.isFinished ? '✅' : (timer.isPaused ? '⏸️' : '⏳') }}</span>
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

            <!-- Touch Indicator -->
            <div class="flex-shrink-0 text-white/40 text-sm ml-auto">
              ⋯
            </div>
          </div>
        </div>
      </div>

      <!-- Clear Finished Button -->
      <div v-if="hasFinishedTimers" class="text-center">
        <button
          @click="clearFinishedTimers"
          class="px-6 py-3 bg-red-500/30 hover:bg-red-500/50 rounded-2xl border-2 border-white/40 text-white font-bold font-rajdhani text-lg transition-all"
        >
          🗑️ Hapus {{ finishedTimersCount }} Timer Selesai
        </button>
      </div>
    </div>
    </div>
  </div>

  <!-- Add Timer Modal -->
  <div
    v-if="showAddTimerModal"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <div class="bg-[#F5A623] rounded-3xl p-6 w-full max-w-[400px] border-4 border-white/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <button
        @click="showAddTimerModal = false"
        class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10 transition-colors"
      >
        ✕
      </button>

      <div class="mb-5">
        <h2 class="font-rajdhani font-bold text-3xl text-white text-center leading-none tracking-wide italic mb-2 text-glow">Tambah Timer</h2>
        <p class="text-white/80 text-center font-barlow text-sm">Masukkan detail timer baru</p>
      </div>

      <div class="space-y-4">
        <!-- Preset Quick Select -->
        <div v-if="savedPresets.length > 0">
          <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">Pilih Preset (Opsional)</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in savedPresets"
              :key="preset.id"
              @click="usePresetInModal(preset)"
              class="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl border-2 border-white/40 transition-all font-barlow font-medium text-sm"
            >
              {{ preset.name }}
              <span class="block text-white/60 text-xs">{{ preset.hours }}j {{ preset.minutes }}m</span>
            </button>
          </div>
        </div>

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
        <div class="space-y-3">
          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">💰 Jumlah Bayar (Rp)</label>
            <input
              v-model.number="addTimerPayment"
              @input="onAddTimerPaymentChange"
              @focus="onPaymentInputFocus"
              type="number"
              min="0"
              placeholder="Contoh: 10000"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-xl border-2 border-white/40 focus:border-white focus:outline-none font-barlow text-base text-center tabular-nums"
            >
            <p v-if="addTimerPayment > 0" class="text-white/60 text-xs font-barlow text-center mt-1">
              Rp {{ formatCurrency(addTimerPayment) }}
            </p>
          </div>

          <div class="bg-black/20 rounded-xl p-3 text-center">
            <p class="text-white/60 text-xs font-barlow mb-1">Durasi:</p>
            <p class="font-rajdhani font-bold text-xl text-white tabular-nums">
              {{ addTimerPaymentTime.display }}
            </p>
            <p class="text-white/50 text-[10px] font-barlow mt-1">
              3 jam pertama: Rp 10.000 (diskon), selanjutnya: Rp 4.000/jam
            </p>
          </div>
        </div>

        <!-- Manual Time Input (Optional) -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">⏱️ Jam</label>
            <input
              v-model.number="newTimer.hours"
              @focus="onTimeInputFocus"
              type="number"
              min="0"
              max="23"
              placeholder="0"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-xl border-2 border-white/40 focus:border-white focus:outline-none font-barlow text-base text-center tabular-nums"
            >
          </div>
          <div>
            <label class="block text-white/90 mb-2 text-sm font-barlow font-medium">⏱️ Menit</label>
            <input
              v-model.number="newTimer.minutes"
              @focus="onTimeInputFocus"
              type="number"
              min="0"
              max="59"
              placeholder="0"
              class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-xl border-2 border-white/40 focus:border-white focus:outline-none font-barlow text-base text-center tabular-nums"
            >
          </div>
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
            class="flex-1 py-3 bg-white text-[#F5A623] font-bold rounded-xl hover:bg-white/90 font-rajdhani text-base transition-all shadow-xl"
          >
            🚀 Mulai
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Presets Modal -->
  <div
    v-if="showPresetsModal"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <div class="bg-[#F5A623] rounded-3xl p-6 w-full max-w-[400px] border-4 border-white/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button
        @click="showPresetsModal = false"
        class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10 transition-colors"
      >
        ✕
      </button>

      <div class="mb-5">
        <h2 class="font-rajdhani font-bold text-3xl text-white text-center leading-none tracking-wide italic mb-2 text-glow">Preset Tersimpan</h2>
        <p class="text-white/80 text-center font-barlow text-sm">{{ savedPresets.length }} preset tersedia</p>
      </div>

      <div v-if="savedPresets.length === 0" class="text-center py-8">
        <div class="text-5xl mb-3">💾</div>
        <h3 class="font-rajdhani font-bold text-2xl text-white mb-2">Belum Ada Preset</h3>
        <p class="text-white/70 font-barlow text-sm">Simpan timer aktif sebagai preset</p>
      </div>

      <div v-else class="grid grid-cols-1 gap-3">
        <div
          v-for="preset in savedPresets"
          :key="preset.id"
          class="bg-white/10 rounded-2xl p-4 border-2 border-white/30 hover:border-white/50 transition-all"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/40">
              <span class="text-2xl">⏱️</span>
            </div>
            <div>
              <h3 class="font-rajdhani font-bold text-lg text-white italic">{{ preset.name }}</h3>
              <p class="text-white/70 font-barlow text-sm">{{ preset.hours }}j {{ preset.minutes }}m</p>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="continuePreset(preset)"
              class="flex-1 py-2 bg-green-500/50 hover:bg-green-500 rounded-xl border-2 border-white/40 text-white font-barlow font-semibold text-xs transition-all flex items-center justify-center gap-1"
            >
              ▶️ Pakai
            </button>
            <button
              @click="usePreset(preset)"
              class="flex-1 py-2 bg-blue-500/50 hover:bg-blue-500 rounded-xl border-2 border-white/40 text-white font-barlow font-semibold text-xs transition-all flex items-center justify-center gap-1"
            >
              ✏️ Edit
            </button>
            <button
              @click="deletePreset(preset.id)"
              class="w-10 h-10 bg-red-500/50 hover:bg-red-500 rounded-xl border-2 border-white/40 text-white font-barlow font-semibold text-xs transition-all flex items-center justify-center"
              title="Hapus"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Timer Actions Modal -->
  <div
    v-if="showTimerActionsModal && selectedTimer"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50"
    @click="closeTimerActions"
  >
    <div
      class="bg-[#F5A623] rounded-t-3xl p-5 w-full max-w-[400px] border-t-4 border-white/40 shadow-2xl relative"
      @click.stop
    >
      <!-- Drag Handle -->
      <div class="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>

      <!-- Timer Info Header -->
      <div class="text-center mb-4">
        <div class="w-14 h-14 mx-auto mb-2 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/40">
          <span class="text-3xl">{{ selectedTimer.isFinished ? '✅' : (selectedTimer.isPaused ? '⏸️' : '⏳') }}</span>
        </div>
        <h2 class="font-rajdhani font-bold text-2xl text-white leading-none tracking-wide italic mb-1">{{ selectedTimer.name }}</h2>
        <p class="text-white/80 text-base font-barlow">
          {{ formatTimerDisplay(selectedTimer.remainingTime) }} / {{ formatTimerDisplay(selectedTimer.totalTime) }}
        </p>
        <p class="text-white/60 text-xs font-barlow mt-1">
          {{ getProgress(selectedTimer).toFixed(0) }}% selesai
        </p>
      </div>

      <!-- Payment Calculator -->
      <div class="bg-white/10 rounded-2xl p-4 mb-4 border-2 border-white/30">
        <h3 class="font-rajdhani font-bold text-lg text-white text-center mb-3">💰 Hitung Pembayaran</h3>

        <div class="mb-3">
          <label class="block text-white/90 mb-2 text-xs font-barlow font-medium">Jumlah Bayar (Rp)</label>
          <input
            v-model.number="paymentAmount"
            @focus="onPaymentAmountFocus"
            type="number"
            min="0"
            placeholder="Contoh: 10000"
            class="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-xl border-2 border-white/40 focus:border-white focus:outline-none font-barlow text-lg text-center tabular-nums"
          >
          <p v-if="paymentAmount > 0" class="text-white/60 text-xs font-barlow text-center mt-1">
            Rp {{ formatCurrency(paymentAmount) }}
          </p>
        </div>

        <div class="bg-black/20 rounded-xl p-3 text-center">
          <p class="text-white/60 text-xs font-barlow mb-1">Durasi:</p>
          <p class="font-rajdhani font-bold text-2xl text-white tabular-nums">
            {{ paymentTime.display }}
          </p>
          <p class="text-white/50 text-[10px] font-barlow mt-1">
            3 jam pertama: Rp 10.000 (diskon), selanjutnya: Rp 4.000/jam
          </p>
        </div>
      </div>

      <!-- Action Buttons Grid -->
      <div class="grid grid-cols-2 gap-2">
        <!-- Pause/Resume Button -->
        <button
          v-if="!selectedTimer.isFinished"
          @click="togglePause(selectedTimer.id); closeTimerActions()"
          :class="[
            'py-3 rounded-xl border-2 border-white/40 text-white font-bold font-barlow text-sm transition-all flex items-center justify-center gap-2',
            selectedTimer.isPaused
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-yellow-500 hover:bg-yellow-600'
          ]"
        >
          <span class="text-xl">{{ selectedTimer.isPaused ? '▶️' : '⏸️' }}</span>
          {{ selectedTimer.isPaused ? 'Lanjutkan' : 'Jeda' }}
        </button>

        <!-- Save as Preset Button -->
        <button
          @click="saveTimerAsPreset(selectedTimer); closeTimerActions()"
          class="py-3 bg-purple-500 hover:bg-purple-600 rounded-xl border-2 border-white/40 text-white font-bold font-barlow text-sm transition-all flex items-center justify-center gap-2"
        >
          <span class="text-xl">💾</span>
          Simpan Preset
        </button>

        <!-- Delete Button -->
        <button
          @click="deleteTimer(selectedTimer.id); closeTimerActions()"
          class="py-3 bg-red-500 hover:bg-red-600 rounded-xl border-2 border-white/40 text-white font-bold font-barlow text-sm transition-all flex items-center justify-center gap-2 col-span-2"
        >
          <span class="text-xl">🗑️</span>
          Hapus Timer
        </button>
      </div>

      <!-- Close Button -->
      <button
        @click="closeTimerActions"
        class="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 rounded-xl border-2 border-white/30 text-white font-bold font-barlow text-sm transition-all"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Auth State
const isLoggedIn = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})
const loginError = ref('')
const isLoggingIn = ref(false)

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '12345'

// Modal States
const showAddTimerModal = ref(false)
const showPresetsModal = ref(false)
const showTimerActionsModal = ref(false)
const selectedTimer = ref(null)
const paymentAmount = ref(0)
const isPaymentAmountFocused = ref(false)

// Add Timer Payment
const addTimerPayment = ref(0)
const isPaymentInputFocused = ref(false)
const isTimeInputFocused = ref(false)

function onPaymentInputFocus() {
  if (!isPaymentInputFocused.value && addTimerPayment.value > 0) {
    addTimerPayment.value = 0
    newTimer.value.hours = 1
    newTimer.value.minutes = 0
  }
  isPaymentInputFocused.value = true
}

function onTimeInputFocus() {
  if (!isTimeInputFocused.value) {
    if (addTimerPayment.value > 0) {
      addTimerPayment.value = 0
    }
  }
  isTimeInputFocused.value = true
}

function onPaymentAmountFocus() {
  if (!isPaymentAmountFocused.value && paymentAmount.value > 0) {
    paymentAmount.value = 0
  }
  isPaymentAmountFocused.value = true
}

// Payment calculation
const paymentTime = computed(() => {
  const amount = paymentAmount.value || 0
  const basePrice = 10000 // 3 jam pertama (diskon)
  const hourlyRate = 4000 // per jam (normal)

  if (amount <= 0) {
    return { hours: 0, minutes: 0, display: '0j 0m' }
  }

  if (amount <= basePrice) {
    // 3 jam pertama (diskon)
    return { hours: 3, minutes: 0, display: '3j 0m' }
  }

  // Lebih dari 3 jam, hitungan normal
  const remainingAmount = amount - basePrice
  const additionalHours = Math.floor(remainingAmount / hourlyRate)
  const additionalMinutes = Math.round((remainingAmount % hourlyRate) / hourlyRate * 60)

  const totalHours = 3 + additionalHours
  const totalMinutes = additionalMinutes

  return {
    hours: totalHours,
    minutes: totalMinutes,
    display: `${totalHours}j ${totalMinutes}m`
  }
})

// Add Timer Payment calculation
const addTimerPaymentTime = computed(() => {
  const amount = addTimerPayment.value || 0
  const basePrice = 10000 // 3 jam pertama (diskon)
  const hourlyRate = 4000 // per jam (normal)

  if (amount <= 0) {
    return { hours: 0, minutes: 0, display: '0j 0m' }
  }

  if (amount <= basePrice) {
    // 3 jam pertama (diskon)
    return { hours: 3, minutes: 0, display: '3j 0m' }
  }

  // Lebih dari 3 jam, hitungan normal
  const remainingAmount = amount - basePrice
  const additionalHours = Math.floor(remainingAmount / hourlyRate)
  const additionalMinutes = Math.round((remainingAmount % hourlyRate) / hourlyRate * 60)

  const totalHours = 3 + additionalHours
  const totalMinutes = additionalMinutes

  return {
    hours: totalHours,
    minutes: totalMinutes,
    display: `${totalHours}j ${totalMinutes}m`
  }
})

// Watch add timer payment to update hours/minutes
function onAddTimerPaymentChange() {
  if (addTimerPaymentTime.value.hours > 0) {
    newTimer.value.hours = addTimerPaymentTime.value.hours
    newTimer.value.minutes = addTimerPaymentTime.value.minutes
  }
}

// Timer State
const newTimer = ref({
  name: '',
  hours: 1,
  minutes: 0,
  presetId: null
})

const activeTimers = ref([])
const savedPresets = ref([])
let timerInterval = null

// Computed
const hasFinishedTimers = computed(() => {
  return activeTimers.value.some(t => t.isFinished)
})

const finishedTimersCount = computed(() => {
  return activeTimers.value.filter(t => t.isFinished).length
})

// Functions
function login() {
  loginError.value = ''
  isLoggingIn.value = true

  setTimeout(() => {
    if (loginForm.value.username === ADMIN_USERNAME && loginForm.value.password === ADMIN_PASSWORD) {
      localStorage.setItem('ps-timer-auth', JSON.stringify({
        isLoggedIn: true,
        username: loginForm.value.username,
        loginTime: new Date().toISOString()
      }))

      isLoggedIn.value = true
      loginForm.value.username = ''
      loginForm.value.password = ''

      loadTimersFromStorage()
    } else {
      loginError.value = '❌ Username atau password salah!'
    }
    isLoggingIn.value = false
  }, 500)
}

function logout() {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    saveTimersToStorage()
    localStorage.removeItem('ps-timer-auth')
    isLoggedIn.value = false
    activeTimers.value = []
  }
}

function checkAuth() {
  const authData = localStorage.getItem('ps-timer-auth')
  if (authData) {
    try {
      const parsed = JSON.parse(authData)
      if (parsed.isLoggedIn) {
        isLoggedIn.value = true
      }
    } catch (e) {
      localStorage.removeItem('ps-timer-auth')
    }
  }
}

function saveTimersToStorage() {
  const data = {
    timers: activeTimers.value,
    lastSaved: new Date().toISOString()
  }
  localStorage.setItem('ps-timer-active', JSON.stringify(data))
}

function loadTimersFromStorage() {
  const savedTimersData = localStorage.getItem('ps-timer-active')
  if (savedTimersData) {
    try {
      const parsed = JSON.parse(savedTimersData)
      if (parsed.timers && parsed.timers.length > 0) {
        const lastSaved = new Date(parsed.lastSaved)
        const now = new Date()
        const timeDiff = Math.floor((now - lastSaved) / 1000)

        activeTimers.value = parsed.timers.map(timer => {
          if (!timer.isPaused && !timer.isFinished && timer.remainingTime > 0) {
            const newRemainingTime = timer.remainingTime - timeDiff
            return {
              ...timer,
              remainingTime: newRemainingTime > 0 ? newRemainingTime : 0,
              isFinished: newRemainingTime <= 0
            }
          }
          return timer
        })

        activeTimers.value.forEach(timer => {
          if (timer.isFinished && !timer.wasNotified) {
            playAlarm()
            timer.wasNotified = true
          }
        })
      }
    } catch (e) {
      console.error('Error loading timers:', e)
      localStorage.removeItem('ps-timer-active')
    }
  }
}

onMounted(() => {
  checkAuth()

  const savedPresetsData = localStorage.getItem('ps-timer-presets')
  if (savedPresetsData) {
    savedPresets.value = JSON.parse(savedPresetsData)
  }

  if (isLoggedIn.value) {
    loadTimersFromStorage()
  }

  timerInterval = setInterval(updateTimers, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

function addTimerFromModal() {
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
      savePresetsToStorage()
    }
  }

  saveTimersToStorage()

  newTimer.value.name = ''
  newTimer.value.hours = 1
  newTimer.value.minutes = 0
  newTimer.value.presetId = null
  addTimerPayment.value = 0
  isPaymentInputFocused.value = false
  isTimeInputFocused.value = false
  showAddTimerModal.value = false
}

function updateTimers() {
  let hasChanges = false

  activeTimers.value.forEach(timer => {
    if (!timer.isPaused && !timer.isFinished && timer.remainingTime > 0) {
      timer.remainingTime--

      if (timer.remainingTime === 0) {
        timer.isFinished = true
        playAlarm()
      }
      hasChanges = true
    }
  })

  if (hasChanges) {
    saveTimersToStorage()
  }
}

function togglePause(timerId) {
  const timer = activeTimers.value.find(t => t.id === timerId)
  if (timer) {
    timer.isPaused = !timer.isPaused
    saveTimersToStorage()
  }
}

function openTimerActions(timer) {
  selectedTimer.value = timer
  paymentAmount.value = 0
  isPaymentAmountFocused.value = false
  showTimerActionsModal.value = true
}

function closeTimerActions() {
  selectedTimer.value = null
  paymentAmount.value = 0
  isPaymentAmountFocused.value = false
  showTimerActionsModal.value = false
}

function openAddTimerModal() {
  newTimer.value.name = ''
  newTimer.value.hours = 1
  newTimer.value.minutes = 0
  newTimer.value.presetId = null
  addTimerPayment.value = 0
  isPaymentInputFocused.value = false
  isTimeInputFocused.value = false
  showAddTimerModal.value = true
}

function deleteTimer(timerId) {
  const index = activeTimers.value.findIndex(t => t.id === timerId)
  if (index !== -1) {
    if (confirm('Hapus timer ini?')) {
      activeTimers.value.splice(index, 1)
      saveTimersToStorage()
    }
  }
}

function clearFinishedTimers() {
  const finishedCount = finishedTimersCount.value
  if (confirm(`Hapus ${finishedCount} timer yang sudah selesai?`)) {
    activeTimers.value = activeTimers.value.filter(t => !t.isFinished)
    saveTimersToStorage()
  }
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
    savePresetsToStorage()

    const timerIndex = activeTimers.value.findIndex(t => t.id === timer.id)
    if (timerIndex !== -1) {
      activeTimers.value.splice(timerIndex, 1)
      saveTimersToStorage()
    }
  }
}

function deletePreset(presetId) {
  const index = savedPresets.value.findIndex(p => p.id === presetId)
  if (index !== -1) {
    savedPresets.value.splice(index, 1)
    savePresetsToStorage()
  }
}

function continuePreset(preset) {
  const totalSeconds = (preset.hours * 3600) + (preset.minutes * 60)

  if (totalSeconds === 0) {
    return
  }

  const timer = {
    id: Date.now(),
    name: preset.name,
    totalTime: totalSeconds,
    remainingTime: totalSeconds,
    isPaused: false,
    isFinished: false,
    createdAt: new Date().toISOString()
  }

  activeTimers.value.push(timer)

  const presetIndex = savedPresets.value.findIndex(p => p.id === preset.id)
  if (presetIndex !== -1) {
    savedPresets.value.splice(presetIndex, 1)
    savePresetsToStorage()
  }

  saveTimersToStorage()
  showPresetsModal.value = false
}

function usePresetInModal(preset) {
  newTimer.value.hours = preset.hours
  newTimer.value.minutes = preset.minutes
  newTimer.value.name = preset.name
  newTimer.value.presetId = preset.id
  addTimerPayment.value = 0
  isPaymentInputFocused.value = false
  isTimeInputFocused.value = false
}

function usePreset(preset) {
  newTimer.value.hours = preset.hours
  newTimer.value.minutes = preset.minutes
  newTimer.value.name = preset.name
  newTimer.value.presetId = preset.id
  addTimerPayment.value = 0
  isPaymentInputFocused.value = false
  isTimeInputFocused.value = false
  showPresetsModal.value = false
  showAddTimerModal.value = true
}

function savePresetsToStorage() {
  localStorage.setItem('ps-timer-presets', JSON.stringify(savedPresets.value))
}

function formatTimerDisplay(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function formatTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function getProgress(timer) {
  return ((timer.totalTime - timer.remainingTime) / timer.totalTime) * 100
}

function getProgressColor(timer) {
  const progress = getProgress(timer)
  if (progress < 33) {
    return 'bg-green-500'
  } else if (progress < 66) {
    return 'bg-yellow-500'
  } else if (progress < 90) {
    return 'bg-orange-500'
  } else {
    return 'bg-red-500'
  }
}

function playAlarm() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    setTimeout(() => {
      const osc2 = audioContext.createOscillator()
      const gain2 = audioContext.createGain()
      osc2.connect(gain2)
      gain2.connect(audioContext.destination)
      osc2.frequency.value = 800
      osc2.type = 'sine'
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      osc2.start(audioContext.currentTime)
      osc2.stop(audioContext.currentTime + 0.5)
    }, 600)

    setTimeout(() => {
      const osc3 = audioContext.createOscillator()
      const gain3 = audioContext.createGain()
      osc3.connect(gain3)
      gain3.connect(audioContext.destination)
      osc3.frequency.value = 800
      osc3.type = 'sine'
      gain3.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      osc3.start(audioContext.currentTime)
      osc3.stop(audioContext.currentTime + 0.5)
    }, 1200)
  } catch (error) {
    console.log('Audio tidak didukung')
  }
}

function formatCurrency(amount) {
  if (!amount || amount === 0) return '0'
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>

<style>
.text-glow {
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

.card-glow {
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.card-glow:hover {
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
}
</style>
