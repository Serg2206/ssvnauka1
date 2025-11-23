
# 📊 JSON-LD Структурированные данные - Документация

## 📌 Обзор интеграции

**Дата внедрения:** 23 ноября 2025  
**Цель:** Улучшение SEO и отображения в поисковых системах  
**Стандарт:** Schema.org  
**Формат:** JSON-LD

---

## ✅ Что было внедрено

### 1. **MedicalOrganization** (на всех страницах)
Базовая информация об организации SSV Наука размещается в `layout.tsx` и доступна на всех страницах сайта.

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "SSV Наука",
  "url": "https://ssvnauka-platform.abacusai.app",
  "logo": "https://ssvnauka-platform.abacusai.app/favicon.svg",
  "email": "info@ssvnauka.com",
  "founder": {
    "@type": "Person",
    "name": "Сушков Сергей Валентинович",
    "jobTitle": "профессор, онкохирург, заместитель директора по научной работе"
  },
  "sameAs": [
    "https://ssvnauka-platform.abacusai.app",
    "https://t.me/ssvproff"
  ],
  "description": "Профессиональное медицинское образование — видеоуроки и материалы по хирургии и онкохирургии."
}
```

---

### 2. **WebSite** (главная страница)
Структура сайта с функцией поиска, размещается на главной странице.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SSV Наука — платформа",
  "url": "https://ssvnauka-platform.abacusai.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ssvnauka-platform.abacusai.app/videos?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 3. **VideoObject** (страницы видео)
Детальная информация о каждом видео с метаданными.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Миниинвазивная хирургия рака пищеводно-желудочного перехода",
  "description": "Видеозапись профессионального вебинара...",
  "thumbnailUrl": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
  "uploadDate": "2025-11-23",
  "duration": "PT212M",
  "contentUrl": "https://www.youtube.com/live/2_w8wue5bqk",
  "embedUrl": "https://ssvnauka-platform.abacusai.app/videos/[ID]",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "WatchAction" },
    "userInteractionCount": 4400
  },
  "publisher": {
    "@type": "Organization",
    "name": "SSV Наука",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ssvnauka-platform.abacusai.app/favicon.svg"
    }
  },
  "author": {
    "@type": "Person",
    "name": "4SURGEONSCLUB - Школа хирургической онкологии"
  },
  "contributor": {
    "@type": "Organization",
    "name": "4SURGEONSCLUB - School of Surgical Oncology"
  }
}
```

---

### 4. **Course** (страницы курсов)
Информация об образовательных курсах.

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Курс: Рак желудка — практика для хирургов",
  "description": "Практические видео и рекомендации по хирургическому лечению рака желудка.",
  "url": "https://ssvnauka-platform.abacusai.app/courses/[ID]",
  "inLanguage": "ru",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "SSV Наука",
    "sameAs": "https://ssvnauka-platform.abacusai.app"
  },
  "timeRequired": "PT60M"
}
```

---

### 5. **MedicalWebPage (Article)** (страницы статей)
Медицинские статьи и образовательные материалы.

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ssvnauka-platform.abacusai.app/articles/[ID]"
  },
  "headline": "Рекомендации по хирургическому лечению рака желудка",
  "description": "Краткий обзор современных подходов...",
  "image": "https://ssvnauka-platform.abacusai.app/og-image.png",
  "author": {
    "@type": "Person",
    "name": "Сушков Сергей Валентинович"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SSV Наука",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ssvnauka-platform.abacusai.app/favicon.svg"
    }
  },
  "datePublished": "2025-03-01",
  "dateModified": "2025-10-10",
  "inLanguage": "ru",
  "reviewedBy": {
    "@type": "Person",
    "name": "Сушков Сергей Валентинович"
  }
}
```

---

### 6. **BreadcrumbList** (навигация)
Хлебные крошки для улучшения навигации в поисковой выдаче.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://ssvnauka-platform.abacusai.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Видео",
      "item": "https://ssvnauka-platform.abacusai.app/videos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Название видео",
      "item": "https://ssvnauka-platform.abacusai.app/videos/[ID]"
    }
  ]
}
```

---

## 📁 Структура файлов

### Утилита генерации JSON-LD
**Файл:** `/lib/json-ld.ts`

Содержит функции для генерации структурированных данных:
- `generateOrganizationLD()` - информация об организации
- `generateWebSiteLD()` - данные о сайте
- `generateVideoLD(video)` - данные о видео
- `generateCourseLD(course)` - данные о курсе
- `generateArticleLD(article)` - данные о статье
- `generateBreadcrumbLD(items)` - навигационные крошки
- `jsonLdScriptProps(schema)` - хелпер для вставки в HTML

### Интеграция в страницы

| Страница | Файл | JSON-LD типы |
|----------|------|--------------|
| Главная | `/app/page.tsx` | WebSite |
| Layout | `/app/layout.tsx` | MedicalOrganization |
| Видео | `/app/videos/[id]/page.tsx` | VideoObject, BreadcrumbList |
| Курс | `/app/courses/[id]/page.tsx` | Course, BreadcrumbList |
| Статья | `/app/articles/[id]/page.tsx` | MedicalWebPage, BreadcrumbList |

---

## 🔧 Как использовать

### Автоматическая генерация (текущая реализация)

JSON-LD автоматически генерируется на каждой странице на основе данных из базы данных. Никаких дополнительных действий не требуется.

### Ручная настройка (при необходимости)

Если нужно добавить JSON-LD на новую страницу:

```typescript
import { generateVideoLD, jsonLdScriptProps } from '@/lib/json-ld';

