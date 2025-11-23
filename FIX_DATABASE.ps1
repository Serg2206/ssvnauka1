
# ============================================
# SSV Nauka - Database Fix Script for Windows
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SSV Nauka - Database Fix Script     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка текущей директории
Write-Host "Checking current directory..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "Current directory: $currentDir" -ForegroundColor Gray

if (-not (Test-Path "package.json")) {
    Write-Host ""
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the nextjs_space folder" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Example:" -ForegroundColor Yellow
    Write-Host "  cd C:\Users\Suxow\Documents\ssvnauka1\nextjs_space" -ForegroundColor Cyan
    Write-Host "  .\FIX_DATABASE.ps1" -ForegroundColor Cyan
    exit 1
}

Write-Host "Package.json found - correct directory!" -ForegroundColor Green
Write-Host ""

# Проверка .env файла
Write-Host "Checking .env file..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host ".env file not found. Creating..." -ForegroundColor Yellow
    $envContent = @"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="ssvnauka-secret-key-2025-production"
NEXTAUTH_URL="http://localhost:3000"
"@
    $envContent | Out-File -FilePath .env -Encoding UTF8 -Force
    Write-Host ".env file created" -ForegroundColor Green
} else {
    Write-Host ".env file exists" -ForegroundColor Green
    Write-Host "Content:" -ForegroundColor Gray
    Get-Content .env | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
}
Write-Host ""

# Проверка папки prisma
Write-Host "Checking prisma folder..." -ForegroundColor Yellow
if (-not (Test-Path "prisma")) {
    Write-Host "ERROR: prisma folder not found!" -ForegroundColor Red
    Write-Host "This doesn't appear to be a valid Next.js project" -ForegroundColor Red
    exit 1
}
Write-Host "Prisma folder exists" -ForegroundColor Green
Write-Host ""

# Удаление старой базы данных (если есть)
Write-Host "Cleaning up old database..." -ForegroundColor Yellow
if (Test-Path "prisma\dev.db") {
    Write-Host "Found old database file, removing..." -ForegroundColor Gray
    Remove-Item "prisma\dev.db" -Force -ErrorAction SilentlyContinue
    Remove-Item "prisma\dev.db-journal" -Force -ErrorAction SilentlyContinue
}
Write-Host "Cleanup complete" -ForegroundColor Green
Write-Host ""

# Генерация Prisma Client
Write-Host "Step 1/4: Generating Prisma Client..." -ForegroundColor Yellow
try {
    yarn prisma generate
    Write-Host "Prisma Client generated successfully" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to generate Prisma Client" -ForegroundColor Red
    Write-Host "Error details: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Применение миграций с подробным выводом
Write-Host "Step 2/4: Creating database..." -ForegroundColor Yellow
Write-Host "(This will create prisma/dev.db file)" -ForegroundColor Gray
try {
    # Используем --name для явного указания имени миграции
    yarn prisma migrate dev --name init --skip-seed
    
    # Проверяем, создался ли файл
    if (Test-Path "prisma\dev.db") {
        Write-Host "Database file created successfully!" -ForegroundColor Green
        $dbSize = (Get-Item "prisma\dev.db").Length
        Write-Host "Database size: $dbSize bytes" -ForegroundColor Gray
    } else {
        Write-Host "WARNING: Database file not found after migration" -ForegroundColor Red
        Write-Host "Trying alternative method..." -ForegroundColor Yellow
        
        # Альтернативный метод - прямое создание
        yarn prisma db push --skip-generate
        
        if (Test-Path "prisma\dev.db") {
            Write-Host "Database created with alternative method" -ForegroundColor Green
        } else {
            Write-Host "ERROR: Failed to create database" -ForegroundColor Red
            exit 1
        }
    }
} catch {
    Write-Host "ERROR: Failed to create database" -ForegroundColor Red
    Write-Host "Error details: $_" -ForegroundColor Red
    
    # Попробуем альтернативный метод
    Write-Host ""
    Write-Host "Trying alternative method (db push)..." -ForegroundColor Yellow
    try {
        yarn prisma db push --skip-generate
        if (Test-Path "prisma\dev.db") {
            Write-Host "Database created successfully with db push!" -ForegroundColor Green
        } else {
            Write-Host "ERROR: Alternative method also failed" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "ERROR: All methods failed" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Заполнение базы данных
Write-Host "Step 3/4: Seeding database..." -ForegroundColor Yellow
Write-Host "(Loading 309 videos - may take 1-2 minutes)" -ForegroundColor Gray
try {
    yarn prisma db seed
    Write-Host "Database seeded successfully" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to seed database" -ForegroundColor Red
    Write-Host "Error details: $_" -ForegroundColor Red
    
    # Попробуем прямое выполнение seed скрипта
    Write-Host ""
    Write-Host "Trying direct seed script execution..." -ForegroundColor Yellow
    try {
        yarn tsx scripts/seed.ts
        Write-Host "Database seeded with direct execution" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Direct execution also failed" -ForegroundColor Red
        Write-Host "You may need to run: yarn tsx scripts/seed.ts manually" -ForegroundColor Yellow
    }
}
Write-Host ""

# Финальная проверка
Write-Host "Step 4/4: Final verification..." -ForegroundColor Yellow
$allOk = $true

if (Test-Path ".env") {
    Write-Host ".env file: OK" -ForegroundColor Green
} else {
    Write-Host ".env file: MISSING" -ForegroundColor Red
    $allOk = $false
}

if (Test-Path "prisma\dev.db") {
    $dbSize = (Get-Item "prisma\dev.db").Length
    Write-Host "Database file: OK (size: $dbSize bytes)" -ForegroundColor Green
    
    # Проверка содержимого базы
    Write-Host "Checking database content..." -ForegroundColor Gray
    try {
        $videoCount = yarn prisma db execute --stdin <<< "SELECT COUNT(*) FROM Video;" 2>&1 | Select-String -Pattern "(\d+)"
        Write-Host "Videos in database: $videoCount" -ForegroundColor Gray
    } catch {
        Write-Host "Note: Could not verify video count (database may need seeding)" -ForegroundColor Yellow
    }
} else {
    Write-Host "Database file: MISSING" -ForegroundColor Red
    $allOk = $false
}

if (Test-Path "node_modules") {
    Write-Host "Dependencies: OK" -ForegroundColor Green
} else {
    Write-Host "Dependencies: MISSING" -ForegroundColor Red
    $allOk = $false
}

Write-Host ""
if ($allOk) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "      Database Fixed Successfully!      " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now start the development server:" -ForegroundColor Yellow
    Write-Host "  yarn dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then open: http://localhost:3000" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "         Fix Failed - See Errors        " -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Yellow
    Write-Host "1. Make sure you're in the nextjs_space folder" -ForegroundColor Gray
    Write-Host "2. Run: yarn install" -ForegroundColor Gray
    Write-Host "3. Check that prisma/schema.prisma exists" -ForegroundColor Gray
    Write-Host "4. Try: yarn prisma generate" -ForegroundColor Gray
    Write-Host "5. Try: yarn prisma db push" -ForegroundColor Gray
    Write-Host ""
}
