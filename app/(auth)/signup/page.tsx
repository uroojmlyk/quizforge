
// app/(auth)/signup/page.tsx (Server Component)
import type { Metadata } from 'next';
import SignupClient from './SignupClient';
export const metadata: Metadata = {
  title: 'Create Account | QuizForge',
  description: 'Join QuizForge to create AI-powered quizzes, track student progress, and save time with automated grading.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Create Account | QuizForge',
    description: 'Start your journey with QuizForge - the AI quiz platform for teachers and educators.',
    type: 'website',
    url: 'https://quizforge.com/signup',
  },
};

export default function SignupPage() {
  return <SignupClient />;
}