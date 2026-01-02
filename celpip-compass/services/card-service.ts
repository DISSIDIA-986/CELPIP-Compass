import { prisma } from '@/lib/prisma'
import {
  Flashcard,
  CardType as FrontendCardType,
  DifficultyLevel as FrontendDifficultyLevel,
  CardStatus as FrontendCardStatus
} from '@/types/flashcards'
import {
  CardType as PrismaCardType,
  DifficultyLevel as PrismaDifficultyLevel,
  CardStatus as PrismaCardStatus
} from '@prisma/client'
import { sampleFlashcards } from '@/data/sample-cards'

// Type mapping functions
const mapCardTypeToPrisma = (type: FrontendCardType): PrismaCardType => {
  const mapping: Record<FrontendCardType, PrismaCardType> = {
    [FrontendCardType.WRITING_TASK1]: PrismaCardType.WRITING_TASK1,
    [FrontendCardType.WRITING_TASK2]: PrismaCardType.WRITING_TASK2,
    [FrontendCardType.SPEAKING_TASK]: PrismaCardType.SPEAKING_TASK,
    [FrontendCardType.LISTENING_KEYWORD]: PrismaCardType.LISTENING_KEYWORD,
  }
  return mapping[type]
}

const mapDifficultyToPrisma = (difficulty: FrontendDifficultyLevel): PrismaDifficultyLevel => {
  const mapping: Record<FrontendDifficultyLevel, PrismaDifficultyLevel> = {
    [FrontendDifficultyLevel.CLB7]: PrismaDifficultyLevel.CLB7,
    [FrontendDifficultyLevel.CLB8]: PrismaDifficultyLevel.CLB8,
    [FrontendDifficultyLevel.CLB9]: PrismaDifficultyLevel.CLB9,
  }
  return mapping[difficulty]
}

const mapStatusToPrisma = (status: FrontendCardStatus): PrismaCardStatus => {
  const mapping: Record<FrontendCardStatus, PrismaCardStatus> = {
    [FrontendCardStatus.NEW]: PrismaCardStatus.NEW,
    [FrontendCardStatus.LEARNING]: PrismaCardStatus.LEARNING,
    [FrontendCardStatus.REVIEW]: PrismaCardStatus.REVIEW,
    [FrontendCardStatus.MASTERED]: PrismaCardStatus.MASTERED,
    [FrontendCardStatus.ARCHIVED]: PrismaCardStatus.ARCHIVED,
  }
  return mapping[status]
}

// Check if database is available
const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

// Map Prisma enums to Frontend enums
const mapCardTypeFromPrisma = (type: PrismaCardType): FrontendCardType => {
  const mapping: Record<PrismaCardType, FrontendCardType> = {
    [PrismaCardType.WRITING_TASK1]: FrontendCardType.WRITING_TASK1,
    [PrismaCardType.WRITING_TASK2]: FrontendCardType.WRITING_TASK2,
    [PrismaCardType.SPEAKING_TASK]: FrontendCardType.SPEAKING_TASK,
    [PrismaCardType.LISTENING_KEYWORD]: FrontendCardType.LISTENING_KEYWORD,
  }
  return mapping[type]
}

const mapDifficultyFromPrisma = (difficulty: PrismaDifficultyLevel): FrontendDifficultyLevel => {
  const mapping: Record<PrismaDifficultyLevel, FrontendDifficultyLevel> = {
    [PrismaDifficultyLevel.CLB7]: FrontendDifficultyLevel.CLB7,
    [PrismaDifficultyLevel.CLB8]: FrontendDifficultyLevel.CLB8,
    [PrismaDifficultyLevel.CLB9]: FrontendDifficultyLevel.CLB9,
  }
  return mapping[difficulty]
}

const mapStatusFromPrisma = (status: PrismaCardStatus): FrontendCardStatus => {
  const mapping: Record<PrismaCardStatus, FrontendCardStatus> = {
    [PrismaCardStatus.NEW]: FrontendCardStatus.NEW,
    [PrismaCardStatus.LEARNING]: FrontendCardStatus.LEARNING,
    [PrismaCardStatus.REVIEW]: FrontendCardStatus.REVIEW,
    [PrismaCardStatus.MASTERED]: FrontendCardStatus.MASTERED,
    [PrismaCardStatus.ARCHIVED]: FrontendCardStatus.ARCHIVED,
  }
  return mapping[status]
}

