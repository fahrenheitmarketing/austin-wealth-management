import React from 'react';
import { ArrowUpRight, TrendingUp, PiggyBank, ShieldCheck, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const services = [
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Comprehensive planning covering savings, budgeting, insurance, debt management, and estate planning.",
    link: "Planning"
  },
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Evidence-based portfolio construction tailored to your goals, timeline, and risk tolerance.",
    link: "Investing"
  },
  {
    icon: ShieldCheck,
    title: "Retirement Planning",
    description: "Strategic income planning, Social Security optimization, and lifestyle budgeting for your future.",
    link: "Planning"
  },
  {
    icon: Landmark,
    title: "Tax Strategy",
    description: "Tax-efficient investing and strategic planning to help minimize your tax burden.",
    link: "Investing"
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <AnimatedSection direction="left">
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              How We Help
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Your complete financial 
              <span className="text-amber-400"> partner</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We believe that the business of financial advice should be rooted deeply in research 
              and delivered with the same attention and care as a Four Seasons concierge.
            </p>
            
            <div className="mt-10 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-slate-950" />
                  ))}
                </div>
                <div className="text-slate-300 font-medium">
                  300+ families trust us
                </div>
              </div>
              <p className="text-slate-500 text-sm">
                Serving early career, late career, and retired households across Central Texas.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1} direction="right">
                <Link to={createPageUrl(service.link)}>
                  <div className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                          <service.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-slate-500 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}