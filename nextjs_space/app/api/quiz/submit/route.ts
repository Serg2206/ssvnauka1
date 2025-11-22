
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// POST - отправить ответы на тест
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
    const { quizId, answers } = body;

    if (!quizId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'quizId and answers array are required' }, { status: 400 });
    }

    // Получить тест с вопросами
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Подсчитать правильные ответы
    let correctAnswers = 0;
    const results = quiz.questions.map((question: any, index: number) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Сохранить попытку
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        answers: JSON.stringify(answers),
        score,
        passed,
      },
    });

    // Если тест пройден, отметить курс как завершенный и создать сертификат
    if (passed) {
      await prisma.courseProgress.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: quiz.courseId,
          },
        },
        update: {
          completed: true,
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          courseId: quiz.courseId,
          completed: true,
          completedAt: new Date(),
        },
      });

      // Создать сертификат, если его еще нет
      const existingCertificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: quiz.courseId,
          },
        },
      });

      if (!existingCertificate) {
        const certificateNumber = `SSV-${Date.now()}-${user.id.substring(0, 8).toUpperCase()}`;
        
        await prisma.certificate.create({
          data: {
            userId: user.id,
            courseId: quiz.courseId,
            certificateNumber,
          },
        });
      }
    }

    return NextResponse.json({
      attemptId: attempt.id,
      score,
      passed,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passingScore: quiz.passingScore,
      results,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
