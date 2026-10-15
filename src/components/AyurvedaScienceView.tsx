import React from 'react';
import { ArrowLeft, Sparkles, Wind, Flame, Droplets, FlaskConical, ShieldCheck } from 'lucide-react';
import { ViewMode } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface AyurvedaScienceViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultation: () => void;
}

export const AyurvedaScienceView: React.FC<AyurvedaScienceViewProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
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
          <span className="text-[#1E4D3B] font-semibold">Ayurveda & Modern Science</span>
        </div>

        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D8] text-[#1E4D3B] text-xs font-semibold tracking-wider mb-4 border border-[#E2D7C3]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Evidence-Informed Classical Tradition</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E4D3B] leading-tight mb-4">
              The Science of Living in Balance
            </h1>
            <p className="text-sm md:text-base text-[#6B726D] leading-relaxed">
              Ayurveda is India's 5,000-year-old personalized healing science. At Vedyam, we study its foundational principles through both classical Sanskrit literature and advanced pharmacological instrumentation.
            </p>
          </div>
        </ScrollReveal>

        {/* The 3 Doshas Section */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D3B] text-center mb-8">
            The Three Biological Energies (Tridoshas)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vata */}
            <div className="bg-white rounded-xl p-6 border border-[#EFE7D8] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6ED] text-[#1E4D3B] flex items-center justify-center mb-4">
                <Wind className="w-5 h-5 text-[#9CAF93]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E4D3B] mb-2">Vata Dosha</h3>
              <div className="text-xs font-semibold text-[#C1714A] uppercase tracking-wider mb-2">
                Air & Space · Governs Movement & Nerve Impulses
              </div>
              <p className="text-xs text-[#6B726D] leading-relaxed mb-4">
                When balanced, Vata fosters creativity, flexibility, and light vitality. When aggravated, it produces dry skin, joint stiffness, bloating, and nervous insomnia.
              </p>
              <div className="p-3 bg-[#FAF6ED] rounded text-[11px] text-[#232B26]/80">
                <strong>Vedyam Herbs:</strong> Ashwagandha, Bala, Dashamoola, Sesame Oil.
              </div>
            </div>

            {/* Pitta */}
            <div className="bg-white rounded-xl p-6 border border-[#EFE7D8] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6ED] text-[#1E4D3B] flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 text-[#C1714A]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E4D3B] mb-2">Pitta Dosha</h3>
              <div className="text-xs font-semibold text-[#C1714A] uppercase tracking-wider mb-2">
                Fire & Water · Governs Digestion & Metabolism
              </div>
              <p className="text-xs text-[#6B726D] leading-relaxed mb-4">
                When balanced, Pitta promotes sharp intellect, warm digestion, and glowing skin. When aggravated, it leads to heartburn, skin rashes, hair thinning, and irritability.
              </p>
              <div className="p-3 bg-[#FAF6ED] rounded text-[11px] text-[#232B26]/80">
                <strong>Vedyam Herbs:</strong> Amla, Shatavari, Bhringraj, Chandana.
              </div>
            </div>

            {/* Kapha */}
            <div className="bg-white rounded-xl p-6 border border-[#EFE7D8] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6ED] text-[#1E4D3B] flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5 text-[#1E4D3B]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E4D3B] mb-2">Kapha Dosha</h3>
              <div className="text-xs font-semibold text-[#C1714A] uppercase tracking-wider mb-2">
                Earth & Water · Governs Structure & Lubrication
              </div>
              <p className="text-xs text-[#6B726D] leading-relaxed mb-4">
                When balanced, Kapha provides immune resilience, emotional stability, and joint lubrication. When excess, it manifests as sinus congestion, sluggishness, and water retention.
              </p>
              <div className="p-3 bg-[#FAF6ED] rounded text-[11px] text-[#232B26]/80">
                <strong>Vedyam Herbs:</strong> Tulsi, Pippali, Haritaki, Punarnava.
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory Rigor */}
        <div className="bg-white rounded-2xl border border-[#EFE7D8] p-8 md:p-12 shadow-sm mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="w-6 h-6 text-[#1E4D3B]" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D3B]">
                Laboratory Validation Protocols
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#232B26]/85 leading-relaxed mb-6">
              Classical literature describes herbs by Rasa (taste), Guna (qualities), Virya (thermal potency), and Vipaka (post-digestive effect). In our laboratories, we translate and substantiate these classical descriptors with analytical chemical markers.
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                <h4 className="font-bold text-[#1E4D3B] mb-1">
                  1. Botanical DNA & Microscopic Identification
                </h4>
                <p className="text-[#6B726D]">
                  Every incoming shipment of whole root, bark, or leaf is authenticated under polarized microscopy to eliminate species adulteration before milling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                <h4 className="font-bold text-[#1E4D3B] mb-1">
                  2. Heavy Metal ICP-MS Clearance
                </h4>
                <p className="text-[#6B726D]">
                  Inductively Coupled Plasma Mass Spectrometry scans every batch down to parts-per-billion (ppb) for Lead, Mercury, Arsenic, and Cadmium, exceeding international pharmacopoeia standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                <h4 className="font-bold text-[#1E4D3B] mb-1">
                  3. Active Bio-Marker Standardization (HPLC)
                </h4>
                <p className="text-[#6B726D]">
                  High Performance Liquid Chromatography ensures that active therapeutic compounds — such as withanolides in Ashwagandha or tannins in Triphala — remain consistent batch-to-batch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#1E4D3B] text-white font-semibold text-xs rounded-lg hover:bg-[#163B2D] transition-colors mr-3"
          >
            Browse Validated Formulations
          </button>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 border border-[#1E4D3B] text-[#1E4D3B] font-semibold text-xs rounded-lg hover:bg-[#1E4D3B]/5 transition-colors"
          >
            Consult an Ayurvedic Doctor
          </button>
        </div>
      </div>
    </div>
  );
};
