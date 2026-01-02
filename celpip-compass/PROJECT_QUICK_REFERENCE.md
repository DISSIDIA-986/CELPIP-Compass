# CELPIP Compass - Quick Reference Guide

**Version**: 0.1.0
**Last Updated**: 2025-12-30
**Status**: Production-Ready (with minor fixes recommended)

---

## Project Overview

CELPIP Compass is a spaced repetition learning system for CELPIP (Canadian English Language Proficiency Index Program) test preparation. It implements the SM2 (SuperMemo 2) algorithm to optimize learning intervals.

**Technology Stack**:
- Frontend: Next.js 16.1.1 + React 19.2.3
- Styling: Tailwind CSS 4
- State Management: React hooks (Zustand installed but not used)
- Type Safety: TypeScript 5
- Validation: Zod 4.2.1

---

## Directory Structure

```
celpip-compass/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Main page with navigation
│   └── api/v1/                   # API routes
│       ├── cards/
│       │   ├── route.ts          # GET (list), POST (create)
│       │   ├── [id]/route.ts     # GET, PUT, DELETE single card
│       │   ├── review/route.ts   # POST (submit review)
│       │   └── schedule/route.ts # GET (get study schedule)
│       └── data/sample-cards/    # GET sample data
├── components/                   # React components
│   ├── Cards/                    # Card-related components
│   │   ├── SampleCard.tsx        # Single card display
│   │   └── SampleCardsGrid.tsx   # Grid with filters
│   ├── Study/                    # Study session components
│   │   ├── StudyDashboard.tsx    # Main learning interface
│   │   └── StudyProgress.tsx     # Statistics and analytics
│   └── Flashcards/
│       └── QualitySelector.tsx   # Quality rating UI
├── data/
│   └── sample-cards.ts           # 8 sample flashcards
├── services/                     # Business logic
│   ├── data-service.ts           # Data access layer
│   └── spaced-repetition-service.ts  # SM2 algorithm
├── types/
│   └── flashcards.ts             # TypeScript definitions
└── public/                       # Static assets
```

---

## Key Components Reference

### StudyDashboard (`components/Study/StudyDashboard.tsx`)

**Purpose**: Main learning interface where users study flashcards

**Key Features**:
- Displays learning statistics
- Manages study sessions
- Handles quality rating (1-5 scale)
- Shows feedback after each card
- Tracks session progress

**State Management**:
```typescript
interface StudySession {
  currentCard: Flashcard | null;
  sessionCards: Flashcard[];
  completedCards: Flashcard[];
  isSessionActive: boolean;
  currentQuality: number | null;
  showFeedback: boolean;
}
```

**Important Methods**:
- `loadStudyData()`: Loads cards for review
- `handleQualitySelect(quality)`: Processes user rating
- `calculateNewAverageScore()`: Updates card statistics

### StudyProgress (`components/Study/StudyProgress.tsx`)

**Purpose**: Display learning statistics and analytics

**Key Features**:
- Overall statistics (total, mastered, learning, new)
- Performance by type (writing, speaking, listening)
- Performance by difficulty (CLB 7, 8, 9)
- Weekly progress visualization
- Achievement badges
- Personalized recommendations

**Data Generated**:
- Total cards and breakdown by status
- Average quality score
- Study streak calculation
- Mastery percentages

### SampleCardsGrid (`components/Cards/SampleCardsGrid.tsx`)

**Purpose**: Browse and filter flashcards

**Key Features**:
- Filter by card type (4 types)
- Filter by difficulty (3 levels)
- Search by title/scenario
- Display card statistics
- Click to view details

**Filters Available**:
- Type: Writing Task 1, Writing Task 2, Speaking, Listening
- Difficulty: CLB 7, CLB 8, CLB 9
- Search: Full-text search

---

## API Endpoints Reference

### GET /api/v1/cards

**Purpose**: Get list of cards with filtering and pagination

**Query Parameters**:
- `type`: Filter by card type
- `difficulty`: Filter by difficulty level
- `status`: Filter by status
- `search`: Search in title/scenario
- `isDueForReview`: Filter by due date
- `limit`: Results per page (default: 20)
- `offset`: Pagination offset (default: 0)

**Response**:
```typescript
{
  success: true,
  data: {
    items: Flashcard[],
    total: number,
    page: number,
    pageSize: number,
    totalPages: number
  }
}
```

### POST /api/v1/cards

**Purpose**: Create a new card

**Body**: Flashcard creation data
**Response**: Created card with ID

### GET /api/v1/cards/[id]

**Purpose**: Get single card details

**Response**: Full card object

