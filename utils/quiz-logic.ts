import { ArchetypeType, QuizResult, Archetype } from '@/types/quiz';
import { archetypes } from '@/data/quiz-data';

export function calculateResult(answers: ArchetypeType[]): QuizResult {
  // Count votes for each archetype
  const score: Record<ArchetypeType, number> = {
    'nitpicker': 0,
    'rubber-stamp': 0,
    'professor': 0,
    'speedster': 0,
    'socializer': 0
  };

  answers.forEach(answer => {
    score[answer]++;
  });

  // Find the archetype with the highest score
  const winningArchetype = Object.entries(score).reduce((a, b) => 
    score[a[0] as ArchetypeType] > score[b[0] as ArchetypeType] ? a : b
  )[0] as ArchetypeType;

  return {
    archetype: archetypes[winningArchetype],
    score,
    answersCount: answers.length
  };
}

export function generateShareUrl(archetypeId: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/result/${archetypeId}`;
  }
  return `/result/${archetypeId}`;
}

export function generateSocialShareUrls(result: QuizResult) {
  const shareUrl = generateShareUrl(result.archetype.id);
  const message = result.archetype.shareMessage;
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`,
    slack: `slack://channel?team=&id=&message=${encodeURIComponent(`${message} ${shareUrl}`)}`,
    generic: `${message} ${shareUrl}`
  };
}