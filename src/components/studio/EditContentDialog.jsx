import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function EditContentDialog({ item, onOpenChange, onSaved }) {
  const isBlog = item && item._type === 'Blog';
  const [title, setTitle] = useState('');
  const [copy, setCopy] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(isBlog ? item.title : item.topic);
      setCopy(isBlog ? item.body : item.copy);
    }
  }, [item]);

  if (!item) return null;

  const save = async () => {
    setSaving(true);
    try {
      const ent = isBlog ? base44.entities.BlogArticle : base44.entities.SocialPost;
      const payload = isBlog ? { title, body: copy } : { topic: title, copy };
      await ent.update(item.id, payload);
      onSaved();
      onOpenChange(false);
    } catch (e) {
      alert(e.message);
    }
    setSaving(false);
  };

  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Edit {isBlog ? 'Article' : 'Post'}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>{isBlog ? 'Title' : 'Topic'}</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>{isBlog ? 'Body' : 'Copy'}</Label>
            <Textarea rows={12} value={copy} onChange={(e) => setCopy(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}