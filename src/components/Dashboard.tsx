'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  getUserStats, 
  getRecentSessions, 
  CompletedSession, 
  UserStats,
  exportAllData,
  clearAllData 
} from '@/lib/storage';

export default function Dashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<CompletedSession[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Load stats on component mount
    loadStats();
  }, []);

  const loadStats = () => {
    setStats(getUserStats());
    setRecentSessions(getRecentSessions(5));
  };

  const handleExportData = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `german-trainer-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleClearData = () => {
    if (confirm(t.confirmClearData)) {
      clearAllData();
      loadStats();
      setShowExportModal(false);
    }
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboard}</h1>
          <p className="text-lg text-gray-600">{t.trackYourProgress}</p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t.exportData}
        </button>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalSessions}</div>
              <div className="text-sm text-gray-600">{t.totalSessions}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.averageScore}%</div>
              <div className="text-sm text-gray-600">{t.averageScore}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.textsCompleted.length}</div>
              <div className="text-sm text-gray-600">{t.textsCompleted}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.streakDays}</div>
              <div className="text-sm text-gray-600">{t.dayStreak}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.performanceStats}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.totalQuestions2}</span>
              <span className="font-semibold text-gray-900">{stats.totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.correctAnswers}</span>
              <span className="font-semibold text-green-600">{stats.totalCorrectAnswers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.totalTimeSpent}</span>
              <span className="font-semibold text-gray-900">{formatTime(stats.totalTimeSpent)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.averageSessionTime}</span>
              <span className="font-semibold text-gray-900">
                {stats.totalSessions > 0 ? formatTime(Math.round(stats.totalTimeSpent / stats.totalSessions)) : '0s'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentActivity}</h3>
          {recentSessions.length > 0 ? (
            <div className="space-y-3">
                             {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getScoreColor(session.score)}`}>
                    {session.score}%
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {session.textTitle}
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatDate(session.completedAt)} • {formatTime(session.totalTime)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                    {session.textType}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">{t.noActivityYet}</p>
            </div>
          )}
        </div>
      </div>

      {/* Export/Clear Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.dataManagement}</h3>
            <p className="text-gray-600 mb-6">{t.exportOrClearData}</p>
            
            <div className="flex gap-3">
              <button
                onClick={handleExportData}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.export}
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t.clearAll}
              </button>
            </div>
            
            <button
              onClick={() => setShowExportModal(false)}
              className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 