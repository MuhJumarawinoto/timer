# Setup Bunyi Alarm - Timer PS APK

## Lokasi File Audio

Android resource folder:
```
android/app/src/main/res/raw/
```

## File yang Diperlukan

Tambahkan file audio di folder `raw/`:

| File | Deskripsi | Format |
|------|-----------|--------|
| `beep.wav` | Bunyi beep pendek | WAV/MP3 |
| `alarm.wav` | Bunyi alarm panjang | WAV/MP3 |
| `beep.mp3` | Alternatif format | MP3 |

## Cara Menambahkan File Audio

### 1. Cari/Download Bunyi

- **Beep pendek:** 0.3 detik
- **Alarm:** 1-2 detik

### 2. Copy ke Folder

Copy file audio ke:
```
c:\Users\Bahlil\Downloads\Documents\timer-ps\android\app\src\main\res\raw\
```

### 3. Update Config

Di `capacitor.config.json`, sound sudah di-set ke `beep.wav`:
```json
"LocalNotifications": {
  "sound": "beep.wav"
}
```

---

## Cara Menggunakan di Website

Di `https://waktu-rental.velotek.co.id/`, tambahkan:

```javascript
// Import Capacitor plugin
import { LocalNotifications } from '@capacitor/local-notifications';

// Schedule notifikasi dengan bunyi
async function scheduleAlarm() {
  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: 'Timer PS',
        body: 'Waktu habis!',
        schedule: { at: new Date(Date.now() + 1000) },
        sound: 'beep.wav',
        smallIcon: 'ic_stat_icon_config_sample',
        iconColor: '#F5A623'
      }
    ]
  });
}
```

---

## Alternatif: Web Audio API (Tanpa File)

Kalau tidak mau pakai file audio, gunakan Web Audio API di website:

```javascript
function playAlarm() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  function beep() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.value = 800;
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }
  
  beep(); setTimeout(beep, 300); setTimeout(beep, 600);
}

// Panggil saat timer selesai
playAlarm();
```

---

## Rekomendasi

Gunakan **Web Audio API** (Opsi 2) karena:
- Tidak perlu file audio eksternal
- Bisa dikustomisasi frekuensi & pattern
- Lebih ringan (tanpa tambahan file size)
- Works di semua browser

File `beep.wav` di config Capacitor hanya untuk notifikasi sistem Android.
