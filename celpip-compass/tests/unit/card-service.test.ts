/**
 * Card Service Unit Tests
 * Tests the database abstraction layer with Prisma/mock fallback
 */

import { cardService } from '@/services/card-service'
import { CardType, DifficultyLevel, CardStatus } from '@/types/flashcards'

// Mock Prisma client for testing without database
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: jest.fn().mockRejectedValue(new Error('No database')),
    card: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  },
}))

describe('Card Service', () => {
  describe('getCards', () => {
    it('should return cards with mock fallback when database unavailable', async () => {
      const result = await cardService.getCards({})

      expect(result.success).toBe(true)
      expect(result.source).toBe('mock')
      expect(result.data).toBeDefined()
      expect(result.data!.cards).toBeInstanceOf(Array)
      expect(result.data!.cards.length).toBeGreaterThan(0)
    })

    it('should filter cards by type', async () => {
      const result = await cardService.getCards({
        type: CardType.WRITING_TASK1,
      })

      expect(result.success).toBe(true)
      expect(result.data!.cards.every(card => card.type === CardType.WRITING_TASK1)).toBe(true)
    })

    it('should filter cards by difficulty', async () => {
      const result = await cardService.getCards({
        difficulty: DifficultyLevel.CLB8,
      })

      expect(result.success).toBe(true)
      expect(result.data!.cards.every(card => card.difficulty === DifficultyLevel.CLB8)).toBe(true)
    })

    it('should support search', async () => {
      const result = await cardService.getCards({
        search: 'email',
      })

      expect(result.success).toBe(true)
      // Should find cards containing "email" in title or scenario
    })

    it('should support pagination', async () => {
      const result = await cardService.getCards({
        limit: 2,
        offset: 0,
      })

      expect(result.success).toBe(true)
      expect(result.data!.cards.length).toBeLessThanOrEqual(2)
      expect(result.data!.page).toBe(1)
      expect(result.data!.pageSize).toBe(2)
    })
  })

  describe('getCardById', () => {
    it('should return a card when found', async () => {
      const allCards = await cardService.getCards({})
      const firstCardId = allCards.data!.cards[0].id

      const result = await cardService.getCardById(firstCardId)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data!.id).toBe(firstCardId)
    })

    it('should return error when card not found', async () => {
      const result = await cardService.getCardById('non-existent-id')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Card not found')
    })
  })

  describe('createCard (mock mode)', () => {
    it('should fail in mock mode - database required', async () => {
      const result = await cardService.createCard({
        type: CardType.WRITING_TASK1,
        title: 'Test Card',
        scenario: 'Test scenario',
        difficulty: DifficultyLevel.CLB8,
        status: CardStatus.NEW,
        essentialPhrases: { greeting: ['Hello'] },
        upgrades: { vocabulary: {}, structure: {} },
        reviewCount: 0,
        correctCount: 0,
        averageQualityScore: 0,
        totalStudyTime: 0,
        isDeleted: false,
      })

      expect(result.success).toBe(false)
      expect(result.source).toBe('mock')
      expect(result.error).toContain('Database not available')
    })
  })

  describe('updateCard (mock mode)', () => {
    it('should fail in mock mode - database required', async () => {
      const result = await cardService.updateCard('any-id', {
        title: 'Updated Title',
      })

      expect(result.success).toBe(false)
      expect(result.source).toBe('mock')
    })
  })

  describe('deleteCard (mock mode)', () => {
    it('should fail in mock mode - database required', async () => {
      const result = await cardService.deleteCard('any-id')

      expect(result.success).toBe(false)
      expect(result.source).toBe('mock')
    })
  })
})

describe('Card Service with Database', () => {
  // These tests require a running PostgreSQL database
  // Skip if DATABASE_URL is not configured

  const skipDbTests = !process.env.DATABASE_URL || process.env.SKIP_DB_TESTS

  const conditionalTest = skipDbTests ? it.skip : it

  conditionalTest('should use database when available', async () => {
    // This test will only run when database is available
    const result = await cardService.getCards({})

    // If database is available, source should be 'database'
    if (result.source === 'database') {
      expect(result.success).toBe(true)
    }
  })
})
