'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Notice } from '@/types';

export default function AdminNoticesPage() {
  const { notices, addNotice, deleteNotice } = useSchoolData();
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Notice['category']>('general');
  const [priority, setPriority] = useState<Notice['priority']>('normal');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addNotice({
      title,
      content,
      category,
      priority,
      active: true,
    });

    setTitle('');
    setContent('');
    setModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Notice Board & Announcements"
        subtitle="Publish examination dates, holidays, and official school circulars"
      />

      <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Official Notice Board</h3>
            <p className="text-xs text-slate-500 mt-0.5">Notices displayed live on the public school website</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Notice</span>
          </button>
        </div>

        {/* Notices list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    notice.priority === 'urgent'
                      ? 'bg-red-100 text-red-700'
                      : notice.priority === 'high'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{formatDate(notice.date)}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {notice.title}
                </h4>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="capitalize font-semibold text-slate-500">
                  {notice.category}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete notice "${notice.title}"?`)) {
                      deleteNotice(notice.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Modal: Post Notice */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-school-950 text-white p-6 relative flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Post Official Announcement</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-Term Assessments Timetable"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-school-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  >
                    <option value="general">General Circular</option>
                    <option value="exam">Examination Schedule</option>
                    <option value="holiday">Holiday Notice</option>
                    <option value="event">Campus Event</option>
                    <option value="admission">Admissions Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Circular Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Complete announcement message..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
