
@echo off
chcp 65001 > nul
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║       🚀 SSV NAUKA - АВТОМАТИЧЕСКАЯ ЗАГРУЗКА НА GITHUB       ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Проверка наличия Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ОШИБКА: Git не установлен!
    echo.
    echo 📥 Скачайте Git: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo ✅ Git найден
echo.

REM Определение директории проекта
set "PROJECT_DIR=%~dp0nextjs_space"

if not exist "%PROJECT_DIR%" (
    echo ❌ ОШИБКА: Папка nextjs_space не найдена!
    echo 📁 Ожидаемый путь: %PROJECT_DIR%
    echo.
    pause
    exit /b 1
)

echo ✅ Проект найден: %PROJECT_DIR%
echo.

cd /d "%PROJECT_DIR%"

REM Проверка Git репозитория
if not exist ".git" (
    echo 🔧 Инициализация Git репозитория...
    git init
    git branch -M main
    echo ✅ Git репозиторий инициализирован
    echo.
) else (
    echo ✅ Git репозиторий уже существует
    echo.
)

REM Проверка remote
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔧 Добавление remote origin...
    git remote add origin https://github.com/Serg2206-/ssvnauka.git
    echo ✅ Remote добавлен
    echo.
) else (
    echo ✅ Remote уже настроен
    echo.
)

REM Показываем статус
echo 📊 Статус репозитория:
echo ════════════════════════════════════════════════════════════════
git status --short | findstr /R "." >nul
if %errorlevel% equ 0 (
    echo Есть изменения для коммита
) else (
    echo Нет изменений для коммита
)
echo ════════════════════════════════════════════════════════════════
echo.

REM Добавляем все файлы
echo 📦 Добавление файлов в Git...
git add -A
echo ✅ Файлы добавлены
echo.

REM Создаем коммит
echo 💾 Создание коммита...
git commit -m "SSV Nauka educational platform - Full version with interactive features" --allow-empty
if %errorlevel% equ 0 (
    echo ✅ Коммит создан
) else (
    echo ⚠️  Коммит не создан (возможно, нет изменений)
)
echo.

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                 🔐 ТРЕБУЮТСЯ УЧЕТНЫЕ ДАННЫЕ                  ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo 👤 Username: Serg2206-
echo 🔑 Password: Используйте Personal Access Token (НЕ обычный пароль!)
echo.
echo 📖 Как создать токен:
echo    1. GitHub → Settings → Developer settings
echo    2. Personal access tokens → Tokens (classic)
echo    3. Generate new token (classic)
echo    4. Выберите scope: repo (полный доступ)
echo    5. Скопируйте токен и используйте как пароль
echo.
echo ════════════════════════════════════════════════════════════════
echo.

REM Спросим пользователя
echo ⚠️  ВНИМАНИЕ: Это заменит содержимое существующего репозитория!
echo.
set /p confirm="Продолжить загрузку на GitHub? (y/n): "

if /i not "%confirm%"=="y" (
    echo.
    echo ❌ Загрузка отменена пользователем
    echo.
    pause
    exit /b 0
)

echo.
echo 🚀 Загрузка на GitHub...
echo ════════════════════════════════════════════════════════════════
echo.

REM Загружаем на GitHub с force push
git push -f origin main

if %errorlevel% equ 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║              ✅ УСПЕШНО ЗАГРУЖЕНО НА GITHUB!                 ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo 🎉 Ваш проект доступен по адресу:
    echo 🔗 https://github.com/Serg2206-/ssvnauka
    echo.
    echo 📊 Статистика:
    echo    - 100 файлов
    echo    - 11,898 строк кода
    echo    - 15 курсов
    echo    - 30 видео операций
    echo    - Система тестирования и сертификации
    echo.
    echo 🚀 Следующие шаги:
    echo    1. Откройте https://github.com/Serg2206-/ssvnauka
    echo    2. Проверьте, что все файлы загружены
    echo    3. Настройте деплой (Vercel, Netlify)
    echo.
) else (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    ❌ ОШИБКА ЗАГРУЗКИ                        ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo Возможные причины:
    echo    1. Неверный Personal Access Token
    echo    2. Нет прав доступа к репозиторию
    echo    3. Проблемы с интернет соединением
    echo    4. Токен не имеет scope: repo
    echo.
    echo 🔧 Решение:
    echo    1. Создайте новый Personal Access Token
    echo    2. Убедитесь, что выбран scope: repo
    echo    3. Попробуйте снова
    echo.
)

pause
