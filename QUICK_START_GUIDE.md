
# 🚀 SSV Nauka - Быстрый старт

## 📋 Простая инструкция для начинающих

### ⚡ За 5 минут до запуска!

---

## Шаг 1️⃣: Установите необходимые программы

### Node.js (обязательно)

1. Откройте: https://nodejs.org/
2. Скачайте **LTS версию** (зеленая кнопка)
3. Запустите установщик
4. Нажимайте "Далее" везде
5. **Перезагрузите компьютер**

### Git (обязательно)

**Windows:**
1. Откройте: https://git-scm.com/download/win
2. Скачайте установщик
3. Запустите, используйте настройки по умолчанию

**Mac:**
```bash
# В терминале
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

---

## Шаг 2️⃣: Скачайте проект

### Способ А: Через Git (рекомендуется)

1. **Откройте терминал/командную строку:**
   - **Windows:** Win + R → введите `cmd` → Enter
   - **Mac:** Cmd + Space → введите `Terminal` → Enter
   - **Linux:** Ctrl + Alt + T

2. **Перейдите в папку для проектов:**
```bash
# Windows
cd C:\Users\ВашеИмя\Documents

# Mac/Linux
cd ~/Documents
```

3. **Скачайте проект:**
```bash
git clone https://github.com/Serg2206/ssvnauka1.git
cd ssvnauka1
```

### Способ Б: Скачать ZIP

1. Откройте: https://github.com/Serg2206/ssvnauka1
2. Нажмите зеленую кнопку **"Code"**
3. Нажмите **"Download ZIP"**
4. Распакуйте в удобную папку
5. Откройте папку в терминале

---

## Шаг 3️⃣: Установите зависимости

```bash
# Перейдите в папку проекта
cd ssvnauka1/nextjs_space

# Установите Yarn (если еще не установлен)
npm install -g yarn

# Установите зависимости проекта
yarn install
```

⏱️ **Подождите 3-5 минут** — это нормально!

---

## Шаг 4️⃣: Создайте файл настроек

### Windows (PowerShell):
```powershell
cd ssvnauka1\nextjs_space
New-Item .env -ItemType File
notepad .env
```

### Mac/Linux:
```bash
cd ssvnauka1/nextjs_space
touch .env
nano .env
```

### Скопируйте в файл `.env`:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="ssvnauka-secret-key-2025-production"
NEXTAUTH_URL="http://localhost:3000"
```

**Сохраните файл!**

---

## Шаг 5️⃣: Настройте базу данных

```bash
# Создайте базу данных
yarn prisma generate
yarn prisma migrate dev

# Заполните тестовыми данными (309 видео!)
yarn prisma db seed
```

✅ **Готово!** База данных создана с 309 видео!

---

## Шаг 6️⃣: Запустите сайт

```bash
yarn dev
```

### Откройте в браузере:
🔗 **http://localhost:3000**

---

## 🔐 Тестовые аккаунты

### Администратор:
- Email: `admin@ssvnauka.com`
- Password: `admin123`

### Хирург:
- Email: `surgeon@ssvnauka.com`
- Password: `surgeon123`

### Студент:
- Email: `student@ssvnauka.com`
- Password: `student123`

---

## ✅ Быстрая проверка

После запуска `yarn dev` вы должны увидеть:

```
ready - started server on 0.0.0.0:3000
info  - Loaded env from .../nextjs_space/.env
event - compiled successfully
```

**Если видите это — всё работает!** 🎉

---

## 🛑 Остановить сайт

Нажмите `Ctrl + C` в терминале

---

## 🔧 Если что-то пошло не так

### "Port 3000 is already in use"

```bash
# Используйте другой порт
PORT=3001 yarn dev
```

Откройте: http://localhost:3001

### "Command not found: yarn"

```bash
npm install -g yarn
```

### "Cannot find module"

```bash
rm -rf node_modules
yarn install
```

### База данных не работает

```bash
rm prisma/dev.db
yarn prisma migrate dev
yarn prisma db seed
```

---

## 📁 Что вы получите

### 📊 Статистика контента:
- **309 видео** из 6 источников
- **219 видео WebSurg** (профессиональные)
- **12 видео GIBLIB** (образовательные)
- **12 видео SAGES** (хирургические общества)
- **12 видео MedTube** (бесплатные)
- **12 видео World Laparoscopy** (лапароскопия)
- **12 видео iLappSurgery** (обучающие модули)

### 🎓 Специальности:
- Абдоминальная хирургия
- Торакальная хирургия
- Колоректальная хирургия
- Эндокринная хирургия
- Бариатрическая хирургия
- Онкологическая хирургия
- Гинекологическая хирургия
- Урологическая хирургия

### ✨ Функции:
- ✅ Просмотр видео
- ✅ Курсы и модули
- ✅ Тесты и сертификаты
- ✅ Отслеживание прогресса
- ✅ Закладки
- ✅ Поиск и фильтры
- ✅ Адаптивный дизайн
- ✅ Темная тема

