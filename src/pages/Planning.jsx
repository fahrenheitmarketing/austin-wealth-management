import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Wallet, TrendingUp, Landmark, Home, Shield, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const lifeStages = [
  {
    title: "Early Career",
    households: "118",
    questions: [
      "How much should we save?",
      "Which house can we afford?",
      "What to do about college funding?",
      "How much life insurance do we need?",
      "What is a smart, low cost way to invest?"
    ]
  },
  {
    title: "Late Career",
    households: "105",
    questions: [
      "How do our finances compare to our peers?",
      "How can we save on taxes?",
      "Are we on track to help our kids with college?",
      "We are thinking about starting a business.",
      "Do we have enough insurance?"
    ]
  },
  {
    title: "Retired",
    households: "90",
    questions: [
      "What kind of lifestyle can I afford in retirement?",
      "Am I taking too little / too much risk investing?",
      "Is there anything we can do to lower taxes?",
      "Does long term care make sense for us?",
      "How will our Estate be taken care of?"
    ]
  }
];

const planningAreas = [
  { icon: Shield, title: "Financial Security", items: ["Bank & cash management", "Budgeting", "Debt pay down", "Company benefits", "Insurance coverage", "Estate planning"] },
  { icon: TrendingUp, title: "Building Wealth", items: ["How much to save", "Account types (401k, Roth, Trust)", "Investment risk assessment", "Tax efficiency", "Cost control"] },
  { icon: Landmark, title: "Retirement Income", items: ["Spending budget", "Which accounts to draw from", "Social Security choices", "Pension choices", "Inflation protection"] }
];

const process = [
  { step: "01", title: "Organize Everything", description: "Live data feeds, spending tracking, investments, insurance docs, legal & tax docs" },
  { step: "02", title: "Education & Options", description: "Goals & priorities, practical budgets, debt strategy, tax planning, risk management" },
  { step: "03", title: "Make Changes & Automate", description: "Deploy cash, direct deposits, 401(k) strategy, investment changes, estate plan docs" },
  { step: "04", title: "Measure Results", description: "Track spending, investments, cash balance, debt, and net worth over time" }
];

const differentiators = [
  "No sales pressure. We don't have a boss with quotas.",
  "We pay attention to the little things that matter a lot.",
  "We make practical recommendations from personal experience.",
  "We coordinate with your CPAs, attorney, and other professionals.",
  "We follow our own advice.",
  "We don't have a minimum account size or requirements.",
  "We use the most compelling evidence to construct investment portfolios.",
  "We offer the latest technology to keep your financial info in one place."
];

export default function Planning() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/ee6c58b2b_generated_image.png" 
          alt="Financial Planning"
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
              Financial Planning
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              We Can Help You
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Make a Plan
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Through the creation of your financial plan, we provide you with the knowledge 
              to make important life decisions and understand the potential financial impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Planning Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Comprehensive Coverage
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              How Can We Help You Plan?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {planningAreas.map((area, index) => (
              <AnimatedSection key={area.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                    <area.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">{area.title}</h3>
                  <ul className="space-y-3">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Life Stages */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Tailored Approach
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Which Life Stage Are You In?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {lifeStages.map((stage, index) => (
              <AnimatedSection key={stage.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-slate-900">{stage.title}</h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      {stage.households} households
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-4">Common Questions:</p>
                  <ul className="space-y-3">
                    {stage.questions.map((q, i) => (
                      <li key={i} className="text-slate-600 text-sm pl-4 border-l-2 border-slate-200">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              How Does It Work?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.1}>
                <div className="relative">
                  <div className="text-6xl font-light text-amber-500/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
                The AWM Difference
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                How is AWM Different?
              </h2>
              <p className="mt-4 text-slate-500">
                We've built our practice around what we believe financial advice should be — 
                client-focused, evidence-based, and delivered with care.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-4">
                {differentiators.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Transparent Pricing
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Fees Matter
            </h2>
            
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-2">New Client Financial Plan Setup</h3>
                <div className="text-3xl font-light text-amber-600 mb-2">$2,500 - $10,000</div>
                <p className="text-slate-500 text-sm">Depending on complexity</p>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Ongoing Financial Planning</h3>
                <div className="text-3xl font-light text-amber-600 mb-2">$250/month</div>
                <p className="text-slate-500 text-sm">Continuous support and guidance</p>
              </div>
            </div>

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