import { Transport } from '../types';

export const transport: Transport[] = [
  {
    id: 'spb-pushkin-bus',
    type: 'bus',
    route: {
      from: 'Санкт-Петербург (м. Московская)',
      to: 'г. Пушкин'
    },
    duration: 45,
    price: {
      adult: 70,
      senior: 35
    },
    accessibility: {
      lowFloor: true,
      wheelchairAccessible: true,
      comfortSeats: false
    },
    frequency: 'каждые 15 минут',
    schedule: {
      weekday: ['06:00-23:00'],
      weekend: ['07:00-22:00']
    }
  },
  {
    id: 'spb-peterhof-hydrofoil',
    type: 'bus',
    route: {
      from: 'Санкт-Петербург (Балтийский вокзал)',
      to: 'г. Петергоф'
    },
    duration: 40,
    price: {
      adult: 65,
      senior: 33
    },
    accessibility: {
      lowFloor: true,
      wheelchairAccessible: true,
      comfortSeats: true
    },
    frequency: 'каждые 20 минут',
    schedule: {
      weekday: ['06:30-22:30'],
      weekend: ['07:00-22:00']
    }
  },
  {
    id: 'spb-vyborg-train',
    type: 'train',
    route: {
      from: 'Санкт-Петербург (Финляндский вокзал)',
      to: 'г. Выборг'
    },
    duration: 140,
    price: {
      adult: 450,
      senior: 225
    },
    accessibility: {
      lowFloor: false,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: '4 раза в день',
    schedule: {
      weekday: ['07:25', '10:45', '15:30', '18:55'],
      weekend: ['08:15', '12:30', '16:45', '19:25']
    }
  },
  {
    id: 'spb-kronstadt-bus',
    type: 'bus',
    route: {
      from: 'Санкт-Петербург (м. Черная речка)',
      to: 'г. Кронштадт'
    },
    duration: 60,
    price: {
      adult: 80,
      senior: 40
    },
    accessibility: {
      lowFloor: true,
      wheelchairAccessible: true,
      comfortSeats: false
    },
    frequency: 'каждые 30 минут',
    schedule: {
      weekday: ['06:00-22:00'],
      weekend: ['07:00-21:00']
    }
  },
  {
    id: 'spb-gatchina-train',
    type: 'train',
    route: {
      from: 'Санкт-Петербург (Балтийский вокзал)',
      to: 'г. Гатчина'
    },
    duration: 55,
    price: {
      adult: 120,
      senior: 60
    },
    accessibility: {
      lowFloor: false,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: 'каждые 30 минут',
    schedule: {
      weekday: ['06:00-23:00'],
      weekend: ['07:00-22:30']
    }
  },
  {
    id: 'spb-repino-train',
    type: 'train',
    route: {
      from: 'Санкт-Петербург (Финляндский вокзал)',
      to: 'пос. Репино'
    },
    duration: 60,
    price: {
      adult: 90,
      senior: 45
    },
    accessibility: {
      lowFloor: false,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: 'каждый час',
    schedule: {
      weekday: ['06:15-22:45'],
      weekend: ['07:30-22:15']
    }
  },
  {
    id: 'spb-komarovo-train',
    type: 'train',
    route: {
      from: 'Санкт-Петербург (Финляндский вокзал)',
      to: 'пос. Комарово'
    },
    duration: 50,
    price: {
      adult: 85,
      senior: 43
    },
    accessibility: {
      lowFloor: false,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: 'каждый час',
    schedule: {
      weekday: ['06:30-23:00'],
      weekend: ['07:45-22:30']
    }
  },
  {
    id: 'spb-tikhvin-bus',
    type: 'bus',
    route: {
      from: 'Санкт-Петербург (автовокзал)',
      to: 'г. Тихвин'
    },
    duration: 180,
    price: {
      adult: 350,
      senior: 175
    },
    accessibility: {
      lowFloor: true,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: '3 раза в день',
    schedule: {
      weekday: ['08:30', '14:15', '17:45'],
      weekend: ['09:00', '15:30']
    }
  },
  {
    id: 'spb-priozersk-train',
    type: 'train',
    route: {
      from: 'Санкт-Петербург (Финляндский вокзал)',
      to: 'г. Приозерск'
    },
    duration: 110,
    price: {
      adult: 200,
      senior: 100
    },
    accessibility: {
      lowFloor: false,
      wheelchairAccessible: false,
      comfortSeats: true
    },
    frequency: '4 раза в день',
    schedule: {
      weekday: ['07:00', '11:30', '16:15', '19:45'],
      weekend: ['08:15', '13:00', '17:30']
    }
  },
  {
    id: 'local-taxi-comfort',
    type: 'taxi',
    route: {
      from: 'Любая точка',
      to: 'По выбору'
    },
    duration: 30,
    price: {
      adult: 800,
      senior: 720
    },
    accessibility: {
      lowFloor: true,
      wheelchairAccessible: true,
      comfortSeats: true
    },
    frequency: 'по запросу',
    schedule: {
      weekday: ['24/7'],
      weekend: ['24/7']
    }
  }
];