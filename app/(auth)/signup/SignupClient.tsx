

// // app/(auth)/signup/SignupClient.tsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle2, CheckCircle, Sparkles } from 'lucide-react';

// // ============================================
// // DESIGN SYSTEM - STRICT UNIFIED TOKENS
// // 8pt Grid | Single Accent | Clear Hierarchy
// // ============================================

// // Colors - Single source of truth
// const colors = {
//   bg: '#080810',
//   surface: '#0a0a12',
//   elevated: '#0f0f18',
//   accent: {
//     DEFAULT: '#34d399',
//     light: '#6ee7b7',
//     dark: '#10b981',
//     glow: 'rgba(52,211,153,0.15)',
//     border: 'rgba(52,211,153,0.25)',
//     focus: 'rgba(52,211,153,0.35)',
//   },
//   border: {
//     DEFAULT: 'rgba(255,255,255,0.08)',
//     light: 'rgba(255,255,255,0.05)',
//     hover: 'rgba(255,255,255,0.12)',
//   },
//   text: {
//     primary: 'rgba(255,255,255,0.92)',
//     secondary: 'rgba(255,255,255,0.55)',
//     tertiary: 'rgba(255,255,255,0.35)',
//     muted: 'rgba(255,255,255,0.2)',
//   },
//   error: {
//     DEFAULT: '#ef4444',
//     border: 'rgba(239,68,68,0.3)',
//     glow: 'rgba(239,68,68,0.1)',
//   },
// };

// // ============================================
// // UNIFIED COMPONENTS
// // ============================================

// interface InputProps {
//   label: string;
//   icon: React.ElementType;
//   type: string;
//   value: string;
//   placeholder: string;
//   autoComplete?: string;
//   disabled?: boolean;
//   error?: string;
//   isValid?: boolean | null;
//   rightSlot?: React.ReactNode;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// function Input({ label, icon: Icon, type, value, placeholder, autoComplete, disabled, error, isValid, rightSlot, onChange }: InputProps) {
//   const [isFocused, setIsFocused] = useState(false);
//   const id = label.toLowerCase().replace(/\s+/g, '-');

//   let borderClass = 'border-white/8 focus:border-emerald-400/40';
//   if (error) borderClass = 'border-red-500/30 focus:border-red-500/40';
//   if (isValid && value && !error) borderClass = 'border-emerald-400/25 focus:border-emerald-400/40';

//   return (
//     <div className="space-y-1.5">
//       <label htmlFor={id} className="block text-xs font-medium uppercase tracking-wide" style={{ color: colors.text.secondary }}>
//         {label}
//       </label>
//       <div className="relative group">
//         <Icon className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//           isFocused ? 'text-emerald-400' : error ? 'text-red-400' : 'text-white/25'
//         }`} />
//         <input
//           id={id}
//           type={type}
//           value={value}
//           placeholder={placeholder}
//           autoComplete={autoComplete}
//           disabled={disabled}
//           onChange={onChange}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl outline-none transition-all duration-200
//             bg-white/5 border disabled:opacity-50 disabled:cursor-not-allowed
//             placeholder:text-white/15
//             focus:ring-2 focus:ring-emerald-400/15
//             ${borderClass}`}
//           style={{ color: colors.text.primary }}
//         />
//         {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
//       </div>
//       {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
//     </div>
//   );
// }

// interface ButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   type?: 'button' | 'submit';
//   disabled?: boolean;
//   loading?: boolean;
//   variant?: 'primary' | 'secondary';
//   fullWidth?: boolean;
// }

// function Button({ children, onClick, type = 'button', disabled = false, loading = false, variant = 'primary', fullWidth = true }: ButtonProps) {
//   const baseClasses = `relative flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 
//     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
//     focus:outline-none focus:ring-2 focus:ring-emerald-400/30
//     ${fullWidth ? 'w-full' : 'px-6'}`;
  
//   const variants = {
//     primary: `bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0`,
//     secondary: `bg-white/5 border border-white/8 text-white/60 hover:bg-white/10 hover:text-white/80 hover:-translate-y-0.5 active:translate-y-0`,
//   };

//   return (
//     <button type={type} onClick={onClick} disabled={disabled || loading} className={`${baseClasses} ${variants[variant]}`}>
//       {loading ? (
//         <>
//           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//           <span>Processing...</span>
//         </>
//       ) : (
//         children
//       )}
//     </button>
//   );
// }

