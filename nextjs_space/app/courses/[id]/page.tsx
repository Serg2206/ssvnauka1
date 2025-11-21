import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { CourseLevel } from '@prisma/client';
import CourseDetailClient from './course-detail-client';

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

  return <CourseDetailClient course={course} />;
}
