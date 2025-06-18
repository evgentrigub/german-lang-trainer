import { GermanText } from '@/lib/types';

interface TextDisplayProps {
  text: GermanText;
  className?: string;
}

export default function TextDisplay({ text, className = '' }: TextDisplayProps) {
  const getTextTypeIcon = () => {
    switch (text.textType) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'notice':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
          </svg>
        );
      case 'article':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'advertisement':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case 'letter':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTextTypeLabel = () => {
    switch (text.textType) {
      case 'email': return 'E-Mail';
      case 'notice': return 'Mitteilung';
      case 'article': return 'Artikel';
      case 'advertisement': return 'Anzeige';
      case 'letter': return 'Brief';
      default: return text.textType;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2 text-blue-600">
            {getTextTypeIcon()}
            <span className="text-sm font-medium">{getTextTypeLabel()}</span>
          </div>
          <div className="text-xs text-gray-500">
            {text.level} • {text.wordCount} Wörter
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{text.title}</h2>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div 
          className="prose prose-gray prose-lg max-w-none"
          style={{
            lineHeight: '1.7',
            fontSize: '16px',
            maxWidth: '65ch' // Optimal reading width
          }}
        >
          {text.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>{text.questions.length} Fragen</span>
            {text.source && <span>Quelle: {text.source}</span>}
          </div>
          <div>{text.level} Niveau</div>
        </div>
      </div>
    </div>
  );
} 