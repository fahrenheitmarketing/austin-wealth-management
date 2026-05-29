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
        <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
          {/* Card 1: Life Event */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, flex: active === 'big' ? '0 0 auto' : active === 'life' ? '1 1 0%' : '1 1 0%' }}
            transition={{ duration: 0.5, delay: active ? 0 : 0.35 }}
            style={{ flex: active === 'big' ? '0 0 220px' : '1 1 0%', minWidth: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col transition-all duration-500 cursor-pointer"
            onClick={() => active !== 'life' && setActive('life')}
          >
            <h3 className={`font-semibold text-white leading-snug transition-all duration-300 ${active === 'big' ? 'text-base mb-0' : 'text-xl mb-4'}`}>
              I have a decision to make. I need help.
            </h3>

            <AnimatePresence>
              {active === 'big' && (
                <motion.div
                  key="big-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6 mt-2">
                    {bigPictureItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-300 text-sm list-none">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </div>
                  <Link to={createPageUrl('BigPicturePlanningForm')} onClick={(e) => e.stopPropagation()}>
                    <button className="w-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-full py-3 px-6 flex items-center justify-center gap-2 transition-colors">
                      I want to plan ahead
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {active !== 'big' && (
              <button
                className="mt-4 self-start bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-full py-2 px-5 text-sm transition-colors"
                onClick={(e) => { e.stopPropagation(); setActive('big'); }}
              >
                This Is Me
              </button>
            )}
          </motion.div>
          </div>
      </div>
    </section>
  );
}