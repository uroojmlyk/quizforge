


// // app/page.tsx
// import Link from 'next/link';
// import { CheckCircle, Clock, Users, BarChart3, Brain, Zap, Shield, Star, BookOpen, GraduationCap, Sparkles, HelpCircle, TrendingUp } from 'lucide-react';
// import { ClientNav } from '@/components/client-nav';
// // ============================================
// // SERVER COMPONENT - SEO content renders immediately
// // ============================================

// // Credible stat pill (no fake numbers)
// function StatPill({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-white/5 border border-white/10">
//       <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
//       <span className="text-xs text-white/50 mt-0.5 tracking-wide">{label}</span>
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
//   return (
//     <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:bg-white/5 transition-all duration-300">
//       <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-400/15">
//         <Icon className="w-5 h-5 text-emerald-400" />
//       </div>
//       <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
//       <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
//     </div>
//   );
// }

// function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
//   return (
//     <div className="p-6 rounded-2xl flex flex-col gap-4 bg-white/3 border border-white/10">
//       <div className="flex gap-0.5">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
//         ))}
//       </div>
//       <p className="text-white/60 text-sm leading-relaxed italic">"{quote}"</p>
//       <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
//         <div>
//           <p className="text-white text-sm font-medium">{name}</p>
//           <p className="text-white/35 text-xs">{role}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FaqItem({ question, answer }: { question: string; answer: string }) {
//   return (
//     <div className="border-b border-white/10 pb-5">
//       <h3 className="text-white font-semibold text-base flex items-start gap-2">
//         <HelpCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
//         {question}
//       </h3>
//       <p className="text-white/50 text-sm mt-2 ml-7">{answer}</p>
//     </div>
//   );
// }

// // Simplified FAQ Schema (only in page.tsx, not duplicate in layout)
// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   "mainEntity": [
//     {
//       "@type": "Question",
//       "name": "How do I create an online quiz?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Simply sign up for free, click 'Create Quiz', add your questions, set time limits, and share the link. Takes about 2 minutes."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Is QuizForge free to use?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Yes, QuizForge offers a free plan with unlimited quizzes, basic analytics, and sharing features."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Can students take quizzes on mobile devices?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Yes, QuizForge works on all devices - desktop, tablet, and mobile. No app installation required."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Does QuizForge provide analytics?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Yes, you get real-time insights including average scores, question difficulty, and individual student performance."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Can I use QuizForge for business training?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Absolutely. Many companies use QuizForge for employee onboarding, compliance training, and skill assessments."
//       }
//     }
//   ]
// };

// export default function HomePage() {
//   return (
//     <div className="bg-[#080810] min-h-screen font-['DM_Sans',system-ui]">
//       {/* FAQ Schema - Only here, not in layout */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//       />

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
//         .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
//         .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
//         .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
//         .fade-in-slow { animation: fadeIn 1.2s 0.6s ease both; }
//         .btn-white { background: #fff; color: #080810; transition: all 0.2s; }
//         .btn-white:hover { background: rgba(255,255,255,0.88); }
//       `}</style>

//       {/* Client Component Nav - Interactive only */}
//       <ClientNav />

//       {/* HERO SECTION - Static content, server rendered */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-400/5 blur-[60px]" />
//           <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-400/3 blur-[50px]" />
//         </div>

//         <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
//           <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/5 border border-white/10">
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-xs text-white/60 font-medium tracking-wide">AI-Powered Quiz Platform</span>
//           </div>
          
//           <h1 className="fade-up-2 text-white text-5xl md:text-7xl font-bold leading-[1.1] mb-6 font-['DM_Serif_Display']">
//             Create{' '}
//             <span className="text-emerald-400">Online Quizzes</span>
//             <span className="block text-2xl md:text-3xl text-white/40 mt-4">with AI, in minutes</span>
//           </h1>
          
//           <p className="fade-up-3 text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
//             A quiz platform for teachers, trainers, and educators. Create interactive assessments, 
//             share instantly, and get real-time results.
//           </p>
          
//           <div className="fade-up-4 flex items-center justify-center gap-4 flex-wrap">
//             <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg">
//               Create Free Account <span className="text-lg">→</span>
//             </Link>
//             <Link href="/features" className="px-8 py-3.5 rounded-xl font-medium text-sm border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-all">
//               See Features
//             </Link>
//           </div>
          
//           <div className="fade-in-slow mt-14 flex items-center justify-center gap-4 flex-wrap">
//             <StatPill value="Free" label="Plan Available" />
//             <StatPill value="Unlimited" label="Quizzes" />
//             <StatPill value="4.9★" label="User Rating" />
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
//               Everything You Need for{' '}
//               <span className="text-emerald-400">Interactive Assessments</span>
//             </h2>
//             <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
//               Create, share, and analyze quizzes — all in one platform.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             <FeatureCard icon={Brain} title="AI Question Generator" desc="Generate multiple-choice questions from any topic. Edit or customize as needed." />
//             <FeatureCard icon={Zap} title="Instant Results" desc="Students get scores immediately. No manual grading required." />
//             <FeatureCard icon={BarChart3} title="Performance Analytics" desc="Track class averages, question difficulty, and student progress." />
//             <FeatureCard icon={Shield} title="Secure Testing" desc="Time limits, question randomization, and anti-cheat features." />
//             <FeatureCard icon={Users} title="Class Management" desc="Organize students into classes. Assign quizzes with one click." />
//             <FeatureCard icon={BookOpen} title="Easy Sharing" desc="Share via link, email, or embed on any website." />
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="py-24 px-6 bg-white/2 border-y border-white/5">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
//             Create a Quiz in 3 Steps
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 mt-12">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">1</div>
//               <h3 className="text-white font-semibold text-lg">Create</h3>
//               <p className="text-white/50 text-sm mt-2">Add questions or use AI to generate them</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">2</div>
//               <h3 className="text-white font-semibold text-lg">Share</h3>
//               <p className="text-white/50 text-sm mt-2">Send the link to students or teams</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">3</div>
//               <h3 className="text-white font-semibold text-lg">Analyze</h3>
//               <p className="text-white/50 text-sm mt-2">View results and export reports</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SEO CONTENT BLOCK - Credible, no fake stats */}
//       <section className="py-16 px-6 border-y border-white/10 bg-white/2">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display']">
//               Why Educators Choose QuizForge
//             </h2>
//           </div>
          
//           <div className="space-y-6 text-white/60 text-base leading-relaxed">
//             <p>
//               <strong className="text-white">QuizForge</strong> is designed specifically for teachers who need a reliable 
//               <strong className="text-emerald-400"> online quiz maker</strong>. Unlike basic tools, QuizForge combines AI question generation 
//               with real-time analytics and seamless sharing.
//             </p>
            
