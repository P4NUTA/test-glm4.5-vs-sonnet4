import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    'app.title': 'Тур Планер 55+',
    'app.subtitle': 'Планирование путешествий по Ленинградской области',
    'nav.home': 'Главная',
    'nav.about': 'О проекте',
    'nav.contact': 'Контакты',
    'preferences.title': 'Настройки тура',
    'preferences.duration': 'Продолжительность',
    'preferences.budget': 'Бюджет',
    'preferences.mobility': 'Мобильность',
    'preferences.interests': 'Интересы',
    'preferences.generate': 'Сгенерировать тур',
    'itinerary.title': 'Ваш маршрут',
    'itinerary.day': 'День',
    'itinerary.totalCost': 'Общая стоимость',
    'itinerary.totalTime': 'Общее время',
    'itinerary.accessibility': 'Доступность',
    'attraction.duration': 'Продолжительность посещения',
    'attraction.price': 'Цена билета',
    'attraction.accessible': 'Доступно для маломобильных',
    'weather.rainy': 'Дождливо',
    'weather.sunny': 'Солнечно',
    'weather.cloudy': 'Облачно',
    'button.save': 'Сохранить',
    'button.share': 'Поделиться',
    'button.print': 'Распечатать'
  },
  en: {
    'app.title': 'Tour Planner 55+',
    'app.subtitle': 'Travel planning for Leningrad Oblast',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'preferences.title': 'Tour Preferences',
    'preferences.duration': 'Duration',
    'preferences.budget': 'Budget',
    'preferences.mobility': 'Mobility',
    'preferences.interests': 'Interests',
    'preferences.generate': 'Generate Tour',
    'itinerary.title': 'Your Itinerary',
    'itinerary.day': 'Day',
    'itinerary.totalCost': 'Total Cost',
    'itinerary.totalTime': 'Total Time',
    'itinerary.accessibility': 'Accessibility',
    'attraction.duration': 'Visit Duration',
    'attraction.price': 'Ticket Price',
    'attraction.accessible': 'Wheelchair Accessible',
    'weather.rainy': 'Rainy',
    'weather.sunny': 'Sunny',
    'weather.cloudy': 'Cloudy',
    'button.save': 'Save',
    'button.share': 'Share',
    'button.print': 'Print'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};