
# 🪟 Установка SSV Nauka на Windows

## ⚡ Быстрая установка для Windows PowerShell

---

## 🎯 Метод 1: Автоматический скрипт (Рекомендуется)

### Шаг 1: Скачайте проект

**Вариант А: Через Git**
```powershell
cd C:\Users\$env:USERNAME\Documents
git clone https://github.com/Serg2206/ssvnauka1.git
cd ssvnauka1\nextjs_space
```

**Вариант Б: Скачать ZIP**
1. Откройте: https://github.com/Serg2206/ssvnauka1
2. Нажмите "Code" → "Download ZIP"
3. Распакуйте в `C:\Users\Suxow\Documents\ssvnauka1`
4. Откройте PowerShell в папке `ssvnauka1\nextjs_space`

### Шаг 2: Скачайте и запустите скрипт установки

```powershell
# Скачайте скрипт установки
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Serg2206/ssvnauka1/master/WINDOWS_INSTALL.ps1" -OutFile "WINDOWS_INSTALL.ps1"

# Разрешите выполнение скриптов (выполните один раз)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Запустите установку
.\WINDOWS_INSTALL.ps1
```

Скрипт автоматически:
- ✅ Установит Yarn (если нужно)
- ✅ Установит зависимости
- ✅ Создаст .env файл
- ✅ Настроит базу данных
- ✅ Запустит сервер

---

## 📋 Метод 2: Пошаговая установка (Ручной)

### Шаг 1: Перейдите в папку проекта

```powershell
cd C:\Users\Suxow\Documents\ssvnauka1\nextjs_space
```

### Шаг 2: Установите Yarn

```powershell
npm install -g yarn
```

### Шаг 3: Установите зависимости

```powershell
yarn install
```

⏱️ Подождите 3-5 минут

### Шаг 4: Создайте файл .env

**ВАЖНО для PowerShell:** Используйте правильный синтаксис!

```powershell
# Создайте файл .env
New-Item -Path .env -ItemType File -Force

# Добавьте переменные (по одной команде)
Add-Content -Path .env -Value 'DATABASE_URL="file:./prisma/dev.db"'
Add-Content -Path .env -Value 'NEXTAUTH_SECRET="ssvnauka-secret-key-2025-production"'
Add-Content -Path .env -Value 'NEXTAUTH_URL="http://localhost:3000"'
```

### Шаг 5: Настройте базу данных

```powershell
# Генерация Prisma Client
yarn prisma generate

# Применение миграций
yarn prisma migrate dev

# Заполнение базы данных
yarn prisma db seed
```

### Шаг 6: Запустите сервер

```powershell
yarn dev
```

### Шаг 7: Откройте браузер

🔗 **http://localhost:3000**

---

## 🔧 ИСПРАВЛЕНИЕ вашей ошибки

### ❌ Неправильно (bash синтаксис):
```bash
echo 'DATABASE_URL="file:./prisma/dev.db"' > .env && \
echo 'NEXTAUTH_SECRET="secret"' >> .env
```

### ✅ Правильно для PowerShell:

```powershell
# Создайте файл
New-Item -Path .env -ItemType File -Force

# Добавьте содержимое
@"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="ssvnauka-secret-key-2025"
NEXTAUTH_URL="http://localhost:3000"
"@ | Out-File -FilePath .env -Encoding UTF8
```

Или по одной команде:

```powershell
"DATABASE_URL=`"file:./prisma/dev.db`"" | Out-File -FilePath .env -Encoding UTF8
"NEXTAUTH_SECRET=`"ssvnauka-secret-key-2025`"" | Out-File -FilePath .env -Append -Encoding UTF8
"NEXTAUTH_URL=`"http://localhost:3000`"" | Out-File -FilePath .env -Append -Encoding UTF8
```

---

## 🚀 Полная последовательность команд для PowerShell

Скопируйте и выполняйте **по одной команде**:

```powershell
# 1. Перейдите в папку проекта
cd C:\Users\Suxow\Documents\ssvnauka1\nextjs_space

# 2. Установите Yarn
npm install -g yarn

# 3. Установите зависимости
yarn install

# 4. Создайте .env файл
New-Item -Path .env -ItemType File -Force

# 5. Добавьте DATABASE_URL
Add-Content -Path .env -Value 'DATABASE_URL="file:./prisma/dev.db"'

# 6. Добавьте NEXTAUTH_SECRET
Add-Content -Path .env -Value 'NEXTAUTH_SECRET="ssvnauka-secret-key-2025"'

# 7. Добавьте NEXTAUTH_URL
Add-Content -Path .env -Value 'NEXTAUTH_URL="http://localhost:3000"'

# 8. Генерация Prisma
yarn prisma generate

# 9. Миграции базы данных
yarn prisma migrate dev

# 10. Заполнение базы
yarn prisma db seed

# 11. Запуск сервера
yarn dev
```

---

## 📝 Автоматический скрипт установки

Создайте файл `install.ps1` с содержимым:

```powershell
# SSV Nauka Windows Installation Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SSV Nauka - Windows Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green

# Установка Yarn
Write-Host ""
Write-Host "Installing Yarn..." -ForegroundColor Yellow
npm install -g yarn
Write-Host "✅ Yarn installed" -ForegroundColor Green

