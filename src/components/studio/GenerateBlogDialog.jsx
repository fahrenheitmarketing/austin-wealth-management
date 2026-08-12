import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const segments = ['Young Adults', 'Professionals & Executives', 'Business Owners'];
const pillars = ['Education', 'Advocacy', 'Systems', 'Accountability', 'Adaptation'];

export default function GenerateBlogDialog({ open, onOpenChange, onCreated }) {
  const [segment, setSegment] = useState('Young Adults');
  const [topic, setTopic] = useState('');
  const [pillar, setPillar] = useState('Education');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await base44.functions.invoke('generateBlogArticle', { segment, topic, pillar, publishDate });
      onCreated(res.data.article);
      onOpenChange(false);
      setTopic('');
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Generate Blog Article</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Segment</Label>
            <select className="w-full mt-1 rounded-md border border-input bg-background h-9 px-3" value={segment} onChange={(e) => setSegment(e.target.value)}>
              {segments.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. coordinating an RSU vest with parental leave" />
          </div>
          <div>
            <Label>Brand Pillar</Label>
            <select className="w-full mt-1 rounded-md border border-input bg-background h-9 px-3" value={pillar} onChange={(e) => setPillar(e.target.value)}>
              {pillars.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <Label>Publish Date</Label>
            <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button onClick={submit} disabled={loading || !topic.trim()}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</> : 'Generate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}