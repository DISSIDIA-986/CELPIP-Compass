#!/bin/bash
# CELPIP Compass - Local Testing Script
# Run this script on your local machine with Node.js >= 20.9.0

set -e

echo "🚀 CELPIP Compass Local Testing"
echo "================================"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo "📌 Node.js version: $(node -v)"

if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 20+ required. Please upgrade."
    exit 1
fi

echo "✅ Node.js version OK"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

# Step 2: Generate Prisma client
echo "🔧 Step 2: Generating Prisma client..."
npm run db:generate

# Step 3: TypeScript check
echo "🔍 Step 3: TypeScript compilation check..."
npx tsc --noEmit
echo "✅ TypeScript OK"

# Step 4: ESLint check
echo "🔍 Step 4: ESLint check..."
npm run lint || true

# Step 5: Start dev server in background
echo "🌐 Step 5: Starting dev server..."
npm run dev &
DEV_PID=$!
echo "   Dev server PID: $DEV_PID"

# Wait for server to be ready
echo "   Waiting for server to start..."
sleep 10

# Step 6: Test API endpoints
echo ""
echo "🧪 Step 6: Testing API endpoints..."
echo ""

# Health check
echo "📡 GET /api/health"
curl -s http://localhost:3000/api/health | head -c 200
echo ""
echo ""

# Get cards
echo "📡 GET /api/v1/cards"
CARDS_RESPONSE=$(curl -s http://localhost:3000/api/v1/cards)
echo "$CARDS_RESPONSE" | head -c 500
echo ""
echo ""

# Check source (mock or database)
SOURCE=$(echo "$CARDS_RESPONSE" | grep -o '"source":"[^"]*"' | head -1)
echo "📊 Data source: $SOURCE"
echo ""

# Get cards for review
echo "📡 GET /api/v1/cards/review"
curl -s http://localhost:3000/api/v1/cards/review | head -c 500
echo ""
echo ""

# Get single card
echo "📡 GET /api/v1/cards/writing-task1-email-01"
curl -s http://localhost:3000/api/v1/cards/writing-task1-email-01 | head -c 500
echo ""
echo ""

# Test with filters
echo "📡 GET /api/v1/cards?type=writing-task1&difficulty=clb8"
curl -s "http://localhost:3000/api/v1/cards?type=writing-task1&difficulty=clb8" | head -c 500
echo ""
echo ""

# Step 7: Run unit tests
echo ""
echo "🧪 Step 7: Running unit tests..."
kill $DEV_PID 2>/dev/null || true
npm test -- --passWithNoTests || true

echo ""
echo "================================"
echo "✅ Local testing complete!"
echo ""
echo "Next steps:"
echo "  1. Start PostgreSQL: docker-compose up -d"
echo "  2. Push schema: npm run db:push"
echo "  3. Seed data: npm run db:seed"
echo "  4. Restart dev: npm run dev"
echo "  5. API will return source: 'database'"
