
import { Users, HelpCircle, BookOpen, Info } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getPatientsData() {
  const [faqs, glossary] = await Promise.all([
    prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.glossaryTerm.findMany({
      orderBy: { term: 'asc' },
    }),
  ]);

  return { faqs, glossary };
}

export default async function PatientsPage() {
  const { faqs, glossary } = await getPatientsData();

  // Group FAQs by category
  const faqsByCategory = faqs?.reduce((acc: any, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Информация для пациентов</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Понятные ответы на ваши вопросы о хирургических операциях и восстановлении
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href="#faq"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all group"
          >
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <HelpCircle className="text-blue-600" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Часто задаваемые вопросы</h3>
              <p className="text-slate-600">Ответы на популярные вопросы</p>
            </div>
          </a>
          <a
            href="#glossary"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all group"
          >
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <BookOpen className="text-blue-600" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Медицинский глоссарий</h3>
              <p className="text-slate-600">Объяснение терминов простым языком</p>
            </div>
          </a>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-slate-900">Часто задаваемые вопросы</h2>
          </div>

          {faqsByCategory && Object.keys(faqsByCategory).map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                {category}
              </h3>
              <div className="space-y-4">
                {faqsByCategory[category].map((faq: any) => (
                  <details
                    key={faq.id}
                    className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">
                        ?
                      </span>
                      <span className="flex-1">{faq.question}</span>
                    </summary>
                    <div className="mt-4 pl-9 text-slate-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Glossary Section */}
        <section id="glossary" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-slate-900">Медицинский глоссарий</h2>
          </div>
          <p className="text-lg text-slate-600 mb-6">
            Основные медицинские термины, объясненные простым и понятным языком
          </p>

          <div className="grid gap-4">
            {glossary?.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-3">{term.term}</h3>
                <p className="text-slate-700 leading-relaxed">{term.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Важная информация</h3>
              <p className="text-slate-700 leading-relaxed">
                Информация на этой странице носит образовательный характер и не заменяет консультацию врача. 
                Всегда обсуждайте ваш индивидуальный случай с лечащим врачом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
