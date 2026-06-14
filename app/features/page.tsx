



// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   Sparkles, Brain, Share2, BarChart3, Shield, Zap, Award,
//   Clock, Users, CheckCircle, Globe, Lock, Download,
//   ArrowRight, Star, ChevronLeft
// } from 'lucide-react';

// // ✅ Design tokens matching teacher/admin dashboard
// const T = {
//   bg: '#070709',
//   bgCard: '#0f0f12',
//   accent: '#10b981',
//   accentLight: '#34d399',
//   accentDark: '#059669',
//   accentGlow: 'rgba(16,185,129,0.16)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   accentBg: 'rgba(16,185,129,0.08)',
//   border: 'rgba(255,255,255,0.06)',
// };

// const features = [
//   {
//     icon: Brain,
//     title: 'AI Quiz Generator',
//     desc: 'Describe a topic and our AI writes complete quiz questions, multiple-choice options, correct answers, and explanations — in seconds. No blank page, ever.',
//     points: ['Any subject or topic', 'Adjustable difficulty', 'Auto-generated distractors', 'Edit before publishing'],
//   },
//   {
//     icon: Share2,
//     title: 'Instant Share Link',
//     desc: 'Every quiz gets a clean, shareable URL. Participants click and start — no app, no account, no friction. Works on any device.',
//     points: ['One-click copy', 'QR code export', 'Embed on websites', 'Access controls & expiry'],
//   },
//   {
//     icon: BarChart3,
//     title: 'Live Analytics Dashboard',
//     desc: 'Watch results stream in real-time. See individual scores, per-question analysis, time taken, and class-wide performance at a glance.',
//     points: ['Real-time score tracking', 'Per-question heatmap', 'Time-per-question data', 'AI improvement suggestions'],
//   },
//   {
//     icon: Shield,
//     title: 'Anti-Cheat Controls',
//     desc: "Keep assessments fair with time limits, randomized question order, randomized answer order, and one-attempt-only rules.",
//     points: ['Question randomization', 'Answer order shuffle', 'Time limits per question', 'One-attempt enforcement'],
//   },
//   {
//     icon: Award,
//     title: 'Auto Leaderboard',
//     desc: 'Live leaderboard updates as each participant submits. Names, scores, and ranks — instant motivation for students.',
//     points: ['Live rank updates', 'Top performers highlighted', 'Share leaderboard link', 'Hide names option'],
//   },
//   {
//     icon: Download,
//     title: 'Export & Reports',
//     desc: 'Download full result reports as CSV or PDF. Share with parents, upload to your LMS, or archive for record keeping.',
//     points: ['CSV export', 'PDF score sheets', 'Per-student reports', 'Bulk download'],
//   },
//   {
//     icon: Users,
//     title: 'Class & Team Management',
//     desc: 'Create classes, assign quizzes to specific groups, and manage who can see what. Perfect for teachers and team leads.',
//     points: ['Create named groups', 'Assign quizzes to classes', 'View per-class analytics', 'Student self-enrollment'],
//   },
//   {
//     icon: Clock,
//     title: 'Scheduled Quizzes',
//     desc: 'Set a quiz to open and close at specific times. No more manually sending links — just schedule and relax.',
//     points: ['Set open & close times', 'Auto-close after deadline', 'Timezone support', 'Email reminders'],
//   },
//   {
//     icon: Globe,
//     title: 'Works Everywhere',
//     desc: 'Optimized for low-bandwidth mobile. ficerquiz loads fast even on 3G — because your students are on phones, not desktop.',
//     points: ['Mobile-first design', 'Works on 3G', 'No app download', 'Offline fallback'],
//   },
// ];

// export default function FeaturesPage() {
//   return (
//     <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
//       <div className="fixed inset-0 pointer-events-none" style={{
//         backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
//         backgroundSize: '60px 60px',
//       }} />

//       {/* Glow */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
//           style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
//       </div>

//       {/* Navbar */}
//       <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
//         <div className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl"
//           style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
//           <Link href="/" className="flex items-center gap-2">
//             <Sparkles className="w-5 h-5" style={{ color: T.accentLight }} />
//             <span className="text-white font-bold text-xl">
//               ficer<span className="font-light" style={{ color: T.accentLight }}>quiz</span>
//             </span>
//           </Link>
//           <div className="flex items-center gap-2">
//             <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
//             <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
//               style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})` }}>
//               Get started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="relative px-4 sm:px-6 pt-20 pb-16 text-center">
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
//             <ChevronLeft className="w-4 h-4" /> Back to home
//           </Link>
//           <h1 className="font-extrabold tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
//             Every feature you need to{' '}
//             <span style={{ background: `linear-gradient(135deg, ${T.accentLight}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               assess brilliantly
//             </span>
//           </h1>
//           <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto mb-10">
//             From AI-generated quizzes to live leaderboards — ficerquiz has everything teachers, students, and teams need.
//           </p>
//           <Link href="/signup"
//             className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90"
//             style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, boxShadow: `0 0 40px ${T.accentGlow}` }}>
//             Start for free
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </motion.div>
//       </section>

