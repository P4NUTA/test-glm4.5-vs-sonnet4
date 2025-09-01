export interface Attraction {
  id: string;
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: 'museum' | 'park' | 'church' | 'palace' | 'nature' | 'monument' | 'spa' | 'restaurant';
  accessibility: {
    wheelchairAccessible: boolean;
    hasElevator: boolean;
    minimalStairs: boolean;
    restingAreas: boolean;
    accessibleToilets: boolean;
  };
  visitDuration: number; // in minutes
  ticketPrice: number; // in RUB
  openingHours: {
    [key: string]: string; // day: hours
  };
  weatherDependent: boolean;
  rainyDayAlternative: boolean;
  images: string[];
  tags: string[];
}

export interface ItineraryDay {
  day: number;
  attractions: Attraction[];
  totalDuration: number;
  totalCost: number;
  travelTime: number;
  notes: string;
}

export interface Itinerary {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  days: ItineraryDay[];
  totalDuration: number;
  totalCost: number;
  accessibilityScore: number;
  createdAt: Date;
}

export interface UserPreferences {
  duration: 1 | 2 | 3; // days
  budget: 'low' | 'medium' | 'high';
  mobility: 'high' | 'medium' | 'low';
  interests: string[];
  maxWalkingDistance: number; // in meters
  requiresWheelchair: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  humidity: number;
  windSpeed: number;
}

export type Language = 'ru' | 'en';