import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { teamMembers, generateSlug } from '@/lib/teamData';
import { createPageUrl } from '@/utils';

export default function TeamMemberProfile() {
  const { slug } = useParams();
  const member = teamMembers.find(m => generateSlug(m.name) === slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-amber-600 text-xs font-medium tracking-widest uppercase mb-4">Not Found</p>
          <h1 className="text-3xl font-light text-slate-900 mb-6">Team member not found</h1>
          <Link to={createPageUrl('Team')} className="text-amber-600 hover:text-amber-700 font-medium">
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const pageTitle = member.title
    ? `${member.name}, ${member.title} | Austin Wealth Management`
    : `${member.name} | Austin Wealth Management`;
  const pageDesc = member.bio
    ? member.bio.split('\n\n')[0].split('. ')[0] + '.'
    : `${member.name} is a member of the Austin Wealth Management team.`;

  return (
    <main className="bg-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://www.austinwealthmgmt.com/team/${generateSlug(member.name)}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8e78a0887_image.png"
          alt="Austin Skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center md:items-end gap-10"
          >
            {/* Headshot */}
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden flex-shrink-0 shadow-2xl border-2 border-white/10">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-5xl font-light text-slate-400">
                  {member.initials}
                </div>
              )}
            </div>

            {/* Identity */}
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
                Our Team
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                {member.name}
              </h1>
              {member.title && (
                <p className="text-amber-400 font-medium mt-1">{member.title}</p>
              )}
              <p className="text-slate-400 mt-1">{member.role}</p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 mt-3 text-sm text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to={createPageUrl('Team')}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Team
          </Link>

          {member.quote && (
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-l-4 border-amber-400 pl-6 mb-12"
            >
              <p className="text-xl md:text-2xl font-light text-slate-700 italic leading-relaxed">
                "{member.quote}"
              </p>
            </motion.blockquote>
          )}

          {member.bio && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-slate-600 leading-relaxed text-base md:text-lg"
            >
              {member.bio.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}