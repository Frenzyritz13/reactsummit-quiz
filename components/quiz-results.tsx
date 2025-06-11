"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizResult } from '@/types/quiz';
import { generateSocialShareUrls } from '@/utils/quiz-logic';
import { Share2, Twitter, MessageSquare, RotateCcw, Trophy, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { archetypes } from '@/data/quiz-data';

interface QuizResultsProps {
  result: QuizResult;
  onRetakeQuiz: () => void;
}

export function QuizResults({ result, onRetakeQuiz }: QuizResultsProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [shareUrls, setShareUrls] = useState<any>(null);

  useEffect(() => {
    // Reveal animation
    const timer = setTimeout(() => setIsRevealed(true), 500);
    setShareUrls(generateSocialShareUrls(result));
    return () => clearTimeout(timer);
  }, [result]);

  const handleShare = (platform: 'twitter' | 'slack' | 'copy') => {
    if (!shareUrls) return;

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrls.generic);
      toast.success("Copied to clipboard!", {
        description: "Share your result with your team.",
      });
    } else if (platform === 'twitter') {
      window.open(shareUrls.twitter, '_blank');
    } else if (platform === 'slack') {
      navigator.clipboard.writeText(shareUrls.generic);
      toast.success("Copied to clipboard!", {
        description: "Paste this in your Slack channel.",
      });
    }
  };

  const scoreEntries = Object.entries(result.score)
    .sort(([,a], [,b]) => b - a)
    .filter(([,score]) => score > 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full p-4 border-b border-orange-200/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-500" />
            <span className="font-semibold text-orange-600">Your Results</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Result Card */}
              <Card className={`glass-card border-orange-200/30 text-center smooth-transition ${
                isRevealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}>
                <CardHeader className="pb-6">
                  <div className="space-y-4">
                    <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-100/20">
                      <Trophy className="h-4 w-4 mr-1" />
                      Your Result
                    </Badge>
                    
                    <div className="text-8xl mb-4 animate-bounce-subtle">
                      {result.archetype.illustration}
                    </div>
                    
                    <CardTitle className="text-4xl md:text-5xl font-bold gradient-text">
                      {result.archetype.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    {result.archetype.description}
                  </p>

                  {/* Key Traits */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-600 flex items-center justify-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Your Key Traits
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {result.archetype.keyTraits.map((trait, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-orange-100/30 text-orange-700 px-4 py-2 border border-orange-200/50"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Fun Fact */}
                  <Card className="bg-gradient-to-r from-orange-50/50 to-orange-100/50 border-orange-200/30">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-orange-600 mb-2 flex items-center justify-center gap-2">
                        💡 Fun Fact
                      </h4>
                      <p className="text-gray-600 italic">
                        {result.archetype.funFact}
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Score Breakdown */}
              <Card className="glass-card border-orange-200/30">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-orange-600">
                    Your Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scoreEntries.map(([archetype, score]) => {
                      const percentage = (score / result.answersCount) * 100;
                      const archetypeData = archetypes[archetype as keyof typeof archetypes];
                      
                      return (
                        <div key={archetype} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{archetypeData?.emoji || '🤔'}</span>
                              <span className="font-medium capitalize text-orange-600">
                                {archetype.replace('-', ' ')}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {score}/{result.answersCount} ({Math.round(percentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-coderabbit-gradient h-2 rounded-full smooth-transition"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleShare('twitter')}
                    variant="outline"
                    className="border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 smooth-transition"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  
                  <Button
                    onClick={() => handleShare('slack')}
                    variant="outline"
                    className="border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 smooth-transition"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Slack
                  </Button>
                  
                  <Button
                    onClick={() => handleShare('copy')}
                    variant="outline"
                    className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/20 smooth-transition"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
                
                <Button
                  onClick={onRetakeQuiz}
                  variant="outline"
                  className="cr-button-secondary smooth-transition"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Bottom Message */}
              <Card className="glass-card border-orange-200/30">
                <CardContent className="p-6 text-center space-y-3">
                  <p className="text-sm text-gray-600">
                    Powered by CodeRabbit - Making code reviews better, one PR at a time
                  </p>
                  <p className="text-xs text-gray-600">
                    Share this quiz with your team and compare results!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}