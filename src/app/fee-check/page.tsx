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
  UserCheck,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  Sparkles,
  BarChart3,
  Check,
  Download
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Student, FeePayment } from '@/types';
import { getStudentSubjectMarks, getGradeRemarks, SubjectMark } from '@/lib/academic-utils';

export default function FeeCheckPage() {
  const { students, payments } = useSchoolData();
  const [query, setQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'marks' | 'fee'>('all');
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);
  const [showDmcModal, setShowDmcModal] = useState(false);
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

  const subjectMarks: SubjectMark[] = selectedStudent 
    ? getStudentSubjectMarks(selectedStudent)
    : [];

  const gradeRemarks = selectedStudent?.percentage !== undefined 
    ? getGradeRemarks(selectedStudent.percentage)
    : { text: 'Academic Record Verified', color: 'text-blue-700', badge: 'bg-blue-600' };

  const demoRolls = ['IPS-2026-001', 'IPS-2026-002', 'IPS-2026-003', 'IPS-2026-004', 'IPS-2026-005', 'IPS-2026-006'];

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
          <span className="text-slate-800">Student Marks & Fee Verification</span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-gold-400 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-gold-400" />
              <span>Student Academic & Fee Verification Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Student Results & Fee Status Portal
            </h1>
            <p className="text-sm text-school-200 leading-relaxed">
              Enter student roll number to view comprehensive academic examination marks, Detailed Marks Certificate (DMC), and fee clearance status in real-time.
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
                placeholder="Enter Roll Number (e.g. IPS-2026-001) or Student Name..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-school-900/15 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Verify Records</span>
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
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  query.toUpperCase() === roll 
                    ? 'bg-school-900 text-white border-school-900 shadow-xs' 
                    : 'bg-slate-100 text-school-800 hover:bg-school-100 hover:text-school-900 border-slate-200'
                }`}
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
              We could not find any active student with Roll Number or Name matching "{query}". Please double check the roll number or contact the IPS administration office.
            </p>
          </div>
        )}

        {selectedStudent && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Student Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-5">
                <img
                  src={selectedStudent.photoUrl}
                  alt={selectedStudent.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-lg flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {selectedStudent.name}
                    </h2>
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-school-900 text-gold-300 shadow-xs">
                      {selectedStudent.rollNo}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                    {selectedStudent.grade} • Section {selectedStudent.section} • Guardian: <strong className="text-slate-800">{selectedStudent.guardianName}</strong>
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                    <span>Admission Date: <strong>{formatDate(selectedStudent.admissionDate)}</strong></span>
                    <span>•</span>
                    <span>Blood Group: <strong className="text-red-700">{selectedStudent.bloodGroup}</strong></span>
                    <span>•</span>
                    <span>Attendance: <strong className="text-emerald-700">{selectedStudent.attendancePercentage || 95}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  {selectedStudent.feeStatus === 'paid' && (
                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Fee Cleared (100%)</span>
                    </div>
                  )}
                  {selectedStudent.feeStatus === 'partial' && (
                    <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Fee Installment Due</span>
                    </div>
                  )}
                  {selectedStudent.feeStatus === 'overdue' && (
                    <div className="px-3.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-1.5 animate-pulse shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Fee Overdue</span>
                    </div>
                  )}

                  <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>{selectedStudent.gradePerformance || 'A (Excellent)'}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDmcModal(true)}
                  className="px-4 py-2 bg-school-900 hover:bg-school-950 text-gold-300 hover:text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Result Card (DMC)</span>
                </button>
              </div>
            </div>

            {/* Navigation View Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-school-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>All Records (Marks & Fees)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('marks')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'marks'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>Academic Marks & Examination Results</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('fee')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'fee'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Fee Clearance & Balance Dues</span>
              </button>
            </div>

            {/* SECTION: ACADEMIC MARKS & DETAILED MARKS CERTIFICATE (DMC) */}
            {(activeTab === 'all' || activeTab === 'marks') && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4 text-blue-600" /> Official Academic Transcript
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Examination Marks & Academic Performance (DMC)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Session Term: <strong className="text-slate-800">{selectedStudent.examTerm || 'Annual Examination & Board Assessment'}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDmcModal(true)}
                    className="self-start sm:self-auto px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Result Sheet</span>
                  </button>
                </div>

                {/* Score Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center shadow-2xs">
                    <span className="text-[11px] uppercase font-bold text-blue-800 block">Total Exam Marks</span>
                    <p className="text-3xl font-black text-blue-950 mt-1">
                      {selectedStudent.totalMarks || 1100}
                    </p>
                    <span className="text-[10px] text-blue-600 font-medium">Maximum Marks</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center shadow-2xs">
                    <span className="text-[11px] uppercase font-bold text-emerald-800 block">Marks Obtained</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">
                      {selectedStudent.obtainedMarks || 950}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-medium">Secured Total</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-gold-50/80 border border-gold-300 text-center shadow-2xs">
                    <span className="text-[11px] uppercase font-bold text-amber-900 block">Percentage (%)</span>
                    <p className="text-3xl font-black text-amber-700 mt-1">
                      {selectedStudent.percentage || 86.4}%
                    </p>
                    <span className="text-[10px] text-amber-800 font-semibold">Overall Aggregate</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-center shadow-2xs">
                    <span className="text-[11px] uppercase font-bold text-purple-800 block">Performance Grade</span>
                    <p className="text-2xl font-black text-purple-900 mt-1.5 truncate">
                      {selectedStudent.gradePerformance || 'A (Excellent)'}
                    </p>
                    <span className="text-[10px] text-purple-600 font-medium">Result: PASSED</span>
                  </div>
                </div>

                {/* Remarks Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Official Evaluation Remarks:</p>
                      <p className={`font-semibold ${gradeRemarks.color}`}>{gradeRemarks.text}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Verified by IPS Controller of Examinations
                  </div>
                </div>

                {/* Subject-wise Marks Breakdown Table */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-school-600" /> Subject-Wise Detailed Marks Certificate (DMC)
                  </h4>

                  <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                          <th className="py-3 px-4">Code</th>
                          <th className="py-3 px-4">Subject Name</th>
                          <th className="py-3 px-4 text-center">Max Marks</th>
                          <th className="py-3 px-4 text-center">Obtained Marks</th>
                          <th className="py-3 px-4 text-center">Percentage</th>
                          <th className="py-3 px-4 text-center">Grade</th>
                          <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {subjectMarks.map((sub, index) => (
                          <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-500 text-[11px]">{sub.code}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">{sub.name}</td>
                            <td className="py-3 px-4 text-center text-slate-600 font-semibold">{sub.totalMarks}</td>
                            <td className="py-3 px-4 text-center font-black text-slate-900">{sub.obtainedMarks}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                                  <div 
                                    className={`h-full rounded-full ${
                                      sub.percentage >= 80 ? 'bg-emerald-500' : sub.percentage >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${Math.min(100, sub.percentage)}%` }}
                                  />
                                </div>
                                <span className="font-bold text-slate-700">{sub.percentage}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                sub.grade.includes('A') 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {sub.grade}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                                <Check className="w-3.5 h-3.5 text-emerald-600" /> {sub.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200 text-xs text-slate-900">
                        <tr>
                          <td colSpan={2} className="py-3.5 px-4 uppercase tracking-wider text-[11px] font-black">
                            Grand Aggregate Total
                          </td>
                          <td className="py-3.5 px-4 text-center font-black">{selectedStudent.totalMarks || 1100}</td>
                          <td className="py-3.5 px-4 text-center font-black text-emerald-700 text-sm">
                            {selectedStudent.obtainedMarks || 950}
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-blue-700 text-sm">
                            {selectedStudent.percentage || 86.4}%
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-purple-700">
                            {selectedStudent.gradePerformance?.split(' ')[0] || 'A'}
                          </td>
                          <td className="py-3.5 px-4 text-right text-emerald-700 font-black uppercase text-[11px]">
                            PASSED
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* SECTION: FEE STATUS & PAYMENT HISTORY */}
            {(activeTab === 'all' || activeTab === 'fee') && (
              <div className="space-y-6">
                
                {/* Financial Overview Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Academic Fee (PKR)</p>
                    <p className="text-3xl font-black text-slate-900 mt-2">
                      {formatCurrency(selectedStudent.totalFee)}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Annual Tuition & Laboratory Charges</p>
                  </div>

                  <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Total Amount Paid (PKR)</p>
                    <p className="text-3xl font-black text-emerald-700 mt-2">
                      {formatCurrency(selectedStudent.paidFee)}
                    </p>
                    <p className="text-[11px] text-emerald-600 mt-1">Verified & Deposited to School Account</p>
                  </div>

                  <div className={`p-6 rounded-3xl border text-center shadow-sm ${
                    selectedStudent.remainingFee > 0 ? 'bg-red-50/80 border-red-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${
                      selectedStudent.remainingFee > 0 ? 'text-red-700' : 'text-slate-500'
                    }`}>
                      Remaining Balance Dues (PKR)
                    </p>
                    <p className={`text-3xl font-black mt-2 ${
                      selectedStudent.remainingFee > 0 ? 'text-red-700' : 'text-slate-800'
                    }`}>
                      {formatCurrency(selectedStudent.remainingFee)}
                    </p>
                    <p className={`text-[11px] mt-1 ${
                      selectedStudent.remainingFee > 0 ? 'text-red-600 font-semibold' : 'text-slate-400'
                    }`}>
                      {selectedStudent.remainingFee > 0 ? `Due by ${formatDate(selectedStudent.dueDate)}` : 'Zero Balance (Cleared)'}
                    </p>
                  </div>
                </div>

                {/* Payment Receipts History */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-school-600" />
                      Payment Transaction & Clearance Receipts
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">All amounts in Pakistani Rupees (₨)</span>
                  </div>

                  {studentPayments.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-4">No payment transaction records logged yet.</p>
                  ) : (
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                            <th className="py-3 px-4">Receipt No</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Method</th>
                            <th className="py-3 px-4">Purpose</th>
                            <th className="py-3 px-4 text-right">Amount (PKR)</th>
                            <th className="py-3 px-4 text-right">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {studentPayments.map((pay) => (
                            <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">{pay.receiptNo}</td>
                              <td className="py-3.5 px-4 text-slate-600">{formatDate(pay.date)}</td>
                              <td className="py-3.5 px-4 uppercase font-semibold text-slate-700">
                                {pay.paymentMethod.replace('_', ' ')}
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">{pay.notes}</td>
                              <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                                {formatCurrency(pay.amount)}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => setActiveReceipt(pay)}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-school-50 text-school-700 hover:bg-school-100 font-bold text-xs"
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

              </div>
            )}

            {/* Assistance Card */}
            <div className="bg-school-50 p-6 rounded-2xl border border-school-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-school-600 text-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-950">Questions Regarding Marks or Fee Installment Plans?</h4>
                  <p className="text-school-700 mt-0.5">Contact IPS Academic Office or Accounts Desk at Permoli: info@ipspermoli.edu.pk or phone +92 (300) 234-5678.</p>
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

      {/* MODAL: PRINTABLE OFFICIAL DMC / RESULT CARD */}
      {showDmcModal && selectedStudent && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowDmcModal(false)}
        >
          <div 
            className="bg-white p-8 rounded-3xl max-w-2xl w-full shadow-2xl printable-area text-slate-900 my-8 border-4 border-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* School Header Banner */}
            <div className="border-b-2 border-slate-900 pb-4 text-center relative">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-900 bg-white p-1">
                  <img
                    src="/images/iqra-logo.png"
                    alt="IPS Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-left">
                  <h2 className="font-black text-2xl tracking-tight text-school-950 uppercase leading-none">
                    IQRA PUBLIC SCHOOL
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-700 mt-1">
                    PERMOLI, DISTRICT SWABI, KPK
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Affiliated with BISE Mardan • Government Recognized
                  </p>
                </div>
              </div>
              <div className="inline-block mt-2 px-4 py-1 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
                Official Detailed Marks Certificate (DMC)
              </div>
            </div>

            {/* Student Details Grid */}
            <div className="py-4 grid grid-cols-2 gap-3 text-xs border-b border-slate-200">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Student Name:</span>
                <span className="font-black text-sm text-slate-900">{selectedStudent.name}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Roll Number:</span>
                <span className="font-mono font-black text-sm text-slate-900">{selectedStudent.rollNo}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Father / Guardian Name:</span>
                <span className="font-bold text-slate-800">{selectedStudent.guardianName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Class & Section:</span>
                <span className="font-bold text-slate-800">{selectedStudent.grade} ({selectedStudent.section})</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Examination / Term:</span>
                <span className="font-bold text-slate-800">{selectedStudent.examTerm || 'Annual Examination 2026'}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Academic Session:</span>
                <span className="font-bold text-slate-800">2026 - 2027</span>
              </div>
            </div>

            {/* Marks Table */}
            <div className="py-4">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                    <th className="p-2 border-r border-slate-300">Subject</th>
                    <th className="p-2 border-r border-slate-300 text-center">Max Marks</th>
                    <th className="p-2 border-r border-slate-300 text-center">Marks Obtained</th>
                    <th className="p-2 border-r border-slate-300 text-center">%</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {subjectMarks.map((s, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border-r border-slate-300 font-semibold">{s.name}</td>
                      <td className="p-2 border-r border-slate-300 text-center">{s.totalMarks}</td>
                      <td className="p-2 border-r border-slate-300 text-center font-bold">{s.obtainedMarks}</td>
                      <td className="p-2 border-r border-slate-300 text-center">{s.percentage}%</td>
                      <td className="p-2 text-center font-bold">{s.grade}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-400">
                  <tr>
                    <td className="p-2 border-r border-slate-300 uppercase">Total</td>
                    <td className="p-2 border-r border-slate-300 text-center">{selectedStudent.totalMarks || 1100}</td>
                    <td className="p-2 border-r border-slate-300 text-center text-sm font-black">{selectedStudent.obtainedMarks || 950}</td>
                    <td className="p-2 border-r border-slate-300 text-center text-sm font-black">{selectedStudent.percentage || 86.4}%</td>
                    <td className="p-2 text-center text-sm font-black text-purple-800">{selectedStudent.gradePerformance?.split(' ')[0] || 'A'}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Performance Summary Banner */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Performance Grade:</span>
                <span className="font-black text-slate-900">{selectedStudent.gradePerformance || 'A (Excellent)'}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Result Status:</span>
                <span className="font-black text-emerald-700 uppercase">PROMOTED (PASSED)</span>
              </div>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center text-[10px] text-slate-600">
              <div>
                <div className="border-b border-slate-400 mb-1 h-6" />
                <p className="font-bold">Class Teacher</p>
              </div>
              <div>
                <div className="border-b border-slate-400 mb-1 h-6" />
                <p className="font-bold">Controller of Exams</p>
              </div>
              <div>
                <div className="border-b border-slate-400 mb-1 h-6 font-serif italic text-xs text-slate-900 font-bold">
                  Akhter Munir
                </div>
                <p className="font-bold">Principal / Seal</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-2 no-print border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setShowDmcModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-bold text-white bg-school-900 hover:bg-school-950 rounded-xl shadow flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print DMC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {activeReceipt && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
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