### PUT /api/v1/cards/[id]

**Purpose**: Update a card

**Body**: Partial card data (fields to update)
**Response**: Updated card

### DELETE /api/v1/cards/[id]

**Purpose**: Soft delete a card

**Response**: `{ deleted: true }`

### POST /api/v1/cards/review

**Purpose**: Submit a card review with quality scores

**Body**:
```typescript
{
  cardId: string;
  studySessionId?: string;
  scores: {
    accuracy: number;      // 0-5
    fluency: number;       // 0-5
    completeness: number;  // 0-5
    pronunciation?: number; // 0-5 (speaking)
    structure?: number;    // 0-5 (writing)
  };
  timeTakenSeconds?: number;
  userNotes?: string;
  isCorrect: boolean;
}
```

**Response**:
```typescript
{
  success: true,
  data: {
    reviewId: string;
    cardId: string;
    nextReviewAt: Date;
    interval: number;      // days until next review
    repetitions: number;   // total repetitions
    ease: number;          // difficulty factor (1.3-2.5+)
    stats: {
      totalReviews: number;
      successRate: number; // percentage
      averageQuality: number;
      averageResponseTime: number;
    }
  }
}
```

### GET /api/v1/cards/schedule

**Purpose**: Get study schedule for upcoming reviews

**Query Parameters**:
- `limit`: Maximum cards to return (default: 50)
- `includeNew`: Include new cards (default: true)

**Response**:
```typescript
{
  success: true,
  data: {
    schedule: {
      cardId: string;
      type: CardType;
      title: string;
      reviewType: 'review' | 'new';
      dueDate: Date;
      priority: number;
      streakCount: number;
      estimatedTime: number; // seconds
    }[];
    summary: {
      dueToday: number;
      dueTomorrow: number;
      newAvailable: number;
      totalPending: number;
    }
  }
}
```

---

## SM2 Algorithm Reference

### How It Works

The SuperMemo 2 algorithm calculates optimal review intervals based on user performance.

**Key Concepts**:

1. **Ease Factor (EF)**: Represents how "easy" a card is for the user
   - Starts at 2.5
   - Range: 1.3 (very difficult) to 2.5+ (very easy)
   - Formula: `EF' = EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))`

2. **Interval (I)**: Days until next review
   - First review: 1 day
   - Second review: 6 days
   - Subsequent: `I = I × EF`

3. **Quality Score (q)**: User's self-assessment (1-5)
   - q < 3: Failed review, reset repetitions
   - q >= 3: Passed review, increase repetitions

**Algorithm Implementation** (`services/spaced-repetition-service.ts`):

```typescript
function calculateNextReview(card: Flashcard, quality: number) {
  const ease = card.metadata?.ease || 2.5;
  const interval = card.metadata?.interval || 0;
  const repetitions = card.metadata?.repetitions || 0;

  let newInterval: number;
  let newRepetitions: number;
  let newEase: number;

  if (quality >= 3) {
    // Correct answer
    newRepetitions = repetitions + 1;

    if (repetitions === 0) {
      newInterval = 1; // First review: 1 day
    } else if (repetitions === 1) {
      newInterval = 6; // Second review: 6 days
    } else {
      newInterval = Math.round(interval * ease); // Later: × EF
    }

    newEase = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  } else {
    // Incorrect answer
    newRepetitions = 0;
    newInterval = 1; // Reset to 1 day
    newEase = Math.max(1.3, ease - 0.2);
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + newInterval);

  return {
    ease: newEase,
    interval: newInterval,
    repetitions: newRepetitions,
    dueDate
  };
}
```

### Quality Score Guidelines

When rating a card after review:

- **5 (Perfect)**: Complete recall, no effort
  - Ease factor increases slightly
  - Next review: maximum interval

- **4 (Good)**: Correct answer with minor hesitation
  - Ease factor stays similar
  - Next review: normal interval

- **3 (Fair)**: Correct answer but difficult to recall
  - Ease factor decreases slightly
  - Next review: shorter interval

- **2 (Poor)**: Incorrect but familiar
  - Ease factor decreases
  - Repetitions reset to 0
  - Next review: 1 day

- **1 (Bad)**: Complete blackout
  - Ease factor decreases significantly
  - Repetitions reset to 0
  - Next review: 1 day

---

## Type Definitions Reference

### Core Enums