export default function MyPage() {
  const videoLD = generateVideoLD(videoData);
  
  return (
    <>
      <script {...jsonLdScriptProps(videoLD)} />
      <div>Контент страницы</div>
    </>
  );
}
```

---

## ✅ Проверка и валидация

### Инструменты для проверки:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Проверяет корректность JSON-LD и отображение в поиске

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Валидирует соответствие стандарту Schema.org

3. **Google Search Console**
   - Отслеживайте индексацию и ошибки структурированных данных
   - URL: https://search.google.com/search-console

### Как проверить:

1. Откройте страницу сайта
2. Просмотрите исходный код (Ctrl+U)
3. Найдите теги `<script type="application/ld+json">`
4. Скопируйте JSON и проверьте в валидаторе

---

## 📊 Примеры реальных данных

### Пример 1: Видео WebSurg

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Тотальная лапароскопическая гастрэктомия с расширенной лимфодиссекцией D2",
  "description": "Демонстрация техники тотальной лапароскопической гастрэктомии...",
  "thumbnailUrl": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
  "uploadDate": "2025-11-23",
  "duration": "PT45M",
  "contentUrl": "https://websurg.com/doi/vd01en3450/",
  "embedUrl": "https://ssvnauka-platform.abacusai.app/videos/clq123456",
  "publisher": {
    "@type": "Organization",
    "name": "SSV Наука",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ssvnauka-platform.abacusai.app/favicon.svg"
    }
  },
  "author": {
    "@type": "Person",
    "name": "Jacques Marescaux"
  },
  "contributor": {
    "@type": "Organization",
    "name": "IRCAD - WebSurg"
  }
}
```

### Пример 2: Образовательный курс

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Абдоминальная онкология: от диагностики до реабилитации",
  "description": "Комплексный курс по современным методам диагностики и лечения абдоминальных злокачественных новообразований...",
  "url": "https://ssvnauka-platform.abacusai.app/courses/clp987654",
  "inLanguage": "ru",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "SSV Наука",
    "sameAs": "https://ssvnauka-platform.abacusai.app"
  },
  "timeRequired": "PT120M"
}
```

---

## 🎯 Преимущества внедрения

### Для SEO:
- ✅ Улучшенное отображение в результатах поиска (rich snippets)
- ✅ Более высокая кликабельность (CTR)
- ✅ Лучшее понимание контента поисковыми системами
- ✅ Возможность попадания в специализированные карусели Google

### Для пользователей:
- ✅ Больше информации в поисковой выдаче
- ✅ Видимость длительности видео
- ✅ Отображение рейтингов и отзывов (при наличии)
- ✅ Хлебные крошки в выдаче

---

## 📝 Следующие шаги

### Рекомендуется добавить:

1. **Rating и Review**
   - Отзывы пользователей для видео и курсов
   - Рейтинги качества контента

2. **Event**
   - Информация о вебинарах и онлайн-мероприятиях

3. **FAQPage**
   - Структурированные FAQ для попадания в блок "Люди также спрашивают"

4. **HowTo**
   - Пошаговые руководства по хирургическим техникам

---

## 🔄 Поддержка и обновление

### Автоматическое обновление:
JSON-LD автоматически обновляется при изменении данных в базе:
- Новое видео → автоматически получает JSON-LD
- Обновление курса → JSON-LD обновляется
- Новая статья → JSON-LD генерируется автоматически

### Мониторинг:
- Регулярно проверяйте Google Search Console
- Отслеживайте ошибки структурированных данных
- Проверяйте новые страницы через Rich Results Test

---

## 📚 Дополнительные ресурсы

- **Schema.org Documentation:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search/docs/appearance/structured-data
- **JSON-LD Playground:** https://json-ld.org/playground/

---

**Версия документа:** 1.0  
**Дата создания:** 23 ноября 2025  
**Статус:** Активно, внедрено в production  
**Автор:** SSV Nauka Development Team

---

## 📞 Техническая поддержка

При возникновении вопросов или проблем с JSON-LD:
1. Проверьте синтаксис в валидаторе
2. Убедитесь, что все URL корректны
3. Проверьте формат дат (ISO 8601)
4. Проверьте формат длительности (ISO 8601 duration)

**Контакт:** info@ssvnauka.com
