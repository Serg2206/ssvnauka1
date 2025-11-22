
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BookmarkIcon, TrophyIcon, ClockIcon, CheckCircle2Icon, PlayCircleIcon, FileTextIcon } from 'lucide-react';
import Link from 'next/link';

interface CourseProgress {
  id: string;
  completed: boolean;
  completedAt: string | null;
  course: {
    id: string;
    title: string;
    level: string;
    durationHours: number;
    imageUrl?: string;
  };
}

interface VideoProgress {
  id: string;
  watched: boolean;
  watchedAt: string | null;
  video: {
    id: string;
    title: string;
    durationMinutes: number;
    thumbnailUrl?: string;
  };
}

interface Bookmark {
  id: string;
  createdAt: string;
  course?: {
    id: string;
    title: string;
    level: string;
    imageUrl?: string;
  };
  video?: {
    id: string;
    title: string;
    durationMinutes: number;
    thumbnailUrl?: string;
  };
}

interface Certificate {
  id: string;
  certificateNumber: string;
  issuedAt: string;
  course: {
    id: string;
    title: string;
    level: string;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  
  const [progress, setProgress] = useState<{
    courses: CourseProgress[];
    videos: VideoProgress[];
  }>({ courses: [], videos: [] });
  
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [progressRes, bookmarksRes] = await Promise.all([
        fetch('/api/progress'),
        fetch('/api/bookmarks'),
      ]);

      let progressData = null;
      if (progressRes.ok) {
        progressData = await progressRes.json();
        setProgress(progressData);
      }

      if (bookmarksRes.ok) {
        const bookmarksData = await bookmarksRes.json();
        setBookmarks(bookmarksData);
      }

      // Получить сертификаты для завершенных курсов
      if (progressData) {
        const completedCourses = progressData.courses.filter((c: CourseProgress) => c.completed);
        
        if (completedCourses.length > 0) {
          const certPromises = completedCourses.map((c: CourseProgress) =>
            fetch(`/api/certificate/${c.course.id}`).then(res => res.ok ? res.json() : null)
          );
          
          const certs = await Promise.all(certPromises);
          setCertificates(certs.filter(Boolean));
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка данных...</p>
          </div>
        </div>
      </div>
    );
  }

  const completedCoursesCount = progress.courses.filter(c => c.completed).length;
  const watchedVideosCount = progress.videos.filter(v => v.watched).length;
  const totalLearningHours = progress.courses
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.course.durationHours, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Мой профиль</h1>
        <p className="text-muted-foreground">
          Добро пожаловать, {session?.user?.name || 'Пользователь'}!
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Пройдено курсов</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCoursesCount}</div>
            <p className="text-xs text-muted-foreground">
              из {progress.courses.length} начатых
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Просмотрено видео</CardTitle>
            <PlayCircleIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{watchedVideosCount}</div>
            <p className="text-xs text-muted-foreground">
              из {progress.videos.length} начатых
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Часов обучения</CardTitle>
            <ClockIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLearningHours}</div>
            <p className="text-xs text-muted-foreground">
              завершенных часов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сертификатов</CardTitle>
            <TrophyIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">
              получено
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Вкладки */}
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList>
          <TabsTrigger value="progress">Прогресс обучения</TabsTrigger>
          <TabsTrigger value="bookmarks">Закладки ({bookmarks.length})</TabsTrigger>
          <TabsTrigger value="certificates">Сертификаты ({certificates.length})</TabsTrigger>
        </TabsList>

        {/* Прогресс обучения */}
        <TabsContent value="progress" className="space-y-6">
          {progress.courses.length === 0 && progress.videos.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет активного обучения</h3>
                  <p className="text-muted-foreground mb-4">
                    Начните изучать курсы и смотреть видео
                  </p>
                  <Link href="/courses">
                    <Button>Перейти к курсам</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {progress.courses.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Курсы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {progress.courses.map((item) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base mb-2">
                                {item.course.title}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge variant={item.completed ? 'default' : 'secondary'}>
                                  {item.course.level}
                                </Badge>
                                {item.completed && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                                    Завершено
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                <span>Прогресс</span>
                                <span>{item.completed ? '100' : '50'}%</span>
                              </div>
                              <Progress value={item.completed ? 100 : 50} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {item.course.durationHours} часов
                              </span>
                              <Link href={`/courses/${item.course.id}`}>
                                <Button variant="outline" size="sm">
                                  {item.completed ? 'Просмотреть' : 'Продолжить'}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {progress.videos.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Видео</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {progress.videos.slice(0, 6).map((item) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <CardTitle className="text-sm line-clamp-2">
                            {item.video.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {item.video.durationMinutes} мин
                            </span>
                            {item.watched && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle2Icon className="h-3 w-3 mr-1" />
                                Просмотрено
                              </Badge>
                            )}
                          </div>
                          <Link href={`/videos/${item.video.id}`}>
                            <Button variant="outline" size="sm" className="w-full mt-3">
                              {item.watched ? 'Пересмотреть' : 'Продолжить'}
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Закладки */}
        <TabsContent value="bookmarks">
          {bookmarks.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет закладок</h3>
                  <p className="text-muted-foreground">
                    Добавьте интересные курсы и видео в закладки
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((bookmark) => (
                <Card key={bookmark.id}>
                  <CardHeader>
                    <CardTitle className="text-base line-clamp-2">
                      {bookmark.course?.title || bookmark.video?.title}
                    </CardTitle>
                    <CardDescription>
                      {bookmark.course && (
                        <Badge variant="secondary">{bookmark.course.level}</Badge>
                      )}
                      {bookmark.video && (
                        <span className="text-sm">{bookmark.video.durationMinutes} мин</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={
                        bookmark.course
                          ? `/courses/${bookmark.course.id}`
                          : `/videos/${bookmark.video?.id}`
                      }
                    >
                      <Button variant="outline" className="w-full">
                        Открыть
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Сертификаты */}
        <TabsContent value="certificates">
          {certificates.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <TrophyIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет сертификатов</h3>
                  <p className="text-muted-foreground mb-4">
                    Завершите курсы и пройдите тесты, чтобы получить сертификаты
                  </p>
                  <Link href="/courses">
                    <Button>Начать обучение</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <Card key={cert.id} className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <TrophyIcon className="h-8 w-8 text-yellow-600" />
                      <Badge variant="outline" className="bg-white">
                        {cert.course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-4">
                      {cert.course.title}
                    </CardTitle>
                    <CardDescription>
                      Сертификат № {cert.certificateNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Получен: {new Date(cert.issuedAt).toLocaleDateString('ru-RU')}
                      </span>
                      <Link href={`/certificate/${cert.course.id}`}>
                        <Button variant="default" size="sm">
                          Просмотреть
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
