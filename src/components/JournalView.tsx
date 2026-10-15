import React, { useState } from 'react';
import { ArrowLeft, Clock, User, BookOpen, Search, ArrowRight, X } from 'lucide-react';
import { BlogArticle, ViewMode } from '../types';
import { BLOG_ARTICLES } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';

interface JournalViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const categories = ['All', 'Ayurveda Fundamentals', 'Manufacturing Heritage', 'Seasonal Wellness'];

  const filteredArticles = BLOG_ARTICLES.filter((a) => {
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF6ED] py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B726D] mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E4D3B] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[#1E4D3B] font-semibold">Vedyam Ayurvedic Journal</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-2 flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Classical Knowledge & Clinical Insights</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E4D3B] leading-tight mb-4">
            The Vedyam Journal
          </h1>
          <p className="text-sm md:text-base text-[#6B726D] leading-relaxed">
            Essays on Dinacharya (daily rituals), classical Samhita interpretations, botanical pharmacology, and practical wisdom for modern living.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-[#EFE7D8] p-4 mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-colors ${
                  selectedCategory === c
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'bg-[#FAF6ED] text-[#232B26] hover:bg-[#EFE7D8]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6B726D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search essays..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/40"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
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
          ))}
        </div>

        {/* Modal Reader */}
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
                  Have a related wellness inquiry?
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-[#1E4D3B] text-white rounded text-xs font-semibold hover:bg-[#163B2D]"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
