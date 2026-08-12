import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const platforms = ['Facebook', 'LinkedIn', 'Google Business Profile'];
const segments = ['Young Adults', 'Professionals & Executives', 'Business Owners'];
const pillars = ['Education', 'Advocacy', 'Systems', 'Accountability', 'Adaptation'];

export default function GenerateSocialDialog({ open, onOpenChange, onCreated }) {
  const [platform, setPlatform] = useState('Facebook');
  const [segment, setSegment] = useState('Young Adults');
  const [theme, setTheme] = useState('');
  const [pillar, setPillar] = useState('Education');
  const [week, setWeek] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    try {
      const res = await base44.functions.invoke('generateSocialPost', { platform, segment, theme, pillar, week, publishDate });
      onCreated(res.data.post);
      onOpenChange(false);
      setTheme('');
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Generate Social Post</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Platform</Label>
            <select className="w-full mt-1 rounded-md border border-input bg-background h-9 px-3" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              {platforms.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <Label>Segment</Label>
            <select className="w-full mt-1 rounded-md border border-input bg-background h-9 px-3" value={segment} onChange={(e) => setSegment(e.target.value)}>
              {segments.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Theme / Topic</Label>
            <Input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="e.g. mid-year review prompt" />
          </div>
          <div>
            <Label>Brand Pillar</Label>
            <select className="w-full mt-1 rounded-md border border-input bg-background h-9 px-3" value={pillar} onChange={(e) => setPillar(e.target.value)}>
              {pillars.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Week</Label>
              <Input value={week} onChange={(e) => setWeek(e.target.value)} placeholder="e.g. Week 1" />
            </div>
            <div>
              <Label>Publish Date</Label>
              <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button onClick={submit} disabled={loading || !theme.trim()}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</> : 'Generate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}