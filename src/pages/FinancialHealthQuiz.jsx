import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, ClipboardList } from 'lucide-react';

const questions = [
  {
    category: 'Tax Planning',
    question: 'Do you actively work with a tax advisor to identify tax-saving strategies each year?',
    options: ['Yes, we meet regularly and plan proactively', 'Sometimes, mostly just at tax time', 'No, I just file and pay what I owe'],
    scores: [3, 1, 0],
  },
  {
    category: 'Tax Planning',
    question: 'Are you maximizing tax-advantaged accounts (401k, HSA, IRA, etc.)?',
    options: ['Yes, I max out the ones available to me', 'I contribute some but not the maximum', 'No, I am not sure what the limits are'],
    scores: [3, 1, 0],
  },
  {
    category: 'Retirement',
    question: 'Do you have a clear target retirement date and know how much you need saved?',
    options: ['Yes, I have a specific plan with a number', 'I have a rough idea but no concrete plan', 'No, I have not thought about it in detail'],
    scores: [3, 1, 0],
  },
  {
    category: 'Retirement',
    question: 'Are you on track to replace at least 70-80% of your current income in retirement?',
    options: ['Yes, I have modeled it and I am on track', 'I think so, but I have not verified', 'No, or I am not sure'],
    scores: [3, 1, 0],
  },
  {
    category: 'Investments',
    question: 'Is your investment portfolio aligned with your risk tolerance and time horizon?',
    options: ['Yes, it has been professionally reviewed recently', 'Somewhat, but it has not been reviewed in a while', 'I am not sure how my money is invested'],
    scores: [3, 1, 0],
  },
  {
    category: 'Investments',
    question: 'Do you have a plan to avoid panic-selling during market downturns?',
    options: ['Yes, I have a strategy and stick to it', 'I try to stay calm but it is hard', 'No, market drops make me very anxious'],
    scores: [3, 1, 0],
  },
  {
    category: 'Cash Flow',
    question: 'Do you know how much you spend each month and have a budget or spending plan?',
    options: ['Yes, I track it closely', 'Roughly, but not in detail', 'No, money just comes and goes'],
    scores: [3, 1, 0],
  },
  {
    category: 'Cash Flow',
    question: 'Do you have 3-6 months of expenses saved as an emergency fund?',
    options: ['Yes, it is fully funded', 'I have some savings but not quite that much', 'No, an emergency would be a serious problem'],
    scores: [3, 1, 0],
  },
  {
    category: 'Estate',
    question: 'Do you have an up-to-date will, power of attorney, and healthcare directive?',
    options: ['Yes, all documents are current', 'I have some documents but they may be outdated', 'No, I have not set up any estate documents'],
    scores: [3, 1, 0],
  },
  {
    category: 'Estate',
    question: 'Have you reviewed beneficiary designations on your accounts and insurance policies recently?',
    options: ['Yes, within the last 1-2 years', 'Not recently, it has been a while', 'No, I have never reviewed them'],
    scores: [3, 1, 0],
  },
  {
    category: 'Insurance',
    question: 'Do you have adequate life insurance to protect your family if something happened to you?',
    options: ['Yes, I have calculated the need and I am covered', 'I have some insurance but I am not sure it is enough', 'No, or I have no life insurance'],
    scores: [3, 1, 0],
  },
  {
    category: 'Insurance',
    question: 'Are you protected against a long-term disability that could prevent you from working?',
    options: ['Yes, I have long-term disability coverage', 'I have some coverage through work but have not reviewed it', 'No, I have no disability coverage'],
    scores: [3, 1, 0],
  },
];

const MAX_SCORE = questions.length * 3;

const categoryColors = {
  'Tax Planning': 'bg-amber-100 text-amber-700',
  'Retirement': 'bg-teal-100 text-teal-700',
  'Investments': 'bg-blue-100 text-blue-700',
  'Cash Flow': 'bg-green-100 text-green-700',
  'Estate': 'bg-purple-100 text-purple-700',
  'Insurance': 'bg-rose-100 text-rose-700',
};

function getResult(pct) {
  if (pct >= 85) return {
    label: 'Excellent Shape',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
    bar: 'bg-teal-500',
    message: 'Your financial foundation is strong. A financial advisor can help you optimize and protect what you have built.',
  };
  if (pct >= 60) return {
    label: 'On the Right Track',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    bar: 'bg-amber-500',
    message: 'You have made solid progress, but there are meaningful gaps worth addressing. A personalized plan can get you to the next level.',
  };
  return {
    label: 'Room to Grow',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    bar: 'bg-rose-400',
    message: 'Do not worry — most people are in a similar position. The good news is that small, smart steps can make a big difference quickly.',
  };
}

function getCategoryScores(answers) {
  const cats = {};
  questions.forEach((q, i) => {
    if (!cats[q.category]) cats[q.category] = { total: 0, max: 0 };
    cats[q.category].total += answers[i] ?? 0;
    cats[q.category].max += 3;
  });
  return cats;
}

export default function FinancialHealthQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const question = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    const newAnswers = { ...answers, [current]: questions[current].scores[selected] };
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
    }
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const pct = Math.round((totalScore / MAX_SCORE) * 100);
  const result = getResult(pct);
  const catScores = getCategoryScores(answers);

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border-2 p-8 mb-8 ${result.bg}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className={`h-6 w-6 ${result.color}`} />
              <span className={`font-semibold text-lg ${result.color}`}>{result.label}</span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className={`text-6xl font-bold ${result.color}`}>{pct}%</span>
              <span className="text-slate-500 mb-2 text-sm">Financial Health Score</span>
            </div>
            <div className="w-full h-3 bg-white/70 rounded-full mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-3 rounded-full ${result.bar}`}
              />
            </div>
            <p className="text-slate-700">{result.message}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 mb-8"
          >
            <h3 className="font-semibold text-slate-900 mb-4">Score by Category</h3>
            <div className="space-y-4">
              {Object.entries(catScores).map(([cat, { total, max }]) => {
                const catPct = Math.round((total / max) * 100);
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[cat]}`}>{cat}</span>
                      <span className="text-sm font-semibold text-slate-700">{catPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${catPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        className="h-2 rounded-full bg-teal-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 rounded-2xl p-8 text-center"
          >
            <h3 className="text-white font-semibold text-xl mb-2">Ready to close the gaps?</h3>
            <p className="text-slate-400 mb-6">Schedule a free, no-pressure conversation with our team to build a personalized plan.</p>
            <Link to={createPageUrl('Contact')}>
              <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full py-3 px-8 transition-colors inline-flex items-center gap-2">
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-xl bg-teal-700 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-widest text-teal-700 uppercase">Financial Health Quiz</span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500">Question {current + 1} of {questions.length}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[question.category]}`}>{question.category}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-2 bg-teal-500 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 leading-snug">
              {question.question}
            </h2>

            <div className="space-y-3 mb-8">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-sm flex items-start gap-3 ${
                    selected === i
                      ? 'border-teal-500 bg-teal-50 text-teal-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full border-2 transition-all ${
                    selected === i ? 'border-teal-500 bg-teal-500' : 'border-slate-300'
                  }`} />
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="bg-teal-700 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-full py-2.5 px-7 transition-colors flex items-center gap-2"
          >
            {current + 1 === questions.length ? 'See My Results' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}