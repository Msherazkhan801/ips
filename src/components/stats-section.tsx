'use client';

import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Trophy, 
  Globe2, 
  Sparkles 
} from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '1,500+',
    label: 'Enrolled Students',
    desc: 'From Kindergarten to Grade 12',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Award,
    value: '99.4%',
    label: 'Academic Success',
    desc: 'Cambridge & IB distinction',
    color: 'from-emerald-600 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: GraduationCap,
    value: '85+',
    label: 'Certified Faculty',
    desc: 'Masters & Ph.D. educators',
    color: 'from-gold-600 to-amber-600',
    bgColor: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Trophy,
    value: '42+',
    label: 'National Trophies',
    desc: 'STEM, debate & athletics',
    color: 'from-purple-600 to-pink-600',
    bgColor: 'bg-purple-50 text-purple-700',
  },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-900/5 border border-slate-100 hover:border-school-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-school-600 transition-colors">
                  #0{idx + 1}
                </span>
              </div>
              <h3 className="text-3xl font-black tracking-tight text-slate-900 mb-1">
                {item.value}
              </h3>
              <p className="text-sm font-bold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
