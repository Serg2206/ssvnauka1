
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Video as VideoIcon, ArrowLeft, User, Building, ExternalLink, Lock, GraduationCap, Film, Play } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SurgicalMethod, Difficulty } from '@/lib/types';
import { generateVideoLD, generateBreadcrumbLD, jsonLdScriptProps } from '@/lib/json-ld';

export const dynamic = 'force-dynamic';

async function getVideo(id: string) {
  const video = await prisma.video.findUnique({
    where: { id },
  });

  return video;
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideo(params?.id);

  if (!video) {
    notFound();
  }

  const videoLD = generateVideoLD(video);
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'Главная', url: process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app' },
    { name: 'Видео', url: `${process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app'}/videos` },
    { name: video.title, url: `${process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app'}/videos/${video.id}` },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(videoLD)} />
      <script {...jsonLdScriptProps(breadcrumbLD)} />
      <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Вернуться к видеотеке</span>
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Video Player */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
            {video.videoUrl ? (
              video.videoUrl.includes('websurg.com') ? (
                // WebSurg External Link Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 backdrop-blur-sm rounded-full border-2 border-blue-400/50">
                      <Lock className="text-blue-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Профессиональное видео WebSurg
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Это видео доступно на платформе WebSurg. <br/>
                      Требуется подписка WebSurg для просмотра.
                    </p>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Открыть на WebSurg
                    </a>
                    <p className="text-sm text-slate-400 mt-4">
                      <Lock size={14} className="inline mr-1" />
                      Откроется в новой вкладке
                    </p>
                  </div>
                </div>
              ) : video.videoUrl.includes('ilappsurgery.com') ? (
                // iLappSurgery External Link Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/70 to-emerald-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-emerald-600/20 backdrop-blur-sm rounded-full border-2 border-emerald-400/50">
                      <VideoIcon className="text-emerald-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Бесплатный образовательный модуль iLappSurgery
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Интерактивный обучающий модуль от iLappSurgery Foundation (Бельгия). <br/>
                      <strong className="text-emerald-400">Полностью бесплатный доступ!</strong>
                    </p>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Открыть обучающий модуль
                    </a>
                    <p className="text-sm text-slate-400 mt-4">
                      <ExternalLink size={14} className="inline mr-1" />
                      Откроется в новой вкладке • Некоммерческая организация
                    </p>
                  </div>
                </div>
              ) : video.videoUrl.includes('laparoscopyhospital.com') ? (
                // World Laparoscopy Hospital External Link Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/95 via-amber-900/70 to-amber-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-amber-600/20 backdrop-blur-sm rounded-full border-2 border-amber-400/50">
                      <GraduationCap className="text-amber-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Бесплатное образовательное видео World Laparoscopy Hospital
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Образовательный контент от World Laparoscopy Hospital (Индия, Дубай, США). <br/>
                      <strong className="text-amber-400">Полностью бесплатный доступ!</strong>
                    </p>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Открыть образовательное видео
                    </a>
                    <p className="text-sm text-slate-400 mt-4">
                      <ExternalLink size={14} className="inline mr-1" />
                      Откроется в новой вкладке • 6,040+ образовательных видео
                    </p>
                  </div>
                </div>
              ) : video.videoUrl.includes('sages.org') ? (
                // SAGES Surgical Videos Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/70 to-purple-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-purple-600/20 backdrop-blur-sm rounded-full border-2 border-purple-400/50">
                      <Film className="text-purple-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Профессиональное хирургическое видео SAGES
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Образовательный контент от SAGES (Общество американских гастроинтестинальных и эндоскопических хирургов). <br/>
                      <strong className="text-purple-400">Профессиональное образовательное общество</strong>
                    </p>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Открыть на SAGES TV
                    </a>
                    <p className="text-sm text-slate-400 mt-4">
                      <ExternalLink size={14} className="inline mr-1" />
                      Откроется в новой вкладке • Контент с ежегодных конференций SAGES
                    </p>
                  </div>
                </div>
              ) : video.videoUrl.includes('medtube.net') ? (
                // MedTube Free Educational Videos Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/95 via-red-900/70 to-red-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-red-600/20 backdrop-blur-sm rounded-full border-2 border-red-400/50">
                      <Play className="text-red-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Бесплатное образовательное видео MedTube
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Образовательный контент от MedTube.net - крупнейшей мировой платформы медицинских видео. <br/>
                      <strong className="text-red-400">Бесплатный доступ для 450,000+ медицинских профессионалов из 180 стран</strong>
                    </p>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      Открыть на MedTube
                    </a>
                    <p className="text-sm text-slate-400 mt-4">
                      <ExternalLink size={14} className="inline mr-1" />
                      Откроется в новой вкладке • 30,000+ клинических видео • Бесплатная регистрация
                    </p>
                  </div>
                </div>
              ) : (video.videoUrl.includes('youtube.com') && video.clinic?.includes('GIBLIB')) ? (
                // GIBLIB Premium Medical Education Videos Display
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {video.thumbnailUrl && (
                    <>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/70 to-cyan-900/50" />
                    </>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-teal-600/20 backdrop-blur-sm rounded-full border-2 border-teal-400/50">
                      <Film className="text-teal-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Премиальное медицинское образование GIBLIB
                    </h3>
                    <p className="text-slate-300 mb-6 max-w-md">
                      Образовательный контент от GIBLIB - премиальной потоковой платформы медицинского образования. <br/>
                      <strong className="text-teal-400">Превью доступно на YouTube • Полная версия на watch.giblib.com</strong>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Play size={20} />
                        Смотреть превью на YouTube
                      </a>
                      <a
                        href="https://watch.giblib.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <ExternalLink size={20} />
                        Полная версия на GIBLIB
                      </a>
                    </div>
                    <p className="text-sm text-slate-400 mt-4">
                      <ExternalLink size={14} className="inline mr-1" />
                      Откроется в новой вкладке • 1,300+ хирургических видео • CME credits • Подписка для профессионалов
                    </p>
                  </div>
                </div>
              ) : (
                // Regular Video Player (Vimeo/YouTube)
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <>
                {video.thumbnailUrl && (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <VideoIcon className="text-blue-600" size={40} />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {getMethodLabel(video.method)}
              </span>
              <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                {getDifficultyLabel(video.difficulty)}
              </span>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={18} />
                <span>{video.durationMinutes} минут</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-6">{video.title}</h1>

            <div className="prose prose-slate max-w-none mb-6">
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                {video.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-6 bg-slate-50 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Хирург</p>
                  <p className="font-semibold text-slate-900">{video.author}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Клиника</p>
                  <p className="font-semibold text-slate-900">{video.clinic}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function getMethodLabel(method: string) {
  const labels: Record<string, string> = {
    LAPAROSCOPIC: 'Лапароскопический доступ',
    ROBOTIC: 'Роботизированная хирургия',
    OPEN: 'Открытый доступ',
    HYBRID: 'Гибридная техника',
  };
  return labels[method] || method;
}

function getDifficultyLabel(difficulty: string) {
  const labels: Record<string, string> = {
    BASIC: 'Базовая сложность',
    MEDIUM: 'Средняя сложность',
    HIGH: 'Высокая сложность',
    EXPERT: 'Экспертная сложность',
    COMPLEX: 'Комплексная сложность',
    INTERMEDIATE: 'Промежуточная сложность',
    ADVANCED: 'Продвинутая сложность',
  };
  return labels[difficulty] || difficulty;
}
