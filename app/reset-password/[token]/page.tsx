





// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';
// import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
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

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const params = useParams();
//   const token = params.token as string;

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [reset, setReset] = useState(false);
//   const [error, setError] = useState('');
//   const [validToken, setValidToken] = useState(true);
//   const [countdown, setCountdown] = useState(5);
//   const [focused, setFocused] = useState<string | null>(null);

//   useEffect(() => {
//     if (!token) { setValidToken(false); setError('Invalid reset link'); }
//   }, [token]);

//   const getPasswordStrength = () => {
//     if (password.length === 0) return 0;
//     if (password.length < 6) return 1;
//     if (password.length < 8) return 2;
//     if (password.match(/^(?=.*[A-Z])(?=.*[0-9])/)) return 3;
//     return 2;
//   };

//   const strength = getPasswordStrength();
//   const strengthMeta = [
//     null,
//     { text: 'Weak', color: '#ef4444', w: 'w-1/3' },
//     { text: 'Medium', color: '#f59e0b', w: 'w-2/3' },
//     { text: 'Strong', color: T.accent, w: 'w-full' },
//   ];

//   useEffect(() => {
//     if (reset && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//     if (reset && countdown === 0) router.push('/login');
//   }, [reset, countdown, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
//     if (password !== confirmPassword) { setError('Passwords do not match'); return; }
//     setLoading(true);
//     try {
//       const res = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword: password }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setReset(true);
//         showToast.success('Password reset successfully!');
//       } else {
//         setError(data.error || 'Failed to reset password');
//         showToast.error(data.error || 'Failed to reset password');
//       }
//     } catch {
//       setError('Network error. Please try again.');
//       showToast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pageStyle = { background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" };
//   const fontImport = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap'); input::placeholder { color: rgba(255,255,255,0.18); }`;

//   if (!validToken) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
//         <style>{fontImport}</style>
//         <div className="max-w-md w-full rounded-2xl p-8 text-center border" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
//             <AlertCircle className="w-8 h-8" style={{ color: '#ef4444' }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Invalid Reset Link</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>This password reset link is invalid or has expired.</p>
//           <Link href="/forgot-password"
//             className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//             style={{ background: '#fff', color: '#080810' }}>
//             Request New Link
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (reset) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
//         <style>{fontImport}</style>
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
//         <div className="max-w-md w-full rounded-2xl p-8 text-center border relative z-10" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//             <CheckCircle className="w-8 h-8" style={{ color: T.accent }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Password Reset!</h1>
//           <p className="text-sm mb-4" style={{ color: T.textMuted }}>Your password has been updated successfully.</p>
//           <p className="text-xs mb-6" style={{ color: T.textDim }}>Redirecting to login in {countdown}s…</p>
//           <Link href="/login"
//             className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//             style={{ background: '#fff', color: '#080810' }}>
//             Sign in now <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
//       <style>{fontImport}</style>
//       <Toaster position="top-right" />

//       <div className="absolute inset-0 pointer-events-none"
//         style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
//       <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

//       <div className="max-w-md w-full relative z-10">
//         {/* Logo */}
//         <div className="flex items-center gap-2.5 mb-8">
//           <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//             style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
//             <span className="text-white/80 font-bold text-sm">F</span>
//           </div>
//           <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
//         </div>

//         <div className="rounded-2xl p-8 border" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
//             style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//             <Lock className="w-6 h-6" style={{ color: T.accent }} />
//           </div>

//           <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
//             style={{ fontFamily: "'DM Serif Display', serif" }}>Reset Password</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>
//             Create a new password for your account.
//           </p>

