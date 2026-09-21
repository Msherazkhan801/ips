'use client';

import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Sparkles, 
  Compass 
} from 'lucide-react';

interface ContactSectionProps {
  onOpenAdmission: () => void;
}

export default function ContactSection({ onOpenAdmission }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-school-100 text-school-800 uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-school-600" /> Connect with us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Global Campus
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            We invite prospective parents and students for a personalized guided campus walk and interaction with our faculty.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 hover:border-school-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-school-100 text-school-800 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Permoli Campus Location
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Main Bazar Road, Permoli, District Swabi, Khyber Pakhtunkhwa (KPK), Pakistan
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-school-600">
              Iqra Public School Permoli Main Gate
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 hover:border-school-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Admissions & WhatsApp Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Call: +92 (347) 294-3510<br />
                WhatsApp: 0347-2943510<br />
                Permoli, District Swabi
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-emerald-600">
              Monday - Saturday: 7:30 AM - 2:00 PM
            </div>
          </div>

          {/* Card 3: Action Card */}
          <div className="bg-gradient-to-br from-school-950 via-school-900 to-school-800 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-gold-400 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Schedule a Campus Tour
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience our STEM labs, Olympic aquatic arena, and creative arts studios in person.
              </p>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={onOpenAdmission}
                className="w-full py-3 bg-gradient-to-r from-gold-400 to-gold-300 text-school-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:opacity-95 shadow-md transition-all"
              >
                Book Guided Visit
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
