import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';

const roles = {
  "senior-financial-advisor": {
    title: "Senior Financial Advisor",
    description: `We are always looking for the next great Financial Advisor to join our team. Our Advisors have clearly defined career paths, enjoy multiple sources of new clients, and work together as a team to constantly improve the quality of our services. We have a 'zero sales pressure' policy.`,
    sections: [
      {
        heading: "Job Requirements",
        items: [
          "5+ years experience financial consulting with individuals and families",
          "An established network of potential clients that could generate at least $10M AUM in the first 12 months",
          "Passionate about the power of effective planning and education",
          "Outstanding communication skills, both written and verbal"
        ]
      },
      {
        heading: "Nice-To-Haves",
        items: [
          "CFP® designation",
          "Niche market experience",
          "Texas-based: Austin, Houston, San Antonio, Dallas"
        ]
      },
      {
        heading: "Why Austin Wealth Management?",
        items: [
          "Financial planning is at the core of our client relationships",
          "We are entrepreneurial",
          "We are growing fast and adopting new technology rapidly",
          "Our clients are distributed across age ranges and regions",
          "Competitive base salaries with clearly defined salary ranges based on revenue managed",
          "Incentives for new business production",
          "Leadership opportunities for top performers",
          "Consistent sources of new client opportunities",
          "Team environment, cooperative planning, centralized investment management and client services",
          "Broad professional talent set: CPA, CFP®, CFA",
          "Flexible work locations"
        ]
      }
    ]
  },
  "financial-planner": {
    title: "Financial Planner",
    description: `We are currently seeking a Financial Planner to join our collaborative team. This is an excellent opportunity for someone looking to build a career in financial planning within a supportive and professional environment.\n\nAs a Financial Planner, you will play a critical supporting role in the financial planning process for new clients. Working closely with lead advisors and the financial planning team, you will assist in preparing and maintaining comprehensive financial plans, and ensuring a seamless client experience. This is a hybrid position that offers the flexibility to work remotely for part of the week.\n\nThis position is ideal for a motivated professional who takes pride in delivering exceptional work with high attention to detail. The ideal candidate thrives on setting a higher standard of excellence—continually refining their craft, embracing innovative planning strategies, and demonstrating a deep commitment to helping clients achieve their goals.`,
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Gather, organize and maintain client financial information, using our financial planning software and CRM.",
          "Develop and present comprehensive financial plans to clients in alignment with AWM standard, including: liquidity management, cash flow planning, risk management, tax strategy, investment strategy, estate planning, and business exit planning.",
          "Support advisors in client meetings by scheduling meetings, taking notes, and preparing materials. Following client meetings, provide support by documenting and completing tasks.",
          "Provide ongoing support to Advisors and Clients by responding to service requests as needed and by monitoring client planning milestones. Proactively update the client's financial plans as needed.",
          "Collaborate with the investment and operations teams to gather necessary details and keep clients and advisors informed.",
          "Research and maintain updated information on regulatory changes.",
          "Contribute to the overall quality and efficiency of service at AWM by providing suggestions for improvement and greater efficiency throughout workflows.",
          "Support special projects as needed."
        ]
      },
      {
        heading: "Required Qualifications",
        items: [
          "Bachelor's degree in Financial Planning, Finance, Accounting, or related field.",
          "3+ years of experience in a financial planning associate or financial planning role with at least 1 year of experience in a client facing role.",
          "Progress toward the CFP® certification.",
          "In-depth knowledge of financial planning software (e.g., eMoney, MoneyGuidePro, RightCapital) and CRM systems (e.g., Redtail, Salesforce).",
          "Working knowledge of Google Sheets and Google Docs.",
          "Demonstrated strong analytical skills and attention to detail.",
          "Excellent communication skills with emphasis on clarity.",
          "Ability to manage multiple tasks and deadlines in a fast-paced environment.",
          "Ability to work independently and in collaboration with team members."
        ]
      },
      {
        heading: "Preferred Qualifications",
        items: [
          "Experience working with business owners.",
          "Experience using Asana.",
          "5+ years of experience in a financial planning role with at least 3+ years in a client facing role.",
          "Completion of the CFP® certification."
        ]
      },
      {
        heading: "Career Path",
        text: "This role offers substantial opportunities for professional growth and career advancement. High-performing team members will have various pathways to progress their careers. Financial Planners can advance into elevated financial planning support roles (Senior Financial Planner, Financial Planning Manager) or develop into lead client roles (Financial Advisor, Senior Financial Advisor)."
      },
      {
        heading: "What We Offer",
        items: [
          "Competitive salary based on experience and qualifications",
          "Ongoing support for professional development and CFP® certification",
          "Collaborative, team-oriented culture",
          "Health benefits and retirement plan options",
          "A modern, centrally located office in Austin, TX with amenities including garage parking and an office gym"
        ]
      }
    ]
  }
};

export default function CareerDetail() {
  const { slug } = useParams();
  const role = roles[slug];

  if (!role) return <Navigate to="/Careers" replace />;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative py-28 bg-slate-950 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8e78a0887_image.png"
          alt="Austin Skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Open Position
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              {role.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <Link to="/Careers" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors mb-10">
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Link>

            <h2 className="text-2xl font-medium text-slate-900 mb-6">Job Description: {role.title}</h2>

            {role.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p>
            ))}

            <div className="mt-10 space-y-10">
              {role.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    {section.heading}
                  </h3>
                  {section.text ? (
                    <p className="text-slate-600 leading-relaxed">{section.text}</p>
                  ) : (
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Apply CTA */}
            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center">
              <h3 className="text-xl font-medium text-slate-900 mb-2">Apply Today</h3>
              <p className="text-slate-500 mb-6">
                Send your resume and cover letter to us and we'll be in touch.
              </p>
              <a href="mailto:careers@austinwealthmgmt.com">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 h-12 rounded-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  careers@austinwealthmgmt.com
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}