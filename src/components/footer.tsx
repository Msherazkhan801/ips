'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function Footer() {
  const { isAdmin } = useAuth();

  return (
    <footer className="bg-school-950 text-white border-t border-school-900 pt-16 pb-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-school-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-school-800/60">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gold-400/40 bg-white p-0.5 shadow-md">
                <img
                  src="/images/iqra-logo.png"
                  alt="Iqra Public School Permoli Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-tight text-white">
                  IQRA PUBLIC SCHOOL
                </span>
                <p className="text-[10px] tracking-widest uppercase font-bold text-gold-400">
                  PERMOLI (SWABI, KPK)
                </p>
              </div>
            </Link>
            
            <p className="text-xs text-school-200/80 leading-relaxed max-w-sm">
              Iqra Public School Permoli provides exemplary modern education, science laboratories, computer training, and strong Islamic moral values from Nursery to Matric.
            </p>

            <div className="space-y-2 text-xs text-school-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Main Bazar Road, Permoli, District Swabi, KPK</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+92 (347) 294-3510</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/923472943510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors"
                >
                  WhatsApp: 0347-2943510 (+92 301 8347029)
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded bg-school-900 text-school-300 text-[10px] font-bold uppercase border border-school-800">
                BISE MARDAN AFFILIATED
              </span>
              <span className="px-2.5 py-1 rounded bg-school-900 text-gold-400 text-[10px] font-bold uppercase border border-school-800">
                REGISTERED & RECOGNIZED
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-school-200/90">
              <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About IPS Permoli</Link></li>
              <li><Link href="/academics" className="hover:text-white transition-colors">Academic Syllabus</Link></li>
              <li><Link href="/facilities" className="hover:text-white transition-colors">Campus & Transport</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Campus Photo Gallery</Link></li>
              <li><Link href="/notices" className="hover:text-white transition-colors">Notices & Date Sheets</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Student & Parent
            </h4>
            <ul className="space-y-2 text-xs text-school-200/90">
              <li><Link href="/fee-check" className="hover:text-white transition-colors font-bold text-gold-300">★ Check Remaining Fees</Link></li>
              <li><Link href="/fee-check" className="hover:text-white transition-colors">Download Fee Receipts</Link></li>
              <li><Link href="/notices" className="hover:text-white transition-colors">Examination Schedules</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Admission Inquiries</Link></li>
              <li><Link href="/facilities" className="hover:text-white transition-colors">Permoli Van Routes</Link></li>
            </ul>
          </div>

          {/* Col 4: Administrative Portal Access */}
          <div className="space-y-3 bg-school-900/60 p-4 rounded-2xl border border-school-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Admin & Staff Desk
            </h4>
            <p className="text-[11px] text-school-300 leading-relaxed">
              Authorized school staff entrance for student records, fees collection, ID card printing & certificates.
            </p>
            <div className="pt-2">
              <Link
                href={isAdmin ? "/admin" : "/admin/login"}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-school-700 to-school-800 hover:from-school-600 hover:to-school-700 text-white border border-school-600 shadow-md transition-all group"
              >
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>{isAdmin ? "Admin Dashboard" : "Admin Portal Login"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-school-300 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-school-400 font-medium">
          <p>© 2026-2027 Iqra Public School Permoli (IPS). All rights reserved.</p>
          <div className="flex items-center gap-4 text-school-400">
            <Link href="/fee-check" className="hover:text-gold-400 transition-colors">Fee Verification</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">Permoli Campus</Link>
            <span>•</span>
            <Link href={isAdmin ? "/admin" : "/admin/login"} className="text-school-300 hover:text-gold-400 flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3 text-gold-400" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
