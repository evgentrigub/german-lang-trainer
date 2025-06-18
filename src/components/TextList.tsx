import { GermanText } from '@/lib/types';
import { hasCompletedText, getBestScoreForText, getSessionsForText } from '@/lib/storage';
import { useState, useMemo } from 'react';

interface TextListProps {
  texts: GermanText[];
  onTextSelect: (text: GermanText) => void;
  className?: string;
}

type FilterType = 'all' | 'completed' | 'incomplete';
type SortType = 'title' | 'type' | 'completion' | 'score';

export default function TextList({ texts, onTextSelect, className = '' }: TextListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortType>('title');

  const getTextTypeColor = (type: GermanText['textType']) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'notice': return 'bg-green-100 text-green-800';
      case 'article': return 'bg-purple-100 text-purple-800';
      case 'advertisement': return 'bg-orange-100 text-orange-800';
      case 'letter': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTextTypeLabel = (type: GermanText['textType']) => {
    switch (type) {
      case 'email': return 'E-Mail';
      case 'notice': return 'Mitteilung';
      case 'article': return 'Artikel';
      case 'advertisement': return 'Anzeige';
      case 'letter': return 'Brief';
      default: return type;
    }
  };

  // Get unique text types for filter
  const textTypes = useMemo(() => {
    return Array.from(new Set(texts.map(text => text.textType)));
  }, [texts]);

  // Filter and sort texts
  const filteredAndSortedTexts = useMemo(() => {
    let filtered = texts;

    // Apply completion filter
    if (filter === 'completed') {
      filtered = filtered.filter(text => hasCompletedText(text.id));
    } else if (filter === 'incomplete') {
      filtered = filtered.filter(text => !hasCompletedText(text.id));
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(text => text.textType === selectedType);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'type':
          return a.textType.localeCompare(b.textType);
        case 'completion':
          const aCompleted = hasCompletedText(a.id);
          const bCompleted = hasCompletedText(b.id);
          if (aCompleted === bCompleted) return a.title.localeCompare(b.title);
          return bCompleted ? 1 : -1; // Completed first
        case 'score':
          const aScore = getBestScoreForText(a.id);
          const bScore = getBestScoreForText(b.id);
          if (aScore === bScore) return a.title.localeCompare(b.title);
          return bScore - aScore; // Highest score first
        default:
          return 0;
      }
    });
  }, [texts, filter, selectedType, sortBy]);

  const completedCount = texts.filter(text => hasCompletedText(text.id)).length;

  return (
    <div className={className}>
      {/* Filters and Stats */}
      <div className="mb-6 space-y-4">
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Fortschritt Übersicht</h3>
              <p className="text-sm text-gray-600">
                {completedCount} von {texts.length} Texten abgeschlossen ({Math.round((completedCount / texts.length) * 100)}%)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / texts.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Completion Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle ({texts.length})</option>
              <option value="completed">Abgeschlossen ({completedCount})</option>
              <option value="incomplete">Unvollständig ({texts.length - completedCount})</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Typ:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle Typen</option>
              {textTypes.map(type => (
                <option key={type} value={type}>
                  {getTextTypeLabel(type)} ({texts.filter(t => t.textType === type).length})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sortieren:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Titel</option>
              <option value="type">Typ</option>
              <option value="completion">Abschluss</option>
              <option value="score">Beste Punktzahl</option>
            </select>
          </div>
        </div>
      </div>

      {/* Text Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTexts.map((text) => {
          const isCompleted = hasCompletedText(text.id);
          const bestScore = getBestScoreForText(text.id);
          const attemptCount = getSessionsForText(text.id).length;

          return (
            <div
              key={text.id}
              className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-all duration-200 cursor-pointer relative ${
                isCompleted 
                  ? 'border-green-200 hover:border-green-300' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onTextSelect(text)}
              data-test="text-card"
            >
              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTextTypeColor(text.textType)}`}>
                    {getTextTypeLabel(text.textType)}
                  </span>
                  <div className="text-xs text-gray-500">
                    {text.level}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {text.title}
                </h3>

                {/* Preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {text.content.replace(/\n/g, ' ').substring(0, 120)}...
                </p>

                {/* Completion Stats */}
                {isCompleted && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-700 font-medium">Abgeschlossen</span>
                      </div>
                      <div className="text-green-700 font-bold">{bestScore}%</div>
                    </div>
                    {attemptCount > 1 && (
                      <div className="text-xs text-green-600 mt-1">
                        {attemptCount} Versuche
                      </div>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{text.wordCount} Wörter</span>
                    <span>{text.questions.length} Fragen</span>
                  </div>
                  <div className={`font-medium ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
                    {isCompleted ? 'Wiederholen →' : 'Üben →'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedTexts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Texte gefunden</h3>
          <p className="text-gray-600">Versuchen Sie, die Filter zu ändern, um mehr Texte zu sehen.</p>
        </div>
      )}
    </div>
  );
} 