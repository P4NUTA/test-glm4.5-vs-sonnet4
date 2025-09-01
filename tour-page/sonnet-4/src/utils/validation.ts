import { TourPreferences } from '../types';

export interface ValidationError {
  field: string;
  message: {
    ru: string;
    en: string;
  };
}

export function validateTourPreferences(preferences: TourPreferences): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate days
  if (!preferences.days || preferences.days < 1 || preferences.days > 3) {
    errors.push({
      field: 'days',
      message: {
        ru: 'Количество дней должно быть от 1 до 3',
        en: 'Number of days must be between 1 and 3'
      }
    });
  }

  // Validate budget range
  if (!preferences.budgetRange || preferences.budgetRange.min >= preferences.budgetRange.max) {
    errors.push({
      field: 'budgetRange',
      message: {
        ru: 'Некорректный диапазон бюджета',
        en: 'Invalid budget range'
      }
    });
  }

  if (preferences.budgetRange.min < 500 || preferences.budgetRange.max > 50000) {
    errors.push({
      field: 'budgetRange',
      message: {
        ru: 'Бюджет должен быть в пределах от 500 до 50,000 рублей',
        en: 'Budget must be between 500 and 50,000 rubles'
      }
    });
  }

  // Validate accessibility preferences
  if (!preferences.accessibility) {
    errors.push({
      field: 'accessibility',
      message: {
        ru: 'Требования по доступности не указаны',
        en: 'Accessibility requirements not specified'
      }
    });
  } else {
    const validStairsLevels = ['low', 'medium', 'high'];
    const validWalkingDistances = ['short', 'medium', 'long'];

    if (!validStairsLevels.includes(preferences.accessibility.maxStairs)) {
      errors.push({
        field: 'accessibility.maxStairs',
        message: {
          ru: 'Некорректный уровень лестниц',
          en: 'Invalid stairs level'
        }
      });
    }

    if (!validWalkingDistances.includes(preferences.accessibility.maxWalkingDistance)) {
      errors.push({
        field: 'accessibility.maxWalkingDistance',
        message: {
          ru: 'Некорректная дистанция ходьбы',
          en: 'Invalid walking distance'
        }
      });
    }
  }

  // Validate interests
  if (!preferences.interests || !Array.isArray(preferences.interests)) {
    errors.push({
      field: 'interests',
      message: {
        ru: 'Интересы должны быть указаны',
        en: 'Interests must be specified'
      }
    });
  } else {
    const validInterests = ['historical', 'nature', 'cultural', 'religious', 'entertainment', 'shopping'];
    const invalidInterests = preferences.interests.filter(interest => !validInterests.includes(interest));
    
    if (invalidInterests.length > 0) {
      errors.push({
        field: 'interests',
        message: {
          ru: 'Некорректные интересы выбраны',
          en: 'Invalid interests selected'
        }
      });
    }
  }

  return errors;
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[^\w\s\u0400-\u04FF.,!?-]/g, '') // Allow only letters, numbers, spaces, Cyrillic, and basic punctuation
    .substring(0, 500); // Limit length
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Rate limiting for form submissions
const submissionTimes = new Map<string, number[]>();

export function isSubmissionAllowed(identifier: string = 'default'): boolean {
  const now = Date.now();
  const submissions = submissionTimes.get(identifier) || [];
  
  // Clean old submissions (older than 1 minute)
  const recentSubmissions = submissions.filter(time => now - time < 60000);
  
  // Allow max 5 submissions per minute
  if (recentSubmissions.length >= 5) {
    return false;
  }
  
  recentSubmissions.push(now);
  submissionTimes.set(identifier, recentSubmissions);
  
  return true;
}

export function formatCurrency(amount: number, currency: string = '₽'): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 ' + currency;
  }
  
  return Math.round(amount).toLocaleString('ru-RU') + ' ' + currency;
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}