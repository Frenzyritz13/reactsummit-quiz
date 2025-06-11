import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FirebaseProvider } from '@/components/firebase-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PR Reviewer Personality Quiz | Discover Your Code Review Style',
  description: 'Find out if you\'re a Nitpicker, Rubber Stamp, Professor, Speedster, or Socializer! Take the fun quiz and discover your PR review personality.',
  keywords: 'code review, pull request, developer personality, quiz, GitHub, CodeRabbit',
  openGraph: {
    title: 'PR Reviewer Personality Quiz',
    description: 'Discover your code review personality! Are you a Nitpicker or a Speedster?',
    type: 'website',
    url: 'https://pr-quiz.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR Reviewer Personality Quiz',
    description: 'Find out your PR review style! Take the quiz now.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-white via-orange-100/10 to-orange-200/20 dark:from-gray-900 dark:via-orange-900/5 dark:to-orange-800/10`}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}