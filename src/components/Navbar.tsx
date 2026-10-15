import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, Stethoscope, ArrowRight } from 'lucide-react';
import { ViewMode, HealthConcernId } from '../types';
import { HEALTH_CONCERNS } from '../data/mockData';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSelectConcern: (concernId: HealthConcernId) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onSelectConcern,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenConsultation,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'concerns' | 'shop' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConcernClick = (id: HealthConcernId) => {
    onSelectConcern(id);
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'h-14 md:h-16 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EFE7D8]'
          : 'h-16 md:h-20 bg-[#FAF6ED] border-b border-[#EFE7D8]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-baseline gap-1 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4D3B]"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#1E4D3B] group-hover:text-[#163B2D] transition-colors">
              VEDYAM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] shrink-0 transform -translate-y-0.5" />
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#232B26]/85">
          <button
            onClick={() => {
              onNavigate('home');
              setActiveMegaMenu(null);
            }}
            className={`transition-colors hover:text-[#1E4D3B] relative py-1 ${
              currentView === 'home'
                ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                : ''
            }`}
          >
            Home
          </button>

          {/* Shop with quick hover */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('shop')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              onClick={() => {
                onNavigate('shop');
                setActiveMegaMenu(null);
              }}
              className={`flex items-center gap-1 transition-colors hover:text-[#1E4D3B] py-1 ${
                currentView === 'shop'
                  ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                  : ''
              }`}
            >
              <span>Shop All</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B726D]" />
            </button>

            {/* Shop Dropdown */}
            {activeMegaMenu === 'shop' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-[#EFE7D8] py-3 px-2 mt-1 transition-all z-50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B726D] px-3 py-1">
                  Product Categories
                </div>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setActiveMegaMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#232B26] hover:bg-[#FAF6ED] rounded hover:text-[#1E4D3B] flex items-center justify-between"
                >
                  <span>All Classical Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9CAF93]" />
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setActiveMegaMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#232B26] hover:bg-[#FAF6ED] rounded hover:text-[#1E4D3B]"
                >
                  Ayurvedic Churnams & Herbal Powders
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setActiveMegaMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#232B26] hover:bg-[#FAF6ED] rounded hover:text-[#1E4D3B]"
                >
                  Thailam & Medicated Herbal Oils
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setActiveMegaMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#232B26] hover:bg-[#FAF6ED] rounded hover:text-[#1E4D3B]"
                >
                  Rasayanas & Herbal Jams
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setActiveMegaMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#232B26] hover:bg-[#FAF6ED] rounded hover:text-[#1E4D3B]"
                >
                  Arishta & Fermented Decoctions
                </button>
                <div className="border-t border-[#EFE7D8] my-2 pt-2 px-3">
                  <div className="text-xs text-[#C1714A] font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Curated Wellness Combos</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Health Concerns Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('concerns')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              onClick={() => {
                onNavigate('shop');
                setActiveMegaMenu(null);
              }}
              className="flex items-center gap-1 transition-colors hover:text-[#1E4D3B] py-1"
            >
              <span>Health Concerns</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B726D]" />
            </button>

            {/* Mega Menu Dropdown */}
            {activeMegaMenu === 'concerns' && (
              <div className="absolute top-full -left-20 w-[780px] bg-white rounded-xl shadow-2xl border border-[#EFE7D8] p-6 mt-1 z-50 transition-all">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EFE7D8]">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#1E4D3B]">
                      Classical Care by Health Concern
                    </h4>
                    <p className="text-xs text-[#6B726D]">
                      Targeted botanicals formulated to restore doshic balance and natural vitality
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('shop');
                      setActiveMegaMenu(null);
                    }}
                    className="text-xs font-semibold text-[#1E4D3B] hover:text-[#C1714A] flex items-center gap-1"
                  >
                    <span>View all categories</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                  {HEALTH_CONCERNS.map((concern) => (
                    <button
                      key={concern.id}
                      onClick={() => handleConcernClick(concern.id)}
                      className="text-left p-2 rounded-lg hover:bg-[#FAF6ED] transition-colors group flex items-start gap-2.5"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#9CAF93] group-hover:bg-[#1E4D3B] mt-1.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#232B26] group-hover:text-[#1E4D3B]">
                          {concern.title}
                        </div>
                        <div className="text-[11px] text-[#6B726D] line-clamp-1">
                          {concern.shortDesc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFE7D8] bg-[#FAF6ED] -mx-6 -mb-6 p-4 rounded-b-xl flex items-center justify-between text-xs text-[#232B26]">
                  <span className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#1E4D3B]" />
                    Unsure which formulation matches your Prakriti?
                  </span>
                  <button
                    onClick={() => {
                      setActiveMegaMenu(null);
                      onOpenConsultation();
                    }}
                    className="text-xs font-semibold text-[#1E4D3B] hover:underline"
                  >
                    Consult a Vedyam Vaidya →
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#1E4D3B] py-1 ${
              currentView === 'about'
                ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                : ''
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => onNavigate('ayurveda')}
            className={`transition-colors hover:text-[#1E4D3B] py-1 ${
              currentView === 'ayurveda'
                ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                : ''
            }`}
          >
            Ayurveda & Science
          </button>

          <button
            onClick={() => onNavigate('journal')}
            className={`transition-colors hover:text-[#1E4D3B] py-1 ${
              currentView === 'journal'
                ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                : ''
            }`}
          >
            Journal
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#1E4D3B] py-1 ${
              currentView === 'contact'
                ? 'text-[#1E4D3B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E4D3B]'
                : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & utility buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search products"
            className="p-2 text-[#232B26] hover:text-[#1E4D3B] hover:bg-[#EFE7D8]/50 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist count */}
          <button
            onClick={() => onNavigate('shop')}
            aria-label="View wishlist"
            className="relative p-2 text-[#232B26] hover:text-[#1E4D3B] hover:bg-[#EFE7D8]/50 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C1714A] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative p-2 text-[#232B26] hover:text-[#1E4D3B] hover:bg-[#EFE7D8]/50 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1E4D3B] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Vaidya Consultation CTA */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#1E4D3B] hover:bg-[#163B2D] active:scale-[0.98] rounded-md transition-all whitespace-nowrap shadow-sm"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Consult Doctor</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#232B26] hover:text-[#1E4D3B] rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 md:top-16 bg-[#FAF6ED] border-b border-[#EFE7D8] shadow-2xl p-6 max-h-[85vh] overflow-y-auto z-50">
          <div className="flex flex-col gap-4 text-base font-medium text-[#232B26]">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8] flex items-center justify-between"
            >
              <span>Shop All Formulations</span>
              <ArrowRight className="w-4 h-4 text-[#9CAF93]" />
            </button>

            {/* Mobile Health Concerns Accordion */}
            <div className="py-2 border-b border-[#EFE7D8]">
              <div className="text-xs uppercase font-semibold text-[#6B726D] tracking-wider mb-2">
                Browse by Health Concern
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {HEALTH_CONCERNS.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleConcernClick(c.id)}
                    className="text-left p-2 bg-white rounded border border-[#EFE7D8] hover:text-[#1E4D3B]"
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8]"
            >
              Our Heritage & Quality
            </button>
            <button
              onClick={() => {
                onNavigate('ayurveda');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8]"
            >
              Ayurveda & Science
            </button>
            <button
              onClick={() => {
                onNavigate('journal');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8]"
            >
              Ayurvedic Journal
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFE7D8]"
            >
              Contact Us
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full mt-2 py-3 bg-[#1E4D3B] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-[#C9A24B]" />
              <span>Book Ayurvedic Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
