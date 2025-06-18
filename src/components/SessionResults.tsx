'use client';

import { UserAnswer, GermanText } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface SessionResultsProps {
  text: GermanText;
  answers: UserAnswer[];
  score: number;
  onRestart: () => void;
  onBackToList: () => void;
}

export default function SessionResults({ text, answers, score, onRestart, onBackToList }: SessionResultsProps) {
  const { t, interpolate } = useLanguage();
  const totalQuestions = text.questions.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0);
  const averageTime = Math.round(totalTime / totalQuestions);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return t.excellent;
    if (score >= 80) return t.veryGood;
    if (score >= 70) return t.wellDone;
    if (score >= 60) return t.notBad;
    return t.keepPracticing;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.textCompleted}</h2>
        <p className="text-gray-600">{text.title}</p>
      </div>

      {/* Score Display */}
      <div className={`rounded-lg border-2 p-6 mb-6 text-center ${getScoreBg(score)}`}>
        <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
          {score}%
        </div>
        <div className="text-lg font-semibold text-gray-800 mb-2">
          {interpolate(t.questionsCorrect, { 
            correct: correctAnswers.toString(), 
            total: totalQuestions.toString() 
          })}
        </div>
        <p className={`text-sm font-medium ${getScoreColor(score)}`}>
          {getPerformanceMessage(score)}
        </p>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalQuestions}</div>
          <div className="text-sm text-gray-600">{t.totalQuestions2}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalTime}s</div>
          <div className="text-sm text-gray-600">{t.totalTime}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{averageTime}s</div>
          <div className="text-sm text-gray-600">{t.averagePerQuestion}</div>
        </div>
      </div>

      {/* Question by Question Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.detailedResults}</h3>
        <div className="space-y-3">
          {text.questions.map((question, index) => {
            const userAnswer = answers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.isCorrect || false;
            
            return (
              <div key={question.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isCorrect 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">
                    {question.question}
                  </div>
                  {userAnswer && (
                    <div className="text-xs text-gray-600 mt-1">
                      {interpolate(t.answerTime, { time: userAnswer.timeSpent.toString() })}
                    </div>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {isCorrect ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t.tryAgain}
        </button>
        <button
          onClick={onBackToList}
          className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {t.otherTexts}
        </button>
      </div>
    </div>
  );
} 