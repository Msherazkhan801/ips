'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Search, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Printer, 
  Receipt, 
  ArrowLeft,
  DollarSign,
  Calendar,
  PhoneCall,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Student, FeePayment } from '@/types';

export default function FeeCheckPage() {
  const { students, payments } = useSchoolData();
  const [query, setQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searched, setSearched] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  const handleSearch = (customRoll?: string) => {
    const q = (customRoll || query).trim().toLowerCase();
    if (!q) return;

    const found = students.find(
      s => s.rollNo.toLowerCase() === q || s.name.toLowerCase().includes(q)
    );
    setSelectedStudent(found || null);
    setSearched(true);
  };

  const studentPayments = selectedStudent
    ? payments.filter(p => p.studentId === selectedStudent.id)
    : [];

  const demoRolls = ['IPS-2026-001', 'IPS-2026-002', 'IPS-2026-003', 'IPS-2026-004', 'IPS-2026-005'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenFeeLookup={() => {}}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-school-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800">Fee Verification & Due Status</span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-gold-400 backdrop-blur-md mb-3">
              <CreditCard className="w-3.5 h-3.5 text-gold-400" /> Student Financial Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Fee Balance & Clearance Checker
            </h1>
            <p className="mt-2 text-sm text-school-200">
              Verify your child's remaining academic dues, examine detailed fee breakdown, and access verified payment receipts instantly.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200/80 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Student Roll Number (e.g. IPS-2026-001) or Full Name..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-school-900/15 transition-all"
            >
              Verify Dues
            </button>
          </form>

          {/* Quick chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500">Quick Test Roll Numbers:</span>
            {demoRolls.map((roll) => (
              <button
                key={roll}
                type="button"
                onClick={() => {
                  setQuery(roll);
                  handleSearch(roll);
                }}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-school-800 hover:bg-school-100 hover:text-school-900 transition-all border border-slate-200"
              >
                {roll}
              </button>
            ))}
          </div>
        </div>

        {/* Student Result Record */}
        {searched && !selectedStudent && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Student Record Located</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We could not find any active student with Roll Number or Name matching "{query}". Please double check the ID or contact the IPS accounts department.
            </p>
          </div>
        )}

        {selectedStudent && (
          <div className="space-y-6">
            
            {/* Student Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <img
                  src={selectedStudent.photoUrl}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      {selectedStudent.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-school-100 text-school-800 border border-school-200">
                      {selectedStudent.rollNo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {selectedStudent.grade} • Section {selectedStudent.section} • Guardian: {selectedStudent.guardianName}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Admission Date: {formatDate(selectedStudent.admissionDate)} • Blood Group: {selectedStudent.bloodGroup}
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div>
                {selectedStudent.feeStatus === 'paid' && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dues Cleared (100% Paid)</span>
                  </div>
                )}
                {selectedStudent.feeStatus === 'partial' && (
                  <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Partial Payment Remaining</span>
                  </div>
                )}
                {selectedStudent.feeStatus === 'overdue' && (
                  <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2 animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Payment Overdue</span>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Overview Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Academic Fee</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {formatCurrency(selectedStudent.totalFee)}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Annual Tuition & Laboratory</p>
              </div>

              <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Total Amount Paid</p>
                <p className="text-3xl font-black text-emerald-700 mt-2">
                  {formatCurrency(selectedStudent.paidFee)}
                </p>
                <p className="text-[11px] text-emerald-600 mt-1">Verified & Deposited</p>
              </div>

              <div className={`p-6 rounded-2xl border text-center shadow-sm ${
                selectedStudent.remainingFee > 0 ? 'bg-red-50/80 border-red-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  selectedStudent.remainingFee > 0 ? 'text-red-700' : 'text-slate-500'
                }`}>
                  Remaining Balance Dues
                </p>
                <p className={`text-3xl font-black mt-2 ${
                  selectedStudent.remainingFee > 0 ? 'text-red-700' : 'text-slate-800'
                }`}>
                  {formatCurrency(selectedStudent.remainingFee)}
                </p>
                <p className={`text-[11px] mt-1 ${
                  selectedStudent.remainingFee > 0 ? 'text-red-600 font-semibold' : 'text-slate-400'
                }`}>
                  {selectedStudent.remainingFee > 0 ? `Due by ${formatDate(selectedStudent.dueDate)}` : 'Zero Balance'}
                </p>
              </div>
            </div>

            {/* Academic Standing & Marks Summary */}
            {selectedStudent.obtainedMarks !== undefined && (
              <div className="bg-blue-50/80 p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                    Academic Standing & Marks
                  </div>
                  <h4 className="text-xl font-bold text-blue-950">
                    Grade Performance: {selectedStudent.gradePerformance || 'A (Excellent)'}
                  </h4>
                  <p className="text-xs text-blue-700">
                    Evaluation: <strong>{selectedStudent.examTerm || 'Annual Examination & BISE Mardan Board Prep'}</strong> • Attendance: <strong>{selectedStudent.attendancePercentage || 95}%</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Obtained Marks</span>
                    <span className="text-xl font-black text-slate-900">{selectedStudent.obtainedMarks} / {selectedStudent.totalMarks || 1100}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-200" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Percentage</span>
                    <span className="text-xl font-black text-blue-700">{selectedStudent.percentage || 85}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Receipts History */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-school-600" />
                Payment Transaction History
              </h3>

              {studentPayments.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4">No payment records logged yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="pb-3">Receipt No</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Method</th>
                        <th className="pb-3">Purpose</th>
                        <th className="pb-3 text-right">Amount</th>
                        <th className="pb-3 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {studentPayments.map((pay) => (
                        <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 font-bold text-slate-900">{pay.receiptNo}</td>
                          <td className="py-3 text-slate-600">{formatDate(pay.date)}</td>
                          <td className="py-3 uppercase font-semibold text-slate-700">
                            {pay.paymentMethod.replace('_', ' ')}
                          </td>
                          <td className="py-3 text-slate-600">{pay.notes}</td>
                          <td className="py-3 text-right font-black text-slate-900 text-sm">
                            {formatCurrency(pay.amount)}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setActiveReceipt(pay)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-school-50 text-school-700 hover:bg-school-100 font-semibold"
                            >
                              <Printer className="w-3.5 h-3.5" /> Print
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Assistance Card */}
            <div className="bg-school-50 p-6 rounded-2xl border border-school-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-school-600 text-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-950">Need Fee Assistance or Installment Plan?</h4>
                  <p className="text-school-700 mt-0.5">Contact the Finance & Bursar Desk at bursar@ips.edu or call +1 (800) 555-IPS-EDU.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />

      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />

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
