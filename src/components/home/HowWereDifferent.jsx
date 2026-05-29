import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const differentiators = [
  {
    title: 'No sales pressure.',
    desc: 'There is no sales pitch, no obligation to invest or buy insurance. Our business is advice.',
  },
  {
    title: 'We start with a plan.',
    desc: "We don't start by moving your money. We start with a comprehensive plan.",
  },
  {
    title: 'You receive advice on ALL areas of personal finance.',
    desc: 'Instead of only advising you about insurance and investment products, we advise on important subjects overlooked by our industry — cash flow planning, debt strategy, and liquidity management.',
  },
  {
    title: 'You will see the results of your work.',
    desc: 'Advice without action is not very helpful. We follow up until changes are done correctly.',
  },
  {
    title: 'You receive proactive tax advice.',
    desc: 'Proactive tax advice is the only way to ensure tax-saving changes take place in time to be effective. We engage in tax strategy throughout the year with our clients.',
  },
  {
    title: 'Risk management is more than just insurance.',
    desc: "Avoiding risk requires more than an insurance policy. We work with you to answer the question 'What could go wrong?'",
  },
  {
    title: 'Your estate plan is more than a Will.',
    desc: 'We simplify the concepts that traditional firms present as complex and only meant for elite investors.',
  },
  {
    title: 'You have multiple ways to invest.',
    desc: 'We offer a range of investing styles because there is not one correct way to invest. Our investment portfolios fit different types of investors, from very traditional to maximally diversified.',
  },
  {
    title: 'Our fees are customized to your situation.',
    desc: 'Our fee schedule is flexible to adapt to the type of service you actually need.',
  },
  {
    title: 'When you hire us, you hire a team.',
    desc: 'We build a team around every client. This means our service does not depend on the availability and effectiveness of one individual.',
  },
];

export default function HowWereDifferent() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">How We're Different</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900">
            What sets us <span className="font-semibold">apart</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}