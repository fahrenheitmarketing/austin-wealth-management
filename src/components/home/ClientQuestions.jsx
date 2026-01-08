import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const questions = [
  "Can I afford to retire? If so, when?",
  "How can I protect what I leave to my kids and grandkids?",
  "Can I afford a vacation home or to travel?",
  "We save into our 401(k), is that enough?",
  "It feels like we are paying a LOT in taxes.",
  "I don't trust the stock market. I don't know how to invest anymore.",
  "I want to switch careers or retire early – is that realistic?",
  "When should I take social security?",
  "Should we be considering long term care insurance?",
  "What can we realistically save for our kids' college expenses?"
];

const process = [
  { step: "01", title: "Create the Plan", description: "Organize everything and set clear goals" },
  { step: "02", title: "Take Action", description: "Implement changes and automate where possible" },
  { step: "03", title: "Ongoing Maintenance", description: "Regular reviews and adjustments" }
];

export default function ClientQuestions() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <AnimatedSection direction="left">
            <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
              Common Concerns
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Questions our clients ask
            </h2>
            
            <div className="mt-10 space-y-3">
              {questions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                  whileHover={{ x: activeIndex === index ? 0 : 4 }}
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight className={`h-4 w-4 transition-transform ${activeIndex === index ? 'rotate-90' : ''}`} />
                    <span className="text-sm">{question}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:sticky lg:top-32 self-start">
            <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800">
              <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
                Our Process
              </span>
              <h3 className="mt-4 text-2xl font-light text-white">
                The answers are found in our proven process
              </h3>
              
              <div className="mt-10 space-y-6">
                {process.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-400 font-medium text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}