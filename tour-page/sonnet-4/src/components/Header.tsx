import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-senior-2xl font-bold">
              {t('header.title')}
            </h1>
            <p className="text-senior-base text-primary-100 mt-1">
              {t('header.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="btn-secondary text-senior-base"
              aria-label={`Switch to ${language === 'ru' ? 'English' : 'Russian'}`}
            >
              {t('nav.language')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}