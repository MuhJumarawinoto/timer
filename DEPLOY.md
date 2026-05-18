# Deploy Timer PS ke cPanel

## Persiapan di Local

### 1. Build & Package
```bash
# Double-click: deploy.bat
# Atau manual:
bun run build
```

File `timer-ps-deploy.zip` akan dibuat.

---

## Persiapan di cPanel

### 2. Buat Database MySQL

1. Buka **MySQL® Database Wizard**
2. Buat database baru:
   - Database name: `timer_ps`
3. Buat user baru:
   - Username: `timer_ps_user`
   - Password: (buat password kuat)
4. Grant user ke database
5. **CATAT** informasi ini:
   ```
   Host: localhost
   Port: 3306
   Database: cpaneluser_timer_ps
   User: cpaneluser_timer_psuser
   Password: ********
   ```

### 3. Import Database Schema

1. Buka **phpMyAdmin**
2. Pilih database `timer_ps`
3. Klik **Import**
4. Pilih file: `database/schema.sql`
5. Klik **Go**

### 4. Setup Node.js App

1. Buka **Setup Node.js App**
2. Klik **Create Application**
3. Isi:

   | Setting | Value |
   |---------|-------|
   | Node.js version | 20 (atau terbaru) |
   | Application mode | Production |
   | Application root | timer-ps |
   | Application URL | timer.ps.domainanda.com |
   | Application startup file | server/index.mjs |

4. Klik **Create**

### 5. Upload File

1. Buka **File Manager**
2. Masuk ke folder `timer-ps`
3. Upload `timer-ps-deploy.zip`
4. Extract file
5. Pastikan struktur:
   ```
   timer-ps/
   ├── .output/
   ├── server/
   ├── package.json
   ├── bun.lock
   ├── nuxt.config.ts
   └── .env
   ```

### 6. Install Dependencies

Di **SSH Terminal** atau cPanel Terminal:

```bash
cd ~/timer-ps
bun install
```

### 7. Setup Environment File

```bash
cp .production.env .env
nano .env
```

Update dengan informasi database dari langkah #2:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=cpaneluser_timer_psuser
DB_PASSWORD=password_anda
DB_NAME=cpaneluser_timer_ps
NUXT_PUBLIC_API_URL=/api
```

### 8. Restart Application

Di **Setup Node.js App**, klik **Restart**.

---

## Testing

Buka URL aplikasi Anda:
- https://timer.ps.domainanda.com

Login dengan default:
- Username: `admin`
- Password: `12345`

**GANTI password admin segera setelah login pertama!**

---

## Troubleshooting

### Error: Cannot connect to database
- Cek koneksi database di `.env`
- Pastikan user sudah di-grant ke database
- Cek host: biasanya `localhost`

### Error: 500 Internal Server Error
- Cek error logs: `~/timer-ps/output.log`
- Pastikan `bun install` sudah dijalankan
- Pastikan `.env` sudah di-setup dengan benar

### Error: Port already in use
- Di cPanel Node.js App, ganti port yang digunakan

---

## Update Aplikasi

Untuk update aplikasi dengan versi baru:

1. Build di local: `bun run build`
2. Upload file yang berubah ke cPanel
3. Restart aplikasi di cPanel

---

## Keamanan

- ✅ Ganti password default admin
- ✅ Gunakan password yang kuat untuk database
- ✅ Enable SSL/HTTPS
- ✅ Batasi akses database ke localhost saja
- ✅ Regular backup database

---

## Support

Jika ada masalah:
1. Cek logs: `~/timer-ps/output.log`
2. Cek error logs cPanel
3. Test koneksi database via phpMyAdmin
