// app/pricing/PricingClient.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Zap, Building2, Star, ChevronLeft, Users, Crown, Clock, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';

// ✅ Consistent with homepage theme
const T = {
  bg: '#080810',
  bgCard: 'rgba(255,255,255,0.025)',
  accent: '#34d399',
  accentLight: '#34d399',
  accentDark: '#10b981',
  accentGlow: 'rgba(52,211,153,0.12)',
  accentBorder: 'rgba(52,211,153,0.18)',
  accentBg: 'rgba(52,211,153,0.07)',
  border: 'rgba(255,255,255,0.07)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.2)',
};

// ✅ Updated plans with actual Stripe amounts
const plans = [
  {
    name: 'Free',
    icon: Star,
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    period: 'forever',
    tagline: 'Perfect for individual teachers and small classes.',
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
    features: [
      'Unlimited quizzes',
      'Up to 30 participants per quiz',
      'Basic analytics',
      'Shareable quiz links',
      'Manual question creation',
      'Export results as CSV',
    ],
  },
  {
    name: 'Pro',
    icon: Crown,
    monthlyPrice: '$9',
    yearlyPrice: '$48',
    period: 'per month',
    tagline: 'For power users — teachers, tutors, and growing teams.',
    cta: 'Start Pro free for 14 days',
    href: '/signup?plan=pro',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited participants',
      'AI quiz generator',
      'Live analytics dashboard',
      'Anti-cheat controls',
      'Auto leaderboard',
      'Scheduled quizzes',
      'Class & group management',
      'PDF & CSV export',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    icon: Building2,
    monthlyPrice: '$29',
    yearlyPrice: '$276',
    period: 'per month',
    tagline: 'For schools, academies, and companies running assessments at scale.',
    cta: 'Contact sales',
    href: '/signup?plan=pro',
    highlight: false,
    features: [
      'Everything in Pro',
      'Up to 20 admin users',
      'Custom branding & domain',
      'Bulk CSV invite',
      'SSO / SAML login',
      'Compliance audit trail',
      'Dedicated onboarding',
      'SLA-backed support',
    ],
  },
];

const faqs = [
  { q: 'Do participants need to create an account?', a: 'No. Participants just click the link and take the quiz no sign-up, no app download needed.' },
  { q: 'Can I try Pro for free?', a: 'Yes! Pro comes with a 14-day free trial. No credit card required to start.' },
  { q: 'What happens to my quizzes if I downgrade?', a: 'Your quizzes and results are preserved. Only your ability to create new ones beyond the free limit is paused.' },
  { q: 'Is my data safe?', a: 'Yes. QuizForge uses bank-level encryption and never sells your data. You own everything you create.' },
  { q: 'Can I switch plans anytime?', a: 'Absolutely. Upgrade or downgrade at any time. Changes take effect immediately.' },
  { q: 'Do you offer educational discounts?', a: 'Yes! Contact our sales team for special pricing for schools and non-profits.' },
];

// Trust badges
const trustBadges = [
  { text: 'Trusted by 10,000+ educators', icon: Users },
  { text: '4.9/5 average rating', icon: Star },
  { text: 'No credit card required', icon: CreditCard },
  { text: '14-day free trial', icon: Clock },
];

// ✅ Comparison sections
const comparisonVsGoogleForms = [
  { feature: 'AI Question Generation', quizforge: true, googleForms: false },
  { feature: 'Auto Grading', quizforge: true, googleForms: false },
  { feature: 'Live Analytics', quizforge: true, googleForms: false },
  { feature: 'Unlimited Quizzes (Free)', quizforge: true, googleForms: true },
  { feature: 'Export Reports', quizforge: true, googleForms: true },
  { feature: 'Anti-Cheat System', quizforge: true, googleForms: false },
  { feature: 'Mobile Friendly', quizforge: true, googleForms: true },
];

const comparisonVsKahoot = [
  { feature: 'AI Question Generation', quizforge: true, kahoot: false },
  { feature: 'Self-Paced Quizzes', quizforge: true, kahoot: false },
  { feature: 'Detailed Analytics', quizforge: true, kahoot: false },
  { feature: 'No App Required', quizforge: true, kahoot: false },
  { feature: 'Export Reports', quizforge: true, kahoot: false },
  { feature: 'Unlimited Quizzes (Free)', quizforge: true, kahoot: false },
];

// ✅ Use Cases Section
const useCases = [
  { title: 'For Teachers', desc: 'Create classroom quizzes and homework assignments', icon: Users },
  { title: 'For Schools', desc: 'Conduct exams and track student progress', icon: Building2 },
  { title: 'For Corporate Training', desc: 'Assess employee knowledge and compliance', icon: Sparkles },
  { title: 'For Online Tutors', desc: 'Engage students with interactive assessments', icon: Star },
];

