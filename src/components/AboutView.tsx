import React from 'react';
import { Award, BookOpen, ShieldCheck, Factory, Microscope, HeartHandshake, ArrowLeft } from 'lucide-react';
import { ViewMode } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConsultation }) => {
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
          <span className="text-[#1E4D3B] font-semibold">About Vedyam Heritage & Standards</span>
        </div>

        {/* Hero Banner */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D8] text-[#1E4D3B] text-xs font-semibold tracking-wider mb-4 border border-[#E2D7C3]">
              <Award className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>75+ Years of Classical Heritage · [Established 1948]</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E4D3B] leading-tight mb-4">
              Where Ayurvedic Wisdom Meets Modern Quality
            </h1>
            <p className="text-sm md:text-base text-[#6B726D] leading-relaxed">
              Founded over seven decades ago by master Vaidyas, Vedyam exists to protect the uncompromising purity of classical Indian medicine and elevate it through transparent pharmaceutical rigor.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <ScrollReveal>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#EFE7D8] shadow-md bg-[#EFE7D8]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
                alt="Apothecary herb preparation"
                className="w-full h-full object-cover"
                fallbackText="Vedyam Herbal Legacy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <div className="space-y-4 text-sm text-[#232B26]/85 leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#1E4D3B]">
                The Foundational Story
              </h2>
              <p>
                In 1948 [Founding Heritage], amidst the verdant foothills of the Western Ghats, Vedyam began as a modest community Oushadhashala (classical apothecary). The vision was clear: to prepare formulations exactly as laid down in the Brihat Trayi (the foundational trio of classical texts: Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya) without cutting corners.
              </p>
              <p>
                While commercial industrialization over subsequent decades led many manufacturers to switch to chemical shortcuts, cheap gelatin capsules, and synthetic perfumes, Vedyam remained steadfast. We maintained the labor-intensive 21-day Sneha Paka oil cooking protocols and natural clay-vessel sandhana fermentation.
              </p>
              <p>
                Today, our modern pharmaceutical laboratories in Kerala uphold that same sacred covenant — combining generational intuition with high-precision analytical spectroscopy.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Standards */}
        <div className="bg-white rounded-2xl border border-[#EFE7D8] p-8 md:p-12 shadow-sm mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D3B] text-center mb-10">
            The Vedyam Four-Point Quality Pledge
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
              <BookOpen className="w-6 h-6 text-[#1E4D3B] mb-3" />
              <h3 className="font-serif text-base font-bold text-[#1E4D3B] mb-1.5">
                Classical Authenticity
              </h3>
              <p className="text-xs text-[#6B726D] leading-relaxed">
                Direct adherence to ancient formulations with zero unverified synthetic substitutes or chemical fillers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
              <Factory className="w-6 h-6 text-[#1E4D3B] mb-3" />
              <h3 className="font-serif text-base font-bold text-[#1E4D3B] mb-1.5">
                GMP Certified Facility
              </h3>
              <p className="text-xs text-[#6B726D] leading-relaxed">
                State-of-the-art cleanroom manufacturing with HEPA-filtered airflow and food-grade stainless machinery.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
              <Microscope className="w-6 h-6 text-[#1E4D3B] mb-3" />
              <h3 className="font-serif text-base font-bold text-[#1E4D3B] mb-1.5">
                Multi-Stage Testing
              </h3>
              <p className="text-xs text-[#6B726D] leading-relaxed">
                Microbial testing, HPLC chromatographic fingerprinting, and rigorous ICP-MS heavy metal elimination.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
              <HeartHandshake className="w-6 h-6 text-[#1E4D3B] mb-3" />
              <h3 className="font-serif text-base font-bold text-[#1E4D3B] mb-1.5">
                Responsible Sourcing
              </h3>
              <p className="text-xs text-[#6B726D] leading-relaxed">
                Sustainably harvested whole plants collected in harmony with local forest conservation cooperatives.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#1E4D3B] text-white font-semibold text-xs rounded-lg hover:bg-[#163B2D] transition-colors mr-3"
          >
            Explore Classical Catalog
          </button>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 border border-[#1E4D3B] text-[#1E4D3B] font-semibold text-xs rounded-lg hover:bg-[#1E4D3B]/5 transition-colors"
          >
            Schedule Vaidya Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
