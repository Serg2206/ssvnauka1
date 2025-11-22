
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Video as VideoIcon, ArrowLeft, User, Building, ExternalLink, Lock } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SurgicalMethod, Difficulty } from '@/lib/types';

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

  return (
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
