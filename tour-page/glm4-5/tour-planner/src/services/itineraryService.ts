import { Attraction, Itinerary, ItineraryDay, UserPreferences, WeatherData } from '../types';
import { attractions } from '../data/attractions';

export class ItineraryService {
  private static calculateDistance(coord1: {lat: number, lng: number}, coord2: {lat: number, lng: number}): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLon = this.toRadians(coord2.lng - coord1.lng);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(coord1.lat)) * Math.cos(this.toRadians(coord2.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI/180);
  }

  private static calculateTravelTime(distance: number): number {
    // Average speed including transfers and waiting time (km/h)
    const averageSpeed = 25;
    return Math.round((distance / averageSpeed) * 60); // Convert to minutes
  }

  private static calculateAccessibilityScore(attraction: Attraction): number {
    let score = 0;
    if (attraction.accessibility.wheelchairAccessible) score += 20;
    if (attraction.accessibility.hasElevator) score += 20;
    if (attraction.accessibility.minimalStairs) score += 20;
    if (attraction.accessibility.restingAreas) score += 20;
    if (attraction.accessibility.accessibleToilets) score += 20;
    return score;
  }

  private static filterAttractionsByPreferences(
    attractions: Attraction[], 
    preferences: UserPreferences,
    weather?: WeatherData
  ): Attraction[] {
    let filtered = attractions.filter(attraction => {
      // Filter by accessibility requirements
      if (preferences.requiresWheelchair && !attraction.accessibility.wheelchairAccessible) {
        return false;
      }

      // Filter by mobility level
      if (preferences.mobility === 'low' && !attraction.accessibility.minimalStairs) {
        return false;
      }

      // Filter by interests
      if (preferences.interests.length > 0) {
        const hasMatchingInterest = preferences.interests.some(interest =>
          attraction.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
        );
        if (!hasMatchingInterest) return false;
      }

      // Filter by weather conditions
      if (weather && weather.condition === 'rainy' && attraction.weatherDependent && !attraction.rainyDayAlternative) {
        return false;
      }

      return true;
    });

    // Sort by accessibility score and budget appropriateness
    return filtered.sort((a, b) => {
      const scoreA = this.calculateAccessibilityScore(a);
      const scoreB = this.calculateAccessibilityScore(b);
      
      // Consider budget constraints
      const budgetMultiplier = preferences.budget === 'low' ? -1 : preferences.budget === 'high' ? 1 : 0;
      const priceDiff = (a.ticketPrice - b.ticketPrice) * budgetMultiplier;
      
      return (scoreB - scoreA) + (priceDiff * 0.01);
    });
  }

  private static groupAttractionsByLocation(attractions: Attraction[]): Attraction[][] {
    const groups: Attraction[][] = [];
    const used = new Set<string>();
    
    for (const attraction of attractions) {
      if (used.has(attraction.id)) continue;
      
      const group = [attraction];
      used.add(attraction.id);
      
      // Find nearby attractions (within 15km)
      for (const other of attractions) {
        if (used.has(other.id)) continue;
        
        const distance = this.calculateDistance(attraction.location.coordinates, other.location.coordinates);
        if (distance <= 15) {
          group.push(other);
          used.add(other.id);
        }
      }
      
      groups.push(group);
    }
    
    return groups;
  }

  private static createDayItinerary(
    attractions: Attraction[],
    maxDuration: number = 480 // 8 hours in minutes
  ): ItineraryDay {
    const dayAttractions: Attraction[] = [];
    let totalDuration = 0;
    let totalCost = 0;
    let travelTime = 0;
    
    for (let i = 0; i < attractions.length; i++) {
      const attraction = attractions[i];
      
      // Calculate travel time from previous attraction
      if (i > 0) {
        const distance = this.calculateDistance(
          attractions[i-1].location.coordinates,
          attraction.location.coordinates
        );
        travelTime += this.calculateTravelTime(distance);
      }
      
      // Check if adding this attraction exceeds time limit
      const timeWithAttraction = totalDuration + attraction.visitDuration + travelTime;
      if (timeWithAttraction > maxDuration) {
        break;
      }
      
      dayAttractions.push(attraction);
      totalDuration += attraction.visitDuration;
      totalCost += attraction.ticketPrice;
    }
    
    return {
      day: 1,
      attractions: dayAttractions,
      totalDuration,
      totalCost,
      travelTime,
      notes: this.generateDayNotes(dayAttractions, totalDuration, travelTime)
    };
  }

  private static generateDayNotes(attractions: Attraction[], duration: number, travelTime: number): string {
    const notes = [];
    
    if (attractions.length === 0) {
      return 'Нет достопримечательностей для этого дня';
    }
    
    if (duration > 360) {
      notes.push('Длительный день - рекомендуется сделать перерыв на обед');
    }
    
    if (travelTime > duration * 0.3) {
      notes.push('Значительное время на перемещения между объектами');
    }
    
    const hasWheelchairAttractions = attractions.some(a => a.accessibility.wheelchairAccessible);
    if (hasWheelchairAttractions) {
      notes.push('Все объекты доступны для посетителей с ограниченной мобильностью');
    }
    
    return notes.join('. ');
  }

  static generateItinerary(
    preferences: UserPreferences,
    weather?: WeatherData
  ): Itinerary {
    // Simple deterministic seed for consistent results
    const seed = preferences.duration + preferences.budget.length + preferences.mobility.length;
    const randomSeed = Math.sin(seed) * 10000;

    // Filter attractions based on preferences
    const filteredAttractions = this.filterAttractionsByPreferences(attractions, preferences, weather);
    
    // Group by location to minimize travel
    const locationGroups = this.groupAttractionsByLocation(filteredAttractions);
    
    // Flatten groups while preserving location proximity
    const optimizedAttractions = locationGroups.flat();
    
    // Create days based on duration preference
    const days: ItineraryDay[] = [];
    const attractionsPerDay = Math.ceil(optimizedAttractions.length / preferences.duration);
    
    for (let day = 1; day <= preferences.duration; day++) {
      const startIndex = (day - 1) * attractionsPerDay;
      const dayAttractions = optimizedAttractions.slice(startIndex, startIndex + attractionsPerDay);
      
      if (dayAttractions.length > 0) {
        const dayItinerary = this.createDayItinerary(dayAttractions);
        dayItinerary.day = day;
        days.push(dayItinerary);
      }
    }
    
    // Calculate totals
    const totalDuration = days.reduce((sum, day) => sum + day.totalDuration, 0);
    const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
    const accessibilityScore = days.length > 0 
      ? Math.round(days.reduce((sum, day) => {
          const dayScore = day.attractions.reduce((attrSum, attr) => 
            attrSum + this.calculateAccessibilityScore(attr), 0
          );
          return sum + (dayScore / day.attractions.length);
        }, 0) / days.length)
      : 0;
    
    return {
      id: `itinerary_${Date.now()}_${(randomSeed % 1000000).toString(36)}`,
      title: {
        ru: `${preferences.duration}-дневный тур по Ленинградской области`,
        en: `${preferences.duration}-day tour of Leningrad Oblast`
      },
      description: {
        ru: `Персональный маршрут на ${preferences.duration} дней с учетом ваших предпочтений`,
        en: `Personal ${preferences.duration}-day itinerary based on your preferences`
      },
      days,
      totalDuration,
      totalCost,
      accessibilityScore,
      createdAt: new Date()
    };
  }

  static getRainyDayAlternatives(itinerary: Itinerary): Itinerary {
    const rainyDays = itinerary.days.map(day => ({
      ...day,
      attractions: day.attractions.filter(attraction => 
        attraction.rainyDayAlternative || !attraction.weatherDependent
      )
    }));

    return {
      ...itinerary,
      id: `${itinerary.id}_rainy`,
      title: {
        ru: `${itinerary.title.ru} (дождливая погода)`,
        en: `${itinerary.title.en} (rainy weather)`
      },
      description: {
        ru: `${itinerary.description.ru} - адаптированный для дождливой погоды`,
        en: `${itinerary.description.en} - adapted for rainy weather`
      },
      days: rainyDays,
      totalDuration: rainyDays.reduce((sum, day) => sum + day.totalDuration, 0),
      totalCost: rainyDays.reduce((sum, day) => sum + day.totalCost, 0)
    };
  }

  static estimateBudget(itinerary: Itinerary, additionalExpenses: {
    meals: number;
    transport: number;
    accommodation: number;
  }): { total: number; breakdown: { [key: string]: number } } {
    const attractionCost = itinerary.totalCost;
    const mealsCost = additionalExpenses.meals * itinerary.days.length;
    const transportCost = additionalExpenses.transport * itinerary.days.length;
    const accommodationCost = additionalExpenses.accommodation * (itinerary.days.length - 1);
    
    const total = attractionCost + mealsCost + transportCost + accommodationCost;
    
    return {
      total,
      breakdown: {
        attractions: attractionCost,
        meals: mealsCost,
        transport: transportCost,
        accommodation: accommodationCost
      }
    };
  }
}