@echo off
echo ============================================
echo Timer PS - Static Deploy Package Builder
echo ============================================
echo.

REM Check if build exists
if not exist ".output\public" (
  echo [1/3] Generating static site...
  call bun run generate
) else (
  echo [1/3] Build already exists, skipping...
)

echo.
echo [2/3] Creating deploy package...

REM Delete old zip if exists
if exist "timer-ps-static.zip" del "timer-ps-static.zip"

REM Create zip with public files
powershell -Command "& { Compress-Archive -Path '.output\public\*' -DestinationPath 'timer-ps-static.zip' -Force; }"

echo.
echo [3/3] Package created: timer-ps-static.zip
echo.
echo ============================================
echo DEPLOY TO CPANEL:
echo ============================================
echo.
echo 1. Open cPanel File Manager
echo 2. Go to public_html or your subdomain folder
echo 3. Upload timer-ps-static.zip
echo 4. Extract the zip file
echo 5. Done! Open your website
echo.
echo ============================================
echo NOTE: Static version uses localStorage
echo - Data saved in browser only
echo - No MySQL database needed
echo - No server-side API
echo ============================================
echo.
echo Package size:
powershell -Command "Get-Item timer-ps-static.zip | Select-Object Name, @{Name='Size(MB)';Expression={'{0:N2}' -f ($_.Length / 1MB)}}"

echo.
pause
