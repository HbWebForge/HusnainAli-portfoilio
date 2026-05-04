@echo off
REM Simple Python HTTP Server Starter for Portfolio
REM This allows external scripts (EmailJS) to load properly

echo.
echo ============================================
echo  Portfolio Local Server Startup
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Python found. Starting server...
    echo.
    echo Server running at: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    echo ✗ Python not found!
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
)
