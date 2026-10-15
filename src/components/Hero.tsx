import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { ViewMode } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onNavigate: (view: ViewMode) => void;
  onExploreConcerns: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExploreConcerns }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF6ED] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EFE7D8]">
      {/* Decorative subtle botanical background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1E4D3B 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Brand Typography */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE7D8] text-[#1E4D3B] text-xs font-medium tracking-wide mb-6 border border-[#E2D7C3]">
              <Award className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Ayurvedic Classical Formulations · Since 1948 [Founding Heritage]</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E4D3B] font-bold tracking-tight leading-[1.12] mb-6 max-w-2xl text-balance">
              Ancient Wisdom. Thoughtfully Made for Modern Wellness.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#232B26]/80 leading-relaxed mb-8 max-w-xl">
              Discover authentic Ayurvedic formulations rooted in classical Samhitas and produced
              in state-of-the-art GMP facilities with multi-stage botanical fingerprinting.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all group active:scale-[0.98]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#1E4D3B] hover:bg-[#1E4D3B]/5 text-[#1E4D3B] font-medium text-sm rounded-lg transition-colors"
              >
                <span>Discover Our Story</span>
              </button>
            </div>

            {/* Quick Proof Strip */}
            <div className="mt-10 pt-6 border-t border-[#EFE7D8] w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl font-bold text-[#1E4D3B] tabular-nums">75+</div>
                <div className="text-xs text-[#6B726D]">Years of Heritage</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#1E4D3B] tabular-nums">100%</div>
                <div className="text-xs text-[#6B726D]">Pure Botanicals</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#1E4D3B] tabular-nums">GMP</div>
                <div className="text-xs text-[#6B726D]">Certified Production</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Showcase with subtle parallax */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-md lg:max-w-none transition-transform duration-100 ease-out"
              style={{
                transform: `translateY(${Math.min(scrollY * 0.08, 20)}px)`,
              }}
            >
              {/* Backing Card */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#EFE7D8] relative bg-[#EFE7D8]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80"
                  alt="Vedyam Classical Ayurvedic Formulations and Botanicals"
                  className="w-full h-full object-cover"
                  fallbackText="Vedyam Herbal Heritage"
                />
                {/* Subtle scrim overlay for editorial warmth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E4D3B]/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Content Callout */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EFE7D8] shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E4D3B]/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#C9A24B]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-semibold text-[#C1714A] tracking-wider">
                        Classical Ayurveda
                      </div>
                      <div className="text-sm font-semibold text-[#1E4D3B]">
                        Pure Whole-Plant Extractions
                      </div>
                      <div className="text-[11px] text-[#6B726D]">
                        No synthetic binders or artificial colors
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Seal */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#1E4D3B] text-white p-2 shadow-lg flex flex-col items-center justify-center text-center border-2 border-[#C9A24B]">
                <ShieldCheck className="w-5 h-5 text-[#C9A24B] mb-0.5" />
                <span className="text-[9px] uppercase tracking-wider font-semibold">100% Purity</span>
                <span className="text-[8px] text-[#9CAF93]">Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
