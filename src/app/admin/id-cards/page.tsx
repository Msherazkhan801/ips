'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  IdCard, 
  Printer, 
  Download, 
  Sparkles, 
  QrCode, 
  GraduationCap, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Palette,
  RotateCw
} from 'lucide-react';
import { Student } from '@/types';

export default function AdminIdCardsPage() {
  const { students } = useSchoolData();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [themeColor, setThemeColor] = useState<'navy' | 'emerald' | 'crimson' | 'purple'>('navy');
  const [cardSide, setCardSide] = useState<'front' | 'back' | 'both'>('both');

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const themeStyles = {
    navy: {
      headerBg: 'bg-gradient-to-r from-school-950 via-school-900 to-school-800',
      accentColor: 'text-gold-400',
      badgeBg: 'bg-school-900 text-gold-400 border-gold-400/30',
      borderColor: 'border-school-900',
      buttonRing: 'ring-school-900',
    },
    emerald: {
      headerBg: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800',
      accentColor: 'text-emerald-300',
      badgeBg: 'bg-emerald-900 text-emerald-300 border-emerald-400/30',
      borderColor: 'border-emerald-900',
      buttonRing: 'ring-emerald-900',
    },
    crimson: {
      headerBg: 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-800',
      accentColor: 'text-rose-300',
      badgeBg: 'bg-rose-900 text-rose-300 border-rose-400/30',
      borderColor: 'border-rose-900',
      buttonRing: 'ring-rose-900',
    },
    purple: {
      headerBg: 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800',
      accentColor: 'text-purple-300',
      badgeBg: 'bg-purple-900 text-purple-300 border-purple-400/30',
      borderColor: 'border-purple-900',
      buttonRing: 'ring-purple-900',
    },
  };

  const currentTheme = themeStyles[themeColor];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Student ID Card Generator"
        subtitle="Design and print high-resolution official student identity cards & badges"
      />

      <main className="p-4 sm:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Controls Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 no-print">
          
          {/* Student Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Student:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
            >
              {students.map((stu) => (
                <option key={stu.id} value={stu.id}>
                  {stu.name} ({stu.rollNo}) - {stu.grade}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Palette */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5" /> Theme:
            </span>
            <button
              onClick={() => setThemeColor('navy')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                themeColor === 'navy' ? 'bg-school-900 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Navy Gold
            </button>
            <button
              onClick={() => setThemeColor('emerald')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                themeColor === 'emerald' ? 'bg-emerald-800 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Emerald
            </button>
            <button
              onClick={() => setThemeColor('crimson')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                themeColor === 'crimson' ? 'bg-rose-800 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Crimson
            </button>
            <button
              onClick={() => setThemeColor('purple')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                themeColor === 'purple' ? 'bg-purple-800 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Purple
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Student ID Card</span>
          </button>
        </div>

        {/* Printable ID Card Showcase Area */}
        <div className="printable-area flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
          
          {selectedStudent && (
            <>
              {/* FRONT OF ID CARD */}
              <div className="w-[320px] h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 flex flex-col justify-between relative">
                
                {/* Lanyard Hole Mockup */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-300 rounded-full no-print" />

                {/* Card Header */}
                <div className={`${currentTheme.headerBg} text-white pt-7 pb-4 px-4 text-center relative`}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-white/40 bg-white p-0.5 shadow-sm">
                      <img
                        src="/images/iqra-logo.png"
                        alt="IPS Logo"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-sm tracking-tight text-white leading-tight">
                        IQRA PUBLIC SCHOOL
                      </h4>
                      <p className="text-[8px] uppercase tracking-widest text-gold-300 font-bold">
                        PERMOLI (SWABI, KPK)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Student Photo & Identity */}
                <div className="px-6 text-center -mt-2">
                  <div className="relative inline-block mx-auto mb-3">
                    <img
                      src={selectedStudent.photoUrl}
                      alt={selectedStudent.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg mx-auto"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gold-400 text-school-950 shadow-sm whitespace-nowrap">
                      STUDENT
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight mt-2">
                    {selectedStudent.name}
                  </h3>
                  
                  <p className="text-xs font-bold text-school-700 mt-0.5">
                    {selectedStudent.grade} - Section {selectedStudent.section}
                  </p>

                  <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Roll Number</span>
                    <span className="font-mono font-bold text-xs text-slate-900">{selectedStudent.rollNo}</span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="px-6 py-2 grid grid-cols-2 gap-2 text-[10px] text-slate-600 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 uppercase font-bold block text-[8px]">Blood Group</span>
                    <span className="font-bold text-slate-800">{selectedStudent.bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold block text-[8px]">Academic Session</span>
                    <span className="font-bold text-slate-800">2026 - 2027</span>
                  </div>
                </div>

                {/* Card Footer with Signature & Barcode */}
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-serif italic text-[11px] text-slate-800 font-bold border-b border-slate-400 leading-tight">
                      Akhter Munir
                    </div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                      Principal, IPS Permoli
                    </span>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="text-right">
                    <div className="flex gap-0.5 items-end justify-end h-5">
                      {[3, 5, 2, 4, 6, 2, 5, 3, 6, 2, 4, 3, 5].map((h, i) => (
                        <div key={i} className="w-[1.5px] bg-slate-800" style={{ height: `${h * 3}px` }} />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-slate-400">{selectedStudent.rollNo}</span>
                  </div>
                </div>

              </div>

              {/* BACK OF ID CARD */}
              <div className="w-[320px] h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 flex flex-col justify-between relative">
                
                {/* Lanyard Hole */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-300 rounded-full no-print" />

                {/* Back Top */}
                <div className="p-6 pt-8 space-y-4">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Emergency & School Contact
                    </h5>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Guardian / Father Name</span>
                      <p className="font-bold text-slate-800">{selectedStudent.guardianName}</p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Emergency Mobile / Phone</span>
                      <p className="font-bold text-slate-800">{selectedStudent.guardianPhone}</p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Residential Village / Address</span>
                      <p className="font-medium text-slate-600 text-[11px] leading-relaxed">{selectedStudent.address}</p>
                    </div>
                  </div>

                  {/* Rules & Terms */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[9px] text-slate-500 leading-relaxed space-y-1">
                    <p>• Property of Iqra Public School Permoli (Swabi).</p>
                    <p>• Mandatory during school hours, van transit & board exams.</p>
                    <p>• If lost/found, contact IPS Permoli: +92 (347) 294-3510.</p>
                  </div>
                </div>

                {/* QR Code Back Footer */}
                <div className="bg-slate-50 p-6 border-t border-slate-200 flex items-center justify-between">
                  <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-slate-800" />
                  </div>
                  <div className="text-right text-[10px] text-slate-500">
                    <p className="font-bold text-slate-800">CAMPUS SMART PASS</p>
                    <p>RFID / NFC Enabled</p>
                    <p className="font-mono text-[9px] mt-1 text-slate-400">{selectedStudent.id}</p>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

      </main>
    </div>
  );
}
