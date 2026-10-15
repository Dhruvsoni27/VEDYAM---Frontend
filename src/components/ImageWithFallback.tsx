import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Ayurvedic formulation',
  fallbackText,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#EFE7D8] flex flex-col items-center justify-center p-4 text-center text-[#1E4D3B]/70 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#1E4D3B]/10 flex items-center justify-center mb-2">
          <Leaf className="w-6 h-6 text-[#1E4D3B]" />
        </div>
        <span className="text-xs font-serif font-medium tracking-wide text-[#1E4D3B]">
          {fallbackText || alt}
        </span>
        <span className="text-[10px] text-[#6B726D] mt-0.5">Vedyam Classical Botanical</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFE7D8]/60 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFE7D8] animate-pulse flex items-center justify-center">
          <Leaf className="w-5 h-5 text-[#9CAF93]/50 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
