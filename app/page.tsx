"use client";

import { useState } from 'react';
import { LandingPage } from '@/components/landing-page';
import { QuizQuestion } from '@/components/quiz-question';
import { EmailSignup } from '@/components/email-signup';
import { QuizResults } from '@/components/quiz-results';
import { questions } from '@/data/quiz-data';
import { calculateResult } from '@/utils/quiz-logic';
import { ArchetypeType, QuizResult } from '@/types/quiz';
import { Toaster } from 'sonner';

type QuizState = 'landing' | 'quiz' | 'signup' | 'results';

export default function Home() {
  const [state, setState] = useState<QuizState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeType[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = () => {
    setState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (archetype: ArchetypeType) => {
    const newAnswers = [...answers, archetype];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - calculate results and show signup
      const quizResult = calculateResult(newAnswers);
      setResult(quizResult);
      setState('signup');
    }
  };

  const handleSignupComplete = () => {
    setState('results');
  };

  const handleSignupSkip = () => {
    setState('results');
  };

  const handleRetakeQuiz = () => {
    setState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <>
      {state === 'landing' && (
        <LandingPage onStartQuiz={handleStartQuiz} />
      )}
      
      {state === 'quiz' && (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
      
      {state === 'signup' && result && (
        <EmailSignup
          result={result}
          onComplete={handleSignupComplete}
          onSkip={handleSignupSkip}
        />
      )}
      
      {state === 'results' && result && (
        <QuizResults
          result={result}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
      
      <Toaster />
    </>
  );
}