---

## 💻 Команды для работы

```bash
# Запуск разработки
yarn dev

# Просмотр базы данных
yarn prisma studio

# Пересоздать БД
yarn prisma migrate reset

# Сборка для продакшена
yarn build
yarn start
```

---

## 📚 Полная документация

Если нужны подробности:
- 📖 **DOWNLOAD_INSTRUCTIONS.md** — полная инструкция
- 📖 **GITHUB_SYNC_INSTRUCTIONS.md** — работа с Git
- 📖 **VIDEO_LIBRARY_OPTIMIZATION.md** — оптимизация

---

## 🎯 Краткая шпаргалка

### Полная установка за 2 минуты:

```bash
# 1. Клонируйте
git clone https://github.com/Serg2206/ssvnauka1.git
cd ssvnauka1/nextjs_space

# 2. Установите
yarn install

# 3. Создайте .env
echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
echo 'NEXTAUTH_SECRET="secret"' >> .env
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env

# 4. База данных
yarn prisma generate && yarn prisma migrate dev && yarn prisma db seed

# 5. Запустите
yarn dev
```

**Готово!** → http://localhost:3000

---

## 🌐 Доступ из сети

Хотите открыть сайт на телефоне/планшете?

1. **Узнайте свой IP:**

**Windows:**
```cmd
ipconfig
```
Найдите "IPv4 Address": например, `192.168.1.100`

**Mac/Linux:**
```bash
ifconfig | grep inet
```

2. **На другом устройстве откройте:**
```
http://192.168.1.100:3000
```

(Замените на ваш IP)

---

## 🎥 Видео-инструкция

*[Здесь может быть ссылка на видео-гайд]*

---

## 📞 Нужна помощь?

1. Прочитайте **DOWNLOAD_INSTRUCTIONS.md** (детальная инструкция)
2. Проверьте раздел "Решение проблем"
3. Создайте Issue: https://github.com/Serg2206/ssvnauka1/issues

---

## ⏱️ Сколько времени это займет?

- **Установка Node.js + Git:** 5 минут
- **Скачивание проекта:** 1 минута
- **Установка зависимостей:** 3-5 минут
- **Настройка БД:** 2 минуты
- **Первый запуск:** 1 минута

**Итого:** ~15 минут от начала до запуска! ⚡

---

## 🎨 Скриншоты

### Главная страница:
- 309 видео с уникальными градиентами
- Фильтры по специальностям
- Поиск по названию

### Видеоплеер:
- Встроенный плеер для Vimeo/YouTube
- Ссылки на WebSurg/iLappSurgery
- Информация о продолжительности

### Панель управления:
- Прогресс обучения
- Закладки
- Сертификаты

---

## 🔐 Безопасность

⚠️ **Важно для продакшена:**

1. Смените `NEXTAUTH_SECRET` на уникальный:
```bash
openssl rand -base64 32
```

2. Используйте PostgreSQL вместо SQLite
3. Настройте HTTPS
4. Смените пароли тестовых аккаунтов

---

## 🚀 Что дальше?

После успешного запуска:

1. **Изучите интерфейс:** Войдите под разными аккаунтами
2. **Посмотрите видео:** Протестируйте плеер
3. **Пройдите курс:** Получите сертификат
4. **Настройте под себя:** Измените цвета, логотип
5. **Добавьте контент:** Интегрируйте свои видео

---

## 📊 Системные требования

### Минимум:
- Windows 10, macOS 10.15+, Ubuntu 20.04+
- 4 GB RAM
- 2 GB свободного места
- Node.js 18+

### Рекомендуется:
- 8+ GB RAM
- SSD диск
- Быстрый интернет (для первой установки)

---

## ✅ Чек-лист

- [ ] Node.js установлен
- [ ] Git установлен
- [ ] Проект скачан
- [ ] Зависимости установлены
- [ ] Файл .env создан
- [ ] База данных настроена
- [ ] Сервер запущен
- [ ] Сайт открывается
- [ ] Вход работает

**Все пункты отмечены? Поздравляем! 🎉**

---

## 🎓 Для разработчиков

### Стек технологий:
- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** Prisma ORM + SQLite/PostgreSQL
- **Auth:** NextAuth.js
- **Forms:** React Hook Form
- **State:** React Hooks

### Структура:
```
nextjs_space/
├── app/              # Next.js App Router
├── components/       # React компоненты
├── lib/             # Утилиты
├── prisma/          # База данных
└── public/          # Статика
```

---

**Версия:** 1.0  
**Дата:** 23 ноября 2025  
**Статус:** ✅ Готов к использованию

---

**Удачи! Если что-то непонятно — читайте DOWNLOAD_INSTRUCTIONS.md** 📖
