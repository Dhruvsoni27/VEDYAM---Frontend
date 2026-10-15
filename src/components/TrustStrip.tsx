import React from 'react';
import { History, Microscope, Factory, BookOpen, Stethoscope } from 'lucide-react';

interface TrustStripProps {
  onOpenConsultation?: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onOpenConsultation }) => {
  const trustItems = [
    {
      icon: History,
      title: '75+ Years Heritage',
      description: 'Preserving classical Samhita formulations since 1948',
    },
    {
      icon: Microscope,
      title: 'Scientifically Tested',
      description: 'HPLC & ICP-MS multi-phase heavy metal screening',
    },
    {
      icon: Factory,
      title: 'Quality-Controlled',
      description: 'Produced in licensed GMP & ISO certified cleanrooms',
    },
    {
      icon: BookOpen,
      title: 'Classical Formulations',
      description: 'Zero artificial fillers, chemical binders, or shortcuts',
    },
    {
      icon: Stethoscope,
      title: 'Vaidya Consultations',
      description: 'Personalized Prakriti & wellness guidance',
      action: onOpenConsultation,
    },
  ];

  return (
    <div className="bg-[#FAF6ED] border-b border-[#EFE7D8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-3.5 group text-left">
                <div className="w-10 h-10 rounded-lg bg-[#EFE7D8] flex items-center justify-center shrink-0 text-[#1E4D3B] group-hover:bg-[#1E4D3B] group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E4D3B] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6B726D] mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );

            if (item.action) {
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1E4D3B]"
                >
                  {content}
                </button>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
