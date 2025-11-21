
# 🚀 Инструкция по загрузке проекта на GitHub

## Предварительные требования:

1. ✅ Установлен **Git**: https://git-scm.com/downloads
2. ✅ Есть аккаунт на **GitHub**: https://github.com/Serg2206-
3. ✅ Проект сохранён локально на вашем компьютере (см. DOWNLOAD_INSTRUCTIONS.md)

---

## Вариант 1: Через GitHub Desktop (рекомендуется для начинающих)

### Шаг 1: Установить GitHub Desktop
1. Скачайте: https://desktop.github.com/
2. Установите и войдите в ваш GitHub аккаунт (Serg2206-)

### Шаг 2: Создать новый репозиторий
1. Откройте GitHub Desktop
2. **File** → **New Repository**
3. Заполните:
   - **Name**: `ssvnauka`
   - **Local Path**: `C:\Projects\` (выберите папку, где лежит проект)
   - **Initialize with README**: ✅ (можно отключить, если уже есть)
   - **Git Ignore**: Node
   - **License**: MIT (или на ваш выбор)
4. Нажмите **Create Repository**

### Шаг 3: Добавить файлы проекта
1. Скопируйте содержимое `C:\Projects\ssvnauka\nextjs_space\` в созданную папку репозитория
2. GitHub Desktop автоматически покажет изменения
3. В поле **Summary** напишите: `Initial commit: Added SSV Nauka educational platform`
4. Нажмите **Commit to main**

### Шаг 4: Опубликовать на GitHub
1. Нажмите **Publish repository**
2. Убедитесь, что:
   - **Name**: ssvnauka
   - **Owner**: Serg2206-
   - **Keep this code private** (снимите галочку, если хотите публичный репозиторий)
3. Нажмите **Publish Repository**

✅ **Готово!** Ваш проект теперь на GitHub: `https://github.com/Serg2206-/ssvnauka`

---

## Вариант 2: Через командную строку Git (для опытных пользователей)

### Шаг 1: Открыть PowerShell или Git Bash
```powershell
# Нажмите Win + X → выберите "Windows Terminal"
cd C:\Projects\ssvnauka\nextjs_space
```

### Шаг 2: Инициализировать Git репозиторий
```bash
git init
```

### Шаг 3: Создать .gitignore файл
```bash
# Создайте файл .gitignore с содержимым:
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
.build/
out/
build/

# Production
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Prisma
prisma/*.db
prisma/*.db-journal

# TypeScript
*.tsbuildinfo
next-env.d.ts
EOF
```

### Шаг 4: Добавить файлы в Git
```bash
git add .
git commit -m "Initial commit: Added SSV Nauka educational platform"
```

### Шаг 5: Создать репозиторий на GitHub
1. Откройте браузер: https://github.com/new
2. Заполните:
   - **Repository name**: `ssvnauka`
   - **Description**: `SSV Nauka - Educational platform for surgeons`
   - **Public** или **Private** (на ваш выбор)
3. **НЕ** отмечайте "Initialize this repository with a README" (у вас уже есть локальный репозиторий)
4. Нажмите **Create repository**

### Шаг 6: Подключить удалённый репозиторий
```bash
git remote add origin https://github.com/Serg2206-/ssvnauka.git
git branch -M main
git push -u origin main
```

### Шаг 7: Ввести учётные данные
При первом пуше Git попросит аутентификацию:
- **Username**: Serg2206-
- **Password**: Используйте **Personal Access Token** (не обычный пароль!)

#### Как создать Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Выберите scopes: `repo` (полный доступ к репозиториям)
4. Скопируйте токен и используйте вместо пароля

✅ **Готово!** Ваш проект теперь на GitHub: `https://github.com/Serg2206-/ssvnauka`

---

## 🔐 Важно: Безопасность

### ⚠️ НЕ загружайте на GitHub:
```
.env                    # Содержит секретные ключи БД
.env.local              # Локальные настройки
.env.production         # Продакшен секреты
DATABASE_URL            # Строка подключения к БД
NEXTAUTH_SECRET         # Секретный ключ NextAuth
```

### ✅ Что загружать:
```
package.json            # Зависимости проекта
prisma/schema.prisma    # Схема базы данных
next.config.js          # Конфигурация Next.js
Все файлы в app/        # Код приложения
Все файлы в components/ # React компоненты
README.md               # Документация
```

### Проверка перед пушем:
```bash
# Убедитесь, что .env НЕ в списке файлов:
git status

# Если .env случайно добавлен, удалите его:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

---

## 📝 Создание README.md для GitHub

Создайте файл `README.md` в корне проекта:

```markdown
# 🏥 SSV Nauka - Educational Platform for Surgeons

Международная образовательная платформа для хирургов с интерактивными курсами, видео операций и системой сертификации.

