<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-900 via-orange-950 to-zinc-900 flex items-center justify-center px-4">
    <div class="relative w-full max-w-md bg-gradient-to-b from-[#F5A623] to-[#E0941A] rounded-4xl p-8 shadow-2xl border border-white/30 overflow-hidden">
      <!-- Background Watermark -->
      <div class="absolute top-4 right-[-30px] w-[200px] opacity-[0.18] pointer-events-none z-0">
        <img src="/logo.jpg" alt="Timer PS" class="w-full h-full object-contain" />
      </div>

      <div class="relative z-10">
        <!-- Logo -->
        <div class="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden">
          <img src="/logo.jpg" alt="Timer PS" class="w-full h-full object-cover" />
        </div>

        <!-- Title -->
        <h1 class="font-rajdhani font-bold text-[42px] text-white text-center leading-none tracking-wide italic mb-2 text-glow">Timer PS</h1>
        <p class="text-white/85 text-base text-center mb-8">Rental PlayStation Timer</p>

        <!-- Info -->
        <div class="bg-white/10 border-2 border-white/30 rounded-2xl p-5 text-center space-y-4">
          <p class="text-white font-barlow text-sm">
            ✅ Versi Static - Tanpa Login
          </p>
          <p class="text-white/70 text-xs font-barlow">
            Data disimpan di browser (localStorage)
          </p>

          <NuxtLink
            to="/"
            class="inline-block w-full px-6 py-4 bg-white text-[#F5A623] font-bold rounded-2xl hover:bg-white/90 transition-all duration-200 shadow-xl font-rajdhani text-xl flex items-center justify-center gap-2"
          >
            <Icon name="ph:house-duo" size="24" />
            <span>Mulai Sekarang</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auto redirect to home after 2 seconds
onMounted(() => {
  setTimeout(() => {
    navigateTo('/')
  }, 2000)
})
</script>

<style scoped>
.text-glow {
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}
</style>
