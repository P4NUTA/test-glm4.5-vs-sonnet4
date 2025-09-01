# Tour Planner 55+ for Leningrad Oblast

A comprehensive tour planning application specifically designed for travelers aged 55 and above, focusing on comfort, accessibility, and convenience in Leningrad Oblast.

## 🎯 Features

### Core Functionality
- **Personalized Itineraries**: 1-3 day tour plans based on user preferences
- **Accessibility Focus**: Wheelchair accessibility, rest areas, minimal stairs options
- **Budget Planning**: Detailed cost breakdowns with senior discounts
- **Weather Alternatives**: Indoor activity suggestions for rainy days
- **Multilingual**: Russian (default) and English language support

### Accessibility Features
- Large fonts and high contrast design
- Simple navigation optimized for older users
- Wheelchair accessibility indicators
- Rest area availability information
- Public transport accessibility details
- Comfort ratings for all destinations

### Technical Features
- React 18 with TypeScript for type safety
- Responsive design with Tailwind CSS
- Local mock data (no external APIs required)
- Deterministic tour generation with seeded randomization
- Comprehensive error handling and validation
- Docker containerization for production deployment

## 🏗️ Architecture

```
src/
├── components/          # React components
├── contexts/           # React contexts (Language)
├── data/              # Mock data (destinations, accommodations, transport)
├── types/             # TypeScript type definitions
├── utils/             # Utilities (tour generator, validation)
└── index.css          # Tailwind CSS styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment
```bash
# Build Docker image
docker-compose build

# Run in production
docker-compose up -d

# Check health
curl http://localhost:3000/health
```

## 🗺️ Destinations

The application includes 15+ carefully selected destinations in Leningrad Oblast:

**Historical Sites:**
- Catherine Palace (Pushkin)
- Peterhof Grand Palace
- Gatchina Palace
- Vyborg Castle
- Oranienbaum

**Cultural Sites:**
- Repin Museum-Estate "Penates"
- Volkhov Regional Museum
- Priozersk Museum-Fortress

**Religious Sites:**
- Naval Cathedral in Kronstadt
- Tikhvin Monastery

**Natural Areas:**
- Komarovo Beach
- Sestroretsk Dunes

**Modern Facilities:**
- Gallery Shopping Center (Sosnovy Bor)

Each destination includes:
- Accessibility ratings
- Senior-friendly pricing
- Opening hours
- Transport information
- Comfort amenities

## 🏨 Accommodations

8 accommodation options ranging from budget guesthouses to wellness hotels:
- Wheelchair accessibility information
- Senior discounts
- Medical support availability
- Elevator access
- Ground floor room options

## 🚌 Transportation

Transportation options with accessibility focus:
- Low-floor buses
- Wheelchair accessible vehicles
- Senior pricing
- Comfort seating information
- Schedule and frequency data

## 💰 Budget Planning

Comprehensive budget breakdown:
- Accommodation costs
- Transportation fees
- Entrance tickets (with senior discounts)
- Meal estimates
- Miscellaneous expenses
- Visual budget distribution charts
- Money-saving tips for seniors

## 🌦️ Weather Adaptability

- Indoor alternative suggestions for outdoor activities
- Weather-dependent activity flagging
- Seasonal activity recommendations
- Flexible itinerary adjustments

## 🔒 Security & Validation

- Input sanitization and validation
- Rate limiting for form submissions
- XSS protection
- Content Security Policy headers
- Error boundary implementation
- Comprehensive error handling

## 🎨 Design Principles

**Senior-Friendly UI:**
- 18px base font size with larger senior-specific sizes
- High contrast color scheme
- Large clickable areas
- Clear visual hierarchy
- Minimal cognitive load

**Accessibility:**
- WCAG 2.1 AA compliant
- Screen reader friendly
- Keyboard navigation support
- Focus indicators
- Error messaging

## 🌍 Internationalization

- Russian (default) and English languages
- Complete translation coverage
- LocalStorage language persistence
- Dynamic language switching
- Proper number formatting for each locale

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Touch-friendly interface
- Responsive grid layouts
- Optimized for both phones and tablets

## 🚀 Production Deployment

The application is containerized with:
- Multi-stage Docker build for optimization
- Nginx for static file serving
- Security headers configuration
- Health check endpoints
- Production-ready configuration
- Gzip compression
- Asset caching strategies

### Health Monitoring
```bash
# Health check endpoint
GET /health

# Docker health check
docker-compose ps
```

## 🧪 Development

### Code Quality
- TypeScript for type safety
- Linting with ESLint
- Consistent code formatting
- Error boundary implementation
- Comprehensive error handling

### Testing Strategy
- Build verification
- Development server testing
- Production build validation
- Docker container testing
- Health check validation

## 📄 License

This project is designed as a demonstration application for senior-friendly tourism planning.

## 🤝 Contributing

This is a demo project focused on accessibility and senior-friendly design patterns for tourism applications.

---

**Built with ❤️ for comfortable travels by seniors in Leningrad Oblast**