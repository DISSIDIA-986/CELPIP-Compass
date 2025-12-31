# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CELPIP Compass is a spaced repetition learning system for CELPIP (Canadian English Language Proficiency Index Program) test preparation. It implements the SM2 (SuperMemo 2) algorithm to optimize learning intervals. The project is a Next.js 16 application with TypeScript, using Prisma as the ORM and PostgreSQL as the database.

**Status**: Production-ready with development optimizations
**Architecture**: Full-stack Next.js with App Router, using TypeScript strict mode

## Technology Stack

### Frontend
- **Framework**: Next.js 16.1.1 (App Router) + React 19.2.3
- **Styling**: Tailwind CSS 4 with PostCSS
- **State Management**: React hooks (Zustand available but not heavily used)
- **Type Safety**: TypeScript 5 with strict mode
- **Validation**: Zod 4.2.1 for API validation

### Backend
- **API Layer**: Next.js API routes (RESTful design)
- **Database ORM**: Prisma 7.2.0 (configured but using mock for development)
- **Database**: PostgreSQL 15 (via Docker)
- **Authentication**: JWT tokens (15min access + 7day refresh)
- **Password Hashing**: bcryptjs

### Development Tools
- **Testing**: Jest 30.2.0 (unit), Playwright 1.57.0 (E2E)
- **Linting**: ESLint 9 with Next.js configuration
- **Build**: Next.js with Turbopack (dev) and Webpack (production)
- **Bundle Analysis**: @next/bundle-analyzer

## Development Commands

### Development
```bash
npm run dev              # Start development server (http://localhost:3000)
npm run dev -- --port 3001  # Start on specific port if 3000 is occupied
```

### Building
```bash
npm run build            # Production build (webpack)
npm run start            # Start production server
npm run analyze          # Analyze bundle with Bundle Analyzer
```

### Code Quality
```bash
npm run lint             # Run ESLint
npx tsc --noEmit         # Type check without building
npm run lint -- --fix    # Auto-fix ESLint issues
```

### Testing
```bash
npm test                 # Run Jest unit tests
npm run test:watch       # Jest in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e -- --headed  # Run E2E tests with visible browser
```

### Database (for when implemented)
```bash
docker-compose up -d    # Start PostgreSQL container
npx prisma migrate deploy  # Run migrations
npx prisma db seed      # Seed database
```

## Architecture Overview

### Directory Structure
```
celpip-compass/
├── app/                     # Next.js App Router (primary code)
│   ├── api/v1/             # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cards/         # Flashcard management
│   │   └── data/          # Sample data endpoints
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── middleware/        # Next.js middleware
│   ├── services/          # Business logic
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── components/            # Additional components (some duplication)
├── tests/                 # Test suites (unit + e2e)
└── prisma/                # Database schema and migrations
```

### Key Architectural Patterns

#### API Design
- **RESTful API** under `/api/v1/` with standardized `ApiResponse<T>` wrapper
- **Modular route structure** with separate directories for each domain
- **JWT-based authentication** with HttpOnly refresh token cookies
- **Zod validation** for all API inputs
- **Error handling** with proper HTTP status codes and error responses

#### Security Architecture
- **Security headers** configured in `middleware.ts` (CSP, XSS, HSTS)
- **Rate limiting** (100 requests/15min for auth endpoints)
- **CORS configuration** for cross-origin requests
- **Input validation** and sanitization on all endpoints

#### Data Layer
- **Prisma ORM** with PostgreSQL schema
- **Mock implementation** currently in use for development (`lib/database.ts`)
- **SM-2 Algorithm** implementation in `services/spaced-repetition-service.ts`
- **Repository pattern** for data access abstraction

#### Frontend Architecture
- **Client-side rendering** with Next.js App Router
- **Lazy loading** for heavy components (`StudyDashboard`, `StudyProgress`, `SampleCardsGrid`)
- **Component composition** with proper TypeScript interfaces
- **Custom hooks** for state management (e.g., `useAuth`)

### Component Architecture

#### Core Components
- **StudyDashboard**: Main learning interface with session management
- **StudyProgress**: Analytics and statistics display
- **SampleCard**: Individual flashcard display component
- **SampleCardsGrid**: Browse and filter flashcards interface

#### Component Patterns
- All components use TypeScript interfaces for props
- Lazy loading with `React.lazy()` and `Suspense`
- Memoization with `React.memo()` for performance-critical components
- Responsive design with Tailwind CSS breakpoints

### Service Layer

#### Business Logic Services
- **SpacedRepetitionService**: SM-2 algorithm implementation
  - Calculates optimal review intervals
  - Manages card status transitions
  - Tracks learning statistics
- **DataService**: Data access layer abstraction
  - Provides CRUD operations for flashcards
  - Handles sample data generation
  - Manages user preferences

### State Management
- **Local component state** for UI interactions
- **Custom hooks** for complex state (e.g., `useAuth`)
- **Zustand** available for global state (not heavily used currently)

## Database Schema

