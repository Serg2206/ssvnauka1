
import Link from 'next/link';
import { FileText, Search } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Научные статьи и публикации</h1>
          <p className="text-lg text-slate-600">
            Актуальные материалы по абдоминальной хирургии, клинические руководства и обзоры современных исследований.
          </p>
        </div>

        {/* Articles List */}
        {articles && articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                        {article.category}
                      </span>
                      <span className="text-sm text-slate-500">
                        {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 line-clamp-3">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <FileText className="mx-auto text-slate-400 mb-4" size={48} />
            <p className="text-slate-600">Статьи не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
