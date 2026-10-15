import React, { useState } from 'react';
import { ArrowRight, Clock, User, X, BookOpen } from 'lucide-react';
import { BlogArticle } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface JournalPreviewProps {
  articles: BlogArticle[];
}

export const JournalPreview: React.FC<JournalPreviewProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#EFE7D8]/30 border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EFE7D8]">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5">
                Classical Research & Knowledge
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
                From the World of Ayurveda
              </h2>
              <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-xl">
                Essays, clinical reflections, and seasonal lifestyle wisdom penned by our in-house Ayurvedic physicians and pharmacologists.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <ScrollReveal key={article.id} delayMs={idx * 80}>
              <div
                onClick={() => setSelectedArticle(article)}
                className="h-full bg-white rounded-xl overflow-hidden border border-[#EFE7D8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#FAF6ED] overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      fallbackText={article.title}
                    />
                  </div>

                  <div className="p-6">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#6B726D] mb-2.5">
                      <span className="text-[#1E4D3B] font-semibold">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#1E4D3B] group-hover:text-[#C1714A] transition-colors leading-snug line-clamp-2 mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#6B726D] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-[#EFE7D8]/60 pt-4">
                  <div className="text-[11px] text-[#232B26]/80 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#9CAF93]" />
                    <span className="font-medium">{article.author}</span>
                  </div>

                  <span className="text-xs font-semibold text-[#1E4D3B] group-hover:text-[#C1714A] inline-flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#EFE7D8] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
              className="absolute top-4 right-4 p-2 text-[#6B726D] hover:text-[#1E4D3B] bg-[#FAF6ED] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#C1714A] font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{selectedArticle.category}</span>
              <span className="text-[#6B726D]">·</span>
              <span className="text-[#6B726D] lowercase">{selectedArticle.readTime}</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D3B] mb-4 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#EFE7D8] text-xs text-[#6B726D]">
              <div>
                <span className="font-semibold text-[#232B26]">{selectedArticle.author}</span>
                <span className="block text-[11px]">{selectedArticle.authorRole}</span>
              </div>
              <span className="ml-auto">{selectedArticle.date}</span>
            </div>

            <div className="space-y-4 text-sm md:text-base text-[#232B26]/85 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFE7D8] bg-[#FAF6ED] -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 rounded-b-2xl flex items-center justify-between">
              <span className="text-xs text-[#6B726D]">
                Have a related wellness question?
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-[#1E4D3B] text-white rounded text-xs font-semibold hover:bg-[#163B2D]"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
