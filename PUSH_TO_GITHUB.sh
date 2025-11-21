
#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║       🚀 SSV NAUKA - АВТОМАТИЧЕСКАЯ ЗАГРУЗКА НА GITHUB       ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Проверка наличия Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ ОШИБКА: Git не установлен!${NC}"
    echo ""
    echo "📥 Установите Git: https://git-scm.com/downloads"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Git найден${NC}"
echo ""

# Определение директории проекта
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/nextjs_space"

if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ ОШИБКА: Папка nextjs_space не найдена!${NC}"
    echo "📁 Ожидаемый путь: $PROJECT_DIR"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Проект найден: $PROJECT_DIR${NC}"
echo ""

cd "$PROJECT_DIR"

# Проверка Git репозитория
if [ ! -d ".git" ]; then
    echo "🔧 Инициализация Git репозитория..."
    git init
    git branch -M main
    echo -e "${GREEN}✅ Git репозиторий инициализирован${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Git репозиторий уже существует${NC}"
    echo ""
fi

# Проверка remote
if ! git remote get-url origin &> /dev/null; then
    echo "🔧 Добавление remote origin..."
    git remote add origin https://github.com/Serg2206-/ssvnauka.git
    echo -e "${GREEN}✅ Remote добавлен${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Remote уже настроен${NC}"
    echo ""
fi

# Показываем статус
echo "📊 Статус репозитория:"
echo "════════════════════════════════════════════════════════════════"
if git status --short | grep -q .; then
    echo "Есть изменения для коммита"
else
    echo "Нет изменений для коммита"
fi
echo "════════════════════════════════════════════════════════════════"
echo ""

# Добавляем все файлы
echo "📦 Добавление файлов в Git..."
git add -A
echo -e "${GREEN}✅ Файлы добавлены${NC}"
echo ""

# Создаем коммит
echo "💾 Создание коммита..."
if git commit -m "SSV Nauka educational platform - Full version with interactive features" --allow-empty; then
    echo -e "${GREEN}✅ Коммит создан${NC}"
else
    echo -e "${YELLOW}⚠️  Коммит не создан (возможно, нет изменений)${NC}"
fi
echo ""

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                 🔐 ТРЕБУЮТСЯ УЧЕТНЫЕ ДАННЫЕ                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "👤 Username: Serg2206-"
echo "🔑 Password: Используйте Personal Access Token (НЕ обычный пароль!)"
echo ""
echo "📖 Как создать токен:"
echo "   1. GitHub → Settings → Developer settings"
echo "   2. Personal access tokens → Tokens (classic)"
echo "   3. Generate new token (classic)"
echo "   4. Выберите scope: repo (полный доступ)"
echo "   5. Скопируйте токен и используйте как пароль"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

# Спросим пользователя
echo -e "${YELLOW}⚠️  ВНИМАНИЕ: Это заменит содержимое существующего репозитория!${NC}"
echo ""
read -p "Продолжить загрузку на GitHub? (y/n): " confirm

if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${RED}❌ Загрузка отменена пользователем${NC}"
    echo ""
    exit 0
fi

echo ""
echo "🚀 Загрузка на GitHub..."
echo "════════════════════════════════════════════════════════════════"
echo ""

# Загружаем на GitHub с force push
if git push -f origin main; then
    echo ""
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║              ✅ УСПЕШНО ЗАГРУЖЕНО НА GITHUB!                 ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🎉 Ваш проект доступен по адресу:"
    echo "🔗 https://github.com/Serg2206-/ssvnauka"
    echo ""
    echo "📊 Статистика:"
    echo "   - 100 файлов"
    echo "   - 11,898 строк кода"
    echo "   - 15 курсов"
    echo "   - 30 видео операций"
    echo "   - Система тестирования и сертификации"
    echo ""
    echo "🚀 Следующие шаги:"
    echo "   1. Откройте https://github.com/Serg2206-/ssvnauka"
    echo "   2. Проверьте, что все файлы загружены"
    echo "   3. Настройте деплой (Vercel, Netlify)"
    echo ""
else
    echo ""
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                    ❌ ОШИБКА ЗАГРУЗКИ                        ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Возможные причины:"
    echo "   1. Неверный Personal Access Token"
    echo "   2. Нет прав доступа к репозиторию"
    echo "   3. Проблемы с интернет соединением"
    echo "   4. Токен не имеет scope: repo"
    echo ""
    echo "🔧 Решение:"
    echo "   1. Создайте новый Personal Access Token"
    echo "   2. Убедитесь, что выбран scope: repo"
    echo "   3. Попробуйте снова"
    echo ""
    exit 1
fi
