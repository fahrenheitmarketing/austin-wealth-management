import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const values = [
  {
    icon: BookOpen,
    title: "Education First",
    description: "We believe in empowering clients through knowledge. Every team member is committed to explaining complex concepts in simple, meaningful ways."
  },
  {
    icon: Heart,
    title: "Client Advocacy",
    description: "We are fiduciaries — our only obligation is to the client. No sales quotas, no product commissions. Just honest advice."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Our team works together to serve clients holistically. We share ideas, challenge each other, and grow together as professionals."
  },
  {
    icon: CheckCircle,
    title: "Integrity in Everything",
    description: "We hold ourselves to the highest ethical standards. Trust is the foundation of every relationship we build."
  }
];

const openRoles = [
  {
    title: "Financial Planner",
    type: "Full-Time",
    location: "Austin, TX",
    description: "We're looking for a detail-oriented financial planner to join our growing team. You'll work directly with clients to develop comprehensive financial plans covering retirement, taxes, estate planning, and more.",
    requirements: [
      "CFP® designation (or actively pursuing)",
      "2+ years of financial planning experience",
      "Strong communication and client-facing skills",
      "Passion for financial education"
    ]
  },
  {
    title: "Client Service Associate",
    type: "Full-Time",
    location: "Austin, TX",
    description: "Support our advisory team and clients with day-to-day account management, client communications, and operational tasks. A great entry point into the wealth management industry.",
    requirements: [
      "Bachelor's degree preferred",
      "Exceptional organizational skills",
      "Warm, professional client communication style",
      "Interest in financial services"
    ]
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
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              We're looking for passionate, client-focused professionals who believe 
              financial advice can change lives. No sales pressure. Just meaningful work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why AWM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Why Austin Wealth Management
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              A Different Kind of Firm
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              We've built a culture where doing right by the client is always the answer. 
              Here's what that means for the people who work here.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-amber-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Open Positions
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Current Openings
            </h2>
            <p className="mt-4 text-slate-500">
              Don't see the right fit? Reach out anyway — we're always looking for great people.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <AnimatedSection key={role.title} delay={index * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-slate-900">{role.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{role.type}</span>
                        <span className="text-sm text-slate-500">{role.location}</span>
                      </div>
                    </div>
                    <Link to={createPageUrl('Contact')}>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium rounded-full">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">{role.description}</p>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">What we're looking for:</p>
                    <ul className="space-y-2">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Get in Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              Ready to Join the Team?
            </h2>
            <p className="mt-6 text-slate-400 max-w-xl mx-auto">
              Send us a message through our contact page and let us know you're interested 
              in a career at Austin Wealth Management.
            </p>
            <div className="mt-10">
              <Link to={createPageUrl('Contact')}>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 h-14 rounded-full"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}