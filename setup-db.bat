@echo off
echo ============================================
echo Timer PS - Database Setup
echo ============================================
echo.
echo Menjalankan setup database MySQL...
echo.

mysql -u root -p9090 < database\setup.sql

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ============================================
  echo SUCCESS! Database setup selesai.
  echo ============================================
  echo.
  echo Default login:
  echo   Username: admin
  echo   Password: 12345
  echo.
) else (
  echo.
  echo ============================================
  echo ERROR! Gagal setup database.
  echo ============================================
  echo.
  echo Pastikan:
  echo   1. MySQL sudah berjalan
  echo   2. Password root sudah benar (9090)
  echo   3. Port 3306 tersedia
  echo.
)

pause
