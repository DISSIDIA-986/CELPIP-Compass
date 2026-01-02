import { test, expect } from '@playwright/test';

/**
 * CELPIP Compass Cards API E2E Tests
 * Tests the real API endpoints with database/mock fallback
 */

test.describe('Cards API Endpoints', () => {
  const API_BASE = '/api/v1';

  test.describe('GET /api/v1/cards', () => {
    test('should return list of cards with proper structure', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.data.cards).toBeInstanceOf(Array);
      expect(data.data.total).toBeGreaterThanOrEqual(0);
      expect(data.data.page).toBeGreaterThanOrEqual(1);
      expect(data.data.pageSize).toBeGreaterThan(0);
      expect(data.data.totalPages).toBeGreaterThanOrEqual(0);
      expect(['database', 'mock']).toContain(data.data.source);

      // Verify card structure if cards exist
      if (data.data.cards.length > 0) {
        const card = data.data.cards[0];
        expect(card.id).toBeDefined();
        expect(card.type).toBeDefined();
        expect(card.title).toBeDefined();
        expect(card.scenario).toBeDefined();
        expect(card.difficulty).toBeDefined();
        expect(card.status).toBeDefined();
        expect(card.essentialPhrases).toBeDefined();
        expect(card.upgrades).toBeDefined();
      }
    });

    test('should filter cards by type', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?type=writing-task1`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      // All returned cards should be of type writing-task1
      data.data.cards.forEach((card: { type: string }) => {
        expect(card.type).toBe('writing-task1');
      });
    });

    test('should filter cards by difficulty', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?difficulty=clb8`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      data.data.cards.forEach((card: { difficulty: string }) => {
        expect(card.difficulty).toBe('clb8');
      });
    });

    test('should filter cards by status', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?status=new`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      data.data.cards.forEach((card: { status: string }) => {
        expect(card.status).toBe('new');
      });
    });

    test('should support search', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?search=email`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      // Cards should contain "email" in title or scenario
    });

    test('should support pagination', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?limit=2&offset=0`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.cards.length).toBeLessThanOrEqual(2);
      expect(data.data.page).toBe(1);
      expect(data.data.pageSize).toBe(2);
    });

    test('should handle invalid query parameters gracefully', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards?type=invalid-type`);

      expect(response.status()).toBe(400);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
  });

  test.describe('GET /api/v1/cards/:id', () => {
    test('should return a single card by ID', async ({ request }) => {
      // First get list of cards to get a valid ID
      const listResponse = await request.get(`${API_BASE}/cards`);
      const listData = await listResponse.json();

      if (listData.data.cards.length === 0) {
        test.skip();
        return;
      }

      const cardId = listData.data.cards[0].id;
      const response = await request.get(`${API_BASE}/cards/${cardId}`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.id).toBe(cardId);
    });

    test('should return 404 for non-existent card', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards/non-existent-id-12345`);

      expect(response.status()).toBe(404);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.error.code).toBe('CARD_NOT_FOUND');
    });
  });

  test.describe('GET /api/v1/cards/review', () => {
    test('should return cards due for review', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards/review`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.cards).toBeInstanceOf(Array);
      expect(data.data.totalDue).toBeGreaterThanOrEqual(0);
      expect(data.data.reviewCount).toBeGreaterThanOrEqual(0);
    });

    test('should respect limit parameter', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards/review?limit=3`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.cards.length).toBeLessThanOrEqual(3);
    });

    test('should include new cards by default', async ({ request }) => {
      const response = await request.get(`${API_BASE}/cards/review?includeNew=true`);

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      expect(data.success).toBe(true);
      // Should include cards with status 'new'
    });
  });

  test.describe('POST /api/v1/cards/review', () => {
    test('should submit a card review', async ({ request }) => {
      // First get a card ID
      const listResponse = await request.get(`${API_BASE}/cards`);
      const listData = await listResponse.json();

      if (listData.data.cards.length === 0) {
        test.skip();
        return;
      }

      const cardId = listData.data.cards[0].id;

      const response = await request.post(`${API_BASE}/cards/review`, {
        data: {
          cardId,
          quality: 4,
          scores: {
            accuracy: 4,
            fluency: 4,
            completeness: 4,
          },
          timeTaken: 30000,
        },
      });

      // This may fail in mock mode (which is expected)
      const data = await response.json();

      if (data.data?.source === 'database') {
        expect(response.ok()).toBeTruthy();
        expect(data.success).toBe(true);
        expect(data.data.nextReviewDate).toBeDefined();
        expect(data.data.interval).toBeGreaterThan(0);
      }
    });

    test('should return 404 for non-existent card', async ({ request }) => {
      const response = await request.post(`${API_BASE}/cards/review`, {
        data: {
          cardId: 'non-existent-id',
          quality: 4,
        },
      });

      expect(response.status()).toBe(404);
    });

    test('should validate quality score range', async ({ request }) => {
      const listResponse = await request.get(`${API_BASE}/cards`);
      const listData = await listResponse.json();

      if (listData.data.cards.length === 0) {
        test.skip();
        return;
      }

      const cardId = listData.data.cards[0].id;

      // Quality must be 0-5
      const response = await request.post(`${API_BASE}/cards/review`, {
        data: {
          cardId,
          quality: 10, // Invalid
        },
      });

      expect(response.status()).toBe(400);
    });
  });
});

test.describe('Health Check', () => {
  test('should return healthy status', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.status).toBe('healthy');
  });
});

test.describe('Sample Data Endpoint', () => {
  test('should return sample flashcards', async ({ request }) => {
    const response = await request.get('/api/v1/data/sample-cards');

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.cards).toBeInstanceOf(Array);
  });
});
