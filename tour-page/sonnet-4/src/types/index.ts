export interface Destination {
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
    lat: number;
    lng: number;
    address: {
      ru: string;
      en: string;
    };
  };
  accessibility: {
    stairsLevel: 'low' | 'medium' | 'high';
    walkingDistance: 'short' | 'medium' | 'long';
    comfortRating: number; // 1-5
    wheelchairAccessible: boolean;
    restAreas: boolean;
    publicTransport: boolean;
  };
  category: 'historical' | 'nature' | 'cultural' | 'religious' | 'entertainment' | 'shopping';
  duration: number; // hours
  entranceFee: {
    adult: number;
    senior: number;
    free: boolean;
  };
  openingHours: {
    [key: string]: string;
  };
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  indoorActivity: boolean;
  weatherDependent: boolean;
}

export interface Accommodation {
  id: string;
  name: {
    ru: string;
    en: string;
  };
  type: 'hotel' | 'guesthouse' | 'sanatorium' | 'pension';
  location: {
    lat: number;
    lng: number;
    address: {
      ru: string;
      en: string;
    };
  };
  accessibility: {
    elevator: boolean;
    wheelchairAccessible: boolean;
    seniorFriendly: boolean;
    lowFloorRooms: boolean;
    medicalSupport: boolean;
  };
  pricePerNight: {
    standard: number;
    senior: number;
  };
  amenities: string[];
  rating: number;
}

export interface Transport {
  id: string;
  type: 'bus' | 'train' | 'minibus' | 'taxi';
  route: {
    from: string;
    to: string;
  };
  duration: number; // minutes
  price: {
    adult: number;
    senior: number;
  };
  accessibility: {
    lowFloor: boolean;
    wheelchairAccessible: boolean;
    comfortSeats: boolean;
  };
  frequency: string; // e.g., "every 30 minutes"
  schedule: {
    weekday: string[];
    weekend: string[];
  };
}

export interface TourItinerary {
  id: string;
  days: DayItinerary[];
  totalBudget: BudgetBreakdown;
  accessibility: {
    overallRating: number;
    notes: {
      ru: string;
      en: string;
    };
  };
}

export interface DayItinerary {
  day: number;
  activities: Activity[];
  accommodation?: Accommodation;
  totalWalkingDistance: number; // km
  totalDuration: number; // hours
  dailyBudget: number;
  weatherAlternatives?: Activity[];
}

export interface Activity {
  destination: Destination;
  startTime: string;
  endTime: string;
  transport?: Transport;
  notes: {
    ru: string;
    en: string;
  };
}

export interface BudgetBreakdown {
  accommodation: number;
  transport: number;
  meals: number;
  entranceFees: number;
  misc: number;
  total: number;
}

export interface TourPreferences {
  days: 1 | 2 | 3;
  budgetRange: {
    min: number;
    max: number;
  };
  accessibility: {
    maxStairs: 'low' | 'medium' | 'high';
    maxWalkingDistance: 'short' | 'medium' | 'long';
    wheelchairRequired: boolean;
    restAreasRequired: boolean;
  };
  interests: string[];
  weatherConcern: boolean;
  startDate?: Date;
}

export type Language = 'ru' | 'en';