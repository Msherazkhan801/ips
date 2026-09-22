'use client';

import React, { useState } from 'react';
import AdminTopbar from '@/components/admin/topbar';
import { useSchoolData } from '@/context/school-data-context';
import { 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  Layers,
  Globe,
  X,
  Save,
  Check,
  Star,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';
import { GalleryItem } from '@/types';
import GoogleDriveImageInput from '@/components/google-drive-image-input';

export default function AdminGalleryPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useSchoolData();

  // Add Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'campus' | 'events' | 'sports' | 'academics' | 'arts'>('academics');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<GalleryItem>>({});
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    addGalleryItem({
      title,
      category,
      imageUrl,
      description: description || 'Campus activity highlight at Iqra Public School Permoli.',
      featured: true,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      featured: item.featured ?? true,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editFormData.title || !editFormData.imageUrl) return;

    updateGalleryItem(editingItem.id, editFormData);
    setEditSuccessMsg(true);
    setTimeout(() => {
      setEditSuccessMsg(false);
      setEditingItem(null);
    }, 800);
  };

  const samplePresets = [
    {
      title: 'Pre-School Activity Room & Phonics Learning',
      category: 'academics' as const,
      url: '/images/iqra-preschool.jpg',
      desc: 'Young nursery students participating in interactive play and phonetic Urdu/English learning.',
    },
    {
      title: 'Primary School Classroom Interactive Lecture',
      category: 'academics' as const,
      url: '/images/iqra-primary.jpg',
      desc: 'Engaged students raising hands during general science and mathematics class.',
    },
    {
      title: 'Middle School Science Experiments & Computer Lab',
      category: 'academics' as const,
      url: '/images/iqra-middle.jpg',
      desc: 'Hands-on practical models, plant biology research, and laptop computing assignments.',
    },
    {
      title: 'BISE Mardan Board Prep Library Group Study',
      category: 'academics' as const,
      url: '/images/iqra-matric.jpg',
      desc: 'Senior Matric students reviewing board syllabus and past papers in the school library.',
    },
    {
      title: 'Official Campus Gate & Landmark Wall Mural',
      category: 'campus' as const,
      url: '/images/iqra-school-event.jpg',
      desc: 'Main landmark wall art and calligraphy emblem at Iqra Public School Permoli.',
    },
    {
      title: 'Annual Faculty & Student Farewell Gathering',
      category: 'events' as const,
      url: '/images/iqra-hero.jpg',
      desc: 'Teachers and students gathering for the annual farewell assembly.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopbar
        title="Campus Photo Gallery Manager"
        subtitle="Upload, edit & organize photographs displayed dynamically on the public school website"
      />

      <main className="p-4 sm:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
        
        {/* Top Info Banner */}
        <div className="bg-school-900 text-white p-6 rounded-2xl border border-school-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400 text-school-950 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Live Public Website Sync Active</h3>
              <p className="text-xs text-school-200 mt-0.5">Any photograph uploaded, edited, or removed here automatically updates the public website gallery and home sections.</p>
            </div>
          </div>
          <Link
            href="/gallery"
            target="_blank"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
          >
            <span>View Live Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Upload New Picture Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-school-600" />
                Upload New Image to School Gallery
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Paste a Google Drive share link (0 database storage) or provide an image URL / file
              </p>
            </div>

            {successMsg && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Uploaded & Published to Live Gallery!
              </span>
            )}
          </div>

          <form onSubmit={handleAddPhoto} className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Left Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Photo Title / Activity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Matric Science Lab Practical"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Gallery Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="academics">Academic Classrooms & Science</option>
                    <option value="campus">Campus, Buildings & Mural</option>
                    <option value="events">Events, Assemblies & Farewells</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="arts">Qirat, Naat & Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Caption / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description about this photo, students, or school milestone..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none resize-none"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1">
                  <p className="text-[11px] font-bold uppercase text-slate-400 mb-1.5">Quick Authentic Presets:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {samplePresets.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setTitle(s.title);
                          setCategory(s.category);
                          setImageUrl(s.url);
                          setDescription(s.desc);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-school-50 text-slate-700 hover:text-school-800 transition-all border border-slate-200"
                      >
                        + {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Image Input & Live Preview */}
              <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                <GoogleDriveImageInput
                  value={imageUrl}
                  onChange={(newUrl) => setImageUrl(newUrl)}
                  label="Photograph Source & Preview"
                  placeholder="Paste Google Drive link (e.g. drive.google.com/file/d/...)"
                  aspectRatio="video"
                  required
                />

                <button
                  type="submit"
                  disabled={!imageUrl || !title}
                  className="w-full py-3.5 bg-school-800 hover:bg-school-900 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-school-900/10 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Photo to Live Website Gallery</span>
                </button>
              </div>

            </div>

          </form>
        </div>

        {/* Existing Gallery Images Grid with Edit & Delete Controls */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Current Live Gallery Photographs ({gallery.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click "Edit" on any photograph to modify its title, caption, category, or photo image.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-school-300 transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onError={(e) => {
                      // Graceful fallback for broken external links
                      (e.target as HTMLImageElement).src = '/images/iqra-school-event.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white/95 text-slate-900 shadow backdrop-blur-sm">
                    {item.category}
                  </span>

                  {item.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-400 text-school-950 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.uploadDate}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-school-700 hover:text-school-950 bg-school-50 hover:bg-school-100 border border-school-200/80 rounded-lg text-xs font-bold transition-all"
                        title="Edit Photo Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${item.title}" from the gallery?`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* MODAL: EDIT GALLERY PHOTO */}
      {editingItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setEditingItem(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-school-950 text-white p-6 relative flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-gold-400 tracking-wider">
                  Gallery Editor
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">Edit Photograph Details</h3>
                <p className="text-xs text-school-200">Changes update dynamically across the live website</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              
              {editSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gallery photograph updated successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Photo Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.title || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={editFormData.category || 'academics'}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="academics">Academic Classrooms & Science</option>
                    <option value="campus">Campus, Buildings & Mural</option>
                    <option value="events">Events, Assemblies & Farewells</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="arts">Qirat, Naat & Arts</option>
                  </select>
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editFormData.featured ?? true}
                      onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                      className="w-4 h-4 text-school-600 rounded border-slate-300 focus:ring-school-500"
                    />
                    <span>Featured on Home Page Carousel</span>
                  </label>
                </div>
              </div>

              {/* Photo Source Input & Live Preview */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <GoogleDriveImageInput
                  value={editFormData.imageUrl || ''}
                  onChange={(newUrl) => setEditFormData({ ...editFormData, imageUrl: newUrl })}
                  label="Photograph Source & Preview"
                  placeholder="Paste Google Drive link or enter image URL"
                  aspectRatio="video"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={editFormData.description || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-school-600 focus:bg-white outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Photo</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

