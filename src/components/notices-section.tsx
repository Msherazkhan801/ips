'use client';

import React from 'react';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Bell, 
  Calendar, 
  AlertCircle, 
  ChevronRight, 
  Sparkles, 
  Tag 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function NoticesSection() {
  const { notices } = useSchoolData();
  const activeNotices = notices.filter(n => n.active);

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
    <section id="notices" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-school-100 text-school-800 uppercase tracking-wider mb-2">
              <Bell className="w-3.5 h-3.5 text-school-600" /> Announcements
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              School Notice Board & Circulars
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Stay updated with official academic schedules, examination timetables, holiday calendars, and event announcements.
          </p>
        </div>

        {/* Notices Cards */}
        {activeNotices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            No active notices at this moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-school-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadge(notice.priority)}`}>
                      {notice.priority}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {formatDate(notice.date)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {notice.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 capitalize">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {notice.category}
                  </span>
                  <span className="text-xs font-bold text-school-600 hover:text-school-800 transition-colors cursor-pointer flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
