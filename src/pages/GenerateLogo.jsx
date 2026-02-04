import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export default function GenerateLogo() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateLogo = async () => {
    setLoading(true);
    try {
      const { url } = await base44.integrations.Core.GenerateImage({
        prompt: "Minimalist elegant logo mark for a prestigious financial wealth management firm. A stylized heraldic lion head in profile facing right, inspired by the Peugeot lion logo - noble, sophisticated, regal. Clean geometric lines, single color rendering in deep gold or amber tone. The lion should look powerful yet refined, suitable for an established luxury financial brand. Simple shield or crest silhouette framing the lion. White background, vector-style clean edges, no text, just the lion mark. Premium, timeless, trustworthy aesthetic."
      });
      setLogoUrl(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Austin Wealth Management Logo Generator</h1>
      
      <Button 
        onClick={generateLogo} 
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-600 text-slate-950 mb-8"
      >
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Generate Lion Logo'}
      </Button>

      {logoUrl && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <img src={logoUrl} alt="Generated Logo" className="max-w-md" />
          <p className="mt-4 text-sm text-slate-500 text-center break-all">
            URL: {logoUrl}
          </p>
          <p className="mt-2 text-sm text-slate-700 text-center">
            Copy this URL and share it with me to implement in the site!
          </p>
        </div>
      )}
    </div>
  );
}