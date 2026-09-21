'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Award, 
  IdCard, 
  Image as ImageIcon, 
  Bell, 
  Inbox, 
  Globe, 
  LogOut, 
  GraduationCap, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Dashboard Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Students & Fees',
    href: '/admin/students',
    icon: Users,
    badge: 'Finance',
  },
  {
    label: 'School ID Cards',
    href: '/admin/id-cards',
    icon: IdCard,
  },
  {
    label: 'Certificate Creator',
    href: '/admin/certificates',
    icon: Award,
  },
  {
    label: 'Site Gallery Manager',
    href: '/admin/gallery',
    icon: ImageIcon,
  },
  {
    label: 'Notice Board',
    href: '/admin/notices',
    icon: Bell,
  },
  {
    label: 'Admission Inquiries',
    href: '/admin/inquiries',
    icon: Inbox,
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-school-950 text-white flex flex-col justify-between border-r border-school-900 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="p-6 border-b border-school-900 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gold-400/40 bg-white p-0.5 shadow">
                <img
                  src="/images/iqra-logo.png"
                  alt="IPS Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="font-heading font-black text-lg tracking-tight text-white">
                  IPS PORTAL
                </h1>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-gold-400">
                  School Admin Suite
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-school-700 to-school-600 text-white shadow-md shadow-school-900/30'
                      : 'text-school-300 hover:bg-school-900/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-school-400 group-hover:text-gold-400'} transition-colors`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-400/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area & Actions */}
        <div className="p-4 border-t border-school-900/80 space-y-3">
          
          {/* Public Site Quick Link */}
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-school-300 hover:bg-school-900 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-school-500" />
          </Link>

          {/* Admin User Card */}
          <div className="p-3 rounded-xl bg-school-900/60 border border-school-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-school-800 border border-school-700 text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">
                  {user?.displayName || 'Administrator'}
                </p>
                <p className="text-[10px] text-school-400 truncate">
                  {user?.email || 'admin@ips.edu'}
                </p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="p-1.5 rounded-lg text-school-400 hover:text-red-400 hover:bg-school-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
