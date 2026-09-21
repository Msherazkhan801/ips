'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Menu, 
  DollarSign, 
  CreditCard, 
  Bell, 
  Globe, 
  ExternalLink, 
  RotateCcw 
} from 'lucide-react';
import { useSchoolData } from '@/context/school-data-context';
import { useAdminUI } from '@/context/admin-ui-context';
import { formatCurrency } from '@/lib/utils';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function AdminTopbar({ title, subtitle }: TopbarProps) {
  const { totalRevenue, totalRemainingFee, resetToDefaultData } = useSchoolData();
  const { toggleSidebar } = useAdminUI();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Quick Financial Summary Pills & Site Link */}
      <div className="flex items-center gap-3">
        
        {/* Earnings pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-[11px]">
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-[9px] block leading-none">Earnings</span>
            <span className="font-black text-xs">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>

        {/* Remaining Fee pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="text-[11px]">
            <span className="text-amber-600 font-semibold uppercase tracking-wider text-[9px] block leading-none">Pending Dues</span>
            <span className="font-black text-xs">{formatCurrency(totalRemainingFee)}</span>
          </div>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm("Reset all mock students, fees, gallery, and certificates back to original defaults?")) {
              resetToDefaultData();
            }
          }}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* View Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-school-50 hover:bg-school-100 text-school-800 text-xs font-bold transition-all border border-school-200"
        >
          <Globe className="w-3.5 h-3.5 text-school-600" />
          <span className="hidden md:inline">Live Site</span>
          <ExternalLink className="w-3 h-3 text-school-400" />
        </Link>

      </div>
    </header>
  );
}
