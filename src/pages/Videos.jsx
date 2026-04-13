import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const videos = [
  {
    id: 1,
    title: "2024 Q2 Investor Update",
    description: "Quarterly market update and investment insights from our team.",
    youtubeId: "FzMxxEJEZzs",
    thumbnail: "https://img.youtube.com/vi/FzMxxEJEZzs/maxresdefault.jpg",
    year: "2024"
  },
  {
    id: 2,
    title: "401(k) Tax Credits",
    description: "Learn about available tax credits for retirement plan contributions.",
    youtubeId: "loduEyeVVHE",
    thumbnail: "https://img.youtube.com/vi/loduEyeVVHE/maxresdefault.jpg",
    year: "2024"
  },
  {
    id: 3,
    title: "Long-Term Disability Insurance",
    description: "Understanding the importance of disability insurance in your financial plan.",
    youtubeId: "Mfq_xFgBpcs",
    thumbnail: "https://img.youtube.com/vi/Mfq_xFgBpcs/maxresdefault.jpg",
    year: "2024"
  },
  {
    id: 4,
    title: "Exit Planning: Maximizing the Value of Your Business",
    description: "Five stages of value maturity for business owners planning an exit.",
    youtubeId: "29mXMNPPgzE",
    thumbnail: "https://img.youtube.com/vi/29mXMNPPgzE/maxresdefault.jpg",
    year: "2024"
  },
  {
    id: 5,
    title: "Basic Estate Planning Documents",
    description: "Essential documents every estate plan should include.",
    youtubeId: "3PLcfBs0-mc",
    thumbnail: "https://img.youtube.com/vi/3PLcfBs0-mc/maxresdefault.jpg",
    year: "2023"
  },
  {
    id: 6,
    title: "ESPP Taxation",
    description: "How to optimize your employee stock purchase plan for tax efficiency.",
    youtubeId: "YSKxJ5PdJvs",
    thumbnail: "https://img.youtube.com/vi/YSKxJ5PdJvs/maxresdefault.jpg",
    year: "2023"
  },
  {
    id: 7,
    title: "401(k) Loans and In-Service Withdrawals",
    description: "Understanding your options for accessing retirement plan funds.",
    youtubeId: "1wPu8cFkJ6c",
    thumbnail: "https://img.youtube.com/vi/1wPu8cFkJ6c/maxresdefault.jpg",
    year: "2023"
  },
  {
    id: 8,
    title: "Health Savings Accounts",
    description: "Maximize the benefits of HSAs as a retirement savings tool.",
    youtubeId: "VzJWrtgv9GQ",
    thumbnail: "https://img.youtube.com/vi/VzJWrtgv9GQ/maxresdefault.jpg",
    year: "2023"
  },
  {
    id: 9,
    title: "FDIC Coverage and Account Ownership Types",
    description: "Protecting your cash deposits with proper account structuring.",
    youtubeId: "O1J--3eFlas",
    thumbnail: "https://img.youtube.com/vi/O1J--3eFlas/maxresdefault.jpg",
    year: "2023"
  },
  {
    id: 10,
    title: "Restricted Stock Units",
    description: "Tax implications and strategies for managing RSU awards.",
    youtubeId: "rRYbcBTXxfc",
    thumbnail: "https://img.youtube.com/vi/rRYbcBTXxfc/maxresdefault.jpg",
    year: "2022"
  },
  {
    id: 11,
    title: "Business Exit Planning",
    description: "Comprehensive strategies for maximizing business sale proceeds.",
    youtubeId: "wwKWS7QcU8s",
    thumbnail: "https://img.youtube.com/vi/wwKWS7QcU8s/maxresdefault.jpg",
    year: "2022"
  },
  {
    id: 12,
    title: "ESPP Basics",
    description: "Getting started with employee stock purchase plans.",
    youtubeId: "WAgRgdNSKDA",
    thumbnail: "https://img.youtube.com/vi/WAgRgdNSKDA/maxresdefault.jpg",
    year: "2022"
  }
];

const years = ["All", "2024", "2023", "2022", "2020"];

export default function Videos() {
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = selectedYear === "All" 
    ? videos 
    : videos.filter(video => video.year === selectedYear);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/493decc48_generated_image.png" 
          alt="Video Library"
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
              Video Library
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              The Tradeoff
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Expert interviews and financial insights from our team. Subscribe to our YouTube channel for the latest updates.
            </p>
            <div className="mt-8">
              <a 
                href="https://www.youtube.com/channel/UCC3S6dFylho966j2pzRaobw" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-white hover:bg-slate-100 text-teal-700 font-medium">
                  Subscribe on YouTube
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Year Filter */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap gap-3 justify-center">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <AnimatedSection key={video.id} delay={index * 0.05}>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="group h-full text-left"
                >
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
                    {/* Video Thumbnail */}
                    <div className="aspect-video overflow-hidden bg-slate-800 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-all flex items-center justify-center">
                          <Play className="h-8 w-8 text-teal-600 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {video.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                        {video.description}
                      </p>

                      <span className="text-xs font-medium text-amber-400">
                        Watch Video →
                      </span>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-6 text-white">
              <h3 className="text-2xl font-medium mb-2">{selectedVideo.title}</h3>
              <p className="text-slate-400">{selectedVideo.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}