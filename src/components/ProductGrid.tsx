import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ScrollReveal } from './ScrollReveal';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, price: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onViewAllShop: () => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAllShop,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'digestion' | 'immunity' | 'stress-sleep'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bestsellers') return p.isBestseller;
    return p.healthConcern === activeTab;
  });

  return (
    <section className="py-16 md:py-24 bg-[#EFE7D8]/40 border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EFE7D8]">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5">
                Classical Formulations
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E4D3B]">
                Trusted Ayurvedic Bestsellers
              </h2>
              <p className="text-sm md:text-base text-[#6B726D] mt-2 max-w-xl">
                Time-honored recipes described in classical texts, refined through modern quality verification.
              </p>
            </div>

            {/* Filter Tabs / Segmented Control */}
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF6ED] rounded-lg border border-[#EFE7D8]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'all'
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'text-[#6B726D] hover:text-[#1E4D3B]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'bestsellers'
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'text-[#6B726D] hover:text-[#1E4D3B]'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveTab('digestion')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'digestion'
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'text-[#6B726D] hover:text-[#1E4D3B]'
                }`}
              >
                Digestion
              </button>
              <button
                onClick={() => setActiveTab('immunity')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'immunity'
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'text-[#6B726D] hover:text-[#1E4D3B]'
                }`}
              >
                Immunity
              </button>
              <button
                onClick={() => setActiveTab('stress-sleep')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'stress-sleep'
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'text-[#6B726D] hover:text-[#1E4D3B]'
                }`}
              >
                Stress & Sleep
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, idx) => (
            <ScrollReveal key={product.id} delayMs={idx * 60}>
              <ProductCard
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Link */}
        <ScrollReveal delayMs={200}>
          <div className="mt-12 text-center">
            <button
              onClick={onViewAllShop}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[#1E4D3B] text-[#1E4D3B] hover:bg-[#1E4D3B] hover:text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow"
            >
              <span>Explore Complete Formulation Catalog ({products.length} Products)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
