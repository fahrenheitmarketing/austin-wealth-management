import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
            <Calendar className="h-3.5 w-3.5" />
            Schedule a Consultation
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            Ready to gain a new perspective on your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              financial future?
            </span>
          </h2>
          
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Getting started is easy. Schedule a time to chat with one of our 
            Certified Financial Planners and take the first step toward your goals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium px-8 h-14 text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Make an Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Planning')}>
              <Button 
                variant="outline"
                size="lg"
                className="border-slate-700 text-white hover:bg-slate-800/50 font-medium px-8 h-14 text-base rounded-full"
              >
                Learn About Our Process
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}