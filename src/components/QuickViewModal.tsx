import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, price: number, quantity: number) => void;
  onViewFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetails,
}) => {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAdd = () => {
    onAddToCart(product, currentVariant.size, currentVariant.price, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EFE7D8] relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-[#6B726D] hover:text-[#1E4D3B] bg-[#FAF6ED] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6ED] border border-[#EFE7D8]">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              fallbackText={product.name}
            />
          </div>

          {/* Quick info */}
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#C1714A] mb-1">
              {product.category}
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E4D3B] leading-tight mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-1.5 mb-3 text-xs">
              <Star className="w-3.5 h-3.5 fill-current text-[#C9A24B]" />
              <span className="font-semibold text-[#232B26] tabular-nums">{product.rating}</span>
              <span className="text-[#6B726D]">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-xs text-[#6B726D] line-clamp-3 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-2xl font-bold text-[#1E4D3B] tabular-nums">
                ₹{currentVariant.price}
              </span>
              {currentVariant.mrp > currentVariant.price && (
                <span className="text-xs text-[#6B726D] line-through tabular-nums">
                  ₹{currentVariant.mrp}
                </span>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-[#232B26] mb-1.5">Size / Form:</div>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`px-3 py-1 text-xs rounded border transition-colors ${
                      selectedVariantIndex === i
                        ? 'bg-[#1E4D3B] text-white border-[#1E4D3B]'
                        : 'bg-white text-[#232B26] border-[#EFE7D8] hover:border-[#9CAF93]'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAdd}
                disabled={justAdded}
                className="w-full py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart · ₹{currentVariant.price * quantity}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(product);
                }}
                className="w-full text-center text-xs text-[#1E4D3B] hover:underline font-medium py-1 flex items-center justify-center gap-1"
              >
                <span>View Full Formulation Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
