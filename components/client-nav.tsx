// components/client-nav.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function ClientNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#080810]/80 backdrop-blur-xl border-b border-white/10' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 border border-emerald-400/30">
            <span className="text-emerald-400 font-bold text-sm">Q</span>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">QuizForge</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link href="/features" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
            Features
          </Link>
          <Link href="/pricing" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
            Pricing
          </Link>
          <Link href="/blog" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
            Blog
          </Link>
          <div className="mx-2 h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all">
            Get Started <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
          </Link>
        </div>
      </div>
    </nav>
  );
}