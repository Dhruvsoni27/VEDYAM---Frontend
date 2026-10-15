import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [contact, setContact] = useState({
    firstName: 'Devika',
    lastName: 'Menon',
    email: 'devika.menon@example.com',
    phone: '+91 98451 23456',
  });

  const [address, setAddress] = useState({
    street: 'Flat 402, Lotus Palm Apartments, 12th Main',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShipping = rawSubtotal >= 999;
  const shippingCost = freeShipping ? 0 : 99;
  const total = rawSubtotal + shippingCost;

  const handlePlaceOrder = () => {
    const generatedId = `VED-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedId);
    setStep(4);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#EFE7D8] relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 p-2 text-[#6B726D] hover:text-[#1E4D3B] bg-[#FAF6ED] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator Header (steps 1 to 3) */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C1714A]">
                Secure Direct Checkout
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1E4D3B]">
              Complete Your Wellness Order
            </h2>

            <div className="flex items-center gap-2 mt-4 text-xs font-medium">
              <span
                className={`px-3 py-1 rounded-full ${
                  step === 1 ? 'bg-[#1E4D3B] text-white' : 'bg-[#FAF6ED] text-[#232B26]'
                }`}
              >
                1. Contact
              </span>
              <span className="text-[#9CAF93]">→</span>
              <span
                className={`px-3 py-1 rounded-full ${
                  step === 2 ? 'bg-[#1E4D3B] text-white' : 'bg-[#FAF6ED] text-[#232B26]'
                }`}
              >
                2. Shipping Address
              </span>
              <span className="text-[#9CAF93]">→</span>
              <span
                className={`px-3 py-1 rounded-full ${
                  step === 3 ? 'bg-[#1E4D3B] text-white' : 'bg-[#FAF6ED] text-[#232B26]'
                }`}
              >
                3. Payment
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Contact Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1E4D3B]">
              Recipient Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#232B26] mb-1">
                Email Address (for invoice & dispatch tracking)
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#232B26] mb-1">
                Phone Number (for delivery coordinator)
              </label>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <span>Continue to Shipping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1E4D3B]">
              Delivery Destination (India)
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#232B26] mb-1">
                Street Address, Flat / House No., Landmark
              </label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">PIN Code</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#FAF6ED] rounded-lg border border-[#EFE7D8] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1E4D3B]" />
                <span>Express Courier Service (3-5 Business Days)</span>
              </div>
              <span className="font-semibold text-[#1E4D3B]">
                {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
              </span>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-[#6B726D] hover:text-[#232B26] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method & Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1E4D3B]">
              Choose Payment Method
            </h3>

            <div className="space-y-2.5">
              <label
                className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#1E4D3B] bg-[#FAF6ED] ring-1 ring-[#1E4D3B]'
                    : 'border-[#EFE7D8] hover:border-[#9CAF93]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#1E4D3B]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1E4D3B]">
                      Cash on Delivery (COD)
                    </div>
                    <div className="text-[11px] text-[#6B726D]">
                      Pay in cash or UPI QR upon courier arrival
                    </div>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#2A654E] bg-[#E7ECE4] px-2 py-0.5 rounded">
                  Popular
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#1E4D3B] bg-[#FAF6ED] ring-1 ring-[#1E4D3B]'
                    : 'border-[#EFE7D8] hover:border-[#9CAF93]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#1E4D3B]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1E4D3B]">
                      Instant UPI (GPay / PhonePe / Paytm / BHIM)
                    </div>
                    <div className="text-[11px] text-[#6B726D]">
                      Simulated fast UPI payment authorization
                    </div>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#1E4D3B] bg-[#FAF6ED] ring-1 ring-[#1E4D3B]'
                    : 'border-[#EFE7D8] hover:border-[#9CAF93]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#1E4D3B]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1E4D3B]">
                      Net Banking & Cards
                    </div>
                    <div className="text-[11px] text-[#6B726D]">
                      All major Indian national banks supported
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* Order Price Summary */}
            <div className="p-4 bg-[#FAF6ED] rounded-xl border border-[#EFE7D8] text-xs space-y-1.5 mt-4">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#232B26] tabular-nums">₹{rawSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium text-[#232B26]">
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1E4D3B] pt-2 border-t border-[#EFE7D8]">
                <span>Payable Amount:</span>
                <span className="tabular-nums">₹{total}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-[#6B726D] hover:text-[#232B26] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-7 py-3 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Confirm & Place Order (₹{total})</span>
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmed Screen */}
        {step === 4 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#1E4D3B]/10 text-[#1E4D3B] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-[#1E4D3B]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E4D3B] mb-2">
              Order Confirmed — Preparing Shipment
            </h3>
            <p className="text-xs sm:text-sm text-[#6B726D] max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold text-[#232B26]">{contact.firstName}</span>. Your authentic formulations are being carefully packaged in our cleanroom facility.
            </p>

            <div className="bg-[#FAF6ED] rounded-xl p-5 border border-[#EFE7D8] text-left max-w-md mx-auto mb-6 text-xs space-y-2">
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Order Reference:</span>
                <span className="font-mono font-bold text-[#1E4D3B]">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Total Amount:</span>
                <span className="font-bold text-[#232B26]">₹{total} ({paymentMethod.toUpperCase()})</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Delivery Address:</span>
                <span className="font-medium text-[#232B26] text-right truncate max-w-[200px]">
                  {address.street}, {address.city} - {address.pincode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B726D]">Estimated Dispatch:</span>
                <span className="text-[#2A654E] font-medium">Tomorrow, via Bluedart Express</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#1E4D3B] text-white text-xs font-semibold rounded-lg hover:bg-[#163B2D] transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
