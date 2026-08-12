import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Copy, Check, X, AlertTriangle, Pencil } from 'lucide-react';

const statusColor = {
  'Draft': 'bg-slate-100 text-slate-700',
  'QA Review': 'bg-amber-100 text-amber-800',
  'Approved for Schedule': 'bg-blue-100 text-blue-800',
  'Approved for Publish': 'bg-emerald-100 text-emerald-800'
};

export default function ContentCard({ item, onStatus, onEscalate, onVariation, onRegenImage, onEdit }) {
  const isBlog = item._type === 'Blog';
  const preview = (isBlog ? item.body : item.copy) || '';
  const img = isBlog ? item.featured_image_url : item.image_url;

  return (
    <Card className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <Badge variant="outline" className="text-xs">{item._type}</Badge>
            {!isBlog && item.platform && <Badge variant="outline" className="text-xs">{item.platform}</Badge>}
            {item.escalated && <Badge className="text-xs bg-red-100 text-red-800 border-0"><AlertTriangle className="h-3 w-3 mr-1" />Escalated</Badge>}
          </div>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2">{isBlog ? item.title : item.topic}</h3>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusColor[item.status] || ''}`}>{item.status}</span>
      </div>

      {img && (
        <div className="aspect-video w-full bg-slate-100 rounded-md overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {item.segment && <Badge variant="secondary" className="text-xs border-0">{item.segment}</Badge>}
        {item.brand_pillar && <Badge variant="secondary" className="text-xs border-0">{item.brand_pillar}</Badge>}
        {item.publish_date && <span className="text-xs text-slate-500 self-center">{item.publish_date}</span>}
      </div>

      <p className="text-xs text-slate-600 line-clamp-3">{preview}</p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        <Button size="sm" variant="outline" onClick={() => onRegenImage(item, isBlog ? 'featured' : 'social')}>
          <ImageIcon className="h-3.5 w-3.5 mr-1" />Image
        </Button>
        <Button size="sm" variant="outline" onClick={() => onVariation(item)}>
          <Copy className="h-3.5 w-3.5 mr-1" />Variation
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
          <Pencil className="h-3.5 w-3.5 mr-1" />Edit
        </Button>
        <Button size="sm" variant="outline" className="text-amber-700" onClick={() => onEscalate(item)}>Escalate</Button>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onStatus(item, 'Approved for Schedule')}>
          <Check className="h-3.5 w-3.5 mr-1" />Approve
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onStatus(item, 'Draft')}>
          <X className="h-3.5 w-3.5 mr-1" />Reject
        </Button>
      </div>
    </Card>
  );
}