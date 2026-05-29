import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const lifeEvents = [
  'Changing Jobs Or Careers',
  'Retiring Soon',
  'Receiving An Inheritance',
  'Welcoming A New Baby Or Adopting',
  'Going Through A Divorce Or Separation',
  'Buying A Home',
  'Buying An Investment Property',
  'Dealing With The Death Of A Loved One',
  'IPO Or Company Liquidity Event',
  'Sudden Financial Windfall',
];

const timelines = ['Immediately', 'In The Next Few Weeks', 'Just Exploring For Now'];
const hearOptions = ['Referral', 'Search Engine', 'Social Media', 'Podcast (Can\'t Take It With You)', 'Blog', 'Other'];

export default function LifeEventForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    advisor: '', selectedEvents: [], somethingElse: '',
    topConcern: '', anythingElse: '', timeline: '', heardFrom: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleEvent = (event) => {
    setForm(f => ({
      ...f,
      selectedEvents: f.selectedEvents.includes(event)
        ? f.selectedEvents.filter(e => e !== event)
        : [...f.selectedEvents, event],
    }));
  };

  const toggleHeard = (option) => {
    setForm(f => ({
      ...f,
      heardFrom: f.heardFrom.includes(option)
        ? f.heardFrom.filter(o => o !== option)
        : [...f.heardFrom, option],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 max-w-lg text-center shadow-lg"
        >
          <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">We received your message!</h2>
          <p className="text-slate-600 mb-8">A member of our team will be in touch with you shortly to discuss your situation.</p>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full">Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-teal-700 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 text-teal-200 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Life Event — Need Help Now</h1>
          <p className="text-teal-100 text-lg">Facing a Big Life Decision? We're Here to Help.</p>
          <p className="text-teal-200 text-sm mt-2">Whether it's a new chapter or an unexpected turn, we will help you make smart financial decisions with confidence.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
              <input required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
              <input required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <input required type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
            <input type="tel" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
          </div>

          {/* Preferred Advisor */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Preferred Advisor{' '}
              <Link to={createPageUrl('Team')} className="text-amber-500 hover:text-amber-600 normal-case font-normal tracking-normal ml-1">Browse Our Team</Link>
            </label>
            <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" value={form.advisor} onChange={e => setForm(f => ({...f, advisor: e.target.value}))}>
              <option value="">Select an advisor</option>
              <option>No preference</option>
            </select>
          </div>

          {/* Life Events */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">What Major Life Event Are You Navigating Right Now? (Select all that apply)</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {lifeEvents.map((event) => (
                <label key={event} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.selectedEvents.includes(event)}
                    onChange={() => toggleEvent(event)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-slate-700 text-sm">{event}</span>
                </label>
              ))}
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                  <span className="text-slate-700 text-sm">Something Else (please describe):</span>
                </label>
                <textarea className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" rows={2} value={form.somethingElse} onChange={e => setForm(f => ({...f, somethingElse: e.target.value}))} />
              </div>
            </div>
          </div>

          {/* Top Concern */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">What's Your Top Concern or Question Right Now?</label>
            <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" rows={3} value={form.topConcern} onChange={e => setForm(f => ({...f, topConcern: e.target.value}))} />
          </div>

          {/* Anything Else */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Anything Else You Would Like Us to Know?</label>
            <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" rows={3} value={form.anythingElse} onChange={e => setForm(f => ({...f, anythingElse: e.target.value}))} />
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">How Soon Are You Hoping to Speak With Someone?</label>
            <div className="space-y-3">
              {timelines.map((t) => (
                <label key={t} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="timeline"
                    value={t}
                    checked={form.timeline === t}
                    onChange={() => setForm(f => ({...f, timeline: t}))}
                    className="h-4 w-4 text-teal-600"
                  />
                  <span className="text-slate-700 text-sm">{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* How Did You Hear */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              How Did You Hear About Us? <span className="normal-case font-normal tracking-normal text-amber-500">Check all that apply</span>
            </label>
            <div className="space-y-3">
              {hearOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.heardFrom.includes(opt)}
                    onChange={() => toggleHeard(opt)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600"
                  />
                  <span className="text-slate-700 text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-full h-14 text-base font-semibold">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}