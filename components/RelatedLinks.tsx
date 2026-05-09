// components/RelatedLinks.tsx
import Link from 'next/link';

export function RelatedLinks() {
  return (
    <div className="my-8 p-5 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
      <p className="text-white/80 text-sm leading-relaxed">
        💡 <strong className="text-white">Want to create quizzes faster?</strong>{' '}
        Try <Link href="/signup" className="text-emerald-400 hover:underline">QuizForge's AI quiz generator</Link> — 
        create questions from any topic in seconds. <Link href="/features" className="text-emerald-400 hover:underline">Learn more →</Link>
      </p>
    </div>
  );
}