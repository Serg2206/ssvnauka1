
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Trophy, Award } from 'lucide-react';
import Link from 'next/link';

interface Certificate {
  id: string;
  certificateNumber: string;
  issuedAt: string;
  course: {
    id: string;
    title: string;
    level: string;
  };
  user: {
    name?: string;
    email: string;
  };
}

export default function CertificatePage({ params }: { params: { courseId: string } }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchCertificate();
    }
  }, [status, params.courseId, router]);

  const fetchCertificate = async () => {
    try {
      const res = await fetch(`/api/certificate/${params.courseId}`);
      
      if (res.ok) {
        const data = await res.json();
        setCertificate(data);
      } else {
        console.error('Certificate not found');
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificateRef.current) {
      // В реальном проекте здесь бы был экспорт в PDF
      // Для упрощения просто откроем окно печати
      window.print();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка сертификата...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="text-center py-12 px-4">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Сертификат недоступен</h3>
            <p className="text-muted-foreground mb-4">
              Завершите курс и пройдите тест, чтобы получить сертификат.
            </p>
            <Link href={`/courses/${params.courseId}`}>
              <Button>Вернуться к курсу</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft size={20} />
            <span>Вернуться к профилю</span>
          </Link>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Скачать / Печать
          </Button>
        </div>

        <div
          ref={certificateRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none"
        >
          {/* Декоративная рамка */}
          <div className="border-8 border-double border-yellow-400">
            <div className="p-12 bg-gradient-to-br from-white via-blue-50 to-white">
              {/* Заголовок */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Award className="h-20 w-20 text-yellow-500" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                  СЕРТИФИКАТ О ПРОХОЖДЕНИИ КУРСА
                </h1>
                <div className="h-1 w-32 bg-yellow-400 mx-auto rounded-full"></div>
              </div>

              {/* Основной текст */}
              <div className="text-center mb-8">
                <p className="text-lg text-slate-600 mb-6">
                  Настоящим подтверждается, что
                </p>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                  {certificate.user.name || 'Участник'}
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  успешно завершил(а) курс
                </p>
                <h3 className="text-2xl font-semibold text-slate-800 mb-6 max-w-3xl mx-auto">
                  {certificate.course.title}
                </h3>
                <p className="text-base text-slate-500 mb-4">
                  Уровень: <span className="font-semibold">{getLevelLabel(certificate.course.level)}</span>
                </p>
              </div>

              {/* Детали сертификата */}
              <div className="border-t border-slate-200 pt-8 mt-8">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Дата выдачи</p>
                    <p className="font-semibold text-slate-700">{issuedDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Номер сертификата</p>
                    <p className="font-semibold text-slate-700">{certificate.certificateNumber}</p>
                  </div>
                </div>
              </div>

              {/* Подпись и печать (декоративные) */}
              <div className="mt-12 flex justify-center items-center gap-16">
                <div className="text-center">
                  <div className="h-16 border-b-2 border-slate-300 w-48 mb-2"></div>
                  <p className="text-sm text-slate-600">Директор SSV Наука</p>
                </div>
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-yellow-50">
                    <Trophy className="h-12 w-12 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Футер */}
              <div className="mt-12 text-center">
                <p className="text-sm text-slate-500">
                  SSV Наука — Международная платформа профессионального медицинского образования
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  ssvnauka.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительные действия */}
        <div className="mt-8 text-center print:hidden">
          <p className="text-slate-600 mb-4">
            Поделитесь своим достижением с коллегами!
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/courses/${certificate.course.id}`}>
              <Button variant="outline">
                Вернуться к курсу
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="default">
                Изучить другие курсы
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLevelLabel(level: string) {
  const labels: Record<string, string> = {
    BASIC: 'Базовый',
    ADVANCED: 'Продвинутый',
    EXPERT: 'Экспертный',
  };
  return labels[level] || level;
}
