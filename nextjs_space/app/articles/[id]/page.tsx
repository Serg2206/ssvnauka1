
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileText, ArrowLeft, Calendar } from 'lucide-react';
import { prisma } from '@/lib/db';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';

async function getArticle(id: string) {
  const article = await prisma.article.findUnique({
    where: { id },
  });

  return article;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params?.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Вернуться к статьям</span>
        </Link>

        <article className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar size={18} />
              <span>
                {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-6">{article.title}</h1>

          <div className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
