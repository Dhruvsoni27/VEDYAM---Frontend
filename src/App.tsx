import React, { useState } from 'react';
import { ViewMode, Product, HealthConcernId, CartItem, WellnessCombo } from './types';
import { PRODUCTS, WELLNESS_COMBOS, TESTIMONIALS, BLOG_ARTICLES } from './data/mockData';

// Core Components
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ConcernGrid } from './components/ConcernGrid';
import { ProductGrid } from './components/ProductGrid';
import { HeritageSection } from './components/HeritageSection';
import { PillarsSection } from './components/PillarsSection';
import { WellnessCombos } from './components/WellnessCombos';
import { EditorialBanner } from './components/EditorialBanner';
import { CustomerStories } from './components/CustomerStories';
import { JournalPreview } from './components/JournalPreview';
import { ConsultationCTA } from './components/ConsultationCTA';
import { FAQAccordion } from './components/FAQAccordion';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Views & Modals
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { AboutView } from './components/AboutView';
import { AyurvedaScienceView } from './components/AyurvedaScienceView';
import { JournalView } from './components/JournalView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ConsultationModal } from './components/ConsultationModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedConcernId, setSelectedConcernId] = useState<HealthConcernId | null>(null);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: PRODUCTS[0].variants[0].size,
      price: PRODUCTS[0].variants[0].price,
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['ved-02', 'ved-05']);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Navigation Helper
  const navigateTo = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectConcern = (concernId: HealthConcernId) => {
    setSelectedConcernId(concernId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, price: number, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, selectedSize: size, price, quantity }];
      }
    });
  };

  const handleAddComboToCart = (combo: WellnessCombo) => {
    // Convert combo into cart item format
    const dummyProduct: Product = {
      id: combo.id,
      slug: combo.id,
      name: combo.name,
      category: combo.category,
      healthConcern: combo.healthConcern,
      shortBenefit: combo.shortBenefit,
      rating: 4.9,
      reviewCount: 88,
      price: combo.price,
      mrp: combo.mrp,
      discountPercent: combo.discountPercent,
      inStock: true,
      image: combo.image,
      galleryImages: [combo.image],
      variants: [{ size: 'Complete Synergy Kit', price: combo.price, mrp: combo.mrp }],
      classicalTextRef: 'Traditional Ayurvedic Classical Synergy Protocol',
      description: combo.description,
      keyIngredients: [],
      benefits: combo.includedItems,
      dosage: 'Follow individual enclosed bottle guidelines.',
      anupana: 'Warm water or as advised by Vaidya.',
      precautions: 'Check individual product leaflets.',
      storage: 'Store in dry place.',
      faqs: [],
    };
    handleAddToCart(dummyProduct, 'Complete Synergy Kit', combo.price, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, size: string, price: number, quantity: number = 1) => {
    handleAddToCart(product, size, price, quantity);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedSize === size))
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const cartTotalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] text-[#232B26]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onSelectConcern={handleSelectConcern}
        cartCount={cartTotalItemCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 3. Hero Section */}
            <Hero
              onNavigate={navigateTo}
              onExploreConcerns={() => {
                const el = document.getElementById('concerns-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. Trust Strip */}
            <TrustStrip onOpenConsultation={() => setIsConsultationOpen(true)} />

            {/* 5. Shop by Health Concern Grid */}
            <div id="concerns-section">
              <ConcernGrid
                onSelectConcern={handleSelectConcern}
                onViewAllShop={() => navigateTo('shop')}
              />
            </div>

            {/* 6. Bestselling Products */}
            <ProductGrid
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p, size, price) => handleAddToCart(p, size, price, 1)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onViewAllShop={() => navigateTo('shop')}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 7. Heritage & About Story */}
            <HeritageSection onNavigate={navigateTo} />

            {/* 8. Ayurveda + Modern Science (Pillars) */}
            <PillarsSection />

            {/* 9. Wellness Combos */}
            <WellnessCombos
              combos={WELLNESS_COMBOS}
              onAddComboToCart={handleAddComboToCart}
            />

            {/* 10. Editorial Promotional Banner */}
            <EditorialBanner
              onNavigate={navigateTo}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            {/* 11. Customer Stories (Clearly labeled sample testimonials) */}
            <CustomerStories testimonials={TESTIMONIALS} />

            {/* 12. Journal Preview */}
            <JournalPreview articles={BLOG_ARTICLES} />

            {/* 13. Doctor Consultation CTA */}
            <ConsultationCTA onOpenConsultation={() => setIsConsultationOpen(true)} />

            {/* 14. FAQ Accordion */}
            <FAQAccordion />

            {/* 15. Newsletter */}
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && (
          <ShopView
            products={PRODUCTS}
            selectedConcernId={selectedConcernId}
            onClearConcern={() => setSelectedConcernId(null)}
            onSelectConcern={(id) => setSelectedConcernId(id)}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size, price) => handleAddToCart(p, size, price, 1)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onBackHome={() => navigateTo('home')}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={(p, size, price, qty) => handleAddToCart(p, size, price, qty)}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={navigateTo}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {currentView === 'ayurveda' && (
          <AyurvedaScienceView
            onNavigate={navigateTo}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {currentView === 'journal' && <JournalView onNavigate={navigateTo} />}

        {currentView === 'contact' && (
          <ContactView
            onNavigate={navigateTo}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}
      </main>

      {/* 16. Complete Brand Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectConcern={handleSelectConcern}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => navigateTo('shop')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* Vaidya Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, size, price, qty) => handleAddToCart(p, size, price, qty)}
        onViewFullDetails={handleSelectProduct}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