```typescript
enum CardType {
  WRITING_TASK1 = 'writing-task1',     // Email writing
  WRITING_TASK2 = 'writing-task2',     // Essay writing
  SPEAKING_TASK = 'speaking-task',     // Speaking tasks
  LISTENING_KEYWORD = 'listening-keyword' // Listening keywords
}

enum DifficultyLevel {
  CLB7 = 'clb7',
  CLB8 = 'clb8',
  CLB9 = 'clb9'
}

enum CardStatus {
  NEW = 'new',           // Never studied
  LEARNING = 'learning', // Currently learning
  REVIEW = 'review',     // In review phase
  MASTERED = 'mastered', // Well known
  ARCHIVED = 'archived'  // No longer needed
}
```

### Flashcard Interface

```typescript
interface Flashcard {
  // Identity
  id: string;
  type: CardType;
  title: string;

  // Content
  scenario: string;
  tone?: string;
  difficulty: DifficultyLevel;
  status: CardStatus;
  essentialPhrases: EssentialPhrases;
  upgrades: UpgradePackage;
  practice?: PracticeItem;

  // Spaced Repetition
  metadata?: SpacedRepetitionMetadata;
  lastReviewedAt?: Date;
  nextReviewAt?: Date;
  reviewCount: number;
  correctCount: number;

  // Statistics
  averageQualityScore: number;
  totalStudyTime: number; // seconds

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
```

---

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit         # Type check without building
npm run lint -- --fix    # Auto-fix ESLint issues

# Testing (not yet implemented)
npm test                 # Run tests (when added)
npm run test:watch       # Watch mode (when added)
```

---

## Common Tasks

### Adding a New Flashcard

1. Add to `data/sample-cards.ts`:
```typescript
{
  id: 'unique-id',
  type: CardType.WRITING_TASK1,
  title: 'Card Title',
  scenario: 'Description of scenario',
  tone: 'formal',
  difficulty: DifficultyLevel.CLB8,
  status: CardStatus.NEW,
  essentialPhrases: {
    section1: ['phrase1', 'phrase2'],
    // ... more sections
  },
  upgrades: {
    vocabulary: {
      'basic': ['advanced1', 'advanced2']
    },
    structure: {
      'simple': 'complex'
    }
  },
  practice: {
    question: 'Practice question',
    keyPoints: ['point1', 'point2']
  },
  reviewCount: 0,
  correctCount: 0,
  averageQualityScore: 0,
  totalStudyTime: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
  metadata: {
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date()
  }
}
```

### Creating a New Component

1. Create file in appropriate directory
2. Add `'use client'` directive if using hooks
3. Import necessary types from `@/types/flashcards`
4. Export as named export or default

### Adding an API Route

1. Create `route.ts` file in `app/api/` directory
2. Import Next.js types: `import { NextRequest, NextResponse } from 'next/server'`
3. Export async functions: `GET`, `POST`, `PUT`, `DELETE`
4. Use Zod for validation
5. Return proper ApiResponse format

---

## Troubleshooting

### Build Errors

**Problem**: TypeScript compilation errors
**Solution**: Check `tsconfig.json` paths, ensure all imports use `@/` prefix

**Problem**: Module not found
**Solution**: Install missing dependencies: `npm install <package>`

**Problem**: Next.js route not working
**Solution**: Ensure file is named `route.ts` (not `routes.ts`)

### Runtime Errors

**Problem**: "Cannot access variable before declaration"
**Solution**: Move function declarations before useEffect or use useCallback

**Problem**: State updates not reflecting
**Solution**: Check for stale closures, use functional updates

**Problem**: Hydration errors
**Solution**: Ensure server and client render same HTML, check Date objects

---

## Performance Tips

1. **Use React.memo** for expensive components:
   ```typescript
   export const SampleCard = React.memo<SampleCardProps>(({ card }) => {
     // ...
   });
   ```

2. **Use useMemo** for expensive calculations:
   ```typescript
   const filteredCards = useMemo(() => {
     return cards.filter(/* ... */);
   }, [cards, filter]);
   ```

3. **Use useCallback** for event handlers:
   ```typescript
   const handleClick = useCallback(() => {
     // ...
   }, [dependencies]);
   ```

4. **Lazy load routes** (when app grows):
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

---

## Environment Variables

Create `.env.local` for local configuration:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_AUTH=false
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Fix all ESLint errors
- [ ] Test all user flows
- [ ] Update page metadata
- [ ] Set environment variables
- [ ] Configure domain (if using Vercel/Netlify)
- [ ] Set up monitoring (Sentry, Analytics)
- [ ] Enable caching strategies
- [ ] Test on mobile devices
- [ ] Verify Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

---

## Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zod Validation**: https://zod.dev
- **SM2 Algorithm**: https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method

---

**Last Updated**: 2025-12-30
**Maintainer**: Development Team
**License**: Private (unless otherwise specified)
