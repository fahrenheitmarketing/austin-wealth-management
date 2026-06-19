import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const sections = [
  {
    title: "Introduction",
    content: `Austin Wealth Management, LLC ("AWM," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.`
  },
  {
    title: "Information We Collect",
    content: `We may collect information about you in a variety of ways, including:\n\n**Personal Data:** Personally identifiable information, such as your name, email address, telephone number, and mailing address, that you voluntarily give to us when you contact us, complete a form, or request information about our services.\n\n**Financial Information:** Information you provide in connection with our financial planning and investment advisory services, including income, assets, liabilities, investment objectives, and other financial details necessary to provide our services.\n\n**Usage Data:** Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, referring URLs, and pages viewed.\n\n**Cookies and Tracking Technologies:** We may use cookies, web beacons, and similar technologies to enhance your experience on our website.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:\n\n- Provide, operate, and maintain our website and services\n- Respond to your inquiries and communicate with you\n- Deliver financial planning, investment advisory, and related services\n- Send you marketing and promotional communications (with your consent)\n- Comply with legal and regulatory obligations\n- Monitor and analyze usage and trends to improve our website\n- Protect against fraudulent or unauthorized activity`
  },
  {
    title: "Disclosure of Your Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:\n\n**Service Providers:** We may share your information with third-party vendors and service providers who perform services on our behalf, such as custodians, technology providers, and compliance services.\n\n**Legal Requirements:** We may disclose your information where required by law, regulation, or legal process, including requests from regulatory bodies such as the SEC or FINRA.\n\n**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity.\n\n**With Your Consent:** We may disclose your information for any other purpose with your explicit consent.`
  },
  {
    title: "Data Security",
    content: `We implement administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.`
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Client financial records may be retained for periods required by applicable securities laws and regulations.`
  },
  {
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal information:\n\n- The right to access and receive a copy of your personal data\n- The right to request correction of inaccurate information\n- The right to request deletion of your personal data (subject to legal retention requirements)\n- The right to opt out of marketing communications at any time\n\nTo exercise any of these rights, please contact us at the information provided below.`
  },
  {
    title: "Third-Party Websites",
    content: `Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policy of any site you visit.`
  },
  {
    title: "Children's Privacy",
    content: `Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently received personal information from a person under 18, we will delete such information from our records.`
  },
  {
    title: "Changes to This Policy",
    content: `We reserve the right to update this Privacy Policy at any time. We will notify you of material changes by updating the "Last Updated" date at the top of this page. Your continued use of our website after any changes constitutes your acceptance of the revised policy.`
  },
  {
    title: "Contact Us",
    content: `If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:\n\nAustin Wealth Management, LLC\nEmail: info@austinwealthmgmt.com\nAustin, Texas`
  }
];

export default function PrivacyPolicy() {
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
              Privacy Policy
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