
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// POST - отметить курс как пройденный
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { courseId, completed } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    const progress = await prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
      update: {
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        courseId,
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating course progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
