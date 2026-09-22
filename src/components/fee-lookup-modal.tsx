'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Search, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  CreditCard, 
  Receipt, 
  Printer, 
  ArrowRight,
  UserCheck,
  DollarSign,
  GraduationCap,
  Award,
  BookOpen,
  ExternalLink,
  Check
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Student, FeePayment } from '@/types';
import { getStudentSubjectMarks, getGradeRemarks } from '@/lib/academic-utils';

interface FeeLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeeLookupModal({ isOpen, onClose }: FeeLookupModalProps) {
  const { students, payments } = useSchoolData();
  const [searchRoll, setSearchRoll] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searched, setSearched] = useState(false);
  const [modalTab, setModalTab] = useState<'marks' | 'fee'>('marks');
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  if (!isOpen) return null;

  const handleSearch = (rollToQuery?: string) => {
    const query = (rollToQuery || searchRoll).trim().toLowerCase();
    if (!query) return;

    const found = students.find(
      s => s.rollNo.toLowerCase() === query || s.name.toLowerCase().includes(query)
    );
    setSelectedStudent(found || null);
    setSearched(true);
  };

  const studentPayments = selectedStudent
    ? payments.filter(p => p.studentId === selectedStudent.id)
    : [];

  const subjectMarks = selectedStudent 
    ? getStudentSubjectMarks(selectedStudent)
    : [];

  const gradeRemarks = selectedStudent?.percentage !== undefined 
    ? getGradeRemarks(selectedStudent.percentage)
    : { text: 'Academic Record Verified', color: 'text-blue-700', badge: 'bg-blue-600' };

  const sampleRolls = ['IPS-2026-001', 'IPS-2026-002', 'IPS-2026-003', 'IPS-2026-004'];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-1 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> Student Portal
          </div>
          <h3 className="text-2xl font-black text-white">
            Student Marks & Fee Lookup
          </h3>
          <p className="text-xs text-school-200 mt-1">
            Enter Student Roll Number to check academic exam marks, Detailed Marks Certificate (DMC), and fee clearance status.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
                placeholder="Enter Roll No (e.g. IPS-2026-001) or Student Name..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-school-600 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-sm font-bold shadow-md shadow-school-900/10 transition-all flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-500">Quick Test Roll Nos:</span>
            {sampleRolls.map((roll) => (
              <button
                key={roll}
                type="button"
                onClick={() => {
                  setSearchRoll(roll);
                  handleSearch(roll);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all ${
                  searchRoll.toUpperCase() === roll 
                    ? 'bg-school-900 text-white border-school-900' 
                    : 'bg-white text-school-700 border-slate-200 hover:border-school-500 hover:bg-school-50'
                }`}
              >
                {roll}
              </button>
            ))}
          </div>
        </div>

        {/* Result Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searched && !selectedStudent ? (
            <div className="text-center py-10">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">No Student Record Located</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No matching record found for "{searchRoll}". Please check the Roll Number or contact the IPS administration office.
              </p>
            </div>
          ) : selectedStudent ? (
            <div className="space-y-5">
              
              {/* Student Overview Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedStudent.photoUrl}
                    alt={selectedStudent.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                    }}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">
                        {selectedStudent.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-school-900 text-gold-300">
                        {selectedStudent.rollNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedStudent.grade} - Section {selectedStudent.section} • Guardian: {selectedStudent.guardianName}
                    </p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                    {selectedStudent.gradePerformance || 'A (Excellent)'}
                  </span>

                  {selectedStudent.feeStatus === 'paid' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fee Paid
                    </span>
                  )}
                  {selectedStudent.feeStatus === 'partial' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Fee Dues
                    </span>
                  )}
                  {selectedStudent.feeStatus === 'overdue' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Overdue
                    </span>
                  )}
                </div>
              </div>

              {/* Tabs Inside Modal */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setModalTab('marks')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    modalTab === 'marks'
                      ? 'bg-white text-blue-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>Academic Marks & DMC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('fee')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    modalTab === 'fee'
                      ? 'bg-white text-emerald-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fee Clearance & Dues</span>
                </button>
              </div>

              {/* TAB 1: ACADEMIC MARKS & DMC */}
              {modalTab === 'marks' && (
                <div className="space-y-4">
                  {/* Score Highlights */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-center">
                      <span className="text-[10px] uppercase font-bold text-blue-800 block">Total Exam Marks</span>
                      <span className="text-lg font-black text-blue-950 mt-0.5 block">{selectedStudent.totalMarks || 1100}</span>
                    </div>

                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-center">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">Obtained Marks</span>
                      <span className="text-lg font-black text-emerald-700 mt-0.5 block">{selectedStudent.obtainedMarks || 950}</span>
                    </div>

                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-center">
                      <span className="text-[10px] uppercase font-bold text-amber-900 block">Percentage</span>
                      <span className="text-lg font-black text-amber-700 mt-0.5 block">{selectedStudent.percentage || 86.4}%</span>
                    </div>
                  </div>

                  {/* Subject Wise DMC Table */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Subject-Wise Marks Breakdown</span>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                            <th className="py-2 px-3">Subject</th>
                            <th className="py-2 px-3 text-center">Max</th>
                            <th className="py-2 px-3 text-center">Obt</th>
                            <th className="py-2 px-3 text-center">%</th>
                            <th className="py-2 px-3 text-right">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {subjectMarks.map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-semibold text-slate-800">{s.name}</td>
                              <td className="py-2 px-3 text-center text-slate-500">{s.totalMarks}</td>
                              <td className="py-2 px-3 text-center font-bold text-slate-900">{s.obtainedMarks}</td>
                              <td className="py-2 px-3 text-center text-slate-600">{s.percentage}%</td>
                              <td className="py-2 px-3 text-right font-black text-emerald-700">{s.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Exam Session: <strong>{selectedStudent.examTerm || 'Annual Examination'}</strong></span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Result: PASSED
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: FEE CLEARANCE */}
              {modalTab === 'fee' && (
                <div className="space-y-4">
                  {/* Fee Financial Metrics Summary */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Total Fee</p>
                      <p className="text-base font-black text-slate-800 mt-0.5">
                        {formatCurrency(selectedStudent.totalFee)}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                      <p className="text-[10px] uppercase font-bold text-emerald-600">Amount Paid</p>
                      <p className="text-base font-black text-emerald-700 mt-0.5">
                        {formatCurrency(selectedStudent.paidFee)}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${
                      selectedStudent.remainingFee > 0 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`text-[10px] uppercase font-bold ${
                        selectedStudent.remainingFee > 0 ? 'text-red-600' : 'text-slate-400'
                      }`}>Remaining</p>
                      <p className={`text-base font-black mt-0.5 ${
                        selectedStudent.remainingFee > 0 ? 'text-red-700' : 'text-slate-700'
                      }`}>
                        {formatCurrency(selectedStudent.remainingFee)}
                      </p>
                    </div>
                  </div>

                  {/* Due Date Notice */}
                  <div className="flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    <span className="font-semibold">Fee Due Date:</span>
                    <span className="font-bold">{formatDate(selectedStudent.dueDate)}</span>
                  </div>

                  {/* Payment Receipts List */}
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5" /> Verified Payment Receipts
                    </h5>

                    {studentPayments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No payments logged yet.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {studentPayments.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{p.receiptNo}</span>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 uppercase">
                                  {p.paymentMethod.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {formatDate(p.date)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 text-xs">
                                {formatCurrency(p.amount)}
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveReceipt(p)}
                                className="p-1 text-school-600 hover:bg-school-50 rounded transition-colors"
                                title="Print Receipt"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Link to Full Page Portal */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/fee-check"
                  onClick={onClose}
                  className="text-xs font-bold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Open Full Verification Portal & Print DMC</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                >
                  Close
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600">Search by Roll Number to view marks & fees</p>
              <p className="text-xs text-slate-400 mt-1">Try one of the quick test roll numbers above!</p>
            </div>
          )}
        </div>

      </div>

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