### Core Models (Prisma Schema)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  preferences UserPreferences?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Card {
  id          String           @id @default(cuid())
  type        CardType
  question    String
  answer      String
  explanation String?
  tags        String[]
  difficulty  DifficultyLevel
  status      CardStatus       @default(NEW)
  reviewCount Int              @default(0)
  correctCount Int             @default(0)
  nextReviewDate DateTime?
  metadata    Json?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model Review {
  id           String   @id @default(cuid())
  cardId       String
  quality      Int      // 0-5 rating
  interval     Int      // Days until next review
  repetitions  Int
  easeFactor   Float    // SM2 ease factor
  reviewAt     DateTime @default(now())
}
```

### Key Enums
```typescript
enum CardType { WRITING, SPEAKING, LISTENING, READING, GRAMMAR, VOCABULARY }
enum DifficultyLevel { BEGINNER, INTERMEDIATE, ADVANCED }
enum CardStatus { NEW, LEARNING, REVIEW, MASTERED }
enum Role { USER, ADMIN }
```

## SM2 Algorithm Implementation

### Core Concepts
- **Quality Score (0-5)**: User's self-assessment of recall quality
- **Ease Factor**: How easy the card is (1.3-2.5+ range)
- **Interval**: Days until next review (1d → 6d × 2.5 progression)
- **Repetitions**: Number of successful reviews

### Quality Score Guidelines
- **5 (Perfect)**: Complete recall, no effort
- **4 (Good)**: Correct with minor hesitation
- **3 (Fair)**: Correct but difficult to recall
- **2 (Poor)**: Incorrect but familiar
- **1 (Bad)**: Complete blackout

### Algorithm Logic
```typescript
// Simplified SM-2 calculation
if (quality >= 3) {
  // Correct response
  if (repetitions === 0) newInterval = 1;
  else if (repetitions === 1) newInterval = 6;
  else newInterval = Math.round(interval * ease);

  newRepetitions = repetitions + 1;
} else {
  // Incorrect response
  newRepetitions = 0;
  newInterval = 1;
}
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Cards
- `GET /api/v1/cards` - List cards with filtering
- `POST /api/v1/cards` - Create new card
- `GET /api/v1/cards/[id]` - Get single card
- `PUT /api/v1/cards/[id]` - Update card
- `DELETE /api/v1/cards/[id]` - Soft delete card
- `POST /api/v1/cards/review` - Submit card review
- `GET /api/v1/cards/schedule` - Get study schedule

### Data
- `GET /api/v1/data/sample-cards` - Get sample flashcard data

## Configuration Files

### Core Configurations
- **next.config.js**: Next.js configuration with React Compiler, security headers, bundle analyzer
- **tsconfig.json**: TypeScript configuration with strict mode and path aliases
- **jest.config.ts**: Jest testing configuration
- **playwright.config.ts**: E2E testing configuration
- **prisma/schema.prisma**: Database schema

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
ACCESS_TOKEN_EXPIRES_IN=900  # 15 minutes
REFRESH_TOKEN_EXPIRES_IN=604800  # 7 days

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## Development Workflow

### Setup
1. Install dependencies: `npm install`
2. Start PostgreSQL: `docker-compose up -d`
3. Run migrations: `npx prisma migrate deploy`
4. Seed database: `npx prisma db seed`
5. Start dev server: `npm run dev`

### Testing Strategy
- **Unit Tests**: Jest with jsdom for components and utilities
- **E2E Tests**: Playwright for full user flows
- **CI/CD**: GitHub Actions automated testing on push/PR

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting (if configured)

## Important Notes

### Build System
- **Development**: Uses Turbopack (fast refresh)
- **Production**: Uses Webpack (optimization)
- **Bundle Analysis**: Available via `npm run analyze`

### Security Considerations
- JWT tokens have short expiry (15min access, 7day refresh)
- Refresh tokens stored in HttpOnly cookies
- Rate limiting on authentication endpoints
- Input validation on all API endpoints

### Performance Optimizations
- Lazy loading of heavy components
- Image optimization (WebP/AVIF)
- Code splitting and bundle optimization
- React Compiler for development performance

### Current Implementation Status
- **Authentication**: Complete with JWT
- **Database**: Schema defined, using mock implementation
- **API Routes**: Complete for auth and cards
- **Frontend**: Core components implemented
- **Testing**: Jest and Playwright configured
- **Security**: Middleware and headers configured

### Common Issues
- **TypeScript compilation errors**: Check path aliases and imports
- **Build caching**: Clear `.next` directory if issues persist
- **Port conflicts**: Use different port if 3000 is occupied
- **Database connection**: Ensure Docker container is running

## Key Dependencies

### Runtime Dependencies
- `next`: React framework
- `react`/`react-dom`: UI library
- `jsonwebtoken`: JWT token handling
- `bcryptjs`: Password hashing
- `zod`: Schema validation
- `date-fns`: Date utilities

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `eslint`: Code linting
- `jest`: Unit testing
- `playwright`: E2E testing
- `prisma`: Database ORM