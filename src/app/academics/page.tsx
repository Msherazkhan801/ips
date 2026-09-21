'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { 
  BookOpen, 
  Atom, 
  Cpu, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  FileText,
  Calendar
} from 'lucide-react';

export default function AcademicsPage() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const sections = [
    {
      title: 'Pre-School & Kindergarten',
      grades: 'Nursery, Prep & KG (Ages 3 - 5)',
      desc: 'Activity-based joyful early childhood education developing English and Urdu phonetic literacy, basic numbers, Nazra Quran, and social skills.',
      subjects: ['English Phonics', 'Urdu Haroof-e-Tahajji', 'Mathematics & Counting', 'General Knowledge & Rhymes', 'Nazra Quran & Daily Duas'],
      badge: 'Early Years',
      image: '/images/iqra-preschool.jpg',
    },
    {
      title: 'Primary School Section',
      grades: 'Class 1 to Class 5 (Ages 6 - 10)',
      desc: 'Solid conceptual foundation in science, language comprehension, mental arithmetic, and computer fundamentals with personal mentoring.',
      subjects: ['General Science', 'Mathematics', 'English Grammar & Reading', 'Urdu Literature', 'Social Studies & Islamiyat', 'Computer Basics'],
      badge: 'Primary Wing',
      image: '/images/iqra-primary.jpg',
    },
    {
      title: 'Middle School Section',
      grades: 'Class 6 to Class 8 (Ages 11 - 13)',
      desc: 'Analytical and practical education preparing students for secondary board standards, including laboratory demonstrations and IT assignments.',
      subjects: ['Physics & Chemistry Concepts', 'Biology & Environment', 'Algebra & Geometry', 'English Composition', 'Urdu & Pashto Literature', 'Computer Applications'],
      badge: 'Middle Wing',
      image: '/images/iqra-middle.jpg',
    },
    {
      title: 'Secondary Matriculation Wing',
      grades: 'Class 9 & Class 10 (BISE Mardan Board)',
      desc: 'Focused academic preparation for Matriculation board exams in Science (Biology/Computer Science groups) with regular test sessions and mock assessments.',
      subjects: ['Physics (Theory & Lab)', 'Chemistry (Theory & Lab)', 'Biology / Computer Science', 'Mathematics', 'English & Urdu', 'Pakistan Studies & Islamiyat'],
      badge: 'Matric Board',
      image: '/images/iqra-matric.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenFeeLookup={() => setFeeModalOpen(true)}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1">
        
        {/* Header */}
        <section className="bg-gradient-to-b from-school-950 via-school-900 to-school-950 text-white py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold-400 text-xs font-bold border border-white/15">
              <BookOpen className="w-3.5 h-3.5 text-gold-400" />
              <span>Academic Curriculum & Standards</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Academic Excellence at Iqra Public School Permoli
            </h1>
            <p className="text-sm sm:text-base text-school-200">
              A balanced educational journey blending standard national curriculum, scientific experimentation, modern IT training, and Islamic teachings.
            </p>
          </div>
        </section>

        {/* Curriculum Levels Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-school-300 transition-all flex flex-col justify-between group"
                >
                  {/* Real Academic Photo Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-school-950 shadow-md backdrop-blur-md">
                        {sec.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs font-semibold text-slate-200">{sec.grades}</span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-school-700 transition-colors">
                        {sec.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {sec.desc}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-slate-200">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Core Subjects Taught:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sec.subjects.map((sub, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => setAdmissionModalOpen(true)}
                        className="w-full py-2.5 bg-white hover:bg-school-800 hover:text-white border border-slate-200 text-school-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Apply for {sec.badge}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science & IT Features */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-500/20 text-school-300 border border-school-400/30 uppercase tracking-wider">
                Specialized Wings
              </span>
              <h2 className="text-3xl font-black text-white mt-3">
                Practical Laboratories & Moral Development
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Atom className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Science & Physics Lab</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hands-on laboratory apparatus for chemistry titrations, physics optics and mechanics, and biological specimen analysis for board students.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Modern Computer Lab</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast desktop systems equipped for teaching typing, office productivity, introductory programming, and internet research ethics.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Hifz & Nazra Quran Wing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicated Quranic recitation with correct Tajweed, morning Azkar, and Islamic character training integrated with regular schooling.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />

      <FeeLookupModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
      />
    </div>
  );
}
