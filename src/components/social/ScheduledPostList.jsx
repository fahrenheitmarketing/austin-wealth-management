import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, AlertCircle, CheckCircle2, Clock, CalendarClock } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Scheduled', icon: Clock, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  published: { label: 'Published', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  failed: { label: 'Failed', icon: AlertCircle, className: 'bg-rose-50 text-rose-700 border-rose-200' }
};

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

export default function ScheduledPostList({ posts, onDelete, deletingId }) {
  if (!posts.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        <CalendarClock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No scheduled posts yet. Compose one above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const cfg = statusConfig[post.status] || statusConfig.pending;
        const StatusIcon = cfg.icon;
        return (
          <div
            key={post.id}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="outline" className={cfg.className}>
                  <StatusIcon className="h-3 w-3 mr-1" /> {cfg.label}
                </Badge>
                <span className="text-xs font-medium text-slate-500">{post.page_name}</span>
              </div>
              <p className="text-sm text-slate-800 whitespace-pre-wrap break-words mb-2 line-clamp-4">
                {post.message}
              </p>
              {post.link && (
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700">
                  <ExternalLink className="h-3 w-3" /> {post.link}
                </a>
              )}
              {post.status === 'failed' && post.error_message && (
                <p className="text-xs text-rose-600 mt-2">⚠ {post.error_message}</p>
              )}
              <p className="text-xs text-slate-400 mt-2">
                {post.status === 'published' ? 'Published ' : 'Scheduled for '}
                {formatDate(post.status === 'published' ? post.updated_date : post.scheduled_time)}
              </p>
            </div>
            <div className="flex sm:flex-col gap-2 sm:items-end">
              {post.status === 'pending' && (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={deletingId === post.id}
                  onClick={() => onDelete(post.id)}
                  className="text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}