import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Lead Advisor', color: 'bg-teal-700', size: 'w-20 h-20', top: '10%', left: '35%' },
];

const bubbles = [
  { label: 'Lead Advisor', size: 'w-20 h-20', bg: 'bg-teal-700', delay: 0 },
  { label: 'Planner', size: 'w-16 h-16', bg: 'bg-teal-600', delay: 0.1 },
  { label: 'Admin Team', size: 'w-14 h-14', bg: 'bg-teal-500', delay: 0.2 },
  { label: 'Investing Team', size: 'w-14 h-14', bg: 'bg-blue-700', delay: 0.3 },
  { label: 'You', size: 'w-20 h-20', bg: 'bg-amber-500', delay: 0.4 },
];

export default function TeamIntroSection() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-6">Our Team</p>
            <p className="text-slate-400 text-lg mb-4">We are more than a combination of industry titles:</p>
            <p className="text-slate-300 text-base mb-2">Financial / Money / Investment / Wealth</p>
            <p className="text-slate-300 text-base mb-2">+</p>
            <p className="text-slate-300 text-base mb-8">Planner / Manager / Advisor / Consultant</p>
            
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 leading-snug">
              We are a team of professional educators, advocates and guides at the center of your financial world.
            </h2>

            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-6">Our Team of Financial Experts</p>
              <p className="text-slate-300 text-lg mb-2">
                Our process has been fine tuned over 15 years to consistently identify the most impactful financial decisions. We call these <strong className="text-white">'Aha' moments.</strong>
              </p>
            </div>

            <Link to={createPageUrl('Team')}>
              <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full py-3 px-8 flex items-center gap-2 transition-colors">
                Meet the Team
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>

          {/* Right: Team bubbles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* YOU column */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">YOU</p>
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center">
                  <Users className="h-8 w-8 text-amber-400" />
                </div>
              </div>

              {/* YOUR AWM TEAM */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase text-center">YOUR AWM TEAM</p>
                <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold text-center leading-tight">Lead<br/>Advisor</span>
                </div>
                <div className="w-18 h-18 rounded-full bg-teal-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Planner</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold text-center leading-tight">Admin</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold text-center leading-tight">Invest</span>
                  </div>
                </div>
              </div>

              {/* OTHER PROFESSIONALS */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase text-center">OTHER PROFESSIONALS</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Banker', 'Accountant', 'Insurance', 'Estate Lawyer'].map((pro) => (
                    <div key={pro} className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center p-2">
                      <span className="text-slate-300 text-xs font-medium text-center leading-tight">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}