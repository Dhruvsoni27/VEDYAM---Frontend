import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { ScrollReveal } from './ScrollReveal';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ayurveda Basics', 'Usage & Dosage', 'Consultation', 'Shipping & Quality'];

  const filteredFaqs = FAQS.filter(
    (f) => selectedCategory === 'All' || f.category === selectedCategory
  );

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED] border-b border-[#EFE7D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-2 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Guidance & Transparency</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-lg mx-auto">
              Everything you need to know about classical formulation methods, dosing guidelines, and safe usage.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'bg-white text-[#6B726D] border border-[#EFE7D8] hover:border-[#1E4D3B] hover:text-[#1E4D3B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollReveal key={faq.id} delayMs={idx * 40}>
                <div className="bg-white rounded-xl border border-[#EFE7D8] overflow-hidden transition-all shadow-xs">
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#FAF6ED]/40 transition-colors"
                  >
                    <span className="font-serif text-base font-semibold text-[#1E4D3B] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9CAF93] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1E4D3B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#232B26]/85 leading-relaxed border-t border-[#EFE7D8]/60 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
