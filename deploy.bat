@echo off
echo ============================================
echo Timer PS - Deploy Package Builder
echo ============================================
echo.

REM Check if build exists
if not exist ".output" (
  echo [1/3] Building application...
  call bun run build
) else (
  echo [1/3] Build already exists, skipping...
)

echo.
echo [2/3] Creating deploy package...

REM Delete old zip if exists
if exist "timer-ps-deploy.zip" del "timer-ps-deploy.zip"

REM Create zip with production files
powershell -Command "& { $files = @('.output', 'server', 'package.json', 'bun.lock', 'nuxt.config.ts', '.env.example'); Compress-Archive -Path $files -DestinationPath 'timer-ps-deploy.zip' -Force; }"

echo.
echo [3/3] Package created: timer-ps-deploy.zip
echo.
echo ============================================
echo FILES INCLUDED IN PACKAGE:
echo ============================================
echo   - .output/          (Build output)
echo   - server/           (API routes)
echo   - package.json      (Dependencies)
echo   - bun.lock          (Lock file)
echo   - nuxt.config.ts    (Config)
echo   - .env.example      (Env template)
echo.
echo ============================================
echo EXCLUDED (not needed):
echo ============================================
echo   - node_modules/
echo   - app/              (Already in .output)
echo   - .git/
echo   - database/         (Run SQL manually)
echo.
echo ============================================
echo NEXT STEPS:
echo ============================================
echo 1. Upload timer-ps-deploy.zip to cPanel
echo 2. Extract in Node.js app directory
echo 3. Run: bun install
echo 4. Copy .env.example to .env and edit
echo 5. Import database/schema.sql to MySQL
echo 6. Start app: bun run start
echo.
echo Package size:
powershell -Command "Get-Item timer-ps-deploy.zip | Select-Object Name, @{Name='Size(MB)';Expression={'{0:N2}' -f ($_.Length / 1MB)}}"

echo.
pause
