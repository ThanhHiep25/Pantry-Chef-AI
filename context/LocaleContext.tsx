import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { translations } from '../translations';

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const getInitialLocale = (): string => {
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem('pantry-chef-locale');
    if (savedLocale && translations[savedLocale]) {
      return savedLocale;
    }
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      return browserLang;
    }
  }
  return 'en'; // Default language
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>(getInitialLocale());

  useEffect(() => {
    localStorage.setItem('pantry-chef-locale', locale);
  }, [locale]);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] || translations['en'][key] || key;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
