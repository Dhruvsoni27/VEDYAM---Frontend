import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HealthConcern } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ConcernCardProps {
  concern: HealthConcern;
  onClick: () => void;
}

export const ConcernCard: React.FC<ConcernCardProps> = ({ concern, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col w-full text-left bg-white rounded-xl overflow-hidden border border-[#EFE7D8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4D3B]"
    >
      {/* Image container with subtle zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE7D8]">
        <ImageWithFallback
          src={concern.image}
          alt={concern.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          fallbackText={concern.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating count label - unboxed text */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-wide">
          <span>{concern.productCount} Formulations</span>
        </div>

        {/* Hover Arrow circle */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#1E4D3B] flex items-center justify-center shadow-sm group-hover:bg-[#1E4D3B] group-hover:text-white transition-colors duration-200">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1E4D3B] group-hover:text-[#C1714A] transition-colors leading-snug">
            {concern.title}
          </h3>
          <p className="text-xs text-[#6B726D] mt-1.5 line-clamp-2 leading-relaxed">
            {concern.shortDesc}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#EFE7D8]/60 flex items-center justify-between text-xs font-medium text-[#1E4D3B]">
          <span>Explore remedies</span>
          <span className="text-[#C9A24B] group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </button>
  );
};
