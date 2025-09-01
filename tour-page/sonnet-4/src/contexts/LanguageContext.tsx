import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translation {
  [key: string]: {
    ru: string;
    en: string;
  };
}

const translations: Translation = {
  // Header
  'header.title': {
    ru: 'Планировщик туров 55+',
    en: 'Tour Planner 55+'
  },
  'header.subtitle': {
    ru: 'Комфортные путешествия по Ленинградской области',
    en: 'Comfortable travels in Leningrad Oblast'
  },
  
  // Navigation
  'nav.home': {
    ru: 'Главная',
    en: 'Home'
  },
  'nav.planner': {
    ru: 'Планировщик',
    en: 'Planner'
  },
  'nav.language': {
    ru: 'En',
    en: 'Ру'
  },
  
  // Tour Form
  'form.title': {
    ru: 'Создать маршрут',
    en: 'Create Itinerary'
  },
  'form.days': {
    ru: 'Количество дней',
    en: 'Number of days'
  },
  'form.days.1': {
    ru: '1 день',
    en: '1 day'
  },
  'form.days.2': {
    ru: '2 дня',
    en: '2 days'
  },
  'form.days.3': {
    ru: '3 дня',
    en: '3 days'
  },
  'form.budget': {
    ru: 'Бюджет на человека',
    en: 'Budget per person'
  },
  'form.budget.low': {
    ru: '1,000-3,000 ₽',
    en: '1,000-3,000 ₽'
  },
  'form.budget.medium': {
    ru: '3,000-6,000 ₽',
    en: '3,000-6,000 ₽'
  },
  'form.budget.high': {
    ru: '6,000-10,000 ₽',
    en: '6,000-10,000 ₽'
  },
  'form.accessibility': {
    ru: 'Требования по комфорту',
    en: 'Comfort Requirements'
  },
  'form.accessibility.stairs': {
    ru: 'Максимальное количество лестниц',
    en: 'Maximum stairs'
  },
  'form.accessibility.stairs.low': {
    ru: 'Минимум лестниц',
    en: 'Minimal stairs'
  },
  'form.accessibility.stairs.medium': {
    ru: 'Умеренно',
    en: 'Moderate'
  },
  'form.accessibility.stairs.high': {
    ru: 'Не важно',
    en: "Doesn't matter"
  },
  'form.accessibility.walking': {
    ru: 'Дистанция ходьбы',
    en: 'Walking distance'
  },
  'form.accessibility.walking.short': {
    ru: 'Короткие прогулки',
    en: 'Short walks'
  },
  'form.accessibility.walking.medium': {
    ru: 'Умеренные',
    en: 'Moderate'
  },
  'form.accessibility.walking.long': {
    ru: 'Длинные',
    en: 'Long'
  },
  'form.accessibility.wheelchair': {
    ru: 'Нужна доступность для инвалидной коляски',
    en: 'Wheelchair accessibility required'
  },
  'form.accessibility.rest': {
    ru: 'Нужны места для отдыха',
    en: 'Rest areas required'
  },
  'form.weather': {
    ru: 'Беспокоит плохая погода',
    en: 'Weather concerns'
  },
  'form.interests': {
    ru: 'Интересы',
    en: 'Interests'
  },
  'form.interests.historical': {
    ru: 'Исторические места',
    en: 'Historical sites'
  },
  'form.interests.nature': {
    ru: 'Природа',
    en: 'Nature'
  },
  'form.interests.cultural': {
    ru: 'Культурные объекты',
    en: 'Cultural sites'
  },
  'form.interests.religious': {
    ru: 'Религиозные места',
    en: 'Religious sites'
  },
  'form.submit': {
    ru: 'Создать маршрут',
    en: 'Create Itinerary'
  },
  
  // Itinerary
  'itinerary.title': {
    ru: 'Ваш маршрут на {{days}} {{daysText}}',
    en: 'Your {{days}}-day itinerary'
  },
  'itinerary.day': {
    ru: 'День {{number}}',
    en: 'Day {{number}}'
  },
  'itinerary.time': {
    ru: '{{start}} - {{end}}',
    en: '{{start}} - {{end}}'
  },
  'itinerary.duration': {
    ru: 'Продолжительность: {{hours}} ч.',
    en: 'Duration: {{hours}} h.'
  },
  'itinerary.walking': {
    ru: 'Ходьба: {{distance}} км',
    en: 'Walking: {{distance}} km'
  },
  'itinerary.transport': {
    ru: 'Транспорт: {{type}}',
    en: 'Transport: {{type}}'
  },
  'itinerary.price': {
    ru: 'Стоимость: {{price}} ₽',
    en: 'Price: {{price}} ₽'
  },
  'itinerary.accessibility.high': {
    ru: 'Высокая доступность',
    en: 'High accessibility'
  },
  'itinerary.accessibility.medium': {
    ru: 'Средняя доступность',
    en: 'Medium accessibility'
  },
  'itinerary.accessibility.low': {
    ru: 'Низкая доступность',
    en: 'Low accessibility'
  },
  'itinerary.weather.alternatives': {
    ru: 'Альтернативы при плохой погоде:',
    en: 'Bad weather alternatives:'
  },
  
  // Budget
  'budget.title': {
    ru: 'Смета расходов',
    en: 'Budget Breakdown'
  },
  'budget.accommodation': {
    ru: 'Размещение',
    en: 'Accommodation'
  },
  'budget.transport': {
    ru: 'Транспорт',
    en: 'Transport'
  },
  'budget.meals': {
    ru: 'Питание',
    en: 'Meals'
  },
  'budget.entrance': {
    ru: 'Входные билеты',
    en: 'Entrance fees'
  },
  'budget.misc': {
    ru: 'Прочее',
    en: 'Miscellaneous'
  },
  'budget.total': {
    ru: 'Итого',
    en: 'Total'
  },
  'budget.per.person': {
    ru: 'на человека',
    en: 'per person'
  },
  'common.night': {
    ru: 'ночь',
    en: 'night'
  },
  'common.free': {
    ru: 'Бесплатно',
    en: 'Free'
  },
  
  // Common
  'common.loading': {
    ru: 'Загрузка...',
    en: 'Loading...'
  },
  'common.error': {
    ru: 'Произошла ошибка',
    en: 'An error occurred'
  },
  'common.retry': {
    ru: 'Попробовать снова',
    en: 'Try again'
  },
  'common.back': {
    ru: 'Назад',
    en: 'Back'
  },
  'common.next': {
    ru: 'Далее',
    en: 'Next'
  },
  'common.close': {
    ru: 'Закрыть',
    en: 'Close'
  },
  'common.address': {
    ru: 'Адрес',
    en: 'Address'
  },
  'common.schedule': {
    ru: 'Режим работы',
    en: 'Opening hours'
  },
  'common.features': {
    ru: 'Особенности',
    en: 'Features'
  },
  'common.wheelchair.accessible': {
    ru: 'Доступно для инвалидных колясок',
    en: 'Wheelchair accessible'
  },
  'common.rest.areas': {
    ru: 'Есть места для отдыха',
    en: 'Rest areas available'
  },
  'common.public.transport': {
    ru: 'Доступно на общественном транспорте',
    en: 'Accessible by public transport'
  },
  
  // Days text variations for Russian
  'days.text.1': {
    ru: 'день',
    en: 'day'
  },
  'days.text.2': {
    ru: 'дня',
    en: 'days'
  },
  'days.text.3': {
    ru: 'дня',
    en: 'days'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('tour-planner-language');
    return (saved as Language) || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('tour-planner-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = translations[key]?.[language] || key;
    
    if (!params) return translation;
    
    return Object.entries(params).reduce(
      (text, [param, value]) => text.replace(new RegExp(`{{${param}}}`, 'g'), value),
      translation
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}