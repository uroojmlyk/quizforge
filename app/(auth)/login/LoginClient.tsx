

// // app/(auth)/login/LoginClient.tsx (Client Component)
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

// // ============================================
// // Premium Design Tokens - 8pt Grid System
// // spacing: consistent 8, 12, 16, 20, 24, 32, 40, 48, 64
// // typography opacity: Primary 90%, Secondary 60%, Muted 40%
// // ============================================

// // ============================================
// // Premium Auth Input Component
// // ============================================
// interface AuthInputProps {
//   label: string;
//   icon: React.ElementType;
//   type: string;
//   value: string;
//   placeholder: string;
//   autoComplete?: string;
//   disabled?: boolean;
//   error?: string;
//   rightSlot?: React.ReactNode;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// function AuthInput({
//   label,
//   icon: Icon,
//   type,
//   value,
//   placeholder,
//   autoComplete,
//   disabled,
//   error,
//   rightSlot,
//   onChange,
// }: AuthInputProps) {
//   const inputId = label.toLowerCase().replace(/\s+/g, '-');

//   return (
//     <div className="space-y-2">
//       <label htmlFor={inputId} className="block text-xs font-medium tracking-wide text-white/60">
//         {label}
//       </label>
//       <div className="relative group">
//         <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-all duration-200 group-focus-within:text-emerald-400" />
//         <input
//           id={inputId}
//           type={type}
//           value={value}
//           placeholder={placeholder}
//           autoComplete={autoComplete}
//           disabled={disabled}
//           onChange={onChange}
//           className={`
//             w-full pl-10 pr-10 py-2.5 rounded-xl text-[15px] outline-none transition-all duration-200
//             bg-white/5 border focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/25 focus:shadow-[0_0_0_1px_rgba(52,211,153,0.1)]
//             disabled:opacity-50 disabled:cursor-not-allowed
//             placeholder:text-white/20
//             ${error ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10'}
//           `}
//           style={{ color: 'rgba(255,255,255,0.92)' }}
//         />
//         {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
//       </div>
//       {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
//     </div>
//   );
// }

// // ============================================
// // Premium Brand Panel - Balanced Layout
// // ============================================
// function BrandPanel() {
//   return (
//     <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-[#0a0a12]">
//       {/* Premium ambient glow - subtle depth */}
//       <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-400/6 blur-[120px]" />
//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-400/3 blur-[100px]" />
      
//       {/* Subtle grid pattern */}
//       <div className="absolute inset-0 opacity-[0.008] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />

//       {/* Logo Section - Restored for balance */}
//       <div className="relative z-10">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg ring-1 ring-white/15">
//             <span className="text-white font-bold text-base">Q</span>
//           </div>
//           <div>
//             <span className="text-white font-semibold text-xl tracking-tight">QuizForge</span>
//             <p className="text-[10px] text-white/25 tracking-wide mt-0.5">Platform v2</p>
//           </div>
//         </div>
//       </div>

//       {/* Hero Message - Product Storytelling */}
//       <div className="relative z-10 space-y-10 py-10">
//         <div>
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-[10px] text-white/50 font-medium tracking-wide">AI Platform</span>
//           </div>
//           <h2 className="text-3xl font-bold leading-tight mb-4 font-['DM_Serif_Display'] text-white/90">
//             Welcome back to<br />
//             <span className="text-emerald-400">smarter assessments</span>
//           </h2>
//           <p className="text-sm leading-relaxed max-w-xs text-white/40">
//             Create, share, and analyze quizzes with AI — all in one platform.
//           </p>
//         </div>
        
