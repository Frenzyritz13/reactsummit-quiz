"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QuizResult } from '@/types/quiz';
import { Mail, CheckCircle, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { saveQuizSignup } from '@/lib/firebase-client';

interface EmailSignupProps {
  result: QuizResult;
  onComplete: () => void;
  onSkip: () => void;
}

export function EmailSignup({ result, onComplete, onSkip }: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Save to Firebase if configured, otherwise just simulate
      await saveQuizSignup({
        email: email.toLowerCase().trim(),
        personalityType: result.archetype.id,
        personalityName: result.archetype.name,
        timestamp: new Date(),
        scores: result.score,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      });

      toast.success("Thanks for signing up!", {
        description: "You'll receive CodeRabbit updates and insights.",
      });

      onComplete();
    } catch (error) {
      console.error('Error saving signup:', error);
      toast.error("Signup failed", {
        description: "Please try again or skip for now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4 animate-bounce-subtle">
            {result.archetype.illustration}
          </div>
          <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-100/20">
            <Sparkles className="h-4 w-4 mr-1" />
            One More Thing...
          </Badge>
        </div>

        {/* Signup Card */}
        <Card className="glass-card border-orange-200/30">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-600">
              Want CodeRabbit Updates?
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Get insights on code review best practices and new features
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-100/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-orange-600 text-sm">Code Review Insights</h3>
                <p className="text-xs text-gray-600">
                  Tips tailored to your {result.archetype.name} personality
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-100/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-orange-600 text-sm">Product Updates</h3>
                <p className="text-xs text-gray-600">
                  Be first to know about new CodeRabbit features
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-100/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-orange-600 text-sm">Best Practices</h3>
                <p className="text-xs text-gray-600">
                  Learn from top engineering teams
                </p>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 pr-10 h-12 text-lg border-2 smooth-transition ${
                    email && isValid 
                      ? 'border-green-400 focus:border-green-500' 
                      : email && !isValid 
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-300 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                />
                {email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="flex-1 h-12 cr-button-primary disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing Up...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Sign Me Up
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSkip}
                  disabled={isSubmitting}
                  className="h-12 cr-button-secondary smooth-transition"
                >
                  Skip for Now
                </Button>
              </div>
            </form>

            {/* Privacy Note */}
            <p className="text-xs text-gray-600 text-center">
              We respect your privacy. Unsubscribe anytime. No spam, just valuable insights.
            </p>
          </CardContent>
        </Card>

        {/* Result Summary */}
        <Card className="glass-card border-orange-200/30 bg-gradient-to-r from-orange-50/20 to-orange-100/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">
              <strong className="text-orange-600">Your Result:</strong> {result.archetype.name} {result.archetype.emoji}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}