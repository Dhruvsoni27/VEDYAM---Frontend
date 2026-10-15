import React from 'react';
import { Stethoscope, Calendar, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ConsultationCTAProps {
  onOpenConsultation: () => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED] border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-[#EFE7D8]/70 rounded-2xl p-8 md:p-12 border border-[#E2D7C3] relative overflow-hidden shadow-sm">
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4D3B]/10 text-[#1E4D3B] text-xs font-semibold tracking-wider mb-4">
                <Stethoscope className="w-3.5 h-3.5 text-[#1E4D3B]" />
                <span>Certified Ayurvedic Vaidya Guidance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E4D3B] mb-4 leading-tight">
                Have Questions About Your Personal Wellness?
              </h2>

              <p className="text-sm md:text-base text-[#232B26]/85 mb-6 leading-relaxed">
                Connect directly with certified Ayurvedic doctors (BAMS) for a thorough Prakriti
                analysis, doshic imbalance assessment, and dietary & lifestyle roadmap tailored specifically to you.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-95 group"
                >
                  <Calendar className="w-4 h-4 text-[#C9A24B]" />
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-xs text-[#6B726D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A654E]" />
                  <span>30-minute private video session · Includes personalized regimen</span>
                </div>
              </div>

              {/* Mandatory Medical Disclaimer */}
              <div className="pt-4 border-t border-[#D8CEBC]/70 flex items-start gap-2.5 text-xs text-[#6B726D]">
                <ShieldAlert className="w-4 h-4 text-[#C1714A] shrink-0 mt-0.5" />
                <p>
                  <strong>Medical Disclaimer:</strong> Information and consultations on this website
                  are for general educational & wellness guidance and are not intended to replace
                  emergency allopathic medical diagnosis or treatment.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
