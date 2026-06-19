import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  { range: "First $250,000", rate: "Included" },
  { range: "Next $250,000", rate: "0.90%" },
  { range: "Next $500,000", rate: "0.80%" },
  { range: "Next $500,000", rate: "0.70%" },
  { range: "Next $500,000", rate: "0.60%" },
  { range: "Next $3,000,000", rate: "0.50%" },
  { range: "Over $5,000,000", rate: "Custom" }
];

const investmentViews = [
  {
    title: "Simplicity First",
    description: "Start with simple & practical strategies. Only add complexity if it is definitely worth it. Complexity often creates hidden costs and confusion without meaningful benefit."
  },
  {
    title: "Cash Flow is the Foundation",
    description: "Daily decisions about cash and cash flow make a BIG long-term impact. Have plenty of access to cash before tying up investments — liquidity is an asset."
  },
  {
    title: "Sequence Matters",
    description: "The planning sequence matters. Each decision impacts the next, creating a compounding effect. Getting the order right can mean the difference between success and costly mistakes."
  },
  {
    title: "No Single 'Right' Way to Invest",
    description: "There is no single correct way to invest, but there are many bad ways. We use the most compelling evidence to construct portfolios — not trends, not emotion."
  },
  {
    title: "Diversify Before You Need To",
    description: "Diversification only works if it's in place BEFORE the market turns. Waiting until volatility arrives is too late — we build resilient portfolios proactively."
  },
  {
    title: "Tax Strategy is Year-Round",
    description: "Tax strategy needs to happen throughout the year, not just at tax time. Proactive coordination with your CPA can dramatically improve after-tax returns."
  }
];

const differentiators = [
  { title: "No Sales Pressure", description: "We don't have a boss with quotas. Our only obligation is to you. Every recommendation we make is driven by your best interest, not a product commission." },
  { title: "We Pay Attention to the Details", description: "The little things matter a lot in wealth management. Small optimizations in fees, taxes, and timing compound into meaningful results over time." },
  { title: "Practical, Personal Recommendations", description: "We make recommendations from personal experience — we follow our own advice and invest alongside our clients using the same strategies we recommend." },
  { title: "We Coordinate Your Full Team", description: "We work alongside your CPAs, attorneys, and other professionals to make sure every piece of your financial life is working together efficiently." },
  { title: "No Minimum Requirements", description: "We don't have a minimum account size or requirements. We serve clients based on fit and commitment, not arbitrary asset thresholds." },
  { title: "Evidence-Based Portfolios", description: "We use the most compelling academic evidence to construct investment portfolios — not market trends or speculation. Our approach is disciplined and time-tested." },
  { title: "Technology That Works for You", description: "We offer the latest technology to keep your financial information in one place — giving you a clear, real-time picture of your complete financial life." }
];

export default function Investing() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Investment Management | Austin Wealth Management</title>
        <meta name="description" content="Evidence-based investment strategies built around your goals. Austin Wealth Management designs custom portfolios for Central Texas families." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/investing" />
        <meta property="og:title" content="Investment Management | Austin Wealth Management" />
        <meta property="og:description" content="Evidence-based investment strategies built around your goals. Austin Wealth Management designs custom portfolios for Central Texas families." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" }, { "@type": "ListItem", "position": 2, "name": "Investing", "item": "https://www.austinwealthmgmt.com/Investing" }] })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/9a4bbf517_generated_image.png" 
          alt="Investment Management"
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

      {/* Investment Philosophy */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Our Thinking
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Our Investment Philosophy
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              These are the core beliefs that guide every portfolio we build and every recommendation we make.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentViews.map((view, index) => (
              <AnimatedSection key={view.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                  <div className="w-2 h-8 rounded-full bg-amber-500 mb-4" />
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{view.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{view.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              The AWM Difference
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              How is AWM Different?
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              We've built our practice around what financial advice should be — client-focused, evidence-based, and delivered with care.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
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
                <div className="p-4 text-sm font-medium">Total Household Managed Assets</div>
                <div className="p-4 text-sm font-medium text-right">Annual % of Managed Assets Fee*</div>
              </div>
              {feeTiers.map((tier, index) => (
                <div key={index} className={`grid grid-cols-2 ${index !== feeTiers.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="p-4 text-slate-700">{tier.range}</div>
                  <div className="p-4 text-right font-medium text-amber-600">{tier.rate}</div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-500 px-1 text-center">
              *A minimum fee of $250/month for ongoing planning applies in addition to the managed assets fee.
            </p>

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