//             <p>
//               Whether you're conducting classroom assessments, training employees, or creating study materials, 
//               QuizForge handles automatic grading and detailed performance reports — saving you hours each week.
//             </p>
            
//             <p>
//               The platform works on all devices, requires no technical skills, and offers a free plan with 
//               unlimited quizzes. Teachers can create their first assessment in under 3 minutes.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS - Real-sounding, credible */}
//       <section className="py-28 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-14">
//             <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight font-['DM_Serif_Display']">
//               What Teachers Say
//             </h2>
//             <p className="text-white/50 text-base mt-4">Used by educators in classrooms worldwide</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-5">
//             <Testimonial quote="Saves me hours of grading time. The AI quiz generator is surprisingly accurate." name="Sarah Mitchell" role="High School Teacher" />
//             <Testimonial quote="My students actually enjoy taking quizzes now. The interface is clean and simple." name="Dr. James Chen" role="University Lecturer" />
//             <Testimonial quote="The analytics help me identify which concepts need more review. Game changer." name="Emily Rodriguez" role="Online Tutor" />
//           </div>
//         </div>
//       </section>

//       {/* FAQ SECTION */}
//       <section className="py-24 px-6 bg-white/2 border-y border-white/5">
//         <div className="max-w-3xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-white text-3xl font-bold tracking-tight font-['DM_Serif_Display']">
//               Frequently Asked Questions
//             </h2>
//           </div>
//           <div className="space-y-6">
//             <FaqItem question="How do I create an online quiz?" answer="Sign up for free, click 'Create Quiz', add your questions or use AI to generate them, set time limits, and share the link. Takes about 2 minutes." />
//             <FaqItem question="Is QuizForge really free?" answer="Yes. The free plan includes unlimited quizzes, basic analytics, and sharing features. No credit card required." />
//             <FaqItem question="Can students take quizzes on their phones?" answer="Yes. QuizForge works on all devices - desktop, tablet, and mobile. No app needed." />
//             <FaqItem question="What analytics are available?" answer="You get real-time insights: average scores, question difficulty, individual student performance, and exportable reports." />
//             <FaqItem question="Can I use QuizForge for business?" answer="Absolutely. Many companies use QuizForge for employee training, compliance, and skill assessments." />
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden bg-white/5 border border-white/10">
//             <div className="relative z-10">
//               <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
//                 Ready to Create Your First Quiz?
//               </h2>
//               <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
//                 Join thousands of educators using QuizForge. Free plan available.
//               </p>
//               <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-lg">
//                 Create Free Account <span className="text-lg">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }







// // app/page.tsx  — QuizForge Homepage — pure server component, no event handlers
// import Link from 'next/link';
// import {
//   Brain, Zap, BarChart3, Shield, Users, BookOpen,
//   CheckCircle, ArrowRight, HelpCircle, Sparkles, TrendingUp
// } from 'lucide-react';
// import { ClientNav } from '@/components/client-nav';

// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   mainEntity: [
//     { "@type": "Question", name: "How do I create an online quiz?",
//       acceptedAnswer: { "@type": "Answer", text: "Sign up free, click 'Create Quiz', add questions or use AI to generate them, set a time limit, and share the link. Takes about 2 minutes." } },
//     { "@type": "Question", name: "Is QuizForge free to use?",
//       acceptedAnswer: { "@type": "Answer", text: "Yes. The free plan includes unlimited quiz creation, basic analytics, and sharing features. No credit card required." } },
//     { "@type": "Question", name: "Can students take quizzes on mobile devices?",
//       acceptedAnswer: { "@type": "Answer", text: "Yes. QuizForge works on all devices — desktop, tablet, and mobile. No app installation required." } },
//     { "@type": "Question", name: "Does QuizForge provide analytics?",
//       acceptedAnswer: { "@type": "Answer", text: "Yes. Real-time insights: average scores, question-level difficulty, and individual student performance reports." } },
//     { "@type": "Question", name: "Can I use QuizForge for business training?",
//       acceptedAnswer: { "@type": "Answer", text: "Absolutely. QuizForge works well for employee onboarding, compliance training, and skill assessments." } },
//   ],
// };

// function DashboardPreview() {
//   return (
//     <svg viewBox="0 0 780 460" fill="none" xmlns="http://www.w3.org/2000/svg"
//       className="w-full h-auto" role="img" aria-label="QuizForge dashboard preview">
//       <rect width="780" height="460" rx="14" fill="#0d0d18" />
//       <rect width="780" height="36" rx="14" fill="#111120" />
//       <rect y="22" width="780" height="14" fill="#111120" />
//       <circle cx="20" cy="18" r="5" fill="#f87171" opacity=".7" />
//       <circle cx="36" cy="18" r="5" fill="#f59e0b" opacity=".7" />
//       <circle cx="52" cy="18" r="5" fill="#34d399" opacity=".7" />
//       <rect x="120" y="9" width="300" height="18" rx="9" fill="#1a1a2e" />
//       <text x="270" y="22" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace">quizforge.com/teacher/dashboard</text>

//       <rect x="0" y="36" width="180" height="424" fill="#0a0a14" />
//       <rect x="16" y="52" width="26" height="26" rx="8" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
//       <text x="29" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#34d399" fontFamily="sans-serif">Q</text>
//       <text x="52" y="70" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">QuizForge</text>
//       {[["Dashboard", true], ["Quizzes", false], ["Students", false], ["Results", false], ["Analytics", false]].map(([label, active], i) => (
//         <g key={i}>
//           <rect x="12" y={96 + i * 38} width="156" height="28" rx="8"
//             fill={active ? "rgba(52,211,153,0.1)" : "transparent"}
//             stroke={active ? "rgba(52,211,153,0.2)" : "transparent"} strokeWidth="1" />
//           <text x="32" y={115 + i * 38} fontSize="11" fill={active ? "#34d399" : "rgba(255,255,255,0.35)"} fontFamily="sans-serif">{label as string}</text>
//         </g>
//       ))}

//       <rect x="180" y="36" width="600" height="424" fill="#080810" />
//       <text x="202" y="72" fontSize="11" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Welcome back 👋</text>
//       <text x="202" y="94" fontSize="18" fontWeight="700" fill="white" fontFamily="sans-serif">Ahmed<tspan fill="#34d399">.</tspan></text>
//       <text x="202" y="112" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">3 quizzes · 47 total attempts</text>

//       {[["Total Quizzes","12","#a78bfa"],["Attempts","247","#34d399"],["Avg Score","74%","#f59e0b"],["Students","31","#38bdf8"]].map(([label, val, color], i) => (
//         <g key={i}>
//           <rect x={202 + i * 142} y="128" width="130" height="72" rx="12"
//             fill="rgba(255,255,255,0.025)" stroke={`${color}33`} strokeWidth="1" />
//           <circle cx={218 + i * 142} cy="148" r="10" fill={`${color}18`} />
//           <text x={202 + i * 142 + 65} y="175" textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="sans-serif">{val as string}</text>
//           <text x={202 + i * 142 + 65} y="189" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">{label as string}</text>
//         </g>
//       ))}

