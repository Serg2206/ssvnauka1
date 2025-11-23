
# ============================================
# SSV Nauka - Windows Installation Script
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SSV Nauka - Windows Installation    " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка Node.js
Write-Host "[1/10] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "       Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "       Node.js not found!" -ForegroundColor Red
    Write-Host "       Please install from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Проверка npm
Write-Host "[2/10] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    Write-Host "       npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "       npm not found!" -ForegroundColor Red
    exit 1
}

# Установка Yarn
Write-Host "[3/10] Installing Yarn globally..." -ForegroundColor Yellow
try {
    npm install -g yarn 2>&1 | Out-Null
    $yarnVersion = yarn --version 2>&1
    Write-Host "       Yarn version: $yarnVersion" -ForegroundColor Green
} catch {
    Write-Host "       Failed to install Yarn" -ForegroundColor Red
    exit 1
}

# Установка зависимостей
Write-Host "[4/10] Installing project dependencies..." -ForegroundColor Yellow
Write-Host "       (This may take 3-5 minutes)" -ForegroundColor Gray
try {
    yarn install 2>&1 | Out-Null
    Write-Host "       Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "       Failed to install dependencies" -ForegroundColor Red
    Write-Host "       Error: $_" -ForegroundColor Red
    exit 1
}

# Создание .env файла
Write-Host "[5/10] Creating .env configuration..." -ForegroundColor Yellow
$envContent = @"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="ssvnauka-secret-key-2025-production"
NEXTAUTH_URL="http://localhost:3000"
"@

try {
    $envContent | Out-File -FilePath .env -Encoding UTF8 -Force
    Write-Host "       .env file created" -ForegroundColor Green
} catch {
    Write-Host "       Failed to create .env file" -ForegroundColor Red
    exit 1
}

# Генерация Prisma Client
Write-Host "[6/10] Generating Prisma Client..." -ForegroundColor Yellow
try {
    yarn prisma generate 2>&1 | Out-Null
    Write-Host "       Prisma Client generated" -ForegroundColor Green
} catch {
    Write-Host "       Failed to generate Prisma Client" -ForegroundColor Red
    Write-Host "       Error: $_" -ForegroundColor Red
    exit 1
}

# Применение миграций
Write-Host "[7/10] Running database migrations..." -ForegroundColor Yellow
try {
    yarn prisma migrate dev --name init 2>&1 | Out-Null
    Write-Host "       Database migrations completed" -ForegroundColor Green
} catch {
    Write-Host "       Failed to run migrations" -ForegroundColor Red
    Write-Host "       Error: $_" -ForegroundColor Red
    exit 1
}

# Заполнение базы данных
Write-Host "[8/10] Seeding database..." -ForegroundColor Yellow
Write-Host "       (Loading 309 videos - may take 1-2 minutes)" -ForegroundColor Gray
try {
    yarn prisma db seed 2>&1 | Out-Null
    Write-Host "       Database seeded successfully" -ForegroundColor Green
} catch {
    Write-Host "       Failed to seed database" -ForegroundColor Red
    Write-Host "       Error: $_" -ForegroundColor Red
    exit 1
}

# Проверка файлов
Write-Host "[9/10] Verifying installation..." -ForegroundColor Yellow
$filesOk = $true

if (Test-Path .env) {
    Write-Host "       .env file: OK" -ForegroundColor Green
} else {
    Write-Host "       .env file: MISSING" -ForegroundColor Red
    $filesOk = $false
}

if (Test-Path prisma\dev.db) {
    Write-Host "       Database file: OK" -ForegroundColor Green
} else {
    Write-Host "       Database file: MISSING" -ForegroundColor Red
    $filesOk = $false
}

if (Test-Path node_modules) {
    Write-Host "       Dependencies: OK" -ForegroundColor Green
} else {
    Write-Host "       Dependencies: MISSING" -ForegroundColor Red
    $filesOk = $false
}

if (-not $filesOk) {
    Write-Host ""
    Write-Host "Installation verification failed!" -ForegroundColor Red
    exit 1
}

# Готово
Write-Host "[10/10] Installation complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Installation Successful!         " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database Statistics:" -ForegroundColor Yellow
Write-Host "  - 309 professional videos" -ForegroundColor Gray
Write-Host "  - 219 WebSurg videos" -ForegroundColor Gray
Write-Host "  - 8+ surgical specialties" -ForegroundColor Gray
Write-Host "  - 3 test user accounts" -ForegroundColor Gray
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Yellow
Write-Host "  yarn dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then open in your browser:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test Accounts:" -ForegroundColor Yellow
Write-Host "  Admin:   admin@ssvnauka.com / admin123" -ForegroundColor Gray
Write-Host "  Surgeon: surgeon@ssvnauka.com / surgeon123" -ForegroundColor Gray
Write-Host "  Student: student@ssvnauka.com / student123" -ForegroundColor Gray
Write-Host ""

# Предложение запустить сервер
$startServer = Read-Host "Start development server now? (y/n)"
if ($startServer -eq 'y' -or $startServer -eq 'Y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    yarn dev
} else {
    Write-Host ""
    Write-Host "To start the server later, run:" -ForegroundColor Yellow
    Write-Host "  yarn dev" -ForegroundColor Cyan
    Write-Host ""
}
