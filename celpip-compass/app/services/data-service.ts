import { Flashcard, FlashcardSet, CardType, DifficultyLevel } from '@/types/flashcards'

export class DataService {
  private flashcards: Flashcard[] = []
  private sets: FlashcardSet[] = []

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Mock flashcards for demonstration
    this.flashcards = [
      {
        id: '1',
        question: 'What is the past tense of "go"?',
        answer: 'Went',
        explanation: 'The past tense of "go" is "went".',
        example: 'I went to the store yesterday.',
        tags: ['grammar', 'verbs'],
        difficulty: DifficultyLevel.BEGINNER,
        type: CardType.GRAMMAR,
        status: 'learning' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        reviewCount: 3,
        correctCount: 2
      },
      {
        id: '2',
        question: 'What does "ubiquitous" mean?',
        answer: 'Present, appearing, or found everywhere',
        explanation: 'Something that is ubiquitous seems to be everywhere.',
        example: 'Smartphones have become ubiquitous in modern society.',
        tags: ['vocabulary', 'advanced'],
        difficulty: DifficultyLevel.ADVANCED,
        type: CardType.VOCABULARY,
        status: 'new' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        reviewCount: 0,
        correctCount: 0
      }
    ]

    this.sets = [
      {
        id: '1',
        title: 'Grammar Basics',
        description: 'Basic English grammar rules and examples',
        cards: this.flashcards.filter(card => card.type === CardType.GRAMMAR),
        tags: ['grammar', 'beginner'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }

  getFlashcards(): Flashcard[] {
    return this.flashcards
  }

  getFlashcardById(id: string): Flashcard | undefined {
    return this.flashcards.find(card => card.id === id)
  }

  getFlashcardsByType(type: CardType): Flashcard[] {
    return this.flashcards.filter(card => card.type === type)
  }

  getFlashcardsByDifficulty(difficulty: DifficultyLevel): Flashcard[] {
    return this.flashcards.filter(card => card.difficulty === difficulty)
  }

  getFlashcardSets(): FlashcardSet[] {
    return this.sets
  }

  getFlashcardSetById(id: string): FlashcardSet | undefined {
    return this.sets.find(set => set.id === id)
  }

  searchFlashcards(query: string): Flashcard[] {
    const lowercaseQuery = query.toLowerCase()
    return this.flashcards.filter(card =>
      card.question.toLowerCase().includes(lowercaseQuery) ||
      card.answer.toLowerCase().includes(lowercaseQuery) ||
      card.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  addFlashcard(card: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>): Flashcard {
    const newCard: Flashcard = {
      ...card,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.flashcards.push(newCard)
    return newCard
  }

  updateFlashcard(id: string, updates: Partial<Flashcard>): Flashcard | null {
    const index = this.flashcards.findIndex(card => card.id === id)
    if (index === -1) return null

    this.flashcards[index] = {
      ...this.flashcards[index],
      ...updates,
      updatedAt: new Date()
    }
    return this.flashcards[index]
  }

  deleteFlashcard(id: string): boolean {
    const index = this.flashcards.findIndex(card => card.id === id)
    if (index === -1) return false

    this.flashcards.splice(index, 1)
    return true
  }

  getStudyRecommendations(): string[] {
    return [
      '每天至少练习10个新卡片',
      '重点复习错误率高的卡片',
      '结合实际生活场景进行练习',
      '定期复习已掌握的卡片以保持记忆',
      '尝试用不同方式表达相同的意思'
    ]
  }
}

export const dataService = new DataService()