@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Install Node.js and ensure npm is on your PATH.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

call npm run dev
if errorlevel 1 (
  echo npm run dev failed or was interrupted with an error.
  pause
  exit /b 1
)

endlocal