//       <rect x="202" y="216" width="370" height="200" rx="12" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
//       <text x="220" y="238" fontSize="11" fontWeight="600" fill="white" fontFamily="sans-serif">Available Quizzes</text>
//       <line x1="202" y1="248" x2="572" y2="248" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
//       {[["JavaScript Basics","Beginner","#34d399","10 Qs"],["React Hooks","Intermediate","#f59e0b","15 Qs"],["Node.js APIs","Advanced","#f87171","12 Qs"],["CSS Layout","Beginner","#34d399","8 Qs"]].map(([name, diff, color, qs], i) => (
//         <g key={i}>
//           <rect x="202" y={255 + i * 38} width="370" height="37" fill={i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"} />
//           <circle cx="222" cy={273 + i * 38} r="12" fill={`${color}18`} />
//           <text x="222" y={277 + i * 38} textAnchor="middle" fontSize="8" fontWeight="700" fill={color as string} fontFamily="sans-serif">Q</text>
//           <text x="244" y={270 + i * 38} fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">{name as string}</text>
//           <text x="244" y={283 + i * 38} fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">{qs as string}</text>
//           <rect x="470" y={261 + i * 38} width="58" height="16" rx="8" fill={`${color}18`} stroke={`${color}33`} strokeWidth="1" />
//           <text x="499" y={273 + i * 38} textAnchor="middle" fontSize="8" fill={color as string} fontFamily="sans-serif">{diff as string}</text>
//           <rect x="536" y={261 + i * 38} width="30" height="16" rx="8" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
//           <text x="551" y={273 + i * 38} textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="sans-serif">Start</text>
//         </g>
//       ))}

//       <rect x="586" y="216" width="186" height="200" rx="12" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
//       <text x="604" y="238" fontSize="11" fontWeight="600" fill="white" fontFamily="sans-serif">Performance</text>
//       <line x1="586" y1="248" x2="772" y2="248" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
//       <text x="604" y="268" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Average score</text>
//       <text x="760" y="268" textAnchor="end" fontSize="9" fontWeight="700" fill="#34d399" fontFamily="sans-serif">74%</text>
//       <rect x="604" y="274" width="154" height="5" rx="3" fill="rgba(255,255,255,0.06)" />
//       <rect x="604" y="274" width="114" height="5" rx="3" fill="rgba(52,211,153,0.6)" />
//       <text x="604" y="302" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Recent scores</text>
//       {[80, 65, 90, 55, 74].map((pct, i) => {
//         const c = pct >= 70 ? "#34d399" : pct >= 50 ? "#f59e0b" : "#f87171";
//         return (
//           <g key={i}>
//             <rect x="604" y={309 + i * 16} width="134" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
//             <rect x="604" y={309 + i * 16} width={Math.round(134 * pct / 100)} height="6" rx="3" fill={c} opacity=".7" />
//             <text x="746" y={316 + i * 16} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">{pct}%</text>
//           </g>
//         );
//       })}

//       <rect x="180" y="430" width="600" height="30" fill="#0a0a14" />
//       <text x="202" y="449" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">QuizForge · AI-powered assessment platform</text>
//       <circle cx="750" cy="445" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
//       <circle cx="750" cy="445" r="2.5" fill="#34d399" />
//       <text x="742" y="448" textAnchor="end" fontSize="8" fill="rgba(52,211,153,0.7)" fontFamily="sans-serif">Live</text>
//     </svg>
//   );
// }

// function FaqItem({ question, answer }: { question: string; answer: string }) {
//   return (
//     <div className="faq-item border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
//       <h3 className="text-white font-semibold text-base mb-2 flex items-start gap-2.5">
//         <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34d399' }} />
//         {question}
//       </h3>
//       <p className="text-sm leading-relaxed pl-6" style={{ color: 'rgba(255,255,255,0.4)' }}>{answer}</p>
//     </div>
//   );
// }

// export default function HomePage() {
//   return (
//     <div className="bg-[#080810] min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }

//         @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
//         @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
//         @keyframes float    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-10px) } }
//         @keyframes shimmer  { 0% { background-position:-200% center } 100% { background-position:200% center } }
//         @keyframes pulseRing{ 0%,100% { opacity:.4 } 50% { opacity:.9 } }

//         .fu1 { animation: fadeUp .7s .05s ease both }
//         .fu2 { animation: fadeUp .7s .18s ease both }
//         .fu3 { animation: fadeUp .7s .30s ease both }
//         .fu4 { animation: fadeUp .7s .44s ease both }
//         .fu5 { animation: fadeUp .7s .56s ease both }
//         .fi  { animation: fadeIn 1s .65s ease both }
//         .float-anim { animation: float 5s ease-in-out infinite }

//         .shimmer-text {
//           background: linear-gradient(90deg,#34d399,#6ee7b7,#34d399,#10b981);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 3s linear infinite;
//         }

//         .grid-bg {
//           background-image:
//             linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
//           background-size: 64px 64px;
//         }

//         .hero-glow {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//           background: radial-gradient(circle, rgba(52,211,153,.12) 0%, transparent 65%);
//         }

//         .badge-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 6px 14px;
//           border-radius: 999px;
//           background: rgba(52,211,153,.08);
//           border: 1px solid rgba(52,211,153,.22);
//           color: #34d399;
//           font-size: 12px;
//           font-weight: 500;
//           letter-spacing: .03em;
//         }

//         .btn-primary {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 13px 28px;
//           border-radius: 14px;
//           background: #fff;
//           color: #080810;
//           font-weight: 600;
//           font-size: 14px;
//           text-decoration: none;
//           letter-spacing: -.01em;
//           transition: background .2s, transform .15s;
//         }
//         .btn-primary:hover { background: rgba(255,255,255,.9); transform: translateY(-1px) }
//         .btn-primary:active { transform: translateY(0) }

//         .btn-ghost {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 13px 24px;
//           border-radius: 14px;
//           border: 1px solid rgba(255,255,255,.1);
//           color: rgba(255,255,255,.5);
//           font-size: 14px;
//           font-weight: 500;
//           text-decoration: none;
//           transition: background .2s, border-color .2s, color .2s;
//         }
//         .btn-ghost:hover { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.18); color: rgba(255,255,255,.8) }

