
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// GET - получить тест для курса
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId } = params;

    const quiz = await prisma.quiz.findFirst({
      where: { courseId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            options: true,
            order: true,
            // НЕ возвращаем correctAnswer и explanation до отправки ответа
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Парсим JSON строки в массивы для клиента
    const quizWithParsedOptions = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        ...q,
        options: JSON.parse(q.options)
      }))
    };

    return NextResponse.json(quizWithParsedOptions);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
