import { useLanguage } from '../contexts/LanguageContext';
import { BudgetBreakdown as BudgetType } from '../types';

interface BudgetBreakdownProps {
  budget: BudgetType;
}

export function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const { t } = useLanguage();

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  const budgetItems = [
    { key: 'accommodation', amount: budget.accommodation },
    { key: 'transport', amount: budget.transport },
    { key: 'meals', amount: budget.meals },
    { key: 'entrance', amount: budget.entranceFees },
    { key: 'misc', amount: budget.misc }
  ];

  return (
    <div className="card">
      <h3 className="text-senior-xl font-semibold text-gray-800 mb-6">
        {t('budget.title')}
      </h3>

      <div className="space-y-4">
        {budgetItems.map(({ key, amount }) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-senior-base text-gray-700">
              {t(`budget.${key}`)}
            </span>
            <span className="text-senior-base font-medium text-gray-800">
              {formatPrice(amount)} ₽
            </span>
          </div>
        ))}
        
        <div className="flex justify-between items-center py-3 border-t-2 border-primary-200 font-semibold text-senior-lg">
          <span className="text-gray-800">
            {t('budget.total')} ({t('budget.per.person')})
          </span>
          <span className="text-primary-700">
            {formatPrice(budget.total)} ₽
          </span>
        </div>
      </div>

      {/* Visual Budget Breakdown */}
      <div className="mt-6">
        <h4 className="text-senior-base font-medium text-gray-700 mb-3">
          Структура расходов
        </h4>
        <div className="space-y-2">
          {budgetItems.map(({ key, amount }) => {
            const percentage = budget.total > 0 ? (amount / budget.total) * 100 : 0;
            return (
              <div key={key} className="flex items-center">
                <div className="w-24 text-senior-sm text-gray-600">
                  {t(`budget.${key}`)}
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-senior-sm text-gray-600 text-right">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Tips */}
      <div className="mt-6 p-4 bg-senior-50 rounded-senior border border-senior-200">
        <h4 className="font-medium text-gray-800 mb-2">
          💡 Советы по экономии
        </h4>
        <ul className="text-senior-sm text-gray-600 space-y-1">
          <li>• Льготы для пенсионеров действуют в большинстве музеев</li>
          <li>• Групповые экскурсии обходятся дешевле индивидуальных</li>
          <li>• Бесплатные дни в некоторых музеях для пенсионеров</li>
          <li>• Проездные билеты выгоднее разовых поездок</li>
        </ul>
      </div>
    </div>
  );
}