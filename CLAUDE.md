# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CELPIP Compass is a comprehensive learning platform for CELPIP (Canadian English Language Proficiency Index Program) test preparation. Currently, this repository contains detailed technical documentation and is ready for implementation.

**Status**: Documentation phase - Ready for development
**Target Platform**: Web application with mobile responsiveness
**Architecture**: Microservices with Next.js frontend and Node.js/Express backend

## Technology Stack

### Frontend
- **Framework**: Next.js 14 + React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: Next.js App Router
- **Network**: Axios/TanStack Query
- **Testing**: Jest + Playwright

### Backend
- **Runtime**: Node.js + Express (or Python + FastAPI)
- **Authentication**: JWT tokens (15min expiry) + Refresh tokens (7 days)
- **API Design**: REST API with optional GraphQL
- **Real-time**: WebSocket notifications

### Database
- **Primary**: PostgreSQL 14+ (users, learning plans, progress)
- **Cache**: Redis 7+ (sessions, caching, rate limiting)
- **Document**: MongoDB 5+ (user notes, unstructured content)

## Development Workflow

### Initial Setup
```bash
# Clone and install
git clone <repository-url>
cd celpip-compass

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with proper configurations

# Frontend setup
cd ../frontend
npm install
cp .env.example .env.local

# Start databases with Docker
cd ..
docker-compose up -d

# Run database migrations
cd backend
npm run db:migrate
npm run db:seed
```

### Development Commands
```bash
# Backend (port 3001)
cd backend
npm run dev        # Development server
npm run build      # Production build
npm test          # Run tests
npm run test:watch # Watch mode
npm run lint      # Code linting

# Frontend (port 3000)
cd frontend
npm run dev        # Development server
npm run build      # Production build
npm run export     # Static export
npm run test:e2e   # E2E tests with Playwright
npm run lighthouse # Performance audit

# Database operations
cd backend
npm run db:migrate # Run migrations
npm run db:seed   # Seed initial data
npm run db:reset  # Reset database
```

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose down && docker-compose up -d --build
```

## Architecture Overview

### Directory Structure (Planned)
```
celpip-compass/
├── frontend/           # Next.js React app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components (Next.js routing)
│   │   ├── styles/     # Global styles + Tailwind
│   │   ├── hooks/      # Custom React hooks
│   │   ├── store/      # Zustand state management
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
├── backend/            # Node.js/Express API
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── services/   # Service layer
│   │   ├── middleware/  # Express middleware
│   │   ├── models/     # Data models
│   │   └── utils/      # Utility functions
└── database/          # Database schemas and migrations
```

### Core Services
1. **Authentication Service**: OAuth2 (Google/WeChat), JWT management
2. **Learning Service**: Study plans, progress tracking, recommendations
3. **Resource Service**: Video/blog repository with search and filtering
4. **Community Service**: Forums, success stories, Q&A
5. **Analytics Service**: User behavior tracking and reporting

### API Endpoints (Key)
```typescript
// Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh

// Learning
GET    /api/v1/learning-plans
POST   /api/v1/learning-plans
POST   /api/v1/progress

// Resources
GET    /api/v1/resources
GET    /api/v1/resources/search
GET    /api/v1/resources/:id
```

## Responsive Design Implementation

### Breakpoints
- **XS**: 0-480px (iPhone SE)
- **SM**: 481-768px (iPhone 12)
- **MD**: 769-1024px (iPad)
- **LG**: 1025-1440px (MacBook Air)
- **XL**: 1441px+ (4K display)

### Mobile-First Approach
```typescript
// Example responsive component
<div className="
  p-4 sm:p-6 md:p-8
  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
  gap-4 sm:gap-6 md:gap-8
  text-sm sm:text-base md:text-lg
">
  Content
</div>
```

## Key Implementation Notes

### Authentication Flow
1. Users login via OAuth2 (Google/WeChat) or email/password
2. Returns access token (15min) and refresh token (7 days)
3. Refresh token stored in HttpOnly cookie for security
4. Access token sent in Authorization header for API requests

### Performance Targets
- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **First load**: < 2 seconds
- **API response**: < 500ms

### Security Considerations
- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Role-Based Access Control (RBAC)
- API rate limiting
- CORS configuration
- Input validation and sanitization

## Database Schema (Key Tables)

### PostgreSQL
- `users` - User profiles and authentication data
- `learning_plans` - Personalized study plans
- `progress` - User progress tracking
- `resources` - Video/blog resource library
- `communities` - Forum posts and discussions

### Redis
- User sessions and authentication state
- Cached resource data
- Rate limiting counters
- Leaderboard data

### MongoDB
- User notes and annotations
- Flexible content storage
- File attachments

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configuration
- Write meaningful commit messages (conventional commits)
- Include tests for new features
- Document API endpoints and database changes

### Testing
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for user flows
- Performance testing with Lighthouse
- Responsive testing across breakpoints

### Deployment
- Frontend: Vercel or static export
- Backend: Cloud platforms (AWS/GCP/Azure)
- Database: Managed services
- CI/CD: GitHub Actions
- Monitoring: Application performance and error tracking

## Important Documents

Refer to these documentation files for detailed implementation:
- `01_高层技术文档.md` - High-level architecture overview
- `02_详细技术文档.md` - Detailed technical implementation guide
- `03_技术文档快速参考.md` - Quick reference for developers
- `4周加速备考方案.md` - 4-week intensive study plan
- `资源库最终总结.md` - Resource library compilation

## Common Development Tasks

### Adding a New API Endpoint
1. Define route in `backend/src/routes/[service].ts`
2. Add controller logic in `backend/src/controllers/[service].ts`
3. Implement service method in `backend/src/services/[service].ts`
4. Add frontend service method in `frontend/src/services/api.ts`
5. Create React component or update existing component
6. Write tests for both backend and frontend

### Adding a Responsive Component
1. Create component with mobile-first Tailwind classes
2. Test with Chrome DevTools device toolbar
3. Ensure proper breakpoints for all screen sizes
4. Test on actual devices if possible

### Performance Optimization
1. Use React.memo for expensive components
2. Implement virtualization for long lists
3. Optimize images with proper sizing and format
4. Use caching strategies for API responses
5. Monitor Core Web Vitals with Lighthouse

## Environment Variables

### Required Environment Variables
```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Backend
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/celpip_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key_min_32_chars

# External Services
GOOGLE_CLIENT_SECRET=your_google_secret
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check backend CORS configuration
2. **Database Connection**: Verify Docker containers are running
3. **Token Issues**: Check JWT expiry and refresh token logic
4. **Responsive Issues**: Verify viewport meta tag and Tailwind classes
5. **Performance Issues**: Use Lighthouse to identify bottlenecks

### Debug Commands
```bash
# Check Docker status
docker ps

# View container logs
docker logs [container-name]

# Check database connections
cd backend && npm run db:test

# Run linting
cd backend && npm run lint
cd frontend && npm run lint
```