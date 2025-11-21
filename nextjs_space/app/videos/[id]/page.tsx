
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Video as VideoIcon, ArrowLeft, User, Building } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SurgicalMethod, Difficulty } from '@prisma/client';

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
          <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
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

function getMethodLabel(method: SurgicalMethod) {
  const labels = {
    LAPAROSCOPIC: 'Лапароскопический доступ',
    ROBOTIC: 'Роботизированная хирургия',
    OPEN: 'Открытый доступ',
    HYBRID: 'Гибридная техника',
  };
  return labels[method] || method;
}

function getDifficultyLabel(difficulty: Difficulty) {
  const labels = {
    BASIC: 'Базовая сложность',
    MEDIUM: 'Средняя сложность',
    HIGH: 'Высокая сложность',
  };
  return labels[difficulty] || difficulty;
}
