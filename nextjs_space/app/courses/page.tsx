
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, Filter } from 'lucide-react';
import { prisma } from '@/lib/db';
import { CourseLevel } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getCourses(level?: string) {
  const where = level && level !== 'all' ? { level: level.toUpperCase() as CourseLevel } : {};
  
  const courses = await prisma.course.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return courses;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { level?: string };
}) {
  const courses = await getCourses(searchParams?.level);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Курсы</h1>
          <p className="text-lg text-slate-600">
            Образовательные программы от базового до экспертного уровня для непрерывного профессионального развития хирургов.
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-900">Фильтр по уровню</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <FilterButton href="/courses" label="Все курсы" active={!searchParams?.level || searchParams?.level === 'all'} />
            <FilterButton href="/courses?level=basic" label="Базовый" active={searchParams?.level === 'basic'} />
            <FilterButton href="/courses?level=advanced" label="Продвинутый" active={searchParams?.level === 'advanced'} />
            <FilterButton href="/courses?level=expert" label="Экспертный" active={searchParams?.level === 'expert'} />
          </div>
        </div>

        {/* Courses Grid */}
        {courses && courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-blue-100">
                  {course.imageUrl && (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700">
                    {getLevelLabel(course.level)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">{course.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={16} />
                    <span>{course.durationHours} часов</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
            <p className="text-slate-600">Курсы не найдены</p>
          </div>
        )}
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

function FilterButton({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </Link>
  );
}
