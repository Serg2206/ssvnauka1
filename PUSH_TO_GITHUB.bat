
@echo off
REM 🚀 Скрипт для автоматической синхронизации с GitHub (Windows)
REM Используется для проекта SSV Nauka

echo ==========================================
echo 🚀 GitHub Sync Script for SSV Nauka
echo ==========================================
echo.

REM Переход в директорию проекта (обновите путь при необходимости)
cd /d "%~dp0"

REM Проверка статуса
echo 📊 Checking current status...
git status

echo.
echo ==========================================
set /p continue="Continue with sync? (y/n): "

if /i "%continue%"=="y" (
    REM Добавление всех изменений
    echo 📦 Adding all changes...
    git add -A
    
    REM Запрос описания коммита
    echo.
    set /p commit_message="Enter commit message: "
    
    REM Если описание не указано, используем дефолтное
    if "%commit_message%"=="" (
        for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
        set commit_message=Update from %mydate%
    )
    
    REM Создание коммита
    echo.
    echo 💾 Creating commit...
    git commit -m "%commit_message%"
    
    REM Push в GitHub
    echo.
    echo 🚀 Pushing to GitHub...
    git push origin master
    
    REM Проверка результата
    if %errorlevel%==0 (
        echo.
        echo ==========================================
        echo ✅ Successfully synced with GitHub!
        echo ==========================================
        echo.
        echo 📊 Latest commits:
        git log -3 --oneline
    ) else (
        echo.
        echo ==========================================
        echo ❌ Failed to push to GitHub
        echo ==========================================
        echo.
        echo Please check your connection and credentials.
    )
) else (
    echo.
    echo ❌ Sync cancelled.
)

echo.
echo Done!
pause
