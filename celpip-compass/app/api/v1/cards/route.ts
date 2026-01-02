import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CardType, DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';

// Simple mock data
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    type: CardType.WRITING,
    question: 'Write a formal email to your landlord',
    answer: 'Dear Landlord, I hope this message finds you well...',
    explanation: 'Formal email with proper structure and tone.',
    tags: ['formal', 'email', 'landlord'],
    difficulty: DifficultyLevel.INTERMEDIATE,
    status: CardStatus.LEARNING,
    reviewCount: 2,
    correctCount: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    nextReviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: CardType.LISTENING,
    question: 'Listen to conversation about apartment hunting',
    answer: 'The conversation discusses important factors when choosing an apartment.',
    explanation: 'Listening comprehension for everyday conversations.',
    tags: ['listening', 'conversation', 'apartment'],
    difficulty: DifficultyLevel.BEGINNER,
    status: CardStatus.REVIEW,
    reviewCount: 4,
    correctCount: 3,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date()
  }
];

// Query parameters schema
const QuerySchema = z.object({
  type: z.enum(Object.values(CardType)).optional(),
  difficulty: z.enum(Object.values(DifficultyLevel)).optional(),
  status: z.enum(Object.values(CardStatus)).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0)
});

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = QuerySchema.parse({
      type: searchParams.get('type') as any,
      difficulty: searchParams.get('difficulty') as any,
      status: searchParams.get('status') as any,
      tags: searchParams.get('tags')?.split(','),
      search: searchParams.get('search'),
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0')
    });

    // Filter cards
    let filteredCards = [...mockFlashcards];

    if (query.type) {
      filteredCards = filteredCards.filter(card => card.type === query.type);
    }

    if (query.difficulty) {
      filteredCards = filteredCards.filter(card => card.difficulty === query.difficulty);
    }

    if (query.status) {
      filteredCards = filteredCards.filter(card => card.status === query.status);
    }

    if (query.tags && query.tags.length > 0) {
      filteredCards = filteredCards.filter(card =>
        query.tags!.some(tag => card.tags.includes(tag))
      );
    }

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredCards = filteredCards.filter(card =>
        card.question.toLowerCase().includes(searchTerm) ||
        card.answer.toLowerCase().includes(searchTerm) ||
        card.explanation?.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const total = filteredCards.length;
    const startIndex = query.offset;
    const endIndex = startIndex + query.limit;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);

    const response: ApiResponse<{
      cards: Flashcard[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        cards: paginatedCards,
        total,
        page: Math.floor(startIndex / query.limit) + 1,
        pageSize: query.limit,
        totalPages: Math.ceil(total / query.limit)
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_QUERY_PARAMS',
          message: 'Invalid query parameters'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simple validation
    const cardSchema = z.object({
      type: z.nativeEnum(CardType),
      question: z.string().min(1),
      answer: z.string().min(1),
      explanation: z.string().optional(),
      tags: z.array(z.string()).default([]),
      difficulty: z.nativeEnum(DifficultyLevel).default(DifficultyLevel.INTERMEDIATE)
    });

    const validatedData = cardSchema.parse(body);

    // Create new card
    const newCard: Flashcard = {
      id: Math.random().toString(36).substr(2, 9),
      type: validatedData.type,
      question: validatedData.question,
      answer: validatedData.answer,
      explanation: validatedData.explanation,
      tags: validatedData.tags,
      difficulty: validatedData.difficulty,
      status: CardStatus.NEW,
      reviewCount: 0,
      correctCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockFlashcards.push(newCard);

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: newCard,
      message: 'Card created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST_BODY',
          message: 'Invalid request body'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    };
    return NextResponse.json(response, { status: 500 });
  }
}