
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

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
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">
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