// Sticky CTA
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const triggerPoint = windowHeight * 0.6;
      setVisible(scrollY > triggerPoint);
      
      const nearFooter = scrollY + windowHeight > documentHeight - 300;
      setIsNearFooter(nearFooter);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || isNearFooter) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/signup"
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl transition-all hover:scale-105"
        style={{ background: '#fff', color: '#080810' }}
      >
        Start Free <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function PricingClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const getPrice = (plan: typeof plans[0]) => {
    if (billingPeriod === 'yearly') {
      return plan.yearlyPrice;
    }
    return plan.monthlyPrice;
  };

  const getYearlySavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === '$0') return null;
    const monthly = parseInt(plan.monthlyPrice.replace('$', ''));
    const yearly = parseInt(plan.yearlyPrice.replace('$', ''));
    const savings = ((monthly * 12 - yearly) / (monthly * 12)) * 100;
    return Math.round(savings);
  };

  // ✅ Checkout function for paid plans
//   const handleSubscribe = async (planName: string, billingPeriod: 'monthly' | 'yearly') => {
//     setIsLoading(planName);
    
//     // Get current user from localStorage
//     const userStr = localStorage.getItem('quizforge_user');
//     const token = localStorage.getItem('quizforge_token');
    
//     if (!token || !userStr) {
//       // Redirect to signup with plan param
//       window.location.href = `/signup?plan=${planName.toLowerCase()}&billing=${billingPeriod}&trial=true`;
//       return;
//     }
    
//     const user = JSON.parse(userStr);
    
//     try {
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           plan: planName.toLowerCase(),
//           billingPeriod,
//           userId: user.id,
//           email: user.email,
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert('Failed to start checkout. Please try again.');
//         setIsLoading(null);
//       }
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Something went wrong. Please try again.');
//       setIsLoading(null);
//     }
//   };

