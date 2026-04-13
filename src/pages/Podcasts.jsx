import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, Music } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const podcastPlatforms = [
  {
    name: "Apple Podcasts",
    icon: "🎙️",
    description: "Listen and subscribe on Apple Podcasts",
    url: "#"
  },
  {
    name: "Spotify",
    icon: "🎵",
    description: "Stream on Spotify",
    url: "#"
  },
  {
    name: "Google Podcasts",
    icon: "🎧",
    description: "Subscribe on Google Podcasts",
    url: "#"
  }
];

const podcastEpisodes = [
  {
    number: 1,
    title: "Introduction to Financial Planning",
    description: "Learn the fundamentals of creating a comprehensive financial plan that works for your unique situation.",
    duration: "45 min"
  },
  {
    number: 2,
    title: "Investing 101: Building Your Portfolio",
    description: "A beginner's guide to understanding stocks, bonds, and creating a diversified investment strategy.",
    duration: "52 min"
  },
  {
    number: 3,
    title: "Tax Strategies for High Earners",
    description: "Practical tax planning strategies to minimize your tax burden and increase wealth accumulation.",
    duration: "48 min"
  },
  {
    number: 4,
    title: "Retirement Planning & Social Security",
    description: "When and how to take Social Security, and strategies for optimizing your retirement income.",
    duration: "50 min"
  },
  {
    number: 5,
    title: "Estate Planning Essentials",
    description: "Protect your family's future with proper wills, trusts, and estate planning documents.",
    duration: "46 min"
  },
  {
    number: 6,
    title: "College Savings & 529 Plans",
    description: "Understanding 529 plans, Trump Savings Accounts, and other tools for education funding.",
    duration: "44 min"
  }
];

export default function Podcasts() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/02b97060a_generated_image.png" 
          alt="Podcasts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Audio Series
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Financial Insights Podcast
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Listen to expert interviews and practical financial advice from our team. Subscribe to never miss an episode.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Podcast Platforms */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-900 mb-4">Subscribe Now</h2>
            <p className="text-slate-600 mb-12">Listen on your favorite platform</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {podcastPlatforms.map((platform, index) => (
              <AnimatedSection key={platform.name} delay={index * 0.1}>
                <a 
                  href={platform.url}
                  className="group p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 text-center"
                >
                  <div className="text-5xl mb-4">{platform.icon}</div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6">{platform.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:border-amber-600 group-hover:text-amber-600"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-light text-slate-900">Latest Episodes</h2>
            <p className="text-slate-600 mt-2">New episodes available on all major podcast platforms</p>
          </AnimatedSection>

          <div className="space-y-4">
            {podcastEpisodes.map((episode, index) => (
              <AnimatedSection key={episode.number} delay={index * 0.05}>
                <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center flex-shrink-0 text-white font-medium group-hover:from-amber-500 group-hover:to-amber-600 transition-all">
                        <Headphones className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          <span className="text-xs font-medium text-amber-600">EPISODE {episode.number}</span>
                          <span className="text-xs text-slate-500">{episode.duration}</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {episode.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {episode.description}
                        </p>
                      </div>
                    </div>

                    <button className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-amber-600 hover:bg-amber-50 flex items-center justify-center transition-all group-hover:shadow-md mt-1">
                      <Music className="h-5 w-5 text-slate-600 group-hover:text-amber-600 transition-colors" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12">
              <h2 className="text-3xl font-light text-slate-900 mb-6">About Our Podcast</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The Financial Insights Podcast features in-depth conversations with our team of certified financial planners, investment professionals, and guest experts. We explore the topics that matter most to your financial well-being.
                </p>
                <p>
                  Each episode breaks down complex financial concepts into practical, actionable advice. Whether you're just starting your financial journey or optimizing a complex situation, our podcast provides the education and insights you need to make confident decisions.
                </p>
                <p>
                  New episodes are released regularly. Subscribe now to get notified when new content is available on your favorite podcast platform.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}