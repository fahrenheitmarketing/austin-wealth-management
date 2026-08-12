import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, FileText, Share2, RefreshCw, CalendarDays, MessageSquare, Sparkles } from 'lucide-react';
import ContentCard from '@/components/studio/ContentCard';
import ContentFilters from '@/components/studio/ContentFilters';
import GenerateBlogDialog from '@/components/studio/GenerateBlogDialog';
import GenerateSocialDialog from '@/components/studio/GenerateSocialDialog';
import EditContentDialog from '@/components/studio/EditContentDialog';

export default function SocialBlogStudio() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: 'all', platform: 'all', segment: 'all', pillar: 'all', status: 'all' });
  const [genBlogOpen, setGenBlogOpen] = useState(false);
  const [genSocialOpen, setGenSocialOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, s] = await Promise.all([
        base44.entities.BlogArticle.list('-created_date', 200),
        base44.entities.SocialPost.list('-created_date', 200)
      ]);
      setBlogs(b);
      setSocials(s);
    } catch (e) {
      toast({ title: 'Failed to load content', description: e.message, variant: 'destructive' });
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const items = useMemo(() => {
    const bi = blogs.map((b) => ({ ...b, _type: 'Blog' }));
    const si = socials.map((s) => ({ ...s, _type: 'Social' }));
    return [...bi, ...si].filter((it) =>
      (filters.type === 'all' || it._type === filters.type) &&
      (filters.platform === 'all' || it.platform === filters.platform) &&
      (filters.segment === 'all' || it.segment === filters.segment) &&
      (filters.pillar === 'all' || it.brand_pillar === filters.pillar) &&
      (filters.status === 'all' || it.status === filters.status)
    );
  }, [blogs, socials, filters]);

  const entFor = (item) => (item._type === 'Blog' ? base44.entities.BlogArticle : base44.entities.SocialPost);

  const handleStatus = async (item, status) => {
    try {
      await entFor(item).update(item.id, { status });
      toast({ title: 'Status updated', description: `${item._type} → ${status}` });
      load();
    } catch (e) { toast({ title: 'Update failed', description: e.message, variant: 'destructive' }); }
  };

  const handleEscalate = async (item) => {
    try {
      await entFor(item).update(item.id, { status: 'QA Review', escalated: true });
      toast({ title: 'Escalated', description: 'Flagged for Steven review' });
      load();
    } catch (e) { toast({ title: 'Escalate failed', description: e.message, variant: 'destructive' }); }
  };

  const handleVariation = async (item) => {
    try {
      const { id, created_date, updated_date, created_by_id, status, escalated, clickup_task_id, _type, ...rest } = item;
      const labelKey = item._type === 'Blog' ? 'title' : 'topic';
      await entFor(item).create({ ...rest, [labelKey]: (rest[labelKey] || 'Untitled') + ' (variation)', status: 'Draft', escalated: false });
      toast({ title: 'Variation created' });
      load();
    } catch (e) { toast({ title: 'Variation failed', description: e.message, variant: 'destructive' }); }
  };

  const handleRegenImage = async (item, slot) => {
    try {
      const prompt = item._type === 'Blog'
        ? (slot === 'header' ? item.header_image_prompt : item.featured_image_prompt)
        : item.image_description;
      await base44.functions.invoke('regenerateContentImage', {
        content_type: item._type === 'Blog' ? 'blog' : 'social',
        id: item.id,
        image_prompt: prompt,
        slot
      });
      toast({ title: 'Image regenerated' });
      load();
    } catch (e) { toast({ title: 'Image generation failed', description: e.message, variant: 'destructive' }); }
  };

  const comingSoon = (label) => toast({ title: `${label} pending`, description: 'Available once ClickUp is connected.' });

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet><title>Social & Blog Studio — Austin Wealth Management</title></Helmet>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2"><Sparkles className="h-5 w-5" /><span className="text-sm font-medium uppercase tracking-wider">Content Production</span></div>
            <h1 className="text-3xl font-bold text-slate-900">Social &amp; Blog Studio</h1>
            <p className="text-slate-500 mt-1">Generate, review, and approve compliant content for Austin Wealth Management.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => comingSoon('Process Feedback')}><MessageSquare className="h-4 w-4 mr-2" />Process Feedback</Button>
            <Button variant="outline" onClick={() => comingSoon('Generate Month')}><CalendarDays className="h-4 w-4 mr-2" />Generate Month</Button>
            <Button variant="outline" onClick={() => setGenSocialOpen(true)}><Share2 className="h-4 w-4 mr-2" />New Social Post</Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950" onClick={() => setGenBlogOpen(true)}><FileText className="h-4 w-4 mr-2" />New Blog Article</Button>
          </div>
        </div>

        <div className="mb-6">
          <ContentFilters filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <p className="mb-4">No content yet. Generate your first article or post.</p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={() => setGenSocialOpen(true)}><Share2 className="h-4 w-4 mr-2" />New Social Post</Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950" onClick={() => setGenBlogOpen(true)}><FileText className="h-4 w-4 mr-2" />New Blog Article</Button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ContentCard
                key={item._type + '-' + item.id}
                item={item}
                onStatus={handleStatus}
                onEscalate={handleEscalate}
                onVariation={handleVariation}
                onRegenImage={handleRegenImage}
                onEdit={(it) => setEditItem(it)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button variant="ghost" size="sm" onClick={load}><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
        </div>
      </div>

      <GenerateBlogDialog open={genBlogOpen} onOpenChange={setGenBlogOpen} onCreated={load} />
      <GenerateSocialDialog open={genSocialOpen} onOpenChange={setGenSocialOpen} onCreated={load} />
      <EditContentDialog item={editItem} onOpenChange={(v) => !v && setEditItem(null)} onSaved={load} />
    </div>
  );
}