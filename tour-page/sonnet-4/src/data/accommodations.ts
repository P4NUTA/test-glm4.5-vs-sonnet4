import { Accommodation } from '../types';

export const accommodations: Accommodation[] = [
  {
    id: 'pushkin-hotel-comfort',
    name: {
      ru: 'Отель "Комфорт" в Пушкине',
      en: 'Hotel "Comfort" in Pushkin'
    },
    type: 'hotel',
    location: {
      lat: 59.7200,
      lng: 30.4000,
      address: {
        ru: 'г. Пушкин, ул. Московская, д. 15',
        en: 'Pushkin, Moskovskaya St., 15'
      }
    },
    accessibility: {
      elevator: true,
      wheelchairAccessible: true,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: false
    },
    pricePerNight: {
      standard: 3500,
      senior: 2800
    },
    amenities: [
      'Завтрак включен',
      'Wi-Fi',
      'Парковка',
      'Ресторан',
      'Круглосуточная стойка регистрации'
    ],
    rating: 4.2
  },
  {
    id: 'peterhof-guesthouse',
    name: {
      ru: 'Гостевой дом "Петергоф"',
      en: 'Guesthouse "Peterhof"'
    },
    type: 'guesthouse',
    location: {
      lat: 59.8800,
      lng: 29.9100,
      address: {
        ru: 'г. Петергоф, ул. Санкт-Петербургская, д. 45',
        en: 'Peterhof, Sankt-Peterburgskaya St., 45'
      }
    },
    accessibility: {
      elevator: false,
      wheelchairAccessible: false,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: false
    },
    pricePerNight: {
      standard: 2500,
      senior: 2000
    },
    amenities: [
      'Завтрак',
      'Wi-Fi',
      'Кухня общего пользования',
      'Сад',
      'Прачечная'
    ],
    rating: 3.8
  },
  {
    id: 'vyborg-sanatorium',
    name: {
      ru: 'Санаторий "Балтика"',
      en: 'Sanatorium "Baltika"'
    },
    type: 'sanatorium',
    location: {
      lat: 60.7000,
      lng: 28.7500,
      address: {
        ru: 'г. Выборг, ул. Железнодорожная, д. 5',
        en: 'Vyborg, Zheleznodorozhnaya St., 5'
      }
    },
    accessibility: {
      elevator: true,
      wheelchairAccessible: true,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: true
    },
    pricePerNight: {
      standard: 4500,
      senior: 3600
    },
    amenities: [
      'Полный пансион',
      'Медицинские процедуры',
      'Лечебные ванны',
      'Массаж',
      'Библиотека',
      'Бассейн'
    ],
    rating: 4.5
  },
  {
    id: 'lomonosov-pension',
    name: {
      ru: 'Пансионат "Ломоносов"',
      en: 'Pension "Lomonosov"'
    },
    type: 'pension',
    location: {
      lat: 59.9100,
      lng: 29.7600,
      address: {
        ru: 'г. Ломоносов, ул. Дворцовая, д. 12',
        en: 'Lomonosov, Dvortsovaya St., 12'
      }
    },
    accessibility: {
      elevator: false,
      wheelchairAccessible: false,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: false
    },
    pricePerNight: {
      standard: 3000,
      senior: 2400
    },
    amenities: [
      'Трехразовое питание',
      'Wi-Fi',
      'Парк',
      'Библиотека',
      'Настольные игры'
    ],
    rating: 4.0
  },
  {
    id: 'kronstadt-hotel',
    name: {
      ru: 'Отель "Адмирал" в Кронштадте',
      en: 'Hotel "Admiral" in Kronstadt'
    },
    type: 'hotel',
    location: {
      lat: 60.0100,
      lng: 29.7700,
      address: {
        ru: 'г. Кронштадт, пр. Ленина, д. 20',
        en: 'Kronstadt, Lenin Ave., 20'
      }
    },
    accessibility: {
      elevator: true,
      wheelchairAccessible: true,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: false
    },
    pricePerNight: {
      standard: 3200,
      senior: 2560
    },
    amenities: [
      'Завтрак включен',
      'Wi-Fi',
      'Ресторан',
      'Конференц-зал',
      'Круглосуточная стойка регистрации'
    ],
    rating: 3.9
  },
  {
    id: 'repino-wellness',
    name: {
      ru: 'Велнес-отель "Репино"',
      en: 'Wellness Hotel "Repino"'
    },
    type: 'hotel',
    location: {
      lat: 60.0800,
      lng: 29.8500,
      address: {
        ru: 'пос. Репино, Приморское ш., д. 394',
        en: 'Repino village, Primorskoye highway, 394'
      }
    },
    accessibility: {
      elevator: true,
      wheelchairAccessible: true,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: true
    },
    pricePerNight: {
      standard: 5000,
      senior: 4000
    },
    amenities: [
      'Полный пансион',
      'СПА-центр',
      'Бассейн',
      'Фитнес-зал',
      'Массаж',
      'Сауна',
      'Частный пляж'
    ],
    rating: 4.7
  },
  {
    id: 'tikhvin-guesthouse',
    name: {
      ru: 'Гостевой дом "Тихвин"',
      en: 'Guesthouse "Tikhvin"'
    },
    type: 'guesthouse',
    location: {
      lat: 59.6400,
      lng: 33.5200,
      address: {
        ru: 'г. Тихвин, ул. Советская, д. 18',
        en: 'Tikhvin, Sovetskaya St., 18'
      }
    },
    accessibility: {
      elevator: false,
      wheelchairAccessible: false,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: false
    },
    pricePerNight: {
      standard: 2000,
      senior: 1600
    },
    amenities: [
      'Завтрак',
      'Wi-Fi',
      'Кухня общего пользования',
      'Парковка',
      'Сад'
    ],
    rating: 3.5
  },
  {
    id: 'komarovo-sanatorium',
    name: {
      ru: 'Санаторий "Комарово"',
      en: 'Sanatorium "Komarovo"'
    },
    type: 'sanatorium',
    location: {
      lat: 60.0500,
      lng: 29.7800,
      address: {
        ru: 'пос. Комарово, ул. Курортная, д. 22',
        en: 'Komarovo village, Kurortnaya St., 22'
      }
    },
    accessibility: {
      elevator: true,
      wheelchairAccessible: true,
      seniorFriendly: true,
      lowFloorRooms: true,
      medicalSupport: true
    },
    pricePerNight: {
      standard: 4200,
      senior: 3360
    },
    amenities: [
      'Полный пансион',
      'Лечебные процедуры',
      'Ингаляции',
      'Бассейн',
      'Библиотека',
      'Парк для прогулок'
    ],
    rating: 4.3
  }
];