export interface Flashcard {
  id: string
  question: string
  answer: string
  explanation?: string
  example?: string
  tags: string[]
  difficulty: DifficultyLevel
  type: CardType
  status: CardStatus
  createdAt: Date
  updatedAt: Date
  nextReviewDate?: Date
  reviewCount: number
  correctCount: number
}

export enum CardType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  READING = 'reading',
  LISTENING = 'listening',
  WRITING = 'writing',
  SPEAKING = 'speaking'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum CardStatus {
  NEW = 'new',
  LEARNING = 'learning',
  REVIEW = 'review',
  MASTERED = 'mastered'
}

export interface FlashcardSet {
  id: string
  title: string
  description: string
  cards: Flashcard[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface FlashcardProgress {
  flashcardId: string
  quality: number
  interval: number
  repetitions: number
  nextReviewDate: Date
}