




// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// const T = {
//   bg: '#080810',
//   accent: '#34d399',
//   accentBg: 'rgba(52,211,153,0.07)',
//   accentBorder: 'rgba(52,211,153,0.18)',
//   accentGlow: 'rgba(52,211,153,0.15)',
//   cardBg: 'rgba(255,255,255,0.025)',
//   cardBorder: 'rgba(255,255,255,0.07)',
//   inputBg: 'rgba(255,255,255,0.03)',
//   textMuted: 'rgba(255,255,255,0.4)',
//   textDim: 'rgba(255,255,255,0.2)',
// };

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [error, setError] = useState('');
//   const [focused, setFocused] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const res = await fetch('/api/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSent(true);
//         showToast.success('Password reset link sent! Check your email.');
//       } else {
//         setError(data.error || 'Failed to send reset link');
//         showToast.error(data.error || 'Failed to send reset link');
//       }
//     } catch {
//       setError('Network error. Please try again.');
//       showToast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (sent) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4"
//         style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />

//         <div className="max-w-md w-full rounded-2xl p-8 text-center border relative z-10"
//           style={{ background: T.cardBg, borderColor: T.cardBorder }}>
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//             <CheckCircle className="w-8 h-8" style={{ color: T.accent }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
//             style={{ fontFamily: "'DM Serif Display', serif" }}>Check Your Email</h1>
//           <p className="text-sm mb-4" style={{ color: T.textMuted }}>
//             We've sent a password reset link to:
//           </p>
//           <div className="p-4 rounded-xl mb-6 border" style={{ background: T.inputBg, borderColor: T.cardBorder }}>
//             <p className="font-medium break-all" style={{ color: T.accent }}>{email}</p>
//           </div>
//           <div className="space-y-4">
//             <p className="text-xs" style={{ color: T.textDim }}>
//               Didn't receive the email? Check your spam folder or
//             </p>
//             <button onClick={handleSubmit} disabled={loading}
//               className="font-medium transition-colors text-sm"
//               style={{ color: T.accent }}
//               onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
//               onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
//               Click here to resend
//             </button>
//             <Link href="/login" className="block text-xs transition-colors mt-4"
//               style={{ color: T.textDim }}
//               onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
//               onMouseLeave={e => (e.currentTarget.style.color = T.textDim)}>
//               ← Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4"
//       style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap'); input::placeholder { color: rgba(255,255,255,0.18); }`}</style>
//       <Toaster position="top-right" />

//       <div className="absolute inset-0 pointer-events-none"
//         style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
//       <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

//       <div className="max-w-md w-full relative z-10">
//         {/* Back button */}
//         <div className="mb-6">
//           <Link href="/login"
//             className="inline-flex items-center gap-2 text-sm transition-colors group"
//             style={{ color: T.textMuted }}
//             onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
//             onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}>
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//             Back to Login
//           </Link>
//         </div>

//         {/* Logo */}
//         <div className="flex items-center gap-2.5 mb-8">
//           <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//             style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
//             <span className="text-white/80 font-bold text-sm">F</span>
//           </div>
//           <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
//         </div>

//         {/* Card */}
//         <div className="rounded-2xl p-8 border" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
//           {/* Icon */}
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
//             style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//             <Mail className="w-6 h-6" style={{ color: T.accent }} />
//           </div>

//           <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
//             style={{ fontFamily: "'DM Serif Display', serif" }}>Forgot Password?</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>
//             No worries! Enter your email and we'll send you a reset link.
//           </p>

//           {error && (
//             <div className="mb-5 px-4 py-3 rounded-xl text-sm"
//               style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-150"
//                   style={{ color: focused ? T.accent : 'rgba(255,255,255,0.2)' }} />
//                 <input type="email" value={email} onChange={e => setEmail(e.target.value)}
//                   onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//                   placeholder="you@example.com" required disabled={loading}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
//                   style={{
//                     background: focused ? 'rgba(52,211,153,0.03)' : T.inputBg,
//                     border: `1px solid ${focused ? T.accentBorder : T.cardBorder}`,
//                     color: 'rgba(255,255,255,0.88)',
//                     boxShadow: focused ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
//                     caretColor: T.accent,
//                   }} />
//               </div>
//             </div>

//             <button type="submit" disabled={loading}
//               className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
//               style={{
//                 background: loading ? T.accentBg : '#fff',
//                 color: loading ? T.accent : '#080810',
//                 boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
//                 border: loading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
//               }}>
//               {loading
//                 ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
//                     style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Sending…</span></>
//                 : <><Mail className="w-4 h-4" /><span>Send Reset Link</span></>}
//             </button>
//           </form>

//           <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.22)' }}>
//             Remember your password?{' '}
//             <Link href="/login" className="font-semibold transition-colors"
//               style={{ color: 'rgba(52,211,153,0.7)' }}
//               onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
//               onMouseLeave={e => (e.currentTarget.style.color = 'rgba(52,211,153,0.7)')}>
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }













// app/(auth)/forgot-password/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { theme } from '@/lib/theme';

