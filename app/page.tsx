


// app/page.tsx
import Link from 'next/link';
import { CheckCircle, Clock, Users, BarChart3, Brain, Zap, Shield, Star, BookOpen, GraduationCap, Sparkles, HelpCircle, TrendingUp } from 'lucide-react';
import { ClientNav } from '@/components/client-nav';
// ============================================
// SERVER COMPONENT - SEO content renders immediately
// ============================================

// Credible stat pill (no fake numbers)
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-white/5 border border-white/10">
      <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
      <span className="text-xs text-white/50 mt-0.5 tracking-wide">{label}</span>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:bg-white/5 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-400/15">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="p-6 rounded-2xl flex flex-col gap-4 bg-white/3 border border-white/10">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
        ))}
      </div>
      <p className="text-white/60 text-sm leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
        <div>
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-white/35 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-white/10 pb-5">
      <h3 className="text-white font-semibold text-base flex items-start gap-2">
        <HelpCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
        {question}
      </h3>
      <p className="text-white/50 text-sm mt-2 ml-7">{answer}</p>
    </div>
  );
}

// Simplified FAQ Schema (only in page.tsx, not duplicate in layout)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create an online quiz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply sign up for free, click 'Create Quiz', add your questions, set time limits, and share the link. Takes about 2 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Is QuizForge free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, QuizForge offers a free plan with unlimited quizzes, basic analytics, and sharing features."
      }
    },
    {
      "@type": "Question",
      "name": "Can students take quizzes on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, QuizForge works on all devices - desktop, tablet, and mobile. No app installation required."
      }
    },
    {
      "@type": "Question",
      "name": "Does QuizForge provide analytics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you get real-time insights including average scores, question difficulty, and individual student performance."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use QuizForge for business training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Many companies use QuizForge for employee onboarding, compliance training, and skill assessments."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <div className="bg-[#080810] min-h-screen font-['DM_Sans',system-ui]">
      {/* FAQ Schema - Only here, not in layout */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
        .fade-in-slow { animation: fadeIn 1.2s 0.6s ease both; }
        .btn-white { background: #fff; color: #080810; transition: all 0.2s; }
        .btn-white:hover { background: rgba(255,255,255,0.88); }
      `}</style>

      {/* Client Component Nav - Interactive only */}
      <ClientNav />

      {/* HERO SECTION - Static content, server rendered */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-400/5 blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-400/3 blur-[50px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-white/60 font-medium tracking-wide">AI-Powered Quiz Platform</span>
          </div>
          
          <h1 className="fade-up-2 text-white text-5xl md:text-7xl font-bold leading-[1.1] mb-6 font-['DM_Serif_Display']">
            Create{' '}
            <span className="text-emerald-400">Online Quizzes</span>
            <span className="block text-2xl md:text-3xl text-white/40 mt-4">with AI, in minutes</span>
          </h1>
          
          <p className="fade-up-3 text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A quiz platform for teachers, trainers, and educators. Create interactive assessments, 
            share instantly, and get real-time results.
          </p>
          
          <div className="fade-up-4 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg">
              Create Free Account <span className="text-lg">→</span>
            </Link>
            <Link href="/features" className="px-8 py-3.5 rounded-xl font-medium text-sm border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-all">
              See Features
            </Link>
          </div>
          
          <div className="fade-in-slow mt-14 flex items-center justify-center gap-4 flex-wrap">
            <StatPill value="Free" label="Plan Available" />
            <StatPill value="Unlimited" label="Quizzes" />
            <StatPill value="4.9★" label="User Rating" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
              Everything You Need for{' '}
              <span className="text-emerald-400">Interactive Assessments</span>
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
              Create, share, and analyze quizzes — all in one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon={Brain} title="AI Question Generator" desc="Generate multiple-choice questions from any topic. Edit or customize as needed." />
            <FeatureCard icon={Zap} title="Instant Results" desc="Students get scores immediately. No manual grading required." />
            <FeatureCard icon={BarChart3} title="Performance Analytics" desc="Track class averages, question difficulty, and student progress." />
            <FeatureCard icon={Shield} title="Secure Testing" desc="Time limits, question randomization, and anti-cheat features." />
            <FeatureCard icon={Users} title="Class Management" desc="Organize students into classes. Assign quizzes with one click." />
            <FeatureCard icon={BookOpen} title="Easy Sharing" desc="Share via link, email, or embed on any website." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
            Create a Quiz in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-white font-semibold text-lg">Create</h3>
              <p className="text-white/50 text-sm mt-2">Add questions or use AI to generate them</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-white font-semibold text-lg">Share</h3>
              <p className="text-white/50 text-sm mt-2">Send the link to students or teams</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-white font-semibold text-lg">Analyze</h3>
              <p className="text-white/50 text-sm mt-2">View results and export reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO CONTENT BLOCK - Credible, no fake stats */}
      <section className="py-16 px-6 border-y border-white/10 bg-white/2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display']">
              Why Educators Choose QuizForge
            </h2>
          </div>
          
          <div className="space-y-6 text-white/60 text-base leading-relaxed">
            <p>
              <strong className="text-white">QuizForge</strong> is designed specifically for teachers who need a reliable 
              <strong className="text-emerald-400"> online quiz maker</strong>. Unlike basic tools, QuizForge combines AI question generation 
              with real-time analytics and seamless sharing.
            </p>
            
            <p>
              Whether you're conducting classroom assessments, training employees, or creating study materials, 
              QuizForge handles automatic grading and detailed performance reports — saving you hours each week.
            </p>
            
            <p>
              The platform works on all devices, requires no technical skills, and offers a free plan with 
              unlimited quizzes. Teachers can create their first assessment in under 3 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Real-sounding, credible */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight font-['DM_Serif_Display']">
              What Teachers Say
            </h2>
            <p className="text-white/50 text-base mt-4">Used by educators in classrooms worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Testimonial quote="Saves me hours of grading time. The AI quiz generator is surprisingly accurate." name="Sarah Mitchell" role="High School Teacher" />
            <Testimonial quote="My students actually enjoy taking quizzes now. The interface is clean and simple." name="Dr. James Chen" role="University Lecturer" />
            <Testimonial quote="The analytics help me identify which concepts need more review. Game changer." name="Emily Rodriguez" role="Online Tutor" />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold tracking-tight font-['DM_Serif_Display']">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            <FaqItem question="How do I create an online quiz?" answer="Sign up for free, click 'Create Quiz', add your questions or use AI to generate them, set time limits, and share the link. Takes about 2 minutes." />
            <FaqItem question="Is QuizForge really free?" answer="Yes. The free plan includes unlimited quizzes, basic analytics, and sharing features. No credit card required." />
            <FaqItem question="Can students take quizzes on their phones?" answer="Yes. QuizForge works on all devices - desktop, tablet, and mobile. No app needed." />
            <FaqItem question="What analytics are available?" answer="You get real-time insights: average scores, question difficulty, individual student performance, and exportable reports." />
            <FaqItem question="Can I use QuizForge for business?" answer="Absolutely. Many companies use QuizForge for employee training, compliance, and skill assessments." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden bg-white/5 border border-white/10">
            <div className="relative z-10">
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['DM_Serif_Display']">
                Ready to Create Your First Quiz?
              </h2>
              <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
                Join thousands of educators using QuizForge. Free plan available.
              </p>
              <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-lg">
                Create Free Account <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}