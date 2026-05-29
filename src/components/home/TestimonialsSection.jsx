import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Austin Wealth Management completely changed how I think about my financial future. They gave us a real plan — not a sales pitch.",
    author: "— Happy Client",
  },
  {
    quote: "For the first time, I actually understand where my money is going and why. The team is thoughtful, patient, and incredibly knowledgeable.",
    author: "— Happy Client",
  },
  {
    quote: "They helped us navigate a business sale and retirement transition seamlessly. We couldn't have done it without them.",
    author: "— Happy Client",
  },
  {
    quote: "No pressure, no jargon — just honest advice that actually makes a difference. I recommend AWM to everyone I know.",
    author: "— Happy Client",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">What Our Clients Say</p>
          <h2 className="text-4xl font-light text-slate-900">
            Real results, <span className="font-semibold">real people</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col"
            >
              <Quote className="h-6 w-6 text-amber-400 mb-4 flex-shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
              <p className="text-slate-500 text-sm font-medium mt-4">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}