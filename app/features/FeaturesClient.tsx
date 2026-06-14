// app/features/FeaturesClient.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Brain, Share2, BarChart3, Shield, Award,
  Clock, Users, CheckCircle, Globe, Lock, Download,
  ArrowRight, Star, ChevronLeft, Phone, Monitor, Tablet,Zap ,
  BookOpen, GraduationCap, Briefcase
} from 'lucide-react';
import { theme } from '@/lib/theme';
import { useState, useEffect } from 'react';

// Consistent with homepage theme
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

// Testimonials
const testimonials = [
  {
    quote: "QuizForge saves me 10+ hours every week. The AI quiz generator is a game changer for my classroom.",
    name: "Sarah Mitchell",
    role: "High School Teacher",
  },
  {
    quote: "Finally, a quiz platform that's both powerful and easy to use. My students actually enjoy taking quizzes now.",
    name: "Dr. James Chen",
    role: "University Lecturer",
  },
  {
    quote: "The analytics dashboard helps me identify exactly which concepts need more review. Invaluable tool.",
    name: "Emily Rodriguez",
    role: "Online Tutor",
  },
];

// Core Features - ✅ Semantic keyword variation
const coreFeatures = [
  {
    icon: Brain,
    title: 'AI Quiz Generator',
    desc: 'Generate complete assessments from any topic in seconds. Multiple choice questions, distractors, and explanations all auto-generated.',
    keyword: 'AI powered assessment tool',
  },
  {
    icon: Zap,
    title: 'Auto Grading System',
    desc: 'Students get instant scores the moment they submit. No manual checking, no waiting, no paperwork.',
    keyword: 'automated scoring system',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics Dashboard',
    desc: 'Watch results stream in real-time. See individual scores, per-question analysis, and class-wide performance.',
    keyword: 'online testing analytics',
  },
];

// Advanced Features
const advancedFeatures = [
  { icon: Shield, title: 'Anti-Cheat System', desc: 'Keep assessments fair with randomization and time limits.' },
  { icon: Users, title: 'Class Management', desc: 'Organize students into groups and assign quizzes to specific classes.' },
  { icon: Lock, title: 'Quiz Scheduling', desc: 'Set quizzes to open and close at specific times automatically.' },
  { icon: Download, title: 'Export Reports', desc: 'Download full result reports as CSV or PDF for record keeping.' },
  { icon: Award, title: 'Auto Leaderboard', desc: 'Live rankings update as each participant submits their quiz.' },
  { icon: Globe, title: 'Works on Any Device', desc: 'Mobile-first design that works on phones, tablets, and desktops.' },
];

// Use cases
const useCases = [
  { title: 'Teachers', desc: 'Create classroom quizzes and homework assignments', icon: BookOpen },
  { title: 'Schools', desc: 'Conduct exams and track student progress', icon: GraduationCap },
  { title: 'Corporate Training', desc: 'Assess employee knowledge and compliance', icon: Briefcase },
  { title: 'Online Tutors', desc: 'Engage students with interactive assessments', icon: Users },
];

// Comparison data
const comparisonData = [
  { feature: 'AI Question Generation', quizforge: true, googleForms: false, kahoot: false },
  { feature: 'Auto Grading', quizforge: true, googleForms: false, kahoot: true },
  { feature: 'Live Analytics', quizforge: true, googleForms: false, kahoot: true },
  { feature: 'Export Reports', quizforge: true, googleForms: true, kahoot: false },
  { feature: 'Mobile Friendly', quizforge: true, googleForms: true, kahoot: true },
  { feature: 'No App Required', quizforge: true, googleForms: true, kahoot: true },
  { feature: 'Free Plan', quizforge: true, googleForms: true, kahoot: true },
];

