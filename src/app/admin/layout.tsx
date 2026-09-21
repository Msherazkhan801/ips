'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { AdminUIProvider, useAdminUI } from '@/context/admin-ui-context';
import AdminSidebar from '@/components/admin/sidebar';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();
  const { sidebarOpen, closeSidebar } = useAdminUI();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAdmin, loading, pathname, router]);

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading Management Suite...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onCloseMobile={closeSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminUIProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminUIProvider>
  );
}
