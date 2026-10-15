import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, CheckCircle2, Stethoscope } from 'lucide-react';
import { ViewMode } from '../types';

interface ContactViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultation: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Formulation Inquiry',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B726D] mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E4D3B] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[#1E4D3B] font-semibold">Contact & Clinic Support</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Clinic Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#1E4D3B] mb-2">
                Connect With Vedyam
              </h1>
              <p className="text-xs sm:text-sm text-[#6B726D] leading-relaxed">
                Whether you have queries regarding dosage, order status, or botanical sourcing, our team of Ayurvedic pharmacists and customer wellness coordinators is here to guide you.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#EFE7D8] shadow-xs space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1E4D3B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#1E4D3B]">Registered Laboratory & Works</h4>
                  <p className="text-[#6B726D] mt-0.5">
                    Vedyam Botanical Formulations Pvt. Ltd.<br />
                    Plot 18, Classical Herb Industrial Park, Palakkad, Kerala 678001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1E4D3B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#1E4D3B]">Direct Telephone Support</h4>
                  <p className="text-[#6B726D] mt-0.5">+91 (080) 4122-8900</p>
                  <p className="text-[11px] text-[#9CAF93]">Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#1E4D3B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#1E4D3B]">Direct Email</h4>
                  <p className="text-[#6B726D] mt-0.5">care@vedyam-ayurveda.com</p>
                </div>
              </div>
            </div>

            {/* Vaidya Consultation Callout */}
            <div className="p-5 bg-[#EFE7D8]/80 rounded-2xl border border-[#E2D7C3] flex items-start gap-3.5">
              <Stethoscope className="w-5 h-5 text-[#1E4D3B] shrink-0 mt-1" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1E4D3B]">
                  Looking for a Doctor Consultation?
                </h4>
                <p className="text-xs text-[#6B726D] mt-1 mb-3">
                  Schedule a private 30-minute video session with our certified Ayurvedic physicians.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-2 bg-[#1E4D3B] text-white text-xs font-semibold rounded hover:bg-[#163B2D]"
                >
                  Book Doctor Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#EFE7D8] p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1E4D3B] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#6B726D] mb-6">
                Fill in the form below and an Ayurvedic coordinator will respond within 24 business hours.
              </p>

              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#232B26] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#232B26] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ramesh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#232B26] mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#232B26] mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B] bg-white"
                      >
                        <option>General Formulation Inquiry</option>
                        <option>Order & Dispatch Support</option>
                        <option>Batch Purity & Lab Certificate Request</option>
                        <option>Bulk Ayurvedic Clinic Supply</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#232B26] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share details regarding your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CEBC] focus:outline-none focus:border-[#1E4D3B]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1E4D3B] hover:bg-[#163B2D] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E4D3B]/10 text-[#1E4D3B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1E4D3B]">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-[#6B726D] max-w-sm mx-auto">
                    Thank you for reaching out. A Vedyam clinical representative will review your message and reply via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 bg-[#FAF6ED] text-[#1E4D3B] rounded text-xs font-semibold hover:bg-[#EFE7D8]"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
