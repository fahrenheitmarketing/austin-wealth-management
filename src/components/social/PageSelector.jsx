import React from 'react';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';

export default function PageSelector({ pages, selectedPageId, onSelect, loading }) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
        Loading your Facebook Pages…
      </div>
    );
  }

  if (!pages.length) {
    return (
      <p className="text-sm text-slate-500">
        No Facebook Pages found. Make sure your Facebook account manages at least one business Page.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">Select Facebook Page</Label>
      <div className="relative">
        <select
          value={selectedPageId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
        >
          <option value="" disabled>Choose a Page…</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}