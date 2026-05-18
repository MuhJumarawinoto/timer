# Deploy Timer PS (Static) ke cPanel

## Versi Ini

**Static Only** - Tanpa MySQL, data disimpan di browser (localStorage).

## Langkah Deploy

### 1. Build Package

Jalankan di local:
```bash
# Double-click: deploy-static.bat
# Atau:
bun run generate
```

File `timer-ps-static.zip` akan dibuat.

### 2. Upload ke cPanel

1. Buka **File Manager** di cPanel
2. Masuk ke folder:
   - `public_html` untuk domain utama
   - `subdomain.example.com` untuk subdomain
3. Upload `timer-ps-static.zip`
4. Extract file zip
5. Selesai!

### 3. Akses Website

Buka domain/subdomain Anda:
- https://yourdomain.com
- https://timer.yourdomain.com

## Fitur Static

| Fitur | Status |
|-------|--------|
| Timer | ✅ Ya |
| Simpan Timer | ✅ Ya (localStorage) |
| Riwayat | ✅ Ya (localStorage) |
| Pendapatan | ✅ Ya (localStorage) |
| Login | ⚠️ Tidak perlu (tanpa auth) |
| MySQL | ❌ Tidak ada |
| Multi-device | ❌ Tidak sinkron |

## Perbedaan Static vs Full

| Static | Full (MySQL) |
|--------|--------------|
| LocalStorage | MySQL Database |
| 1 device saja | Multi-device sync |
| Tanpa login | Dengan login |
| Deploy ke hosting biasa | Butuh Node.js hosting |

## Troubleshooting

### Timer tidak jalan?
- Pastikan JavaScript enabled di browser
- Clear browser cache

### Data hilang?
- Data tersimpan di browser
- Jika clear cache/browser, data hilang
- Backup data secara manual

### Mau kembali ke versi Full?
- Restore dari git: `git checkout HEAD -- server/`
- Build ulang dengan `bun run build`

---

**Catatan:** Untuk fitur lengkap dengan MySQL, gunakan VPS atau Node.js hosting.
