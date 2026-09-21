'use client';

import React from 'react';
import { 
  Building2, 
  Cpu, 
  Trophy, 
  Music, 
  BookOpen, 
  Leaf, 
  Sparkles 
} from 'lucide-react';

const FACILITIES = [
  {
    icon: Cpu,
    title: 'AI & Robotics Innovation Hub',
    desc: 'Equipped with 3D printers, IoT micro-controllers, drone kits, and high-speed simulation GPUs for student tech ventures.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    tag: 'Future Tech',
  },
  {
    icon: Trophy,
    title: 'Olympic-Standard Sports Arena',
    desc: 'Includes an Olympic-size heated pool, indoor basketball courts, FIFA-certified turf, and professional coaching staff.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    tag: 'Athletics',
  },
  {
    icon: BookOpen,
    title: 'Digital Horizon Knowledge Library',
    desc: 'Featuring over 50,000 digital academic subscriptions, collaborative study pods, and rare historical archives.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80',
    tag: 'Research',
  },
  {
    icon: Music,
    title: 'Grand Performing Arts Auditorium',
    desc: 'Acoustically engineered 1,200-seat amphitheater hosting international MUN conferences, theatrical dramas, and symphonies.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&auto=format&fit=crop&q=80',
    tag: 'Creativity',
  },
  {
    icon: Leaf,
    title: 'Eco-Living & Botanical Greenhouse',
    desc: 'Hands-on agricultural science, clean energy solar systems, and environmental biology experiments.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    tag: 'Sustainability',
  },
  {
    icon: Building2,
    title: 'Smart Health & Wellness Suites',
    desc: 'On-campus certified pediatric medical staff, nutritional cafeterias, and mental well-being counselling rooms.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
    tag: 'Well-being',
  },
];

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-school-500/20 text-school-300 border border-school-400/30 uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-school-400" /> Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            An Inspiring Environment Built for Excellence
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Our 35-acre smart green campus integrates sustainable architecture with state-of-the-art academic and athletic infrastructure.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/70 hover:border-school-400/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-gold-400 backdrop-blur-md border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-school-500/20 border border-school-400/30 text-school-300 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-school-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