// ✅ Semantic keyword variation for FAQ
const faqItems = [
  { q: 'How do I create an AI generated online quiz for students?', a: 'Sign up for QuizForge, click "Create Quiz", enter your topic, and our AI generates questions instantly. Review, edit, and share the link in minutes.' },
  { q: 'Is QuizForge a free online quiz maker for teachers?', a: 'Yes! QuizForge offers a free plan with unlimited quizzes, AI generation, basic analytics, and sharing features. No credit card required.' },
  { q: 'How does the auto grading quiz system work?', a: 'Students receive instant scores upon submission. The system automatically checks answers against correct ones and provides immediate feedback.' },
  { q: 'Can students take quizzes on mobile devices?', a: 'Yes. QuizForge is fully responsive and works on smartphones, tablets, and computers. No app installation needed.' },
  { q: 'What analytics does the online assessment tool provide?', a: 'Real-time insights including average scores, question difficulty, individual student performance, class trends, and exportable reports.' },
  { q: 'Can I use QuizForge for corporate training assessments?', a: 'Absolutely. Many companies use QuizForge for employee onboarding, compliance training, skill assessments, and team quizzes.' },
  { q: 'What makes QuizForge different from Google Forms?', a: 'Unlike Google Forms, QuizForge offers AI question generation, auto grading, detailed analytics, leaderboards, and anti-cheat features  all in one platform.' },
];

// ✅ Improved Sticky CTA with dynamic trigger point
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // ✅ Dynamic trigger point (80% of viewport height)
      const triggerPoint = windowHeight * 0.8;
      setVisible(scrollY > triggerPoint);
      
      // Hide when near footer (last 200px)
      const nearFooter = scrollY + windowHeight > documentHeight - 200;
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

