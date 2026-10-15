import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { ViewMode, HealthConcernId } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onSelectConcern: (concernId: HealthConcernId) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectConcern,
  onOpenConsultation,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E4D3B] text-[#FAF6ED] pt-16 pb-12 border-t border-[#2A654E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2A654E]">
          {/* Brand Bio & Heritage */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                VEDYAM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
            </div>

            <p className="text-xs md:text-sm text-[#FAF6ED]/80 leading-relaxed mb-6">
              Authentic Indian Ayurvedic pharmaceutical and wellness company dedicated to
              revitalizing classical Samhita wisdom with rigorous modern analytical testing.
              Serving conscious health seekers since 1948 [Founding Heritage].
            </p>

            <div className="space-y-2 text-xs text-[#9CAF93]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                <span>Vedyam Botanical Laboratories, Industrial Estate, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                <span>+91 (080) 4122-8900 (Mon - Sat, 9am - 6pm IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                <span>care@vedyam-ayurveda.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#1E4D3B] flex items-center justify-center transition-colors text-white"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#1E4D3B] flex items-center justify-center transition-colors text-white"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#1E4D3B] flex items-center justify-center transition-colors text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#1E4D3B] flex items-center justify-center transition-colors text-white"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Classical Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6ED]/75">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  All Formulations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Bestselling Remedies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Wellness Synergy Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Digestive Churnams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Medicated Thailam Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Immunity Rasayanas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Health Concerns */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Health Concerns
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6ED]/75">
              <li>
                <button
                  onClick={() => onSelectConcern('digestion')}
                  className="hover:text-white transition-colors"
                >
                  Digestive Agni
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('stress-sleep')}
                  className="hover:text-white transition-colors"
                >
                  Stress & Deep Sleep
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('immunity')}
                  className="hover:text-white transition-colors"
                >
                  Immunity & Ojas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('joint-bone')}
                  className="hover:text-white transition-colors"
                >
                  Joint & Bone Mobility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('skin-hair')}
                  className="hover:text-white transition-colors"
                >
                  Skin & Scalp Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('womens-wellness')}
                  className="hover:text-white transition-colors"
                >
                  Women's Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('mens-wellness')}
                  className="hover:text-white transition-colors"
                >
                  Men's Tejas Vitality
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Clinic */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Company & Clinic
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6ED]/75">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Heritage & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ayurveda')}
                  className="hover:text-white transition-colors"
                >
                  Ayurveda + Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors"
                >
                  Ayurvedic Journal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="text-[#C9A24B] hover:underline font-semibold"
                >
                  Book Vaidya Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Shipping & Return Policy
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Medical Disclaimer Strip */}
        <div className="pt-8 pb-4 text-xs text-[#9CAF93] space-y-3">
          <div className="flex items-start gap-2 bg-[#163B2D] p-3.5 rounded-lg border border-[#2A654E]">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Mandatory Healthcare Disclaimer:</strong> The information provided on this website
              is for educational and wellness guidance rooted in traditional Ayurvedic literature.
              These formulations are not intended to diagnose, treat, cure, or prevent any medical
              condition, nor are they a replacement for qualified allopathic medical treatment.
              Always consult an Ayurvedic Vaidya or your physician before beginning any new botanical regimen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2A654E]/60 text-[11px]">
            <div>
              © {new Date().getFullYear()} Vedyam Formulations Pvt. Ltd. All rights reserved. [Licensed Ayurvedic Manufacturing Unit].
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#FAF6ED] hover:text-[#C9A24B] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