// Convert Prisma Card to Flashcard type
const prismaToFlashcard = (card: {
  id: string
  type: PrismaCardType
  title: string
  scenario: string
  tone: string | null
  difficulty: PrismaDifficultyLevel
  status: PrismaCardStatus
  essentialPhrases: unknown
  upgrades: unknown
  practice: unknown | null
  metadata: unknown | null
  lastReviewedAt: Date | null
  nextReviewAt: Date | null
  reviewCount: number
  correctCount: number
  averageQualityScore: number
  totalStudyTime: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}): Flashcard => ({
  id: card.id,
  type: mapCardTypeFromPrisma(card.type),
  title: card.title,
  scenario: card.scenario,
  tone: card.tone ?? undefined,
  difficulty: mapDifficultyFromPrisma(card.difficulty),
  status: mapStatusFromPrisma(card.status),
  essentialPhrases: card.essentialPhrases as Flashcard['essentialPhrases'],
  upgrades: card.upgrades as Flashcard['upgrades'],
  practice: card.practice as Flashcard['practice'] | undefined,
  metadata: card.metadata as Flashcard['metadata'] | undefined,
  lastReviewedAt: card.lastReviewedAt ?? undefined,
  nextReviewAt: card.nextReviewAt ?? undefined,
  reviewCount: card.reviewCount,
  correctCount: card.correctCount,
  averageQualityScore: card.averageQualityScore,
  totalStudyTime: card.totalStudyTime,
  isDeleted: card.isDeleted,
  createdAt: card.createdAt,
  updatedAt: card.updatedAt,
})

export interface CardQuery {
  type?: FrontendCardType
  difficulty?: FrontendDifficultyLevel
  status?: FrontendCardStatus
  tags?: string[]
  search?: string
  limit?: number
  offset?: number
}

export interface CardServiceResult<T> {
  success: boolean
  data?: T
  error?: string
  source: 'database' | 'mock'
}

