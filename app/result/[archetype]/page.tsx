import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { archetypes } from '@/data/quiz-data';
import { Share2, Twitter, MessageSquare, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { ClientResultPage } from '@/components/client-result-page';

interface ResultPageProps {
  params: {
    archetype: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(archetypes).map((archetype) => ({
    archetype: archetype,
  }));
}

export default function ResultPage({ params }: ResultPageProps) {
  const archetypeData = archetypes[params.archetype];

  if (!archetypeData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="glass-card border-cr-purple-light/30 max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🤔</div>
            <h1 className="text-2xl font-bold text-cr-purple-dark mb-4">
              Archetype Not Found
            </h1>
            <p className="text-cr-gray mb-6">
              The personality type you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button className="cr-button-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Take the Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ClientResultPage archetype={archetypeData} />;
}