import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const blogPosts = [
  {
    id: 1,
    title: "Trump Savings Accounts",
    excerpt: "The 2025 passage of the One Big Beautiful Bill Act introduced the Trump Account, a unique custodial investment tool designed to jumpstart savings for young Americans. For nearly three decades, families have relied on 529 plans...",
    author: "Manisha Gupta, CFP®, MBA",
    date: "April 1, 2026",
    category: "Saving",
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80"
  },
  {
    id: 2,
    title: "Accessing Your 2025 Tax Documents",
    excerpt: "Your 2025 tax forms are available for download from Charles Schwab. If you opted to receive your tax documents by mail, they should arrive soon. How to Access Your Tax Forms Online: Charles Schwab Client Portal...",
    author: "Sheila Schmitt",
    date: "March 13, 2026",
    category: "Tax Planning",
    image: "https://images.unsplash.com/photo-1554224311-beee415c15a9?w=800&q=80"
  },
  {
    id: 3,
    title: "Charitable Giving 101: A Beginner's Guide to Tax-Smart Donation Strategies",
    excerpt: "The holiday season is upon us, and with that often comes a desire to give back. Whether through volunteering your time, sharing your expertise, or donating resources like clothing, food, and money...",
    author: "Nikki Yates, CFP®",
    date: "December 9, 2025",
    category: "Charity",
    image: "https://images.unsplash.com/photo-1532635255-8a8bcae9c73c?w=800&q=80"
  },
  {
    id: 4,
    title: "How Portfolio Rebalancing and Tax-Loss Harvesting Help Austin Wealth Management Improve Client Outcomes",
    excerpt: "Behind every AWM advisor is a dedicated team of investment professionals meticulously looking at each client account and watching for opportunities to improve our clients investment performance...",
    author: "Parker Manson",
    date: "December 6, 2025",
    category: "Investing",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
  },
  {
    id: 5,
    title: "New 2026 IRS Limits: Bigger Breaks, Bigger Planning Opportunities",
    excerpt: "The IRS and Social Security Administration have released key numbers for 2026, including new federal income tax brackets, a higher standard deduction, bigger retirement and HSA contribution limits...",
    author: "Manisha Gupta, CFP®, MBA",
    date: "December 5, 2025",
    category: "Tax Planning",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
  },
  {
    id: 6,
    title: "Final Countdown: Your Year-End Contribution and Transaction Deadlines",
    excerpt: "December is a good time to review deadlines for contributions, distributions, charitable giving, and account updates. Many account actions must be completed before December 31...",
    author: "Sheila Schmitt",
    date: "December 1, 2025",
    category: "Tax Planning",
    image: "https://images.unsplash.com/photo-1606857521620-cfb367c3b0d5?w=800&q=80"
  }
];

const categories = ["All", "Saving", "Tax Planning", "Charity", "Investing", "Retirement"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Financial Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Our Blog
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Expert insights and practical advice on financial planning, investing, taxes, and wealth management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.05}>
                <div className="h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-amber-600 bg-amber-50 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-slate-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-2 transition-colors">
                      Read More
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900">
              Want personalized financial advice?
            </h2>
            <p className="mt-4 text-slate-600">
              Schedule a consultation with one of our financial advisors to discuss your unique situation.
            </p>
            <div className="mt-8">
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}