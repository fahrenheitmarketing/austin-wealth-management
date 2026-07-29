import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarClock, Link2, Loader2 } from 'lucide-react';

export default function ComposePostForm({ selectedPage, onSubmit, submitting }) {
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const minDateTime = new Date(Date.now() + 6 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !scheduledTime || !selectedPage) return;
    onSubmit({
      message: message.trim(),
      link: link.trim(),
      page_id: selectedPage.id,
      page_name: selectedPage.name,
      scheduled_time: new Date(scheduledTime).toISOString()
    });
    setMessage('');
    setLink('');
    setScheduledTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Post message</Label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          maxLength={5000}
          placeholder="What would you like to share with your audience?"
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
        />
        <p className="text-xs text-slate-400 text-right">{message.length} / 5000</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <Link2 className="h-3.5 w-3.5" /> Link (optional)
          </Label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://austinwealthmgmt.com/…"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" /> Publish at
          </Label>
          <input
            type="datetime-local"
            value={scheduledTime}
            min={minDateTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!message.trim() || !scheduledTime || !selectedPage || submitting}
        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full px-8"
      >
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Scheduling…</>
        ) : (
          'Schedule post'
        )}
      </Button>
    </form>
  );
}