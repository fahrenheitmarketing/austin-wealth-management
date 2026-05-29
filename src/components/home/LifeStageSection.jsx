import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const chartData = [
  { age: '20', wealth: 2 },
  { age: '25', wealth: 8 },
  { age: '30', wealth: 18 },
  { age: '35', wealth: 32 },
  { age: '40', wealth: 52 },
  { age: '45', wealth: 74 },
  { age: '50', wealth: 96 },
  { age: '55', wealth: 118 },
  { age: '60', wealth: 140 },
  { age: '65', wealth: 155 },
  { age: '70', wealth: 140 },
  { age: '75', wealth: 122 },
  { age: '80', wealth: 100 },
];

const stages = [
  { label: 'EARLY CAREER', ages: '20–30', color: '#2563eb' },
  { label: 'LATER CAREER', ages: '35–60', color: '#1e40af' },
  { label: 'RETIREMENT', ages: '65+', color: '#1e3a8a' },
];

export default function LifeStageSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">
            Solutions Designed for Your Unique Stage in Life
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-6">
            Financial Planners based in Austin, Texas<br />
            <span className="font-semibold">serving clients everywhere.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Each stage of life and business has its own set of goals.<br />
            Your financial plan should be designed to meet them.
          </p>
        </motion.div>

        {/* Life Stage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <p className="text-center text-lg font-medium text-teal-700 mb-6">Which Life Stage Are You In?</p>
            
            <div className="flex gap-2 mb-2 justify-end">
              <span className="text-xs text-slate-500 italic">Wealth accumulation over time</span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e6ea0" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#1e6ea0" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="age" tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 12 }} />
                <YAxis hide />
                <ReferenceLine x="30" stroke="#94a3b8" strokeDasharray="4 4" />
                <ReferenceLine x="60" stroke="#94a3b8" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="wealth" stroke="#1e6ea0" fill="url(#wealthGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>

            {/* Stage Labels */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {stages.map((stage) => (
                <div key={stage.label} className="text-center bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Info className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">{stage.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">{stage.ages}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link to={createPageUrl('Contact')}>
            <Button className="bg-slate-900 hover:bg-slate-700 text-white rounded-full h-12 px-10 text-base font-medium">
              Let's Talk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}