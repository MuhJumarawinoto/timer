# Integrasi Alarm System ke Website

## Cara 1: Copy File (Termudah)

### 1. Copy file ke website

Copy `alarm-system.ts` ke project website Anda:
```
src/
├── utils/
│   └── alarm-system.ts
```

### 2. Import di Component

```vue
<script setup>
import { useTimerAlarm } from '@/utils/alarm'

const alarm = useTimerAlarm()

// Init saat ada interaksi user (wajib untuk AudioContext)
onMounted(() => {
  document.addEventListener('click', () => {
    alarm.init()
  }, { once: true })
})

// Panggil saat timer selesai
function timerSelesai() {
  alarm.start(300) // Alarm selama 5 menit
}

// Stop alarm
function stopAlarm() {
  alarm.stop()
}
</script>
```

---

## Cara 2: Copy-Paste Code Langsung

Jika mau langsung di file Vue:

```vue
<script setup>
import { ref } from 'vue'

const audioContext = ref(null)
const isAlarmPlaying = ref(false)
let alarmInterval = null

// Init audio context (perlu user interaction)
function initAudio() {
  if ('AudioContext' in window) {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  }
}

// Play beep
function playBeep(freq = 800, duration = 0.2) {
  if (!audioContext.value) return
  
  const osc = audioContext.value.createOscillator()
  const gain = audioContext.value.createGain()
  
  osc.connect(gain)
  gain.connect(audioContext.value.destination)
  
  osc.frequency.value = freq
  osc.type = 'square'
  
  gain.gain.setValueAtTime(0.5, audioContext.value.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.value.currentTime + duration)
  
  osc.start()
  osc.stop(audioContext.value.currentTime + duration)
}

// Start alarm
function startAlarm(duration = 300) {
  if (isAlarmPlaying.value) return
  
  isAlarmPlaying.value = true
  let count = 0
  
  // Vibrate
  if ('vibrate' in navigator) {
    navigator.vibrate([500, 500])
  }
  
  // First beep
  playBeep(1000, 0.3)
  
  // Loop beep
  const loop = () => {
    if (!isAlarmPlaying.value) return
    
    count += 600
    if (count >= duration * 1000) {
      stopAlarm()
      return
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate([500, 500])
    }
    
    playBeep(1000, 0.3)
    alarmInterval = setTimeout(loop, 600)
  }
  
  alarmInterval = setTimeout(loop, 600)
}

// Stop alarm
function stopAlarm() {
  isAlarmPlaying.value = false
  if (alarmInterval) {
    clearTimeout(alarmInterval)
    alarmInterval = null
  }
  if ('vibrate' in navigator) {
    navigator.vibrate(0)
  }
}

// Init on first click
onMounted(() => {
  document.addEventListener('click', initAudio, { once: true })
})
</script>
```

---

## Fitur Alarm

| Method | Deskripsi |
|---------|-----------|
| `init()` | Inisialisasi AudioContext (wajib setelah user klik) |
| `start(300)` | Mulai alarm selama 300 detik (5 menit) |
| `stop()` | Stop alarm |
| `isActive()` | Cek apakah alarm sedang jalan |
| `notify()` | Bunyi notifikasi pendek |
| `success()` | Bunyi success (ting-ting) |
| `error()` | Bunyi error |

---

## Demo

Buka file ini di browser untuk test alarm:
```bash
# Serve folder ini
bun run dev
```

Lalu buka browser console:
```javascript
// Test alarm
import { timerAlarm } from './alarm-system'

timerAlarm.init()
timerAlarm.start(10) // Alarm 10 detik untuk test
```

---

## Note Penting

1. **AudioContext harus di-init setelah user interaction** (klik/tap)
2. **Vibrate hanya works di Android**
3. **iOS punya batasan audio - butuh user interaction dulu**
