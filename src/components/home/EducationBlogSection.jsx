import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    title: 'Understanding RSUs: What You Need to Know Before Your Vesting Date',
    category: 'Tax Planning',
    date: 'May 2025',
    excerpt: "RSU taxation catches many high-earners off guard. Here's how to plan ahead and minimize your tax burden.",
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
  {
    title: 'How Much Should I Have Saved by 40? A Realistic Framework',
    category: 'Retirement',
    date: 'April 2025',
    excerpt: 'Benchmarks are helpful, but your personal number depends on your lifestyle, goals, and timeline.',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  },
  {
    title: 'The Difference Between a Financial Plan and Investment Management',
    category: 'Planning',
    date: 'March 2025',
    excerpt: 'Many people confuse the two but knowing the difference could save you thousands.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
];

const logos = [
  'Longhorn 100',
  'Financial Planning Association',
  'Financial Education',
  'NAPFA',
  'CFP Board',
];

export default function EducationBlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 items-start mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-amber-500" />
              <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Education and Insights</span>
            </div>
            <h2 className="text-4xl font-light text-slate-900 leading-snug">
              You can't make the right financial decisions{' '}
              <span className="font-semibold">without the right information.</span>
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-slate-600 text-lg leading-relaxed">
              How much better would you feel about your financial situation if you had a better handle on the core concepts behind investing, budgeting, insurance, debt and taxes? You don't need a PhD, but a 101 will make you more independent and more likely to succeed.
            </p>
          </div>
        </motion.div>

        {/* Blog posts */}
        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-8">The Latest Insights from Our Financial Experts:</p>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={createPageUrl('Blog')} className="group block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">{post.category}</span>
                  <h3 className="text-slate-900 font-semibold mt-2 mb-2 leading-snug group-hover:text-amber-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-20">
          <Link to={createPageUrl('Blog')}>
            <button className="border border-slate-300 hover:border-amber-400 text-slate-700 hover:text-amber-600 font-medium rounded-full py-3 px-8 transition-colors inline-flex items-center gap-2">
              View All Articles <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* As Seen In */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-8">As Seen In</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo) => (
              <div key={logo} className="px-6 py-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium text-sm">{logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}