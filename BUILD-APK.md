# Build APK Timer PS

## Status

Project sudah siap untuk build APK. Namun, build memerlukan **Java 17+** (Anda punya Java 11).

## Opsi Build

### Opsi 1: Install Java 17/21 (Rekomendasi)

1. Download JDK 17 dari: https://adoptium.net/
2. Install dan set JAVA_HOME
3. Jalankan: `build-apk.bat`

### Opsi 2: Android Studio

1. Buka Android Studio
2. Open project: folder `android`
3. Wait untuk Gradle sync
4. Build → Build Bundle(s) / APK(s) → Build APK(s)
5. APK ada di: `android/app/build/outputs/apk/debug/`

### Opsi 3: Online Build (GitHub Actions)

Push ke GitHub dan enable GitHub Actions untuk auto-build APK.

---

## File yang Sudah Dibuat

| File | Fungsi |
|------|--------|
| `capacitor.config.json` | Config Capacitor |
| `build-apk.bat` | Script build APK (Debug) |
| `build-apk-release.bat` | Script build APK (Release) |
| `generate-icons.bat` | Generate icons |
| `android/` | Project Android |

---

## Build Manual (Jika sudah punya Java 17+)

```bash
# 1. Build static
bun run generate

# 2. Sync ke Android
bunx cap sync android

# 3. Build APK
cd android
./gradlew.bat assembleDebug

# 4. Copy APK
copy android\app\build\outputs\apk\debug\app-debug.apk timer-ps.apk
```

---

## Install APK ke Android

1. Copy `timer-ps.apk` ke HP
2. Enable "Install from unknown sources"
3. Buka APK untuk install

---

## Fitur Aplikasi

- ✅ Timer dengan localStorage
- ✅ Simpan timer
- ✅ Riwayat & Pendapatan
- ✅ Fullscreen WebView
- ✅ Splash Screen
- ✅ Icon Custom (perlu generate)

---

## Next Steps

1. Install Java 17/21 atau gunakan Android Studio
2. Generate icons dengan `generate-icons.bat`
3. Build APK
4. Install ke HP untuk test