// // ============================================
// // BRAND PANEL WITH VISUAL SHOWCASE
// // ============================================
// function BrandPanel() {
//   return (
//     <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-8 overflow-hidden" style={{ background: colors.surface }}>
//       {/* Premium gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
      
//       {/* Decorative elements */}
//       <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-emerald-400/10 blur-[80px]" />
//       <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-emerald-400/5 blur-[60px]" />

//       {/* Logo */}
//       <div className="relative z-10 flex items-center gap-2.5">
//         <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
//           <span className="text-white font-bold text-sm">Q</span>
//         </div>
//         <span className="text-white font-semibold text-base tracking-tight">QuizForge</span>
//       </div>

//       {/* Dashboard Preview Image */}
//       <div className="relative z-10 mt-8">
//         <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
//           <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent opacity-60" />
//           <Image
//             src="/dashboard-preview.png"
//             alt="QuizForge Dashboard Preview"
//             width={500}
//             height={400}
//             className="w-full h-auto object-cover"
//             priority
//           />
//           {/* Premium overlay text */}
//           <div className="absolute bottom-4 left-4 right-4">
//             <div className="flex items-center gap-2 mb-2">
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               <span className="text-[10px] font-medium tracking-wide text-white/50">AI-Powered Analytics</span>
//             </div>
//             <p className="text-xs font-medium text-white/70">Create quizzes that students actually enjoy</p>
//           </div>
//         </div>
//       </div>

//       {/* Feature highlights */}
//       <div className="relative z-10 space-y-3 mt-6">
//         <div className="flex items-center gap-2.5">
//           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
//           <p className="text-xs" style={{ color: colors.text.tertiary }}>AI-powered question generation</p>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
//           <p className="text-xs" style={{ color: colors.text.tertiary }}>Real-time performance analytics</p>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
//           <p className="text-xs" style={{ color: colors.text.tertiary }}>Instant auto-grading & feedback</p>
//         </div>
//       </div>

//       {/* Quote */}
//       <div className="relative z-10 mt-6 pt-4 border-t border-white/8">
//         <p className="text-[11px] italic leading-relaxed" style={{ color: colors.text.muted }}>
//           "The beautiful thing about learning is that no one can take it away from you."
//         </p>
//         <p className="text-[10px] mt-1.5" style={{ color: 'rgba(255,255,255,0.12)' }}>— B.B. King</p>
//       </div>
//     </div>
//   );
// }

// // ============================================
// // MAIN SIGNUP COMPONENT
// // ============================================
// export default function SignupClient() {
//   const router = useRouter();
//   const nameInputRef = useRef<HTMLInputElement>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [form, setForm] = useState({
//     name: '', email: '', password: '', confirmPassword: '',
//     role: 'student' as 'student' | 'teacher',
//   });

//   const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//   const [validation, setValidation] = useState({
//     name: null as boolean | null,
//     email: null as boolean | null,
//     password: null as boolean | null,
//     confirmPassword: null as boolean | null,
//   });

//   useEffect(() => {
//     nameInputRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     setValidation({
//       name: form.name.length > 0 ? form.name.trim().length >= 2 : null,
//       email: form.email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) : null,
//       password: form.password.length > 0 ? form.password.length >= 8 && /\d/.test(form.password) && /[!@#$%^&*]/.test(form.password) : null,
//       confirmPassword: form.confirmPassword.length > 0 ? form.password === form.confirmPassword && form.password.length > 0 : null,
//     });
//   }, [form]);

//   const validateForm = () => {
//     const e = { name: '', email: '', password: '', confirmPassword: '' };
//     let valid = true;
//     if (!form.name.trim()) { e.name = 'Name is required'; valid = false; }
//     else if (form.name.trim().length < 2) { e.name = 'Name must be at least 2 characters'; valid = false; }
//     if (!form.email.trim()) { e.email = 'Email is required'; valid = false; }
//     else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; valid = false; }
//     if (!form.password) { e.password = 'Password is required'; valid = false; }
//     else if (form.password.length < 8) { e.password = 'Minimum 8 characters'; valid = false; }
//     else if (!/\d/.test(form.password)) { e.password = 'Must contain at least one number'; valid = false; }
//     else if (!/[!@#$%^&*]/.test(form.password)) { e.password = 'Must contain a special character (!@#$%^&*)'; valid = false; }
//     if (form.password !== form.confirmPassword) { e.confirmPassword = 'Passwords do not match'; valid = false; }
//     setErrors(e);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const res = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSuccess(true);
//         const loginRes = await fetch('/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: form.email, password: form.password }),
//         });
//         const loginData = await loginRes.json();
//         if (loginRes.ok && loginData.success) {
//           localStorage.setItem('quizforge_token', loginData.token || 'dummy-token');
//           localStorage.setItem('quizforge_user', JSON.stringify(loginData.user));

