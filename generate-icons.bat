@echo off
echo ============================================
echo Timer PS - Icon Generator
echo ============================================
echo.

REM Check if cordova-res is installed
bunx cordova-res --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Installing cordova-res...
  bun add -d cordova-res
)

echo.
echo Generating icons and splash screens...
echo.

REM Generate icons
bunx cordova-res resources --skip-config --copy

echo.
echo ============================================
echo Icons Generated!
echo ============================================
echo.
echo Icons and splash screens have been generated
echo and synced to the android project.
echo.
echo Now run: build-apk.bat
echo.
pause
