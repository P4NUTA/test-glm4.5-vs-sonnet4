import { TourPreferences, TourItinerary, DayItinerary, Activity, BudgetBreakdown, Destination, Accommodation } from '../types';
import { destinations } from '../data/destinations';
import { accommodations } from '../data/accommodations';
import { transport } from '../data/transport';

// Seeded random number generator for deterministic results
class SeededRandom {
  private seed: number;
  
  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }
  
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
  
  random(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  
  choice<T>(array: T[]): T {
    return array[Math.floor(this.random() * array.length)];
  }
}

function filterDestinations(preferences: TourPreferences, rng: SeededRandom): Destination[] {
  let filtered = destinations.filter(dest => {
    // Accessibility filters
    if (preferences.accessibility.wheelchairRequired && !dest.accessibility.wheelchairAccessible) {
      return false;
    }
    
    if (preferences.accessibility.restAreasRequired && !dest.accessibility.restAreas) {
      return false;
    }
    
    // Stairs level filter
    const stairsMapping = { low: 1, medium: 2, high: 3 };
    const maxStairsLevel = stairsMapping[preferences.accessibility.maxStairs];
    const destStairsLevel = stairsMapping[dest.accessibility.stairsLevel];
    if (destStairsLevel > maxStairsLevel) {
      return false;
    }
    
    // Walking distance filter
    const walkingMapping = { short: 1, medium: 2, long: 3 };
    const maxWalkingLevel = walkingMapping[preferences.accessibility.maxWalkingDistance];
    const destWalkingLevel = walkingMapping[dest.accessibility.walkingDistance];
    if (destWalkingLevel > maxWalkingLevel) {
      return false;
    }
    
    // Weather concern filter
    if (preferences.weatherConcern && dest.weatherDependent) {
      return false;
    }
    
    // Interest filter
    if (preferences.interests.length > 0 && !preferences.interests.includes(dest.category)) {
      return false;
    }
    
    return true;
  });
  
  // If too few destinations remain, relax some constraints
  if (filtered.length < preferences.days * 2) {
    filtered = destinations.filter(dest => {
      if (preferences.accessibility.wheelchairRequired && !dest.accessibility.wheelchairAccessible) {
        return false;
      }
      
      const stairsMapping = { low: 1, medium: 2, high: 3 };
      const maxStairsLevel = stairsMapping[preferences.accessibility.maxStairs];
      const destStairsLevel = stairsMapping[dest.accessibility.stairsLevel];
      if (destStairsLevel > maxStairsLevel + 1) {
        return false;
      }
      
      return true;
    });
  }
  
  return rng.shuffle(filtered);
}

function selectAccommodation(preferences: TourPreferences, rng: SeededRandom): Accommodation | undefined {
  if (preferences.days === 1) return undefined;
  
  let suitable = accommodations.filter(acc => {
    if (preferences.accessibility.wheelchairRequired && !acc.accessibility.wheelchairAccessible) {
      return false;
    }
    
    const nightlyBudget = preferences.budgetRange.max * 0.4; // 40% of budget for accommodation
    if (acc.pricePerNight.senior > nightlyBudget) {
      return false;
    }
    
    return true;
  });
  
  if (suitable.length === 0) {
    suitable = accommodations.filter(acc => 
      acc.pricePerNight.senior <= preferences.budgetRange.max * 0.6
    );
  }
  
  return suitable.length > 0 ? rng.choice(suitable) : undefined;
}

