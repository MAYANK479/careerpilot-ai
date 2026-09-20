import { createContext, useContext, useState, useCallback } from 'react';

const ResumeContext = createContext(null);

const STORAGE_KEY = 'careerpilot_resume';

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const saveResume = useCallback((data) => {
    if (!data) return;
    const enriched = {
      ...data,
      uploadedAt: data.uploadedAt || new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
    } catch (e) {
      console.warn('Failed to persist resume in localStorage:', e);
    }
    setResumeData(enriched);
  }, []);

  const clearResume = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setResumeData(null);
  }, []);

  const value = {
    resumeData,
    hasResume: Boolean(resumeData && resumeData.resumeText),
    saveResume,
    clearResume,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
