import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-14 bg-[#EFE7D8]/60 border-b border-[#EFE7D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-10 h-10 rounded-full bg-[#1E4D3B]/10 text-[#1E4D3B] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-[#1E4D3B]" />
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D3B] mb-2">
            Stay Connected With Authentic Ayurveda
          </h2>
          <p className="text-xs md:text-sm text-[#6B726D] max-w-lg mx-auto mb-6">
            Receive seasonal Ritucharya wellness guides, herbal monographs, and exclusive offers delivered gently to your inbox twice a month.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 text-xs md:text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white placeholder-[#6B726D]/70 shadow-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs md:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF6ED] rounded-lg border border-[#9CAF93] text-xs font-semibold text-[#1E4D3B]">
              <CheckCircle2 className="w-4 h-4 text-[#2A654E]" />
              <span>Thank you! Welcome to the Vedyam Ayurveda community.</span>
            </div>
          )}

          <div className="text-[11px] text-[#6B726D] mt-3">
            We value your tranquility. Zero spam, unsubscribe anytime.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
