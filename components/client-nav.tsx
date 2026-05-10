// // components/client-nav.tsx
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { ArrowRight } from 'lucide-react';

// export function ClientNav() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//       scrolled ? 'bg-[#080810]/80 backdrop-blur-xl border-b border-white/10' : ''
//     }`}>
//       <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-2.5">
//           <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 border border-emerald-400/30">
//             <span className="text-emerald-400 font-bold text-sm">Q</span>
//           </div>
//           <span className="text-white font-semibold text-[15px] tracking-tight">QuizForge</span>
//         </Link>
//         <div className="hidden md:flex items-center gap-1">
//           <Link href="/features" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
//             Features
//           </Link>
//           <Link href="/pricing" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
//             Pricing
//           </Link>
//           <Link href="/blog" className="px-3.5 py-2 text-sm text-white/60 hover:text-white/90 transition-colors rounded-lg hover:bg-white/5">
//             Blog
//           </Link>
//           <div className="mx-2 h-4 w-px bg-white/10" />
//           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
//             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             AI-Powered
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Link href="/login" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
//             Sign in
//           </Link>
//           <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all">
//             Get Started <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }









// components/client-nav.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export function ClientNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing',  label: 'Pricing'  },
    { href: '/blog',     label: 'Blog'     },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || mobileOpen ? 'rgba(8,8,16,0.92)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || mobileOpen ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
              <span className="font-bold text-sm" style={{ color: '#34d399' }}>Q</span>
            </div>
            <span className="font-semibold text-white text-[15px] tracking-tight">QuizForge</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-3.5 py-2 text-sm rounded-lg transition-all"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                {label}
              </Link>
            ))}
            <div className="mx-2 h-4 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34d399' }} />
              AI-Powered
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login"
              className="px-4 py-2 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}>
              Sign in
            </Link>
            <Link href="/signup"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#fff', color: '#080810' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}>
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="md:hidden transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: mobileOpen ? '400px' : '0px',
            opacity: mobileOpen ? 1 : 0,
          }}>
          <div className="px-5 pb-6 pt-2 space-y-1"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Nav links */}
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ color: 'rgba(255,255,255,0.65)', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}>
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-3 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Mobile CTA buttons */}
            <Link href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              Sign in
            </Link>
            <Link href="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#fff', color: '#080810' }}>
              Get started free
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* AI badge */}
            <div className="flex justify-center pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34d399' }} />
                AI-Powered Platform
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop — closes menu on outside tap */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}