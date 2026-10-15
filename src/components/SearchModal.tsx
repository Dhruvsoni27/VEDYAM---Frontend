import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchIngr = p.keyIngredients.some((i) =>
        i.name.toLowerCase().includes(q) || i.botanical.toLowerCase().includes(q)
      );
      return matchName || matchCat || matchIngr;
    });
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#EFE7D8] relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-4 right-4 p-2 text-[#6B726D] hover:text-[#1E4D3B] bg-[#FAF6ED] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#EFE7D8] pb-4 mb-4">
          <Search className="w-5 h-5 text-[#1E4D3B]" />
          <input
            type="text"
            autoFocus
            placeholder="Search classical herbs (e.g. Ashwagandha, Triphala, Bhringraj)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg focus:outline-none placeholder-[#6B726D]/60 text-[#232B26]"
          />
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div>
            <div className="text-xs font-semibold text-[#6B726D] uppercase tracking-wider mb-2">
              Popular Searches:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Triphala', 'Ashwagandha', 'Immunity Chyawanprash', 'Bhringraj Hair Oil', 'Arjuna Heart', 'Shilajit'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-[#FAF6ED] hover:bg-[#EFE7D8] text-[#1E4D3B] rounded-full transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto space-y-3">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer border border-transparent hover:border-[#EFE7D8]"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF6ED] border border-[#EFE7D8] shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#C1714A] uppercase font-semibold">
                      {product.category}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1E4D3B] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#6B726D] truncate">
                      {product.shortBenefit}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-xs text-[#1E4D3B] tabular-nums">
                      ₹{product.price}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9CAF93] ml-auto mt-1" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#6B726D]">
                No classical formulations found for "{query}". Try checking the spelling or searching by category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
