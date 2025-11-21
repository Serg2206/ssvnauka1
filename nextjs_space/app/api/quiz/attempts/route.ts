
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// GET - получить все попытки пользователя
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

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: user.id,
        ...(quizId && { quizId }),
      },
      include: {
        quiz: {
          include: {
            course: true,
          },
        },
      },
      orderBy: { completedAt: 'desc' },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
