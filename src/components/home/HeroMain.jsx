import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [active, setActive] = useState(null);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/70 via-red-900/60 to-orange-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/15 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Top headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight drop-shadow-lg">
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
          <p className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-lg">
            Make financial decisions that make sense to <strong className="font-semibold">you</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 text-amber-400 text-base font-medium flex-wrap drop-shadow-md">
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">High-Income Households</Link>
            <span className="text-slate-500">|</span>
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">Business Owners</Link>
            <span className="text-slate-500">|</span>
            <Link to={createPageUrl('Planning')} className="hover:text-amber-300 transition-colors">Retirees</Link>
          </div>
        </motion.div>

        {/* Two CTA Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* Card 1: Life Event */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              onClick={() => setActive(active === 'life' ? null : 'life')}
              className={`text-left rounded-2xl p-6 border transition-all duration-300 ${
                active === 'life'
                  ? 'bg-white/20 border-amber-400/60 shadow-lg shadow-amber-500/10'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white leading-snug">
                  I have an important life decision and need help now.
                </h3>
                <span className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                  active === 'life' ? 'bg-amber-400 border-amber-400' : 'border-white/40'
                }`} />
              </div>
              <p className="text-slate-300 text-sm mt-2">Job changes, inheritance, retirement, major purchases &amp; more.</p>
            </motion.button>

            {/* Card 2: Big Picture */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              onClick={() => setActive(active === 'big' ? null : 'big')}
              className={`text-left rounded-2xl p-6 border transition-all duration-300 ${
                active === 'big'
                  ? 'bg-white/20 border-amber-400/60 shadow-lg shadow-amber-500/10'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white leading-snug">
                  I want a big picture financial plan for my future.
                </h3>
                <span className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                  active === 'big' ? 'bg-amber-400 border-amber-400' : 'border-white/40'
                }`} />
              </div>
              <p className="text-slate-300 text-sm mt-2">Tax planning, retirement, investments, business exit &amp; more.</p>
            </motion.button>
          </div>

          {/* Expanded detail panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mb-6">
                  {(active === 'life' ? lifeEventItems : bigPictureItems).map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-200 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  to={createPageUrl(active === 'life' ? 'LifeEventForm' : 'BigPicturePlanningForm')}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className={`rounded-full py-3 px-8 font-semibold flex items-center gap-2 transition-colors ${
                    active === 'life'
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-white/15 hover:bg-white/25 border border-white/30 text-white'
                  }`}>
                    {active === 'life' ? 'I want a plan for a life event' : 'I want to plan ahead'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
        </section>
  );
}