import { spacedRepetitionService, SpacedRepetitionService } from '../../src/services/spaced-repetition-service'

// Mock card data
const createCard = (overrides = {}) => ({
  id: Math.random().toString(36).substr(2, 9),
  question: 'Test question',
  answer: 'Test answer',
  difficulty: 2.5,
  interval: 1,
  repetitions: 0,
  nextReviewDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

describe('Spaced Repetition Service', () => {
  let sampleCards
  let service

  beforeEach(() => {
    sampleCards = [
      createCard({
        id: 'card-1',
        difficulty: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewDate: new Date(),
      }),
      createCard({
        id: 'card-2',
        difficulty: 2.3,
        interval: 6,
        repetitions: 1,
        nextReviewDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }),
      createCard({
        id: 'card-3',
        difficulty: 2.7,
        interval: 15,
        repetitions: 5,
        nextReviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }),
    ]
    service = new SpacedRepetitionService()
    jest.clearAllMocks()
  })

  describe('calculateNextInterval', () => {
    it('should start over for quality < 3', () => {
      const interval = service.calculateNextInterval(2, 10, 5)
      expect(interval).toBe(1)
    })

    it('should return 1 for first repetition', () => {
      const interval = service.calculateNextInterval(4, 1, 0)
      expect(interval).toBe(1)
    })

    it('should return 6 for second repetition', () => {
      const interval = service.calculateNextInterval(4, 1, 1)
      expect(interval).toBe(6)
    })

    it('should multiply by 2.5 for subsequent repetitions', () => {
      const interval = service.calculateNextInterval(4, 10, 2)
      expect(interval).toBe(25) // 10 * 2.5
    })
  })

  describe('calculateNewDifficulty', () => {
    it('should increase difficulty for good quality', () => {
      const newDifficulty = service.calculateNewDifficulty(2.4, 5)
      expect(newDifficulty).toBeGreaterThan(2.4)
    })

    it('should decrease difficulty for poor quality', () => {
      const newDifficulty = service.calculateNewDifficulty(2.5, 1)
      expect(newDifficulty).toBeLessThan(2.5)
    })

    it('should clamp difficulty between 1.3 and 2.5', () => {
      let difficulty = service.calculateNewDifficulty(2.5, 1)
      expect(difficulty).toBeGreaterThanOrEqual(1.3)

      difficulty = service.calculateNewDifficulty(1.3, 5)
      expect(difficulty).toBeLessThanOrEqual(2.5)
    })
  })

  describe('updateCardAfterReview', () => {
    it('should reset repetitions for quality < 3', () => {
      const card = createCard({ repetitions: 5 })
      const updatedCard = service.updateCardAfterReview(card, 2)

      expect(updatedCard.repetitions).toBe(0)
      expect(updatedCard.interval).toBe(1)
    })

    it('should increase repetitions for quality >= 3', () => {
      const card = createCard({ repetitions: 5 })
      const updatedCard = service.updateCardAfterReview(card, 4)

      expect(updatedCard.repetitions).toBe(6)
      expect(updatedCard.interval).toBeGreaterThan(card.interval)
    })

    it('should update next review date', () => {
      const card = createCard()
      const updatedCard = service.updateCardAfterReview(card, 4)

      expect(updatedCard.nextReviewDate.getTime()).toBeGreaterThan(card.nextReviewDate.getTime())
    })
  })

  describe('createNewCard', () => {
    it('should create a card with default values', () => {
      const card = service.createNewCard('Test question', 'Test answer')

      expect(card.id).toBeDefined()
      expect(card.question).toBe('Test question')
      expect(card.answer).toBe('Test answer')
      expect(card.difficulty).toBe(2.5)
      expect(card.interval).toBe(1)
      expect(card.repetitions).toBe(0)
      expect(card.nextReviewDate).toBeInstanceOf(Date)
    })
  })

  describe('getCardsForReview', () => {
    it('should return cards that need review', () => {
      // Create cards with different review dates
      const overdue1 = new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
      const overdue2 = new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
      const future = new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow

      const cards = [
        createCard({ nextReviewDate: overdue1 }),
        createCard({ nextReviewDate: future }),
        createCard({ nextReviewDate: overdue2 }),
      ]

      const reviewCards = service.getCardsForReview(cards)

      expect(reviewCards.length).toBe(2)
      expect(reviewCards.map(card => card.id)).toEqual(expect.arrayContaining([cards[0].id, cards[2].id]))
    })

    it('should return empty array when no cards need review', () => {
      const cards = [
        createCard({ nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }),
        createCard({ nextReviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }),
      ]

      const reviewCards = service.getCardsForReview(cards)
      expect(reviewCards.length).toBe(0)
    })
  })

  describe('calculateStats', () => {
    it('should calculate correct statistics', () => {
      const stats = service.calculateStats(sampleCards)

      expect(stats.totalCards).toBe(3)
      expect(stats.cardsForReview).toBe(2) // 2 cards need review (card-1 and card-2)
      expect(stats.averageDifficulty).toBeGreaterThan(0)
      expect(stats.averageInterval).toBeGreaterThan(0)
      expect(stats.reviewProgress).toBe(33) // 1/3 = 33% completed
    })

    it('should handle empty card array', () => {
      const stats = service.calculateStats([])

      expect(stats.totalCards).toBe(0)
      expect(stats.cardsForReview).toBe(0)
      expect(stats.averageDifficulty).toBe(0)
      expect(stats.averageInterval).toBe(0)
      expect(stats.reviewProgress).toBe(0)
    })
  })
})