import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HealthConcernId } from '../types';
import { HEALTH_CONCERNS } from '../data/mockData';
import { ConcernCard } from './ConcernCard';
import { ScrollReveal } from './ScrollReveal';

interface ConcernGridProps {
  onSelectConcern: (concernId: HealthConcernId) => void;
  onViewAllShop: () => void;
}

export const ConcernGrid: React.FC<ConcernGridProps> = ({ onSelectConcern, onViewAllShop }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EFE7D8]">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5">
                Targeted Ayurvedic Care
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
                Shop by Health Concern
              </h2>
              <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-xl">
                Classical herbal decoctions, medicated oils, and rasayanas matched to your individual doshic balance and lifestyle needs.
              </p>
            </div>

            <button
              onClick={onViewAllShop}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D3B] hover:text-[#C1714A] group"
            >
              <span>View All Health Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {HEALTH_CONCERNS.slice(0, 8).map((concern, idx) => (
            <ScrollReveal key={concern.id} delayMs={idx * 60}>
              <ConcernCard
                concern={concern}
                onClick={() => onSelectConcern(concern.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
