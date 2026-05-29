import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

export default function FinancialHealthQuizSection() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-teal-700 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-widest text-teal-700 uppercase">Financial Health Quiz</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 leading-snug">
              Ever wonder how your finances stack up for your current stage of life?
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              In less than 3 minutes, you'll know exactly where you stand and{' '}
              <strong>how to begin.</strong>
            </p>
            <Link to={createPageUrl('Contact')}>
              <button className="bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-full py-3 px-8 transition-colors">
                Take the Financial Health Quiz
              </button>
            </Link>
          </div>

          <div className="flex-shrink-0 hidden md:block">
            <div className="grid grid-cols-2 gap-3 w-64">
              {['Tax Planning', 'Retirement', 'Investments', 'Estate', 'Cash Flow', 'Insurance'].map((topic) => (
                <div key={topic} className="bg-white rounded-xl px-4 py-3 text-center shadow-sm border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}