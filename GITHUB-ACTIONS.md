# Build APK dengan GitHub Actions

## Cara Cepat Build APK (Tanpa Install Android Studio)

### Langkah 1: Push ke GitHub

```bash
# Init git jika belum
git init

# Add semua file
git add .

# Commit
git commit -m "Add Timer PS app"

# Push ke GitHub
git branch -M main
git remote add origin https://github.com/USERNAME/timer-ps.git
git push -u origin main
```

### Langkah 2: Download APK

1. Buka repo GitHub Anda
2. Klik **Actions** tab
3. Pilih workflow "Build Android APK"
4. Scroll ke bawah → **Artifacts**
5. Download `timer-ps-debug-apk`

---

## Trigger Build

Build otomatis jalan saat:
- Push ke branch `main` / `master`
- Pull request
- Klik "Run workflow" manual

---

## Build akan menghasilkan:

| Artifact | Isi |
|----------|-----|
| `timer-ps-debug-apk` | Debug APK (signed dengan debug key) |
| `timer-ps-release-apk` | Release APK (hanya di main/master) |

---

## Waktu Build

± 5-10 menit untuk pertama kali
± 3-5 menit untuk build selanjutnya

---

## Install APK

1. Download artifact dari GitHub Actions
2. Extract zip
3. Copy `app-debug.apk` ke HP
4. Install

---

## File yang Ditambahkan

```
.github/
└── workflows/
    └── build-apk.yml    # Config auto-build
```

---

## Need Help?

- GitHub Actions docs: https://docs.github.com/actions
- Capacitor docs: https://capacitorjs.com
