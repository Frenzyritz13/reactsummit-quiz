"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Twitter, MessageSquare, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Archetype } from '@/types/quiz';

interface ClientResultPageProps {
  archetype: Archetype;
}

export function ClientResultPage({ archetype }: ClientResultPageProps) {
  const handleShare = (platform: 'twitter' | 'copy') => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const message = archetype.shareMessage;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${message} ${shareUrl}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="cr-button-secondary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Take the Quiz
            </Button>
          </Link>
        </div>

        {/* Result Card */}
        <Card className="glass-card border-cr-purple-light/30 text-center">
          <CardHeader className="pb-6">
            <div className="space-y-4">
              <Badge variant="outline" className="border-cr-purple text-cr-purple bg-cr-purple-light/10">
                <Trophy className="h-4 w-4 mr-1" />
                PR Reviewer Personality
              </Badge>
              
              <div className="text-8xl mb-4 animate-bounce-subtle">
                {archetype.illustration}
              </div>
              
              <CardTitle className="text-4xl md:text-5xl font-bold gradient-text">
                {archetype.name}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <p className="text-xl md:text-2xl text-cr-gray leading-relaxed max-w-2xl mx-auto">
              {archetype.description}
            </p>

            {/* Key Traits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cr-purple-dark">
                Key Traits
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {archetype.keyTraits.map((trait: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-cr-purple-light/20 text-cr-purple-dark px-4 py-2 border border-cr-purple-light/30"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <Card className="bg-gradient-to-r from-cr-purple-light/10 to-cr-purple-light/20 border-cr-purple-light/30">
              <CardContent className="p-6">
                <h4 className="font-semibold text-cr-purple-dark mb-2">
                  💡 Fun Fact
                </h4>
                <p className="text-cr-gray italic">
                  {archetype.funFact}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Share Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleShare('twitter')}
            variant="outline"
            className="border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 smooth-transition"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Share on Twitter
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

        {/* Bottom Message */}
        <div className="text-center text-cr-gray space-y-2">
          <p>Want to discover your own PR reviewer personality?</p>
          <Link href="/">
            <Button className="cr-button-primary">
              Take the Quiz Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}