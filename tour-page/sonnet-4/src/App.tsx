import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { TourForm } from './components/TourForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { generateTour } from './utils/tourGenerator';
import { validateTourPreferences, isSubmissionAllowed } from './utils/validation';
import { TourPreferences, TourItinerary } from './types';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<'form' | 'itinerary'>('form');
  const [itinerary, setItinerary] = useState<TourItinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (preferences: TourPreferences) => {
    setLoading(true);
    setError(null);
    
    try {
      // Rate limiting check
      if (!isSubmissionAllowed()) {
        throw new Error('Слишком много запросов. Пожалуйста, подождите минуту.');
      }
      
      // Validate input
      const validationErrors = validateTourPreferences(preferences);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0].message.ru);
      }
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedItinerary = generateTour(preferences);
      setItinerary(generatedItinerary);
      setCurrentStep('itinerary');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      console.error('Tour generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep('form');
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center">
                <div className="text-2xl mr-3">❌</div>
                <div>
                  <h3 className="text-senior-base font-semibold text-red-800">
                    Ошибка генерации маршрута
                  </h3>
                  <p className="text-senior-sm text-red-600 mt-1">
                    {error}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-4 btn-secondary text-senior-sm"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        )}

        {currentStep === 'form' && (
          <TourForm onSubmit={handleFormSubmit} loading={loading} />
        )}

        {currentStep === 'itinerary' && itinerary && (
          <ItineraryDisplay itinerary={itinerary} onBack={handleBack} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-senior-sm text-gray-600">
            <p>
              © 2024 Планировщик туров 55+. Специально разработано для комфортных путешествий.
            </p>
            <p className="mt-1">
              Все данные являются демонстрационными. Проверяйте актуальную информацию на официальных сайтах.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;