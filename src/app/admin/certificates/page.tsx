'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Award, 
  Printer, 
  Save, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Trash2, 
  Calendar,
  Layers,
  Scroll,
  UserCheck,
  Palette,
  RotateCw
} from 'lucide-react';
import { Certificate, CertificateType } from '@/types';
import { generateCertificateNumber, formatDate } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function AdminCertificatesPage() {
  const { students, certificates, addCertificate, deleteCertificate } = useSchoolData();

  // Recipient info
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'custom');
  const [customStudentName, setCustomStudentName] = useState(students[0]?.name || 'Muhammad Hamza Khan');
  const [customRollNo, setCustomRollNo] = useState(students[0]?.rollNo || 'IPS-2026-001');
  const [customGrade, setCustomGrade] = useState(students[0]?.grade || 'Grade 10 (Matric)');

  // Certificate Fields
  const [certType, setCertType] = useState<CertificateType>('academic_excellence');
  const [certTitle, setCertTitle] = useState('Certificate of Academic Excellence');
  const [honors, setHonors] = useState('1st Position with High Distinction (A+ Grade)');
  const [description, setDescription] = useState('Awarded for exceptional scholastic dedication, intellectual curiosity, and securing 1st Position in Science with A+ Grade at Iqra Public School Permoli.');
  
  // Principal & Dates
  const [principalName, setPrincipalName] = useState('Akhter Munir');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateLabel, setDateLabel] = useState('Date of Issue');
  
  // Design & Meta
  const [sealColor, setSealColor] = useState('#ca8a04');
  const [activeCertNo, setActiveCertNo] = useState(generateCertificateNumber());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync recipient when dropdown changes
  const handleStudentSelect = (id: string) => {
    setSelectedStudentId(id);
    if (id === 'custom') {
      return;
    }
    const stu = students.find(s => s.id === id);
    if (stu) {
      setCustomStudentName(stu.name);
      setCustomRollNo(stu.rollNo);
      setCustomGrade(stu.grade);
    }
  };

  const handleTemplateChange = (type: CertificateType) => {
    setCertType(type);
    setActiveCertNo(generateCertificateNumber());
    switch (type) {
      case 'academic_excellence':
        setCertTitle('Certificate of Academic Excellence');
        setHonors('1st Position with High Distinction (A+ Grade)');
        setDescription('For demonstrating exceptional mastery, intellectual dedication, and top scholastic standing in all curriculum assessments at Iqra Public School Permoli.');
        setSealColor('#ca8a04');
        break;
      case 'completion':
        setCertTitle('Certificate of Graduation & Completion');
        setHonors('Matriculation Science Diploma (BISE Mardan Board)');
        setDescription('Having fulfilled all academic requirements, standards of character, and secondary board examinations with exemplary distinction.');
        setSealColor('#026ec9');
        break;
      case 'sports':
        setCertTitle('Athletic Excellence & Sportsmanship Award');
        setHonors('Varsity Champion & Best All-Rounder (Permoli Cup)');
        setDescription('In recognition of outstanding athletic leadership, sportsmanship, and captaining the school team to championship victory.');
        setSealColor('#059669');
        break;
      case 'character':
        setCertTitle('Exemplary Character & Tarbiyah Citation');
        setHonors('Islamic Character & Leadership Distinction');
        setDescription('For inspiring peers through moral integrity, volunteer community service, truthfulness, and upholding noble Islamic values.');
        setSealColor('#7c3aed');
        break;
      case 'appreciation':
        setCertTitle('Certificate of Merit & Special Appreciation');
        setHonors('Annual Qirat & Speech Competition Winner');
        setDescription('Awarded in sincere appreciation for outstanding eloquence, Tajweed recitation, and representing Iqra Public School Permoli with pride.');
        setSealColor('#db2777');
        break;
    }
  };

  const handleSaveCertificate = () => {
    addCertificate({
      studentId: selectedStudentId !== 'custom' ? selectedStudentId : 'custom-id',
      studentName: customStudentName,
      rollNo: customRollNo,
      grade: customGrade,
      title: certTitle,
      type: certType,
      issueDate: issueDate,
      description,
      certificateNo: activeCertNo,
      principalName,
      sealColor,
      honors,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const sealColors = [
    { name: 'Gold Imperial', value: '#ca8a04' },
    { name: 'Royal Blue', value: '#026ec9' },
    { name: 'Emerald Green', value: '#059669' },
    { name: 'Royal Purple', value: '#7c3aed' },
    { name: 'Crimson Rose', value: '#db2777' },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Certificate Generation Engine"
        subtitle="Create, customize, and issue official academic and athletic certificates for Iqra Public School Permoli"
      />

      <main className="p-4 sm:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top Certificate Customization Controls */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 no-print">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-600" />
                Certificate Editor & Issue Settings
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select student or enter custom details, set issue date, and customize citation wording
              </p>
            </div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Certificate Saved to Records!
              </span>
            )}
          </div>

          {/* Row 1: Student Selection & Template Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Student selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Choose Enrolled Student:
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => handleStudentSelect(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
              >
                {students.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.name} ({stu.rollNo}) - {stu.grade}
                  </option>
                ))}
                <option value="custom">✏️ Enter Custom Recipient Details...</option>
              </select>
            </div>

            {/* Template type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Certificate Category / Theme:
              </label>
              <select
                value={certType}
                onChange={(e) => handleTemplateChange(e.target.value as CertificateType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
              >
                <option value="academic_excellence">Academic Excellence & Distinction</option>
                <option value="completion">BISE Mardan Matric Graduation / Completion</option>
                <option value="sports">Athletic Achievement & Sports</option>
                <option value="character">Islamic Character, Tarbiyah & Ethics</option>
                <option value="appreciation">Appreciation, Qirat & Speech Competition</option>
              </select>
            </div>

            {/* Issue Date Picker (Admin Editable) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-school-600" />
                Issue Date (Selected by Admin) *
              </label>
              <input
                type="date"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-school-600 focus:bg-white"
              />
            </div>

          </div>

          {/* Row 2: Recipient Details Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50/70 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Recipient Name:
              </label>
              <input
                type="text"
                required
                value={customStudentName}
                onChange={(e) => setCustomStudentName(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Roll Number:
              </label>
              <input
                type="text"
                required
                value={customRollNo}
                onChange={(e) => setCustomRollNo(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Class / Grade:
              </label>
              <input
                type="text"
                required
                value={customGrade}
                onChange={(e) => setCustomGrade(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 outline-none"
              />
            </div>
          </div>

          {/* Row 3: Signatory & Date Label Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Principal / Signatory:
              </label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                placeholder="Akhter Munir"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Date Label Text:
              </label>
              <input
                type="text"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                placeholder="Date of Issue"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Official Seal Color:
              </label>
              <div className="flex items-center gap-2 pt-1">
                {sealColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSealColor(color.value)}
                    style={{ backgroundColor: color.value }}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      sealColor === color.value ? 'scale-125 ring-2 ring-offset-2 ring-slate-800' : 'opacity-80 hover:opacity-100'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Title & Distinction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Certificate Title:
              </label>
              <input
                type="text"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Special Distinction / Honors Ribbon:
              </label>
              <input
                type="text"
                value={honors}
                onChange={(e) => setHonors(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Citation Body / Achievement Details:
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-school-600"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Serial No:</span>
              <input
                type="text"
                value={activeCertNo}
                onChange={(e) => setActiveCertNo(e.target.value)}
                className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs w-48"
              />
              <button
                type="button"
                onClick={() => setActiveCertNo(generateCertificateNumber())}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Regenerate Certificate Serial"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveCertificate}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savedSuccess ? 'Saved to Records!' : 'Save to Archive'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Certificate</span>
              </button>
            </div>
          </div>

        </div>

        {/* PRINTABLE CERTIFICATE CANVAS */}
        <div className="flex justify-center items-center py-4">
          <div className="printable-area w-full max-w-4xl bg-[#fdfaf3] p-10 sm:p-14 rounded-3xl shadow-2xl border-[12px] border-double border-[#85581e] relative text-center text-slate-900 overflow-hidden">
            
            {/* Ornate Corner Accents */}
            <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-gold-600 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-gold-600 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-gold-600 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-gold-600 rounded-br-xl pointer-events-none" />

            {/* School Emblem Top */}
            <div className="relative z-10 space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden flex items-center justify-center border-2 border-gold-600/60 bg-white p-1 shadow-md">
                <img
                  src="/images/iqra-logo.png"
                  alt="Iqra Public School Permoli Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h2 className="font-serif font-black tracking-widest text-2xl sm:text-3xl text-school-950 uppercase">
                  IQRA PUBLIC SCHOOL PERMOLI
                </h2>
                <p className="text-[11px] uppercase tracking-widest text-gold-700 font-bold mt-1">
                  District Swabi, Khyber Pakhtunkhwa • Registered & Recognized
                </p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="my-8 relative z-10">
              <div className="inline-block px-6 py-2 border-y-2 border-gold-600">
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#78350f] tracking-wide uppercase">
                  {certTitle}
                </h1>
              </div>
            </div>

            {/* Citation Statement */}
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <p className="font-serif italic text-base text-slate-600">
                This prestigious citation is proudly conferred upon
              </p>

              <div className="py-2 border-b-2 border-slate-300 inline-block px-8">
                <h3 className="font-serif font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                  {customStudentName || 'Muhammad Hamza Khan'}
                </h3>
              </div>

              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Class: {customGrade} • Roll No: {customRollNo}
              </p>

              <p className="text-sm text-slate-700 font-medium leading-relaxed italic px-4">
                "{description}"
              </p>

              {honors && (
                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gold-400/20 border border-gold-500/40 text-xs font-black text-gold-900 uppercase tracking-wider shadow-sm">
                    ★ {honors} ★
                  </span>
                </div>
              )}
            </div>

            {/* Certificate Bottom Signatures & Seal */}
            <div className="mt-12 pt-8 grid grid-cols-3 items-end relative z-10 border-t border-slate-200">
              
              {/* Issue Date (Selected by Admin) */}
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 font-serif">
                  {formatDate(issueDate)}
                </p>
                <div className="w-32 border-b border-slate-400 my-1" />
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {dateLabel || 'Date of Issue'}
                </p>
              </div>

              {/* Official Gold Seal */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-20 h-20 rounded-full border-4 border-dashed flex items-center justify-center shadow-lg"
                  style={{ borderColor: sealColor, backgroundColor: `${sealColor}15` }}
                >
                  <div className="text-center">
                    <Sparkles className="w-5 h-5 mx-auto" style={{ color: sealColor }} />
                    <span className="text-[8px] font-black uppercase tracking-wider block" style={{ color: sealColor }}>
                      OFFICIAL SEAL
                    </span>
                  </div>
                </div>
                <p className="text-[9px] font-mono text-slate-400 mt-2">{activeCertNo}</p>
              </div>

              {/* Principal Signature */}
              <div className="text-right">
                <p className="font-serif italic font-bold text-sm text-slate-900">{principalName}</p>
                <div className="w-36 border-b border-slate-400 my-1 ml-auto" />
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Principal, IPS Permoli</p>
              </div>

            </div>

          </div>
        </div>

        {/* Previously Issued Certificates Archive */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm no-print">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-school-600" />
              Issued Certificates Archive ({certificates.length})
            </h4>
            <span className="text-xs text-slate-400">All dates tracked in system</span>
          </div>

          {certificates.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4">No certificates saved yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between text-xs hover:border-school-300 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{cert.studentName}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-school-100 text-school-800">
                        {cert.rollNo}
                      </span>
                      <span className="text-slate-400 text-[10px]">• {cert.grade}</span>
                    </div>
                    <p className="text-xs font-semibold text-school-700 mt-1">{cert.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{cert.honors}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-mono">
                      Issued: <strong>{formatDate(cert.issueDate)}</strong> • Signatory: {cert.principalName} • #{cert.certificateNo}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Remove certificate ${cert.certificateNo}?`)) {
                        deleteCertificate(cert.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete certificate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
