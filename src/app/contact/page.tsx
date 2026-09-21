'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { useSchoolData } from '@/context/school-data-context';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Sparkles,
  Building2,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { addInquiry } = useSchoolData();
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gradeApplying: 'Grade 9 (Science)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    addInquiry({
      fullName: formData.fullName,
      email: formData.email || 'parent@example.com',
      phone: formData.phone,
      gradeApplying: formData.gradeApplying,
      message: formData.message || 'Admissions inquiry from website contact page.',
    });

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenFeeLookup={() => setFeeModalOpen(true)}
      />

      <main className="flex-1">
        
        {/* Header */}
        <section className="bg-gradient-to-b from-school-950 via-school-900 to-school-950 text-white py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold-400 text-xs font-bold border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Campus Visit & Admissions Desk</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Contact Iqra Public School Permoli
            </h1>
            <p className="text-sm sm:text-base text-school-200">
              We welcome parents and students to visit our campus in Permoli, interact with our faculty, and inquire about admissions for Session 2026-2027.
            </p>
          </div>
        </section>

        {/* Contact Info & Inquiry Form Split Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Campus Info Cards (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-school-600">
                    Get in Touch
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                    Permoli Main Campus
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Conveniently located on Main Bazar Road in Permoli, District Swabi, providing accessible education and safe transport routes for nearby villages.
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-4">
                  
                  {/* Address */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-school-100 text-school-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-400">Campus Address</h4>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        Main Bazar Road, Permoli, District Swabi, Khyber Pakhtunkhwa (KPK), Pakistan
                      </p>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-400">Direct Contact & WhatsApp</h4>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        +92 (347) 294-3510 (Call / WhatsApp)<br />
                        0347-2943510
                      </p>
                      <a
                        href="https://wa.me/923472943510?text=Hello%20Iqra%20Public%20School%20Permoli,%20I%20would%20like%20to%20inquire%20about%20admissions"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat Directly on WhatsApp (+92 347 2943510)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Visiting Hours */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-400">Visiting & Office Hours</h4>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        Monday – Saturday: 7:30 AM – 2:00 PM<br />
                        Friday: 7:30 AM – 12:30 PM (Sunday Closed)
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Interactive Admission / Contact Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative">
                  
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-school-600 bg-school-100 px-2.5 py-1 rounded-full">
                      Admissions & Inquiry Form
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2">
                      Send an Inquiry or Schedule a Visit
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Fill out the form below. Our admissions coordinator in Permoli will contact you within 24 hours.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">
                        Inquiry Successfully Submitted!
                      </h4>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">
                        Thank you for contacting Iqra Public School Permoli. Our admissions office has received your message and will reach out to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            gradeApplying: 'Grade 9 (Science)',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 bg-school-900 text-white text-xs font-bold rounded-xl shadow"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Parent / Guardian / Student Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Muhammad Tariq Khan"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-school-600 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Mobile / WhatsApp Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              required
                              placeholder="0300-1234567"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-school-600 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Class / Grade Applying For
                          </label>
                          <select
                            value={formData.gradeApplying}
                            onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-school-600 outline-none"
                          >
                            <option value="Nursery / Playgroup">Nursery / Playgroup</option>
                            <option value="Prep / KG">Prep / KG</option>
                            <option value="Primary (Class 1 to 5)">Primary (Class 1 to 5)</option>
                            <option value="Middle (Class 6 to 8)">Middle (Class 6 to 8)</option>
                            <option value="Class 9 (Science / Bio)">Class 9 (Science / Bio)</option>
                            <option value="Class 9 (Science / Computer)">Class 9 (Science / Computer)</option>
                            <option value="Class 10 (Matric Science)">Class 10 (Matric Science)</option>
                            <option value="Hifz-e-Quran Program">Hifz-e-Quran Program</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="parent@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-school-600 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Message / Special Requirements (Transport, Concession, etc.)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about student's previous school, transport needs in Permoli, or any questions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-school-600 outline-none resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-gradient-to-r from-school-900 to-school-800 hover:from-school-800 hover:to-school-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-school-900/20 transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4 text-gold-400" />
                          <span>Submit Admission Inquiry</span>
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />

      <FeeLookupModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
      />
    </div>
  );
}
