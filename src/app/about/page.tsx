'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Calendar,
  Compass,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function AboutPage() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const values = [
    {
      icon: BookOpen,
      title: 'Academic Distinction',
      desc: 'Rigorous modern curriculum preparing students for outstanding results in BISE Mardan Board Matriculation examinations.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: Heart,
      title: 'Islamic & Moral Ethics',
      desc: 'Nurturing sound character, Tarbiyah, Nazra Quran, and Islamic values to create responsible, compassionate citizens.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: Building2,
      title: 'Modern Science & IT',
      desc: 'Equipped with practical science laboratories and computer facilities ensuring our students master future digital skills.',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      icon: ShieldCheck,
      title: 'Discipline & Leadership',
      desc: 'Instilling self-confidence, public speaking ability, teamwork, and leadership through inter-school competitions and debates.',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenFeeLookup={() => setFeeModalOpen(true)}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1">
        
        {/* About Hero Header */}
        <section className="relative bg-gradient-to-b from-school-950 via-school-900 to-school-950 text-white py-20 lg:py-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-school-600/20 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-400 text-xs font-bold border border-white/15 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>About Iqra Public School Permoli</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Illuminating Minds, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-300 via-white to-gold-400">
                    Inspiring Character in Permoli
                  </span>
                </h1>

                <p className="text-base text-school-200 leading-relaxed max-w-2xl">
                  Established with the noble purpose of imparting quality education, <strong>Iqra Public School Permoli (IPS)</strong> stands as a beacon of academic excellence in District Swabi, combining modern scientific education with timeless moral and Islamic guidance.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setAdmissionModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-school-950 text-xs font-bold shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-gold-400" />
                    <span>Visit Permoli Campus</span>
                  </Link>
                </div>
              </div>

              {/* School Mural Landmark Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-school-900 group relative">
                  <img
                    src="/images/iqra-school-event.jpg"
                    alt="Iqra Public School Permoli Wall Mural & Gate"
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold-500 text-school-950">
                      Official Campus View
                    </span>
                    <p className="text-xs font-bold mt-1 text-slate-100">
                      Iqra Public School Permoli Main Entrance Mural
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Vision, Mission & Philosophy */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Vision */}
              <div className="p-8 rounded-3xl bg-school-50/70 border border-school-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-school-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-school-950 tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    To be the leading educational institution in District Swabi recognized for producing high-achieving scholars equipped with contemporary scientific competence, ethical fortitude, leadership capabilities, and genuine devotion to community development.
                  </p>
                </div>
                <div className="pt-6 border-t border-school-200/60 mt-6 flex items-center gap-2 text-xs font-bold text-school-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Nurturing Lifelong Learners</span>
                </div>
              </div>

              {/* Mission */}
              <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    To deliver affordable, high-standard primary and secondary education through dedicated qualified faculty, state-of-the-art computer and science laboratories, interactive learning tools, and character building centered on Islamic values.
                  </p>
                </div>
                <div className="pt-6 border-t border-emerald-200/60 mt-6 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Accessible Quality Education for Permoli</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Core Pillars / Values */}
        <section className="py-20 bg-slate-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-100 text-school-800 uppercase tracking-wider">
                Core Pillars
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
                Why Parents Trust Iqra Public School Permoli
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We believe every child possesses unique talents that flourish in an encouraging, disciplined, and values-based environment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{v.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-r from-school-950 via-school-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-4 text-center">
                  <div className="w-32 h-32 rounded-3xl bg-school-800 border-4 border-gold-400/40 mx-auto overflow-hidden shadow-xl mb-4">
                    <img
                      src="/images/principal-akhter-munir.png"
                      alt="Akhter Munir - Principal of Iqra Public School Permoli"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white">Akhter Munir</h4>
                  <p className="text-xs text-gold-400 font-semibold">Principal, Iqra Public School Permoli</p>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                    Assalam-o-Alaikum & Warm Welcome
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    "Knowledge is Light, and Character is Strength"
                  </h3>
                  <p className="text-sm text-school-200 leading-relaxed font-normal">
                    "At Iqra Public School Permoli, our fundamental objective is to provide a nurturing sanctuary where children discover their highest potential. We emphasize not only academic excellence and board exam preparation, but also the cultivation of upright character, respect, truthfulness, and civic responsibility. We welcome you to join our growing family of scholars in Permoli."
                  </p>
                  <div className="pt-2 text-xs text-slate-300 font-medium">
                    — Akhter Munir, Principal, Iqra Public School Permoli
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-school-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Give Your Child the Best Education in Permoli?
            </h3>
            <p className="text-sm text-school-200 max-w-xl mx-auto">
              Admissions for Session 2026-2027 are currently open for Nursery to Class 10. Visit our campus or apply online today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setAdmissionModalOpen(true)}
                className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-school-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Apply for Admission
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-wider border border-white/20 transition-all"
              >
                Contact Administration
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
