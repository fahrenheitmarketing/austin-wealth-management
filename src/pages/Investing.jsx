import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BookOpen, BarChart3, Settings, Play, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const commonQuestions = [
  "How much of my money should I have in the stock market?",
  "Should I just buy index funds?",
  "Is the market too expensive? Should we wait for a correction?",
  "Should I put some of my money in rental real estate?",
  "Should I focus on high dividend stocks?",
  "What happens if interest rates go up?",
  "How much Facebook, Apple, Netflix and Google should we own?",
  "Can I invest in startups?",
  "What about Bitcoin?"
];

const investingProcess = [
  {
    step: "01",
    icon: BookOpen,
    title: "Education & Research",
    items: ["How markets work", "Historical return factors", "Trends & innovations", "Understanding risk", "Investing psychology"]
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Integration with Planning",
    items: ["Purpose", "Timeline", "Account selection (401k, Roth, 529, etc)", "Required returns", "Risk budgeting"]
  },
  {
    step: "03",
    icon: Settings,
    title: "Custom Design",
    items: ["Strategy preferences", "Allocation choices", "Investment styles", "Mutual funds, ETFs, etc", "Private investments"]
  },
  {
    step: "04",
    icon: Play,
    title: "Execution",
    items: ["Minimize taxes", "Manage all fees", "Rebalance", "Dividend strategy", "Cash inflows/withdrawals"]
  },
  {
    step: "05",
    icon: LineChart,
    title: "Measure Everything",
    items: ["Total portfolio performance", "All accounts in one view", "Includes private investments", "Helpful charts & graphs", "Market insight"]
  }
];

const feeTiers = [
  { range: "First $1M", rate: "1.00%" },
  { range: "$1M - $3M", rate: "0.75%" },
  { range: "$3M - $5M", rate: "0.50%" },
  { range: "Over $5M", rate: "0.35%" }
];

const differentiators = [
  "No sales pressure. We don't have a boss with quotas.",
  "We pay attention to the little things that matter a lot.",
  "We make practical recommendations from personal experience.",
  "We coordinate with your CPAs, attorney, and other professionals.",
  "We follow our own advice.",
  "We use the most compelling evidence to construct investment portfolios.",
  "We offer the latest technology to keep your financial info in one place."
];

export default function Investing() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Investment Management
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Choosing the Right Path
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                for Your Plan
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Evidence-based portfolio construction tailored to your goals, 
              timeline, and risk tolerance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
                Common Concerns
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                Questions You May Have
              </h2>
              <p className="mt-4 text-slate-500">
                These are the questions we hear most often from clients. 
                We're here to help you find the right answers.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-3">
                {commonQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 text-sm">{question}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Our Approach
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              How Can We Help You Invest?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {investingProcess.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="text-xs text-amber-400 font-medium mb-2">{item.step}</div>
                  <h3 className="text-lg font-medium text-white mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((text, i) => (
                      <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
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
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Transparent Pricing
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Investment Management Fees
            </h2>
            <p className="mt-4 text-slate-500">
              Simple, transparent pricing that scales with your portfolio
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 bg-slate-900 text-white">
                <div className="p-4 text-sm font-medium">Assets Under Management</div>
                <div className="p-4 text-sm font-medium text-right">Annual Fee</div>
              </div>
              {feeTiers.map((tier, index) => (
                <div key={index} className={`grid grid-cols-2 ${index !== feeTiers.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="p-4 text-slate-700">{tier.range}</div>
                  <div className="p-4 text-right font-medium text-amber-600">{tier.rate}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
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