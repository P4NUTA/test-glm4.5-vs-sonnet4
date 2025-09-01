import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UserPreferences } from '../types';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit, isLoading }) => {
  const { t, language } = useLanguage();
  const [preferences, setPreferences] = useState<UserPreferences>({
    duration: 1,
    budget: 'medium',
    mobility: 'medium',
    interests: [],
    maxWalkingDistance: 500,
    requiresWheelchair: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const interests = [
    { key: 'история', en: 'history' },
    { key: 'искусство', en: 'art' },
    { key: 'природа', en: 'nature' },
    { key: 'архитектура', en: 'architecture' },
    { key: 'музеи', en: 'museums' },
    { key: 'парки', en: 'parks' },
    { key: 'религия', en: 'religion' },
    { key: 'культура', en: 'culture' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Duration */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('preferences.duration')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(days => (
            <button
              key={days}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, duration: days as 1 | 2 | 3 }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                preferences.duration === days
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-lg font-semibold">{days}</div>
              <div className="text-sm text-gray-600">
                {days === 1 ? (language === 'ru' ? 'день' : 'day') : 
                 days === 2 ? (language === 'ru' ? 'дня' : 'days') : 
                 (language === 'ru' ? 'дня' : 'days')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('preferences.budget')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['low', 'medium', 'high'] as const).map(budget => (
            <button
              key={budget}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, budget }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                preferences.budget === budget
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-lg font-semibold capitalize">
                {budget === 'low' ? (language === 'ru' ? 'Низкий' : 'Low') :
                 budget === 'medium' ? (language === 'ru' ? 'Средний' : 'Medium') :
                 (language === 'ru' ? 'Высокий' : 'High')}
              </div>
              <div className="text-sm text-gray-600">
                {budget === 'low' ? (language === 'ru' ? 'до 1000₽' : 'up to 1000₽') :
                 budget === 'medium' ? (language === 'ru' ? '1000-3000₽' : '1000-3000₽') :
                 (language === 'ru' ? 'от 3000₽' : 'over 3000₽')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobility */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('preferences.mobility')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['high', 'medium', 'low'] as const).map(mobility => (
            <button
              key={mobility}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, mobility }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                preferences.mobility === mobility
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-lg font-semibold capitalize">
                {mobility === 'high' ? (language === 'ru' ? 'Высокая' : 'High') :
                 mobility === 'medium' ? (language === 'ru' ? 'Средняя' : 'Medium') :
                 (language === 'ru' ? 'Низкая' : 'Low')}
              </div>
              <div className="text-sm text-gray-600">
                {mobility === 'high' ? (language === 'ru' ? 'Активный' : 'Active') :
                 mobility === 'medium' ? (language === 'ru' ? 'Умеренный' : 'Moderate') :
                 (language === 'ru' ? 'Ограниченный' : 'Limited')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Wheelchair Accessibility */}
      <div className="card">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.requiresWheelchair}
            onChange={(e) => setPreferences(prev => ({ 
              ...prev, 
              requiresWheelchair: e.target.checked 
            }))}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            {language === 'ru' ? 'Требуется доступность для колясок' : 'Wheelchair accessibility required'}
          </span>
        </label>
      </div>

      {/* Interests */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('preferences.interests')}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {interests.map(interest => (
            <button
              key={interest.key}
              type="button"
              onClick={() => handleInterestToggle(interest.key)}
              className={`p-3 border rounded-lg text-center transition-colors ${
                preferences.interests.includes(interest.key)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">
                {language === 'ru' ? interest.key : interest.en}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary min-w-[200px]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {language === 'ru' ? 'Генерация...' : 'Generating...'}
            </div>
          ) : (
            t('preferences.generate')
          )}
        </button>
      </div>
    </form>
  );
};