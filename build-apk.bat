@echo off
echo ============================================
echo Timer PS - APK Builder
echo ============================================
echo.

REM Step 1: Build static site
echo [1/5] Building static site...
call bun run generate
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Build failed!
  pause
  exit /b 1
)

REM Step 2: Sync to Capacitor
echo.
echo [2/5] Syncing files to Android...
call bunx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Sync failed!
  pause
  exit /b 1
)

REM Step 3: Build APK
echo.
echo [3/5] Building APK (Debug)...
cd android
call gradlew assembleDebug
cd ..

if %ERRORLEVEL% NEQ 0 (
  echo ERROR: APK build failed!
  echo.
  echo Make sure you have:
  echo   - Java JDK 17+ installed
  echo   - ANDROID_SDK environment variable set
  echo   - Accepted Android SDK licenses
  pause
  exit /b 1
)

REM Step 4: Copy APK to root
echo.
echo [4/5] Copying APK...
copy android\app\build\outputs\apk\debug\app-debug.apk timer-ps-debug.apk

REM Step 5: Done
echo.
echo [5/5] APK Build Complete!
echo.
echo ============================================
echo APK Location: timer-ps-debug.apk
echo ============================================
echo.
echo Install to Android:
echo   1. Copy timer-ps-debug.apk to your phone
echo   2. Enable "Install from unknown sources"
echo   3. Open the APK file to install
echo.
echo For release APK, run: build-apk-release.bat
echo.
pause
