@echo off
echo Generating bcrypt hash for password: 12345
echo.
bun run scripts\generate-hash.js
echo.
pause
