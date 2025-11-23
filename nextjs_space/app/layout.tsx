
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import { Providers } from '@/components/providers';
import { generateOrganizationLD, jsonLdScriptProps } from '@/lib/json-ld';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'SSV Наука - Образовательная платформа для хирургов',
  description: 'Профессиональная образовательная платформа для хирургов. Курсы, видеоматериалы, статьи и ресурсы для непрерывного медицинского образования.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'SSV Наука - Образовательная платформа для хирургов',
    description: 'Профессиональная образовательная платформа для хирургов',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationLD = generateOrganizationLD();

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script {...jsonLdScriptProps(organizationLD)} />
      </head>
      <body className={inter.className}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Перейти к основному содержанию
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <footer className="bg-slate-900 text-white py-8 mt-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-slate-400">© 2024 SSV Наука. Образовательная платформа для хирургов.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
