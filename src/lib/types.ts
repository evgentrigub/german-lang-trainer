// German A2 Reading Trainer - Type Definitions

export interface GermanText {
  id: string;
  title: string;
  textType: 'email' | 'advertisement' | 'article' | 'notice' | 'letter';
  level: 'A2';
  content: string;
  source?: string;
  wordCount: number;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-based)
  explanation: string;
  type: 'multiple-choice' | 'true-false';
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface ReadingSession {
  id: string;
  textId: string;
  startedAt: string;
  completedAt?: string;
  answers: UserAnswer[];
  score: number; // percentage
  totalTimeSpent: number; // in seconds
}

export interface UserProgress {
  totalTextsCompleted: number;
  averageScore: number;
  totalTimeSpent: number;
  textTypes: Record<string, number>; // count by text type
  recentSessions: ReadingSession[];
} 