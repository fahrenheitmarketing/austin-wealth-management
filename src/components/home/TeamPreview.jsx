import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { teamMembers, generateSlug } from '@/lib/teamData';

const previewMembers = teamMembers.slice(0, 6);

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
          {previewMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.05}>
              <Link
                to={`/team/${generateSlug(member.name)}`}
                className="group text-center w-full block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50">
                  {/* B&W image (default) */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* Color image (on hover) */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-medium tracking-wide uppercase px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      View Bio
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-slate-900 text-sm">{member.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{member.title}</p>
              </Link>
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