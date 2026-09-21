'use client';

import React, { useState } from 'react';
import { useSchoolData } from '@/context/school-data-context';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle, 
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const { addInquiry } = useSchoolData();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gradeApplying: 'Grade 9',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gradeApplying: formData.gradeApplying,
      message: formData.message || 'General admission inquiry for academic year 2026-2027.',
    });

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      gradeApplying: 'Grade 9',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gold-400/40 bg-white p-0.5 shadow">
              <img
                src="/images/iqra-logo.png"
                alt="Iqra Public School Permoli Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Admissions 2026-2027
              </div>
              <h3 className="text-xl font-black text-white">
                Iqra Public School Permoli
              </h3>
            </div>
          </div>
          <p className="text-xs text-school-200 mt-2">
            Submit your child's details to schedule admission registration or campus consultation in Permoli, Swabi.
          </p>
        </div>

        {/* Body Form or Success */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Application Received!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for applying to Iqra Public School Permoli. Our admissions desk will review your details and contact you via phone/WhatsApp.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-school-900 hover:bg-school-800 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Parent / Student Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Hayes"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Grade / Level Applying For
                </label>
                <select
                  value={formData.gradeApplying}
                  onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                >
                  <option value="Kindergarten (Ages 3-5)">Kindergarten (Ages 3-5)</option>
                  <option value="Primary School (Grades 1-5)">Primary School (Grades 1-5)</option>
                  <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                  <option value="Grade 9 (Cambridge IGCSE)">Grade 9 (Cambridge IGCSE)</option>
                  <option value="Grade 10 (Cambridge IGCSE)">Grade 10 (Cambridge IGCSE)</option>
                  <option value="Grade 11 (IB / A-Levels)">Grade 11 (IB / A-Levels)</option>
                  <option value="Grade 12 (IB / A-Levels)">Grade 12 (IB / A-Levels)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Special Inquiries or Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your student's background, transportation needs, or scholarship inquiries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-school-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Application
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