# Установка зависимостей
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "(This may take 3-5 minutes)" -ForegroundColor Gray
yarn install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Создание .env файла
Write-Host ""
Write-Host "Creating .env file..." -ForegroundColor Yellow
$envContent = @"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="ssvnauka-secret-key-2025-production"
NEXTAUTH_URL="http://localhost:3000"
"@
$envContent | Out-File -FilePath .env -Encoding UTF8 -Force
Write-Host "✅ .env file created" -ForegroundColor Green

# Генерация Prisma
Write-Host ""
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
yarn prisma generate
Write-Host "✅ Prisma Client generated" -ForegroundColor Green

# Миграции
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
yarn prisma migrate dev --name init
Write-Host "✅ Migrations completed" -ForegroundColor Green

# Заполнение базы
Write-Host ""
Write-Host "Seeding database with 309 videos..." -ForegroundColor Yellow
Write-Host "(This may take 1-2 minutes)" -ForegroundColor Gray
yarn prisma db seed
Write-Host "✅ Database seeded with content" -ForegroundColor Green

# Готово
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Yellow
Write-Host "  yarn dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then open in browser:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test accounts:" -ForegroundColor Yellow
Write-Host "  Admin:   admin@ssvnauka.com / admin123" -ForegroundColor Gray
Write-Host "  Surgeon: surgeon@ssvnauka.com / surgeon123" -ForegroundColor Gray
Write-Host "  Student: student@ssvnauka.com / student123" -ForegroundColor Gray
Write-Host ""

# Опционально запустить сервер
$response = Read-Host "Start development server now? (y/n)"
if ($response -eq 'y') {
    Write-Host ""
    Write-Host "Starting server..." -ForegroundColor Green
    yarn dev
}
```

**Как использовать:**

1. Сохраните скрипт как `install.ps1` в папке `nextjs_space`
2. Откройте PowerShell в этой папке
3. Выполните:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install.ps1
```

---

## 🔍 Решение типичных проблем Windows

### Проблема 1: "&&" не работает

**Причина:** `&&` это bash синтаксис, не PowerShell

**Решение:** Используйте `;` вместо `&&` или выполняйте команды отдельно:

```powershell
# Вместо: command1 && command2
# Используйте:
command1
command2

# Или:
command1; command2
```

### Проблема 2: Ошибка "execution policy"

**Решение:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Проблема 3: Кодировка в .env файле

**Решение:** Убедитесь, что используете UTF8:
```powershell
$content | Out-File -FilePath .env -Encoding UTF8
```

### Проблема 4: Yarn не найден

**Решение:**
```powershell
npm install -g yarn
# Перезапустите PowerShell
```

### Проблема 5: Port 3000 занят

**Решение:**
```powershell
$env:PORT=3001
yarn dev
```

---

## 🎯 Краткая шпаргалка PowerShell

### Навигация:
```powershell
cd C:\path\to\folder      # Перейти в папку
cd ..                     # Вверх на одну папку
ls                        # Список файлов
pwd                       # Текущая папка
```

### Работа с файлами:
```powershell
New-Item file.txt -ItemType File           # Создать файл
Remove-Item file.txt                       # Удалить файл
Get-Content file.txt                       # Прочитать файл
Add-Content file.txt -Value "text"         # Добавить в файл
```

### Переменные окружения:
```powershell
$env:PORT=3001                            # Установить переменную
$env:PATH                                 # Показать PATH
```

---

## 🚦 После установки

### Запуск сервера:
```powershell
cd C:\Users\Suxow\Documents\ssvnauka1\nextjs_space
yarn dev
```

### Остановка сервера:
Нажмите `Ctrl + C`

### Просмотр базы данных:
```powershell
yarn prisma studio
```

### Пересоздание базы:
```powershell
Remove-Item prisma\dev.db -ErrorAction SilentlyContinue
yarn prisma migrate dev
yarn prisma db seed
```

---

## 📊 Проверка установки

```powershell
# Проверьте версии
node --version        # Должно быть v18+
npm --version         # Должно быть 9+
yarn --version        # Должно быть 1.22+

# Проверьте структуру
ls prisma             # Должна быть схема и dev.db
ls .env               # Должен существовать
Get-Content .env      # Проверьте содержимое
```

---

## ✅ Чек-лист для Windows

- [ ] Node.js 18+ установлен
- [ ] PowerShell открыт (не CMD!)
- [ ] Проект скачан/клонирован
- [ ] Находитесь в папке `nextjs_space`
- [ ] Yarn установлен глобально
- [ ] Зависимости установлены (`yarn install`)
- [ ] Файл `.env` создан с правильным содержимым
- [ ] Prisma Client сгенерирован
- [ ] Миграции применены
- [ ] База данных заполнена
- [ ] Сервер запущен (`yarn dev`)
- [ ] Сайт открывается на http://localhost:3000

---

## 🔗 Полезные ссылки

- **Node.js для Windows:** https://nodejs.org/
- **Git для Windows:** https://git-scm.com/download/win
- **VSCode (редактор):** https://code.visualstudio.com/
- **PowerShell 7+:** https://github.com/PowerShell/PowerShell

---

## 📞 Дополнительная помощь

Если проблемы остаются:

1. Проверьте, что используете **PowerShell**, а не CMD
2. Проверьте, что Node.js 18+ установлен
3. Убедитесь, что находитесь в папке `nextjs_space`
4. Выполняйте команды **по одной**, не используя `&&`

---

**Версия:** 1.0  
**Дата:** 23 ноября 2025  
**Платформа:** Windows 10/11 (PowerShell 5.1+)

---

**Удачи с установкой!** 🚀
