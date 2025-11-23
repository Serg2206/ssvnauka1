
import Link from 'next/link';
import { Video as VideoIcon, Filter } from 'lucide-react';
import { prisma } from '@/lib/db';
import { OperationType, SurgicalMethod, Difficulty } from '@/lib/types';
import { VideoCard } from '@/components/video-card';

export const dynamic = 'force-dynamic';

async function getVideos(filters?: { operationType?: string; method?: string; difficulty?: string }) {
  const where: any = {};
  
  if (filters?.operationType && filters.operationType !== 'all') {
    where.operationType = filters.operationType as OperationType;
  }
  if (filters?.method && filters.method !== 'all') {
    where.method = filters.method as SurgicalMethod;
  }
  if (filters?.difficulty && filters.difficulty !== 'all') {
    where.difficulty = filters.difficulty as Difficulty;
  }

  const videos = await prisma.video.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return videos;
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: { operationType?: string; method?: string; difficulty?: string };
}) {
  const videos = await getVideos(searchParams);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Видеотека операций</h1>
          <p className="text-lg text-slate-600">
            Обширная коллекция видеоматериалов хирургических вмешательств от ведущих специалистов России.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-900">Тип операции</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton href="/videos" label="Все" active={!searchParams?.operationType || searchParams?.operationType === 'all'} />
              <FilterButton href="/videos?operationType=GASTRECTOMY" label="Гастрэктомия" active={searchParams?.operationType === 'GASTRECTOMY'} />
              <FilterButton href="/videos?operationType=LIVER_RESECTION" label="Резекция печени" active={searchParams?.operationType === 'LIVER_RESECTION'} />
              <FilterButton href="/videos?operationType=CHOLECYSTECTOMY" label="Холецистэктомия" active={searchParams?.operationType === 'CHOLECYSTECTOMY'} />
              <FilterButton href="/videos?operationType=COLECTOMY" label="Колэктомия" active={searchParams?.operationType === 'COLECTOMY'} />
              <FilterButton href="/videos?operationType=PANCREATIC_SURGERY" label="Операции на ПЖ" active={searchParams?.operationType === 'PANCREATIC_SURGERY'} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Метод</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton href="/videos" label="Все методы" active={!searchParams?.method || searchParams?.method === 'all'} size="sm" />
              <FilterButton href="/videos?method=LAPAROSCOPIC" label="Лапароскопический" active={searchParams?.method === 'LAPAROSCOPIC'} size="sm" />
              <FilterButton href="/videos?method=ROBOTIC" label="Роботизированный" active={searchParams?.method === 'ROBOTIC'} size="sm" />
              <FilterButton href="/videos?method=OPEN" label="Открытый" active={searchParams?.method === 'OPEN'} size="sm" />
              <FilterButton href="/videos?method=HYBRID" label="Гибридный" active={searchParams?.method === 'HYBRID'} size="sm" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Сложность</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton href="/videos" label="Любая" active={!searchParams?.difficulty || searchParams?.difficulty === 'all'} size="sm" />
              <FilterButton href="/videos?difficulty=BASIC" label="Базовая" active={searchParams?.difficulty === 'BASIC'} size="sm" />
              <FilterButton href="/videos?difficulty=MEDIUM" label="Средняя" active={searchParams?.difficulty === 'MEDIUM'} size="sm" />
              <FilterButton href="/videos?difficulty=HIGH" label="Высокая" active={searchParams?.difficulty === 'HIGH'} size="sm" />
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        {videos && videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <VideoIcon className="mx-auto text-slate-400 mb-4" size={48} />
            <p className="text-slate-600">Видео не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getMethodLabel(method: string) {
  const labels: Record<string, string> = {
    LAPAROSCOPIC: 'Лапароскопия',
    ROBOTIC: 'Роботизированный',
    OPEN: 'Открытый',
    HYBRID: 'Гибридный',
  };
  return labels[method] || method;
}

function FilterButton({ href, label, active, size = 'md' }: { href: string; label: string; active: boolean; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2';
  
  return (
    <Link
      href={href}
      className={`${sizeClasses} rounded-lg font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </Link>
  );
}
