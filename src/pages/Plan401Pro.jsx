import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, CheckCircle, DollarSign, AlertCircle, Users, Clock, Shield, Settings, HeartHandshake } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const painPoints = [
  {
    icon: DollarSign,
    title: "Hidden Fees",
    desc: "Layers of undisclosed costs erode employee returns year after year without anyone noticing."
  },
  {
    icon: AlertCircle,
    title: "Commission-Driven Advice",
    desc: "Many 401(k) advisors are paid by the funds they recommend. That's a conflict of interest built into the plan."
  },
  {
    icon: Users,
    title: "Fiduciary Risk on You",
    desc: "As the plan sponsor, you bear personal legal liability for investment decisions — unless someone else takes that responsibility."
  },
  {
    icon: Clock,
    title: "Time You Don't Have",
    desc: "Managing a 401(k) plan is a real administrative burden. It takes time away from running your business."
  }
];

const features = [
  {
    icon: Shield,
    title: "Fiduciary Protection",
    items: [
      "3(38) investment fiduciary status",
      "We select and monitor all investments",
      "Your personal liability is eliminated",
      "DoL regulation tracking included"
    ]
  },
  {
    icon: Settings,
    title: "Intelligent Plan Design",
    items: [
      "Plan structure tailored to your business",
      "Payroll system integration",
      "Low-cost Vanguard and DFA funds",
      "No hidden fees or commissions"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Real Service",
    items: [
      "One point of contact for all providers",
      "1-on-1 employee education sessions",
      "Peer benchmarking against comparable plans",
      "Regular plan reviews and reporting"
    ]
  }
];

const steps = [
  {
    number: "01",
    title: "Review Your Current Plan",
    desc: "We assess your existing plan structure, fees, and investment lineup to identify what's working and what isn't."
  },
  {
    number: "02",
    title: "Design the Right Plan",
    desc: "We build a plan structure around your business goals, employee needs, and budget — with full payroll integration."
  },
  {
    number: "03",
    title: "Take Over as Fiduciary",
    desc: "We assume 3(38) fiduciary responsibility for investment selection and monitoring, removing the burden from you."
  },
  {
    number: "04",
    title: "Ongoing Management",
    desc: "Regular reviews, employee education sessions, regulatory updates, and a single point of contact for everything."
  }
];

const fiduciaryItems = [
  "Selection of all plan investment options",
  "Ongoing monitoring of fund performance",
  "Replacing underperforming investments",
  "Documentation and regulatory compliance",
  "DoL regulation tracking and updates"
];

const pricingItems = [
  "Fee applies to plans with at least $500,000 in total assets",
  "Fee structure never increases",
  "No commissions, no 12b-1 fees, no hidden costs",
  "Underlying fund expenses are separate and disclosed upfront"
];

const whoCards = [
  {
    title: "Businesses Starting a 401(k)",
    body: "You want to offer a retirement benefit but don't know where to start. We handle plan design, provider selection, payroll integration, and employee onboarding from day one."
  },
  {
    title: "Plans Ready for an Upgrade",
    body: "You already have a 401(k) but suspect the fees are too high, the investment options are poor, or your current advisor isn't delivering. We provide a free plan review."
  },
  {
    title: "Business Owners Planning Their Own Exit",
    body: "Your 401(k) is also a powerful tool for your own retirement savings. We design plans that maximize contributions for owners while remaining compliant."
  }
];

export default function Plan401Pro() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>401(PRO) — Business 401(k) Plans | Austin Wealth Management</title>
        <meta name="description" content="401(PRO) is Austin Wealth Management's turnkey retirement plan solution for small businesses — simple to run, transparent on fees, and backed by our highest level of fiduciary protection." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/401pro" />
        <meta property="og:title" content="401(PRO) — Business 401(k) Plans | Austin Wealth Management" />
        <meta property="og:description" content="401(PRO) is Austin Wealth Management's turnkey retirement plan solution for small businesses — simple to run, transparent on fees, and backed by our highest level of fiduciary protection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.austinwealthmgmt.com/401pro" />
        <meta property="og:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="401(PRO) — Business 401(k) Plans | Austin Wealth Management" />
        <meta name="twitter:description" content="401(PRO) is Austin Wealth Management's turnkey retirement plan solution for small businesses — simple to run, transparent on fees, and backed by our highest level of fiduciary protection." />
        <meta name="twitter:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img
          src=""
          alt="401(k) Retirement Planning"
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
              401(k) & Retirement Planning
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              The 401(k) Plan Your Business
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Actually Deserves
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              401(PRO) is Austin Wealth Management's turnkey retirement plan solution for small businesses — simple to run, transparent on fees, and backed by our highest level of fiduciary protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
                Why Most Small Business 401(k) Plans Fall Short
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                Your employees deserve better. So do you.
              </h2>
              <p className="mt-6 text-slate-500 leading-relaxed">
                Most 401(k) plans offered to small businesses are loaded with hidden fees, built around products that pay the advisor a commission, and left to the plan sponsor — you — to manage and monitor. That's not how it should work.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid gap-4">
                {painPoints.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 401(PRO) DIFFERENCE */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              The 401(PRO) Solution
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              More of what you want. Less of what you don't.
            </h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto leading-relaxed">
              401(PRO) removes the friction, the hidden costs, and the liability from your 401(k) — and replaces them with transparent pricing, fiduciary protection, and a plan your employees will actually value.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-5">{feature.title}</h3>
                  <ul className="space-y-3">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              How 401(PRO) Works
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-500 mb-4">{step.number}</div>
                  <h3 className="text-lg font-medium text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FIDUCIARY EXPLAINED */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
                Fiduciary Responsibility
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                What does it mean that we act as your fiduciary?
              </h2>
              <div className="mt-6 space-y-5 text-slate-600 leading-relaxed">
                <p>
                  As a plan sponsor, you carry personal legal liability for the investment options in your 401(k) plan. If employees believe the plan's investments were poor choices, they can sue — and you're the defendant.
                </p>
                <p>
                  401(PRO) assumes 3(38) investment fiduciary status, which is the highest level of fiduciary protection available. That means we take legal responsibility for selecting, monitoring, and replacing investment options in the plan. You retain responsibility for hiring us — but once you do, the investment decisions and their liability transfer to Austin Wealth Management.
                </p>
                <p>
                  It's the difference between delegating a task and truly transferring the risk.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="p-8 rounded-3xl bg-slate-900 text-white">
                <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
                  The 401(PRO) Fiduciary Shield
                </span>
                <h3 className="mt-4 text-xl font-medium text-white mb-6">
                  What transfers to us:
                </h3>
                <ul className="space-y-4 mb-8">
                  {fiduciaryItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You remain responsible for selecting Austin Wealth Management as your advisor and for plan administration decisions not related to investment management.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRICING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Transparent Pricing
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              No hidden fees. No commissions. No gimmicks.
            </h2>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We are paid solely through our annual plan service fee. That means no under-the-table revenue from fund companies, no 12b-1 fees, and no surprises on your plan cost disclosure.
            </p>
          </AnimatedSection>

          <AnimatedSection className="max-w-lg mx-auto">
            <div className="p-10 rounded-3xl bg-white border border-slate-200 text-center">
              <div className="text-6xl font-light text-amber-500 mb-2">0.50%</div>
              <p className="text-slate-900 font-medium mb-4">Maximum annual fee of plan assets</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Your fee may be lower depending on plan size and structure. Our goal is to help you design and manage a plan with total expenses below the industry average.
              </p>
              <ul className="space-y-3 text-left">
                {pricingItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-slate-400 text-xs leading-relaxed text-center">
              The 401(PRO) service fee listed covers the advisory fee paid to Austin Wealth Management, LLC only and does not include underlying plan investment fees or other plan service provider expenses paid to third parties.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 7: WHO IT'S FOR */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Who 401(PRO) Serves
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Built for small and mid-size Austin businesses
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {whoCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{card.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Get Started
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              Find out what your plan should look like.
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Schedule a consultation with Austin Wealth Management. We'll review your current plan, explain what 401(PRO) would look like for your business, and answer your questions — no obligation.
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