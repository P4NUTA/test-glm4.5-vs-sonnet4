import { useLanguage } from '../contexts/LanguageContext';
import { TourItinerary, Activity } from '../types';
import { BudgetBreakdown } from './BudgetBreakdown';

interface ItineraryDisplayProps {
  itinerary: TourItinerary;
  onBack: () => void;
}

export function ItineraryDisplay({ itinerary, onBack }: ItineraryDisplayProps) {
  const { language, t } = useLanguage();

  const getAccessibilityClass = (rating: number) => {
    if (rating >= 4) return 'accessibility-high';
    if (rating >= 3) return 'accessibility-medium';
    return 'accessibility-low';
  };

  const getAccessibilityLabel = (rating: number) => {
    if (rating >= 4) return t('itinerary.accessibility.high');
    if (rating >= 3) return t('itinerary.accessibility.medium');
    return t('itinerary.accessibility.low');
  };

  const getDaysText = (days: number) => {
    return t(`days.text.${days}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-senior-2xl font-bold text-gray-800">
          {t('itinerary.title', { 
            days: itinerary.days.length.toString(),
            daysText: getDaysText(itinerary.days.length)
          })}
        </h2>
        <button
          onClick={onBack}
          className="btn-secondary text-senior-base"
        >
          {t('common.back')}
        </button>
      </div>

      {/* Overall Accessibility Rating */}
      <div className="card">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-senior-sm font-medium border ${getAccessibilityClass(itinerary.accessibility.overallRating)}`}>
          {getAccessibilityLabel(itinerary.accessibility.overallRating)}
        </div>
        <p className="text-senior-base text-gray-600 mt-2">
          {itinerary.accessibility.notes[language]}
        </p>
      </div>

      {/* Daily Itineraries */}
      <div className="space-y-6">
        {itinerary.days.map((day) => (
          <div key={day.day} className="card">
            <h3 className="text-senior-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              {t('itinerary.day', { number: day.day.toString() })}
            </h3>

            {/* Day Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-senior">
              <div className="text-center">
                <div className="text-senior-sm text-gray-600">
                  {t('itinerary.duration', { hours: day.totalDuration.toString() })}
                </div>
              </div>
              <div className="text-center">
                <div className="text-senior-sm text-gray-600">
                  {t('itinerary.walking', { distance: day.totalWalkingDistance.toString() })}
                </div>
              </div>
              <div className="text-center">
                <div className="text-senior-sm text-gray-600">
                  {t('itinerary.price', { price: day.dailyBudget.toString() })}
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-4">
              {day.activities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>

            {/* Accommodation */}
            {day.accommodation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-senior border border-blue-200">
                <h4 className="font-medium text-gray-800 mb-2">
                  {t('budget.accommodation')}
                </h4>
                <div className="text-senior-base text-gray-700">
                  <div className="font-medium">{day.accommodation.name[language]}</div>
                  <div className="text-senior-sm text-gray-600 mt-1">
                    {day.accommodation.location.address[language]}
                  </div>
                  <div className="text-senior-sm text-gray-600 mt-1">
                    {t('itinerary.price', { price: day.accommodation.pricePerNight.senior.toString() })} / {t('common.night')}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {day.accommodation.accessibility.wheelchairAccessible && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-senior-sm rounded">
                        {t('common.wheelchair.accessible')}
                      </span>
                    )}
                    {day.accommodation.accessibility.elevator && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-senior-sm rounded">
                        Elevator
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Weather Alternatives */}
            {day.weatherAlternatives && day.weatherAlternatives.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-senior border border-yellow-200">
                <h4 className="font-medium text-gray-800 mb-3">
                  {t('itinerary.weather.alternatives')}
                </h4>
                <div className="space-y-2">
                  {day.weatherAlternatives.map((alternative, index) => (
                    <div key={index} className="text-senior-base text-gray-700">
                      <div className="font-medium">{alternative.destination.name[language]}</div>
                      <div className="text-senior-sm text-gray-600">
                        {alternative.destination.description[language]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Budget Breakdown */}
      <BudgetBreakdown budget={itinerary.totalBudget} />
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const { language, t } = useLanguage();
  const dest = activity.destination;

  const getAccessibilityClass = (rating: number) => {
    if (rating >= 4) return 'accessibility-high';
    if (rating >= 3) return 'accessibility-medium';
    return 'accessibility-low';
  };

  return (
    <div className="border border-gray-200 rounded-senior p-4 hover:border-primary-300 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="text-senior-lg font-semibold text-gray-800">
              {dest.name[language]}
            </h4>
            <div className="text-senior-sm text-gray-600 text-right ml-4">
              {t('itinerary.time', { 
                start: activity.startTime, 
                end: activity.endTime 
              })}
            </div>
          </div>

          <p className="text-senior-base text-gray-600 mt-2">
            {dest.description[language]}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-2 py-1 text-senior-sm font-medium border rounded ${getAccessibilityClass(dest.accessibility.comfortRating)}`}>
              {dest.accessibility.comfortRating}/5 ★
            </span>
            
            {dest.accessibility.wheelchairAccessible && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-senior-sm rounded">
                {t('common.wheelchair.accessible')}
              </span>
            )}
            
            {dest.accessibility.restAreas && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-senior-sm rounded">
                {t('common.rest.areas')}
              </span>
            )}

            {dest.accessibility.publicTransport && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-senior-sm rounded">
                {t('common.public.transport')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-senior-sm text-gray-600">
            <div>
              <strong>{t('common.address')}:</strong><br />
              {dest.location.address[language]}
            </div>
            <div>
              <strong>{t('itinerary.price')}:</strong><br />
              {dest.entranceFee.free 
                ? t('common.free') 
                : `${dest.entranceFee.senior} ₽`
              }
            </div>
          </div>

          {activity.transport && (
            <div className="mt-3 p-2 bg-gray-50 rounded text-senior-sm">
              <strong>{t('itinerary.transport', { type: activity.transport.type })}:</strong> {activity.transport.price.senior} ₽
            </div>
          )}

          {activity.notes[language] && (
            <div className="mt-2 text-senior-sm text-gray-600 italic">
              {activity.notes[language]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}