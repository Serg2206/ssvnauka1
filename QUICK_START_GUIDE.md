
# 🚀 Быстрый старт - Загрузка SSV Nauka на GitHub

## 📋 Пошаговая инструкция для Windows 11

### Шаг 1: Скачайте проект 📥

1. В интерфейсе DeepAgent нажмите кнопку **"Files"** (справа вверху)
2. Найдите папку `/home/ubuntu/ssvnauka`
3. Скачайте всю папку или файл `ssvnauka-project.tar.gz`
4. Распакуйте в `C:\Projects\ssvnauka\`

**Структура после распаковки:**
```
C:\Projects\ssvnauka\
├── nextjs_space\          ← Основной проект
├── PUSH_TO_GITHUB.bat     ← Скрипт для Windows
├── PUSH_TO_GITHUB.sh      ← Скрипт для Mac/Linux
└── README.md              ← Документация
```

---

### Шаг 2: Создайте Personal Access Token 🔑

**Это ОБЯЗАТЕЛЬНЫЙ шаг!** GitHub больше не принимает обычные пароли.

1. **Откройте:** https://github.com/settings/tokens
2. **Нажмите:** "Generate new token" → "Generate new token (classic)"
3. **Настройте токен:**
   - **Note:** `SSV Nauka Deploy`
   - **Expiration:** 90 days (или на ваш выбор)
   - **Scopes:** Отметьте **✅ repo** (полный доступ к репозиториям)
4. **Скопируйте токен!** ⚠️ Он больше не будет показан!

**Сохраните токен в надежное место** (например, в Notepad)

---

### Шаг 3: Запустите автоматический скрипт 🎯

#### Вариант A: Через двойной клик (проще всего)

1. Откройте папку `C:\Projects\ssvnauka\`
2. **Дважды кликните** на файл `PUSH_TO_GITHUB.bat`
3. Следуйте инструкциям в окне:
   - Подтвердите загрузку: введите `y` и нажмите Enter
   - Username: `Serg2206-`
   - Password: **вставьте ваш Personal Access Token**
4. Готово! ✅

#### Вариант B: Через PowerShell

```powershell
# 1. Откройте PowerShell (Win + X → Windows Terminal)
cd C:\Projects\ssvnauka

# 2. Запустите скрипт
.\PUSH_TO_GITHUB.bat
```

#### Вариант C: Ручная загрузка (если скрипт не работает)

```powershell
cd C:\Projects\ssvnauka\nextjs_space

# Инициализация Git
git init
git add -A
git commit -m "SSV Nauka educational platform"
git branch -M main

# Подключение к GitHub
git remote add origin https://github.com/Serg2206-/ssvnauka.git

# Загрузка (заменит старое содержимое)
git push -f origin main
```

---

### Шаг 4: Проверьте результат ✅

1. **Откройте:** https://github.com/Serg2206-/ssvnauka
2. **Проверьте:**
   - ✅ Видите 100 файлов
   - ✅ README.md отображается на главной странице
   - ✅ Есть папки: app, components, lib, prisma
   - ✅ Последний коммит: "SSV Nauka educational platform"

---

## 🔧 Если что-то пошло не так

### Проблема 1: "Git не найден"
```powershell
# Установите Git:
# https://git-scm.com/downloads
```

### Проблема 2: "Permission denied" или "Authentication failed"
- ✅ Используйте **Personal Access Token**, а не пароль!
- ✅ Убедитесь, что токен имеет scope: **repo**
- ✅ Токен должен быть **активным** (не истёк)

### Проблема 3: "Remote already exists"
```powershell
cd C:\Projects\ssvnauka\nextjs_space
git remote remove origin
git remote add origin https://github.com/Serg2206-/ssvnauka.git
git push -f origin main
```

### Проблема 4: Скрипт не запускается
- ✅ Убедитесь, что файл `.bat` не заблокирован Windows
- ✅ Правой кнопкой → Properties → Unblock → Apply
- ✅ Попробуйте запустить PowerShell от имени администратора

---

## 📊 Что будет загружено на GitHub

### ✅ Включено (100 файлов):
- Весь исходный код приложения
- React компоненты (80+)
- API endpoints (14 маршрутов)
- Prisma схема базы данных
- README.md документация
- package.json с зависимостями
- Конфигурационные файлы

### ❌ Исключено (безопасность):
- `.env` файл (секретные ключи)
- `node_modules/` (30,000+ файлов)
- `.next/` (временная сборка)
- Логи и временные файлы

---

## 🎯 Следующие шаги после загрузки

### 1. Настройте локальную разработку
```powershell
cd C:\Projects\ssvnauka\nextjs_space

# Установите зависимости
yarn install

# Создайте .env.local файл
# (скопируйте из .env и измените DATABASE_URL)

# Запустите проект
yarn dev
```

Откройте: http://localhost:3000

### 2. Задеплойте на Vercel (рекомендуется)
1. **Откройте:** https://vercel.com/new
2. **Импортируйте:** https://github.com/Serg2206-/ssvnauka
3. **Настройте переменные окружения:**
   - `DATABASE_URL` - строка подключения к PostgreSQL
   - `NEXTAUTH_SECRET` - случайная строка (минимум 32 символа)
   - `NEXTAUTH_URL` - URL вашего сайта
4. **Deploy** - автоматический деплой при каждом push!

### 3. Добавьте коллаборантов
- Settings → Collaborators
- Пригласите членов команды

### 4. Настройте Issues и Projects
- Отслеживайте задачи
- Планируйте новые функции

---

## 📞 Поддержка

### Полезные ссылки:
- 📖 GitHub Personal Access Token: https://github.com/settings/tokens
- 📖 Git документация: https://git-scm.com/doc
- 📖 Vercel деплой: https://vercel.com/docs
- 📖 Next.js документация: https://nextjs.org/docs

### Если нужна помощь:
1. Проверьте раздел "Если что-то пошло не так" выше
2. Убедитесь, что Git установлен: `git --version`
3. Проверьте, что Personal Access Token активен
4. Убедитесь в наличии интернет соединения

---

## ✅ Чек-лист финальной проверки

- [ ] Git установлен (`git --version`)
- [ ] Проект скачан в `C:\Projects\ssvnauka\`
- [ ] Personal Access Token создан (scope: repo)
- [ ] Скрипт `PUSH_TO_GITHUB.bat` запущен
- [ ] Введены учетные данные (username + token)
- [ ] Репозиторий доступен: https://github.com/Serg2206-/ssvnauka
- [ ] README.md отображается корректно
- [ ] Все файлы загружены (100 файлов)

---

## 🎉 Поздравляем!

Ваш проект **SSV Nauka** теперь на GitHub! 🚀

**Репозиторий:** https://github.com/Serg2206-/ssvnauka

**Статистика:**
- 📦 100 файлов
- 📝 11,898 строк кода
- 📚 15 интерактивных курсов
- 🎥 30 видео операций
- ✍️ 75 тестовых вопросов
- 🏆 Система сертификации
- 📊 Dashboard с прогрессом
- 🔖 Система закладок

**Время на загрузку:** ~3-5 минут

---

**Удачи в разработке!** 💙
