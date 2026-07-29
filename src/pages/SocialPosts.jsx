import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import PageSelector from '@/components/social/PageSelector';
import ComposePostForm from '@/components/social/ComposePostForm';
import ScheduledPostList from '@/components/social/ScheduledPostList';
import { CalendarClock, CalendarPlus } from 'lucide-react';

export default function SocialPosts() {
  const { toast } = useToast();
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [selectedPageId, setSelectedPageId] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const selectedPage = pages.find((p) => p.id === selectedPageId) || null;

  const loadPages = useCallback(async () => {
    setPagesLoading(true);
    try {
      const res = await base44.functions.invoke('listFacebookPages', {});
      setPages(res.data.pages || []);
    } catch (err) {
      toast({ title: 'Could not load Pages', description: err.message, variant: 'destructive' });
    } finally {
      setPagesLoading(false);
    }
  }, [toast]);

  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const list = await base44.entities.ScheduledPost.list('-created_date', 100);
      setPosts(list || []);
    } catch (err) {
      toast({ title: 'Could not load posts', description: err.message, variant: 'destructive' });
    } finally {
      setPostsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadPages();
    loadPosts();
  }, []);

  const handleSchedule = async (payload) => {
    setSubmitting(true);
    try {
      await base44.entities.ScheduledPost.create({ ...payload, status: 'pending' });
      toast({ title: 'Post scheduled', description: `Will publish to ${payload.page_name} at the set time.` });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Scheduling failed', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await base44.entities.ScheduledPost.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: 'Post removed' });
    } catch (err) {
      toast({ title: 'Could not delete', description: err.message, variant: 'destructive' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Helmet>
        <title>Schedule Social Posts | Austin Wealth Management</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
              <CalendarPlus className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Schedule Social Posts</h1>
              <p className="text-sm text-slate-500">Compose posts and publish them to your Facebook business Page on a schedule.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Compose */}
          <div className="lg:col-span-3 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <PageSelector
                pages={pages}
                selectedPageId={selectedPageId}
                onSelect={setSelectedPageId}
                loading={pagesLoading}
              />
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Compose post</h2>
              <p className="text-sm text-slate-500 mb-6">
                {selectedPage ? <>Publishing to <span className="font-medium text-slate-700">{selectedPage.name}</span></> : 'Select a Page first.'}
              </p>
              <ComposePostForm
                selectedPage={selectedPage}
                onSubmit={handleSchedule}
                submitting={submitting}
              />
            </section>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-5">
                <CalendarClock className="h-5 w-5 text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">Scheduled posts</h2>
              </div>
              {postsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
                </div>
              ) : (
                <ScheduledPostList posts={posts} onDelete={handleDelete} deletingId={deletingId} />
              )}
            </section>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-8 text-center">
          Posts are published automatically every 5 minutes by a scheduled job. Keep your Facebook connection active.
        </p>
      </div>
    </div>
  );
}