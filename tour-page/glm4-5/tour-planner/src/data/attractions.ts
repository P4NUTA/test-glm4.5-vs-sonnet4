import { Attraction } from '../types';

export const attractions: Attraction[] = [
  {
    id: 'peterhof-palace',
    name: {
      ru: 'Петергоф. Большой дворец',
      en: 'Peterhof. Grand Palace'
    },
    description: {
      ru: 'Великолепный дворцово-парковый ансамбль с фонтанами. Имеется лифт и пандусы для маломобильных посетителей.',
      en: 'Magnificent palace and park ensemble with fountains. Equipped with elevator and ramps for visitors with limited mobility.'
    },
    location: {
      city: 'Петергоф',
      coordinates: { lat: 59.8770, lng: 29.8979 }
    },
    category: 'palace',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 180,
    ticketPrice: 700,
    openingHours: {
      'monday': '10:30-18:00',
      'tuesday': '10:30-18:00',
      'wednesday': '10:30-18:00',
      'thursday': '10:30-18:00',
      'friday': '10:30-18:00',
      'saturday': '10:30-18:00',
      'sunday': '10:30-18:00'
    },
    weatherDependent: true,
    rainyDayAlternative: false,
    images: ['/images/peterhof-1.jpg', '/images/peterhof-2.jpg'],
    tags: ['дворец', 'фонтаны', 'история', 'парк']
  },
  {
    id: 'pavlovsk-palace',
    name: {
      ru: 'Павловский дворец',
      en: 'Pavlovsk Palace'
    },
    description: {
      ru: 'Элегантный дворец Павла I с прекрасным парком. Комфортные условия для посетителей старшего возраста.',
      en: 'Elegant palace of Paul I with beautiful park. Comfortable conditions for senior visitors.'
    },
    location: {
      city: 'Павловск',
      coordinates: { lat: 59.6857, lng: 30.4515 }
    },
    category: 'palace',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 150,
    ticketPrice: 600,
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/pavlovsk-1.jpg', '/images/pavlovsk-2.jpg'],
    tags: ['дворец', 'парк', 'история', 'музей']
  },
  {
    id: 'tsarskoye-selo',
    name: {
      ru: 'Царское село. Екатерининский дворец',
      en: 'Tsarskoye Selo. Catherine Palace'
    },
    description: {
      ru: 'Знаменитый Янтарная комната и роскошные интерьеры. Предусмотрены зоны отдыха и удобная навигация.',
      en: 'Famous Amber Room and luxurious interiors. Rest areas and convenient navigation provided.'
    },
    location: {
      city: 'Пушкин',
      coordinates: { lat: 59.7482, lng: 30.4002 }
    },
    category: 'palace',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 120,
    ticketPrice: 800,
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/catherine-1.jpg', '/images/catherine-2.jpg'],
    tags: ['дворец', 'янтарная комната', 'история', 'музей']
  },
  {
    id: 'gatchina-palace',
    name: {
      ru: 'Гатчинский дворец',
      en: 'Gatchina Palace'
    },
    description: {
      ru: 'Уникальный дворец-замок с подземными ходами. Специальные маршруты для маломобильных посетителей.',
      en: 'Unique palace-castle with underground passages. Special routes for visitors with limited mobility.'
    },
    location: {
      city: 'Гатчина',
      coordinates: { lat: 59.5544, lng: 30.1178 }
    },
    category: 'palace',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 140,
    ticketPrice: 500,
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/gatchina-1.jpg', '/images/gatchina-2.jpg'],
    tags: ['дворец', 'замок', 'история', 'музей']
  },
  {
    id: 'oranienbaum',
    name: {
      ru: 'Ораниенбаум. Дворец Петра III',
      en: 'Oranienbaum. Peter III Palace'
    },
    description: {
      ru: 'Единственный дворцово-парковый ансамбль, не пострадавший во время войны. Специальная программа для посетителей 55+.',
      en: 'The only palace and park ensemble that survived the war. Special program for visitors 55+.'
    },
    location: {
      city: 'Ломоносов',
      coordinates: { lat: 59.9067, lng: 29.7636 }
    },
    category: 'palace',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 90,
    ticketPrice: 400,
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/oranienbaum-1.jpg', '/images/oranienbaum-2.jpg'],
    tags: ['дворец', 'история', 'музей', 'парк']
  },
  {
    id: 'russian-museum',
    name: {
      ru: 'Русский музей',
      en: 'Russian Museum'
    },
    description: {
      ru: 'Крупнейшее собрание русского искусства. Имеются кресла для отдыха и аудиогиды с крупным шрифтом.',
      en: 'Largest collection of Russian art. Rest chairs and audio guides with large font available.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9398, lng: 30.3146 }
    },
    category: 'museum',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 180,
    ticketPrice: 600,
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/russian-museum-1.jpg', '/images/russian-museum-2.jpg'],
    tags: ['музей', 'искусство', 'история', 'культура']
  },
  {
    id: 'hermitage',
    name: {
      ru: 'Эрмитаж',
      en: 'Hermitage Museum'
    },
    description: {
      ru: 'Один из крупнейших музеев мира. Специальные маршруты для комфортного посещения.',
      en: 'One of the largest museums in the world. Special routes for comfortable visits.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9398, lng: 30.3146 }
    },
    category: 'museum',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 240,
    ticketPrice: 800,
    openingHours: {
      'monday': '10:30-18:00',
      'tuesday': '10:30-18:00',
      'wednesday': '10:30-18:00',
      'thursday': '10:30-18:00',
      'friday': '10:30-18:00',
      'saturday': '10:30-18:00',
      'sunday': '10:30-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/hermitage-1.jpg', '/images/hermitage-2.jpg'],
    tags: ['музей', 'искусство', 'история', 'культура']
  },
  {
    id: 'lomonosov-museum',
    name: {
      ru: 'Музей М.В. Ломоносова',
      en: 'M.V. Lomonosov Museum'
    },
    description: {
      ru: 'Музей, посвященный великому русскому ученому. Компактная экспозиция, удобная для пожилых посетителей.',
      en: 'Museum dedicated to the great Russian scientist. Compact exhibition, convenient for elderly visitors.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9343, lng: 30.3351 }
    },
    category: 'museum',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: false,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 60,
    ticketPrice: 200,
    openingHours: {
      'monday': '10:00-17:00',
      'tuesday': '10:00-17:00',
      'wednesday': '10:00-17:00',
      'thursday': '10:00-17:00',
      'friday': '10:00-17:00',
      'saturday': '10:00-17:00',
      'sunday': '10:00-17:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/lomonosov-1.jpg', '/images/lomonosov-2.jpg'],
    tags: ['музей', 'история', 'наука', 'образование']
  },
  {
    id: 'summer-garden',
    name: {
      ru: 'Летний сад',
      en: 'Summer Garden'
    },
    description: {
      ru: 'Старейший сад Санкт-Петербурга с ровными дорожками и множеством скамеек для отдыха.',
      en: 'Oldest garden in St. Petersburg with smooth paths and many benches for rest.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9550, lng: 30.3189 }
    },
    category: 'park',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: false,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 90,
    ticketPrice: 0,
    openingHours: {
      'monday': '06:00-22:00',
      'tuesday': '06:00-22:00',
      'wednesday': '06:00-22:00',
      'thursday': '06:00-22:00',
      'friday': '06:00-22:00',
      'saturday': '06:00-22:00',
      'sunday': '06:00-22:00'
    },
    weatherDependent: true,
    rainyDayAlternative: false,
    images: ['/images/summer-garden-1.jpg', '/images/summer-garden-2.jpg'],
    tags: ['парк', 'природа', 'отдых', 'история']
  },
  {
    id: 'pavlovsk-park',
    name: {
      ru: 'Павловский парк',
      en: 'Pavlovsk Park'
    },
    description: {
      ru: 'Один из крупнейших пейзажных парков Европы с удобными дорожками для прогулок.',
      en: 'One of the largest landscape parks in Europe with convenient walking paths.'
    },
    location: {
      city: 'Павловск',
      coordinates: { lat: 59.6857, lng: 30.4515 }
    },
    category: 'park',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: false,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 120,
    ticketPrice: 150,
    openingHours: {
      'monday': '06:00-21:00',
      'tuesday': '06:00-21:00',
      'wednesday': '06:00-21:00',
      'thursday': '06:00-21:00',
      'friday': '06:00-21:00',
      'saturday': '06:00-21:00',
      'sunday': '06:00-21:00'
    },
    weatherDependent: true,
    rainyDayAlternative: false,
    images: ['/images/pavlovsk-park-1.jpg', '/images/pavlovsk-park-2.jpg'],
    tags: ['парк', 'природа', 'прогулки', 'отдых']
  },
  {
    id: 'st-isaac-cathedral',
    name: {
      ru: 'Исаакиевский собор',
      en: 'St. Isaac\'s Cathedral'
    },
    description: {
      ru: 'Крупнейший православный храм Санкт-Петербурга. Имеется лифт на колоннаду.',
      en: 'Largest Orthodox cathedral in St. Petersburg. Elevator to the colonnade available.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9343, lng: 30.3351 }
    },
    category: 'church',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: true,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 90,
    ticketPrice: 400,
    openingHours: {
      'monday': '10:30-18:00',
      'tuesday': '10:30-18:00',
      'wednesday': '10:30-18:00',
      'thursday': '10:30-18:00',
      'friday': '10:30-18:00',
      'saturday': '10:30-18:00',
      'sunday': '10:30-18:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/isaac-1.jpg', '/images/isaac-2.jpg'],
    tags: ['собор', 'архитектура', 'история', 'религия']
  },
  {
    id: 'kazan-cathedral',
    name: {
      ru: 'Казанский собор',
      en: 'Kazan Cathedral'
    },
    description: {
      ru: 'Красивый собор с полукруглой колоннадой. Удобный доступ и места для отдыха.',
      en: 'Beautiful cathedral with semicircular colonnade. Convenient access and rest areas.'
    },
    location: {
      city: 'Санкт-Петербург',
      coordinates: { lat: 59.9343, lng: 30.3351 }
    },
    category: 'church',
    accessibility: {
      wheelchairAccessible: true,
      hasElevator: false,
      minimalStairs: true,
      restingAreas: true,
      accessibleToilets: true
    },
    visitDuration: 60,
    ticketPrice: 0,
    openingHours: {
      'monday': '08:30-20:00',
      'tuesday': '08:30-20:00',
      'wednesday': '08:30-20:00',
      'thursday': '08:30-20:00',
      'friday': '08:30-20:00',
      'saturday': '08:30-20:00',
      'sunday': '08:30-20:00'
    },
    weatherDependent: false,
    rainyDayAlternative: true,
    images: ['/images/kazan-1.jpg', '/images/kazan-2.jpg'],
    tags: ['собор', 'архитектура', 'история', 'религия']
  }
];

export const getAttractionById = (id: string): Attraction | undefined => {
  return attractions.find(attraction => attraction.id === id);
};

export const getAttractionsByCategory = (category: string): Attraction[] => {
  return attractions.filter(attraction => attraction.category === category);
};

export const getAccessibleAttractions = (requireWheelchair: boolean = false): Attraction[] => {
  return attractions.filter(attraction => 
    attraction.accessibility.wheelchairAccessible && 
    (!requireWheelchair || attraction.accessibility.hasElevator)
  );
};