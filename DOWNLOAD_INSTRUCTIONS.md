
# 💾 Инструкция по загрузке и запуску SSV Nauka локально

## 📋 Содержание

1. [Системные требования](#системные-требования)
2. [Установка необходимого ПО](#установка-необходимого-по)
3. [Загрузка проекта с GitHub](#загрузка-проекта-с-github)
4. [Настройка проекта](#настройка-проекта)
5. [Запуск проекта](#запуск-проекта)
6. [Решение проблем](#решение-проблем)

---

## 🖥️ Системные требования

### Минимальные требования:
- **Операционная система:** Windows 10/11, macOS 10.15+, или Linux (Ubuntu 20.04+)
- **Процессор:** Intel Core i3 или эквивалент
- **Оперативная память:** 4 GB RAM (рекомендуется 8 GB)
- **Свободное место:** 2 GB на диске
- **Интернет:** Для первоначальной загрузки проекта

### Рекомендуемые требования:
- **Процессор:** Intel Core i5 или лучше
- **Оперативная память:** 8+ GB RAM
- **Свободное место:** 5+ GB на диске
- **SSD** для быстрой работы

---

## 📦 Установка необходимого ПО

### Шаг 1: Установка Node.js

Node.js требуется для работы проекта.

#### Windows:
1. Скачайте установщик: https://nodejs.org/
2. Выберите **LTS версию** (рекомендуется)
3. Запустите установщик
4. Следуйте инструкциям на экране
5. Перезагрузите компьютер

#### macOS:
```bash
# Через Homebrew (рекомендуется)
brew install node

# Или скачайте с официального сайта
# https://nodejs.org/
```

#### Linux (Ubuntu/Debian):
```bash
# Установка Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка установки
node --version
npm --version
```

**Проверка установки:**
```bash
node --version
# Должно вывести: v18.x.x или выше

npm --version
# Должно вывести: 9.x.x или выше
```

### Шаг 2: Установка Yarn (рекомендуется)

Yarn - это более быстрый менеджер пакетов.

```bash
# Глобальная установка Yarn
npm install -g yarn

# Проверка установки
yarn --version
# Должно вывести: 1.22.x или выше
```

### Шаг 3: Установка Git

Git требуется для загрузки проекта с GitHub.

#### Windows:
1. Скачайте: https://git-scm.com/download/win
2. Запустите установщик
3. Используйте настройки по умолчанию

#### macOS:
```bash
# Через Homebrew
brew install git

# Или через Xcode Command Line Tools
xcode-select --install
```

#### Linux:
```bash
sudo apt-get install git
```

**Проверка установки:**
```bash
git --version
# Должно вывести: git version 2.x.x
```

---

## 📥 Загрузка проекта с GitHub

### Метод 1: Загрузка через Git (Рекомендуется)

#### Шаг 1: Откройте терминал/командную строку

**Windows:**
- Нажмите `Win + R`
- Введите `cmd` или `powershell`
- Нажмите Enter

**macOS:**
- Нажмите `Cmd + Space`
- Введите `Terminal`
- Нажмите Enter

**Linux:**
- Нажмите `Ctrl + Alt + T`

#### Шаг 2: Перейдите в нужную директорию

```bash
# Windows
cd C:\Users\ВашеИмя\Documents

# macOS/Linux
cd ~/Documents
```

#### Шаг 3: Клонируйте репозиторий

```bash
git clone https://github.com/Serg2206/ssvnauka1.git
cd ssvnauka1
```

### Метод 2: Загрузка ZIP-архива

1. Откройте: https://github.com/Serg2206/ssvnauka1
2. Нажмите зеленую кнопку **"Code"**
3. Выберите **"Download ZIP"**
4. Распакуйте архив в нужную папку
5. Переименуйте папку в `ssvnauka1` (если нужно)

---

## ⚙️ Настройка проекта

### Шаг 1: Перейдите в директорию проекта

```bash
cd ssvnauka1/nextjs_space
```

### Шаг 2: Установите зависимости

```bash
# Используя Yarn (рекомендуется)
yarn install

# Или используя npm
npm install
```

**Это займет 3-5 минут.** Будет загружено около 500 MB зависимостей.

### Шаг 3: Настройте переменные окружения

#### Создайте файл `.env`:

**Windows (PowerShell):**
```powershell
# В папке nextjs_space
New-Item .env -ItemType File
notepad .env
```

**macOS/Linux:**
```bash
# В папке nextjs_space
touch .env
nano .env
# Или используйте любой текстовый редактор
```

#### Добавьте следующие переменные в `.env`:

```env
# База данных (используется SQLite по умолчанию)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth (для аутентификации)
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Опционально: если планируете использовать PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/ssvnauka"
```

**Генерация безопасного NEXTAUTH_SECRET:**

```bash
# Linux/macOS
openssl rand -base64 32

# Windows (PowerShell)
-join ((65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### Шаг 4: Инициализируйте базу данных

```bash
# Генерация Prisma Client
yarn prisma generate

# Применение миграций
yarn prisma migrate dev

# Заполнение базы данных тестовыми данными
yarn prisma db seed
```

**Это создаст:**
- ✅ База данных SQLite (`dev.db`)
- ✅ 309 видео из различных источников
- ✅ Тестовые пользователи
- ✅ Примеры курсов и статей

### Шаг 5: Проверьте базу данных (опционально)

```bash
# Откройте Prisma Studio для просмотра данных
yarn prisma studio
```

Откроется браузер с интерфейсом для просмотра данных: http://localhost:5555

---

## 🚀 Запуск проекта

### Режим разработки (Development)

```bash
# В папке nextjs_space
yarn dev
```

**Проект будет доступен по адресу:**
🔗 **http://localhost:3000**

**Что вы увидите:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /path/to/nextjs_space/.env
event - compiled client and server successfully
```

### Режим продакшена (Production)

```bash
# Сборка проекта
yarn build

# Запуск продакшен версии
yarn start
```

### Остановка сервера

Нажмите `Ctrl + C` в терминале

---

## 🔐 Тестовые учетные записи

После заполнения базы данных (`yarn prisma db seed`) будут доступны следующие аккаунты:

### Администратор:
- **Email:** admin@ssvnauka.com
- **Password:** admin123
- **Права:** Полный доступ ко всем функциям

### Хирург:
- **Email:** surgeon@ssvnauka.com
- **Password:** surgeon123
- **Права:** Доступ к образовательному контенту

### Студент:
- **Email:** student@ssvnauka.com
- **Password:** student123
- **Права:** Базовый доступ к курсам

---

## 📂 Структура проекта

```
ssvnauka1/
├── nextjs_space/              # Основной код приложения
│   ├── app/                   # Страницы и API маршруты (Next.js 13+)
│   │   ├── api/              # API endpoints
│   │   ├── videos/           # Страницы видео
│   │   ├── courses/          # Страницы курсов
│   │   ├── dashboard/        # Панель управления
│   │   └── page.tsx          # Главная страница
│   ├── components/           # React компоненты
│   │   ├── ui/              # UI компоненты (shadcn/ui)
│   │   ├── header.tsx       # Шапка сайта
│   │   └── video-card.tsx   # Карточка видео
│   ├── lib/                  # Утилиты и вспомогательные функции
│   │   ├── db.ts            # Конфигурация базы данных
│   │   ├── auth-options.ts  # Настройки аутентификации
│   │   ├── video-utils.ts   # Утилиты для видео
│   │   └── types.ts         # TypeScript типы
│   ├── prisma/              # База данных
│   │   ├── schema.prisma    # Схема базы данных
│   │   ├── dev.db           # SQLite база данных
│   │   └── migrations/      # Миграции БД
│   ├── public/              # Статические файлы
│   ├── scripts/             # Скрипты
│   │   └── seed.ts          # Скрипт заполнения БД
│   ├── .env                 # Переменные окружения (создается вами)
│   ├── package.json         # Зависимости проекта
│   └── tsconfig.json        # Конфигурация TypeScript
├── WEBSURG_INTEGRATION.md    # Документация WebSurg
├── VIDEO_LIBRARY_OPTIMIZATION.md  # Документация оптимизации
├── GITHUB_SYNC_INSTRUCTIONS.md    # Инструкции Git
└── README.md                # Общая информация
```

---

## 🌐 Доступ к сайту

### Локальный доступ:
- **Адрес:** http://localhost:3000
- **Доступен только:** С вашего компьютера

### Доступ из локальной сети:

Чтобы открыть сайт на других устройствах в вашей сети:

1. Узнайте свой IP адрес:

**Windows:**
```cmd
ipconfig
# Найдите "IPv4 Address": например, 192.168.1.100
```

**macOS/Linux:**
```bash
ifconfig
# Или
ip addr show
# Найдите IP: например, 192.168.1.100
```

2. На другом устройстве в той же сети откройте:
   - `http://192.168.1.100:3000` (замените на ваш IP)

---

## 🛠️ Полезные команды

### Работа с зависимостями:
```bash
# Установка зависимостей
yarn install

# Добавление новой зависимости
yarn add package-name

# Обновление зависимостей
yarn upgrade
```

### Работа с базой данных:
```bash
# Открыть Prisma Studio
yarn prisma studio

# Применить миграции
yarn prisma migrate dev

# Сбросить базу данных
yarn prisma migrate reset

# Заполнить базу данных
yarn prisma db seed

# Генерация Prisma Client
yarn prisma generate
```

### Работа с проектом:
```bash
# Разработка
yarn dev

# Сборка
yarn build

# Продакшен
yarn start

# Проверка кода
yarn lint

# Форматирование кода
yarn format
```

---

## 🔧 Решение проблем

### Проблема: "Port 3000 is already in use"

**Причина:** Порт 3000 занят другим приложением

**Решение 1:** Остановите другое приложение на порту 3000

**Решение 2:** Используйте другой порт
```bash
# Windows (PowerShell)
$env:PORT=3001; yarn dev

# Linux/macOS
PORT=3001 yarn dev
```

Сайт будет доступен на: http://localhost:3001

### Проблема: "Command not found: yarn"

**Причина:** Yarn не установлен

**Решение:**
```bash
npm install -g yarn
```

### Проблема: "Cannot find module 'next'"

**Причина:** Зависимости не установлены

**Решение:**
```bash
cd nextjs_space
yarn install
```

### Проблема: Ошибки при сборке проекта

**Решение 1:** Очистите кэш
```bash
# Удалите папки
rm -rf node_modules
rm -rf .next

# Переустановите зависимости
yarn install
```

**Решение 2:** Обновите Node.js
```bash
# Проверьте версию
node --version

# Если меньше v18, установите новую версию
# https://nodejs.org/
```

### Проблема: База данных не создается

**Решение:**
```bash
# Удалите существующую БД
rm prisma/dev.db

# Создайте заново
yarn prisma migrate dev
yarn prisma db seed
```

### Проблема: "Error: ENOSPC" (Linux)

**Причина:** Недостаточно файловых наблюдателей

**Решение:**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Проблема: Медленная работа

**Причины и решения:**

1. **Недостаточно RAM:** Закройте другие приложения
2. **Медленный диск:** Переместите проект на SSD
3. **Антивирус:** Добавьте папку проекта в исключения

### Проблема: "Module not found" ошибки

**Решение:**
```bash
# Генерация Prisma Client
yarn prisma generate

# Перезапуск dev сервера
yarn dev
```

---

## 📱 Доступ с мобильных устройств

### Через локальную сеть:

1. Убедитесь, что компьютер и мобильное устройство в одной WiFi сети
2. Узнайте IP адрес компьютера (см. выше)
3. На мобильном откройте: `http://192.168.1.100:3000`

### Через туннель (для тестирования):

Используйте ngrok для доступа из интернета:

```bash
# Установка ngrok
npm install -g ngrok

# Запуск туннеля
ngrok http 3000
```

Получите публичный URL: `https://xxxx.ngrok.io`

**⚠️ Внимание:** Используйте только для тестирования, не для продакшена!

---

## 🔄 Обновление проекта

### Получить последние изменения с GitHub:

```bash
# В корневой папке проекта
cd ssvnauka1

# Получить обновления
git pull origin master

# Перейти в nextjs_space
cd nextjs_space

# Обновить зависимости
yarn install

# Применить миграции БД
yarn prisma migrate dev

# Перезапустить сервер
yarn dev
```

---

## 💡 Рекомендации

### Для разработки:

1. **Используйте VSCode:** Лучший редактор для Next.js
   - Установите расширения:
     - ESLint
     - Prettier
     - Prisma
     - Tailwind CSS IntelliSense

2. **Включите автосохранение:** Для мгновенной перезагрузки

3. **Используйте Prisma Studio:** Для работы с БД

### Для производительности:

1. **Используйте SSD:** Для быстрой работы
2. **Минимум 8GB RAM:** Для комфортной разработки
3. **Закройте ненужные приложения:** При разработке

### Для безопасности:

1. **Не публикуйте `.env` файл**
2. **Используйте сильные пароли** для продакшена
3. **Регулярно обновляйте зависимости:**
   ```bash
   yarn upgrade-interactive
   ```

---

## 📚 Дополнительные ресурсы

### Документация:
- **Next.js:** https://nextjs.org/docs
- **Prisma:** https://www.prisma.io/docs
- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/docs

### Видео-уроки:
- Next.js для начинающих (YouTube)
- Prisma crash course (YouTube)
- React + TypeScript guide (YouTube)

### Поддержка:
- GitHub Issues: https://github.com/Serg2206/ssvnauka1/issues
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: https://stackoverflow.com/questions/tagged/next.js

---

## ✅ Чек-лист установки

Отметьте после выполнения:

- [ ] Node.js установлен (v18+)
- [ ] Yarn установлен
- [ ] Git установлен
- [ ] Проект клонирован с GitHub
- [ ] Зависимости установлены (`yarn install`)
- [ ] Файл `.env` создан
- [ ] База данных инициализирована (`yarn prisma migrate dev`)
- [ ] База заполнена данными (`yarn prisma db seed`)
- [ ] Сервер запущен (`yarn dev`)
- [ ] Сайт открывается на http://localhost:3000
- [ ] Вход в систему работает (используйте тестовые аккаунты)

---

## 🎯 Быстрый старт (краткая версия)

Для опытных пользователей:

```bash
# 1. Клонирование
git clone https://github.com/Serg2206/ssvnauka1.git
cd ssvnauka1/nextjs_space

# 2. Установка
yarn install

# 3. Настройка
echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
echo 'NEXTAUTH_SECRET="change-this-secret"' >> .env
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env

# 4. База данных
yarn prisma generate
yarn prisma migrate dev
yarn prisma db seed

# 5. Запуск
yarn dev
```

Готово! Откройте: http://localhost:3000

---

## 📞 Получить помощь

Если у вас возникли проблемы:

1. Проверьте раздел "Решение проблем" выше
2. Прочитайте логи ошибок внимательно
3. Поищите решение в Google
4. Создайте Issue на GitHub: https://github.com/Serg2206/ssvnauka1/issues

---

**Последнее обновление:** 23 ноября 2025  
**Версия документа:** 1.0  
**Статус:** ✅ Актуально

---

**Успехов в работе с проектом SSV Nauka!** 🚀🎓