//       {/* Features grid */}
//       <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-32">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//           {features.map((f, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
//               whileHover={{ y: -4 }}
//               className="group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 overflow-hidden"
//               style={{ background: T.bgCard, borderColor: T.border }}
//               onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
//               onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
//                 style={{ background: `radial-gradient(circle at 30% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
//               <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <f.icon className="w-5 h-5" style={{ color: T.accentLight }} />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3 relative">{f.title}</h3>
//               <p className="text-sm text-white/35 leading-relaxed mb-5 relative">{f.desc}</p>
//               <ul className="space-y-2 relative">
//                 {f.points.map((p, pi) => (
//                   <li key={pi} className="flex items-center gap-2.5 text-xs text-white/45">
//                     <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: `${T.accentLight}80` }} />
//                     {p}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
//           className="mt-20 text-center">
//           <p className="text-white/40 mb-6 text-sm">Ready to use all of this?</p>
//           <Link href="/signup"
//             className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, boxShadow: `0 0 40px ${T.accentGlow}` }}>
//             Get started — it's free
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//           <p className="text-xs text-white/20 mt-4">No credit card required</p>
//         </motion.div>
//       </section>
//     </div>
//   );
// }











// app/features/page.tsx
// ✅ NO 'use client' - Server Component
import type { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";
// ✅ Type-safe metadata with full optimization
export const metadata: Metadata = {
  title: "AI Quiz Maker for Teachers | QuizForge Create Online Quizzes with AI",
  description: "Create online quizzes with AI, auto grading, and real-time analytics. The best quiz platform for teachers, schools, and corporate training. Free plan available.",
  keywords: "AI quiz maker, online quiz maker, quiz platform for teachers, auto grading quiz system, create quizzes online, AI quiz generator",
  // ✅ Canonical URL added
  alternates: {
    canonical: "https://quizforge-web.vercel.app/features",
  },
  // ✅ Robots directive added
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Quiz Maker for Teachers | QuizForge",
    description: "Create online quizzes with AI, auto grading, and real-time analytics. Trusted by 10,000+ educators.",
    type: "website",
    url: "https://quizforge-web.vercel.app/features",
    siteName: "QuizForge",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuizForge - AI Quiz Maker for Teachers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Quiz Maker for Teachers | QuizForge",
    description: "Create online quizzes with AI, auto grading, and real-time analytics.",
    images: ["/og-image.png"],
  },
};

// ✅ FAQ Schema with id for debugging
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create an AI generated online quiz for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sign up for QuizForge, click 'Create Quiz', enter your topic, and our AI generates questions instantly. Review, edit, and share the link in minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Is QuizForge a free online quiz maker for teachers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! QuizForge offers a free plan with unlimited quizzes, AI generation, basic analytics, and sharing features. No credit card required."
      }
    },
    {
      "@type": "Question",
      "name": "How does the auto grading quiz system work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students receive instant scores upon submission. The system automatically checks answers against correct ones and provides immediate feedback."
      }
    },
    {
      "@type": "Question",
      "name": "Can students take quizzes on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. QuizForge is fully responsive and works on smartphones, tablets, and computers. No app installation needed."
      }
    },
    {
      "@type": "Question",
      "name": "What analytics does the online assessment tool provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Real-time insights including average scores, question difficulty, individual student performance, class trends, and exportable reports."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use QuizForge for corporate training assessments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Many companies use QuizForge for employee onboarding, compliance training, skill assessments, and team quizzes."
      }
    },
    {
      "@type": "Question",
      "name": "What makes QuizForge different from Google Forms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike Google Forms, QuizForge offers AI question generation, auto grading, detailed analytics, leaderboards, and anti-cheat features all in one platform."
      }
    }
  ]
};

// ✅ Product Schema with id
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QuizForge",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan with unlimited quizzes"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  }
};

export default function Page() {
  return (
    <>
      {/* ✅ Schema with id attributes for better debugging */}
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <FeaturesClient />
    </>
  );
}