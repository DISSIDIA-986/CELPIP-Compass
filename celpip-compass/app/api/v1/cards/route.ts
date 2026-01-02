import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CardType, DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';
import { cardService } from '@/services/card-service';

// Query parameters schema (Zod 4: z.enum() replaces z.nativeEnum())
const QuerySchema = z.object({
  type: z.enum(CardType).optional(),
  difficulty: z.enum(DifficultyLevel).optional(),
  status: z.enum(CardStatus).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0)
});

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = {
      type: searchParams.get('type') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      status: searchParams.get('status') || undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean),
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') || '20',
      offset: searchParams.get('offset') || '0'
    };

    const query = QuerySchema.parse(rawQuery);

    // Use cardService to get cards (database with mock fallback)
    const result = await cardService.getCards({
      type: query.type,
      difficulty: query.difficulty,
      status: query.status,
      tags: query.tags,
      search: query.search,
      limit: query.limit,
      offset: query.offset
    });

    if (!result.success || !result.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: result.error || 'Failed to fetch cards'
        }
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<{
      cards: Flashcard[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
      source: 'database' | 'mock';
    }> = {
      success: true,
      data: {
        ...result.data,
        source: result.source
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_QUERY_PARAMS',
          message: 'Invalid query parameters',
          details: error.issues
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.error('Cards GET error:', error);
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

    // Validation schema for creating new card (Zod 4: z.enum() for native enums)
    const cardSchema = z.object({
      type: z.enum(CardType),
      title: z.string().min(1),
      scenario: z.string().min(1),
      tone: z.string().optional(),
      difficulty: z.enum(DifficultyLevel).default(DifficultyLevel.CLB8),
      essentialPhrases: z.record(z.string(), z.array(z.string())),
      upgrades: z.object({
        vocabulary: z.record(z.string(), z.array(z.string())),
        structure: z.record(z.string(), z.string()).optional()
      }),
      practice: z.object({
        question: z.string(),
        keyPoints: z.array(z.string())
      }).optional()
    });

    const validatedData = cardSchema.parse(body);

    // Use cardService to create card (database with mock fallback)
    const result = await cardService.createCard({
      type: validatedData.type,
      title: validatedData.title,
      scenario: validatedData.scenario,
      tone: validatedData.tone,
      difficulty: validatedData.difficulty,
      status: CardStatus.NEW,
      essentialPhrases: validatedData.essentialPhrases,
      upgrades: validatedData.upgrades,
      practice: validatedData.practice,
      reviewCount: 0,
      correctCount: 0,
      averageQualityScore: 0,
      totalStudyTime: 0,
      isDeleted: false
    });

    if (!result.success || !result.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: result.error || 'Failed to create card'
        }
      };
      return NextResponse.json(response, { status: result.source === 'mock' ? 503 : 500 });
    }

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: result.data,
      message: 'Card created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST_BODY',
          message: 'Invalid request body',
          details: error.issues
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.error('Cards POST error:', error);
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
