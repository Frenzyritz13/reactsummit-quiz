export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
  archetype: ArchetypeType;
}

export type ArchetypeType = 'nitpicker' | 'rubber-stamp' | 'professor' | 'speedster' | 'socializer';

export interface Archetype {
  id: ArchetypeType;
  name: string;
  description: string;
  emoji: string;
  illustration: string;
  keyTraits: string[];
  funFact: string;
  shareMessage: string;
}

export interface QuizResult {
  archetype: Archetype;
  score: Record<ArchetypeType, number>;
  answersCount: number;
}