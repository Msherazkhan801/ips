'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  Award, 
  IdCard, 
  Image as ImageIcon, 
  ArrowUpRight, 
  ArrowRight,
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Receipt, 
  Printer, 
  Calendar,
  Sparkles,
  Inbox
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FeePayment } from '@/types';

export default function AdminDashboardPage() {
  const { 
    students, 
    payments, 
    certificates, 
    gallery, 
    inquiries, 
    totalRevenue, 
    totalRemainingFee, 
    totalExpectedFee, 
    totalStudents 
  } = useSchoolData();

  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  // Financial calculations
  const collectionPercentage = totalExpectedFee > 0 
    ? Math.round((totalRevenue / totalExpectedFee) * 100) 
    : 0;

  const overdueCount = students.filter(s => s.feeStatus === 'overdue').length;
  const partialCount = students.filter(s => s.feeStatus === 'partial').length;
  const paidCount = students.filter(s => s.feeStatus === 'paid').length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="School Management Overview"
        subtitle="Financial Revenue, Remaining Fees, ID Cards & Student Analytics"
      />

      <main className="p-4 sm:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Revenue */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Total Revenue
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatCurrency(totalRevenue)}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{collectionPercentage}% fee collection rate</span>
            </div>
          </div>

          {/* Card 2: Remaining Fees */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Remaining Dues
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatCurrency(totalRemainingFee)}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{overdueCount} overdue • {partialCount} partial</span>
            </div>
          </div>

          {/* Card 3: Active Students */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-school-600">
                Enrolled Students
              </span>
              <div className="w-10 h-10 rounded-xl bg-school-50 text-school-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {totalStudents}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{paidCount} fully paid accounts</span>
            </div>
          </div>

          {/* Card 4: Certificates & Gallery */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Certificates & Media
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {certificates.length} <span className="text-sm font-semibold text-slate-400">Certs</span>
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-purple-700">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{gallery.length} live gallery photos</span>
            </div>
          </div>

        </div>

        {/* Financial Collection Progress Banner */}
        <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-400/30">
                Financial Summary 2026-2027
              </span>
              <h3 className="text-2xl font-black text-white mt-2">
                Fee Realization Rate: {collectionPercentage}%
              </h3>
              <p className="text-xs text-school-200 mt-1">
                Total Budgeted Expected Fee: {formatCurrency(totalExpectedFee)} | Collected: {formatCurrency(totalRevenue)} | Pending: {formatCurrency(totalRemainingFee)}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/20 rounded-full h-3.5 mt-4 overflow-hidden p-0.5 border border-white/20">
                <div
                  className="bg-gradient-to-r from-gold-400 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${Math.min(100, collectionPercentage)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/admin/students"
                className="px-5 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-school-950 text-xs font-bold transition-all text-center shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Manage Fee Records</span>
              </Link>
              <Link
                href="/admin/certificates"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all text-center flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-gold-400" />
                <span>Generate Certificate</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Shortcuts Grid */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Quick System Workflows
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/admin/students"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-school-400 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Add Student / Fees</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Enrollment & Payments</span>
            </Link>

            <Link
              href="/admin/id-cards"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-school-400 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <IdCard className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Print ID Cards</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Badges & QR Barcodes</span>
            </Link>

            <Link
              href="/admin/certificates"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-school-400 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Create Certificate</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Merit & Graduation</span>
            </Link>

            <Link
              href="/admin/gallery"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-school-400 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Upload Gallery Pic</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Syncs to Live Website</span>
            </Link>
          </div>
        </div>

        {/* Split Grid: Recent Payment Transactions & Admission Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Recent Fee Payments (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Recent Fee Payments & Receipts
                </h4>
                <p className="text-xs text-slate-500">
                  Verified student revenue collections
                </p>
              </div>
              <Link
                href="/admin/students"
                className="text-xs font-bold text-school-600 hover:text-school-800 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {payments.slice(0, 5).map((pay) => (
                <div
                  key={pay.id}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{pay.studentName}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {pay.rollNo}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {pay.receiptNo} • {formatDate(pay.date)} • <span className="uppercase font-semibold">{pay.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-900">
                      {formatCurrency(pay.amount)}
                    </span>
                    <button
                      onClick={() => setActiveReceipt(pay)}
                      className="p-1.5 text-school-600 hover:bg-school-50 rounded-lg transition-colors"
                      title="Print Receipt"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Admission Inquiries Inbox (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Admission Inquiries
                </h4>
                <p className="text-xs text-slate-500">
                  Submitted via website contact form
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-school-600 hover:text-school-800 flex items-center gap-1"
              >
                <span>Inbox ({inquiries.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{inq.fullName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-school-700 font-semibold">{inq.gradeApplying}</p>
                  <p className="text-slate-600 line-clamp-2 mt-1">{inq.message}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">Received: {formatDate(inq.date)} • {inq.phone}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Printable Receipt Modal */}
      {activeReceipt && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveReceipt(null)}
        >
          <div 
            className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl printable-area text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center border border-slate-300 bg-white p-0.5 shadow-sm">
                <img
                  src="/images/iqra-logo.png"
                  alt="Iqra Public School Permoli Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-black text-xl tracking-tight text-school-950">IQRA PUBLIC SCHOOL PERMOLI</h3>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">District Swabi, KPK • Official Fee Clearance Receipt</p>
            </div>

            <div className="py-4 space-y-2 text-xs border-b border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-bold">{activeReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold">{formatDate(activeReceipt.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold">{activeReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll No:</span>
                <span className="font-bold">{activeReceipt.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Grade:</span>
                <span className="font-bold">{activeReceipt.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold uppercase">{activeReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Purpose / Description:</span>
                <span className="font-medium text-right max-w-[200px]">{activeReceipt.notes}</span>
              </div>
            </div>

            <div className="py-4 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Amount Paid:</span>
              <span className="font-black text-xl text-emerald-700">{formatCurrency(activeReceipt.amount)}</span>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-400">
              <div>
                <p>Status: VERIFIED & CONFIRMED</p>
                <p>Academic Year: 2026-2027</p>
              </div>
              <div className="text-center">
                <div className="w-24 border-b border-slate-400 mb-1" />
                <p className="font-semibold text-slate-600">Accounts Officer</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 no-print">
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-bold text-white bg-school-800 hover:bg-school-900 rounded-lg shadow flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
