import React, { useState } from 'react';
import { X, Calendar, Clock, Stethoscope, CheckCircle2, ShieldAlert } from 'lucide-react';
import { HEALTH_CONCERNS } from '../data/mockData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    concern: 'digestion',
    date: '2026-10-02',
    timeSlot: '11:00 AM - 11:30 AM',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingId(`VED-VAD-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#EFE7D8] relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Close consultation modal"
          className="absolute top-4 right-4 p-2 text-[#6B726D] hover:text-[#1E4D3B] bg-[#FAF6ED] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FAF6ED] border border-[#EFE7D8] flex items-center justify-center text-[#1E4D3B]">
                <Stethoscope className="w-4 h-4 text-[#C9A24B]" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#C1714A]">
                Vedyam Vaidya Clinic
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1E4D3B] mb-2">
              Book Your Ayurvedic Consultation
            </h2>
            <p className="text-xs text-[#6B726D] mb-6">
              Spend 30 minutes with our experienced BAMS Ayurvedic practitioners to understand your constitution and obtain clear botanical recommendations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#232B26] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#232B26] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="radhika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#232B26] mb-1">
                    Primary Health Focus
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white"
                  >
                    {HEALTH_CONCERNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#232B26] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white"
                  >
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM IST</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM IST</option>
                    <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM IST</option>
                    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM IST</option>
                    <option value="07:00 PM - 07:30 PM">07:00 PM - 07:30 PM IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#232B26] mb-1">
                  Brief Medical Context or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your current lifestyle, digestion, or specific health inquiries..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-[#FAF6ED]/30"
                />
              </div>

              {/* Mandatory Medical Disclaimer in the booking form */}
              <div className="p-3 bg-[#FAF6ED] rounded-lg border border-[#EFE7D8] text-[11px] text-[#6B726D] flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C1714A] shrink-0 mt-0.5" />
                <span>
                  <strong>Disclaimer:</strong> Information provided is confidential. Ayurvedic consultations are for educational lifestyle guidance and do not substitute hospital emergency care.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#6B726D] hover:text-[#232B26]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg shadow-sm active:scale-95 transition-all"
                >
                  Confirm Appointment Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#1E4D3B]/10 text-[#1E4D3B] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#1E4D3B]" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#1E4D3B] mb-2">
              Consultation Scheduled!
            </h3>
            <p className="text-sm text-[#232B26]/80 mb-6 max-w-sm mx-auto">
              Thank you, <span className="font-semibold">{formData.fullName}</span>. Your private session has been reserved.
            </p>

            <div className="bg-[#FAF6ED] rounded-xl p-5 border border-[#EFE7D8] text-left max-w-md mx-auto mb-6 text-xs space-y-2">
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#1E4D3B]">{bookingId}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Doctor:</span>
                <span className="font-semibold text-[#232B26]">Dr. Priya Namboodiri, BAMS</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE7D8] pb-1.5">
                <span className="text-[#6B726D]">Time Slot:</span>
                <span className="font-medium text-[#232B26]">{formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B726D]">Confirmation:</span>
                <span className="text-[#2A654E] font-medium">Sent to {formData.email}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#1E4D3B] text-white text-xs font-semibold rounded-lg hover:bg-[#163B2D] transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
