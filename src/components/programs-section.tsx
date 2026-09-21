'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  BookOpen, 
  Atom, 
  Cpu, 
  ArrowRight, 
  Check, 
  Layers 
} from 'lucide-react';

const PROGRAMS = [
  {
    id: 'kindergarten',
    title: 'Early Years (Nursery, Prep & KG)',
    age: 'Ages 3 - 5',
    desc: 'Activity-based foundational learning developing English and Urdu phonetic literacy, numbers, Nazra Quran, and social skills.',
    highlights: ['English & Urdu Phonics', 'Islamic Nazra & Daily Duas', 'Activity Playroom', 'Social Skills & Rhymes'],
    color: 'border-pink-500/20 bg-pink-50/50 text-pink-700',
    badge: 'Pre-School',
    image: '/images/iqra-preschool.jpg',
  },
  {
    id: 'primary',
    title: 'Primary School (Classes 1 to 5)',
    age: 'Grades 1 - 5 (Ages 6 - 10)',
    desc: 'Solid conceptual grounding in mathematics, general science, English comprehension, Urdu, and beginner computer literacy.',
    highlights: ['Conceptual Mathematics', 'General Science Experiments', 'Computer Fundamentals', 'Islamic Studies & Tarbiyah'],
    color: 'border-blue-500/20 bg-blue-50/50 text-blue-700',
    badge: 'Primary Wing',
    image: '/images/iqra-primary.jpg',
  },
  {
    id: 'middle',
    title: 'Middle School (Classes 6 to 8)',
    age: 'Grades 6 - 8 (Ages 11 - 13)',
    desc: 'Analytical curriculum preparing students for secondary board examinations with laboratory practicals and IT assignments.',
    highlights: ['Physics & Chemistry Concepts', 'Practical Biology Labs', 'Algebra & Geometry', 'English Speech & Debates'],
    color: 'border-amber-500/20 bg-amber-50/50 text-amber-700',
    badge: 'Middle Wing',
    image: '/images/iqra-middle.jpg',
  },
  {
    id: 'matric',
    title: 'Secondary Matric (BISE Mardan)',
    age: 'Classes 9 & 10 (Ages 14 - 16)',
    desc: 'Focused preparation for Matriculation board examinations in Science (Bio/Computer Science) with regular test sessions and mock papers.',
    highlights: ['Physics & Chemistry Labs', 'Biology & Computer Science', 'Board Mock Examinations', 'High Position Track Record'],
    color: 'border-purple-500/20 bg-purple-50/50 text-purple-700',
    badge: 'Matric Board Wing',
    image: '/images/iqra-matric.jpg',
  }
];

interface ProgramsSectionProps {
  onOpenAdmission?: () => void;
}

export default function ProgramsSection({ onOpenAdmission }: ProgramsSectionProps) {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-school-100 text-school-800 uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-school-600" /> Academic Wings
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curriculum for Every Milestone in Permoli
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl">
              From nursery early foundations to Matriculation board excellence, our curriculum nurtures intellect, science skills, and Islamic ethics.
            </p>
          </div>

          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-xs font-bold text-school-800 bg-white hover:bg-school-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <span>View Full Syllabus & Subjects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-school-300 transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                    {prog.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-school-950/80 text-white shadow-sm backdrop-blur-sm">
                    {prog.age}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-school-700 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {prog.desc}
                  </p>

                  {/* Highlights List */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </p>
                    {prog.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-school-800 bg-school-50 hover:bg-school-800 hover:text-white rounded-xl transition-all"
                  >
                    <span>Apply for {prog.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
