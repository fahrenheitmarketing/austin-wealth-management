import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';

const openRoles = [
  {
    slug: "senior-financial-advisor",
    title: "Senior Financial Advisor"
  },
  {
    slug: "financial-planner",
    title: "Financial Planner"
  }
];

export default function Careers() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8e78a0887_image.png"
          alt="Austin Skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Build a Career
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                That Matters
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Careers at AWM
            </span>
            <h2 className="mt-4 text-3xl font-light text-slate-900 tracking-tight">
              Join Our Team!
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-center">
              <p>
                At Austin Wealth Management, LLC, we believe in the importance of teamwork and 
                collaboration, and we strive to create an environment that encourages every one 
                of our employees to design and deliver innovative solutions and processes that 
                enhance the holistic wealth management services we provide to our clients.
              </p>
              <p>
                We operate more like a startup than most firms in our industry and we look for 
                candidates that are willing to challenge the status quo by seeking out new ideas 
                that make our clients more successful. Those who work hard and help us deliver 
                superior client value will be rewarded with opportunities to develop best-fit 
                career paths and grow with the company.
              </p>
              <p>
                If you are excited about the opportunity to join our team and make an immediate 
                impact, we encourage you to send your resume and cover letter to{' '}
                <a href="mailto:careers@austinwealthmgmt.com" className="text-amber-600 hover:text-amber-700 font-medium">
                  careers@austinwealthmgmt.com
                </a>
                . See below for current open positions. We look forward to hearing from you!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Open Positions
            </span>
          </AnimatedSection>

          <div className="space-y-4">
            {openRoles.map((role, index) => (
              <AnimatedSection key={role.slug} delay={index * 0.1}>
                <Link to={`/careers/${role.slug}`}>
                  <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group">
                    <h3 className="text-lg font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                      {role.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}