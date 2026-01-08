import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CoreValues from '@/components/home/CoreValues';
import ServicesPreview from '@/components/home/ServicesPreview';
import ClientQuestions from '@/components/home/ClientQuestions';
import TeamPreview from '@/components/home/TeamPreview';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <CoreValues />
      <ServicesPreview />
      <ClientQuestions />
      <TeamPreview />
      <CTASection />
    </main>
  );
}