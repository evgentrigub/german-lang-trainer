import { UserAnswer, GermanText } from './types';

// ---------------------------------------------------------------------------
// Safe localStorage wrapper
// ---------------------------------------------------------------------------
// Next.js renders components on the server where the `window` object – and thus
// `localStorage` – is unavailable. Accessing it directly throws a
// ReferenceError during SSR (or Playwright tests that spin up the dev server).
//
// We therefore provide a minimal in-memory polyfill that fulfils the subset of
// the Storage API we rely on (get/set/remove). On the client, we simply proxy
// to the real `window.localStorage`.

type SimpleStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const safeLocalStorage: SimpleStorage = (() => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return window.localStorage;
  }
  // Fallback: a tiny Map-based store that lives only for the SSR request.
  const memory = new Map<string, string>();
  return {
    getItem: key => (memory.has(key) ? memory.get(key)! : null),
    setItem: (key, value) => {
      memory.set(key, value);
    },
    removeItem: key => {
      memory.delete(key);
    },
  };
})();

// Storage key constants
const STORAGE_KEYS = {
  SESSIONS: 'german-trainer-sessions',
  STATS: 'german-trainer-stats',
  CURRENT_SESSION: 'german-trainer-current-session',
} as const;

// Types for stored data
export interface CompletedSession {
  id: string;
  textId: string;
  textTitle: string;
  textType: string;
  answers: UserAnswer[];
  score: number;
  completedAt: string; // ISO string
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number; // seconds
}

export interface UserStats {
  totalSessions: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  averageScore: number;
  totalTimeSpent: number; // seconds
  textsCompleted: string[]; // array of text IDs
  lastActivity: string; // ISO string
  streakDays: number;
  lastStreakDate: string; // ISO string (YYYY-MM-DD)
}

export interface CurrentSession {
  textId: string;
  answers: UserAnswer[];
  startedAt: string; // ISO string
  currentQuestionIndex: number;
}

// Initialize storage with empty data if not exists
function initializeStorage() {
  if (!safeLocalStorage.getItem(STORAGE_KEYS.SESSIONS)) {
    safeLocalStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify([]));
  }
  
  if (!safeLocalStorage.getItem(STORAGE_KEYS.STATS)) {
    const initialStats: UserStats = {
      totalSessions: 0,
      totalCorrectAnswers: 0,
      totalQuestions: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      textsCompleted: [],
      lastActivity: new Date().toISOString(),
      streakDays: 0,
      lastStreakDate: '',
    };
    safeLocalStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialStats));
  }
}

// Session management
export function saveCompletedSession(
  text: GermanText,
  answers: UserAnswer[],
  score: number
): void {
  initializeStorage();
  
  const session: CompletedSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    textId: text.id,
    textTitle: text.title,
    textType: text.textType,
    answers,
    score,
    completedAt: new Date().toISOString(),
    totalQuestions: text.questions.length,
    correctAnswers: answers.filter(a => a.isCorrect).length,
    totalTime: answers.reduce((sum, a) => sum + a.timeSpent, 0),
  };

  // Save session
  const sessions = getCompletedSessions();
  sessions.push(session);
  safeLocalStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));

  // Update stats
  updateUserStats(session);

  // Clear current session
  clearCurrentSession();
}

export function getCompletedSessions(): CompletedSession[] {
  initializeStorage();
  try {
    return JSON.parse(safeLocalStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
  } catch {
    return [];
  }
}

export function getRecentSessions(limit: number = 5): CompletedSession[] {
  return getCompletedSessions()
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, limit);
}

// Current session management (for resume functionality)
export function saveCurrentSession(
  textId: string,
  answers: UserAnswer[],
  currentQuestionIndex: number
): void {
  const currentSession: CurrentSession = {
    textId,
    answers,
    startedAt: new Date().toISOString(),
    currentQuestionIndex,
  };
  safeLocalStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(currentSession));
}

export function getCurrentSession(): CurrentSession | null {
  try {
    const sessionData = safeLocalStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch {
    return null;
  }
}

export function clearCurrentSession(): void {
  safeLocalStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
}

// Statistics management
function updateUserStats(session: CompletedSession): void {
  const stats = getUserStats();
  
  stats.totalSessions += 1;
  stats.totalCorrectAnswers += session.correctAnswers;
  stats.totalQuestions += session.totalQuestions;
  stats.totalTimeSpent += session.totalTime;
  stats.lastActivity = session.completedAt;
  
  // Add text to completed list if not already there
  if (!stats.textsCompleted.includes(session.textId)) {
    stats.textsCompleted.push(session.textId);
  }

  // Calculate new average score
  stats.averageScore = Math.round((stats.totalCorrectAnswers / stats.totalQuestions) * 100);

  // Update streak
  updateStreak(stats, session.completedAt);

  safeLocalStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

function updateStreak(stats: UserStats, completedAt: string): void {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const completedDate = new Date(completedAt).toISOString().split('T')[0];
  const lastStreakDate = stats.lastStreakDate;

  if (completedDate === today) {
    // Completed today
    if (lastStreakDate === '') {
      // First time
      stats.streakDays = 1;
      stats.lastStreakDate = today;
    } else {
      // Check if yesterday was the last streak date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastStreakDate === yesterdayStr) {
        // Continue streak
        stats.streakDays += 1;
        stats.lastStreakDate = today;
      } else if (lastStreakDate !== today) {
        // Restart streak
        stats.streakDays = 1;
        stats.lastStreakDate = today;
      }
      // If lastStreakDate === today, don't increment (already completed today)
    }
  }
  // If completed on a different day, don't update streak
}

export function getUserStats(): UserStats {
  initializeStorage();
  try {
    return JSON.parse(safeLocalStorage.getItem(STORAGE_KEYS.STATS) || '{}');
  } catch {
    return {
      totalSessions: 0,
      totalCorrectAnswers: 0,
      totalQuestions: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      textsCompleted: [],
      lastActivity: new Date().toISOString(),
      streakDays: 0,
      lastStreakDate: '',
    };
  }
}

// Utility functions
export function hasCompletedText(textId: string): boolean {
  const stats = getUserStats();
  return stats.textsCompleted.includes(textId);
}

export function getSessionsForText(textId: string): CompletedSession[] {
  return getCompletedSessions().filter(session => session.textId === textId);
}

export function getBestScoreForText(textId: string): number {
  const sessions = getSessionsForText(textId);
  return sessions.length > 0 ? Math.max(...sessions.map(s => s.score)) : 0;
}

// Export storage management
export function exportAllData(): string {
  return JSON.stringify({
    sessions: getCompletedSessions(),
    stats: getUserStats(),
    currentSession: getCurrentSession(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

export function clearAllData(): void {
  safeLocalStorage.removeItem(STORAGE_KEYS.SESSIONS);
  safeLocalStorage.removeItem(STORAGE_KEYS.STATS);
  safeLocalStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
} 