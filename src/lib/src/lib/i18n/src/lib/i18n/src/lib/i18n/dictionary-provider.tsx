"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { languages, type LanguageCode } from './languages';
import en from './dictionaries/en.json';
import es from './dictionaries/es.json';
import tr from './dictionaries/tr.json';
import ar from './dictionaries/ar.json';
import ja from './dictionaries/ja.json';
import zh from './dictionaries/zh.json';
import de from './dictionaries/de.json';
import fr from './dictionaries/fr.json';
import it from './dictionaries/it.json';
import ko from './dictionaries/ko.json';
import nl from './dictionaries/nl.json';
import ru from './dictionaries/ru.json';

const dictionaries: Record<LanguageCode, any> = {
  en,
  es,
  tr,
  ar,
  ja,
  zh,
  de,
  fr,
  it,
  ko,
  nl,
  ru,
};

interface DictionaryContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  dictionary: typeof es;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export const DictionaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('es');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('menteviva-lang') as LanguageCode;
    if (storedLang && languages.some(l => l.code === storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('menteviva-lang', lang);
    }
  };
  
  const dictionary = useMemo(() => dictionaries[language] || dictionaries.en, [language]);
  
  if (!isMounted) {
    return null; 
  }

  return (
    <DictionaryContext.Provider value={{ language, setLanguage: handleSetLanguage, dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
``
