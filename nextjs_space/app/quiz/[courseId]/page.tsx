
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, XCircle, Trophy, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  order: number;
}

interface Quiz {
  id: string;
  title: string;
  description?: string;
  passingScore: number;
  questions: QuizQuestion[];
}

interface QuizResult {
  attemptId: string;
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  passingScore: number;
  results: {
    questionId: string;
    question: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

export default function QuizPage({ params }: { params: { courseId: string } }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchQuiz();
    }
  }, [status, params.courseId, router]);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/quiz/${params.courseId}`);
      
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      } else {
        console.error('Quiz not found');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    // Проверить, что все вопросы отвечены
    if (answers.some(a => a === null)) {
      alert('Пожалуйста, ответьте на все вопросы');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка теста...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Тест не найден</h3>
              <p className="text-muted-foreground mb-4">
                К сожалению, для этого курса тест недоступен.
              </p>
              <Link href="/courses">
                <Button>Вернуться к курсам</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Если результаты уже есть, показать их
  if (result) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href={`/courses/${params.courseId}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          <span>Вернуться к курсу</span>
        </Link>

        <Card className={`border-2 ${result.passed ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <CardHeader className="text-center">
            {result.passed ? (
              <>
                <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Поздравляем! Тест пройден!</CardTitle>
                <CardDescription className="text-lg">
                  Вы получили {result.score}% (минимум {result.passingScore}%)
                </CardDescription>
              </>
            ) : (
              <>
                <AlertCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Тест не пройден</CardTitle>
                <CardDescription className="text-lg">
                  Вы получили {result.score}% (требуется {result.passingScore}%)
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg">
                Правильных ответов: <strong>{result.correctAnswers}</strong> из <strong>{result.totalQuestions}</strong>
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Разбор ответов</h3>
              {result.results.map((item, index) => (
                <Card key={item.questionId} className={item.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {item.isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-base mb-2">
                          Вопрос {index + 1}: {item.question}
                        </CardTitle>
                        <div className="space-y-2">
                          {!item.isCorrect && (
                            <>
                              <p className="text-sm text-red-700">
                                <strong>Ваш ответ:</strong> {quiz.questions[index]?.options[item.userAnswer]}
                              </p>
                              <p className="text-sm text-green-700">
                                <strong>Правильный ответ:</strong> {quiz.questions[index]?.options[item.correctAnswer]}
                              </p>
                            </>
                          )}
                          {item.explanation && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Объяснение:</strong> {item.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              {result.passed ? (
                <Link href={`/certificate/${params.courseId}`} className="flex-1">
                  <Button className="w-full" size="lg">
                    <Trophy className="mr-2 h-5 w-5" />
                    Получить сертификат
                  </Button>
                </Link>
              ) : (
                <Button onClick={() => window.location.reload()} className="flex-1" size="lg">
                  Попробовать снова
                </Button>
              )}
              <Link href={`/courses/${params.courseId}`}>
                <Button variant="outline" size="lg">
                  Вернуться к курсу
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Показать тест
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href={`/courses/${params.courseId}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        <span>Вернуться к курсу</span>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle>{quiz.title}</CardTitle>
            <Badge variant="outline">
              Вопрос {currentQuestion + 1} из {quiz.questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">{question?.question}</h3>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion, parseInt(value))}
            >
              <div className="space-y-3">
                {question?.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnswerChange(currentQuestion, index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Назад
            </Button>

            <div className="text-sm text-muted-foreground">
              {answers.filter(a => a !== null).length} / {quiz.questions.length} отвечено
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <Button onClick={handleNext}>
                Следующий вопрос
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting || answers.some(a => a === null)}
              >
                {submitting ? 'Отправка...' : 'Завершить тест'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Навигация по вопросам */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Навигация по вопросам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? 'default' : answers[index] !== null ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="w-full"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
