'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Search, 
  Phone, 
  Mail, 
  ChevronRight,
  Sparkles,
  BookOpen,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  onOpenFeeLookup?: () => void;
  onOpenAdmission?: () => void;
}

export default function Navbar({ onOpenFeeLookup, onOpenAdmission }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Notices', href: '/notices' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-school-950 text-white text-xs py-2 px-4 sm:px-8 border-b border-school-800/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href="https://wa.me/923472943510" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-school-200 hover:text-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+92 (347) 294-3510</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-school-200">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              Permoli, District Swabi, KPK
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-2.5 h-2.5" /> Admissions Open 2026-27
            </span>
          </div>
          <div className="flex items-center gap-4 text-school-300">
            <Link
              href="/fee-check"
              className="hover:text-gold-400 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Search className="w-3 h-3 text-gold-400" />
              Student Fee Lookup
            </Link>
            <span className="text-school-700">|</span>
            <Link href="/notices" className="hover:text-white transition-colors">
              Notice Board
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-md py-3'
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo with School Emblem (Circle Only) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-sm border border-gold-400/40 bg-white p-0.5">
              <img
                src="/images/iqra-logo.png"
                alt="Iqra Public School Permoli Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-school-950">
                  IPS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-gold-400/20 text-gold-800 border border-gold-400/40">
                  PERMOLI
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500 flex items-center gap-1.5">
                IQRA PUBLIC SCHOOL PERMOLI
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links (Separate Pages) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-school-800 font-bold'
                      : 'text-slate-700 hover:text-school-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-school-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/fee-check"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-school-800 bg-school-50 hover:bg-school-100 rounded-lg transition-colors border border-school-200"
            >
              <Search className="w-3.5 h-3.5 text-school-600" />
              Fee Portal
            </Link>
            
            {onOpenAdmission ? (
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-school-800 to-school-600 hover:from-school-900 hover:to-school-700 rounded-lg shadow-md shadow-school-800/20 hover:shadow-lg transition-all"
              >
                <span>Apply Online</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-school-800 to-school-600 hover:from-school-900 hover:to-school-700 rounded-lg shadow-md shadow-school-800/20 hover:shadow-lg transition-all"
              >
                <span>Apply Online</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === link.href
                      ? 'bg-school-50 text-school-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/fee-check"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-school-900 bg-school-100 rounded-lg"
              >
                <Search className="w-4 h-4" /> Check Student Fee Status
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-school-800 rounded-lg shadow-md"
              >
                Apply for Admission 2026-27
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