## 🚀 Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизированный JavaScript
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - Реляционная база данных
- **NextAuth.js** - Аутентификация
- **Tailwind CSS** - Стилизация
- **Shadcn/ui** - UI компоненты

## ✨ Возможности

- 📚 **15 курсов** по абдоминальной хирургии (базовый, продвинутый, экспертный уровни)
- 🎥 **30 видео операций** (лапароскопия, роботика, открытая хирургия)
- ✍️ **Интерактивные тесты** с клиническими вопросами
- 🏆 **Система сертификации** при успешном завершении курсов
- 📊 **Личный Dashboard** с прогрессом обучения
- 🔖 **Закладки** для сохранения интересных материалов
- 📱 **Адаптивный дизайн** для всех устройств

## 🛠️ Установка и запуск

### Требования:
- Node.js 18+
- PostgreSQL 14+
- Yarn или npm

### Шаги:

1. Клонировать репозиторий:
\`\`\`bash
git clone https://github.com/Serg2206-/ssvnauka.git
cd ssvnauka
\`\`\`

2. Установить зависимости:
\`\`\`bash
yarn install
\`\`\`

3. Настроить переменные окружения:
Создайте файл \`.env.local\`:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/ssvnauka"
NEXTAUTH_SECRET="ваш-секретный-ключ-минимум-32-символа"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

4. Применить миграции базы данных:
\`\`\`bash
yarn prisma migrate dev
\`\`\`

5. Заполнить базу данных тестовыми данными:
\`\`\`bash
yarn prisma db seed
\`\`\`

6. Запустить dev-сервер:
\`\`\`bash
yarn dev
\`\`\`

Откройте http://localhost:3000

## 🔑 Тестовый аккаунт

- **Email**: test@ssvnauka.com
- **Пароль**: test123456

## 📂 Структура проекта

\`\`\`
nextjs_space/
├── app/                    # Страницы и API routes
│   ├── api/               # API endpoints
│   ├── courses/           # Страницы курсов
│   ├── dashboard/         # Личный кабинет
│   ├── quiz/              # Система тестирования
│   └── certificate/       # Сертификаты
├── components/            # React компоненты
├── lib/                   # Утилиты и конфигурация
├── prisma/                # База данных
│   └── schema.prisma     # Схема БД
├── public/                # Статические файлы
└── scripts/               # Скрипты (seed.ts)
\`\`\`

## 🚀 Деплой

Проект можно задеплоить на:
- **Vercel** (рекомендуется для Next.js)
- **Netlify**
- **AWS / DigitalOcean**

## 📄 Лицензия

MIT License

## 👨‍💻 Автор

Разработано с помощью DeepAgent by Abacus.AI

---

**SSV Наука** - Профессиональное медицинское образование нового поколения 🏥
\`\`\`

---

## 🔄 Дальнейшие обновления

### Как загрузить изменения на GitHub:

```bash
# Добавить изменённые файлы
git add .

# Создать коммит с описанием
git commit -m "Описание изменений"

# Отправить на GitHub
git push origin main
```

### Примеры коммитов:
```bash
git commit -m "feat: Added certificate download functionality"
git commit -m "fix: Fixed quiz navigation bug"
git commit -m "docs: Updated README with installation instructions"
```

---

## 📊 GitHub Actions (опционально)

Можете настроить автоматическую проверку кода при каждом пуше.

Создайте файл `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: yarn install
      
    - name: Type check
      run: yarn tsc --noEmit
      
    - name: Build
      run: yarn build
```

---

## ✅ Проверка успешной загрузки

После загрузки на GitHub, проверьте:

1. ✅ Репозиторий доступен: https://github.com/Serg2206-/ssvnauka
2. ✅ Все файлы загружены (кроме .env и node_modules)
3. ✅ README.md отображается на главной странице
4. ✅ .gitignore работает корректно
5. ✅ История коммитов видна в разделе "Commits"

---

## 🆘 Решение проблем

### Ошибка: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Serg2206-/ssvnauka.git
```

### Ошибка: "Permission denied (publickey)"
Используйте HTTPS вместо SSH или настройте SSH ключи:
```bash
git remote set-url origin https://github.com/Serg2206-/ssvnauka.git
```

### Ошибка: "Failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

---

## 🎉 Готово!

Ваш проект **SSV Наука** теперь:
- ✅ Сохранён локально на Windows 11
- ✅ Загружен на GitHub: https://github.com/Serg2206-/ssvnauka
- ✅ Доступен для совместной работы
- ✅ Защищён системой контроля версий

**Следующие шаги:**
1. Добавьте коллаборантов (Settings → Collaborators)
2. Настройте Issues для отслеживания задач
3. Создайте ветки для разработки новых функций
4. Настройте автоматический деплой (Vercel/Netlify)

Удачи в разработке! 🚀
