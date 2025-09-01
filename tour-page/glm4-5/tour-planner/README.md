# Tour Planner 55+ for Leningrad Oblast

A specialized travel planning application designed for travelers aged 55+ to create comfortable itineraries for Leningrad Oblast, Russia.

## Features

- **Accessibility First**: Optimized for travelers with limited mobility
- **Multi-language Support**: Russian (default) and English interface
- **Smart Itinerary Generation**: 1-3 day tours with minimal transfers
- **Budget Planning**: Cost estimates and breakdown
- **Weather Adaptation**: Rainy-day alternatives
- **Comfort Focused**: Low stairs, resting areas, wheelchair accessibility

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Internationalization**: React i18next
- **Deployment**: Docker & Nginx

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm run preview
```

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. Access at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/          # React components
│   ├── TourPlanner.tsx  # Main app component
│   ├── PreferencesForm.tsx  # User preferences form
│   └── ItineraryDisplay.tsx  # Results display
├── contexts/           # React contexts
│   └── LanguageContext.tsx  # Internationalization
├── data/               # Mock data
│   └── attractions.ts  # Leningrad Oblast attractions
├── services/           # Business logic
│   └── itineraryService.ts  # Tour generation algorithm
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── hooks/              # Custom React hooks
```

## Key Features

### Accessibility Scoring
Each attraction is rated on:
- Wheelchair accessibility
- Elevator availability
- Minimal stairs
- Resting areas
- Accessible toilets

### Smart Routing
- Groups nearby attractions to minimize travel
- Considers mobility limitations
- Optimizes for comfort over speed
- Provides travel time estimates

### Weather Adaptation
- Automatically suggests indoor alternatives for rainy days
- Weather-dependent attraction filtering
- Backup itinerary generation

## Configuration

### Environment Variables
Create a `.env.local` file for development:

```env
VITE_APP_TITLE="Tour Planner 55+"
VITE_DEFAULT_LANGUAGE="ru"
VITE_API_BASE_URL="http://localhost:3000"
```

### Customization
- Add new attractions in `src/data/attractions.ts`
- Modify accessibility criteria in `src/services/itineraryService.ts`
- Update translations in `src/contexts/LanguageContext.tsx`

## API Reference

### ItineraryService
- `generateItinerary(preferences, weather?)`: Creates optimized tour
- `getRainyDayAlternatives(itinerary)`: Weather-adapted version
- `estimateBudget(itinerary, expenses)`: Cost calculation

### Accessibility Features
- All components follow WCAG 2.1 guidelines
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

## Deployment

### Production Build
```bash
npm run build
```

### Docker
```bash
docker build -t tour-planner-55-plus .
docker run -p 3000:80 tour-planner-55-plus
```

### Docker Compose
```bash
docker-compose up -d
```

## Health Checks

The application includes built-in health checks:
- `/health` endpoint for monitoring
- Docker health check configuration
- Automatic recovery on failure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details