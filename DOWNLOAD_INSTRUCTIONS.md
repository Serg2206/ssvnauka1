
# 📥 Инструкция по сохранению проекта на Windows 11

## Вариант 1: Скачать через веб-интерфейс (проще)

### Шаг 1: Скачать проект как ZIP
1. В текущем интерфейсе DeepAgent найдите кнопку **"Files"** (обычно в верхнем правом углу)
2. Откроется файловый менеджер с проектом `/home/ubuntu/ssvnauka`
3. Нажмите правой кнопкой на папку `nextjs_space` → **Download** или **Download as ZIP**
4. Сохраните архив на вашем компьютере (например, в `C:\Projects\`)

### Шаг 2: Распаковать архив
1. Откройте скачанный ZIP-файл
2. Извлеките содержимое в папку `C:\Projects\ssvnauka\`
3. У вас должна получиться структура:
   ```
   C:\Projects\ssvnauka\
   └── nextjs_space\
       ├── app\
       ├── components\
       ├── prisma\
       ├── package.json
       └── ...
   ```

---

## Вариант 2: Через командную строку (для опытных пользователей)

### Предварительные требования:
- Установлен **Node.js** (v18+): https://nodejs.org/
- Установлен **Git**: https://git-scm.com/downloads
- Установлен **PostgreSQL** (опционально, если нужна локальная БД)

### Шаг 1: Открыть PowerShell или Command Prompt
```powershell
# Нажмите Win + X и выберите "Windows Terminal" или "PowerShell"
```

### Шаг 2: Перейти в нужную директорию
```powershell
cd C:\Projects\
mkdir ssvnauka
cd ssvnauka
```

### Шаг 3: Создать файлы проекта
Скопируйте файлы через веб-интерфейс (Вариант 1) или используйте SCP/SFTP клиент.

---

## Вариант 3: Использовать SCP (для продвинутых пользователей)

### Требования:
- Установлен **OpenSSH** (встроен в Windows 10/11)
- Есть SSH доступ к серверу DeepAgent

### Команда:
```powershell
# Замените <your-server> на адрес сервера
scp -r ubuntu@<your-server>:/home/ubuntu/ssvnauka/nextjs_space C:\Projects\ssvnauka\
```

---

## После сохранения проекта локально:

### 1. Установить зависимости
```powershell
cd C:\Projects\ssvnauka\nextjs_space
npm install
# или
yarn install
```

### 2. Настроить переменные окружения
Создайте файл `.env.local` в корне проекта:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ssvnauka"
NEXTAUTH_SECRET="ваш-секретный-ключ-минимум-32-символа"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Запустить проект локально
```powershell
npm run dev
# или
yarn dev
```

Откройте браузер: http://localhost:3000

---

## ⚠️ Важные файлы для сохранения:

**Обязательно скачайте:**
- ✅ Всю папку `nextjs_space/` (содержит весь код)
- ✅ Файл `.env` (но НЕ загружайте его на GitHub!)
- ✅ Файл `package.json` (зависимости)
- ✅ Файл `prisma/schema.prisma` (схема БД)

**НЕ загружайте на GitHub:**
- ❌ `.env` и `.env.local` (содержат секретные ключи)
- ❌ `node_modules/` (слишком большая папка)
- ❌ `.next/` и `.build/` (временные файлы сборки)

---

## 📦 Структура проекта после сохранения:

```
C:\Projects\ssvnauka\
└── nextjs_space\
    ├── app\                    # Страницы и API routes
    │   ├── api\
    │   ├── courses\
    │   ├── dashboard\
    │   ├── quiz\
    │   └── certificate\
    ├── components\             # React компоненты
    ├── lib\                    # Утилиты и конфигурация
    ├── prisma\                 # База данных
    │   └── schema.prisma
    ├── public\                 # Статические файлы
    ├── scripts\                # Скрипты (seed.ts)
    ├── .env                    # Переменные окружения (НЕ для GitHub!)
    ├── package.json            # Зависимости
    ├── next.config.js          # Конфигурация Next.js
    └── README.md               # Документация
```

---

## 🆘 Помощь:

Если возникли проблемы:
1. Убедитесь, что Node.js установлен: `node --version`
2. Убедитесь, что yarn/npm работает: `npm --version`
3. Проверьте права доступа к папкам
4. Проверьте, что порт 3000 свободен

---

## Следующий шаг:
После сохранения проекта локально, переходите к инструкции **GITHUB_UPLOAD_INSTRUCTIONS.md** для загрузки на GitHub!
