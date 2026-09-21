'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Bell, 
  Calendar, 
  Tag, 
  AlertCircle, 
  FileText, 
  ChevronRight,
  Download
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function NoticesPage() {
  const { notices } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const activeNotices = notices.filter(n => n.active);

  const filteredNotices = selectedCategory === 'all'
    ? activeNotices
    : activeNotices.filter(n => n.category === selectedCategory);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

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
              <Bell className="w-3.5 h-3.5 text-gold-400" />
              <span>Official Announcements</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Notice Board & Circulars: IPS Permoli
            </h1>
            <p className="text-sm sm:text-base text-school-200">
              Official notifications regarding board examinations, holiday schedules, parent-teacher meetings, and student events.
            </p>
          </div>
        </section>

        {/* Notices Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {['all', 'admission', 'exam', 'event', 'holiday', 'general'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-school-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Circulars' : cat}
                </button>
              ))}
            </div>

            {/* Notices List */}
            {filteredNotices.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200 text-slate-500">
                No circulars posted under this category.
              </div>
            ) : (
              <div className="space-y-6">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-school-400 hover:bg-white transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadge(notice.priority)}`}>
                          {notice.priority} Notice
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Published: {formatDate(notice.date)}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 leading-snug">
                        {notice.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {notice.content}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-school-700 uppercase">
                        <Tag className="w-3.5 h-3.5 text-school-500" />
                        Category: {notice.category}
                      </span>

                      <span className="text-xs font-bold text-slate-400">
                        Official Gazette • IPS Permoli
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
