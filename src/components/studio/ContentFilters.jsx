import React from 'react';
import { Label } from '@/components/ui/label';

const options = {
  type: ['all', 'Blog', 'Social'],
  platform: ['all', 'Facebook', 'LinkedIn', 'Google Business Profile'],
  segment: ['all', 'Young Adults', 'Professionals & Executives', 'Business Owners'],
  pillar: ['all', 'Education', 'Advocacy', 'Systems', 'Accountability', 'Adaptation'],
  status: ['all', 'Draft', 'QA Review', 'Approved for Schedule', 'Approved for Publish']
};

const labels = { type: 'Type', platform: 'Platform', segment: 'Segment', pillar: 'Pillar', status: 'Status' };

export default function ContentFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.keys(options).map((key) => (
        <div key={key} className="min-w-[150px]">
          <Label className="text-xs text-slate-500">{labels[key]}</Label>
          <select
            className="w-full mt-1 rounded-md border border-input bg-background h-9 px-2 text-sm"
            value={filters[key]}
            onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
          >
            {options[key].map((o) => (
              <option key={o} value={o}>{o === 'all' ? 'All' : o}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}