//           {error && (
//             <div className="mb-5 px-4 py-3 rounded-xl text-sm"
//               style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* New password */}
//             <div className="space-y-2">
//               <div className="space-y-1.5">
//                 <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
//                     style={{ color: focused === 'pw' ? T.accent : 'rgba(255,255,255,0.2)' }} />
//                   <input type={showPassword ? 'text' : 'password'} value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     onFocus={() => setFocused('pw')} onBlur={() => setFocused(null)}
//                     placeholder="Min. 6 characters" required disabled={loading}
//                     className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
//                     style={{
//                       background: focused === 'pw' ? 'rgba(52,211,153,0.03)' : T.inputBg,
//                       border: `1px solid ${focused === 'pw' ? T.accentBorder : T.cardBorder}`,
//                       color: 'rgba(255,255,255,0.88)',
//                       boxShadow: focused === 'pw' ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
//                       caretColor: T.accent,
//                     }} />
//                   <button type="button" onClick={() => setShowPassword(p => !p)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
//                     style={{ color: 'rgba(255,255,255,0.22)' }}
//                     onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
//                     onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//               {password && strengthMeta[strength] && (
//                 <div className="space-y-1">
//                   <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
//                     <div className={`h-full rounded-full transition-all duration-300 ${strengthMeta[strength]!.w}`}
//                       style={{ background: strengthMeta[strength]!.color }} />
//                   </div>
//                   <p className="text-[10px] pl-0.5 font-medium" style={{ color: strengthMeta[strength]!.color }}>
//                     {strengthMeta[strength]!.text} password
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Confirm password */}
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
//                   style={{ color: focused === 'confirm' ? T.accent : 'rgba(255,255,255,0.2)' }} />
//                 <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
//                   onChange={e => setConfirmPassword(e.target.value)}
//                   onFocus={() => setFocused('confirm')} onBlur={() => setFocused(null)}
//                   placeholder="Repeat your password" required disabled={loading}
//                   className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
//                   style={{
//                     background: focused === 'confirm' ? 'rgba(52,211,153,0.03)' : T.inputBg,
//                     border: `1px solid ${focused === 'confirm' ? T.accentBorder : confirmPassword && password !== confirmPassword ? 'rgba(239,68,68,0.3)' : T.cardBorder}`,
//                     color: 'rgba(255,255,255,0.88)',
//                     boxShadow: focused === 'confirm' ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
//                     caretColor: T.accent,
//                   }} />
//                 <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
//                   style={{ color: 'rgba(255,255,255,0.22)' }}
//                   onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
//                   onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
//                   {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <div className="pt-1">
//               <button type="submit" disabled={loading}
//                 className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
//                 style={{
//                   background: loading ? T.accentBg : '#fff',
//                   color: loading ? T.accent : '#080810',
//                   boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
//                   border: loading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
//                 }}>
//                 {loading
//                   ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
//                       style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Resetting…</span></>
//                   : <><Lock className="w-4 h-4" /><span>Reset Password</span></>}
//               </button>
//             </div>
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













// app/(auth)/reset-password/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { theme } from '@/lib/theme';

// Password strength checker
const checkPasswordStrength = (password: string): { score: number; text: string; color: string } => {
  if (!password) return { score: 0, text: '', color: '' };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;
  
  if (score <= 2) return { score: 1, text: 'Weak', color: '#ef4444' };
  if (score <= 4) return { score: 2, text: 'Medium', color: '#f59e0b' };
  return { score: 3, text: 'Strong', color: theme.colors.accent };
};