function createDayItinerary(
  day: number,
  availableDestinations: Destination[],
  preferences: TourPreferences,
  accommodation: Accommodation | undefined
): DayItinerary {
  const destinationsPerDay = day === 1 ? Math.min(3, availableDestinations.length) : Math.min(2, availableDestinations.length);
  const selectedDestinations = availableDestinations.slice(0, destinationsPerDay);
  
  const activities: Activity[] = [];
  let currentTime = 10; // Start at 10:00
  let totalWalking = 0;
  let dailyBudget = 0;
  
  selectedDestinations.forEach((dest, index) => {
    const startTime = `${Math.floor(currentTime)}:${(currentTime % 1 * 60).toString().padStart(2, '0')}`;
    const endTime = `${Math.floor(currentTime + dest.duration)}:${((currentTime + dest.duration) % 1 * 60).toString().padStart(2, '0')}`;
    
    const selectedTransport = index === 0 ? 
      transport.find(t => t.route.to.includes(dest.name.ru.split(' ')[0])) || transport[transport.length - 1] :
      undefined;
    
    activities.push({
      destination: dest,
      startTime,
      endTime,
      transport: selectedTransport,
      notes: {
        ru: `Посещение: ${dest.name.ru}`,
        en: `Visit: ${dest.name.en}`
      }
    });
    
    currentTime += dest.duration + 0.5; // Add 30 minutes between activities
    totalWalking += dest.accessibility.walkingDistance === 'short' ? 0.5 : 
                   dest.accessibility.walkingDistance === 'medium' ? 1.0 : 1.5;
    dailyBudget += dest.entranceFee.senior;
    if (selectedTransport) {
      dailyBudget += selectedTransport.price.senior;
    }
  });
  
  // Add meal costs
  dailyBudget += 800; // Estimated meal cost for seniors
  
  // Generate weather alternatives
  const weatherAlternatives = destinations
    .filter(dest => dest.indoorActivity && !dest.weatherDependent)
    .filter(dest => !selectedDestinations.includes(dest))
    .slice(0, 2)
    .map(dest => ({
      destination: dest,
      startTime: '14:00',
      endTime: '16:00',
      notes: {
        ru: `Альтернатива при плохой погоде: ${dest.name.ru}`,
        en: `Bad weather alternative: ${dest.name.en}`
      }
    }));
  
  return {
    day,
    activities,
    accommodation: day < preferences.days ? accommodation : undefined,
    totalWalkingDistance: Math.round(totalWalking * 10) / 10,
    totalDuration: Math.round((currentTime - 10) * 10) / 10,
    dailyBudget: Math.round(dailyBudget),
    weatherAlternatives: preferences.weatherConcern ? weatherAlternatives : undefined
  };
}

function calculateBudget(itinerary: TourItinerary, preferences: TourPreferences): BudgetBreakdown {
  let accommodation = 0;
  let transport = 0;
  let entranceFees = 0;
  
  itinerary.days.forEach(day => {
    if (day.accommodation) {
      accommodation += day.accommodation.pricePerNight.senior;
    }
    
    day.activities.forEach(activity => {
      entranceFees += activity.destination.entranceFee.senior;
      if (activity.transport) {
        transport += activity.transport.price.senior;
      }
    });
  });
  
  const meals = preferences.days * 800; // 800 rubles per day for meals
  const misc = Math.round((accommodation + transport + entranceFees + meals) * 0.1); // 10% for miscellaneous
  const total = accommodation + transport + meals + entranceFees + misc;
  
  return {
    accommodation,
    transport,
    meals,
    entranceFees,
    misc,
    total
  };
}

export function generateTour(preferences: TourPreferences): TourItinerary {
  try {
    // Create seeded random generator for deterministic results
    const seed = JSON.stringify(preferences) + Date.now().toString();
    const rng = new SeededRandom(seed);
    
    // Filter destinations based on preferences
    const availableDestinations = filterDestinations(preferences, rng);
    
    if (availableDestinations.length === 0) {
      throw new Error('No suitable destinations found for your preferences');
    }
    
    // Select accommodation if multi-day trip
    const accommodation = selectAccommodation(preferences, rng);
    
    // Create daily itineraries
    const days: DayItinerary[] = [];
    let remainingDestinations = [...availableDestinations];
    
    for (let day = 1; day <= preferences.days; day++) {
      const dayItinerary = createDayItinerary(
        day,
        remainingDestinations,
        preferences,
        accommodation
      );
      
      days.push(dayItinerary);
      
      // Remove used destinations
      remainingDestinations = remainingDestinations.filter(dest => 
        !dayItinerary.activities.some(activity => activity.destination.id === dest.id)
      );
    }
    
    const itinerary: TourItinerary = {
      id: `tour-${Date.now()}-${rng.random().toString(36).substr(2, 9)}`,
      days,
      totalBudget: {} as BudgetBreakdown,
      accessibility: {
        overallRating: Math.min(...days.map(day => 
          Math.min(...day.activities.map(a => a.destination.accessibility.comfortRating))
        )),
        notes: {
          ru: 'Маршрут составлен с учетом ваших требований по доступности',
          en: 'Itinerary created considering your accessibility requirements'
        }
      }
    };
    
    // Calculate budget
    itinerary.totalBudget = calculateBudget(itinerary, preferences);
    
    return itinerary;
    
  } catch (error) {
    throw new Error(`Failed to generate tour: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}