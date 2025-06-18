'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{t.homeTitle}</h1>
          <p className="text-gray-600 mt-1">{t.homeSubtitle}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.improveReading}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t.homeDescription}
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="/practice"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
              >
                {t.startPractice}
              </a>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.offlinePractice}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.instantFeedback}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.progressTracking}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>{t.mvpPhase}</p>
            <p>{t.version}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
