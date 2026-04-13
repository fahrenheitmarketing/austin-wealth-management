import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';
import TeamMemberModal from '@/components/team/TeamMemberModal';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
  { name: "Kevin X. Smith", title: "CFA", initials: "KS", photo: "https://austinwealthmgmt.com/wp-content/uploads/2020/08/AWM_Bio_Headshot_KSmith-267x300.jpg", role: "Managing Partner", quote: "Most complex investment concepts do not stand up to academic scrutiny and the test of time. Here is some great news: simple strategies have been, and likely will continue to be, very effective.", bio: "Kevin is responsible for advising clients for whom he is the lead financial advisor. He also manages the operations and development of the firm, and oversees all of the investments of Austin Wealth Management clients.\n\nKevin is on a mission to explain complex financial concepts in simple demonstrations and deliver practical advice that works for people in their daily lives. He uses a combination of economics and psychology to help clients understand and deal with the trade-offs of important financial decisions.\n\nKevin was raised in a handful of mid-western towns, finally landing in Dallas before moving to Austin where he earned a degree in Finance at the University of Texas. He left his consulting career to start Austin Wealth Management, delivering practical advice rather than focusing on product sales.\n\nKevin's wife, Julie, is a scientist and administrator at the University of Texas. They have three children, Zoe, Jack, and Isabel, and a Labrador Retriever named Lizzy." },
  { name: "Derek Ripp", title: "CFP®, CEPA", initials: "DR", photo: "https://austinwealthmgmt.com/wp-content/uploads/2021/05/AWM_Headshots_Ripp-267x300.jpg", role: "Partner", quote: "I love when clients take a picture of the whiteboard after a meeting and tell me with a big smile that financial planning finally makes sense to them.", bio: "Derek is driven by the reality that the average American family spends more time planning their summer vacation than they do on planning their financial future, often resulting in simple financial mistakes that have big consequences. His mission is to deliver a logical, practical framework for making important financial decisions that works for people with complex lives.\n\nHaving been raised the son of two teachers, Derek values the importance of education, especially when it comes to financial intelligence. His kind and confident Midwestern charm helps guide clients through a process of organizing financial resources, prioritizing financial values, and learning about economic trade-offs.\n\nDerek, a Wisconsin native, graduated from the University of Wisconsin-Whitewater with a BBA in 1996 where he played inside linebacker for the Warhawks football team. His career covers the spectrum of investment management, financial planning, insurance, estate planning, and technology.\n\nDerek lives in Wimberley with his wife Jennifer and two girls, Anna and Lily. He enjoys developing a homesteading lifestyle in the Hill Country with a focus on self-reliance and sustainability." },
  { name: "Julie Hayes", title: "MA", initials: "JH", photo: "https://austinwealthmgmt.com/wp-content/uploads/2025/08/julie-hayes-headshot-e1756305684704-300x297.jpg", role: "Chief Operations Officer", bio: "Julie serves as Chief Operations Officer at Austin Wealth Management, overseeing the firm's internal operations and ensuring clients receive the highest level of service and care." },
  { name: "Anna Bell Gall", title: "MPP", initials: "AG", photo: "https://austinwealthmgmt.com/wp-content/uploads/2021/05/AWM_Headshots_Gall-267x300.jpg", role: "Financial Advisor", quote: "Live for impact. Plan for resilience.", bio: "Anna Bell brings her passion for research and demystifying complex decisions into personal connections with every client. As a working mother of two with more than 15 years of experience serving clients from U.S. Cabinet secretaries to nonprofits to small business owners, nothing surprises her.\n\nAnna Bell uses everything from Bureau of Economic Analysis data to Real Housewives gifs to explain intimidating concepts. As a result of her time on Capitol Hill and later with organizations such as the Federal Reserve, the New York Stock Exchange, and the Treasury Department, Anna Bell has deep familiarity with programs and regulations that impact Americans every day.\n\nAnna Bell's own life-changing experiences after an incurable blood cancer diagnosis in her family inspired her to serve others navigating life transitions. She particularly loves working through the unique challenges experienced by Gen X/Gen Y professionals and women.\n\nShe is a graduate of Harvard Kennedy School and The University of Texas at Austin. Anna Bell resides in Central Austin with her husband and their two young children." },
  { name: "John Toungate", title: "CFP®", initials: "JT", photo: "https://austinwealthmgmt.com/wp-content/uploads/2019/09/AWM_Bio_Headshot_JToungate-267x300.jpg", role: "Wealth Advisor", quote: "Work hard, be honest, and take care of the people around you.", bio: "John is driven by the values he learned growing up in a blue collar south Austin family. He believes that money can grant you freedom and security to live your own unique lifestyle, but money is merely a vehicle to help accomplish your goals, not the destination itself.\n\nJohn has a gift for explaining complex financial issues with plain language that is both easy to understand and meaningful. He has seen first hand how financial issues can weigh on families, damage relationships and impact one's physical and mental health.\n\nA true Austinite and third-generation south Austin native, John attended The University of Texas where he earned a degree in Economics. He started at Austin Wealth Management right out of school, then pursued an intensive training program with UBS Financial Services in Houston before returning home.\n\nIn his free time you will find John hiking the Greenbelt, paddle boarding Lady Bird Lake, or listening to live music with friends." },
  { name: "Shane McDougald", title: "CFP®", initials: "SM", photo: "https://austinwealthmgmt.com/wp-content/uploads/2022/01/ELP_2464-scaled-1-199x300.jpeg", role: "Wealth Advisor & 401(k) Specialist", bio: "Shane believes the key to financial success is having a sound process. His fiduciary mentor was a U.S. Coast Guard search and rescue helicopter pilot who never got into his helicopter without going through a clear and defined process, because the potential consequences of an error were always dire.\n\nShane understands more time is spent planning vacations than planning for retirement because financial discussions can be difficult and overwhelming. He enjoys the labor required to work through the process, taking much of the burden off of his clients.\n\nShane loves engaging business owners and employees to create smart retirement saving strategies that reduce taxes. He uses deep knowledge of the 401(k) industry to help employers navigate the seemingly endless plan options." }
];

export default function TeamPreview() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
            Meet the Team
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            The people behind the planning
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            A team of certified professionals working together to serve you with specialized knowledge and personalized attention.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.05}>
              <button
                onClick={() => setSelectedMember(member)}
                className="group text-center w-full"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50">
                  {/* B&W image (default) */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* Color image (on hover) */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-medium tracking-wide uppercase px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      View Bio
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-slate-900 text-sm">{member.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{member.title}</p>
              </button>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link to={createPageUrl('Team')}>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-slate-300 hover:bg-slate-100"
            >
              Meet the Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>

      {/* Bio Modal */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
}