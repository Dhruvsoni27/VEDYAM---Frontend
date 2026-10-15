import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Microscope, Award } from 'lucide-react';
import { ViewMode } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface HeritageSectionProps {
  onNavigate: (view: ViewMode) => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ onNavigate }) => {
  const [counts, setCounts] = useState({ years: 0, texts: 0, purity: 0, consultations: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts({ years: 75, texts: 42, purity: 100, consultations: 25 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              years: Math.floor(easeOut * 75),
              texts: Math.floor(easeOut * 42),
              purity: Math.floor(easeOut * 100),
              consultations: Math.floor(easeOut * 25),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({ years: 75, texts: 42, purity: 100, consultations: 25 });
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const el = statsRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasAnimated]);

  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED] border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#EFE7D8] bg-[#EFE7D8]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
                    alt="Traditional Ayurvedic Apothecary and Herbal Mortar"
                    className="w-full h-full object-cover"
                    fallbackText="Vedyam Heritage Apothecary"
                  />
                </div>

                {/* Overlaid Heritage Quote Pill */}
                <div className="absolute -bottom-6 -right-4 sm:right-6 max-w-xs p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EFE7D8] shadow-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#C9A24B] shrink-0" />
                    <div>
                      <div className="text-xs font-serif font-bold text-[#1E4D3B]">
                        Charaka & Sushruta Samhita
                      </div>
                      <div className="text-[11px] text-[#6B726D]">
                        Classical recipes preserved without synthetic compromise
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <ScrollReveal delayMs={100}>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-2">
                Unbroken Tradition
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E4D3B] leading-tight mb-6">
                75+ Years of Ayurveda, Held to a Higher Standard.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#232B26]/85 leading-relaxed">
                <p>
                  Vedyam was founded with a singular conviction: that classical Ayurveda is not a
                  relic of history, but a profound, sophisticated science of living vitality. For over
                  seven decades, our families of master vaidyas have safeguarded unbroken formulations
                  handed down across generations.
                </p>
                <p>
                  Where mass commercial brands rush extraction in hours using chemical solvents, we
                  adhere strictly to classical cooking cycles — from 21-day slow-steeped taila paka
                  to multi-week clay vessel micro-fermentation. Each herb is tested for botanical
                  authenticity and zero heavy metals before a single batch is approved.
                </p>
              </div>

              {/* Stat Counters Grid */}
              <div ref={statsRef} className="mt-8 pt-6 border-t border-[#EFE7D8] grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] tabular-nums">
                    {counts.years}+
                  </div>
                  <div className="text-xs text-[#6B726D] mt-0.5">Years Heritage</div>
                </div>

                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] tabular-nums">
                    {counts.texts}+
                  </div>
                  <div className="text-xs text-[#6B726D] mt-0.5">Classical Texts</div>
                </div>

                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] tabular-nums">
                    {counts.purity}%
                  </div>
                  <div className="text-xs text-[#6B726D] mt-0.5">Pure Whole Plants</div>
                </div>

                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] tabular-nums">
                    {counts.consultations}k+
                  </div>
                  <div className="text-xs text-[#6B726D] mt-0.5">Lives Guided</div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D3B] hover:text-[#C1714A] group"
                >
                  <span>Explore Our Heritage & Extraction Philosophy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