//         .feature-card {
//           padding: 24px;
//           border-radius: 16px;
//           border: 1px solid rgba(255,255,255,.07);
//           background: rgba(255,255,255,.025);
//           transition: border-color .25s, background .25s, transform .25s;
//         }
//         .feature-card:hover {
//           border-color: rgba(52,211,153,.22);
//           background: rgba(52,211,153,.03);
//           transform: translateY(-2px);
//         }

//         .metric-card {
//           padding: 20px 16px;
//           border-radius: 16px;
//           border: 1px solid rgba(255,255,255,.07);
//           background: rgba(255,255,255,.025);
//           text-align: center;
//           transition: border-color .25s, transform .25s;
//         }
//         .metric-card:hover { border-color: rgba(52,211,153,.2); transform: translateY(-2px) }

//         .step-card {
//           padding: 24px;
//           border-radius: 16px;
//           border: 1px solid rgba(255,255,255,.07);
//           background: rgba(255,255,255,.025);
//           height: 100%;
//           transition: border-color .25s, transform .25s;
//         }
//         .step-card:hover { border-color: rgba(52,211,153,.2); transform: translateY(-2px) }

//         .why-row {
//           display: flex;
//           align-items: flex-start;
//           gap: 16px;
//           padding: 16px;
//           border-radius: 16px;
//           border: 1px solid rgba(255,255,255,.06);
//           background: rgba(255,255,255,.02);
//           transition: border-color .25s, background .25s;
//         }
//         .why-row:hover { border-color: rgba(52,211,153,.18); background: rgba(52,211,153,.02) }

//         .cta-box {
//           border-radius: 24px;
//           padding: 64px 40px;
//           text-align: center;
//           border: 1px solid rgba(52,211,153,.2);
//           background: linear-gradient(135deg, rgba(52,211,153,.08) 0%, rgba(16,185,129,.04) 50%, rgba(52,211,153,.08) 100%);
//           position: relative;
//           overflow: hidden;
//         }
//         .cta-box::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,.12) 0%, transparent 60%);
//           pointer-events: none;
//         }

//         .preview-ring {
//           position: absolute;
//           inset: -3px;
//           border-radius: 20px;
//           background: linear-gradient(135deg, rgba(52,211,153,.3), rgba(16,185,129,.1), rgba(52,211,153,.3));
//           animation: pulseRing 3s ease-in-out infinite;
//           z-index: 0;
//         }

//         .section-label {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: .1em;
//           text-transform: uppercase;
//           color: #34d399;
//           margin-bottom: 12px;
//           display: block;
//         }

//         .nav-link-footer {
//           font-size: 12px;
//           color: rgba(255,255,255,.3);
//           text-decoration: none;
//           transition: color .2s;
//         }
//         .nav-link-footer:hover { color: #34d399 }

//         @media (max-width: 767px) {
//           .hide-mobile { display: none !important }
//         }
//       `}</style>

//       <ClientNav />

//       {/* ══════════ HERO ══════════ */}
//       <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
//         <div className="absolute inset-0 grid-bg pointer-events-none" />
//         <div className="hero-glow" style={{ width:700, height:700, top:'-15%', left:'50%', transform:'translateX(-50%)' }} />
//         <div className="hero-glow" style={{ width:500, height:500, bottom:'-20%', left:'-10%', opacity:.45 }} />
//         <div className="hero-glow" style={{ width:500, height:500, bottom:'-20%', right:'-10%', opacity:.45 }} />

//         <div className="relative z-10 text-center max-w-3xl mx-auto">
//           <div className="fu1 flex justify-center mb-7">
//             <span className="badge-pill">
//               <Sparkles className="w-3 h-3" />
//               AI-Powered Quiz Platform
//             </span>
//           </div>

//           <h1 className="fu2 text-white tracking-tight mb-4 leading-[1.08]"
//             style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(42px,7vw,76px)' }}>
//             Create quizzes
//             <span className="block shimmer-text">students love.</span>
//           </h1>

//           <p className="fu3 max-w-lg mx-auto leading-relaxed mb-2"
//             style={{ color:'rgba(255,255,255,.55)', fontSize:'clamp(15px,2vw,18px)' }}>
//             Build AI-powered assessments in minutes, share with a link, and get real-time results — all in one platform built for educators.
//           </p>

//           <div className="fu4 flex items-center justify-center gap-3 flex-wrap mt-9">
//             <Link href="/signup" className="btn-primary">
//               Start for free
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//             <Link href="/login" className="btn-ghost">
//               Sign in
//             </Link>
//           </div>

//           <div className="fu5 flex items-center justify-center gap-2 mt-7 flex-wrap">
//             {['No credit card required', 'Free plan always available', 'Setup in 2 minutes'].map((t, i) => (
//               <>
//                 <span key={t} className="text-xs" style={{ color:'rgba(255,255,255,.25)' }}>{t}</span>
//                 {i < 2 && <span key={`dot-${i}`} className="text-xs" style={{ color:'rgba(255,255,255,.12)' }}>·</span>}
//               </>
//             ))}
//           </div>
//         </div>

//         {/* Dashboard preview */}
//         <div className="fi relative z-10 w-full max-w-4xl mx-auto mt-14 px-2">
//           <div className="preview-ring" />
//           <div className="relative z-10 rounded-2xl overflow-hidden float-anim"
//             style={{ border:'1px solid rgba(52,211,153,.22)', boxShadow:'0 40px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(52,211,153,.1)' }}>
//             <DashboardPreview />
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
//             style={{ background:'linear-gradient(to top, #080810, transparent)' }} />
//         </div>
//       </section>

