
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { BookOpen, Video, FileText, Users, LogIn, LogOut, UserCircle } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession() || {};
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              SSV
            </div>
            <span>SSV Наука</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/courses')
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen size={18} />
              <span>Курсы</span>
            </Link>
            <Link
              href="/videos"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/videos')
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Video size={18} />
              <span>Видеотека</span>
            </Link>
            <Link
              href="/articles"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/articles')
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText size={18} />
              <span>Статьи</span>
            </Link>
            <Link
              href="/patients"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/patients')
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users size={18} />
              <span>Для пациентов</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                  <UserCircle size={18} />
                  <span>{session.user.name || session.user.email}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Выход</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <LogIn size={18} />
                <span>Вход</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