// Password validation
const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password || password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain an uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain a lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain a number' };
  }
  return { isValid: true };
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [countdown, setCountdown] = useState(5);
  const [focused, setFocused] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      setError('Invalid reset link');
    } else {
      setIsValidating(false);
    }
  }, [token]);

  // Password strength
  const strength = checkPasswordStrength(password);
  const passwordValidation = validatePassword(password);
  const isConfirmValid = touched.confirm && password === confirmPassword;
  const isConfirmInvalid = touched.confirm && password !== confirmPassword && confirmPassword.length > 0;

  // Auto redirect countdown
  useEffect(() => {
    if (reset && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (reset && countdown === 0) {
      router.push('/login');
    }
  }, [reset, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ password: true, confirm: true });

    // Validate password
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      
      if (data.success) {
        setReset(true);
        showToast.success('Password reset successfully!');
      } else {
        // Generic error message for security
        setError('Unable to reset password. Please request a new link.');
        showToast.error('Unable to reset password');
      }
    } catch {
      setError('Network error. Please try again.');
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while validating token
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: theme.colors.bg }}>
        <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Invalid token screen
  if (!token || error === 'Invalid reset link') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.colors.bg, fontFamily: theme.fonts.primary }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
        <div className="max-w-md w-full rounded-2xl p-8 text-center border" style={{ background: theme.colors.cardBg, borderColor: theme.colors.cardBorder }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle className="w-8 h-8" style={{ color: '#ef4444' }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: theme.fonts.display }}>Invalid Reset Link</h1>
          <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>This password reset link is invalid or has expired.</p>
          <Link href="/forgot-password"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  // Success screen
  if (reset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.colors.bg, fontFamily: theme.fonts.primary }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${theme.colors.accentGlow} 0%, transparent 60%)` }} />
        <div className="max-w-md w-full rounded-2xl p-8 text-center border relative z-10" style={{ background: theme.colors.cardBg, borderColor: theme.colors.cardBorder }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300"
            style={{ background: theme.colors.accentBg, border: `1px solid ${theme.colors.accentBorder}` }}>
            <CheckCircle className="w-8 h-8" style={{ color: theme.colors.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: theme.fonts.display }}>Password Reset!</h1>
          <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>Your password has been updated successfully.</p>
          <p className="text-xs mb-6" style={{ color: theme.colors.textDim }}>Redirecting to login in {countdown}s…</p>
          <Link href="/login"
            className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Sign in now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.colors.bg, fontFamily: theme.fonts.primary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        input::placeholder { color: rgba(255,255,255,0.18); }
        .animate-in { animation-duration: 0.3s; animation-fill-mode: both; }
        .zoom-in { animation-name: zoomIn; }
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
        {/* Logo - ✅ QuizForge branding */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${theme.colors.accent}30` }}>
            <span className="text-emerald-400 font-bold text-sm">Q</span>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">QuizForge</span>
        </div>

        <div className="rounded-2xl p-8 border" style={{ background: theme.colors.cardBg, borderColor: theme.colors.cardBorder }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ background: theme.colors.accentBg, border: `1px solid ${theme.colors.accentBorder}` }}>
            <Lock className="w-6 h-6" style={{ color: theme.colors.accent }} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: theme.fonts.display }}>Reset Password</h1>
          <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>
            Create a new password for your account.
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm animate-in slide-in-from-right"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div className="space-y-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.colors.textDim }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                    style={{ color: focused === 'pw' ? theme.colors.accent : 'rgba(255,255,255,0.2)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    onFocus={() => setFocused('pw')} 
                    onBlur={() => {
                      setFocused(null);
                      setTouched(prev => ({ ...prev, password: true }));
                    }}
                    placeholder="Min. 8 characters" 
                    required 
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: focused === 'pw' ? `${theme.colors.accent}08` : theme.colors.inputBg,
                      border: `1px solid ${focused === 'pw' 
                        ? theme.colors.accentBorder 
                        : touched.password && !passwordValidation.isValid && password 
                          ? 'rgba(239,68,68,0.3)' 
                          : theme.colors.cardBorder}`,
                      color: 'rgba(255,255,255,0.88)',
                      boxShadow: focused === 'pw' ? theme.colors.focusShadow : 'none',
                      caretColor: theme.colors.accent,
                    }} />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {/* Password strength indicator */}
              {password && strength.score > 0 && (
                <div className="space-y-1">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className={`h-full rounded-full transition-all duration-300`}
                      style={{ 
                        width: `${(strength.score / 3) * 100}%`, 
                        background: strength.color 
                      }} />
                  </div>
                  <p className="text-[10px] pl-0.5 font-medium" style={{ color: strength.color }}>
                    {strength.text} password
                  </p>
                  <p className="text-[9px]" style={{ color: theme.colors.textDim }}>
                    Use 8+ chars, uppercase, lowercase & number
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.colors.textDim }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                  style={{ color: focused === 'confirm' ? theme.colors.accent : 'rgba(255,255,255,0.2)' }} />
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  onFocus={() => setFocused('confirm')} 
                  onBlur={() => {
                    setFocused(null);
                    setTouched(prev => ({ ...prev, confirm: true }));
                  }}
                  placeholder="Repeat your password" 
                  required 
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: focused === 'confirm' ? `${theme.colors.accent}08` : theme.colors.inputBg,
                    border: `1px solid ${focused === 'confirm' 
                      ? theme.colors.accentBorder 
                      : isConfirmInvalid 
                        ? 'rgba(239,68,68,0.3)' 
                        : isConfirmValid 
                          ? `${theme.colors.accent}40`
                          : theme.colors.cardBorder}`,
                    color: 'rgba(255,255,255,0.88)',
                    boxShadow: focused === 'confirm' ? theme.colors.focusShadow : 'none',
                    caretColor: theme.colors.accent,
                  }} />
                <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isConfirmInvalid && (
                <p className="text-[10px] pl-1" style={{ color: '#ef4444' }}>Passwords do not match</p>
              )}
              {isConfirmValid && confirmPassword && (
                <p className="text-[10px] pl-1" style={{ color: theme.colors.accent }}>✓ Passwords match</p>
              )}
            </div>

            <div className="pt-1">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: loading ? theme.colors.accentBg : '#fff',
                  color: loading ? theme.colors.accent : '#080810',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
                  border: loading ? `1px solid ${theme.colors.accentBorder}` : '1px solid transparent',
                }}>
                {loading
                  ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: `${theme.colors.accent}30`, borderTopColor: theme.colors.accent }} /><span>Resetting password...</span></>
                  : <><Lock className="w-4 h-4" /><span>Reset Password</span></>}
              </button>
            </div>
          </form>

          {/* Secondary link */}
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
      </div>
    </div>
  );
}