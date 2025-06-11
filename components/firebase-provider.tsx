"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface FirebaseContextType {
  isConfigured: boolean;
  isLoading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  isConfigured: false,
  isLoading: true,
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is properly configured
    const hasConfig = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    
    setIsConfigured(hasConfig);
    setIsLoading(false);
  }, []);

  return (
    <FirebaseContext.Provider value={{ isConfigured, isLoading }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}