import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { ViewMode } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface EditorialBannerProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultation: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <section className="py-16 md:py-20 bg-[#1E4D3B] text-white relative overflow-hidden">
      {/* Subtle organic contour background */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#2A654E]/40 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#163B2D] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C9A24B] text-xs font-medium tracking-wider mb-6 border border-white/10">
            <Leaf className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Ayurvedic Dinacharya Protocol</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Bring Your Daily Wellness Ritual Back to Nature.
          </h2>

          <p className="text-base sm:text-lg text-[#FAF6ED]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Wellness in Ayurveda is not an emergency reaction — it is a daily rhythm of nourishment,
            herbal cleansing, and grounded clarity. Discover classical remedies tailored to your unique Prakriti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#FAF6ED] text-[#1E4D3B] font-semibold text-sm rounded-lg hover:bg-white transition-all shadow-md active:scale-95"
            >
              Explore All Formulations
            </button>
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border border-[#FAF6ED]/40 text-[#FAF6ED] hover:bg-white/10 font-semibold text-sm rounded-lg transition-all"
            >
              <span>Consult an Ayurvedic Vaidya</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
