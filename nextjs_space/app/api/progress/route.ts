
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// GET - получить прогресс пользователя
export async function GET(request: NextRequest) {
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

    const [courseProgress, videoProgress] = await Promise.all([
      prisma.courseProgress.findMany({
        where: { userId: user.id },
        include: { course: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.videoProgress.findMany({
        where: { userId: user.id },
        include: { video: true },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      courses: courseProgress,
      videos: videoProgress,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
