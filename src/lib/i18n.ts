// Internationalization system for German A2 Reading Trainer

export type Language = 'de' | 'en';

export interface Translations {
  // Navigation
  backToTextSelection: string;
  backToList: string;
  previous: string;
  next: string;
  
  // Reading Practice
  readingExercises: string;
  availableTexts: string;
  totalQuestions: string;
  goetheLevelA2: string;
  textTypes: string;
  
  // Text Types
  emails: string;
  notices: string;
  articles: string;
  advertisements: string;
  letters: string;
  
  // Question Interface
  questionXOfY: string;
  percentComplete: string;
  confirmAnswer: string;
  nextQuestion: string;
  finish: string;
  correct: string;
  explanation: string;
  
  // Reading Flow
  readyForQuestions: string;
  testYourUnderstanding: string;
  startQuestions: string;
  
  // Results
  textCompleted: string;
  questionsCorrect: string;
  totalQuestions2: string;
  totalTime: string;
  averagePerQuestion: string;
  detailedResults: string;
  answerTime: string;
  tryAgain: string;
  otherTexts: string;
  
  // Performance Messages
  excellent: string;
  veryGood: string;
  wellDone: string;
  notBad: string;
  keepPracticing: string;
  
  // Stats
  availableTextsCount: string;
  totalQuestionsStats: string;
  
  // Language Selector
  language: string;
  german: string;
  english: string;
  
  // Homepage
  homeTitle: string;
  homeSubtitle: string;
  improveReading: string;
  homeDescription: string;
  startPractice: string;
  offlinePractice: string;
  instantFeedback: string;
  progressTracking: string;
  mvpPhase: string;
  version: string;
  footerText: string;
  
  // Dashboard
  dashboard: string;
  trackYourProgress: string;
  totalSessions: string;
  averageScore: string;
  textsCompleted: string;
  dayStreak: string;
  performanceStats: string;
  correctAnswers: string;
  totalTimeSpent: string;
  averageSessionTime: string;
  recentActivity: string;
  noActivityYet: string;
  exportData: string;
  dataManagement: string;
  exportOrClearData: string;
  export: string;
  clearAll: string;
  cancel: string;
  confirmClearData: string;
}

