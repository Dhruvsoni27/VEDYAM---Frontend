import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface CustomerStoriesProps {
  testimonials: Testimonial[];
}

export const CustomerStories: React.FC<CustomerStoriesProps> = ({ testimonials }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED] border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#EFE7D8]">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5">
                Authentic Experiences
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
                Voices of Natural Recovery
              </h2>
              <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-xl">
                Real reflections from individuals who have integrated classical Vedyam formulations into their daily wellness routines.
              </p>
            </div>

            {/* Clear Content Integrity Label as specified in prompt */}
            <div className="mt-4 md:mt-0 text-xs text-[#6B726D] bg-[#EFE7D8] px-3 py-1.5 rounded border border-[#E2D7C3]">
              Sample Testimonials for Illustration
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={item.id} delayMs={idx * 70}>
              <div className="h-full bg-white rounded-xl p-6 border border-[#EFE7D8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#C9A24B]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#9CAF93]/40" />
                  </div>

                  {/* Customer Quote */}
                  <p className="text-xs md:text-sm text-[#232B26]/85 italic leading-relaxed mb-4">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE7D8]/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1E4D3B]">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-[#6B726D]">
                        {item.location}
                      </p>
                    </div>
                    {item.verifiedCustomer && (
                      <span className="flex items-center gap-1 text-[10px] text-[#2A654E] font-medium" title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2A654E]" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-[11px] text-[#C1714A] font-medium line-clamp-1">
                    Using: {item.productUsed}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
