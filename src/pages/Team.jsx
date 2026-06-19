import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Network, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { teamMembers, generateSlug } from '@/lib/teamData';

const principles = [
  {
    icon: Users,
    title: "Education",
    subtitle: "No Sales Pitch, Just Education",
    description: "We use illustrations and analogies to make complex concepts easier to grasp. If you are craving even more knowledge, we can take the education as far as you want."
  },
  {
    icon: Heart,
    title: "Advocacy",
    subtitle: "You Should Have a Financial Advocate",
    description: "We believe that our job is to help educate you, present you with options to help you achieve your objectives and then hold you accountable to taking action."
  },
  {
    icon: Network,
    title: "Accountability",
    subtitle: "Accountability Leads to Progress",
    description: "Accountability is the glue that helps you stay on track to achieve your most important financial objectives in life."
  }
];

export default function Team() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Meet Our Team | Austin Wealth Management</title>
        <meta name="description" content="Get to know our team of CFPs, CFAs, and financial specialists dedicated to serving Central Texas families." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/Team" />
        <meta property="og:title" content="Meet Our Team | Austin Wealth Management" />
        <meta property="og:description" content="Get to know our team of CFPs, CFAs, and financial specialists dedicated to serving Central Texas families." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" }, { "@type": "ListItem", "position": 2, "name": "Team", "item": "https://www.austinwealthmgmt.com/Team" }] })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8e78a0887_image.png" 
          alt="Austin Skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Meet Your Team of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Financial Planners
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              A team of certified professionals with specialized knowledge who work 
              together to collectively serve our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.04}>
                <Link
                  to={`/team/${generateSlug(member.name)}`}
                  className="group text-center block"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50">
                    {member.photo ? (
                      <>
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <span className="text-4xl font-light text-slate-400">{member.initials}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-medium tracking-wide px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        Read Bio →
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-slate-900 text-sm leading-tight">{member.name}</h3>
                  {member.title && (
                    <p className="text-amber-600 text-xs mt-0.5">{member.title}</p>
                  )}
                  <p className="text-slate-500 text-xs mt-0.5">{member.role}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <Link to="/Careers">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full border-slate-300 hover:bg-slate-100"
              >
                Interested in Joining Our Team?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* How Team is Different */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Our Approach
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              How Our Team is Different
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <h3 className="text-xl font-medium text-slate-900 mb-4">On Your Own</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your financial advice comes from an array of professionals in the form of 
                  brokers, advisors, accountants, bankers, attorneys and more. Unfortunately, 
                  odds are high that none of these people are coordinating appropriately, 
                  resulting in fragmented and conflicting notions about which decisions are best.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="p-8 rounded-3xl bg-slate-900 text-white">
                <h3 className="text-xl font-medium mb-4">With Our Team</h3>
                <p className="text-slate-300 leading-relaxed">
                  When you hire our team, we actively engage your professional advisors, 
                  provide them information with your permission, and help you build an 
                  efficient financial plan using the best available ideas.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Our Core Principles
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <AnimatedSection key={principle.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                    <principle.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{principle.title}</h3>
                  <p className="text-sm text-amber-600 font-medium mb-4">{principle.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed">{principle.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight leading-relaxed">
              We Believe in the Power of{' '}
              <span className="text-amber-400">Integrity and Honesty</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We serve as professional educators and advocates for the financial well-being 
              of families in Central Texas. We believe that the business of financial advice 
              can and should be rooted deeply in the research of America's finest institutions 
              and delivered with the same attention and care as a Four Seasons concierge.
            </p>
            <div className="mt-12">
              <Link to={createPageUrl('Contact')}>
                <Button 
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 h-14 rounded-full"
                >
                  Schedule a Consultation
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