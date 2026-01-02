#!/usr/bin/env node
/**
 * CELPIP Compass API Test Script
 * Tests all card-related API endpoints
 *
 * Usage: node scripts/api-test.js [port]
 * Default port: 3000
 */

const BASE_URL = `http://localhost:${process.argv[2] || 3000}`;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}📡 ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  dim: (msg) => console.log(`${colors.dim}   ${msg}${colors.reset}`),
};

async function testEndpoint(name, url, options = {}) {
  log.info(`${options.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log.success(`${name}: ${response.status}`);
      if (data.data?.source) {
        log.dim(`Source: ${data.data.source}`);
      }
      if (data.data?.cards) {
        log.dim(`Cards: ${data.data.cards.length} / Total: ${data.data.total}`);
      }
      return { success: true, data };
    } else {
      log.error(`${name}: ${response.status} - ${data.error?.message || 'Unknown error'}`);
      return { success: false, data };
    }
  } catch (error) {
    log.error(`${name}: ${error.message}`);
    return { success: false, error };
  }
}

async function runTests() {
  console.log('\n🚀 CELPIP Compass API Tests');
  console.log('============================\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const results = [];

  // Test 1: Health check
  results.push(await testEndpoint(
    'Health Check',
    `${BASE_URL}/api/health`
  ));

  console.log('');

  // Test 2: Get all cards
  const cardsResult = await testEndpoint(
    'Get All Cards',
    `${BASE_URL}/api/v1/cards`
  );
  results.push(cardsResult);

  console.log('');

  // Test 3: Get cards with filters
  results.push(await testEndpoint(
    'Filter by Type',
    `${BASE_URL}/api/v1/cards?type=writing-task1`
  ));

  console.log('');

  results.push(await testEndpoint(
    'Filter by Difficulty',
    `${BASE_URL}/api/v1/cards?difficulty=clb8`
  ));

  console.log('');

  results.push(await testEndpoint(
    'Search Cards',
    `${BASE_URL}/api/v1/cards?search=email`
  ));

  console.log('');

  results.push(await testEndpoint(
    'Pagination',
    `${BASE_URL}/api/v1/cards?limit=2&offset=0`
  ));

  console.log('');

  // Test 4: Get single card
  if (cardsResult.success && cardsResult.data?.data?.cards?.[0]) {
    const cardId = cardsResult.data.data.cards[0].id;
    results.push(await testEndpoint(
      'Get Single Card',
      `${BASE_URL}/api/v1/cards/${cardId}`
    ));
  }

  console.log('');

  // Test 5: Get cards for review
  results.push(await testEndpoint(
    'Cards for Review',
    `${BASE_URL}/api/v1/cards/review`
  ));

  console.log('');

  // Test 6: Submit review (POST)
  if (cardsResult.success && cardsResult.data?.data?.cards?.[0]) {
    const cardId = cardsResult.data.data.cards[0].id;
    results.push(await testEndpoint(
      'Submit Review',
      `${BASE_URL}/api/v1/cards/review`,
      {
        method: 'POST',
        body: {
          cardId,
          quality: 4,
          scores: {
            accuracy: 4,
            fluency: 4,
            completeness: 4,
          },
          timeTaken: 30000,
        },
      }
    ));
  }

  // Summary
  console.log('\n============================');
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  if (failed === 0) {
    log.success(`All ${passed} tests passed!`);
  } else {
    log.warn(`${passed} passed, ${failed} failed`);
  }

  // Data source info
  const source = cardsResult.data?.data?.source;
  console.log('\n📊 Data Source:', source || 'unknown');

  if (source === 'mock') {
    console.log('\n💡 To use database:');
    console.log('   1. docker-compose up -d');
    console.log('   2. npm run db:push');
    console.log('   3. npm run db:seed');
    console.log('   4. Restart dev server');
  }

  console.log('');
  process.exit(failed > 0 ? 1 : 0);
}

// Check if server is ready
async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/health`);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.stdout.write('.');
  }
  return false;
}

// Main
(async () => {
  console.log('Checking server availability...');
  const ready = await waitForServer(10);

  if (!ready) {
    log.error('Server not responding. Please start with: npm run dev');
    process.exit(1);
  }

  await runTests();
})();
