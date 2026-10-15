import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { Product, HealthConcernId } from '../types';
import { HEALTH_CONCERNS } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  selectedConcernId: HealthConcernId | null;
  onClearConcern: () => void;
  onSelectConcern: (id: HealthConcernId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, price: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onBackHome: () => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedConcernId,
  onClearConcern,
  onSelectConcern,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onBackHome,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortBenefit.toLowerCase().includes(q);
          const matchIngr = p.keyIngredients.some((ing) =>
            ing.name.toLowerCase().includes(q) || ing.botanical.toLowerCase().includes(q)
          );
          if (!matchName && !matchDesc && !matchIngr) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Health Concern filter
        if (selectedConcernId && p.healthConcern !== selectedConcernId) {
          return false;
        }

        // Price filter
        if (p.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Bestseller default
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedConcernId, maxPrice, sortBy]);

  const activeConcern = HEALTH_CONCERNS.find((c) => c.id === selectedConcernId);

  return (
    <div className="min-h-screen bg-[#FAF6ED] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#6B726D] mb-6">
          <button onClick={onBackHome} className="hover:text-[#1E4D3B] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[#1E4D3B] font-medium">Classical Formulation Catalog</span>
          {activeConcern && (
            <>
              <span>/</span>
              <span className="text-[#C1714A] font-semibold">{activeConcern.title}</span>
            </>
          )}
        </div>

        {/* Catalog Header */}
        <div className="mb-8 pb-6 border-b border-[#EFE7D8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-[#C1714A] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Classical Quality Guaranteed</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E4D3B]">
                {activeConcern ? activeConcern.title : 'All Ayurvedic Formulations'}
              </h1>
              <p className="text-sm text-[#6B726D] mt-2 max-w-2xl">
                {activeConcern
                  ? activeConcern.shortDesc
                  : 'Authentic Samhita formulations prepared according to traditional culinary guidelines with certified botanical ingredients.'}
              </p>
            </div>

            <div className="text-xs text-[#6B726D] self-start md:self-end">
              Showing <span className="font-bold text-[#1E4D3B]">{filteredProducts.length}</span> formulations
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-xl border border-[#EFE7D8] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Live Search */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-[#6B726D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by herb, name (e.g. Triphala, Ashwagandha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/40"
              />
            </div>

            {/* Health Concern Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedConcernId || 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'all') onClearConcern();
                  else onSelectConcern(val as HealthConcernId);
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white text-[#232B26]"
              >
                <option value="all">All Health Concerns (12 Categories)</option>
                {HEALTH_CONCERNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white text-[#232B26]"
              >
                <option value="bestseller">Sort by: Bestsellers First</option>
                <option value="rating">Sort by: Highest Rated</option>
                <option value="price-asc">Sort by: Price (Low to High)</option>
                <option value="price-desc">Sort by: Price (High to Low)</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="flex justify-between text-[11px] text-[#6B726D] mb-1">
                <span>Max Price:</span>
                <span className="font-semibold text-[#1E4D3B] tabular-nums">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1E4D3B] cursor-pointer"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#EFE7D8]">
            <span className="text-xs font-semibold text-[#6B726D] mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1E4D3B] text-white shadow-xs'
                    : 'bg-[#FAF6ED] text-[#232B26] hover:bg-[#EFE7D8]'
                }`}
              >
                {cat}
              </button>
            ))}

            {(selectedCategory !== 'All' || selectedConcernId || searchQuery || maxPrice < 2500) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  onClearConcern();
                  setSearchQuery('');
                  setMaxPrice(2500);
                }}
                className="ml-auto inline-flex items-center gap-1 text-xs text-[#C1714A] hover:underline font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#EFE7D8] p-8">
            <Filter className="w-10 h-10 text-[#9CAF93] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1E4D3B] mb-2">
              No matching formulations found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B726D] max-w-md mx-auto mb-6">
              Try adjusting your search terms or clearing the selected category and health concern filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                onClearConcern();
                setSearchQuery('');
                setMaxPrice(2500);
              }}
              className="px-5 py-2.5 bg-[#1E4D3B] text-white rounded-lg text-xs font-semibold hover:bg-[#163B2D]"
            >
              Show All Formulations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