export const translations: Record<Language, Translations> = {
  de: {
    // Navigation
    backToTextSelection: 'Zurück zur Textauswahl',
    backToList: 'Zurück',
    previous: 'Zurück',
    next: 'Weiter',
    
    // Reading Practice
    readingExercises: 'Leseübungen',
    availableTexts: 'Wählen Sie einen Text zum Üben aus. Alle Texte sind für das A2-Niveau geeignet.',
    totalQuestions: 'Gesamte Fragen',
    goetheLevelA2: 'Goethe Niveau',
    textTypes: 'Textarten',
    
    // Text Types
    emails: 'E-Mails',
    notices: 'Mitteilungen',
    articles: 'Artikel',
    advertisements: 'Anzeigen',
    letters: 'Briefe',
    
    // Question Interface
    questionXOfY: 'Frage {current} von {total}',
    percentComplete: '{percent}% abgeschlossen',
    confirmAnswer: 'Antwort bestätigen',
    nextQuestion: 'Nächste Frage',
    finish: 'Abschließen',
    correct: 'Richtig!',
    explanation: 'Erklärung:',
    
    // Reading Flow
    readyForQuestions: 'Bereit für die Fragen?',
    testYourUnderstanding: 'Testen Sie Ihr Textverständnis mit {count} Multiple-Choice-Fragen.',
    startQuestions: 'Fragen starten',
    
    // Results
    textCompleted: 'Text abgeschlossen!',
    questionsCorrect: '{correct} von {total} Fragen richtig',
    totalQuestions2: 'Gesamte Fragen',
    totalTime: 'Gesamtzeit',
    averagePerQuestion: '⌀ pro Frage',
    detailedResults: 'Detaillierte Ergebnisse',
    answerTime: 'Antwortzeit: {time}s',
    tryAgain: 'Nochmal versuchen',
    otherTexts: 'Andere Texte',
    
    // Performance Messages
    excellent: 'Ausgezeichnet! Hervorragende Leistung! 🎉',
    veryGood: 'Sehr gut! Sie haben den Text gut verstanden! 👏',
    wellDone: 'Gut gemacht! Ein solides Ergebnis! 👍',
    notBad: 'Nicht schlecht! Mit etwas mehr Übung wird es noch besser! 💪',
    keepPracticing: 'Weiter üben! Lassen Sie sich nicht entmutigen! 📚',
    
    // Stats
    availableTextsCount: 'Verfügbare Texte',
    totalQuestionsStats: 'Gesamte Fragen',
    
    // Language Selector
    language: 'Sprache',
    german: 'Deutsch',
    english: 'English',
    
    // Homepage
    homeTitle: 'German A2 Reading Trainer',
    homeSubtitle: 'Goethe Institut Prüfungsvorbereitung',
    improveReading: 'Verbessern Sie Ihr Leseverständnis',
    homeDescription: 'Üben Sie deutsches Leseverständnis mit authentischen A2-Texten für die Goethe Institut Prüfungsvorbereitung.',
    startPractice: 'Leseübungen starten →',
    offlinePractice: 'Offline-Übungen',
    instantFeedback: 'Sofortiges Feedback',
    progressTracking: 'Fortschrittsverfolgung',
    mvpPhase: 'Derzeit in der MVP-Entwicklungsphase',
    version: 'Version 0.1.0',
    footerText: 'Erstellt für Deutschlernende, die sich auf die A2-Zertifizierung vorbereiten',
    
    // Dashboard
    dashboard: 'Dashboard',
    trackYourProgress: 'Verfolgen Sie Ihren Fortschritt',
    totalSessions: 'Gesamte Sitzungen',
    averageScore: 'Durchschnittliche Punktzahl',
    textsCompleted: 'Abgeschlossene Texte',
    dayStreak: 'Tage-Serie',
    performanceStats: 'Leistungsstatistiken',
    correctAnswers: 'Richtige Antworten',
    totalTimeSpent: 'Gesamte Übungszeit',
    averageSessionTime: '⌀ Sitzungszeit',
    recentActivity: 'Letzte Aktivität',
    noActivityYet: 'Noch keine Aktivität. Beginnen Sie mit Ihrer ersten Leseübung!',
    exportData: 'Daten exportieren',
    dataManagement: 'Datenverwaltung',
    exportOrClearData: 'Exportieren Sie Ihre Daten zur Sicherung oder löschen Sie alle gespeicherten Daten.',
    export: 'Exportieren',
    clearAll: 'Alle löschen',
    cancel: 'Abbrechen',
    confirmClearData: 'Sind Sie sicher, dass Sie alle Ihre Daten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
  },
  
  en: {
    // Navigation
    backToTextSelection: 'Back to Text Selection',
    backToList: 'Back',
    previous: 'Previous',
    next: 'Next',
    
    // Reading Practice
    readingExercises: 'Reading Exercises',
    availableTexts: 'Choose a text to practice with. All texts are suitable for A2 level.',
    totalQuestions: 'Total Questions',
    goetheLevelA2: 'Goethe Level',
    textTypes: 'Text Types',
    
    // Text Types
    emails: 'Emails',
    notices: 'Notices',
    articles: 'Articles',
    advertisements: 'Advertisements',
    letters: 'Letters',
    
    // Question Interface
    questionXOfY: 'Question {current} of {total}',
    percentComplete: '{percent}% complete',
    confirmAnswer: 'Confirm Answer',
    nextQuestion: 'Next Question',
    finish: 'Finish',
    correct: 'Correct!',
    explanation: 'Explanation:',
    
    // Reading Flow
    readyForQuestions: 'Ready for the questions?',
    testYourUnderstanding: 'Test your text comprehension with {count} multiple-choice questions.',
    startQuestions: 'Start Questions',
    
    // Results
    textCompleted: 'Text Completed!',
    questionsCorrect: '{correct} of {total} questions correct',
    totalQuestions2: 'Total Questions',
    totalTime: 'Total Time',
    averagePerQuestion: '⌀ per question',
    detailedResults: 'Detailed Results',
    answerTime: 'Answer time: {time}s',
    tryAgain: 'Try Again',
    otherTexts: 'Other Texts',
    
    // Performance Messages
    excellent: 'Excellent! Outstanding performance! 🎉',
    veryGood: 'Very good! You understood the text well! 👏',
    wellDone: 'Well done! A solid result! 👍',
    notBad: 'Not bad! With a bit more practice it will get even better! 💪',
    keepPracticing: 'Keep practicing! Don\'t get discouraged! 📚',
    
    // Stats
    availableTextsCount: 'Available Texts',
    totalQuestionsStats: 'Total Questions',
    
    // Language Selector
    language: 'Language',
    german: 'Deutsch',
    english: 'English',
    
    // Homepage
    homeTitle: 'German A2 Reading Trainer',
    homeSubtitle: 'Goethe Institut Exam Preparation',
    improveReading: 'Improve Your Reading Comprehension',
    homeDescription: 'Practice German reading comprehension with authentic A2-level texts designed for Goethe Institut exam preparation.',
    startPractice: 'Start Reading Practice →',
    offlinePractice: 'Offline Practice',
    instantFeedback: 'Instant Feedback',
    progressTracking: 'Progress Tracking',
    mvpPhase: 'Currently in MVP development phase',
    version: 'Version 0.1.0',
    footerText: 'Built for German language learners preparing for A2 certification',
    
    // Dashboard
    dashboard: 'Dashboard',
    trackYourProgress: 'Track Your Progress',
    totalSessions: 'Total Sessions',
    averageScore: 'Average Score',
    textsCompleted: 'Texts Completed',
    dayStreak: 'Day Streak',
    performanceStats: 'Performance Statistics',
    correctAnswers: 'Correct Answers',
    totalTimeSpent: 'Total Practice Time',
    averageSessionTime: '⌀ Session Time',
    recentActivity: 'Recent Activity',
    noActivityYet: 'No activity yet. Start your first reading exercise!',
    exportData: 'Export Data',
    dataManagement: 'Data Management',
    exportOrClearData: 'Export your data for backup or clear all stored data.',
    export: 'Export',
    clearAll: 'Clear All',
    cancel: 'Cancel',
    confirmClearData: 'Are you sure you want to clear all your data? This action cannot be undone.'
  }
};

// Helper function to replace placeholders in translation strings
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
} 