import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ArrowLeft,
  BookOpen,
  Info,
  Droplets,
  Package,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, size: string, price: number, quantity: number) => void;
  onBuyNow: (product: Product, size: string, price: number, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onBackToShop: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onBackToShop,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'benefits' | 'usage' | 'precautions' | 'faqs' | 'reviews'>('desc');
  const [justAdded, setJustAdded] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAdd = () => {
    onAddToCart(product, currentVariant.size, currentVariant.price, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, currentVariant.size, currentVariant.price, quantity);
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B726D] mb-6">
          <button onClick={onBackToShop} className="hover:text-[#1E4D3B] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Formulations</span>
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#1E4D3B] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* PDP Main Stage (Split: Left Gallery / Right Purchase Module) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              {/* Main Image Frame */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-[#EFE7D8] shadow-sm relative">
                <ImageWithFallback
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fallbackText={product.name}
                />
                {product.isBestseller && (
                  <div className="absolute top-4 left-4 bg-[#1E4D3B] text-white text-xs uppercase font-bold tracking-wider px-3 py-1 rounded shadow-xs">
                    Classical Bestseller
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                        selectedImage === img
                          ? 'border-[#1E4D3B] shadow-sm'
                          : 'border-[#EFE7D8] hover:border-[#9CAF93]'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Classical Heritage Reference Box */}
              <div className="p-4 rounded-xl bg-[#EFE7D8]/60 border border-[#E2D7C3] flex items-start gap-3 text-xs text-[#232B26]/85">
                <BookOpen className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E4D3B] block">Classical Samhita Text Authority:</span>
                  <span>{product.classicalTextRef}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#EFE7D8] p-6 sm:p-8 shadow-sm">
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#6B726D] mb-2">
                <span className="uppercase tracking-wider font-semibold text-[#1E4D3B]">
                  {product.category}
                </span>
                <span className="text-[#2A654E] font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2A654E]" />
                  In Stock & Ready to Dispatch
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] leading-tight mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#C9A24B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-[#D8CEBC]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#232B26] tabular-nums">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-[#6B726D] tabular-nums">
                  ({product.reviewCount} Verified Customer Reviews)
                </span>
              </div>

              {/* Short Benefit Quote */}
              <p className="text-xs sm:text-sm text-[#6B726D] leading-relaxed mb-6 pb-4 border-b border-[#EFE7D8]">
                {product.shortBenefit}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-bold text-[#1E4D3B] tabular-nums">
                  ₹{currentVariant.price}
                </span>
                {currentVariant.mrp > currentVariant.price && (
                  <>
                    <span className="text-sm text-[#6B726D] line-through tabular-nums">
                      MRP ₹{currentVariant.mrp}
                    </span>
                    <span className="text-xs font-bold text-[#C1714A] bg-[#C1714A]/10 px-2 py-0.5 rounded">
                      Save ₹{currentVariant.mrp - currentVariant.price} ({product.discountPercent}%)
                    </span>
                  </>
                )}
                <span className="text-[11px] text-[#6B726D] block sm:inline">Incl. of all taxes</span>
              </div>

              {/* Variant / Size Selector */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-[#232B26] mb-2 flex items-center justify-between">
                  <span>Available Packaging Sizes:</span>
                  <span className="text-[#C1714A]">{currentVariant.size}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-[#1E4D3B] bg-[#FAF6ED] text-[#1E4D3B] font-semibold ring-1 ring-[#1E4D3B]'
                          : 'border-[#EFE7D8] bg-white text-[#232B26] hover:border-[#9CAF93]'
                      }`}
                    >
                      <div className="text-xs">{v.size}</div>
                      <div className="text-xs font-bold tabular-nums mt-0.5">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-semibold text-[#232B26]">Quantity:</span>
                <div className="inline-flex items-center border border-[#D8CEBC] rounded-lg bg-[#FAF6ED]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-1.5 text-sm font-bold text-[#1E4D3B] hover:bg-[#EFE7D8] rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#232B26] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="px-3 py-1.5 text-sm font-bold text-[#1E4D3B] hover:bg-[#EFE7D8] rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={justAdded}
                    className="flex-1 py-3.5 px-6 bg-[#1E4D3B] hover:bg-[#163B2D] active:scale-[0.98] text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#C9A24B]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart · ₹{currentVariant.price * quantity}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={isWishlisted ? 'Saved' : 'Save to wishlist'}
                    className={`p-3.5 rounded-lg border transition-all ${
                      isWishlisted
                        ? 'border-[#C1714A] bg-[#C1714A] text-white'
                        : 'border-[#D8CEBC] bg-white text-[#232B26] hover:text-[#C1714A]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleDirectBuy}
                  className="w-full py-3.5 px-6 bg-[#C1714A] hover:bg-[#A95E39] active:scale-[0.98] text-white font-semibold text-sm rounded-lg shadow-sm transition-all text-center"
                >
                  Buy Now with 1-Click Checkout
                </button>
              </div>

              {/* Reassurance Trust Signals */}
              <div className="pt-6 border-t border-[#EFE7D8] grid grid-cols-2 gap-3 text-[11px] text-[#6B726D]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1E4D3B] shrink-0" />
                  <span>Free Shipping on Orders &gt; ₹999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1E4D3B] shrink-0" />
                  <span>GMP Certified Cleanroom Batch</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#1E4D3B] shrink-0" />
                  <span>7-Day Replacement Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#1E4D3B] shrink-0" />
                  <span>100% Traceable Herbal Harvest</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Specifications */}
        <div className="bg-white rounded-2xl border border-[#EFE7D8] p-6 sm:p-10 shadow-sm mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#EFE7D8] pb-4 mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'desc'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Classical Formulation
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'ingredients'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Herbal Ingredients ({product.keyIngredients.length})
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'benefits'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Documented Benefits
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'usage'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Dosage & Anupana (Vehicle)
            </button>
            <button
              onClick={() => setActiveTab('precautions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'precautions'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Safety & Storage
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Product FAQs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-[#6B726D] hover:text-[#1E4D3B]'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'desc' && (
            <div className="max-w-3xl space-y-4 text-sm text-[#232B26]/85 leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-[#1E4D3B]">
                Ayurvedic Pharmacology & Heritage
              </h3>
              <p>{product.description}</p>
              <div className="p-4 bg-[#FAF6ED] rounded-xl border border-[#EFE7D8] text-xs space-y-2 mt-4">
                <span className="font-bold text-[#1E4D3B] block">Doshic Action Matrix:</span>
                <p className="text-[#6B726D]">
                  Tridoshic balancing with specific affinity for Samana Vata and Pachaka Pitta.
                  Supports Srotas cleansing (channel permeability) without disturbing systemic equilibrium.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1E4D3B] mb-4">
                Full-Spectrum Botanical Composition
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#232B26] border-collapse">
                  <thead>
                    <tr className="border-b border-[#EFE7D8] bg-[#FAF6ED]">
                      <th className="py-3 px-4 font-semibold text-[#1E4D3B]">Classical Herb</th>
                      <th className="py-3 px-4 font-semibold text-[#1E4D3B]">Botanical / Latin Name</th>
                      <th className="py-3 px-4 font-semibold text-[#1E4D3B]">Pharmacological Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.keyIngredients.map((ing, idx) => (
                      <tr key={idx} className="border-b border-[#EFE7D8]/60 hover:bg-[#FAF6ED]/30">
                        <td className="py-3 px-4 font-medium text-[#1E4D3B]">{ing.name}</td>
                        <td className="py-3 px-4 italic text-[#6B726D]">{ing.botanical}</td>
                        <td className="py-3 px-4 text-[#232B26]/85">{ing.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="max-w-3xl">
              <h3 className="font-serif text-xl font-bold text-[#1E4D3B] mb-4">
                Traditional Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#232B26]/85">
                    <span className="w-2 h-2 rounded-full bg-[#1E4D3B] mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="max-w-3xl space-y-6 text-sm text-[#232B26]/85">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E4D3B] mb-1">
                  Recommended Daily Dosage
                </h4>
                <p>{product.dosage}</p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E4D3B] mb-1">
                  Anupana (Carrier Vehicle for Cellular Delivery)
                </h4>
                <p>{product.anupana}</p>
                <p className="text-xs text-[#6B726D] mt-2">
                  *Anupana is a vital Ayurvedic concept where the substance consumed alongside the herb
                  enhances its absorption, directs it to target tissues, and modulates its thermal potency.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'precautions' && (
            <div className="max-w-3xl space-y-6 text-sm text-[#232B26]/85">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E4D3B] mb-1">
                  Precautions & Contraindications
                </h4>
                <p>{product.precautions}</p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E4D3B] mb-1">
                  Storage & Shelf Life
                </h4>
                <p>{product.storage}</p>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1E4D3B] mb-4">
                Formulation Inquiries
              </h3>
              {product.faqs.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                  <h4 className="font-semibold text-sm text-[#1E4D3B] mb-1.5">
                    {f.question}
                  </h4>
                  <p className="text-xs text-[#232B26]/80 leading-relaxed">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EFE7D8]">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1E4D3B]">
                    Customer Reviews
                  </h3>
                  <p className="text-xs text-[#6B726D]">
                    Sample customer experiences verified across authentic purchase batches
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-serif text-[#1E4D3B] tabular-nums">
                    {product.rating} / 5
                  </div>
                  <div className="text-xs text-[#6B726D]">Based on {product.reviewCount} ratings</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-[#1E4D3B]">Anand K. · Verified Customer (Sample)</span>
                    <div className="flex items-center text-[#C9A24B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#232B26]/80 leading-relaxed">
                    "Consistent herbal quality. The aroma and physical texture reflect traditional slow cooking rather than industrial mass powders. Will be repurchasing."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#EFE7D8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-[#1E4D3B]">Shalini M. · Verified Customer (Sample)</span>
                    <div className="flex items-center text-[#C9A24B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#232B26]/80 leading-relaxed">
                    "Arrived safely packed in amber glass. The instructions regarding Anupana with warm milk were very clear and helpful."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
