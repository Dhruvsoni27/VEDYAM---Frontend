import React from 'react';
import { Sparkles, Truck, ShieldCheck, Stethoscope } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#1E4D3B] text-[#FAF6ED] text-[11px] md:text-xs tracking-wider py-2 px-4 border-b border-[#2A654E]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-[#9CAF93]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>75+ Years of Classical Ayurvedic Heritage · [Established 1948]</span>
        </div>

        <div className="w-full lg:w-auto text-center flex items-center justify-center gap-3">
          <Truck className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
          <span className="font-medium">
            Free Express Shipping Across India on Orders Above ₹999
          </span>
          <span className="hidden sm:inline text-[#9CAF93]">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#FAF6ED]/90">
            <Sparkles className="w-3 h-3 text-[#C9A24B]" />
            Use Code <span className="font-semibold text-[#C9A24B] tracking-wider">VEDYAM10</span> for 10% Off
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[#9CAF93]">
          <Stethoscope className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Ayurvedic Vaidya Consultation Available</span>
        </div>
      </div>
    </div>
  );
};
