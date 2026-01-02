import { FlashcardProgress, Flashcard, CardStatus } from '@/types/flashcards'

export class SpacedRepetitionService {
  // SM-2 Algorithm implementation
  calculateNextInterval(quality: number, interval: number, repetitions: number): number {
    // Quality is 0-5 where 0 = complete blackout, 5 = perfect response
    if (quality < 3) {
      // If quality is less than 3, start over
      return 1
    }

    if (repetitions === 0) {
      // First review
      return 1
    } else if (repetitions === 1) {
      // Second review
      return 6
    } else {
      // Subsequent reviews - multiply by 2.5
      return Math.floor(interval * 2.5)
    }
  }

  calculateNextReviewDate(quality: number, interval: number, repetitions: number): Date {
    const nextInterval = this.calculateNextInterval(quality, interval, repetitions)
    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval)
    return nextReviewDate
  }

  updateCardProgress(
    card: Flashcard,
    quality: number,
    currentProgress?: Partial<FlashcardProgress>
  ): { updatedCard: Flashcard; progress: FlashcardProgress } {
    // Initialize progress if not provided
    const progress: FlashcardProgress = (currentProgress as FlashcardProgress) || {
      flashcardId: card.id,
      quality: 0,
      interval: 1,
      repetitions: 0,
      nextReviewDate: new Date()
    }

    // Update repetitions based on quality
    if (quality >= 3) {
      progress.repetitions += 1
    } else {
      progress.repetitions = 0 // Reset if quality is low
    }

    // Calculate new interval
    progress.interval = this.calculateNextInterval(quality, progress.interval, progress.repetitions)
    progress.quality = quality

    // Calculate next review date
    progress.nextReviewDate = this.calculateNextReviewDate(quality, progress.interval, progress.repetitions)

    // Update card review statistics
    card.reviewCount += 1
    if (quality >= 3) {
      card.correctCount += 1
    }

    // Update card status based on performance
    if (quality < 3) {
      card.status = CardStatus.LEARNING
    } else if (progress.repetitions >= 3) {
      card.status = CardStatus.MASTERED
    } else if (progress.repetitions > 0) {
      card.status = CardStatus.REVIEW
    } else {
      card.status = CardStatus.NEW
    }

    card.nextReviewDate = progress.nextReviewDate
    card.updatedAt = new Date()

    return {
      updatedCard: card,
      progress
    }
  }

  getCardsForReview(cards: Flashcard[], days: number = 1): Flashcard[] {
    const now = new Date()
    const reviewDate = new Date(now)
    reviewDate.setDate(reviewDate.getDate() + days)

    return cards.filter(card => {
      // Only show cards that are due for review
      if (!card.nextReviewDate) return false

      // Include cards that are due today or within the specified days
      return card.nextReviewDate <= reviewDate && card.status !== CardStatus.MASTERED
    })
  }

  getOptimalStudyOrder(cards: Flashcard[]): Flashcard[] {
    // Sort cards by priority:
    // 1. Cards with due dates that have passed
    // 2. Cards with fewer correct attempts
    // 3. Cards with higher difficulty
    // 4. Cards with more reviews (for reinforcement)

    return cards.sort((a, b) => {
      // First, sort by review date (earlier first)
      if (a.nextReviewDate && b.nextReviewDate) {
        if (a.nextReviewDate.getTime() !== b.nextReviewDate.getTime()) {
          return a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
        }
      }

      // Then by correct count (fewer correct attempts first)
      if (a.correctCount !== b.correctCount) {
        return a.correctCount - b.correctCount
      }

      // Then by review count (more reviews first for reinforcement)
      return b.reviewCount - a.reviewCount
    })
  }

  calculateStudyStats(cards: Flashcard[]) {
    const totalCards = cards.length
    const newCards = cards.filter(card => card.status === CardStatus.NEW).length
    const learningCards = cards.filter(card => card.status === CardStatus.LEARNING).length
    const reviewCards = cards.filter(card => card.status === CardStatus.REVIEW).length
    const masteredCards = cards.filter(card => card.status === CardStatus.MASTERED).length

    const averageAccuracy = totalCards > 0
      ? (cards.reduce((sum, card) => sum + card.correctCount, 0) / cards.reduce((sum, card) => sum + card.reviewCount, 0)) * 100
      : 0

    return {
      total: totalCards,
      newCards,
      learningCards,
      reviewCards,
      masteredCards,
      averageAccuracy: isNaN(averageAccuracy) ? 0 : averageAccuracy
    }
  }

  getLearningStats(cards: Flashcard[]) {
    return this.calculateStudyStats(cards)
  }
}

export const spacedRepetitionService = new SpacedRepetitionService()