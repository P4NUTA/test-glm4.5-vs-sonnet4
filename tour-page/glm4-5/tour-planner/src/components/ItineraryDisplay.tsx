import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Itinerary, UserPreferences } from '../types';
import { ItineraryService } from '../services/itineraryService';
import { Accessibility, Clock, DollarSign, MapPin, CloudRain } from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  preferences?: UserPreferences;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, preferences: _preferences }) => {
  const { t, language } = useLanguage();
  const [showRainyDayAlternative, setShowRainyDayAlternative] = useState(false);
  
  const currentItinerary = showRainyDayAlternative 
    ? ItineraryService.getRainyDayAlternatives(itinerary)
    : itinerary;

  const budgetEstimate = ItineraryService.estimateBudget(currentItinerary, {
    meals: language === 'ru' ? 800 : 25,
    transport: language === 'ru' ? 400 : 15,
    accommodation: language === 'ru' ? 2500 : 80
  });

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} ${language === 'ru' ? 'мин' : 'min'}`;
    } else if (mins === 0) {
      return `${hours} ${language === 'ru' ? 'ч' : 'h'}`;
    } else {
      return `${hours} ${language === 'ru' ? 'ч' : 'h'} ${mins} ${language === 'ru' ? 'мин' : 'min'}`;
    }
  };

  const formatPrice = (price: number): string => {
    return language === 'ru' ? `${price}₽` : `$${Math.round(price / 80)}`;
  };

  const getAccessibilityLevel = (score: number): string => {
    if (score >= 80) return language === 'ru' ? 'Отлично' : 'Excellent';
    if (score >= 60) return language === 'ru' ? 'Хорошо' : 'Good';
    if (score >= 40) return language === 'ru' ? 'Удовлетворительно' : 'Fair';
    return language === 'ru' ? 'Требует улучшений' : 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Itinerary Header */}
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ru' ? currentItinerary.title.ru : currentItinerary.title.en}
            </h3>
            <p className="text-gray-600">
              {language === 'ru' ? currentItinerary.description.ru : currentItinerary.description.en}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowRainyDayAlternative(!showRainyDayAlternative)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <CloudRain size={16} />
              <span className="text-sm">
                {showRainyDayAlternative 
                  ? (language === 'ru' ? 'Обычный' : 'Normal')
                  : (language === 'ru' ? 'Дождливый' : 'Rainy')
                }
              </span>
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              {language === 'ru' ? 'Сохранить' : 'Save'}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              {language === 'ru' ? 'Поделиться' : 'Share'}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              {language === 'ru' ? 'Печать' : 'Print'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock size={20} className="text-gray-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatDuration(currentItinerary.totalDuration)}
            </div>
            <div className="text-sm text-gray-600">
              {t('itinerary.totalTime')}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatPrice(budgetEstimate.total)}
            </div>
            <div className="text-sm text-gray-600">
              {t('itinerary.totalCost')}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Accessibility size={20} className="text-gray-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {currentItinerary.accessibilityScore}%
            </div>
            <div className="text-sm text-gray-600">
              {getAccessibilityLevel(currentItinerary.accessibilityScore)}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <MapPin size={20} className="text-gray-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {currentItinerary.days.reduce((sum, day) => sum + day.attractions.length, 0)}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'ru' ? 'Объектов' : 'Attractions'}
            </div>
          </div>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-4">
        {currentItinerary.days.map((day) => (
          <div key={day.day} className="card">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {t('itinerary.day')} {day.day}
              </h4>
              <div className="text-sm text-gray-600">
                {formatDuration(day.totalDuration)} • {formatPrice(day.totalCost)}
              </div>
            </div>

            <div className="space-y-3">
              {day.attractions.map((attraction, index) => (
                <div key={attraction.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {language === 'ru' ? attraction.name.ru : attraction.name.en}
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        {language === 'ru' ? attraction.description.ru : attraction.description.en}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="accessibility-badge">
                          <Accessibility size={12} className="mr-1" />
                          {t('attraction.accessible')}
                        </span>
                        
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock size={12} className="mr-1" />
                          {formatDuration(attraction.visitDuration)}
                        </span>
                        
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <DollarSign size={12} className="mr-1" />
                          {formatPrice(attraction.ticketPrice)}
                        </span>
                        
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <MapPin size={12} className="mr-1" />
                          {attraction.location.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {index < day.attractions.length - 1 && (
                    <div className="text-sm text-gray-500 mt-2">
                      {language === 'ru' ? 'Перемещение к следующему объекту' : 'Travel to next attraction'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {day.notes && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>{language === 'ru' ? 'Примечание:' : 'Note:'}</strong> {day.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Budget Breakdown */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ru' ? 'Детализация бюджета' : 'Budget Breakdown'}
        </h4>
        <div className="space-y-3">
          {Object.entries(budgetEstimate.breakdown).map(([key, amount]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-600 capitalize">
                {key === 'attractions' ? (language === 'ru' ? 'Входные билеты' : 'Attractions') :
                 key === 'meals' ? (language === 'ru' ? 'Питание' : 'Meals') :
                 key === 'transport' ? (language === 'ru' ? 'Транспорт' : 'Transport') :
                 key === 'accommodation' ? (language === 'ru' ? 'Проживание' : 'Accommodation') :
                 key}
              </span>
              <span className="font-medium text-gray-900">
                {formatPrice(amount)}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between items-center font-semibold">
            <span>{language === 'ru' ? 'Итого' : 'Total'}</span>
            <span className="text-lg">{formatPrice(budgetEstimate.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};