//           const pendingPlanStr = sessionStorage.getItem('pendingPlan');
//           if (pendingPlanStr) {
//             sessionStorage.removeItem('pendingPlan');
//             const { plan, billingPeriod } = JSON.parse(pendingPlanStr);
//             const checkoutRes = await fetch('/api/create-checkout-session', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ plan, billingPeriod, userId: loginData.user.id, email: loginData.user.email }),
//             });
//             const checkoutData = await checkoutRes.json();
//             if (checkoutData.url) {
//               window.location.href = checkoutData.url;
//               return;
//             }
//           }
//           setTimeout(() => router.push(loginData.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard'), 900);
//         }
//       } else {
//         setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
//         setLoading(false);
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, email: 'Network error. Try again.' }));
//       setLoading(false);
//     }
//   };

//   const getPasswordStrength = () => {
//     if (!form.password) return null;
//     const s = [form.password.length >= 8, /\d/.test(form.password), /[!@#$%^&*]/.test(form.password)].filter(Boolean).length;
//     if (s === 3) return { text: 'Strong', width: '100%', color: '#34d399' };
//     if (s === 2) return { text: 'Medium', width: '66%', color: '#f59e0b' };
//     return { text: 'Weak', width: '33%', color: '#ef4444' };
//   };
//   const strength = getPasswordStrength();

//   const togglePassword = () => setShowPassword(prev => !prev);
//   const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

//   const EyeButton = (show: boolean, toggle: () => void) => (
//     <button type="button" onClick={toggle} className="transition-colors p-1 rounded-lg hover:bg-white/5 text-white/25 hover:text-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/30">
//       {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//     </button>
//   );

//   return (
//     <div className="min-h-screen flex bg-bg" style={{ background: colors.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
//       <BrandPanel />

//       <main className="flex-1 flex items-center justify-center px-6 py-12">
//         <div className="w-full max-w-[400px]">
//           <div className="p-8 rounded-2xl bg-elevated border border-white/8 shadow-2xl" style={{ background: colors.elevated }}>
            
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 mb-6">
//                 <Sparkles className="w-3 h-3 text-emerald-400" />
//                 <span className="text-[10px] font-medium tracking-wide" style={{ color: colors.text.tertiary }}>Get started</span>
//               </div>
//               <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: colors.text.primary }}>
//                 Create your account
//               </h1>
//               <p className="text-sm" style={{ color: colors.text.tertiary }}>Start creating AI-powered quizzes in minutes</p>
//             </div>

//             {success && (
//               <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center border border-emerald-400/30 bg-emerald-400/5 text-emerald-400">
//                 <CheckCircle className="w-4 h-4 inline mr-2" /> Account created! Redirecting...
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <Input
//                 ref={nameInputRef}
//                 label="FULL NAME"
//                 icon={User}
//                 type="text"
//                 value={form.name}
//                 placeholder="Your name"
//                 disabled={loading || success}
//                 error={errors.name}
//                 isValid={validation.name === true}
//                 onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
//               />

//               <Input
//                 label="EMAIL ADDRESS"
//                 icon={Mail}
//                 type="email"
//                 value={form.email}
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 disabled={loading || success}
//                 error={errors.email}
//                 isValid={validation.email === true}
//                 onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
//               />

//               <div className="space-y-2">
//                 <Input
//                   label="PASSWORD"
//                   icon={Lock}
//                   type={showPassword ? 'text' : 'password'}
//                   value={form.password}
//                   placeholder="Create a strong password"
//                   disabled={loading || success}
//                   error={errors.password}
//                   isValid={validation.password === true}
//                   rightSlot={EyeButton(showPassword, togglePassword)}
//                   onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
//                 />
//                 {strength && (
//                   <>
//                     <div className="h-1 rounded-full overflow-hidden bg-white/10">
//                       <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, background: strength.color }} />
//                     </div>
//                     <p className="text-[10px] uppercase tracking-wide" style={{ color: colors.text.muted }}>{strength.text}</p>
//                   </>
//                 )}
//               </div>

