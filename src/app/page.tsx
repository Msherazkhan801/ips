'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import ProgramsSection from '@/components/programs-section';
import FacilitiesSection from '@/components/facilities-section';
import GallerySection from '@/components/gallery-section';
import NoticesSection from '@/components/notices-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import FeeLookupModal from '@/components/fee-lookup-modal';
import AdmissionModal from '@/components/admission-modal';

export default function HomePage() {
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar
        onOpenFeeLookup={() => setFeeModalOpen(true)}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenAdmission={() => setAdmissionModalOpen(true)}
        onOpenFeeLookup={() => setFeeModalOpen(true)}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Academic Programs */}
      <div id="about" className="scroll-mt-20">
        <ProgramsSection onOpenAdmission={() => setAdmissionModalOpen(true)} />
      </div>

      {/* Campus Facilities */}
      <FacilitiesSection />

      {/* Dynamic Campus Gallery */}
      <GallerySection />

      {/* Notices and Circulars */}
      <NoticesSection />

      {/* Contact & Tours */}
      <ContactSection onOpenAdmission={() => setAdmissionModalOpen(true)} />

      {/* Footer with Admin Portal Button */}
      <Footer />

      {/* Interactive Modals */}
      <FeeLookupModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
      />

      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />
    </main>
  );
}