// Standardized focus style (consistent with login/signup)
const focusStyle = {
  boxShadow: `0 0 0 3px ${theme.colors.accent}08`,
  borderColor: theme.colors.accentBorder,
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [touched, setTouched] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    if (!email) {
      setError('Email is required');
      showToast.error('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      showToast.error('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (data.success) {
        setSent(true);
        showToast.success('Reset link sent!', 'Check your email inbox');
      } else {
        setError(data.error || 'Failed to send reset link');
        showToast.error(data.error || 'Failed to send reset link');
      }
    } catch {
      setError('Network error. Please try again.');
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setResendCooldown(30);
    setLoading(true);
    
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (data.success) {
        showToast.success('Reset link resent!', 'Check your email inbox');
      } else {
        showToast.error(data.error || 'Failed to resend link');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.colors.bg, fontFamily: theme.fonts.primary }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
        
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${theme.colors.accentGlow} 0%, transparent 60%)` }} />
        
        <div className="max-w-md w-full rounded-2xl p-8 text-center border relative z-10"
          style={{ background: theme.colors.cardBg, borderColor: theme.colors.cardBorder }}>
          
          {/* Animated success icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300"
            style={{ background: theme.colors.accentBg, border: `1px solid ${theme.colors.accentBorder}` }}>
            <CheckCircle className="w-8 h-8" style={{ color: theme.colors.accent }} />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: theme.fonts.display }}>Check Your Email</h1>
          
          <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
            We've sent a password reset link to:
          </p>
          
          <div className="p-4 rounded-xl mb-4 border" style={{ background: theme.colors.inputBg, borderColor: theme.colors.cardBorder }}>
            <p className="font-medium break-all" style={{ color: theme.colors.accent }}>{email}</p>
          </div>
          
          {/* Tips box */}
          <div className="mb-6 p-3 rounded-xl text-left" style={{ background: 'rgba(52,211,153,0.05)', border: `1px solid ${theme.colors.accentBorder}` }}>
            <p className="text-xs font-semibold mb-2" style={{ color: theme.colors.accent }}>📬 Important Tips:</p>
            <ul className="text-xs space-y-1" style={{ color: theme.colors.textMuted }}>
              <li>• Check your spam/junk folder</li>
              <li>• The link expires in 15 minutes</li>
              <li>• Make sure you entered the correct email</li>
            </ul>
          </div>
          
          {/* Resend button with cooldown */}
          <div className="space-y-4">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || loading}
              className="font-medium transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: theme.colors.accent }}
            >
              {resendCooldown > 0 
                ? `Resend available in ${resendCooldown}s`
                : loading 
                  ? 'Sending...' 
                  : 'Click here to resend'
              }
            </button>
            
            {/* Auto redirect timer */}
            <div className="text-[11px] mt-4" style={{ color: theme.colors.textDim }}>
              Redirecting to login in <span className="font-medium">5</span> seconds...
            </div>
            
            <Link href="/login" className="block text-xs transition-colors mt-2"
              style={{ color: theme.colors.textDim }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = theme.colors.textDim)}>
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Forgot password form
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.colors.bg, fontFamily: theme.fonts.primary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        input::placeholder { color: rgba(255,255,255,0.18); }
        .animate-in { animation-duration: 0.3s; animation-fill-mode: both; }
        .slide-in-from-right { animation-name: slideInFromRight; }
        .zoom-in { animation-name: zoomIn; }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${theme.colors.accentGlow} 0%, transparent 60%)` }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-md w-full relative z-10">
        {/* Back button - single exit */}
        <div className="mb-6">
          <Link href="/login"
            className="inline-flex items-center gap-2 text-sm transition-colors group"
            style={{ color: theme.colors.textMuted }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.color = theme.colors.textMuted)}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div>

        {/* Logo - ✅ Fixed branding to QuizForge */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${theme.colors.accent}30` }}>
            <span className="text-emerald-400 font-bold text-sm">Q</span>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">QuizForge</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 border" style={{ background: theme.colors.cardBg, borderColor: theme.colors.cardBorder }}>
          
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ background: theme.colors.accentBg, border: `1px solid ${theme.colors.accentBorder}` }}>
            <Mail className="w-6 h-6" style={{ color: theme.colors.accent }} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: theme.fonts.display }}>Forgot Password?</h1>
          <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>
            No worries! Enter your email and we'll send you a reset link.
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-right"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.colors.textDim }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-150"
                  style={{ color: focused ? theme.colors.accent : (touched && !validateEmail(email) && email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.2)') }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (touched) setError('');
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => {
                    setFocused(false);
                    setTouched(true);
                    if (email && !validateEmail(email)) {
                      setError('Please enter a valid email address');
                    }
                  }}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: focused ? `${theme.colors.accent}08` : theme.colors.inputBg,
                    border: `1px solid ${focused ? theme.colors.accentBorder : (touched && email && !validateEmail(email) ? 'rgba(239,68,68,0.3)' : theme.colors.cardBorder)}`,
                    color: 'rgba(255,255,255,0.88)',
                    boxShadow: focused ? theme.colors.focusShadow : 'none',
                    caretColor: theme.colors.accent,
                  }}
                />
              </div>
              {/* Email format hint */}
              {touched && !email && (
                <p className="text-[10px] pl-1" style={{ color: theme.colors.textDim }}>
                  Example: name@school.com
                </p>
              )}
            </div>

            {/* Primary CTA - stronger contrast */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: loading ? theme.colors.accentBg : '#fff',
                color: loading ? theme.colors.accent : '#080810',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
                border: loading ? `1px solid ${theme.colors.accentBorder}` : '1px solid transparent',
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: `${theme.colors.accent}30`, borderTopColor: theme.colors.accent }} />
                  <span>Sending reset link...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          {/* Secondary link - dimmer */}
          <p className="text-center text-xs mt-6" style={{ color: theme.colors.textDim }}>
            Remember your password?{' '}
            <Link href="/login" className="font-semibold transition-colors"
              style={{ color: `${theme.colors.accent}b3` }}
              onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = `${theme.colors.accent}b3`)}>
              Sign in to QuizForge
            </Link>
          </p>
        </div>

        {/* Help text */}
        <p className="text-center text-[10px] mt-4" style={{ color: theme.colors.textDim }}>
          We'll send a password reset link to your registered email
        </p>
      </div>
    </div>
  );
}