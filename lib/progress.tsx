"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ap-csa-review-progress-v1";

export type Attempt = { questionId: string; correct: boolean; date: string };
export type ProgressState = {
  completedTopics: string[];
  knownFlashcards: string[];
  studiedDates: string[];
  attempts: Attempt[];
};

type ProgressContextValue = {
  progress: ProgressState;
  hydrated: boolean;
  storageError: string | null;
  markTopicComplete: (topicId: string) => void;
  rateFlashcard: (cardId: string, known: boolean) => void;
  recordAttempt: (questionId: string, correct: boolean) => void;
  resetProgress: () => void;
};

const emptyProgress: ProgressState = {
  completedTopics: [],
  knownFlashcards: [],
  studiedDates: [],
  attempts: [],
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.completedTopics) &&
    candidate.completedTopics.every((item) => typeof item === "string") &&
    Array.isArray(candidate.knownFlashcards) &&
    candidate.knownFlashcards.every((item) => typeof item === "string") &&
    Array.isArray(candidate.studiedDates) &&
    candidate.studiedDates.every((item) => typeof item === "string") &&
    Array.isArray(candidate.attempts) &&
    candidate.attempts.every(
      (item) =>
        !!item &&
        typeof item === "object" &&
        typeof item.questionId === "string" &&
        typeof item.correct === "boolean" &&
        typeof item.date === "string",
    )
  );
}

function todayKey() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [persistenceEnabled, setPersistenceEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!isProgressState(parsed)) {
          throw new Error("Saved progress has an unexpected format.");
        }
        setProgress(parsed);
      }
    } catch (error) {
      setPersistenceEnabled(false);
      setStorageError(
        error instanceof Error
          ? `Progress could not be loaded from this browser: ${error.message}`
          : "Progress could not be loaded from this browser.",
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || !persistenceEnabled) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(null);
    } catch (error) {
      setPersistenceEnabled(false);
      setStorageError(
        error instanceof Error
          ? `Progress is only available for this visit because browser storage failed: ${error.message}`
          : "Progress is only available for this visit because browser storage failed.",
      );
    }
  }, [hydrated, persistenceEnabled, progress]);

  const markTopicComplete = useCallback((topicId: string) => {
    setProgress((current) => {
      const completedTopics = current.completedTopics.includes(topicId)
        ? current.completedTopics.filter((id) => id !== topicId)
        : [...current.completedTopics, topicId];
      return { ...current, completedTopics, studiedDates: addToday(current.studiedDates) };
    });
  }, []);

  const rateFlashcard = useCallback((cardId: string, known: boolean) => {
    setProgress((current) => ({
      ...current,
      knownFlashcards: known
        ? Array.from(new Set([...current.knownFlashcards, cardId]))
        : current.knownFlashcards.filter((id) => id !== cardId),
      studiedDates: addToday(current.studiedDates),
    }));
  }, []);

  const recordAttempt = useCallback((questionId: string, correct: boolean) => {
    setProgress((current) => ({
      ...current,
      attempts: [...current.attempts, { questionId, correct, date: todayKey() }],
      studiedDates: addToday(current.studiedDates),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(emptyProgress);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      hydrated,
      storageError,
      markTopicComplete,
      rateFlashcard,
      recordAttempt,
      resetProgress,
    }),
    [progress, hydrated, storageError, markTopicComplete, rateFlashcard, recordAttempt, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

function addToday(dates: string[]) {
  const today = todayKey();
  return dates.includes(today) ? dates : [...dates, today];
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within a ProgressProvider");
  return context;
}

export function currentStreak(dates: string[]) {
  const studied = new Set(dates);
  const cursor = new Date(`${todayKey()}T12:00:00`);
  if (!studied.has(todayKey())) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (studied.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
