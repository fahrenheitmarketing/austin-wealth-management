import React from 'react';
import { GraduationCap, HeartHandshake, Target, Settings, RefreshCw } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const values = [
  {
    icon: HeartHandshake,
    title: "Advocacy",
    subtitle: "We pursue your interests",
    description: "When it comes to your finances, you deserve someone who steps into your shoes, assesses your overall financial health, and makes recommendations in your best interests.",
    color: "amber"
  },
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "No sales pitch, just education",
    description: "You don't need a PhD, but a 101 will make you more independent and more likely to succeed. We use illustrations and analogies to make complex concepts easier to grasp.",
    color: "amber"
  },
  {
    icon: Settings,
    title: "Systems",
    subtitle: "We coordinate practical strategies",
    description: "We build organized, practical systems that coordinate your cash flow, investments, taxes, and insurance — so every piece of your financial life works together.",
    color: "amber"
  },
  {
    icon: Target,
    title: "Accountability",
    subtitle: "Accountability leads to progress",
    description: "Both advisor and client should be accountable to executing the strategy. Accountability is the glue that keeps you on track toward your most important financial objectives.",
    color: "amber"
  },
  {
    icon: RefreshCw,
    title: "Adaptation",
    subtitle: "We integrate new information",
    description: "Life changes, markets shift, and laws evolve. We continuously review your plan and adapt our recommendations as new information emerges — so your strategy always fits your reality.",
    color: "amber"
  }
];

export default function CoreValues() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-20">
          <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
            Our Philosophy
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Built on Five Pillars
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <div className="group h-full">
                <div className="relative h-full p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${
                    value.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                    value.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-sky-100 text-sky-600'
                  }`}>
                    <value.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-medium text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">
                    {value.subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}