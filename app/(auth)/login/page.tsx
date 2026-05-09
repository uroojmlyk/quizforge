


// app/(auth)/login/page.tsx (Server Component - NO 'use client')
import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Sign in to QuizForge | AI Quiz Platform',
  description: 'Sign in to QuizForge to create AI-powered quizzes, track student progress, and access real-time analytics.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Sign in to QuizForge',
    description: 'Access your quiz dashboard and continue creating engaging assessments.',
    type: 'website',
    url: 'https://quizforge.com/login',
  },
};

export default function LoginPage() {
  return <LoginClient />;
}