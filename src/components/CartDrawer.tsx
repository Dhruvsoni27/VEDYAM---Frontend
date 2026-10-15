import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold;
  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 99;
  const total = subtotalAfterDiscount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VEDYAM10') {
      setAppliedDiscount(0.1);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try VEDYAM10 for 10% off.');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const shippingProgress = Math.min(100, Math.round((subtotalAfterDiscount / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EFE7D8]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFE7D8] flex items-center justify-between bg-[#FAF6ED]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1E4D3B]" />
              <h2 className="font-serif text-lg font-bold text-[#1E4D3B]">
                Your Wellness Basket ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-[#6B726D] hover:text-[#1E4D3B] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-3 bg-[#EFE7D8]/60 border-b border-[#E2D7C3] text-xs">
            <div className="flex justify-between font-medium text-[#1E4D3B] mb-1.5">
              <span>
                {isFreeShipping ? (
                  <span className="text-[#2A654E] font-bold">✓ Free Express Delivery Unlocked!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeShipping} more for Free Shipping</span>
                )}
              </span>
              <span className="tabular-nums font-semibold">{shippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#D8CEBC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1E4D3B] transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF6ED] flex items-center justify-center mx-auto text-[#9CAF93]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E4D3B]">
                  Your Basket is Empty
                </h3>
                <p className="text-xs text-[#6B726D] max-w-xs mx-auto">
                  Discover authentic classical Ayurvedic preparations formulated for your holistic vitality.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-6 py-2.5 bg-[#1E4D3B] text-white text-xs font-semibold rounded-lg hover:bg-[#163B2D]"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-3 pb-4 border-b border-[#EFE7D8]/80 text-xs"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF6ED] border border-[#EFE7D8] shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-sm text-[#1E4D3B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          aria-label="Remove item"
                          className="text-[#6B726D] hover:text-[#C1714A] p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[#6B726D] text-[11px] mt-0.5">
                        Size: <span className="font-medium text-[#232B26]">{item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-[#D8CEBC] rounded bg-[#FAF6ED]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#1E4D3B] hover:bg-[#EFE7D8]"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold tabular-nums text-[#232B26]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#1E4D3B] hover:bg-[#EFE7D8]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-[#1E4D3B] text-sm tabular-nums">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFE7D8] bg-[#FAF6ED] space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#6B726D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. VEDYAM10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-white border border-[#1E4D3B] text-[#1E4D3B] text-xs font-semibold rounded-lg hover:bg-[#1E4D3B] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#2A654E] font-medium bg-[#E7ECE4] p-2 rounded">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>VEDYAM10 Applied (10% Off)</span>
                  </span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              {couponError && (
                <div className="text-[11px] text-[#C1714A]">{couponError}</div>
              )}

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-[#6B726D] pt-2 border-t border-[#EFE7D8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#232B26] tabular-nums">₹{rawSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#2A654E]">
                    <span>Promotional Discount</span>
                    <span className="tabular-nums">- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-medium text-[#232B26]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E4D3B] pt-1.5 border-t border-[#EFE7D8]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-base">₹{total}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#1E4D3B] hover:bg-[#163B2D] active:scale-[0.98] text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout · ₹{total}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B726D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2A654E]" />
                <span>Encrypted 256-Bit SSL Checkout · Cash on Delivery Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