//         {/* Feature Highlights */}
//         <div className="space-y-4 pt-2">
//           {[
//             'AI-powered question generation',
//             'Real-time performance analytics',
//             'Instant auto-grading & feedback'
//           ].map((feature) => (
//             <div key={feature} className="flex items-center gap-3 group">
//               <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-400/10 border border-emerald-400/20 transition-all duration-200 group-hover:scale-110 group-hover:bg-emerald-400/20">
//                 <CheckCircle2 className="w-3 h-3 text-emerald-400" />
//               </div>
//               <p className="text-xs text-white/30 group-hover:text-white/50 transition-colors">{feature}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Inspirational Quote */}
//       <div className="relative z-10 pl-4 border-l-2 border-emerald-400/25">
//         <p className="text-xs italic leading-relaxed text-white/25">
//           "The beautiful thing about learning is<br />that no one can take it away from you."
//         </p>
//         <p className="text-[10px] mt-2 text-white/15">— B.B. King</p>
//       </div>
//     </div>
//   );
// }

// // ============================================
// // Main Login Client Component
// // ============================================
// export default function LoginClient() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ email: '', password: '', general: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // ===== SAME VALIDATION - NO CHANGES =====
//   const validate = () => {
//     const e = { email: '', password: '', general: '' };
//     let ok = true;
//     if (!form.email.trim()) { e.email = 'Email is required'; ok = false; }
//     else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; ok = false; }
//     if (!form.password) { e.password = 'Password is required'; ok = false; }
//     setErrors(e);
//     return ok;
//   };

//   // ===== SAME API CALL - NO CHANGES =====
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setIsLoading(true);
//     setErrors(prev => ({ ...prev, general: '' }));
//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email, password: form.password }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         localStorage.setItem('token', data.token || 'token');
//         localStorage.setItem('user', JSON.stringify(data.user));
//         const role = data.user.role?.toLowerCase().trim();
//         if (role === 'admin') router.push('/admin');
//         else if (role === 'teacher') router.push('/teacher/dashboard');
//         else router.push('/dashboard');
//       } else {
//         setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
//         setIsLoading(false);
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
//       setIsLoading(false);
//     }
//   };

//   // ===== Password Toggle Button =====
//   const handleTogglePassword = () => setShowPassword(prev => !prev);

//   return (
//     <div className="min-h-screen flex bg-[#080810] font-['DM_Sans',system-ui]">
//       <BrandPanel />

//       {/* Right side - Login Form with Premium Card Container */}
//       <main className="flex-1 flex items-center justify-center px-6 py-12">
//         <div className="w-full max-w-[420px]">
//           {/* Premium Glass Card Container */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/20">
            
//             {/* Header Section */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
//                 <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//                 <span className="text-[10px] text-white/50 font-medium tracking-wide">Secure Access</span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-['DM_Serif_Display'] text-white/90">
//                 Sign in to <span className="text-emerald-400">QuizForge</span>
//               </h1>
//               <p className="text-sm text-white/40">Access your dashboard and continue creating</p>
//             </div>

//             {/* General Error Message */}
//             {errors.general && (
//               <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center border border-red-500/30 text-red-400 animate-in fade-in slide-in-from-right bg-red-500/5">
//                 {errors.general}
//               </div>
//             )}

//             {/* Login Form - Consistent spacing (16px between elements) */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <AuthInput
//                 label="Email address"
//                 icon={Mail}
//                 type="email"
//                 value={form.email}
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 disabled={isLoading}
//                 error={errors.email}
//                 onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
//               />

//               <div className="space-y-2">
//                 <AuthInput
//                   label="Password"
//                   icon={Lock}
//                   type={showPassword ? 'text' : 'password'}
//                   value={form.password}
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   disabled={isLoading}
//                   error={errors.password}
//                   rightSlot={
//                     <button
//                       type="button"
//                       onClick={handleTogglePassword}
//                       className="transition-all duration-200 p-1 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 text-white/35 hover:text-emerald-400"
//                       aria-label={showPassword ? 'Hide password' : 'Show password'}
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   }
//                   onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
//                 />
//                 <div className="flex justify-end">
//                   <Link
//                     href="/forgot-password"
//                     className="text-xs font-medium transition-all duration-200 hover:underline text-white/40 hover:text-emerald-400"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>

//               {/* Premium CTA Button with depth + glow */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="group relative w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 bg-white text-[#080810] hover:bg-white/95 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
//               >
//                 {/* Subtle glow effect on hover */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/20 to-transparent pointer-events-none" />
                
