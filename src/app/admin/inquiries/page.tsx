'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Inbox, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  User, 
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Inquiry } from '@/types';

export default function AdminInquiriesPage() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useSchoolData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Admission Inquiries Inbox"
        subtitle="Manage prospective student applications and parent contact requests"
      />

      <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top Control Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inquiries by name, email or phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-bold uppercase text-slate-400">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
            >
              <option value="all">All Statuses ({inquiries.length})</option>
              <option value="new">New Inquiries</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No inquiries found in this category.</p>
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-slate-900">{inq.fullName}</h4>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-school-100 text-school-800">
                      {inq.gradeApplying}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.status === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : inq.status === 'contacted'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{inq.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-1">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-school-600" /> {inq.email}
                    </span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-school-600" /> {inq.phone}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> Received: {formatDate(inq.date)}
                    </span>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="resolved">Mark Resolved</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete inquiry from ${inq.fullName}?`)) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
