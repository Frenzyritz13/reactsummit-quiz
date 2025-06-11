"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitPullRequest, Users, Clock, Zap, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const archetypeIcons = [
    { icon: '🔍', name: 'Nitpicker', color: 'bg-red-50 text-red-700 border-red-200' },
    { icon: '👍', name: 'Rubber Stamp', color: 'bg-green-50 text-green-700 border-green-200' },
    { icon: '👨‍🏫', name: 'Professor', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { icon: '⚡', name: 'Speedster', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { icon: '💬', name: 'Socializer', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full p-4 border-b border-orange-200/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-6 w-6 text-orange-500" />
            <span className="font-semibold text-orange-600">PR Quiz</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 text-center lg:text-left space-y-12">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                  <GitPullRequest className="h-8 w-8 text-orange-500" />
                  <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-100/20">
                    CodeRabbit Quiz
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
                  What's Your PR Review Personality?
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  Discover whether you're a detail-obsessed Nitpicker, a speedy Rubber Stamp, 
                  or one of our other fascinating reviewer archetypes!
                </p>
              </div>

              {/* Archetype Preview */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {archetypeIcons.map((archetype, index) => (
                  <Card key={archetype.name} className={`quiz-card cursor-default border ${archetype.color} smooth-transition`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-3 text-center">
                      <div className="text-xl mb-1">{archetype.icon}</div>
                      <div className="text-xs font-medium">{archetype.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center lg:justify-start gap-1">
                    <Clock className="h-5 w-5" />
                    2 min
                  </div>
                  <div className="text-sm text-gray-600">Quick & Fun</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center lg:justify-start gap-1">
                    <Users className="h-5 w-5" />
                    5 Types
                  </div>
                  <div className="text-sm text-gray-600">Unique Personalities</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center lg:justify-start gap-1">
                    <Zap className="h-5 w-5" />
                    100% Free
                  </div>
                  <div className="text-sm text-gray-600">No Sign-up Required</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button
                  onClick={onStartQuiz}
                  size="lg"
                  className={`text-xl px-12 py-6 cr-button-primary smooth-transition ${
                    isHovered ? 'brand-pulse' : ''
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <GitPullRequest className="mr-2 h-6 w-6" />
                  Start the Quiz
                </Button>
                
                <p className="text-sm text-gray-600">
                  Takes less than 2 minutes • No email required
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How It Works */}
              <Card className="glass-card border-orange-200/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    How It Works
                  </h2>
                  
                  <div className="space-y-4 text-left">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-orange-100/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📝</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-600 text-sm">Answer 7 Questions</h3>
                        <p className="text-xs text-gray-600">
                          Real scenarios every developer faces during code reviews
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-orange-100/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🧬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-600 text-sm">Get Your Type</h3>
                        <p className="text-xs text-gray-600">
                          Discover your unique PR reviewer personality
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-orange-100/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🚀</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-600 text-sm">Share & Compare</h3>
                        <p className="text-xs text-gray-600">
                          Share your results with your team on Slack or Twitter
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}