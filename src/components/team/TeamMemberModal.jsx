import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

export default function TeamMemberModal({ member, onClose }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-slate-600" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-6 p-8 pb-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-light text-slate-400">
                  {member.initials}
                </div>
              )}
            </div>
            <div className="pt-1">
              <h2 className="text-2xl font-medium text-slate-900">{member.name}</h2>
              {member.title && <p className="text-amber-600 font-medium mt-0.5">{member.title}</p>}
              <p className="text-slate-500 text-sm mt-1">{member.role}</p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 mt-2"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {member.email}
                </a>
              )}
            </div>
          </div>

          <div className="h-px bg-slate-100 mx-8" />

          {/* Bio */}
          <div className="px-8 py-6">
            {member.quote && (
              <blockquote className="text-slate-600 italic border-l-2 border-amber-400 pl-4 mb-5 text-sm leading-relaxed">
                "{member.quote}"
              </blockquote>
            )}
            {member.bio && (
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                {member.bio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {!member.bio && !member.quote && (
              <p className="text-slate-400 text-sm italic">More information coming soon.</p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}