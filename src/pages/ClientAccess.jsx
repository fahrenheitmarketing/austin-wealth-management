import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const portals = [
  {
    name: "eMoney",
    description: "Access your comprehensive financial plan, net worth summary, and budget tracking tools.",
    url: "https://wealth.emoneyadvisor.com"
  },
  {
    name: "Orion",
    description: "View your detailed investment performance reports, account statements, and tax documents.",
    url: "https://portal.orionadvisor.com/"
  },
  {
    name: "Schwab",
    description: "Direct access to your Schwab brokerage accounts, trade history, and account features.",
    url: "https://client.schwab.com/"
  },
  {
    name: "Fidelity",
    description: "Direct access to your Fidelity brokerage accounts, trade history, and account features.",
    url: "https://digital.fidelity.com/prgw/digital/signin/retail"
  }
];

export default function ClientAccess() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Client Access | Austin Wealth Management</title>
        <meta name="description" content="Log in directly to your financial accounts — eMoney, Orion, Schwab, and Fidelity — through the Austin Wealth Management client portal." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/client-access" />
        <meta property="og:title" content="Client Access | Austin Wealth Management" />
        <meta property="og:description" content="Log in directly to your financial accounts — eMoney, Orion, Schwab, and Fidelity — through the Austin Wealth Management client portal." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.austinwealthmgmt.com/client-access" />
        <meta property="og:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Access | Austin Wealth Management" />
        <meta name="twitter:description" content="Log in directly to your financial accounts — eMoney, Orion, Schwab, and Fidelity — through the Austin Wealth Management client portal." />
        <meta name="twitter:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" }, { "@type": "ListItem", "position": 2, "name": "Client Access", "item": "https://www.austinwealthmgmt.com/client-access" }] })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/82615d4ac_generated_image.png"
          alt="Client Access"
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
              Client Portal
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Client
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Access
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Log in directly to your accounts below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {portals.map((portal, index) => (
              <AnimatedSection key={portal.name} delay={index * 0.08}>
                <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col items-center text-center">
                  {/* Logo placeholder */}
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6">
                    <span className="text-slate-300 text-xs font-medium">Logo</span>
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{portal.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {portal.description}
                  </p>
                  <a href={portal.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-6 h-12 rounded-full"
                    >
                      Login Here
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}