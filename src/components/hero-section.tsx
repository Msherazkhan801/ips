'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  MapPin,
  GraduationCap
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAdmission?: () => void;
  onOpenFeeLookup: () => void;
}

export default function HeroSection({ onOpenAdmission, onOpenFeeLookup }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-school-950 via-school-900 to-school-950 text-white pt-12 pb-24 lg:pt-16 lg:pb-28">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-school-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-gold-500/15 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Subtle Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-400 text-xs font-semibold animate-fade-in shadow-inner">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
              <span>Premier Academic & Islamic Institution in Permoli</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              IQRA PUBLIC SCHOOL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-300 via-white to-gold-400">
                PERMOLI (SWABI)
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Empowering students with quality modern science, computer training, board exam preparation, and core Islamic character education from Nursery to Matric.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-school-950 bg-gradient-to-r from-gold-400 to-gold-300 hover:from-gold-300 hover:to-gold-200 shadow-lg shadow-gold-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Admissions 2026-2027</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/fee-check"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-school-300" />
                <span>Student Fee Portal</span>
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>About School</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Value Props Checks */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>BISE Mardan Board Matric Science</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Modern Computer & Science Lab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Permoli & Surrounding Van Service</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Authentic School Faculty & Students Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame displaying the authentic event photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-school-900 group">
                <img
                  src="/images/iqra-hero.jpg"
                  alt="Iqra Public School Permoli Faculty and Students"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-950/90 via-school-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-400 text-school-950 shadow-sm inline-block mb-1">
                    IPS Permoli Campus Life
                  </span>
                  <p className="text-sm font-bold leading-tight">Faculty & Student Farewell Assembly</p>
                  <p className="text-[11px] text-slate-200 mt-0.5">Iqra Public School Permoli (District Swabi, KPK)</p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md text-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Board Success</p>
                  <p className="text-[10px] text-slate-500 font-medium">BISE Mardan Position Holders</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-school-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Nursery to Class 10</p>
                  <p className="text-[10px] text-school-300 font-medium">Science & Computer Groups</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