//                 {isLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
//                     <span>Signing in...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign in to QuizForge</span>
//                     <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full h-px bg-white/8" />
//               </div>
//               <div className="relative flex justify-center text-xs">
//                 <span className="px-3 bg-transparent text-white/30">or continue with</span>
//               </div>
//             </div>

//             {/* Premium Social Login Buttons */}
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { 
//                   label: 'Google', 
//                   icon: (
//                     <svg className="w-4 h-4" viewBox="0 0 24 24">
//                       <path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" />
//                       <path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" />
//                       <path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" />
//                       <path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" />
//                     </svg>
//                   )
//                 },
//                 { 
//                   label: 'GitHub', 
//                   icon: (
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
//                     </svg>
//                   )
//                 },
//               ].map((provider) => (
//                 <button
//                   key={provider.label}
//                   type="button"
//                   className="group relative flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm transition-all duration-200 bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white/60 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
//                 >
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/10 to-transparent pointer-events-none" />
//                   <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all">
//                     {provider.icon}
//                   </div>
//                   {provider.label}
//                 </button>
//               ))}
//             </div>

//             {/* Sign Up Link */}
//             <p className="text-center text-sm mt-8 text-white/30">
//               Don't have an account?{' '}
//               <Link
//                 href="/signup"
//                 className="font-semibold transition-all duration-200 hover:underline text-emerald-400 hover:text-emerald-300"
//               >
//                 Create free account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────
const C = {
  bg: '#080810',
  surface: '#0d0d16',
  card: '#0f0f1a',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.2)',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(52,211,153,0.4)',
  text: {
    primary: 'rgba(255,255,255,0.92)',
    secondary: 'rgba(255,255,255,0.55)',
    muted: 'rgba(255,255,255,0.35)',
    dim: 'rgba(255,255,255,0.2)',
  },
  error: { text: '#f87171', bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.2)' },
};

// ── Auth input ────────────────────────────────────────────────────
interface AuthInputProps {
  label: string;
  icon: React.ElementType;
  type: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  disabled?: boolean;
  error?: string;
  rightSlot?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AuthInput({ label, icon: Icon, type, value, placeholder, autoComplete, disabled, error, rightSlot, onChange }: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-[11px] font-medium uppercase tracking-wider"
        style={{ color: C.text.muted }}>
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200"
          style={{ color: focused ? C.accent : error ? '#f87171' : C.text.dim }} />
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? C.error.border : focused ? C.borderFocus : C.border}`,
            color: C.text.primary,
            boxShadow: focused ? `0 0 0 3px ${C.accentBg}` : 'none',
          }}
        />
        {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p className="text-xs pl-1" style={{ color: C.error.text }}>{error}</p>}
    </div>
  );
}

// ── Brand panel ───────────────────────────────────────────────────
function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-12 overflow-hidden"
      style={{ background: C.surface }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full blur-[100px]"
        style={{ background: 'rgba(52,211,153,0.06)' }} />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full blur-[80px]"
        style={{ background: 'rgba(52,211,153,0.04)' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
          <span className="font-bold text-sm" style={{ color: C.accent }}>Q</span>
        </div>
        <div>
          <span className="font-semibold text-white text-base tracking-tight">QuizForge</span>
          <p className="text-[10px] mt-0.5" style={{ color: C.text.dim }}>Platform v2</p>
        </div>
      </div>

      {/* Hero message */}
      <div className="relative z-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
            <Sparkles className="w-3 h-3" style={{ color: C.accent }} />
            <span className="text-[10px] font-medium tracking-wide" style={{ color: C.accent }}>AI-Powered Platform</span>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-3 text-white"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Welcome back to<br />
            <span style={{ color: C.accent }}>smarter assessments</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.text.muted }}>
            Create, share, and analyze quizzes with AI — all in one platform built for modern educators.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3.5">
          {['AI-powered question generation', 'Real-time performance analytics', 'Instant auto-grading & feedback'].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
                <CheckCircle2 className="w-3 h-3" style={{ color: C.accent }} />
              </div>
              <p className="text-xs" style={{ color: C.text.muted }}>{f}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 pt-2">
          {[['Free', 'Plan available'], ['Unlimited', 'Quizzes'], ['4.9★', 'User rating']].map(([v, l]) => (
            <div key={l} className="flex-1 rounded-xl px-3 py-2.5 text-center"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.border}` }}>
              <p className="text-sm font-bold text-white">{v}</p>
              <p className="text-[10px] mt-0.5" style={{ color: C.text.dim }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 pl-4 border-l-2" style={{ borderColor: `${C.accent}33` }}>
        <p className="text-xs italic leading-relaxed" style={{ color: C.text.dim }}>
          "The beautiful thing about learning is that no one can take it away from you."
        </p>
        <p className="text-[10px] mt-1.5" style={{ color: 'rgba(255,255,255,0.15)' }}>— B.B. King</p>
      </div>
    </div>
  );
}

