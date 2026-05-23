import { useState, useEffect, useCallback } from 'react';

// TODO: Replace localStorage with Cloudflare D1 / n8n webhook sync
// when backend integration is ready.

export interface ProgressState {
  completedLessons: string[];
  completedExercises: string[];
  vocabularyLearned: string[];
  totalXP: number;
  streakDays: number;
  lastStudyDate: string;
  dailyGoal: number;
  dailyProgress: number;
}

const STORAGE_KEY = 'rebe-progress-v1';

function getDefaultProgress(): ProgressState {
  return {
    completedLessons: [],
    completedExercises: [],
    vocabularyLearned: [],
    totalXP: 0,
    streakDays: 0,
    lastStudyDate: new Date().toISOString().split('T')[0],
    dailyGoal: 30,
    dailyProgress: 0,
  };
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw) as ProgressState;
    // Validate shape
    if (!Array.isArray(parsed.completedLessons)) return getDefaultProgress();
    return parsed;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // TODO: Sync to n8n webhook or Cloudflare D1 here
    // await fetch('https://n8n.example.com/webhook/progress', { method: 'POST', body: JSON.stringify(state) });
  } catch {
    // silently fail
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const today = new Date().toISOString().split('T')[0];
      const newStreak = prev.lastStudyDate === today ? prev.streakDays : prev.lastStudyDate === getYesterday() ? prev.streakDays + 1 : 1;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalXP: prev.totalXP + xp,
        lastStudyDate: today,
        streakDays: newStreak,
        dailyProgress: Math.min(prev.dailyGoal, prev.dailyProgress + 10),
      };
    });
  }, []);

  const completeExercise = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
        totalXP: prev.totalXP + 5,
      };
    });
  }, []);

  const learnVocabulary = useCallback((vocabId: string) => {
    setProgress((prev) => {
      if (prev.vocabularyLearned.includes(vocabId)) return prev;
      return {
        ...prev,
        vocabularyLearned: [...prev.vocabularyLearned, vocabId],
        totalXP: prev.totalXP + 2,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(getDefaultProgress());
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  return {
    progress,
    completeLesson,
    completeExercise,
    learnVocabulary,
    resetProgress,
    isLessonCompleted,
  };
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}