//               <Input
//                 label="CONFIRM PASSWORD"
//                 icon={Lock}
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={form.confirmPassword}
//                 placeholder="Repeat your password"
//                 disabled={loading || success}
//                 error={errors.confirmPassword}
//                 isValid={validation.confirmPassword === true}
//                 rightSlot={EyeButton(showConfirmPassword, toggleConfirmPassword)}
//                 onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
//               />

//               <div className="space-y-2">
//                 <label className="block text-xs font-medium uppercase tracking-wide" style={{ color: colors.text.secondary }}>I AM A</label>
//                 <div className="grid grid-cols-2 gap-3">
//                   {(['student', 'teacher'] as const).map((role) => (
//                     <button
//                       key={role}
//                       type="button"
//                       onClick={() => setForm(prev => ({ ...prev, role }))}
//                       className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 capitalize
//                         ${form.role === role 
//                           ? 'bg-emerald-400/10 border border-emerald-400/30 text-emerald-400' 
//                           : 'bg-white/5 border border-white/8 text-white/40 hover:bg-white/10 hover:border-white/12'
//                         }`}
//                     >
//                       {role === 'student' ? '🎓 Student' : '📚 Teacher'}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <Button type="submit" loading={loading} variant="primary" fullWidth>
//                 <span>Create account</span>
//                 <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
//               </Button>
//             </form>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full h-px bg-white/8" />
//               </div>
//               <div className="relative flex justify-center text-xs">
//                 <span className="px-3 bg-elevated" style={{ color: colors.text.muted, background: colors.elevated }}>or continue with</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Google', icon: (
//                   <svg className="w-4 h-4" viewBox="0 0 24 24">
//                     <path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" />
//                     <path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" />
//                     <path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" />
//                     <path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" />
//                   </svg>
//                 ) },
//                 { label: 'GitHub', icon: (
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
//                   </svg>
//                 ) },
//               ].map((provider) => (
//                 <Button key={provider.label} variant="secondary">
//                   {provider.icon}
//                   {provider.label}
//                 </Button>
//               ))}
//             </div>

//             <p className="text-center text-sm mt-6" style={{ color: colors.text.muted }}>
//               Already have an account?{' '}
//               <Link href="/login" className="font-semibold transition-all duration-200 text-emerald-400 hover:text-emerald-300">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }










// app/(auth)/signup/SignupClient.tsx
'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle2, CheckCircle, Sparkles } from 'lucide-react';

// ── Design tokens — same as login ────────────────────────────────
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

// ── Input component — forwardRef to fix nameInputRef TS error ────
interface InputProps {
  label: string;
  icon: React.ElementType;
  type: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  disabled?: boolean;
  error?: string;
  isValid?: boolean | null;
  rightSlot?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, type, value, placeholder, autoComplete, disabled, error, isValid, rightSlot, onChange }, ref) => {
    const [focused, setFocused] = useState(false);
    const id = label.toLowerCase().replace(/\s+/g, '-');

    const borderColor = error
      ? C.error.border
      : focused
      ? C.borderFocus
      : isValid && value && !error
      ? 'rgba(52,211,153,0.25)'
      : C.border;

    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-[11px] font-medium uppercase tracking-wider"
          style={{ color: C.text.muted }}>
          {label}
        </label>
        <div className="relative">
          <Icon
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200"
            style={{ color: focused ? C.accent : error ? '#f87171' : C.text.dim }} />
          <input
            ref={ref}
            id={id}
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
              border: `1px solid ${borderColor}`,
              color: C.text.primary,
              boxShadow: focused ? `0 0 0 3px ${C.accentBg}` : 'none',
            }}
          />
          {/* Valid checkmark */}
          {isValid && value && !error && !rightSlot && (
            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: `${C.accent}80` }} />
          )}
          {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
        </div>
        {error && <p className="text-xs pl-1" style={{ color: C.error.text }}>{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ── Button component ──────────────────────────────────────────────
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

function Button({ children, onClick, type = 'button', disabled = false, loading = false, variant = 'primary', fullWidth = true }: ButtonProps) {
  const base = `relative flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : 'px-5'}`;

  if (variant === 'primary') {
    return (
      <button type={type} onClick={onClick} disabled={disabled || loading}
        className={base}
        style={{ background: C.accent, color: '#080810' }}
        onMouseEnter={e => !disabled && !loading && ((e.currentTarget as HTMLElement).style.background = '#2dd4a0')}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.accent}>
        {loading
          ? <><div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#080810' }} /><span>Processing...</span></>
          : children}
      </button>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className={base}
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, color: C.text.muted }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = C.text.secondary; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.color = C.text.muted; }}>
      {loading
        ? <><div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: `${C.text.dim}`, borderTopColor: C.text.secondary }} /><span>Processing...</span></>
        : children}
    </button>
  );
}

