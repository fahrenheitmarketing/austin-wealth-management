import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, TrendingUp, Wallet, GraduationCap, Shield, Heart, Users, Scale, PiggyBank, Home, MessageCircle } from 'lucide-react';
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
    description: "According to several studies, the average amateur investor significantly under performs the average professional. Let's change that by giving you the knowledge and strategies used by professionals."
  },
  {
    icon: PiggyBank,
    title: "Increasing Savings Rates",
    description: "Most young families under save with the expectation they can make it up later. We can show you why you should save 20-30% of your gross pay, and how you can make it happen."
  },
  {
    icon: GraduationCap,
    title: "Preparing for College",
    description: "What will college tuition look like when your one year old applies 18 years from now? Are you ready for college expenses to be $250,000? We can help you prepare."
  },
  {
    icon: Wallet,
    title: "Budgeting",
    description: "Do you have a budget you can realistically follow each month? We can help identify spending patterns, where your money is really going and create a budget you can actually stick to."
  },
  {
    icon: Shield,
    title: "Massive Debt",
    description: "We understand getting out of debt is difficult. We can help you attack your payments and create a step ladder to get your family out of the pit of debt."
  },
  {
    icon: Home,
    title: "Retirement Expectations",
    description: "What retirement expectations are realistic? Can you travel to Paris and Venice or will you have trouble with the grocery store? We can help create a confident retirement plan."
  },
  {
    icon: Heart,
    title: "Income Plans",
    description: "We can help you create a well thought out income plan that takes into account possible future health expenses. We'll make sure you're prepared."
  },
  {
    icon: Users,
    title: "Lack of Trust",
    description: "There are many valid reasons to be skeptical and distrustful of the financial services industry. It is our responsibility to rebuild that trust through integrity and transparency."
  },
  {
    icon: TrendingUp,
    title: "Fear of the Stock Market",
    description: "We understand many people are distrustful of the stock market because they've been burned in the past. We can help make sure you're aware of investment risks."
  },
  {
    icon: MessageCircle,
    title: "Household Communication",
    description: "We understand that different people view and think about financials very differently. We can help you and your spouse communicate effectively about finances."
  }
];

export default function Education() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
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
              No Sales Pitch,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Just Education
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