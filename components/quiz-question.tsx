"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question, QuestionOption } from '@/types/quiz';
import { ArchetypeType } from '@/types/quiz';
import { ChevronRight, Clock } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (archetype: ArchetypeType) => void;
  isLastQuestion: boolean;
}

export function QuizQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  isLastQuestion
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: QuestionOption) => {
    if (isAnswering) return;
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption || isAnswering) return;
    
    setIsAnswering(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      onAnswer(selectedOption.archetype as ArchetypeType);
      setSelectedOption(null);
      setIsAnswering(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          
          <Progress 
            value={progress} 
            className="w-full max-w-md mx-auto h-3"
          />
          
          <div className="text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card border-orange-200/30 animate-fade-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-600 leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {question.options.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer smooth-transition hover:shadow-lg border-2 ${
                  selectedOption?.id === option.id
                    ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                } ${isAnswering ? 'pointer-events-none opacity-70' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0 mt-1">
                      {option.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-orange-600 leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                    {selectedOption?.id === option.id && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Next Button */}
        <div className="text-center">
          <Button
            onClick={handleNext}
            disabled={!selectedOption || isAnswering}
            size="lg"
            className="px-8 py-3 cr-button-primary disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
          >
            {isAnswering ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isLastQuestion ? 'See My Results' : 'Next Question'}
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}