import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TourPreferences } from '../types';

interface TourFormProps {
  onSubmit: (preferences: TourPreferences) => void;
  loading?: boolean;
}

export function TourForm({ onSubmit, loading }: TourFormProps) {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState<TourPreferences>({
    days: 2,
    budgetRange: { min: 3000, max: 6000 },
    accessibility: {
      maxStairs: 'medium',
      maxWalkingDistance: 'medium',
      wheelchairRequired: false,
      restAreasRequired: true
    },
    interests: ['historical', 'cultural'],
    weatherConcern: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onSubmit(preferences);
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-senior-xl font-semibold mb-6 text-gray-800">
        {t('form.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Days Selection */}
        <div>
          <label className="block text-senior-base font-medium text-gray-700 mb-3">
            {t('form.days')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, days: days as 1 | 2 | 3 }))}
                className={`py-3 px-4 text-senior-base font-medium rounded-senior border-2 transition-colors duration-200 ${
                  preferences.days === days
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                }`}
              >
                {t(`form.days.${days}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Selection */}
        <div>
          <label className="block text-senior-base font-medium text-gray-700 mb-3">
            {t('form.budget')}
          </label>
          <div className="space-y-3">
            {[
              { min: 1000, max: 3000, key: 'low' },
              { min: 3000, max: 6000, key: 'medium' },
              { min: 6000, max: 10000, key: 'high' }
            ].map(({ min, max, key }) => (
              <label key={key} className="flex items-center">
                <input
                  type="radio"
                  name="budget"
                  checked={preferences.budgetRange.min === min}
                  onChange={() => setPreferences(prev => ({ 
                    ...prev, 
                    budgetRange: { min, max } 
                  }))}
                  className="w-5 h-5 text-primary-600 border-2 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-senior-base text-gray-700">
                  {t(`form.budget.${key}`)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Accessibility Preferences */}
        <div className="space-y-6">
          <h3 className="text-senior-lg font-medium text-gray-800">
            {t('form.accessibility')}
          </h3>

          {/* Stairs Level */}
          <div>
            <label className="block text-senior-base font-medium text-gray-700 mb-3">
              {t('form.accessibility.stairs')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPreferences(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, maxStairs: level as 'low' | 'medium' | 'high' }
                  }))}
                  className={`py-2 px-3 text-senior-sm font-medium rounded-senior border-2 transition-colors duration-200 ${
                    preferences.accessibility.maxStairs === level
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {t(`form.accessibility.stairs.${level}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Walking Distance */}
          <div>
            <label className="block text-senior-base font-medium text-gray-700 mb-3">
              {t('form.accessibility.walking')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['short', 'medium', 'long'].map((distance) => (
                <button
                  key={distance}
                  type="button"
                  onClick={() => setPreferences(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, maxWalkingDistance: distance as 'short' | 'medium' | 'long' }
                  }))}
                  className={`py-2 px-3 text-senior-sm font-medium rounded-senior border-2 transition-colors duration-200 ${
                    preferences.accessibility.maxWalkingDistance === distance
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {t(`form.accessibility.walking.${distance}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.accessibility.wheelchairRequired}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  accessibility: { ...prev.accessibility, wheelchairRequired: e.target.checked }
                }))}
                className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-senior-base text-gray-700">
                {t('form.accessibility.wheelchair')}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.accessibility.restAreasRequired}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  accessibility: { ...prev.accessibility, restAreasRequired: e.target.checked }
                }))}
                className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-senior-base text-gray-700">
                {t('form.accessibility.rest')}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.weatherConcern}
                onChange={(e) => setPreferences(prev => ({ ...prev, weatherConcern: e.target.checked }))}
                className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-senior-base text-gray-700">
                {t('form.weather')}
              </span>
            </label>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-senior-base font-medium text-gray-700 mb-3">
            {t('form.interests')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['historical', 'nature', 'cultural', 'religious'].map((interest) => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.interests.includes(interest)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences(prev => ({
                        ...prev,
                        interests: [...prev.interests, interest]
                      }));
                    } else {
                      setPreferences(prev => ({
                        ...prev,
                        interests: prev.interests.filter(i => i !== interest)
                      }));
                    }
                  }}
                  className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-senior-base text-gray-700">
                  {t(`form.interests.${interest}`)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-primary text-senior-base py-4 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? t('common.loading') : t('form.submit')}
        </button>
      </form>
    </div>
  );
}