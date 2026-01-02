export interface Card {
  id: string
  question: string
  answer: string
  difficulty: number
  interval: number
  repetitions: number
  nextReviewDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface Quality {
  id: string
  cardId: string
  quality: number
  reviewDate: Date
  createdAt: Date
}

export class SpacedRepetitionService {
  /**
   * Calculate the next review interval based on quality and current interval
   */
  calculateNextInterval(quality: number, interval: number, repetitions: number): number {
    if (quality < 3) {
      // Start over if quality is poor
      return 1
    }

    if (repetitions === 0) {
      // First review
      return 1
    } else if (repetitions === 1) {
      // Second review
      return 6
    } else {
      // Subsequent reviews (factor of 2.5)
      return Math.floor(interval * 2.5)
    }
  }

  /**
   * Calculate the new difficulty based on quality
   */
  calculateNewDifficulty(currentDifficulty: number, quality: number): number {
    const newDifficulty = currentDifficulty + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

    // Clamp difficulty between 1.3 and 2.5
    return Math.max(1.3, Math.min(2.5, newDifficulty))
  }

  /**
   * Update a card after a review
   */
  updateCardAfterReview(card: Card, quality: number): Card {
    const repetitions = quality < 3 ? 0 : card.repetitions + 1
    const interval = this.calculateNextInterval(quality, card.interval, repetitions)
    const difficulty = this.calculateNewDifficulty(card.difficulty, quality)

    return {
      ...card,
      difficulty,
      interval,
      repetitions,
      nextReviewDate: new Date(Date.now() + interval * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    }
  }

  /**
   * Generate a new card with default values
   */
  createNewCard(question: string, answer: string): Card {
    return {
      id: Math.random().toString(36).substr(2, 9),
      question,
      answer,
      difficulty: 2.5,
      interval: 1,
      repetitions: 0,
      nextReviewDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  /**
   * Filter cards that need review today
   */
  getCardsForReview(cards: Card[]): Card[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return cards.filter(card => {
      const nextReview = new Date(card.nextReviewDate)
      nextReview.setHours(0, 0, 0, 0)
      return nextReview <= today
    })
  }

  /**
   * Calculate statistics for a set of cards
   */
  calculateStats(cards: Card[]) {
    const totalCards = cards.length
    const forReview = this.getCardsForReview(cards).length
    const averageDifficulty = cards.reduce((sum, card) => sum + card.difficulty, 0) / totalCards || 0
    const averageInterval = cards.reduce((sum, card) => sum + card.interval, 0) / totalCards || 0

    return {
      totalCards,
      cardsForReview: forReview,
      averageDifficulty: Math.round(averageDifficulty * 100) / 100,
      averageInterval: Math.round(averageInterval),
      reviewProgress: Math.round(((totalCards - forReview) / totalCards) * 100) || 0,
    }
  }
}

export const spacedRepetitionService = new SpacedRepetitionService()