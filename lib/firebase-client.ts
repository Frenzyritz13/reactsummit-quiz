"use client";

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface QuizSignupData {
  email: string;
  personalityType: string;
  personalityName: string;
  timestamp: Date;
  scores: Record<string, number>;
  userAgent: string;
}

export async function saveQuizSignup(data: QuizSignupData): Promise<void> {
  // Only attempt to save if Firebase is properly configured
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.log('Firebase not configured, skipping save:', data);
    return;
  }

  try {
    await addDoc(collection(db, 'quiz_signups'), {
      ...data,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw error;
  }
}