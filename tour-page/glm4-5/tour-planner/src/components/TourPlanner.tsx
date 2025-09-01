import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UserPreferences } from '../types';
import { PreferencesForm } from './PreferencesForm';
import { ItineraryDisplay } from './ItineraryDisplay';
import { ItineraryService } from '../services/itineraryService';

export const TourPlanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateItinerary = async (prefs: UserPreferences) => {
    setIsGenerating(true);
    setPreferences(prefs);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedItinerary = ItineraryService.generateItinerary(prefs);
    setItinerary(generatedItinerary);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setPreferences(null);
    setItinerary(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('app.title')}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('app.subtitle')}
              </p>
            </div>
            
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => useLanguage().setLanguage('ru')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'ru'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => useLanguage().setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!itinerary ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {t('preferences.title')}
              </h2>
              <p className="text-gray-600">
                {language === 'ru' 
                  ? 'Настройте параметры вашего идеального тура по Ленинградской области'
                  : 'Configure your ideal tour parameters for Leningrad Oblast'
                }
              </p>
            </div>
            
            <PreferencesForm
              onSubmit={handleGenerateItinerary}
              isLoading={isGenerating}
            />
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('itinerary.title')}
              </h2>
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                {language === 'ru' ? 'Новый поиск' : 'New Search'}
              </button>
            </div>
            
            <ItineraryDisplay
              itinerary={itinerary}
              preferences={preferences!}
            />
          </div>
        )}
      </main>
    </div>
  );
};