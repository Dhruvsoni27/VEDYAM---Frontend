import React from 'react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, price: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted?: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  onQuickView,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);
  const primaryVariant = product.variants[0] || { size: 'Standard', price: product.price, mrp: product.mrp };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, primaryVariant.size, primaryVariant.price);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#EFE7D8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#FAF6ED] overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          fallbackText={product.name}
        />

        {/* Top Badges / Tags - Zero-pill clean tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestseller && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-[#1E4D3B] px-2 py-0.5 rounded shadow-sm">
              Bestseller
            </span>
          )}
          {product.discountPercent > 0 && !product.isBestseller && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-[#C1714A] px-2 py-0.5 rounded shadow-sm">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Actions: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all ${
              isWishlisted
                ? 'bg-[#C1714A] text-white'
                : 'bg-white/90 text-[#232B26] hover:text-[#C1714A]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuick}
            aria-label="Quick View"
            className="w-8 h-8 rounded-full bg-white/90 text-[#232B26] hover:text-[#1E4D3B] flex items-center justify-center backdrop-blur-md shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Size / Variant Tag overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-medium text-[#232B26]/80 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs">
            {primaryVariant.size}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Text Separator */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B726D] uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#1E4D3B] font-medium">Classical</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-semibold text-[#1E4D3B] group-hover:text-[#163B2D] line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Short Benefit */}
          <p className="text-xs text-[#6B726D] mt-1 line-clamp-2 leading-relaxed min-h-[32px]">
            {product.shortBenefit}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-[#EFE7D8]/80">
          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-[#C9A24B]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#232B26] tabular-nums">
              {product.rating}
            </span>
            <span className="text-[11px] text-[#6B726D] tabular-nums">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-[#1E4D3B] tabular-nums">
                  ₹{primaryVariant.price}
                </span>
                {primaryVariant.mrp > primaryVariant.price && (
                  <span className="text-xs text-[#6B726D] line-through tabular-nums">
                    ₹{primaryVariant.mrp}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={justAdded}
              aria-label={`Add ${product.name} to cart`}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all active:scale-95 ${
                justAdded
                  ? 'bg-[#1E4D3B] text-white shadow-xs'
                  : 'bg-[#1E4D3B] hover:bg-[#163B2D] text-white shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
