import React from 'react';
import { Scroll, FlaskConical, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: Scroll,
      title: 'Traditional Knowledge',
      description:
        'Every recipe traces its lineage directly to the Charaka, Sushruta, and Sharangadhara Samhitas, preserving classical ratios, cooking times, and natural anupanas.',
    },
    {
      icon: FlaskConical,
      title: 'Modern Manufacturing',
      description:
        'Crafted in licensed GMP-certified facilities featuring stainless steel vacuum evaporators, sterile cleanrooms, and climate-controlled curing rooms.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Quality Testing',
      description:
        'Multi-stage chromatographic testing (HPLC/HPTLC), pesticide screening, and heavy metal testing via ICP-MS to guarantee non-toxic pharmaceutical purity.',
    },
    {
      icon: HeartHandshake,
      title: 'Responsible Wellness',
      description:
        'Ethically wild-harvested botanicals from sustainable Himalayan and Western Ghats forests. We make honest traditional claims without exaggerated promises.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#EFE7D8]/60 border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-2">
              Science & Tradition Harmonized
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
              Where Ayurvedic Wisdom Meets Modern Quality
            </h2>
            <p className="text-sm md:text-base text-[#6B726D] mt-3">
              We reject the false dichotomy between ancient wisdom and scientific discipline.
              Traditional preparations are validated with modern laboratory precision.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <div className="h-full bg-white rounded-xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6ED] flex items-center justify-center text-[#1E4D3B] mb-5 border border-[#EFE7D8]">
                      <Icon className="w-6 h-6 stroke-[1.5] text-[#1E4D3B]" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1E4D3B] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B726D] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#EFE7D8]/60 text-[11px] font-semibold text-[#9CAF93] uppercase tracking-wider">
                    Vedyam Standard · Pillar 0{idx + 1}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
