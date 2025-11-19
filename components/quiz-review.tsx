"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { questions } from '@/data/quiz-data';
import { ArchetypeType } from '@/types/quiz';
import { CheckCircle2 } from 'lucide-react';

interface QuizReviewProps {
  answers: ArchetypeType[];
}

export function QuizReview({ answers }: QuizReviewProps) {
  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <Card className="glass-card border-orange-200/30">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6" />
          Your Quiz Answers
        </CardTitle>
        <p className="text-sm text-gray-600">
          Review your responses to each question
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const selectedOption = question.options.find(
              opt => opt.archetype === userAnswer
            );

            return (
              <div key={question.id} className="space-y-3">
                <div className="flex gap-3">
                  <Badge 
                    variant="outline" 
                    className="border-orange-400 text-orange-600 bg-orange-50 shrink-0"
                  >
                    Q{index + 1}
                  </Badge>
                  <p className="text-sm font-medium text-gray-700">
                    {question.question}
                  </p>
                </div>
                
                {selectedOption && (
                  <div className="ml-12 p-3 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{selectedOption.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          {selectedOption.text}
                        </p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
