'use client';

import { useState } from 'react';
import { sampleTexts } from '@/lib/sample-texts';
import { GermanText, UserAnswer } from '@/lib/types';
import TextList from '@/components/TextList';
import TextDisplay from '@/components/TextDisplay';
import QuestionInterface from '@/components/QuestionInterface';
import SessionResults from '@/components/SessionResults';
import { useLanguage } from '@/lib/LanguageContext';
import { saveCompletedSession } from '@/lib/storage';

type ViewState = 'list' | 'reading' | 'questions' | 'results';

export default function PracticePage() {
  const { t, interpolate } = useLanguage();
  const [selectedText, setSelectedText] = useState<GermanText | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [sessionAnswers, setSessionAnswers] = useState<UserAnswer[]>([]);
  const [sessionScore, setSessionScore] = useState<number>(0);

  const handleTextSelect = (text: GermanText) => {
    setSelectedText(text);
    setCurrentView('reading');
  };

  const handleBackToList = () => {
    setSelectedText(null);
    setCurrentView('list');
    setSessionAnswers([]);
    setSessionScore(0);
  };

  const handleStartQuestions = () => {
    setCurrentView('questions');
  };

  const handleQuestionsComplete = (answers: UserAnswer[], score: number) => {
    setSessionAnswers(answers);
    setSessionScore(score);
    setCurrentView('results');
    
    // Save completed session to localStorage
    if (selectedText) {
      saveCompletedSession(selectedText, answers, score);
    }
  };

  const handleRestartQuestions = () => {
    setSessionAnswers([]);
    setSessionScore(0);
    setCurrentView('questions');
  };

  // Handle different view states
  if (selectedText) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.backToTextSelection}
        </button>

        {/* Reading View */}
        {currentView === 'reading' && (
          <>
            <TextDisplay text={selectedText} />
            
            {/* Start Questions Button */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t.readyForQuestions}</h3>
                    <p className="text-gray-600">
                      {interpolate(t.testYourUnderstanding, { count: selectedText.questions.length.toString() })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStartQuestions}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  data-test="start-questions"
                >
                  {t.startQuestions}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Questions View */}
        {currentView === 'questions' && (
          <QuestionInterface 
            text={selectedText}
            onComplete={handleQuestionsComplete}
          />
        )}

        {/* Results View */}
        {currentView === 'results' && (
          <SessionResults
            text={selectedText}
            answers={sessionAnswers}
            score={sessionScore}
            onRestart={handleRestartQuestions}
            onBackToList={handleBackToList}
          />
        )}
      </div>
    );
  }

  // Text List View
  const getTextTypeLabels = () => {
    return {
      email: t.emails,
      notice: t.notices,
      article: t.articles,
      advertisement: t.advertisements,
      letter: t.letters
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.readingExercises}</h1>
        <p className="text-lg text-gray-600">
          {t.availableTexts}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{sampleTexts.length}</div>
              <div className="text-sm text-gray-600">{t.availableTextsCount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {sampleTexts.reduce((total, text) => total + text.questions.length, 0)}
              </div>
              <div className="text-sm text-gray-600">{t.totalQuestionsStats}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">A2</div>
              <div className="text-sm text-gray-600">{t.goetheLevelA2}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Types Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.textTypes}</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(sampleTexts.map(text => text.textType))).map(type => {
            const count = sampleTexts.filter(text => text.textType === type).length;
            const labels = getTextTypeLabels();
            
            return (
              <span
                key={type}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {labels[type as keyof typeof labels]} ({count})
              </span>
            );
          })}
        </div>
      </div>

      {/* Text List */}
      <TextList 
        texts={sampleTexts} 
        onTextSelect={handleTextSelect}
      />
    </div>
  );
} 