//       {/* ══════════ METRICS ══════════ */}
//       <section className="py-16 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)' }}>
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { val:'2 min',      lbl:'To create a quiz' },
//               { val:'Free',       lbl:'Plan available' },
//               { val:'100%',       lbl:'Auto-graded' },
//               { val:'All devices',lbl:'Works everywhere' },
//             ].map(({ val, lbl }) => (
//               <div key={lbl} className="metric-card">
//                 <div className="font-bold text-white" style={{ fontSize:28, letterSpacing:'-.02em', lineHeight:1.1 }}>{val}</div>
//                 <div className="mt-1" style={{ fontSize:11, color:'rgba(255,255,255,.32)', textTransform:'uppercase', letterSpacing:'.05em' }}>{lbl}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ FEATURES ══════════ */}
//       <section className="py-24 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-14">
//             <span className="section-label">Features</span>
//             <h2 className="text-white font-bold tracking-tight mb-4"
//               style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(28px,4vw,42px)' }}>
//               Everything you need for{' '}
//               <span style={{ color:'#34d399' }}>modern assessments</span>
//             </h2>
//             <p className="max-w-md mx-auto text-base" style={{ color:'rgba(255,255,255,.38)' }}>
//               One platform. No juggling tools.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[
//               { icon:Brain,     title:'AI Question Generator',    desc:'Type a topic and get a full quiz in seconds. Powered by Groq. Edit anything you want.' },
//               { icon:Zap,       title:'Instant auto-grading',     desc:'Students get their score the moment they submit. No manual grading, ever.' },
//               { icon:BarChart3, title:'Real-time analytics',      desc:"See class averages, per-question difficulty, and each student's progress." },
//               { icon:Shield,    title:'Time limits & controls',   desc:'Set quiz durations, question order, and restrict access to assigned students.' },
//               { icon:Users,     title:'Class management',         desc:'Assign quizzes to specific students or make them public with a shareable link.' },
//               { icon:BookOpen,  title:'Share in one click',       desc:'Copy a link, embed it, or send via email. No account required for students.' },
//             ].map(({ icon: Icon, title, desc }) => (
//               <div key={title} className="feature-card">
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
//                   style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
//                   <Icon className="w-5 h-5" style={{ color:'#34d399' }} />
//                 </div>
//                 <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
//                 <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,.4)' }}>{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ HOW IT WORKS ══════════ */}
//       <section className="py-24 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)', background:'rgba(255,255,255,.01)' }}>
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-14">
//             <span className="section-label">How it works</span>
//             <h2 className="text-white font-bold tracking-tight"
//               style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(28px,4vw,42px)' }}>
//               From idea to quiz in{' '}
//               <span style={{ color:'#34d399' }}>3 steps</span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { step:'01', title:'Create', icon:Brain,      desc:'Write questions manually or let AI generate a full quiz from any topic in seconds.',          detail:'Supports MCQ with custom marks per question' },
//               { step:'02', title:'Share',  icon:Users,      desc:'Get a link. Share with your class, embed anywhere, or restrict to specific students.',         detail:'Works on desktop, tablet, and mobile' },
//               { step:'03', title:'Analyze',icon:TrendingUp, desc:'Watch results live. See who scored what and which questions were hardest.',                    detail:'Export CSV for your records' },
//             ].map(({ step, title, icon: Icon, desc, detail }) => (
//               <div key={step} className="step-card">
//                 <div className="flex items-center gap-3 mb-5">
//                   <span className="font-bold" style={{ color:'rgba(52,211,153,.2)', fontFamily:"'DM Serif Display',serif", fontSize:42, lineHeight:1 }}>{step}</span>
//                   <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//                     style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
//                     <Icon className="w-4 h-4" style={{ color:'#34d399' }} />
//                   </div>
//                 </div>
//                 <h3 className="text-white font-semibold text-xl mb-2">{title}</h3>
//                 <p className="text-sm leading-relaxed mb-4" style={{ color:'rgba(255,255,255,.4)' }}>{desc}</p>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color:'#34d399' }} />
//                   <span className="text-xs" style={{ color:'rgba(255,255,255,.28)' }}>{detail}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ WHY QUIZFORGE ══════════ */}
//       <section className="py-24 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="section-label">Why QuizForge</span>
//               <h2 className="text-white font-bold tracking-tight mb-6"
//                 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,3.5vw,38px)' }}>
//                 Built for educators,<br />
//                 <span style={{ color:'#34d399' }}>not engineers.</span>
//               </h2>
//               <p className="text-base leading-relaxed mb-8" style={{ color:'rgba(255,255,255,.42)' }}>
//                 QuizForge removes the friction between having a quiz idea and running it with your students. No setup, no technical skills, no spreadsheets.
//               </p>
//               <Link href="/signup" className="btn-primary">
//                 Create your first quiz
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="space-y-3">
//               {[
//                 { icon:Zap,       head:'Instant grading',       body:"Every submission is graded the moment it's submitted. No waiting, no manual work." },
//                 { icon:Brain,     head:'AI-generated questions', body:'Type a topic, pick a difficulty, and get a complete quiz in under 10 seconds.' },
//                 { icon:BarChart3, head:'Actionable analytics',  body:'See which questions confused students most and where to focus your next lesson.' },
//                 { icon:Shield,    head:'Access control',         body:'Make quizzes public or assign them to specific students — your call every time.' },
//               ].map(({ icon: Icon, head, body }) => (
//                 <div key={head} className="why-row">
//                   <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
//                     style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.18)' }}>
//                     <Icon className="w-4 h-4" style={{ color:'#34d399' }} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white mb-0.5">{head}</p>
//                     <p className="text-xs leading-relaxed" style={{ color:'rgba(255,255,255,.36)' }}>{body}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════ FAQ ══════════ */}
//       <section className="py-24 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)', background:'rgba(255,255,255,.01)' }}>
//         <div className="max-w-2xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="section-label">FAQ</span>
//             <h2 className="text-white font-bold tracking-tight"
//               style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,4vw,38px)' }}>
//               Common questions
//             </h2>
//           </div>
//           <div className="space-y-6">
//             {[
//               { q:'How do I create an online quiz?',      a:'Sign up for free, click "Create Quiz", add questions manually or let AI generate them, set a time limit, and share the link. The whole process takes about 2 minutes.' },
//               { q:'Is QuizForge really free?',            a:"Yes. The free plan includes unlimited quiz creation, basic analytics, and link sharing. No credit card required." },
//               { q:'Can students take quizzes on mobile?', a:"Yes. QuizForge works on every device — desktop, tablet, and mobile. Students don't need to install anything." },
//               { q:'What analytics do I get?',             a:'Real-time results: per-student scores, class averages, question-level pass rates, and CSV export.' },
//               { q:'Can I use QuizForge for business?',    a:'Yes — many teams use it for onboarding, compliance training, and skill checks. It works the same way regardless of context.' },
//             ].map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ CTA ══════════ */}
//       <section className="py-20 px-6">
//         <div className="max-w-3xl mx-auto">
//           <div className="cta-box">
//             <div className="relative z-10">
//               <div className="flex justify-center mb-6">
//                 <span className="badge-pill">
//                   <Sparkles className="w-3 h-3" />
//                   Free to get started
//                 </span>
//               </div>
//               <h2 className="text-white font-bold tracking-tight mb-4"
//                 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,4vw,42px)' }}>
//                 Ready to create your first quiz?
//               </h2>
//               <p className="mb-9 max-w-sm mx-auto" style={{ color:'rgba(255,255,255,.42)', fontSize:15 }}>
//                 Join educators already using QuizForge. No setup, no credit card, no commitment.
//               </p>
//               <div className="flex items-center justify-center gap-3 flex-wrap">
//                 <Link href="/signup" className="btn-primary">
//                   Create free account
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//                 <Link href="/login" className="btn-ghost">
//                   Sign in
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════ FOOTER ══════════ */}
//       <footer className="py-10 px-6 border-t" style={{ borderColor:'rgba(255,255,255,.06)' }}>
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2.5">
//             <div className="w-6 h-6 rounded-lg flex items-center justify-center"
//               style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
//               <span className="font-bold" style={{ fontSize:11, color:'#34d399' }}>Q</span>
//             </div>
//             <span className="font-semibold text-sm" style={{ color:'rgba(255,255,255,.45)' }}>QuizForge</span>
//           </div>
//           <p className="text-xs" style={{ color:'rgba(255,255,255,.2)' }}>
//             AI-powered quiz platform for educators
//           </p>
//           <div className="flex items-center gap-5">
//             <Link href="/signup" className="nav-link-footer">Sign up</Link>
//             <Link href="/login"  className="nav-link-footer">Log in</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }








