import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Wallet, GraduationCap, Shield, Heart, Users, Scale, PiggyBank, MessageCircle, Briefcase, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const educationTopics = [
  {
    icon: Scale,
    title: "Wall Street vs. Main Street",
    description: "We help bridge the massive knowledge gap between Wall Street and Main Street to help you understand your investments and make smart choices."
  },
  {
    icon: TrendingUp,
    title: "Amateur vs. Professional Investing",
    description: "According to several studies, the average amateur investor significantly underperforms the average professional. We give you the knowledge and strategies used by professionals."
  },
  {
    icon: PiggyBank,
    title: "Increasing Savings Rates",
    description: "Most young families undersave expecting to make it up later. We show you why saving 20–30% of gross pay matters — and how to actually make it happen."
  },
  {
    icon: Wallet,
    title: "Budgeting",
    description: "Do you have a budget you can realistically follow each month? We help identify spending patterns, where your money is really going, and create a budget you can stick to."
  },
  {
    icon: Shield,
    title: "Debt Management",
    description: "We understand getting out of debt is difficult. We can help you attack your payments and create a step-by-step strategy to get your family out of the pit of debt."
  },
  {
    icon: Briefcase,
    title: "Equity Compensation",
    description: "RSUs, ESPPs, ISOs — equity compensation is powerful but complex. We teach you how each type works, how they're taxed, and how to build a smart strategy around them."
  },
  {
    icon: BarChart2,
    title: "Business Owner Finances",
    description: "Running a business adds a layer of complexity to personal finances. We help business owners understand how to pay themselves, plan for retirement, and eventually exit."
  },
  {
    icon: Heart,
    title: "Income Plans",
    description: "We help you create a well-thought-out income plan that accounts for possible future health expenses and ensures you're prepared for life's changes."
  },
  {
    icon: Users,
    title: "Lack of Trust",
    description: "There are many valid reasons to be skeptical of the financial services industry. It is our responsibility to rebuild that trust through integrity and transparency."
  },
  {
    icon: GraduationCap,
    title: "Fear of the Stock Market",
    description: "We understand many people are distrustful of the stock market because they've been burned in the past. We help make sure you're aware of investment risks and realistic expectations."
  },
  {
    icon: MessageCircle,
    title: "Household Communication",
    description: "Different people view money very differently. We help you and your partner communicate effectively about finances so you're working as a team."
  }
];

export default function Education() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Financial Education Resources | Austin Wealth Management</title>
        <meta name="description" content="Plain-language financial education on investing, budgeting, taxes, and more. Austin Wealth Management helps families make smarter financial decisions." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/Education" />
        <meta property="og:title" content="Financial Education Resources | Austin Wealth Management" />
        <meta property="og:description" content="Plain-language financial education on investing, budgeting, taxes, and more. Austin Wealth Management helps families make smarter financial decisions." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" }, { "@type": "ListItem", "position": 2, "name": "Education", "item": "https://www.austinwealthmgmt.com/Education" }] })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8d9184071_generated_image.png" 
          alt="Financial Education"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Education
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Knowledge Creates
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                A-Ha Moments
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              How much better would you feel about your financial situation if you had a better 
              handle on the core concepts behind investing, budgeting, insurance, debt and taxes?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-xl text-slate-600 leading-relaxed">
              You don't need a PhD, but a 101 will make you more independent and more likely to succeed. 
              We use illustrations and analogies to make complex concepts easier to grasp. If you are 
              craving even more knowledge, we can take the education as far as you want.
            </p>
            <p className="mt-6 text-lg text-amber-600 font-medium">
              Our whiteboards are never clean.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Education Topics */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              What We Teach
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Areas of Financial Education
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Through the creation of your financial plan, we provide clients with the knowledge 
              to make important life decisions and understand the potential financial impact.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationTopics.map((topic, index) => (
              <AnimatedSection key={topic.title} delay={index * 0.05}>
                <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <topic.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{topic.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{topic.description}</p>
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
              Start Learning
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              Ready to gain financial confidence?
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Schedule a consultation with one of our Certified Financial Planners 
              and start your educational journey today.
            </p>
            <div className="mt-10">
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