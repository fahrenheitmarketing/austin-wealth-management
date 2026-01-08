import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
            Austin Wealth Management
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight"
        >
          All of the financial options,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            none of the pressure.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          We serve as professional educators and advocates for the financial well-being 
          of families in Central Texas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to={createPageUrl('Planning')}>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium px-8 h-14 text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to={createPageUrl('Contact')}>
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-700 text-white hover:bg-slate-800/50 font-medium px-8 h-14 text-base rounded-full"
            >
              Schedule a Consultation
            </Button>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16 text-slate-500"
        >
          <div className="text-center">
            <div className="text-3xl font-light text-white">300+</div>
            <div className="text-xs tracking-wide uppercase mt-1">Families Served</div>
          </div>
          <div className="w-px h-12 bg-slate-800" />
          <div className="text-center">
            <div className="text-3xl font-light text-white">CFP®</div>
            <div className="text-xs tracking-wide uppercase mt-1">Certified Planners</div>
          </div>
          <div className="w-px h-12 bg-slate-800" />
          <div className="text-center">
            <div className="text-3xl font-light text-white">15+</div>
            <div className="text-xs tracking-wide uppercase mt-1">Years Experience</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}