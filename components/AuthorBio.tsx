// components/AuthorBio.tsx
import { User } from 'lucide-react';

export function AuthorBio() {
  return (
    <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-white font-semibold">QuizForge Team</h4>
          <p className="text-white/50 text-sm">
            Dedicated to helping teachers save time with AI-powered quiz tools.
          </p>
          <p className="text-white/40 text-xs mt-1">
            Used by 10,000+ educators worldwide
          </p>
        </div>
      </div>
    </div>
  );
}