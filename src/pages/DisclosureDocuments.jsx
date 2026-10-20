import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DisclosureDocumentItem from '@/components/legal/DisclosureDocumentItem';

const HERO_IMAGE = 'https://media.base44.com/images/public/6960325a10892c1a1fc0a802/e14f74264_generated_image.png';
const CANONICAL_URL = 'https://www.austinwealthmgmt.com/disclosure-documents';

const documents = [
  {
    id: 'adv-part-2ab',
    title: 'ADV Part 2AB',
    description:
      'A Securities Exchange Commission (SEC) required brochure disclosing information about our firm. It contains material changes to the firm in the last year, services we provide, fees for those services, affiliations and possible conflicts of interest, and more. It also contains supplements with information about each licensed advisor.',
    href: 'https://adviserinfo.sec.gov/',
    linkLabel: 'Download PDF',
  },
  {
    id: 'adv-part-3',
    title: 'ADV Part 3',
    description:
      "A Securities Exchange Commission (SEC) required brochure describing the firm's retail client relationships in summary form.",
    href: 'https://adviserinfo.sec.gov/',
    linkLabel: 'Download PDF',
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      "Describes the firm's policies for handling nonpublic personal information collected from clients.",
    href: '/privacy-policy',
    linkLabel: 'Download PDF',
  },
];

export default function DisclosureDocuments() {
  const pageDescription =
    'SEC-required disclosure documents for Austin Wealth Management, LLC: Form ADV Part 2AB, Form ADV Part 3, and our privacy policy.';

  return (
    <main className="bg-white">
      <Helmet>
        <title>Disclosure Documents | Austin Wealth Management</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content="Disclosure Documents | Austin Wealth Management" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disclosure Documents | Austin Wealth Management" />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" },
            { "@type": "ListItem", "position": 2, "name": "Disclosure Documents", "item": CANONICAL_URL }
          ]
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-slate-950">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Disclosure Documents
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-white" aria-label="Disclosure documents">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="space-y-12">
              {documents.map((doc) => (
                <div key={doc.id}>
                  <DisclosureDocumentItem {...doc} />
                  <div className="mt-10 border-b border-slate-100" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}