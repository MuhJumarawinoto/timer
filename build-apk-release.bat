@echo off
echo ============================================
echo Timer PS - APK Builder (Release)
echo ============================================
echo.

REM Step 1: Build static site
echo [1/6] Building static site...
call bun run generate
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Build failed!
  pause
  exit /b 1
)

REM Step 2: Sync to Capacitor
echo.
echo [2/6] Syncing files to Android...
call bunx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Sync failed!
  pause
  exit /b 1
)

REM Step 3: Build APK (Release)
echo.
echo [3/6] Building APK (Release)...
cd android
call gradlew assembleRelease
cd ..

if %ERRORLEVEL% NEQ 0 (
  echo ERROR: APK build failed!
  echo.
  echo For release APK, you need:
  echo   - Signing keystore (create with: keytool -genkey)
  echo   - Update capacitor.config.json with keystore path
  echo   - Or use debug APK instead
  pause
  exit /b 1
)

REM Step 4: Copy APK to root
echo.
echo [4/6] Copying APK...
copy android\app\build\outputs\apk\release\app-release.apk timer-ps-release.apk

REM Step 5: Done
echo.
echo [5/6] APK Build Complete!
echo.
echo ============================================
echo APK Location: timer-ps-release.apk
echo ============================================
echo.

REM Step 6: Show info
echo [6/6] Build Info:
powershell -Command "Get-Item timer-ps-release.apk | Select-Object Name, @{Name='Size(MB)';Expression={'{0:N2}' -f ($_.Length / 1MB)}}"

echo.
echo Install to Android:
echo   1. Copy timer-ps-release.apk to your phone
echo   2. Enable "Install from unknown sources"
echo   3. Open the APK file to install
echo.
pause
