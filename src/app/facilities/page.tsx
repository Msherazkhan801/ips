'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { 
  Building2, 
  Bus, 
  Cpu, 
  Atom, 
  Trophy, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  PhoneCall
} from 'lucide-react';

export default function FacilitiesPage() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const facilities = [
    {
      icon: Atom,
      title: 'Science & Chemistry Laboratory',
      desc: 'Complete experimental lab equipped with glassware, chemicals, microscopes, and physics apparatus ensuring students perform practicals independently for board excellence.',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&auto=format&fit=crop&q=80',
      badge: 'Practical Science',
    },
    {
      icon: Cpu,
      title: 'Digital Computer & IT Center',
      desc: 'Air-conditioned modern computer room with dedicated workstations for hands-on learning, MS Office, typing skills, and coding logic.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      badge: 'Digital Lab',
    },
    {
      icon: Bus,
      title: 'Permoli Transport & Bus Service',
      desc: 'Safe, punctual, and disciplined pick-and-drop school van fleet covering Permoli village, main bazaar, Shewa, and nearby surrounding Swabi areas.',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80',
      badge: 'Safe Commute',
    },
    {
      icon: Trophy,
      title: 'Sports & Playgrounds Arena',
      desc: 'Spacious ground for physical training, annual cricket tournaments, badminton, athletics, and morning drills under dedicated physical instructors.',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      badge: 'Athletics',
    },
    {
      icon: BookOpen,
      title: 'Student Library & Reference Corner',
      desc: 'Stocked with curricular books, Islamic historical narratives, general knowledge encyclopedias, and quiet study reading spaces.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80',
      badge: 'Knowledge Hub',
    },
    {
      icon: Building2,
      title: 'Well-Ventilated Airy Classrooms',
      desc: 'Comfortable seating, whiteboard setups, proper lighting and ventilation, creating a focused and hygienic learning atmosphere.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
      badge: 'Smart Campus',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenFeeLookup={() => setFeeModalOpen(true)}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1">
        
        {/* Header */}
        <section className="bg-gradient-to-b from-school-950 via-school-900 to-school-950 text-white py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold-400 text-xs font-bold border border-white/15">
              <Building2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Campus & Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Modern Campus Facilities in Permoli
            </h1>
            <p className="text-sm sm:text-base text-school-200">
              Providing a safe, supportive, and well-equipped environment where students learn, discover, and excel every single day.
            </p>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-school-300 transition-all flex flex-col group"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={f.image}
                        alt={f.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-school-950/80 text-gold-400 backdrop-blur-md border border-white/10">
                        {f.badge}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-school-100 text-school-800 flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-school-700 transition-colors">
                          {f.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Transport Routes Callout */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
                  <Bus className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Need School Transport in Permoli?</h4>
                  <p className="text-xs text-slate-600 mt-1">Our dedicated vans cover all major sectors of Permoli and adjacent areas with verified drivers.</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-school-800 hover:bg-school-900 text-white text-xs font-bold shadow transition-all whitespace-nowrap"
              >
                Inquire Transport Routes
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />

      <FeeLookupModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
      />
    </div>
  );
}