// app/page.tsx  — QuizForge Homepage — pure server component, no event handlers
import Link from 'next/link';
import {
  Brain, Zap, BarChart3, Shield, Users, BookOpen,
  CheckCircle, ArrowRight, HelpCircle, Sparkles, TrendingUp
} from 'lucide-react';
import { ClientNav } from '@/components/client-nav';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I create an online quiz?",
      acceptedAnswer: { "@type": "Answer", text: "Sign up free, click 'Create Quiz', add questions or use AI to generate them, set a time limit, and share the link. Takes about 2 minutes." } },
    { "@type": "Question", name: "Is QuizForge free to use?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. The free plan includes unlimited quiz creation, basic analytics, and sharing features. No credit card required." } },
    { "@type": "Question", name: "Can students take quizzes on mobile devices?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. QuizForge works on all devices — desktop, tablet, and mobile. No app installation required." } },
    { "@type": "Question", name: "Does QuizForge provide analytics?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Real-time insights: average scores, question-level difficulty, and individual student performance reports." } },
    { "@type": "Question", name: "Can I use QuizForge for business training?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. QuizForge works well for employee onboarding, compliance training, and skill assessments." } },
  ],
};

function DashboardPreview() {
  return (
    <svg viewBox="0 0 780 460" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" role="img" aria-label="QuizForge dashboard preview">
      <rect width="780" height="460" rx="14" fill="#0d0d18" />
      <rect width="780" height="36" rx="14" fill="#111120" />
      <rect y="22" width="780" height="14" fill="#111120" />
      <circle cx="20" cy="18" r="5" fill="#f87171" opacity=".7" />
      <circle cx="36" cy="18" r="5" fill="#f59e0b" opacity=".7" />
      <circle cx="52" cy="18" r="5" fill="#34d399" opacity=".7" />
      <rect x="120" y="9" width="300" height="18" rx="9" fill="#1a1a2e" />
      <text x="270" y="22" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace">quizforge.com/teacher/dashboard</text>

      <rect x="0" y="36" width="180" height="424" fill="#0a0a14" />
      <rect x="16" y="52" width="26" height="26" rx="8" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
      <text x="29" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#34d399" fontFamily="sans-serif">Q</text>
      <text x="52" y="70" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">QuizForge</text>
      {[["Dashboard", true], ["Quizzes", false], ["Students", false], ["Results", false], ["Analytics", false]].map(([label, active], i) => (
        <g key={i}>
          <rect x="12" y={96 + i * 38} width="156" height="28" rx="8"
            fill={active ? "rgba(52,211,153,0.1)" : "transparent"}
            stroke={active ? "rgba(52,211,153,0.2)" : "transparent"} strokeWidth="1" />
          <text x="32" y={115 + i * 38} fontSize="11" fill={active ? "#34d399" : "rgba(255,255,255,0.35)"} fontFamily="sans-serif">{label as string}</text>
        </g>
      ))}

      <rect x="180" y="36" width="600" height="424" fill="#080810" />
      <text x="202" y="72" fontSize="11" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Welcome back 👋</text>
      <text x="202" y="94" fontSize="18" fontWeight="700" fill="white" fontFamily="sans-serif">Ahmed<tspan fill="#34d399">.</tspan></text>
      <text x="202" y="112" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">3 quizzes · 47 total attempts</text>

      {[["Total Quizzes","12","#a78bfa"],["Attempts","247","#34d399"],["Avg Score","74%","#f59e0b"],["Students","31","#38bdf8"]].map(([label, val, color], i) => (
        <g key={i}>
          <rect x={202 + i * 142} y="128" width="130" height="72" rx="12"
            fill="rgba(255,255,255,0.025)" stroke={`${color}33`} strokeWidth="1" />
          <circle cx={218 + i * 142} cy="148" r="10" fill={`${color}18`} />
          <text x={202 + i * 142 + 65} y="175" textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="sans-serif">{val as string}</text>
          <text x={202 + i * 142 + 65} y="189" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">{label as string}</text>
        </g>
      ))}

      <rect x="202" y="216" width="370" height="200" rx="12" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="220" y="238" fontSize="11" fontWeight="600" fill="white" fontFamily="sans-serif">Available Quizzes</text>
      <line x1="202" y1="248" x2="572" y2="248" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {[["JavaScript Basics","Beginner","#34d399","10 Qs"],["React Hooks","Intermediate","#f59e0b","15 Qs"],["Node.js APIs","Advanced","#f87171","12 Qs"],["CSS Layout","Beginner","#34d399","8 Qs"]].map(([name, diff, color, qs], i) => (
        <g key={i}>
          <rect x="202" y={255 + i * 38} width="370" height="37" fill={i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"} />
          <circle cx="222" cy={273 + i * 38} r="12" fill={`${color}18`} />
          <text x="222" y={277 + i * 38} textAnchor="middle" fontSize="8" fontWeight="700" fill={color as string} fontFamily="sans-serif">Q</text>
          <text x="244" y={270 + i * 38} fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">{name as string}</text>
          <text x="244" y={283 + i * 38} fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">{qs as string}</text>
          <rect x="470" y={261 + i * 38} width="58" height="16" rx="8" fill={`${color}18`} stroke={`${color}33`} strokeWidth="1" />
          <text x="499" y={273 + i * 38} textAnchor="middle" fontSize="8" fill={color as string} fontFamily="sans-serif">{diff as string}</text>
          <rect x="536" y={261 + i * 38} width="30" height="16" rx="8" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
          <text x="551" y={273 + i * 38} textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="sans-serif">Start</text>
        </g>
      ))}

      <rect x="586" y="216" width="186" height="200" rx="12" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="604" y="238" fontSize="11" fontWeight="600" fill="white" fontFamily="sans-serif">Performance</text>
      <line x1="586" y1="248" x2="772" y2="248" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="604" y="268" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Average score</text>
      <text x="760" y="268" textAnchor="end" fontSize="9" fontWeight="700" fill="#34d399" fontFamily="sans-serif">74%</text>
      <rect x="604" y="274" width="154" height="5" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="604" y="274" width="114" height="5" rx="3" fill="rgba(52,211,153,0.6)" />
      <text x="604" y="302" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Recent scores</text>
      {[80, 65, 90, 55, 74].map((pct, i) => {
        const c = pct >= 70 ? "#34d399" : pct >= 50 ? "#f59e0b" : "#f87171";
        return (
          <g key={i}>
            <rect x="604" y={309 + i * 16} width="134" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="604" y={309 + i * 16} width={Math.round(134 * pct / 100)} height="6" rx="3" fill={c} opacity=".7" />
            <text x="746" y={316 + i * 16} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">{pct}%</text>
          </g>
        );
      })}

      <rect x="180" y="430" width="600" height="30" fill="#0a0a14" />
      <text x="202" y="449" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">QuizForge · AI-powered assessment platform</text>
      <circle cx="750" cy="445" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <circle cx="750" cy="445" r="2.5" fill="#34d399" />
      <text x="742" y="448" textAnchor="end" fontSize="8" fill="rgba(52,211,153,0.7)" fontFamily="sans-serif">Live</text>
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="faq-item border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <h3 className="text-white font-semibold text-base mb-2 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34d399' }} />
        {question}
      </h3>
      <p className="text-sm leading-relaxed pl-6" style={{ color: 'rgba(255,255,255,0.4)' }}>{answer}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#080810] min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes float    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-10px) } }
        @keyframes shimmer  { 0% { background-position:-200% center } 100% { background-position:200% center } }
        @keyframes pulseRing{ 0%,100% { opacity:.4 } 50% { opacity:.9 } }

        .fu1 { animation: fadeUp .7s .05s ease both }
        .fu2 { animation: fadeUp .7s .18s ease both }
        .fu3 { animation: fadeUp .7s .30s ease both }
        .fu4 { animation: fadeUp .7s .44s ease both }
        .fu5 { animation: fadeUp .7s .56s ease both }
        .fi  { animation: fadeIn 1s .65s ease both }
        .float-anim { animation: float 5s ease-in-out infinite }

        .shimmer-text {
          background: linear-gradient(90deg,#34d399,#6ee7b7,#34d399,#10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(52,211,153,.12) 0%, transparent 65%);
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(52,211,153,.08);
          border: 1px solid rgba(52,211,153,.22);
          color: #34d399;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .03em;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 14px;
          background: #fff;
          color: #080810;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: -.01em;
          transition: background .2s, transform .15s;
        }
        .btn-primary:hover { background: rgba(255,255,255,.9); transform: translateY(-1px) }
        .btn-primary:active { transform: translateY(0) }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.5);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background .2s, border-color .2s, color .2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.18); color: rgba(255,255,255,.8) }

        .feature-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          transition: border-color .25s, background .25s, transform .25s;
        }
        .feature-card:hover {
          border-color: rgba(52,211,153,.22);
          background: rgba(52,211,153,.03);
          transform: translateY(-2px);
        }

        .metric-card {
          padding: 20px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          text-align: center;
          transition: border-color .25s, transform .25s;
        }
        .metric-card:hover { border-color: rgba(52,211,153,.2); transform: translateY(-2px) }

        .step-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          height: 100%;
          transition: border-color .25s, transform .25s;
        }
        .step-card:hover { border-color: rgba(52,211,153,.2); transform: translateY(-2px) }

        .why-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
          transition: border-color .25s, background .25s;
        }
        .why-row:hover { border-color: rgba(52,211,153,.18); background: rgba(52,211,153,.02) }

        .cta-box {
          border-radius: 24px;
          padding: 64px 40px;
          text-align: center;
          border: 1px solid rgba(52,211,153,.2);
          background: linear-gradient(135deg, rgba(52,211,153,.08) 0%, rgba(16,185,129,.04) 50%, rgba(52,211,153,.08) 100%);
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .preview-ring {
          position: absolute;
          inset: -3px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(52,211,153,.3), rgba(16,185,129,.1), rgba(52,211,153,.3));
          animation: pulseRing 3s ease-in-out infinite;
          z-index: 0;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #34d399;
          margin-bottom: 12px;
          display: block;
        }

        .nav-link-footer {
          font-size: 12px;
          color: rgba(255,255,255,.3);
          text-decoration: none;
          transition: color .2s;
        }
        .nav-link-footer:hover { color: #34d399 }

        @media (max-width: 767px) {
          .hide-mobile { display: none !important }
        }
      `}</style>

      <ClientNav />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="hero-glow" style={{ width:700, height:700, top:'-15%', left:'50%', transform:'translateX(-50%)' }} />
        <div className="hero-glow" style={{ width:500, height:500, bottom:'-20%', left:'-10%', opacity:.45 }} />
        <div className="hero-glow" style={{ width:500, height:500, bottom:'-20%', right:'-10%', opacity:.45 }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="fu1 flex justify-center mb-7">
            <span className="badge-pill">
              <Sparkles className="w-3 h-3" />
              AI-Powered Quiz Platform
            </span>
          </div>

          <h1 className="fu2 text-white tracking-tight mb-4 leading-[1.08]"
            style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(42px,7vw,76px)' }}>
            Create quizzes
            <span className="block shimmer-text">students love.</span>
          </h1>

          <p className="fu3 max-w-lg mx-auto leading-relaxed mb-2"
            style={{ color:'rgba(255,255,255,.55)', fontSize:'clamp(15px,2vw,18px)' }}>
            Build AI-powered assessments in minutes, share with a link, and get real-time results — all in one platform built for educators.
          </p>

          <div className="fu4 flex items-center justify-center gap-3 flex-wrap mt-9">
            <Link href="/signup" className="btn-primary">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-ghost">
              Sign in
            </Link>
          </div>

          <div className="fu5 flex items-center justify-center gap-2 mt-7 flex-wrap">
            <span className="text-xs" style={{ color:'rgba(255,255,255,.25)' }}>No credit card required</span>
            <span className="text-xs" style={{ color:'rgba(255,255,255,.12)' }}>·</span>
            <span className="text-xs" style={{ color:'rgba(255,255,255,.25)' }}>Free plan always available</span>
            <span className="text-xs" style={{ color:'rgba(255,255,255,.12)' }}>·</span>
            <span className="text-xs" style={{ color:'rgba(255,255,255,.25)' }}>Setup in 2 minutes</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="fi relative z-10 w-full max-w-4xl mx-auto mt-14 px-2">
          <div className="preview-ring" />
          <div className="relative z-10 rounded-2xl overflow-hidden float-anim"
            style={{ border:'1px solid rgba(52,211,153,.22)', boxShadow:'0 40px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(52,211,153,.1)' }}>
            <DashboardPreview />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background:'linear-gradient(to top, #080810, transparent)' }} />
        </div>
      </section>

      {/* ══════════ METRICS ══════════ */}
      <section className="py-16 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val:'2 min',      lbl:'To create a quiz' },
              { val:'Free',       lbl:'Plan available' },
              { val:'100%',       lbl:'Auto-graded' },
              { val:'All devices',lbl:'Works everywhere' },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="metric-card">
                <div className="font-bold text-white" style={{ fontSize:28, letterSpacing:'-.02em', lineHeight:1.1 }}>{val}</div>
                <div className="mt-1" style={{ fontSize:11, color:'rgba(255,255,255,.32)', textTransform:'uppercase', letterSpacing:'.05em' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Features</span>
            <h2 className="text-white font-bold tracking-tight mb-4"
              style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(28px,4vw,42px)' }}>
              Everything you need for{' '}
              <span style={{ color:'#34d399' }}>modern assessments</span>
            </h2>
            <p className="max-w-md mx-auto text-base" style={{ color:'rgba(255,255,255,.38)' }}>
              One platform. No juggling tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:Brain,     title:'AI Question Generator',    desc:'Type a topic and get a full quiz in seconds. Powered by Groq. Edit anything you want.' },
              { icon:Zap,       title:'Instant auto-grading',     desc:'Students get their score the moment they submit. No manual grading, ever.' },
              { icon:BarChart3, title:'Real-time analytics',      desc:"See class averages, per-question difficulty, and each student's progress." },
              { icon:Shield,    title:'Time limits & controls',   desc:'Set quiz durations, question order, and restrict access to assigned students.' },
              { icon:Users,     title:'Class management',         desc:'Assign quizzes to specific students or make them public with a shareable link.' },
              { icon:BookOpen,  title:'Share in one click',       desc:'Copy a link, embed it, or send via email. No account required for students.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
                  <Icon className="w-5 h-5" style={{ color:'#34d399' }} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,.4)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-24 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)', background:'rgba(255,255,255,.01)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">How it works</span>
            <h2 className="text-white font-bold tracking-tight"
              style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(28px,4vw,42px)' }}>
              From idea to quiz in{' '}
              <span style={{ color:'#34d399' }}>3 steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step:'01', title:'Create', icon:Brain,      desc:'Write questions manually or let AI generate a full quiz from any topic in seconds.',          detail:'Supports MCQ with custom marks per question' },
              { step:'02', title:'Share',  icon:Users,      desc:'Get a link. Share with your class, embed anywhere, or restrict to specific students.',         detail:'Works on desktop, tablet, and mobile' },
              { step:'03', title:'Analyze',icon:TrendingUp, desc:'Watch results live. See who scored what and which questions were hardest.',                    detail:'Export CSV for your records' },
            ].map(({ step, title, icon: Icon, desc, detail }) => (
              <div key={step} className="step-card">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-bold" style={{ color:'rgba(52,211,153,.2)', fontFamily:"'DM Serif Display',serif", fontSize:42, lineHeight:1 }}>{step}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
                    <Icon className="w-4 h-4" style={{ color:'#34d399' }} />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color:'rgba(255,255,255,.4)' }}>{desc}</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color:'#34d399' }} />
                  <span className="text-xs" style={{ color:'rgba(255,255,255,.28)' }}>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY QUIZFORGE ══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Why QuizForge</span>
              <h2 className="text-white font-bold tracking-tight mb-6"
                style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,3.5vw,38px)' }}>
                Built for educators,<br />
                <span style={{ color:'#34d399' }}>not engineers.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color:'rgba(255,255,255,.42)' }}>
                QuizForge removes the friction between having a quiz idea and running it with your students. No setup, no technical skills, no spreadsheets.
              </p>
              <Link href="/signup" className="btn-primary">
                Create your first quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { icon:Zap,       head:'Instant grading',       body:"Every submission is graded the moment it's submitted. No waiting, no manual work." },
                { icon:Brain,     head:'AI-generated questions', body:'Type a topic, pick a difficulty, and get a complete quiz in under 10 seconds.' },
                { icon:BarChart3, head:'Actionable analytics',  body:'See which questions confused students most and where to focus your next lesson.' },
                { icon:Shield,    head:'Access control',         body:'Make quizzes public or assign them to specific students — your call every time.' },
              ].map(({ icon: Icon, head, body }) => (
                <div key={head} className="why-row">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.18)' }}>
                    <Icon className="w-4 h-4" style={{ color:'#34d399' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{head}</p>
                    <p className="text-xs leading-relaxed" style={{ color:'rgba(255,255,255,.36)' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-24 px-6 border-y" style={{ borderColor:'rgba(255,255,255,.06)', background:'rgba(255,255,255,.01)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="text-white font-bold tracking-tight"
              style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,4vw,38px)' }}>
              Common questions
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { q:'How do I create an online quiz?',      a:'Sign up for free, click "Create Quiz", add questions manually or let AI generate them, set a time limit, and share the link. The whole process takes about 2 minutes.' },
              { q:'Is QuizForge really free?',            a:"Yes. The free plan includes unlimited quiz creation, basic analytics, and link sharing. No credit card required." },
              { q:'Can students take quizzes on mobile?', a:"Yes. QuizForge works on every device — desktop, tablet, and mobile. Students don't need to install anything." },
              { q:'What analytics do I get?',             a:'Real-time results: per-student scores, class averages, question-level pass rates, and CSV export.' },
              { q:'Can I use QuizForge for business?',    a:'Yes — many teams use it for onboarding, compliance training, and skill checks. It works the same way regardless of context.' },
            ].map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="cta-box">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <span className="badge-pill">
                  <Sparkles className="w-3 h-3" />
                  Free to get started
                </span>
              </div>
              <h2 className="text-white font-bold tracking-tight mb-4"
                style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(26px,4vw,42px)' }}>
                Ready to create your first quiz?
              </h2>
              <p className="mb-9 max-w-sm mx-auto" style={{ color:'rgba(255,255,255,.42)', fontSize:15 }}>
                Join educators already using QuizForge. No setup, no credit card, no commitment.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/signup" className="btn-primary">
                  Create free account
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="btn-ghost">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-10 px-6 border-t" style={{ borderColor:'rgba(255,255,255,.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background:'rgba(52,211,153,.1)', border:'1px solid rgba(52,211,153,.2)' }}>
              <span className="font-bold" style={{ fontSize:11, color:'#34d399' }}>Q</span>
            </div>
            <span className="font-semibold text-sm" style={{ color:'rgba(255,255,255,.45)' }}>QuizForge</span>
          </div>
          <p className="text-xs" style={{ color:'rgba(255,255,255,.2)' }}>
            AI-powered quiz platform for educators
          </p>
          <div className="flex items-center gap-5">
            <Link href="/signup" className="nav-link-footer">Sign up</Link>
            <Link href="/login"  className="nav-link-footer">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}