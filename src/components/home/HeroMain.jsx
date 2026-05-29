import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const lifeEventItems = [
  'Job change',
  'Retiring soon',
  'Bonus or company stock',
  'Selling, buying or starting a business',
  'Ready to remodel',
  'Inheritance',
  'New baby',
  'Buying a home or rental',
  'Death in the family',
  'Divorce',
];

const bigPictureItems = [
  'Reduce my tax bill',
  'Get organized',
  'Know how much to save and spend',
  'Plan for retirement or retire early',
  'Set my kids up for success',
  'Solve "lumpy" cash flow',
  'Business exit planning',
  'Protect my wealth',
  'Know my loved ones will be OK',
  'Too much in one investment',
  'Plan for economic uncertainty',
];

export default function HeroMain() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Top headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            All of the financial options,<br />
            <span className="font-semibold">without the pressure.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center mb-4"
        >
          <p className="text-xl md:text-2xl text-slate-200 font-light">
            Make financial decisions that make sense to <strong className="font-semibold">you</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 text-amber-400 text-base font-medium flex-wrap">
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">High-Income Households</Link>
            <span className="text-slate-500">|</span>
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">Business Owners</Link>
            <span className="text-slate-500">|</span>
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">Retirees</Link>
          </div>
        </motion.div>

        {/* Two CTA Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Life Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-white mb-5 leading-snug">
              I have an important life decision and need help now.
            </h3>
            <ul className="space-y-1.5 mb-8 flex-1">
              {lifeEventItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={createPageUrl('LifeEventForm')}>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full py-3 px-6 flex items-center justify-center gap-2 transition-colors">
                I want a plan for a life event
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>

          {/* Card 2: Big Picture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-white mb-5 leading-snug">
              I want a big picture financial plan for my future.
            </h3>
            <ul className="space-y-1.5 mb-8 flex-1">
              {bigPictureItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={createPageUrl('BigPicturePlanningForm')}>
              <button className="w-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-full py-3 px-6 flex items-center justify-center gap-2 transition-colors">
                I want to plan ahead
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}