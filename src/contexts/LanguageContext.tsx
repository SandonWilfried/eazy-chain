
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    book: 'Book',
    passengers: 'Passengers',
    track: 'Track',
    dashboard: 'Dashboard',
    otherServices: 'Other Services',
    payNow: 'Pay Now',
    changeLanguage: 'Change Language',
    english: 'English',
    french: 'French',
    spanish: 'Spanish',
  },
  fr: {
    home: 'Accueil',
    book: 'Réserver',
    passengers: 'Passagers',
    track: 'Suivre',
    dashboard: 'Tableau de Bord',
    otherServices: 'Autres Services',
    payNow: 'Payer Maintenant',
    changeLanguage: 'Changer de Langue',
    english: 'Anglais',
    french: 'Français',
    spanish: 'Espagnol',
  },
  es: {
    home: 'Inicio',
    book: 'Reservar',
    passengers: 'Pasajeros',
    track: 'Rastrear',
    dashboard: 'Panel',
    otherServices: 'Otros Servicios',
    payNow: 'Pagar Ahora',
    changeLanguage: 'Cambiar Idioma',
    english: 'Inglés',
    french: 'Francés',
    spanish: 'Español',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
