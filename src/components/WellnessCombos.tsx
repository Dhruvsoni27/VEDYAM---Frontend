import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { WellnessCombo } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface WellnessCombosProps {
  combos: WellnessCombo[];
  onAddComboToCart: (combo: WellnessCombo) => void;
}

export const WellnessCombos: React.FC<WellnessCombosProps> = ({ combos, onAddComboToCart }) => {
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const handleAdd = (combo: WellnessCombo) => {
    onAddComboToCart(combo);
    setAddedComboId(combo.id);
    setTimeout(() => setAddedComboId(null), 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF6ED] border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EFE7D8]">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Synergy Kits</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
                Wellness, Better Together
              </h2>
              <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-xl">
                Classical herbal kits designed by master Vaidyas for synergistic action — addressing both root causes and symptom relief.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {combos.map((combo, idx) => (
            <ScrollReveal key={combo.id} delayMs={idx * 80}>
              <div className="h-full bg-white rounded-xl border border-[#EFE7D8] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Image header with discount tag */}
                  <div className="relative aspect-[16/10] bg-[#FAF6ED] overflow-hidden">
                    <ImageWithFallback
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      fallbackText={combo.name}
                    />
                    <div className="absolute top-3 left-3 bg-[#C1714A] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                      Save {combo.discountPercent}% Bundle
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="text-[11px] uppercase tracking-wider text-[#6B726D] font-medium mb-1">
                      {combo.category}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1E4D3B] group-hover:text-[#C1714A] transition-colors leading-snug">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-[#6B726D] mt-2 leading-relaxed">
                      {combo.description}
                    </p>

                    {/* What's included checklist */}
                    <div className="mt-4 pt-3 border-t border-[#EFE7D8]/80">
                      <div className="text-[11px] font-semibold text-[#1E4D3B] uppercase tracking-wider mb-2">
                        Included Formulations:
                      </div>
                      <ul className="space-y-1.5">
                        {combo.includedItems.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="text-xs text-[#232B26]/80 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9CAF93] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart action */}
                <div className="p-5 pt-3 border-t border-[#EFE7D8] bg-[#FAF6ED]/50 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#1E4D3B] tabular-nums">
                        ₹{combo.price}
                      </span>
                      <span className="text-xs text-[#6B726D] line-through tabular-nums">
                        ₹{combo.mrp}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#2A654E] font-medium">Free Delivery</span>
                  </div>

                  <button
                    onClick={() => handleAdd(combo)}
                    disabled={addedComboId === combo.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E4D3B] hover:bg-[#163B2D] active:scale-95 text-white text-xs font-semibold rounded-md shadow-xs transition-all"
                  >
                    {addedComboId === combo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bundle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
