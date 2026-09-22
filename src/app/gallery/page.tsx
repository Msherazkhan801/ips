'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AdmissionModal from '@/components/admission-modal';
import FeeLookupModal from '@/components/fee-lookup-modal';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Camera, 
  Calendar, 
  Maximize2, 
  X, 
  Sparkles, 
  Tag, 
  Globe 
} from 'lucide-react';
import { GalleryItem } from '@/types';

export default function GalleryPage() {
  const { gallery } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'campus', label: 'Campus & Landmark' },
    { id: 'academics', label: 'Science & Computer Labs' },
    { id: 'sports', label: 'Sports Day & Games' },
    { id: 'arts', label: 'Qirat, Naat & Speeches' },
    { id: 'events', label: 'Annual Functions & Prizes' },
  ];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

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
              <Camera className="w-3.5 h-3.5 text-gold-400" />
              <span>Campus Life & Moments</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Photo Gallery: Iqra Public School Permoli
            </h1>
            <p className="text-sm sm:text-base text-school-200">
              Capturing vibrant memories of our students, science exhibitions, sports tournaments, and landmark campus art in Permoli.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-school-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            {filteredGallery.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-600">No photos in this category yet.</p>
                <p className="text-xs text-slate-400 mt-1">Admin can upload new photos anytime from the Admin Portal.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePhoto(item)}
                    className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer h-72 border border-slate-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/iqra-school-event.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-base font-bold leading-snug line-clamp-1 group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2 font-medium">
                        <Calendar className="w-3 h-3 text-gold-400" />
                        <span>Uploaded: {item.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/iqra-school-event.jpg';
                }}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 text-white bg-slate-900/95 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold-400 text-slate-950">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400">
                  Date: {activePhoto.uploadDate}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

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
