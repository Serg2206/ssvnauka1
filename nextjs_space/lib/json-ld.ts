
/**
 * Утилиты для генерации JSON-LD структурированных данных
 * Используется для улучшения SEO и отображения в поисковых системах
 */

import type { Video, Course, Article } from '@prisma/client';

const SITE_URL = process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app';
const SITE_NAME = 'SSV Наука';
const SITE_LOGO = `${SITE_URL}/favicon.svg`;

/**
 * Базовая организация (MedicalOrganization)
 * Используется на всех страницах сайта
 */
export function generateOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    email: 'info@ssvnauka.com',
    founder: {
      '@type': 'Person',
      name: 'Сушков Сергей Валентинович',
      jobTitle: 'профессор, онкохирург, заместитель директора по научной работе',
    },
    sameAs: [
      SITE_URL,
      'https://t.me/ssvproff',
    ],
    description: 'Профессиональное медицинское образование — видеоуроки и материалы по хирургии и онкохирургии.',
  };
}

/**
 * WebSite структура
 * Используется на главной странице
 */
export function generateWebSiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_NAME} — платформа`,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/videos?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Breadcrumb для навигации
 */
export function generateBreadcrumbLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Course структура
 * Используется на страницах курсов
 */
export function generateCourseLD(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/courses/${course.id}`,
    inLanguage: 'ru',
    provider: {
      '@type': 'MedicalOrganization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    ...(course.durationHours && {
      timeRequired: `PT${course.durationHours}H`,
    }),
  };
}

/**
 * VideoObject структура
 * Используется на страницах видео
 */
export function generateVideoLD(video: Video & { viewCount?: number }) {
  const duration = video.durationMinutes
    ? `PT${video.durationMinutes}M`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl || `${SITE_URL}/og-image.png`,
    uploadDate: video.createdAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    ...(duration && { duration }),
    contentUrl: video.videoUrl,
    embedUrl: `${SITE_URL}/videos/${video.id}`,
    ...(video.viewCount && {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: video.viewCount,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    ...(video.author && {
      author: {
        '@type': 'Person',
        name: video.author,
      },
    }),
    ...(video.clinic && {
      contributor: {
        '@type': 'Organization',
        name: video.clinic,
      },
    }),
  };
}

/**
 * Article структура
 * Используется на страницах статей
 */
export function generateArticleLD(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.id}`,
    },
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Person',
      name: 'Сушков Сергей Валентинович',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    datePublished: article.publishedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    dateModified: article.updatedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    inLanguage: 'ru',
    reviewedBy: {
      '@type': 'Person',
      name: 'Сушков Сергей Валентинович',
    },
  };
}

/**
 * Генерация объединённого JSON-LD с @graph
 * Используется когда нужно добавить несколько структур на одну страницу
 */
export function generateCombinedLD(...schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Хелпер для встраивания JSON-LD в HTML
 */
export function jsonLdScriptProps(schema: any) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  };
}
