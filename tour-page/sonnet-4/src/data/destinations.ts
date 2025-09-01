import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'pushkin-palace',
    name: {
      ru: 'Екатерининский дворец',
      en: 'Catherine Palace'
    },
    description: {
      ru: 'Роскошный дворец XVIII века с знаменитой Янтарной комнатой. Доступны экскурсии с русскоязычными гидами.',
      en: 'Luxurious 18th-century palace with the famous Amber Room. Russian-speaking guided tours available.'
    },
    location: {
      lat: 59.7160,
      lng: 30.3957,
      address: {
        ru: 'г. Пушкин, ул. Садовая, д. 7',
        en: 'Pushkin, Sadovaya St., 7'
      }
    },
    accessibility: {
      stairsLevel: 'medium',
      walkingDistance: 'medium',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'historical',
    duration: 3,
    entranceFee: {
      adult: 700,
      senior: 350,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'peterhof-palace',
    name: {
      ru: 'Большой дворец Петергофа',
      en: 'Grand Palace of Peterhof'
    },
    description: {
      ru: 'Величественная резиденция Петра I с красивыми фонтанами. Лифты и пандусы для удобства посетителей.',
      en: 'Magnificent residence of Peter I with beautiful fountains. Elevators and ramps for visitor convenience.'
    },
    location: {
      lat: 59.8846,
      lng: 29.9087,
      address: {
        ru: 'г. Петергоф, ул. Разводная, д. 2',
        en: 'Peterhof, Razvodnaya St., 2'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 5,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'historical',
    duration: 4,
    entranceFee: {
      adult: 800,
      senior: 400,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:30-18:00',
      'wednesday': '10:30-18:00',
      'thursday': '10:30-18:00',
      'friday': '10:30-18:00',
      'saturday': '10:30-18:00',
      'sunday': '10:30-18:00'
    },
    season: 'spring',
    indoorActivity: false,
    weatherDependent: true
  },
  {
    id: 'gatchina-palace',
    name: {
      ru: 'Гатчинский дворец',
      en: 'Gatchina Palace'
    },
    description: {
      ru: 'Уникальный дворец-замок с подземными ходами. Меньше туристов, спокойная атмосфера.',
      en: 'Unique castle-palace with underground passages. Fewer tourists, peaceful atmosphere.'
    },
    location: {
      lat: 59.5764,
      lng: 30.1089,
      address: {
        ru: 'г. Гатчина, Красноармейский пр., д. 1',
        en: 'Gatchina, Krasnoarmeysky Ave., 1'
      }
    },
    accessibility: {
      stairsLevel: 'high',
      walkingDistance: 'long',
      comfortRating: 2,
      wheelchairAccessible: false,
      restAreas: false,
      publicTransport: true
    },
    category: 'historical',
    duration: 2.5,
    entranceFee: {
      adult: 400,
      senior: 200,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'vyborg-castle',
    name: {
      ru: 'Выборгский замок',
      en: 'Vyborg Castle'
    },
    description: {
      ru: 'Средневековый замок XIII века. Подъем на башню затруднен, но есть музей на первом этаже.',
      en: 'Medieval 13th-century castle. Tower climb is difficult, but there is a museum on the first floor.'
    },
    location: {
      lat: 60.7208,
      lng: 28.7358,
      address: {
        ru: 'г. Выборг, Замковый остров, д. 1',
        en: 'Vyborg, Castle Island, 1'
      }
    },
    accessibility: {
      stairsLevel: 'high',
      walkingDistance: 'medium',
      comfortRating: 2,
      wheelchairAccessible: false,
      restAreas: true,
      publicTransport: false
    },
    category: 'historical',
    duration: 2,
    entranceFee: {
      adult: 300,
      senior: 150,
      free: false
    },
    openingHours: {
      'monday': '10:00-17:00',
      'tuesday': '10:00-17:00',
      'wednesday': '10:00-17:00',
      'thursday': '10:00-17:00',
      'friday': '10:00-17:00',
      'saturday': '10:00-17:00',
      'sunday': '10:00-17:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'komarovo-beach',
    name: {
      ru: 'Пляж в Комарово',
      en: 'Komarovo Beach'
    },
    description: {
      ru: 'Тихий песчаный пляж на Финском заливе. Деревянные дорожки для удобного прохода.',
      en: 'Quiet sandy beach on the Gulf of Finland. Wooden walkways for easy access.'
    },
    location: {
      lat: 60.0531,
      lng: 29.7803,
      address: {
        ru: 'пос. Комарово, ул. Озерная',
        en: 'Komarovo village, Ozernaya St.'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'nature',
    duration: 2,
    entranceFee: {
      adult: 0,
      senior: 0,
      free: true
    },
    openingHours: {
      'monday': 'Always open',
      'tuesday': 'Always open',
      'wednesday': 'Always open',
      'thursday': 'Always open',
      'friday': 'Always open',
      'saturday': 'Always open',
      'sunday': 'Always open'
    },
    season: 'summer',
    indoorActivity: false,
    weatherDependent: true
  },
  {
    id: 'oranienbaum',
    name: {
      ru: 'Ораниенбаум',
      en: 'Oranienbaum'
    },
    description: {
      ru: 'Дворцово-парковый ансамбль XVIII века. Менее посещаемый, чем Петергоф, но не менее красивый.',
      en: '18th-century palace and park ensemble. Less visited than Peterhof, but equally beautiful.'
    },
    location: {
      lat: 59.9117,
      lng: 29.7647,
      address: {
        ru: 'г. Ломоносов, ул. Дворцовый пр., д. 48',
        en: 'Lomonosov, Dvortsovy Ave., 48'
      }
    },
    accessibility: {
      stairsLevel: 'medium',
      walkingDistance: 'medium',
      comfortRating: 3,
      wheelchairAccessible: false,
      restAreas: true,
      publicTransport: true
    },
    category: 'historical',
    duration: 3,
    entranceFee: {
      adult: 500,
      senior: 250,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:30-18:00',
      'wednesday': '10:30-18:00',
      'thursday': '10:30-18:00',
      'friday': '10:30-18:00',
      'saturday': '10:30-18:00',
      'sunday': '10:30-18:00'
    },
    season: 'all',
    indoorActivity: false,
    weatherDependent: true
  },
  {
    id: 'kronstadt-cathedral',
    name: {
      ru: 'Морской собор в Кронштадте',
      en: 'Naval Cathedral in Kronstadt'
    },
    description: {
      ru: 'Величественный морской собор начала XX века. Легкий доступ, есть скамейки для отдыха.',
      en: 'Magnificent naval cathedral from the early 20th century. Easy access, benches for rest.'
    },
    location: {
      lat: 60.0059,
      lng: 29.7686,
      address: {
        ru: 'г. Кронштадт, Якорная пл., д. 5',
        en: 'Kronstadt, Yakornaya Sq., 5'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'religious',
    duration: 1,
    entranceFee: {
      adult: 0,
      senior: 0,
      free: true
    },
    openingHours: {
      'monday': '10:00-18:00',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '07:00-20:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'repino-penates',
    name: {
      ru: 'Музей-усадьба И.Е. Репина «Пенаты»',
      en: 'Repin Museum-Estate "Penates"'
    },
    description: {
      ru: 'Дом-музей знаменитого художника. Небольшой, уютный музей с садом.',
      en: 'House-museum of the famous artist. Small, cozy museum with a garden.'
    },
    location: {
      lat: 60.0781,
      lng: 29.8472,
      address: {
        ru: 'пос. Репино, Приморское ш., д. 411',
        en: 'Repino village, Primorskoye highway, 411'
      }
    },
    accessibility: {
      stairsLevel: 'medium',
      walkingDistance: 'short',
      comfortRating: 3,
      wheelchairAccessible: false,
      restAreas: true,
      publicTransport: true
    },
    category: 'cultural',
    duration: 1.5,
    entranceFee: {
      adult: 300,
      senior: 150,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': 'Closed',
      'wednesday': '10:30-17:00',
      'thursday': '10:30-17:00',
      'friday': '10:30-17:00',
      'saturday': '10:30-17:00',
      'sunday': '10:30-17:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'fort-konstantinovskiy',
    name: {
      ru: 'Форт Константиновский',
      en: 'Fort Konstantinovsky'
    },
    description: {
      ru: 'Исторический форт на острове Котлин. Музей с интерактивными экспозициями.',
      en: 'Historic fort on Kotlin Island. Museum with interactive exhibitions.'
    },
    location: {
      lat: 59.9964,
      lng: 29.7439,
      address: {
        ru: 'г. Кронштадт, ул. Зосимова, д. 32',
        en: 'Kronstadt, Zosimova St., 32'
      }
    },
    accessibility: {
      stairsLevel: 'medium',
      walkingDistance: 'medium',
      comfortRating: 3,
      wheelchairAccessible: false,
      restAreas: true,
      publicTransport: true
    },
    category: 'historical',
    duration: 2,
    entranceFee: {
      adult: 400,
      senior: 200,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'tikhvin-monastery',
    name: {
      ru: 'Тихвинский монастырь',
      en: 'Tikhvin Monastery'
    },
    description: {
      ru: 'Древний монастырь XVI века. Тихое место для размышлений, ровные дорожки.',
      en: '16th-century ancient monastery. Quiet place for reflection, even pathways.'
    },
    location: {
      lat: 59.6433,
      lng: 33.5242,
      address: {
        ru: 'г. Тихвин, ул. Тихвинская, д. 1',
        en: 'Tikhvin, Tikhvinskaya St., 1'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: false
    },
    category: 'religious',
    duration: 1.5,
    entranceFee: {
      adult: 0,
      senior: 0,
      free: true
    },
    openingHours: {
      'monday': '08:00-19:00',
      'tuesday': '08:00-19:00',
      'wednesday': '08:00-19:00',
      'thursday': '08:00-19:00',
      'friday': '08:00-19:00',
      'saturday': '08:00-19:00',
      'sunday': '08:00-19:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'volkhov-museum',
    name: {
      ru: 'Волховский краеведческий музей',
      en: 'Volkhov Regional Museum'
    },
    description: {
      ru: 'Музей истории города и района. Небольшой музей с удобным расположением.',
      en: 'Museum of city and region history. Small museum with convenient location.'
    },
    location: {
      lat: 59.9258,
      lng: 32.3386,
      address: {
        ru: 'г. Волхов, Волховский пр., д. 27',
        en: 'Volkhov, Volkhovskiy Ave., 27'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'cultural',
    duration: 1,
    entranceFee: {
      adult: 100,
      senior: 50,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '09:00-17:00',
      'wednesday': '09:00-17:00',
      'thursday': '09:00-17:00',
      'friday': '09:00-17:00',
      'saturday': '09:00-16:00',
      'sunday': 'Closed'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'kingisepp-fortress',
    name: {
      ru: 'Крепость Ям в Кингисеппе',
      en: 'Yam Fortress in Kingisepp'
    },
    description: {
      ru: 'Средневековая крепость XIV века. Частично восстановленная, есть музей.',
      en: '14th-century medieval fortress. Partially restored, has a museum.'
    },
    location: {
      lat: 59.3731,
      lng: 28.6147,
      address: {
        ru: 'г. Кингисепп, ул. Крепостная',
        en: 'Kingisepp, Krepostnaya St.'
      }
    },
    accessibility: {
      stairsLevel: 'high',
      walkingDistance: 'medium',
      comfortRating: 2,
      wheelchairAccessible: false,
      restAreas: false,
      publicTransport: true
    },
    category: 'historical',
    duration: 1.5,
    entranceFee: {
      adult: 200,
      senior: 100,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:00-18:00',
      'wednesday': '10:00-18:00',
      'thursday': '10:00-18:00',
      'friday': '10:00-18:00',
      'saturday': '10:00-18:00',
      'sunday': '10:00-18:00'
    },
    season: 'all',
    indoorActivity: false,
    weatherDependent: true
  },
  {
    id: 'sestroretsk-dunes',
    name: {
      ru: 'Дюны в Сестрорецке',
      en: 'Dunes in Sestroretsk'
    },
    description: {
      ru: 'Природный заповедник с дюнами и редкими растениями. Деревянные мостки.',
      en: 'Nature reserve with dunes and rare plants. Wooden boardwalks.'
    },
    location: {
      lat: 60.1089,
      lng: 29.9644,
      address: {
        ru: 'г. Сестрорецк, ул. Приморская',
        en: 'Sestroretsk, Primorskaya St.'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 4,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'nature',
    duration: 2,
    entranceFee: {
      adult: 0,
      senior: 0,
      free: true
    },
    openingHours: {
      'monday': 'Always open',
      'tuesday': 'Always open',
      'wednesday': 'Always open',
      'thursday': 'Always open',
      'friday': 'Always open',
      'saturday': 'Always open',
      'sunday': 'Always open'
    },
    season: 'all',
    indoorActivity: false,
    weatherDependent: true
  },
  {
    id: 'priozersk-museum',
    name: {
      ru: 'Приозерский музей-крепость',
      en: 'Priozersk Museum-Fortress'
    },
    description: {
      ru: 'Музей в старинной крепости Корела. Интересная история карело-финского региона.',
      en: 'Museum in the ancient Korela fortress. Interesting history of the Karelian-Finnish region.'
    },
    location: {
      lat: 61.0403,
      lng: 30.1203,
      address: {
        ru: 'г. Приозерск, ул. Ленинградская, д. 3',
        en: 'Priozersk, Leningradskaya St., 3'
      }
    },
    accessibility: {
      stairsLevel: 'medium',
      walkingDistance: 'short',
      comfortRating: 3,
      wheelchairAccessible: false,
      restAreas: true,
      publicTransport: true
    },
    category: 'historical',
    duration: 1.5,
    entranceFee: {
      adult: 250,
      senior: 125,
      free: false
    },
    openingHours: {
      'monday': 'Closed',
      'tuesday': '10:00-17:00',
      'wednesday': '10:00-17:00',
      'thursday': '10:00-17:00',
      'friday': '10:00-17:00',
      'saturday': '10:00-17:00',
      'sunday': '10:00-17:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  },
  {
    id: 'sosnovy-bor-mall',
    name: {
      ru: 'ТЦ "Галерея" в Сосновом Бору',
      en: 'Gallery Shopping Center in Sosnovy Bor'
    },
    description: {
      ru: 'Современный торговый центр с кафе и магазинами. Удобно для дождливой погоды.',
      en: 'Modern shopping center with cafes and shops. Convenient for rainy weather.'
    },
    location: {
      lat: 59.9044,
      lng: 29.0822,
      address: {
        ru: 'г. Сосновый Бор, ул. Молодёжная, д. 10',
        en: 'Sosnovy Bor, Molodyozhnaya St., 10'
      }
    },
    accessibility: {
      stairsLevel: 'low',
      walkingDistance: 'short',
      comfortRating: 5,
      wheelchairAccessible: true,
      restAreas: true,
      publicTransport: true
    },
    category: 'shopping',
    duration: 2,
    entranceFee: {
      adult: 0,
      senior: 0,
      free: true
    },
    openingHours: {
      'monday': '10:00-22:00',
      'tuesday': '10:00-22:00',
      'wednesday': '10:00-22:00',
      'thursday': '10:00-22:00',
      'friday': '10:00-22:00',
      'saturday': '10:00-22:00',
      'sunday': '10:00-22:00'
    },
    season: 'all',
    indoorActivity: true,
    weatherDependent: false
  }
];