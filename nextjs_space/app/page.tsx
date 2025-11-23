
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Video, FileText, Users, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/db';
import { VideoCard } from '@/components/video-card';
import { generateWebSiteLD, jsonLdScriptProps } from '@/lib/json-ld';

export const dynamic = 'force-dynamic';

async function getNewMaterials() {
  const [courses, videos, articles] = await Promise.all([
    prisma.course.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.video.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.article.findMany({ take: 3, orderBy: { publishedAt: 'desc' } }),
  ]);

  return { courses, videos, articles };
}

export default async function HomePage() {
  const { courses, videos, articles } = await getNewMaterials();
  const websiteLD = generateWebSiteLD();

  return (
    <>
      <script {...jsonLdScriptProps(websiteLD)} />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="max-w-6xl mx-auto px-4 py-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Профессиональное образование для <span className="text-blue-200">хирургов</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Современная платформа непрерывного медицинского образования. Получайте доступ к курсам ведущих экспертов, операционным видео и актуальным научным публикациям.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                <BookOpen size={20} />
                <span>Просмотреть курсы</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-medium hover:bg-blue-500/30 transition-all"
              >
                <Video size={20} />
                <span>Видеотека операций</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="text-blue-600" size={32} />}
              title="15+ курсов"
              description="От базового до экспертного уровня для непрерывного профессионального развития"
            />
            <FeatureCard
              icon={<Video className="text-blue-600" size={32} />}
              title="30+ видеоопераций"
              description="Лапароскопические, роботизированные и открытые вмешательства от ведущих хирургов"
            />
            <FeatureCard
              icon={<FileText className="text-blue-600" size={32} />}
              title="Научные статьи"
              description="Актуальные публикации и клинические руководства по абдоминальной хирургии"
            />
          </div>
        </div>
      </section>

      {/* New Materials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold text-slate-900">Новые материалы</h2>
          </div>

          {/* Courses */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Последние курсы</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {courses?.map((course) => (
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
                      {course.level === 'BASIC' ? 'Базовый' : course.level === 'ADVANCED' ? 'Продвинутый' : 'Экспертный'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                    <div className="mt-3 text-sm text-slate-500">{course.durationHours} часов</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Новые видеооперации</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {videos?.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Последние публикации</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {articles?.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="text-blue-600 flex-shrink-0" size={24} />
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">{article.category}</span>
                    <span>• {new Date(article.publishedAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Нам доверяют ведущие медицинские учреждения</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-slate-700 font-medium">НМИЦ хирургии им. Вишневского</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-slate-700 font-medium">РОНЦ им. Блохина</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-slate-700 font-medium">Первый МГМУ им. Сеченова</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-slate-700 font-medium">ГНЦ колопроктологии</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for different user types */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <CTACard
              title="Для студентов"
              description="Начните с базовых курсов и освойте фундаментальные принципы хирургии"
              link="/courses?level=basic"
              icon={<BookOpen size={24} />}
            />
            <CTACard
              title="Для хирургов"
              description="Совершенствуйте навыки с продвинутыми курсами и видеоматериалами"
              link="/courses?level=advanced"
              icon={<Video size={24} />}
            />
            <CTACard
              title="Для пациентов"
              description="Узнайте о методах лечения и подготовке к операциям"
              link="/patients"
              icon={<Users size={24} />}
            />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function CTACard({ title, description, link, icon }: { title: string; description: string; link: string; icon: React.ReactNode }) {
  return (
    <Link
      href={link}
      className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all"
    >
      <div className="flex items-center gap-3 mb-3 text-blue-600">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-slate-700 mb-4">{description}</p>
      <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
        <span>Подробнее</span>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}
