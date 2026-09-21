'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Receipt, 
  Printer, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  X, 
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Eye,
  Award,
  BookOpen,
  GraduationCap,
  Save,
  Check
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Student, FeePayment } from '@/types';

export default function AdminStudentsPage() {
  const { 
    students, 
    payments, 
    addStudent, 
    updateStudent, 
    deleteStudent, 
    recordPayment, 
    getStudentPayments 
  } = useSchoolData();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('all');

  // Modals
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [paymentModalStudent, setPaymentModalStudent] = useState<Student | null>(null);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  // Form state for adding new student
  const [newStudentData, setNewStudentData] = useState({
    rollNo: `IPS-2026-00${students.length + 1}`,
    name: '',
    email: '',
    phone: '',
    grade: 'Grade 9 (Science)',
    section: 'A',
    guardianName: '',
    guardianPhone: '',
    address: 'Permoli, District Swabi, KPK',
    admissionDate: new Date().toISOString().split('T')[0],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    dob: '2010-01-01',
    status: 'active' as const,
    totalFee: 24000,
    paidFee: 12000,
    dueDate: '2026-10-30',
    totalMarks: 1100,
    obtainedMarks: 950,
    percentage: 86.4,
    gradePerformance: 'A (Excellent)',
    examTerm: 'BISE Mardan Board Prep',
    attendancePercentage: 95,
  });

  // Form state for editing student
  const [editFormData, setEditFormData] = useState<Partial<Student>>({});

  // Payment recording form state
  const [paymentAmount, setPaymentAmount] = useState<number>(2000);
  const [paymentMethod, setPaymentMethod] = useState<FeePayment['paymentMethod']>('cash');
  const [paymentNotes, setPaymentNotes] = useState('Tuition fee payment installment');

  // Filtering
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.gradePerformance && s.gradePerformance.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGrade = selectedGrade === 'all' || s.grade.includes(selectedGrade);
    const matchesFee = selectedFeeStatus === 'all' || s.feeStatus === selectedFeeStatus;

    return matchesSearch && matchesGrade && matchesFee;
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.name || !newStudentData.rollNo) return;

    // Calculate percentage if not given
    const totalM = Number(newStudentData.totalMarks) || 1100;
    const obtM = Number(newStudentData.obtainedMarks) || 0;
    const calcPct = totalM > 0 ? Number(((obtM / totalM) * 100).toFixed(1)) : 0;

    addStudent({
      ...newStudentData,
      totalMarks: totalM,
      obtainedMarks: obtM,
      percentage: calcPct,
      totalFee: Number(newStudentData.totalFee),
      paidFee: Number(newStudentData.paidFee),
      attendancePercentage: Number(newStudentData.attendancePercentage) || 95,
    });
    setAddStudentOpen(false);
    setNewStudentData({
      rollNo: `IPS-2026-00${students.length + 2}`,
      name: '',
      email: '',
      phone: '',
      grade: 'Grade 9 (Science)',
      section: 'A',
      guardianName: '',
      guardianPhone: '',
      address: 'Permoli, District Swabi, KPK',
      admissionDate: new Date().toISOString().split('T')[0],
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bloodGroup: 'O+',
      dob: '2010-01-01',
      status: 'active',
      totalFee: 24000,
      paidFee: 12000,
      dueDate: '2026-10-30',
      totalMarks: 1100,
      obtainedMarks: 950,
      percentage: 86.4,
      gradePerformance: 'A (Excellent)',
      examTerm: 'BISE Mardan Board Prep',
      attendancePercentage: 95,
    });
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudent(student);
    setEditFormData({
      name: student.name,
      rollNo: student.rollNo,
      grade: student.grade,
      section: student.section,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      phone: student.phone,
      email: student.email,
      address: student.address,
      bloodGroup: student.bloodGroup,
      dob: student.dob,
      admissionDate: student.admissionDate,
      photoUrl: student.photoUrl,
      status: student.status,
      totalFee: student.totalFee,
      paidFee: student.paidFee,
      dueDate: student.dueDate,
      totalMarks: student.totalMarks || 1100,
      obtainedMarks: student.obtainedMarks || 0,
      percentage: student.percentage || 0,
      gradePerformance: student.gradePerformance || 'A (Excellent)',
      examTerm: student.examTerm || 'Annual Examination',
      attendancePercentage: student.attendancePercentage || 95,
    });
  };

  const handleEditStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editFormData.name) return;

    const totalM = Number(editFormData.totalMarks) || 1100;
    const obtM = Number(editFormData.obtainedMarks) || 0;
    const calcPct = totalM > 0 ? Number(((obtM / totalM) * 100).toFixed(1)) : 0;

    updateStudent(editingStudent.id, {
      ...editFormData,
      totalMarks: totalM,
      obtainedMarks: obtM,
      percentage: calcPct,
      totalFee: Number(editFormData.totalFee),
      paidFee: Number(editFormData.paidFee),
      attendancePercentage: Number(editFormData.attendancePercentage) || 90,
    });

    setEditingStudent(null);
  };

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalStudent || paymentAmount <= 0) return;

    const loggedPayment = recordPayment({
      studentId: paymentModalStudent.id,
      amount: Number(paymentAmount),
      paymentMethod,
      notes: paymentNotes,
    });

    if (loggedPayment) {
      setActiveReceipt(loggedPayment);
    }
    setPaymentModalStudent(null);
  };

  const getGradePerformanceBadge = (gradeStr?: string, pct?: number) => {
    const text = gradeStr || (pct ? (pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : 'C') : 'A');
    if (text.includes('A+') || text.includes('1st') || (pct && pct >= 90)) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (text.includes('A') || (pct && pct >= 80)) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (text.includes('B') || (pct && pct >= 70)) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    return 'bg-purple-100 text-purple-800 border-purple-300';
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Student & Fee Management"
        subtitle="Manage student profiles, marks & performance, record PKR payments & fee status"
      />

      <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top Control Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search & Filters */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name, Roll No, Guardian, Performance..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
              />
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="all">All Classes / Grades</option>
              <option value="Grade 10">Matric (Grade 10)</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8 (Middle)</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 5">Grade 5 (Primary)</option>
              <option value="Nursery">Early Years / Nursery</option>
            </select>

            <select
              value={selectedFeeStatus}
              onChange={(e) => setSelectedFeeStatus(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="all">All Fee Statuses</option>
              <option value="paid">Paid (Cleared in Full)</option>
              <option value="partial">Partial Remaining</option>
              <option value="overdue">Overdue Remaining</option>
            </select>
          </div>

          {/* Add Student Button */}
          <button
            type="button"
            onClick={() => setAddStudentOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-md shadow-school-900/10 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        </div>

        {/* Student Table & Academic Performance / Fee Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Student Info</th>
                  <th className="py-3.5 px-4">Class & Sec</th>
                  <th className="py-3.5 px-4">Marks & Performance</th>
                  <th className="py-3.5 px-4">Total Fee (PKR)</th>
                  <th className="py-3.5 px-4">Paid (PKR)</th>
                  <th className="py-3.5 px-4">Remaining (PKR)</th>
                  <th className="py-3.5 px-4">Fee Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No students found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const totalM = student.totalMarks || 1100;
                    const obtM = student.obtainedMarks !== undefined ? student.obtainedMarks : 900;
                    const pct = student.percentage !== undefined ? student.percentage : Number(((obtM / totalM) * 100).toFixed(1));
                    const gradePerf = student.gradePerformance || (pct >= 90 ? 'A+ (Distinction)' : pct >= 80 ? 'A (Excellent)' : 'B (Good)');

                    return (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        
                        {/* Name & Photo */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.photoUrl}
                              alt={student.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{student.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{student.rollNo}</p>
                              <p className="text-[10px] text-slate-500">{student.guardianName}</p>
                            </div>
                          </div>
                        </td>

                        {/* Grade & Section */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-700 block">{student.grade}</span>
                          <span className="text-[10px] text-slate-400">Sec {student.section}</span>
                        </td>

                        {/* Academic Marks & Performance */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 text-xs">{obtM}</span>
                              <span className="text-slate-400 text-[10px]">/ {totalM}</span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                                {pct}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getGradePerformanceBadge(gradePerf, pct)}`}>
                                {gradePerf}
                              </span>
                              {student.attendancePercentage && (
                                <span className="text-[10px] text-slate-400">
                                  {student.attendancePercentage}% Att.
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Total Fee (PKR) */}
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {formatCurrency(student.totalFee)}
                        </td>

                        {/* Paid Fee (PKR) */}
                        <td className="py-3 px-4 font-bold text-emerald-700">
                          {formatCurrency(student.paidFee)}
                        </td>

                        {/* Remaining Fee (PKR) */}
                        <td className="py-3 px-4">
                          <span className={`font-black text-xs ${
                            student.remainingFee > 0 ? 'text-red-700' : 'text-slate-500'
                          }`}>
                            {formatCurrency(student.remainingFee)}
                          </span>
                          {student.remainingFee > 0 && (
                            <span className="text-[10px] text-slate-400 block">
                              Due: {formatDate(student.dueDate)}
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          {student.feeStatus === 'paid' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                            </span>
                          )}
                          {student.feeStatus === 'partial' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              <Clock className="w-3 h-3 text-amber-600" /> Partial
                            </span>
                          )}
                          {student.feeStatus === 'overdue' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-red-600" /> Overdue
                            </span>
                          )}
                        </td>

                        {/* Actions: Collect, Edit, View, Delete */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Collect Fee Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setPaymentModalStudent(student);
                                setPaymentAmount(student.remainingFee > 0 ? student.remainingFee : 2000);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all"
                              title="Collect / Record Fee Payment in PKR"
                            >
                              <Receipt className="w-3 h-3 text-emerald-600" />
                              <span>Fee</span>
                            </button>

                            {/* Edit Student & Fee Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(student)}
                              className="p-1.5 text-school-600 hover:text-school-900 hover:bg-school-50 rounded-lg transition-colors border border-school-200/60"
                              title="Edit Student, Marks & Fee"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* View details */}
                            <button
                              type="button"
                              onClick={() => setViewStudent(student)}
                              className="p-1.5 text-slate-400 hover:text-school-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="View Student Ledger & Card"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${student.name}?`)) {
                                  deleteStudent(student.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* MODAL 1: Enroll New Student */}
      {addStudentOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setAddStudentOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-school-950 text-white p-6 relative flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Enroll New Student</h3>
                <p className="text-xs text-school-200 mt-0.5">Enter student academic details, marks standing & PKR fee schedule</p>
              </div>
              <button
                onClick={() => setAddStudentOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              
              {/* Section 1: Basic Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-school-800 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> 1. Student Personal & Class Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Hamza"
                      value={newStudentData.name}
                      onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-school-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assigned Roll No *</label>
                    <input
                      type="text"
                      required
                      value={newStudentData.rollNo}
                      onChange={(e) => setNewStudentData({ ...newStudentData, rollNo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-school-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class / Grade *</label>
                    <select
                      value={newStudentData.grade}
                      onChange={(e) => setNewStudentData({ ...newStudentData, grade: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    >
                      <option value="Grade 10 (Matric)">Grade 10 (Matric)</option>
                      <option value="Grade 9 (Science)">Grade 9 (Science)</option>
                      <option value="Grade 8 (Middle)">Grade 8 (Middle)</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 5 (Primary)">Grade 5 (Primary)</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Nursery / Prep / KG">Nursery / Prep / KG</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section</label>
                    <input
                      type="text"
                      value={newStudentData.section}
                      onChange={(e) => setNewStudentData({ ...newStudentData, section: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blood Group</label>
                    <input
                      type="text"
                      value={newStudentData.bloodGroup}
                      onChange={(e) => setNewStudentData({ ...newStudentData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Khan"
                      value={newStudentData.guardianName}
                      onChange={(e) => setNewStudentData({ ...newStudentData, guardianName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0347-XXXXXXX or 0300-XXXXXXX"
                      value={newStudentData.guardianPhone}
                      onChange={(e) => setNewStudentData({ ...newStudentData, guardianPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={newStudentData.address}
                    onChange={(e) => setNewStudentData({ ...newStudentData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Marks & Academic Performance */}
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" /> 2. Academic Marks & Exam Performance
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Marks</label>
                    <input
                      type="number"
                      value={newStudentData.totalMarks}
                      onChange={(e) => setNewStudentData({ ...newStudentData, totalMarks: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Obtained Marks</label>
                    <input
                      type="number"
                      value={newStudentData.obtainedMarks}
                      onChange={(e) => {
                        const obt = Number(e.target.value);
                        const tot = newStudentData.totalMarks || 1100;
                        const pct = tot > 0 ? Number(((obt / tot) * 100).toFixed(1)) : 0;
                        setNewStudentData({ 
                          ...newStudentData, 
                          obtainedMarks: obt,
                          percentage: pct,
                          gradePerformance: pct >= 90 ? 'A+ (Distinction)' : pct >= 80 ? 'A (Excellent)' : pct >= 70 ? 'B (Good)' : 'C (Pass)'
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Performance Grade</label>
                    <select
                      value={newStudentData.gradePerformance}
                      onChange={(e) => setNewStudentData({ ...newStudentData, gradePerformance: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    >
                      <option value="A+ (Distinction)">A+ (Distinction / 1st Rank)</option>
                      <option value="A+ (Outstanding)">A+ (Outstanding 90%+)</option>
                      <option value="A (Excellent)">A (Excellent 80-89%)</option>
                      <option value="B (Good)">B (Good 70-79%)</option>
                      <option value="C (Satisfactory)">C (Satisfactory 60-69%)</option>
                      <option value="D (Pass)">D (Pass)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Assessment / Exam Term</label>
                    <input
                      type="text"
                      value={newStudentData.examTerm}
                      onChange={(e) => setNewStudentData({ ...newStudentData, examTerm: e.target.value })}
                      placeholder="e.g. BISE Mardan Board Exam or Annual 2026"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Attendance Percentage (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={newStudentData.attendancePercentage}
                      onChange={(e) => setNewStudentData({ ...newStudentData, attendancePercentage: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Fee Breakdown in PKR */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-emerald-600" /> 3. Fee Structure & Deposit (in PKR - Pakistani Rupees)
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Annual Fee (PKR)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newStudentData.totalFee}
                      onChange={(e) => setNewStudentData({ ...newStudentData, totalFee: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Initial Deposit Paid (PKR)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newStudentData.paidFee}
                      onChange={(e) => setNewStudentData({ ...newStudentData, paidFee: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Remaining Due Date</label>
                    <input
                      type="date"
                      required
                      value={newStudentData.dueDate}
                      onChange={(e) => setNewStudentData({ ...newStudentData, dueDate: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-slate-700 flex justify-between items-center pt-1">
                  <span>Remaining Dues Balance: <strong className="text-red-600">{formatCurrency(Math.max(0, newStudentData.totalFee - newStudentData.paidFee))}</strong></span>
                  <span className="text-slate-400">All amounts processed in PKR (₨)</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddStudentOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Register Student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT STUDENT, MARKS & FEE */}
      {editingStudent && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingStudent(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-school-950 via-school-900 to-school-950 text-white p-6 relative flex justify-between items-center">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-400 text-school-950 uppercase tracking-wider">
                  Admin Edit Panel
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Edit Student & Fee Record: {editingStudent.name}
                </h3>
                <p className="text-xs text-school-200">Roll No: {editingStudent.rollNo} • Update academic marks, fee ledger and bio</p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditStudentSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              
              {/* Personal & Class */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-school-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Users className="w-4 h-4 text-school-600" /> 1. Student Personal & Enrollment
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Roll No *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.rollNo || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, rollNo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class / Grade *</label>
                    <select
                      value={editFormData.grade || 'Grade 9 (Science)'}
                      onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    >
                      <option value="Grade 10 (Matric)">Grade 10 (Matric)</option>
                      <option value="Grade 9 (Science)">Grade 9 (Science)</option>
                      <option value="Grade 8 (Middle)">Grade 8 (Middle)</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 5 (Primary)">Grade 5 (Primary)</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Nursery / Prep / KG">Nursery / Prep / KG</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section</label>
                    <input
                      type="text"
                      value={editFormData.section || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, section: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enrollment Status</label>
                    <select
                      value={editFormData.status || 'active'}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    >
                      <option value="active">Active Enrolled</option>
                      <option value="inactive">Inactive / On Leave</option>
                      <option value="graduated">Graduated / Matric Passed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Guardian Name</label>
                    <input
                      type="text"
                      value={editFormData.guardianName || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, guardianName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Guardian Phone</label>
                    <input
                      type="tel"
                      value={editFormData.guardianPhone || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, guardianPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Photo URL</label>
                  <input
                    type="url"
                    value={editFormData.photoUrl || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              {/* Marks & Academic Standing */}
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" /> 2. Academic Marks & Exam Performance
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Exam Marks</label>
                    <input
                      type="number"
                      value={editFormData.totalMarks ?? 1100}
                      onChange={(e) => {
                        const tot = Number(e.target.value);
                        const obt = editFormData.obtainedMarks ?? 0;
                        const pct = tot > 0 ? Number(((obt / tot) * 100).toFixed(1)) : 0;
                        setEditFormData({ ...editFormData, totalMarks: tot, percentage: pct });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Obtained Marks</label>
                    <input
                      type="number"
                      value={editFormData.obtainedMarks ?? 0}
                      onChange={(e) => {
                        const obt = Number(e.target.value);
                        const tot = editFormData.totalMarks ?? 1100;
                        const pct = tot > 0 ? Number(((obt / tot) * 100).toFixed(1)) : 0;
                        setEditFormData({ 
                          ...editFormData, 
                          obtainedMarks: obt,
                          percentage: pct,
                          gradePerformance: pct >= 90 ? 'A+ (Distinction)' : pct >= 80 ? 'A (Excellent)' : pct >= 70 ? 'B (Good)' : 'C (Pass)'
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Performance Badge</label>
                    <input
                      type="text"
                      value={editFormData.gradePerformance || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, gradePerformance: e.target.value })}
                      placeholder="e.g. A+ (Distinction) or 1st Position"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Exam / Assessment Term</label>
                    <input
                      type="text"
                      value={editFormData.examTerm || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, examTerm: e.target.value })}
                      placeholder="e.g. BISE Mardan Board Exam 2026"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Attendance Percentage (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={editFormData.attendancePercentage ?? 95}
                      onChange={(e) => setEditFormData({ ...editFormData, attendancePercentage: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-blue-800 pt-1">
                  Computed Percentage: <span className="font-bold text-blue-900">{editFormData.percentage}%</span>
                </div>
              </div>

              {/* Fee Structure in PKR */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-emerald-600" /> 3. Fee Structure & Balance (PKR)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Annual Fee (PKR)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editFormData.totalFee ?? 0}
                      onChange={(e) => setEditFormData({ ...editFormData, totalFee: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Fee Paid (PKR)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editFormData.paidFee ?? 0}
                      onChange={(e) => setEditFormData({ ...editFormData, paidFee: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      required
                      value={editFormData.dueDate || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-slate-700 pt-1 flex justify-between items-center">
                  <span>Calculated Remaining Balance: <strong className="text-red-600">{formatCurrency(Math.max(0, (editFormData.totalFee || 0) - (editFormData.paidFee || 0)))}</strong></span>
                  <span className="text-slate-400">Currency: Pakistani Rupees (PKR)</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Record Fee Payment in PKR */}
      {paymentModalStudent && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setPaymentModalStudent(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-emerald-800 text-white p-6 relative flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Official Accounts & Fee Collection</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Collect Fee in PKR</h3>
              </div>
              <button
                onClick={() => setPaymentModalStudent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="p-6 space-y-4">
              
              {/* Student overview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{paymentModalStudent.name}</p>
                  <p className="text-slate-500">{paymentModalStudent.rollNo} • {paymentModalStudent.grade}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Remaining Fee</span>
                  <span className="font-black text-sm text-red-600">{formatCurrency(paymentModalStudent.remainingFee)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Payment Amount (PKR - ₨) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-emerald-700 outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                >
                  <option value="cash">Cash at School Counter</option>
                  <option value="bank_transfer">Direct Bank Transfer / EasyPaisa / JazzCash</option>
                  <option value="online">Online Portal Deposit</option>
                  <option value="card">Debit / Credit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Notes / Receipt Remarks
                </label>
                <input
                  type="text"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="e.g. Monthly tuition fee or Science lab dues"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Record PKR Payment & Print Receipt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: View Student Ledger & Marks Details */}
      {viewStudent && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setViewStudent(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-school-950 text-white p-6 relative flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-gold-400">Student Profile & Academic Record</span>
                <h3 className="text-xl font-bold text-white">{viewStudent.name} ({viewStudent.rollNo})</h3>
              </div>
              <button
                onClick={() => setViewStudent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Class & Sec</span>
                  <p className="font-bold text-slate-800 mt-0.5">{viewStudent.grade} - {viewStudent.section}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Guardian</span>
                  <p className="font-bold text-slate-800 mt-0.5">{viewStudent.guardianName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Phone</span>
                  <p className="font-bold text-slate-800 mt-0.5">{viewStudent.guardianPhone}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Blood Group</span>
                  <p className="font-bold text-slate-800 mt-0.5">{viewStudent.bloodGroup}</p>
                </div>
              </div>

              {/* Academic Marks & Performance card */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" /> Academic Standing & Marks
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-2xs">
                    {viewStudent.gradePerformance || 'A (Excellent)'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Obtained Marks</span>
                    <p className="font-black text-slate-800 text-base mt-0.5">{viewStudent.obtainedMarks || 950} / {viewStudent.totalMarks || 1100}</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Score Percentage</span>
                    <p className="font-black text-blue-700 text-base mt-0.5">{viewStudent.percentage || 86.4}%</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Attendance</span>
                    <p className="font-black text-emerald-700 text-base mt-0.5">{viewStudent.attendancePercentage || 95}%</p>
                  </div>
                </div>
                {viewStudent.examTerm && (
                  <p className="text-[11px] text-slate-600 mt-2">
                    Assessment Evaluation: <strong>{viewStudent.examTerm}</strong>
                  </p>
                )}
              </div>

              {/* Balances */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Fee</span>
                  <p className="font-black text-slate-800 text-base mt-0.5">{formatCurrency(viewStudent.totalFee)}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Paid Fee</span>
                  <p className="font-black text-emerald-700 text-base mt-0.5">{formatCurrency(viewStudent.paidFee)}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                  <span className="text-[10px] uppercase font-bold text-red-600">Remaining Due</span>
                  <p className="font-black text-red-700 text-base mt-0.5">{formatCurrency(viewStudent.remainingFee)}</p>
                </div>
              </div>

              {/* Payment transactions history */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">
                  Payment Transaction Records (PKR)
                </h4>
                <div className="space-y-2 text-xs">
                  {getStudentPayments(viewStudent.id).length === 0 ? (
                    <p className="text-slate-400 italic">No transactions recorded.</p>
                  ) : (
                    getStudentPayments(viewStudent.id).map(p => (
                      <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{p.receiptNo}</span>
                          <span className="text-slate-400 text-[11px] block">{formatDate(p.date)} • {p.notes}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-slate-900 text-sm">{formatCurrency(p.amount)}</span>
                          <button
                            type="button"
                            onClick={() => setActiveReceipt(p)}
                            className="p-1 text-school-600 hover:bg-school-50 rounded"
                            title="Print Receipt"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

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
                <span className="font-bold font-mono">{activeReceipt.receiptNo}</span>
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
                <span className="font-bold font-mono">{activeReceipt.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Grade / Class:</span>
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
              <span className="font-bold text-slate-700">Amount Paid (PKR):</span>
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
