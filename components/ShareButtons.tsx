// components/ShareButtons.tsx
'use client';

import { Share2, Copy, Check, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n\nRead more: ${url}`)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareOnWhatsApp}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-400/30 transition"
        aria-label="Share on WhatsApp"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-400/30 transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-400/30 transition"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-400/30 transition"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}