// app/pricing/PricingClient.tsx - Only the handleSubscribe function
const handleSubscribe = async (planName: string, billingPeriod: 'monthly' | 'yearly') => {
  setIsLoading(planName);
  
  // Get current user from localStorage
  const userStr = localStorage.getItem('quizforge_user');
  const token = localStorage.getItem('quizforge_token');
  
  if (!token || !userStr) {
    // ✅ First create account, then come back to subscribe
    // Store the selected plan in sessionStorage to restore after signup
    sessionStorage.setItem('pendingPlan', JSON.stringify({
      plan: planName.toLowerCase(),
      billingPeriod,
    }));
    window.location.href = '/signup';
    return;
  }
  
  const user = JSON.parse(userStr);
  
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: planName.toLowerCase(),
        billingPeriod,
        userId: user.id,
        email: user.email,
      }),
    });
    
    const data = await response.json();
    
    if (data.url) {
      // ✅ Redirect to Stripe checkout page
      window.location.href = data.url;
    } else {
      alert('Failed to start checkout. Please try again.');
      setIsLoading(null);
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Something went wrong. Please try again.');
    setIsLoading(null);
  }
};
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        .fade-in-up { animation-name: fadeInUp; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
      </div>

      <StickyCTA />

      {/* Navbar - Consistent branding */}
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl"
          style={{ background: 'rgba(8,8,16,0.8)', borderColor: T.border }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${T.accent}30` }}>
              <span className="text-emerald-400 font-bold text-sm">Q</span>
            </div>
            <span className="text-white font-bold text-xl">QuizForge</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: '#fff', color: '#080810' }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-20 pb-12 text-center">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          
          {/* ✅ SEO-optimized H1 with keywords */}
          <h1 className="font-extrabold tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontFamily: "'DM Serif Display', serif" }}>
            AI Quiz Maker Pricing Plans{' '}
            <span style={{ background: `linear-gradient(135deg, ${T.accentLight}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              for Teachers, Schools & Businesses
            </span>
          </h1>
          
          <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Choose the best plan for your needs. QuizForge is an AI quiz maker with auto grading, 
            analytics, and scalable pricing for teachers, schools, and businesses.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/features" className="text-emerald-400 text-sm hover:underline">
              Explore all AI quiz features →
            </Link>
            <Link href="/blog" className="text-white/40 text-sm hover:text-white/60 transition">
              Read our AI quiz guide
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-6">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-white/40 text-sm">
              <badge.icon className="w-4 h-4 text-emerald-400" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Billing Toggle */}
      <section className="max-w-md mx-auto px-6 pb-8">
        <div className="flex items-center justify-center gap-3 p-1 rounded-xl border" style={{ background: T.bgCard, borderColor: T.border }}>
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'text-white bg-emerald-400/10 border border-emerald-400/20' : 'text-white/40'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'yearly' ? 'text-white bg-emerald-400/10 border border-emerald-400/20' : 'text-white/40'}`}
          >
            Yearly <span className="text-xs text-emerald-400/70 ml-1">Save up to 22%</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {plans.map((plan, i) => {
            const price = getPrice(plan);
            const savings = getYearlySavings(plan);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col rounded-2xl border overflow-hidden"
                style={{
                  background: plan.highlight ? `linear-gradient(160deg, ${T.accentBg} 0%, ${T.bgCard} 50%)` : T.bgCard,
                  borderColor: plan.highlight ? T.accentBorder : T.border,
                  boxShadow: plan.highlight ? `0 0 60px ${T.accentGlow}` : 'none',
                }}>

                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${T.accent}80, transparent)` }} />
                )}

                {plan.badge && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
                    style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                      <plan.icon className="w-5 h-5" style={{ color: T.accentLight }} />
                    </div>
                    <span className="text-lg font-bold text-white">{plan.name}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-white">{price}</span>
                      {price !== '$0' && <span className="text-sm text-white/30">{plan.period}</span>}
                    </div>
                    {savings && billingPeriod === 'yearly' && (
                      <p className="text-xs text-emerald-400 mt-1">Save {savings}% annually</p>
                    )}
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-8">{plan.tagline}</p>

                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.highlight ? T.accentLight : 'rgba(255,255,255,0.3)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* ✅ Conditional rendering based on plan type */}
                  {plan.name === 'Pro' ? (
                    <button
                      onClick={() => handleSubscribe(plan.name, billingPeriod)}
                      disabled={isLoading === plan.name}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 mt-auto w-full disabled:opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
                        color: '#fff',
                        boxShadow: `0 0 28px ${T.accentGlow}`,
                      }}
                    >
                      {isLoading === plan.name ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {plan.cta}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={plan.href}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 mt-auto w-full"
                      style={plan.highlight ? {
                        background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
                        color: '#fff',
                        boxShadow: `0 0 28px ${T.accentGlow}`,
                      } : {
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${T.border}`,
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== USE CASES SECTION ========== */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">Who Is QuizForge For</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Pricing for Every Need
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Whether you're a teacher, school administrator, or corporate trainer we have a plan for you.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => (
            <div key={i} className="text-center p-6 rounded-xl border" style={{ background: T.bgCard, borderColor: T.border }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <useCase.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold">{useCase.title}</h3>
              <p className="text-white/40 text-xs mt-1">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== COMPARISON SECTION ========== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            QuizForge vs Google Forms
          </h2>
          <p className="text-white/50">See why teachers choose QuizForge over Google Forms</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th className="text-left p-3 text-white font-semibold">Feature</th>
                <th className="text-center p-3 text-emerald-400 font-semibold">QuizForge</th>
                <th className="text-center p-3 text-white/50 font-semibold">Google Forms</th>
               </tr>
            </thead>
            <tbody>
              {comparisonVsGoogleForms.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td className="p-3 text-white/70 text-sm">{item.feature}</td>
                  <td className="text-center p-3">{item.quizforge ? <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                  <td className="text-center p-3">{item.googleForms ? <CheckCircle className="w-5 h-5 text-white/30 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            QuizForge vs Kahoot
          </h2>
          <p className="text-white/50">More flexibility, better analytics, and self-paced learning</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th className="text-left p-3 text-white font-semibold">Feature</th>
                <th className="text-center p-3 text-emerald-400 font-semibold">QuizForge</th>
                <th className="text-center p-3 text-white/50 font-semibold">Kahoot</th>
               </tr>
            </thead>
            <tbody>
              {comparisonVsKahoot.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td className="p-3 text-white/70 text-sm">{item.feature}</td>
                  <td className="text-center p-3">{item.quizforge ? <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                  <td className="text-center p-3">{item.kahoot ? <CheckCircle className="w-5 h-5 text-white/30 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50">Everything you need to know about QuizForge pricing</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border" style={{ background: T.bgCard, borderColor: T.border }}>
              <h3 className="text-white font-semibold text-base mb-2">{item.q}</h3>
              <p className="text-white/45 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-10 rounded-2xl border bg-gradient-to-r from-emerald-500/5 to-transparent" style={{ borderColor: T.border }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Start Creating Quizzes Today
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            Get started free with AI quiz generation. 14-day free trial on Pro. No credit card required.
          </p>
          <Link href="/signup"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-white/30">
            <span className="flex items-center gap-1">✓ No credit card required</span>
            <span className="flex items-center gap-1">✓ Free forever plan</span>
            <span className="flex items-center gap-1">✓ 14-day Pro trial</span>
            <span className="flex items-center gap-1">✓ Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
}