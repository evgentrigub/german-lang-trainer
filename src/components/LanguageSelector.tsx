'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/i18n';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        {t.language}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={e => handleLanguageChange(e.target.value as Language)}
        className="block px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="de">{t.german}</option>
        <option value="en">{t.english}</option>
      </select>
    </div>
  );
} 