export default function FeaturesClient() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: theme.fonts.primary }}>
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

      {/* Ambient glow - reduced opacity for performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
      </div>

      <StickyCTA />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: 'rgba(8,8,16,0.8)', borderColor: T.border }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${T.accent}30` }}>
              <span className="text-emerald-400 font-bold text-sm">Q</span>
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">QuizForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg">Home</Link>
            <Link href="/pricing" className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg">
              Pricing{" "}
              <span className="text-[10px] ml-0.5 text-emerald-400/70">→</span>
            </Link>
            <Link href="/blog" className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg">
              AI Quiz Guide
            </Link>
            <Link href="#features" className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg">Features</Link>
            <Link href="#faq" className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg">FAQ</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-4 py-2 text-[13px] text-white/60 hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg text-[13px] font-medium bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all">
              Get Started <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="hero" className="relative px-6 pt-20 pb-16 text-center">
        {/* ✅ Static content - no animation */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          
          <h1 className="font-bold tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontFamily: theme.fonts.display }}>
            AI Quiz Maker for{' '}
            <span className="text-emerald-400">
              Teachers & Online Assessments
            </span>
          </h1>
          
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Create online quizzes with AI, auto grading, and live analytics for classrooms and training. 
            The complete <strong className="text-white">online quiz platform</strong> for educators. 
            Check our <Link href="/pricing" className="text-emerald-400 hover:underline">pricing plans</Link> to see which plan fits your needs.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#fff', color: '#080810' }}>
              Try AI Quiz Maker Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#features"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all border"
              style={{ borderColor: T.border, color: 'rgba(255,255,255,0.7)' }}>
              Explore Features <ChevronLeft className="w-4 h-4 rotate-90" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <div className="text-center -mt-8 mb-8">
        <p className="text-xs text-white/30 tracking-wide">
          Trusted by <span className="text-emerald-400">10,000+ teachers</span> worldwide
        </p>
      </div>

      {/* ========== PROBLEM → SOLUTION (Static) ========== */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">Why Upgrade</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display']">
            Why Teachers Need a Modern Quiz Platform
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-3">The Old Way 😓</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>• Manual quiz creation takes hours</li>
              <li>• Google Forms lacks detailed analytics</li>
              <li>• Grading papers is time consuming</li>
              <li>• No insights into student performance</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
            <h3 className="text-white font-semibold text-lg mb-3">The QuizForge Way ✨</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>• <strong className="text-white">AI quiz generator</strong> creates assessments in seconds</li>
              <li>• Real-time analytics dashboard</li>
              <li>• Instant <strong className="text-white">auto grading system</strong></li>
              <li>• Detailed performance insights</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-white/10">
              <Link href="/blog/ai-quiz-maker" className="text-xs text-emerald-400 hover:underline">
                Read our AI quiz guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE FEATURES (Animated - only these) ========== */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">Core Features</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Core Features of QuizForge
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Everything you need to create, share, and analyze quizzes all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border hover:border-emerald-400/30 transition-all duration-300"
              style={{ background: T.bgCard, borderColor: T.border }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{feature.desc}</p>
              <div className="inline-flex items-center gap-1 text-xs text-emerald-400/70">
                <CheckCircle className="w-3 h-3" /> Available now
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== HOW IT WORKS (Static) ========== */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            How QuizForge Works
          </h2>
          <p className="text-white/50">Three simple steps to better assessments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Create Quiz', desc: 'Add questions manually or use AI to generate quizzes from any topic in seconds.' },
            { step: '02', title: 'Share Link', desc: 'Get a unique link to share with students via email, classroom, or any platform.' },
            { step: '03', title: 'View Results', desc: 'Watch results stream in real-time with detailed analytics and exportable reports.' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                {item.step}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/45 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== USE CASES (Static) ========== */}
      <section id="use-cases" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">Who Uses QuizForge</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Trusted by Educators & Organizations Worldwide
          </h2>
          <p className="text-white/50">The complete <strong className="text-white">AI assessment tool</strong> for teachers, schools, and businesses</p>
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

      {/* ========== MID-PAGE CTA ========== */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
          <h3 className="text-white font-semibold text-xl mb-2">Ready to transform your assessments?</h3>
          <p className="text-white/50 text-sm mb-5">Join thousands of teachers using QuizForge to save time and engage students.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
            style={{ background: '#fff', color: '#080810' }}
          >
            Start Creating Quizzes Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========== COMPARISON SECTION (Static) ========== */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            QuizForge vs Google Forms vs Kahoot
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Compare <strong className="text-white">QuizForge</strong> with Google Forms and Kahoot to see which 
            <strong className="text-white"> online testing system</strong> is best for teachers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th className="text-left p-3 text-white font-semibold">Feature</th>
                <th className="text-center p-3 text-emerald-400 font-semibold">QuizForge</th>
                <th className="text-center p-3 text-white/50 font-semibold">Google Forms</th>
                <th className="text-center p-3 text-white/50 font-semibold">Kahoot</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td className="p-3 text-white/70 text-sm">{item.feature}</td>
                  <td className="text-center p-3">{item.quizforge ? <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                  <td className="text-center p-3">{item.googleForms ? <CheckCircle className="w-5 h-5 text-white/30 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                  <td className="text-center p-3">{item.kahoot ? <CheckCircle className="w-5 h-5 text-white/30 mx-auto" /> : <span className="text-white/20">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Link href="/signup" className="inline-flex items-center gap-2 text-emerald-400 hover:gap-3 transition-all">
            Try QuizForge Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========== ADVANCED FEATURES (Static) ========== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Advanced Features
          </h2>
          <p className="text-white/50">Powerful tools to manage assessments at scale</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advancedFeatures.map((feature, i) => (
            <div key={i} className="p-5 rounded-xl border hover:border-emerald-400/20 transition-all" style={{ background: T.bgCard, borderColor: T.border }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: T.accentBg }}>
                <feature.icon className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-[11px] text-white/35 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TESTIMONIALS (Animated) ========== */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Trusted by Educators
          </h2>
          <p className="text-white/50">What teachers are saying about QuizForge</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border"
              style={{ background: T.bgCard, borderColor: T.border }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />)}
              </div>
              <p className="text-white/60 text-sm italic mb-4">"{t.quote}"</p>
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-white/35 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== FAQ SECTION (Static) ========== */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50">Everything you need to know about QuizForge</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border" style={{ background: T.bgCard, borderColor: T.border }}>
              <h3 className="text-white font-semibold text-base mb-2">{item.q}</h3>
              <p className="text-white/45 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-10 rounded-2xl border bg-gradient-to-r from-emerald-500/5 to-transparent" style={{ borderColor: T.border }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3">
            Start Creating Quizzes in Minutes
          </h2>
          <p className="text-white/50 mb-6">Join thousands of teachers saving time with QuizForge. Free forever no credit card needed.</p>
          <Link href="/signup"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-white/30">
            <span className="flex items-center gap-1">✓ No credit card required</span>
            <span className="flex items-center gap-1">✓ Free forever plan</span>
            <span className="flex items-center gap-1">✓ Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
}