// ── Brand panel ───────────────────────────────────────────────────
function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-12 overflow-hidden"
      style={{ background: C.surface }}>
      <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full blur-[90px]"
        style={{ background: 'rgba(52,211,153,0.06)' }} />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full blur-[70px]"
        style={{ background: 'rgba(52,211,153,0.04)' }} />
      <div className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
          <span className="font-bold text-sm" style={{ color: C.accent }}>Q</span>
        </div>
        <span className="font-semibold text-white text-base tracking-tight">QuizForge</span>
      </div>

      {/* Hero */}
      <div className="relative z-10 space-y-7">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
            <Sparkles className="w-3 h-3" style={{ color: C.accent }} />
            <span className="text-[10px] font-medium tracking-wide" style={{ color: C.accent }}>Get started free</span>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-3 text-white"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Start creating<br />
            <span style={{ color: C.accent }}>smarter quizzes</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.text.muted }}>
            Join educators worldwide using AI to build engaging assessments in minutes, not hours.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
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

        {/* Trust signals */}
        <div className="flex items-center gap-3 pt-1">
          {[['🔒', 'Secure'], ['⚡', 'Instant'], ['🆓', 'Free plan']].map(([emoji, label]) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.border}` }}>
              <span className="text-sm">{emoji}</span>
              <span className="text-xs" style={{ color: C.text.dim }}>{label}</span>
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

// ── Main signup component ─────────────────────────────────────────
export default function SignupClient() {
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student' as 'student' | 'teacher',
  });

  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [validation, setValidation] = useState({
    name: null as boolean | null,
    email: null as boolean | null,
    password: null as boolean | null,
    confirmPassword: null as boolean | null,
  });

  // ── Logic untouched ──────────────────────────────────────────────
  useEffect(() => { nameInputRef.current?.focus(); }, []);

  useEffect(() => {
    setValidation({
      name: form.name.length > 0 ? form.name.trim().length >= 2 : null,
      email: form.email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) : null,
      password: form.password.length > 0 ? form.password.length >= 8 && /\d/.test(form.password) && /[!@#$%^&*]/.test(form.password) : null,
      confirmPassword: form.confirmPassword.length > 0 ? form.password === form.confirmPassword && form.password.length > 0 : null,
    });
  }, [form]);

  const validateForm = () => {
    const e = { name: '', email: '', password: '', confirmPassword: '' };
    let valid = true;
    if (!form.name.trim()) { e.name = 'Name is required'; valid = false; }
    else if (form.name.trim().length < 2) { e.name = 'Name must be at least 2 characters'; valid = false; }
    if (!form.email.trim()) { e.email = 'Email is required'; valid = false; }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; valid = false; }
    if (!form.password) { e.password = 'Password is required'; valid = false; }
    else if (form.password.length < 8) { e.password = 'Minimum 8 characters'; valid = false; }
    else if (!/\d/.test(form.password)) { e.password = 'Must contain at least one number'; valid = false; }
    else if (!/[!@#$%^&*]/.test(form.password)) { e.password = 'Must contain a special character (!@#$%^&*)'; valid = false; }
    if (form.password !== form.confirmPassword) { e.confirmPassword = 'Passwords do not match'; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.success) {
          localStorage.setItem('quizforge_token', loginData.token || 'dummy-token');
          localStorage.setItem('quizforge_user', JSON.stringify(loginData.user));
          const pendingPlanStr = sessionStorage.getItem('pendingPlan');
          if (pendingPlanStr) {
            sessionStorage.removeItem('pendingPlan');
            const { plan, billingPeriod } = JSON.parse(pendingPlanStr);
            const checkoutRes = await fetch('/api/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ plan, billingPeriod, userId: loginData.user.id, email: loginData.user.email }),
            });
            const checkoutData = await checkoutRes.json();
            if (checkoutData.url) { window.location.href = checkoutData.url; return; }
          }
          setTimeout(() => router.push(loginData.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard'), 900);
        }
      } else {
        setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
        setLoading(false);
      }
    } catch {
      setErrors(prev => ({ ...prev, email: 'Network error. Try again.' }));
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!form.password) return null;
    const s = [form.password.length >= 8, /\d/.test(form.password), /[!@#$%^&*]/.test(form.password)].filter(Boolean).length;
    if (s === 3) return { text: 'Strong', width: '100%', color: '#34d399' };
    if (s === 2) return { text: 'Medium', width: '66%', color: '#f59e0b' };
    return { text: 'Weak', width: '33%', color: '#f87171' };
  };
  const strength = getPasswordStrength();

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const EyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle}
      className="p-1 rounded-lg transition-colors"
      style={{ color: C.text.dim }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.accent}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.text.dim}>
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
  // ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex" style={{ background: C.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <BrandPanel />

      {/* Right: form */}
      <main className="flex-1 flex items-center justify-center px-6 py-10 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(52,211,153,0.04)' }} />

        <div className="w-full max-w-[400px] relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
              <span className="font-bold text-sm" style={{ color: C.accent }}>Q</span>
            </div>
            <span className="font-semibold text-white">QuizForge</span>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-7 border" style={{ background: C.card, borderColor: C.border }}>

            {/* Header */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}` }}>
                <Sparkles className="w-3 h-3" style={{ color: C.accent }} />
                <span className="text-[10px] font-medium tracking-wide" style={{ color: C.accent }}>Get started free</span>
              </div>
              <h1 className="text-2xl font-bold mb-1.5 text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Create your account
              </h1>
              <p className="text-sm" style={{ color: C.text.muted }}>Start creating AI-powered quizzes in minutes</p>
            </div>

            {/* Success */}
            {success && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm text-center border"
                style={{ background: C.accentBg, borderColor: C.accentBorder, color: C.accent }}>
                <CheckCircle className="w-4 h-4 inline mr-1.5" />
                Account created! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                ref={nameInputRef}
                label="Full name"
                icon={User}
                type="text"
                value={form.name}
                placeholder="Your name"
                disabled={loading || success}
                error={errors.name}
                isValid={validation.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              />

              <Input
                label="Email address"
                icon={Mail}
                type="email"
                value={form.email}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading || success}
                error={errors.email}
                isValid={validation.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />

              {/* Password with strength meter */}
              <div className="space-y-2">
                <Input
                  label="Password"
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  placeholder="Create a strong password"
                  disabled={loading || success}
                  error={errors.password}
                  isValid={validation.password}
                  rightSlot={EyeBtn(showPassword, togglePassword)}
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                />
                {strength && (
                  <div className="flex items-center gap-2 px-1">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-300"
                        style={{ width: strength.width, background: strength.color }} />
                    </div>
                    <span className="text-[10px] font-medium shrink-0" style={{ color: strength.color }}>{strength.text}</span>
                  </div>
                )}
              </div>

              <Input
                label="Confirm password"
                icon={Lock}
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                placeholder="Repeat your password"
                disabled={loading || success}
                error={errors.confirmPassword}
                isValid={validation.confirmPassword}
                rightSlot={EyeBtn(showConfirmPassword, toggleConfirmPassword)}
                onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />

              {/* Role selection */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium uppercase tracking-wider" style={{ color: C.text.muted }}>
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['student', 'teacher'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, role }))}
                      className="py-2.5 rounded-xl text-sm font-medium transition-all capitalize border"
                      style={form.role === role
                        ? { background: C.accentBg, borderColor: C.accentBorder, color: C.accent }
                        : { background: 'rgba(255,255,255,0.03)', borderColor: C.border, color: C.text.muted }}>
                      {role === 'student' ? '🎓 Student' : '📚 Teacher'}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" loading={loading || success} variant="primary" fullWidth>
                <span>Create account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <Button key={p.label} variant="secondary" fullWidth>
                  {p.icon}
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Sign in link */}
            <p className="text-center text-sm mt-6" style={{ color: C.text.dim }}>
              Already have an account?{' '}
              <Link href="/login"
                className="font-semibold transition-colors"
                style={{ color: C.accent }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#6ee7b7'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.accent}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}