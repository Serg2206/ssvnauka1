
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { prisma } from '@/lib/db';
import { CourseLevel } from '@prisma/client';

export const dynamic = 'force-dynamic';

async function getCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  return course;
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params?.id);

  if (!course) {
    notFound();
  }

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
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {getLevelLabel(course.level)}
              </span>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={18} />
                <span>{course.durationHours} часов</span>
              </div>
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
