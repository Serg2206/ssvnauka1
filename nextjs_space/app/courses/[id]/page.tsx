import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import CourseDetailClient from './course-detail-client';
import { generateCourseLD, generateBreadcrumbLD, jsonLdScriptProps } from '@/lib/json-ld';

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

  const courseLD = generateCourseLD(course);
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'Главная', url: process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app' },
    { name: 'Курсы', url: `${process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app'}/courses` },
    { name: course.title, url: `${process.env.NEXTAUTH_URL || 'https://ssvnauka-platform.abacusai.app'}/courses/${course.id}` },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(courseLD)} />
      <script {...jsonLdScriptProps(breadcrumbLD)} />
      <CourseDetailClient course={course} />
    </>
  );
}
