import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the website of Austin Wealth Management, LLC ("AWM," "we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`
  },
  {
    title: "Not Investment Advice",
    content: `The information provided on this website is for general informational and educational purposes only. Nothing on this website should be construed as personalized investment advice, financial planning advice, tax advice, or legal advice.\n\nAll content is provided "as is" without warranty of any kind. Past performance is not indicative of future results. Investing involves risk, including the possible loss of principal.\n\nAustin Wealth Management, LLC is a Registered Investment Advisor (RIA). Investment advisory services are only provided to clients pursuant to a written investment advisory agreement.`
  },
  {
    title: "Use of the Website",
    content: `You agree to use this website only for lawful purposes. You are prohibited from:\n\n- Using this site in any way that violates applicable local, state, national, or international laws\n- Transmitting unsolicited or unauthorized advertising or promotional material\n- Attempting to gain unauthorized access to any portion of the website or its related systems\n- Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the website\n- Using the site to collect or harvest personally identifiable information`
  },
  {
    title: "Intellectual Property",
    content: `All content on this website — including but not limited to text, graphics, logos, images, and software — is the property of Austin Wealth Management, LLC or its content suppliers and is protected by applicable intellectual property laws.\n\nYou may not reproduce, distribute, modify, or create derivative works of any content on this website without our express written permission.`
  },
  {
    title: "Third-Party Links",
    content: `This website may contain links to third-party websites that are not owned or controlled by AWM. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.\n\nLinks to external sites do not constitute an endorsement of those sites or their content.`
  },
  {
    title: "Disclaimer of Warranties",
    content: `This website is provided on an "as is" and "as available" basis without any warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.\n\nAWM does not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components. We do not warrant the accuracy or completeness of any information on the website.`
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, Austin Wealth Management, LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content — even if we have been advised of the possibility of such damages.\n\nOur total liability to you for any claim arising from these Terms or your use of the website shall not exceed $100.`
  },
  {
    title: "Regulatory Disclosures",
    content: `Austin Wealth Management, LLC is registered as an Investment Adviser with the U.S. Securities and Exchange Commission (SEC). Registration does not imply a certain level of skill or training.\n\nAn up-to-date copy of AWM's Form ADV Part 2 (Firm Brochure) is available upon request or through the SEC's Investment Adviser Public Disclosure (IAPD) website at adviserinfo.sec.gov.`
  },
  {
    title: "Privacy",
    content: `Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy to understand our practices.`
  },
  {
    title: "Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Travis County, Texas.`
  },
  {
    title: "Changes to These Terms",
    content: `We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these Terms periodically.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us:\n\nAustin Wealth Management, LLC\nEmail: info@austinwealthmgmt.com\nAustin, Texas`
  }
];

export default function TermsOfService() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-slate-400 text-sm">Last Updated: June 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h2>
                  <div className="text-slate-600 leading-relaxed space-y-3">
                    {section.content.split('\n\n').map((para, i) => (
                      <p key={i} dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br/>')
                          .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
                      }} />
                    ))}
                  </div>
                  <div className="mt-6 border-b border-slate-100" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}