export const cardService = {
  /**
   * Get all cards with optional filtering
   */
  async getCards(query: CardQuery = {}): Promise<CardServiceResult<{
    cards: Flashcard[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>> {
    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      try {
        const where = {
          isDeleted: false,
          ...(query.type && { type: mapCardTypeToPrisma(query.type) }),
          ...(query.difficulty && { difficulty: mapDifficultyToPrisma(query.difficulty) }),
          ...(query.status && { status: mapStatusToPrisma(query.status) }),
          ...(query.search && {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' as const } },
              { scenario: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }),
        }

        const [cards, total] = await Promise.all([
          prisma.card.findMany({
            where,
            skip: query.offset ?? 0,
            take: query.limit ?? 20,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.card.count({ where }),
        ])

        const limit = query.limit ?? 20
        const offset = query.offset ?? 0

        return {
          success: true,
          data: {
            cards: cards.map(prismaToFlashcard),
            total,
            page: Math.floor(offset / limit) + 1,
            pageSize: limit,
            totalPages: Math.ceil(total / limit),
          },
          source: 'database',
        }
      } catch (error) {
        console.error('Database query failed, falling back to mock:', error)
      }
    }

    // Fallback to mock data
    let filteredCards = [...sampleFlashcards]

    if (query.type) {
      filteredCards = filteredCards.filter(card => card.type === query.type)
    }
    if (query.difficulty) {
      filteredCards = filteredCards.filter(card => card.difficulty === query.difficulty)
    }
    if (query.status) {
      filteredCards = filteredCards.filter(card => card.status === query.status)
    }
    if (query.search) {
      const searchTerm = query.search.toLowerCase()
      filteredCards = filteredCards.filter(card =>
        card.title.toLowerCase().includes(searchTerm) ||
        card.scenario.toLowerCase().includes(searchTerm)
      )
    }

    const limit = query.limit ?? 20
    const offset = query.offset ?? 0
    const total = filteredCards.length
    const paginatedCards = filteredCards.slice(offset, offset + limit)

    return {
      success: true,
      data: {
        cards: paginatedCards,
        total,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
      source: 'mock',
    }
  },

  /**
   * Get a single card by ID
   */
  async getCardById(id: string): Promise<CardServiceResult<Flashcard>> {
    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      try {
        const card = await prisma.card.findUnique({
          where: { id },
        })

        if (card) {
          return {
            success: true,
            data: prismaToFlashcard(card),
            source: 'database',
          }
        }
      } catch (error) {
        console.error('Database query failed, falling back to mock:', error)
      }
    }

    // Fallback to mock
    const card = sampleFlashcards.find(c => c.id === id)
    if (card) {
      return {
        success: true,
        data: card,
        source: 'mock',
      }
    }

    return {
      success: false,
      error: 'Card not found',
      source: dbAvailable ? 'database' : 'mock',
    }
  },

  /**
   * Create a new card
   */
  async createCard(data: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>): Promise<CardServiceResult<Flashcard>> {
    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      try {
        const card = await prisma.card.create({
          data: {
            type: mapCardTypeToPrisma(data.type),
            title: data.title,
            scenario: data.scenario,
            tone: data.tone,
            difficulty: mapDifficultyToPrisma(data.difficulty),
            status: mapStatusToPrisma(data.status),
            essentialPhrases: data.essentialPhrases as object,
            upgrades: data.upgrades as object,
            practice: data.practice ? (data.practice as object) : undefined,
            metadata: data.metadata ? (data.metadata as object) : undefined,
            reviewCount: data.reviewCount ?? 0,
            correctCount: data.correctCount ?? 0,
            averageQualityScore: data.averageQualityScore ?? 0,
            totalStudyTime: data.totalStudyTime ?? 0,
            isDeleted: false,
            isPublic: true,
          },
        })

        return {
          success: true,
          data: prismaToFlashcard(card),
          source: 'database',
        }
      } catch (error) {
        console.error('Database create failed:', error)
        return {
          success: false,
          error: 'Failed to create card in database',
          source: 'database',
        }
      }
    }

    // Mock mode - can't create persistent cards
    return {
      success: false,
      error: 'Database not available. Cannot create cards in mock mode.',
      source: 'mock',
    }
  },

  /**
   * Update a card
   */
  async updateCard(id: string, data: Partial<Flashcard>): Promise<CardServiceResult<Flashcard>> {
    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      try {
        // Build update data with proper type conversions
        const updateData: Record<string, unknown> = {}

        if (data.title) updateData.title = data.title
        if (data.scenario) updateData.scenario = data.scenario
        if (data.tone !== undefined) updateData.tone = data.tone
        if (data.difficulty) updateData.difficulty = mapDifficultyToPrisma(data.difficulty)
        if (data.status) updateData.status = mapStatusToPrisma(data.status)
        if (data.essentialPhrases) updateData.essentialPhrases = data.essentialPhrases as object
        if (data.upgrades) updateData.upgrades = data.upgrades as object
        if (data.practice !== undefined) updateData.practice = data.practice ? (data.practice as object) : null
        if (data.metadata !== undefined) updateData.metadata = data.metadata ? (data.metadata as object) : null
        if (data.reviewCount !== undefined) updateData.reviewCount = data.reviewCount
        if (data.correctCount !== undefined) updateData.correctCount = data.correctCount
        if (data.averageQualityScore !== undefined) updateData.averageQualityScore = data.averageQualityScore
        if (data.totalStudyTime !== undefined) updateData.totalStudyTime = data.totalStudyTime
        if (data.lastReviewedAt !== undefined) updateData.lastReviewedAt = data.lastReviewedAt
        if (data.nextReviewAt !== undefined) updateData.nextReviewAt = data.nextReviewAt

        const card = await prisma.card.update({
          where: { id },
          data: updateData,
        })

        return {
          success: true,
          data: prismaToFlashcard(card),
          source: 'database',
        }
      } catch (error) {
        console.error('Database update failed:', error)
        return {
          success: false,
          error: 'Failed to update card',
          source: 'database',
        }
      }
    }

    return {
      success: false,
      error: 'Database not available. Cannot update cards in mock mode.',
      source: 'mock',
    }
  },

  /**
   * Soft delete a card
   */
  async deleteCard(id: string): Promise<CardServiceResult<{ deleted: boolean }>> {
    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      try {
        await prisma.card.update({
          where: { id },
          data: { isDeleted: true },
        })

        return {
          success: true,
          data: { deleted: true },
          source: 'database',
        }
      } catch (error) {
        console.error('Database delete failed:', error)
        return {
          success: false,
          error: 'Failed to delete card',
          source: 'database',
        }
      }
    }

    return {
      success: false,
      error: 'Database not available. Cannot delete cards in mock mode.',
      source: 'mock',
    }
  },
}
