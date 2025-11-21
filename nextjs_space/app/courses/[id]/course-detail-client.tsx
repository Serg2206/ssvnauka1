
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Clock, ArrowLeft, CheckCircle, BookmarkIcon, Trophy, BookmarkCheckIcon } from 'lucide-react';
import { CourseLevel } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  durationHours: number;
  imageUrl?: string | null;
}

export default function CourseDetailClient({ course }: { course: Course }) {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [session, course.id]);

  const fetchUserData = async () => {
    try {
      const [bookmarksRes, progressRes, certRes] = await Promise.all([
        fetch('/api/bookmarks'),
        fetch('/api/progress'),
        fetch(`/api/certificate/${course.id}`),
      ]);

      if (bookmarksRes.ok) {
        const bookmarks = await bookmarksRes.json();
        const bookmark = bookmarks.find((b: any) => b.courseId === course.id);
        if (bookmark) {
          setIsBookmarked(true);
          setBookmarkId(bookmark.id);
        }
      }

      if (progressRes.ok) {
        const progress = await progressRes.json();
        const courseProgress = progress.courses.find((c: any) => c.courseId === course.id);
        if (courseProgress?.completed) {
          setIsCompleted(true);
        }
      }

      if (certRes.ok) {
        setHasCertificate(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!session) {
      toast.error('Пожалуйста, войдите в систему');
      return;
    }

    try {
      if (isBookmarked) {
        const res = await fetch(`/api/bookmarks?id=${bookmarkId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setIsBookmarked(false);
          setBookmarkId(null);
          toast.success('Закладка удалена');
        }
      } else {
        const res = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId: course.id }),
        });

        if (res.ok) {
          const data = await res.json();
          setIsBookmarked(true);
          setBookmarkId(data.id);
          toast.success('Добавлено в закладки');
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Произошла ошибка');
    }
  };

  const startQuiz = () => {
    if (!session) {
      toast.error('Пожалуйста, войдите в систему');
      return;
    }
    router.push(`/quiz/${course.id}`);
  };

  const viewCertificate = () => {
    router.push(`/certificate/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Вернуться к курсам</span>
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-blue-100">
            {course.imageUrl && (
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  {getLevelLabel(course.level)}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={18} />
                  <span>{course.durationHours} часов</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Завершено</span>
                  </div>
                )}
              </div>
              {!loading && session && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleBookmark}
                  className={isBookmarked ? 'bg-blue-50 border-blue-200' : ''}
                >
                  {isBookmarked ? (
                    <BookmarkCheckIcon className="h-5 w-5 text-blue-600" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-6">{course.title}</h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Что вы изучите</h2>
              <ul className="space-y-3">
                {getCourseBenefits(course.level).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {session && (
              <div className="mt-8 flex gap-4">
                {hasCertificate ? (
                  <Button onClick={viewCertificate} size="lg" className="flex-1">
                    <Trophy className="mr-2 h-5 w-5" />
                    Просмотреть сертификат
                  </Button>
                ) : (
                  <Button onClick={startQuiz} size="lg" className="flex-1">
                    {isCompleted ? 'Пройти тест повторно' : 'Начать тест'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getLevelLabel(level: CourseLevel) {
  const labels = {
    BASIC: 'Базовый уровень',
    ADVANCED: 'Продвинутый уровень',
    EXPERT: 'Экспертный уровень',
  };
  return labels[level] || level;
}

function getCourseBenefits(level: CourseLevel) {
  const benefits = {
    BASIC: [
      'Фундаментальные принципы и техники',
      'Анатомические основы и топография',
      'Базовые хирургические навыки',
      'Подготовка к практическим занятиям',
    ],
    ADVANCED: [
      'Современные хирургические техники',
      'Управление типичными осложнениями',
      'Лапароскопические методы',
      'Клинические случаи и разборы',
    ],
    EXPERT: [
      'Сложные и расширенные вмешательства',
      'Роботизированная хирургия',
      'Управление редкими осложнениями',
      'Современные исследования и инновации',
    ],
  };
  return benefits[level] || [];
}