// ── Main login component ──────────────────────────────────────────
export default function LoginClient() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Logic untouched ──────────────────────────────────────────────
  const validate = () => {
    const e = { email: '', password: '', general: '' };
    let ok = true;
    if (!form.email.trim()) { e.email = 'Email is required'; ok = false; }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; ok = false; }
    if (!form.password) { e.password = 'Password is required'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('token', data.token || 'token');
        localStorage.setItem('user', JSON.stringify(data.user));
        const role = data.user.role?.toLowerCase().trim();
        if (role === 'admin') router.push('/admin');
        else if (role === 'teacher') router.push('/teacher/dashboard');
        else router.push('/dashboard');
      } else {
        setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
        setIsLoading(false);
      }
    } catch {
      setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => setShowPassword(prev => !prev);
  // ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex" style={{ background: C.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <BrandPanel />

      {/* Right: form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Subtle top-right glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(52,211,153,0.04)' }} />

        <div className="w-full max-w-[400px] relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
              <span className="font-bold text-sm" style={{ color: C.accent }}>Q</span>
            </div>
            <span className="font-semibold text-white">QuizForge</span>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8 border" style={{ background: C.card, borderColor: C.border }}>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
                <Sparkles className="w-3 h-3" style={{ color: C.accent }} />
                <span className="text-[10px] font-medium tracking-wide" style={{ color: C.accent }}>Secure Access</span>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Sign in to <span style={{ color: C.accent }}>QuizForge</span>
              </h1>
              <p className="text-sm" style={{ color: C.text.muted }}>Access your dashboard and continue creating</p>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm text-center border"
                style={{ background: C.error.bg, borderColor: C.error.border, color: C.error.text }}>
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Email address"
                icon={Mail}
                type="email"
                value={form.email}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isLoading}
                error={errors.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />

              <div className="space-y-1.5">
                <AuthInput
                  label="Password"
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  error={errors.password}
                  rightSlot={
                    <button type="button" onClick={handleTogglePassword}
                      className="p-1 rounded-lg transition-colors"
                      style={{ color: C.text.dim }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.accent}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.text.dim}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                />
                <div className="flex justify-end pt-0.5">
                  <Link href="/forgot-password"
                    className="text-xs transition-colors"
                    style={{ color: C.text.dim }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.accent}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.text.dim}>
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{ background: '#fff', color: '#080810' }}
                onMouseEnter={e => !isLoading && ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.92)')}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: 'rgba(0,0,0,0.15)', borderTopColor: '#080810' }} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to QuizForge</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px" style={{ background: C.border }} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs" style={{ background: C.card, color: C.text.dim }}>
                  or continue with
                </span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'Google',
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" />
                      <path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" />
                      <path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" />
                      <path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" />
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border, color: C.text.muted }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.text.muted; }}>
                  {p.icon}
                  {p.label}
                </button>
              ))}
            </div>

            {/* Signup link */}
            <p className="text-center text-sm mt-7" style={{ color: C.text.dim }}>
              Don't have an account?{' '}
              <Link href="/signup"
                className="font-semibold transition-colors"
                style={{ color: C.accent }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#6ee7b7'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.accent}>
                Create free account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}