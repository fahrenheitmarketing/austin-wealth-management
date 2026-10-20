import React from 'react';
import { Link } from 'react-router-dom';
import { FileDown } from 'lucide-react';

export default function DisclosureDocumentItem({ id, title, description, href, linkLabel = 'Download PDF' }) {
  const isInternal = href.startsWith('/');
  const linkClassName =
    'mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 underline underline-offset-4 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2';
  const linkContent = (
    <>
      <FileDown className="h-4 w-4" aria-hidden="true" />
      {linkLabel}
      <span className="sr-only"> — {title}</span>
    </>
  );
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="text-sm font-semibold tracking-widest uppercase text-amber-600"
      >
        {title}
      </h2>
      <p className="mt-4 text-slate-600 leading-relaxed">{description}</p>
      {isInternal ? (
        <Link to={href} className={linkClassName}>
          {linkContent}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {linkContent}
        </a>
      )}
    </section>
  );
}