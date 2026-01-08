import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const teamMembers = [
  { name: "Kevin X. Smith", title: "CFA", initials: "KS" },
  { name: "Derek Ripp", title: "CFP®, CEPA", initials: "DR" },
  { name: "Julie Hayes", title: "MA", initials: "JH" },
  { name: "Anna Bell Gall", title: "MPP", initials: "AG" },
  { name: "John Toungate", title: "CFP®", initials: "JT" },
  { name: "Shane McDougald", title: "CFP®", initials: "SM" }
];

export default function TeamPreview() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
            Meet the Team
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            The people behind the planning
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            A team of certified professionals working together to serve you with specialized knowledge and personalized attention.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.05}>
              <div className="group text-center">
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-light text-slate-500 group-hover:scale-110 transition-transform duration-300">
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-medium text-slate-900 text-sm">{member.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{member.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link to={createPageUrl('Team')}>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-slate-300 hover:bg-slate-100"
            >
              Meet the Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}