'use client';

import { useState, useEffect } from 'react';
import { GermanText, UserAnswer } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface QuestionInterfaceProps {
  text: GermanText;
  onComplete: (answers: UserAnswer[], score: number) => void;
}

export default function QuestionInterface({ text, onComplete }: QuestionInterfaceProps) {
  const { t, interpolate } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const currentQuestion = text.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === text.questions.length - 1;
  const totalQuestions = text.questions.length;

  // Reset state when moving to next question
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after explanation shown
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    // Update answers array
    const newAnswers = [...userAnswers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = userAnswer;
    } else {
      newAnswers.push(userAnswer);
    }
    setUserAnswers(newAnswers);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score and complete session
      const correctAnswers = userAnswers.filter(a => a.isCorrect).length + 
                           (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      onComplete(userAnswers, score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getOptionClassName = (optionIndex: number) => {
    const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200";
    
    if (!showExplanation) {
      // Before submission
      if (selectedAnswer === optionIndex) {
        return `${baseClasses} border-blue-500 bg-blue-50 text-blue-900`;
      }
      return `${baseClasses} border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50`;
    } else {
      // After submission - show correct/incorrect
      if (optionIndex === currentQuestion.correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-50 text-green-900`;
      } else if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
        return `${baseClasses} border-red-500 bg-red-50 text-red-900`;
      }
      return `${baseClasses} border-gray-200 bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {interpolate(t.questionXOfY, { 
              current: (currentQuestionIndex + 1).toString(), 
              total: totalQuestions.toString() 
            })}
          </span>
          <span className="text-sm text-gray-500">
            {interpolate(t.percentComplete, { 
              percent: Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100).toString() 
            })}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={getOptionClassName(index)}
              disabled={showExplanation}
              data-test="question-option"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                  showExplanation && index === currentQuestion.correctAnswer 
                    ? 'border-green-500 bg-green-500 text-white'
                    : showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer
                    ? 'border-red-500 bg-red-500 text-white'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
          selectedAnswer === currentQuestion.correctAnswer 
            ? 'bg-green-50 border-green-400' 
            : 'bg-blue-50 border-blue-400'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <h4 className={`font-semibold mb-1 ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'text-green-900' 
                  : 'text-blue-900'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.explanation}
              </h4>
              <p className={`text-sm ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'text-green-800' 
                  : 'text-blue-800'
              }`}>
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.previous}
        </button>

        <div className="flex gap-3">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              data-test="confirm-answer"
            >
              {t.confirmAnswer}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              data-test="next-question"
            >
              {isLastQuestion ? t.finish : t.nextQuestion}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 