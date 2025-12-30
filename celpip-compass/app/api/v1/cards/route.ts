import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  CardType,
  DifficultyLevel,
  CardStatus,
  ApiResponse,
  PaginatedResponse,
  Flashcard
} from '@/types/flashcards';
import { DataService } from '@/services/data-service';

// 模拟数据库查询（实际项目中会连接真实数据库）
const mockFlashcards: Flashcard[] = DataService.getAllCards();

// 查询参数Schema
const QuerySchema = z.object({
  type: z.enum(Object.values(CardType)).optional(),
  difficulty: z.enum(Object.values(DifficultyLevel)).optional(),
  status: z.enum(Object.values(CardStatus)).optional(),
  tags: z.string().optional(),
  isDueForReview: z.string().optional().transform(val => val === 'true'),
  search: z.string().optional(),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
});

// GET /api/v1/cards - 获取卡片列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = QuerySchema.parse(Object.fromEntries(searchParams));

    // 过滤卡片
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

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredCards = filteredCards.filter(card =>
        card.title.toLowerCase().includes(searchTerm) ||
        card.scenario.toLowerCase().includes(searchTerm)
      );
    }

    if (query.isDueForReview) {
      const now = new Date();
      filteredCards = filteredCards.filter(card =>
        card.nextReviewAt && card.nextReviewAt <= now
      );
    }

    // 分页处理
    const total = filteredCards.length;
    const startIndex = query.offset || 0;
    const endIndex = startIndex + (query.limit || 20);
    const paginatedCards = filteredCards.slice(startIndex, endIndex);

    const response: ApiResponse<PaginatedResponse<Flashcard>> = {
      success: true,
      data: {
        items: paginatedCards,
        total,
        page: Math.floor(startIndex / (query.limit || 20)) + 1,
        pageSize: query.limit || 20,
        totalPages: Math.ceil(total / (query.limit || 20))
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
          details: error.errors
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

// POST /api/v1/cards - 创建新卡片
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证请求体
    const cardSchema = z.object({
      title: z.string().min(1).max(255),
      type: z.nativeEnum(CardType),
      scenario: z.string().min(1),
      tone: z.string().optional(),
      difficulty: z.nativeEnum(DifficultyLevel).default(DifficultyLevel.CLB8),
      essentialPhrases: z.object({
        opening: z.array(z.string()),
        purpose: z.array(z.string()).optional(),
        details: z.array(z.string()).optional(),
        closing: z.array(z.string()).optional()
      }),
      upgrades: z.object({
        vocabulary: z.record(z.string(), z.array(z.string())),
        structure: z.record(z.string(), z.string()).optional()
      }).optional(),
      practice: z.object({
        question: z.string(),
        keyPoints: z.array(z.string())
      }).optional(),
      tags: z.array(z.string()).default([])
    });

    const validatedData = cardSchema.parse(body);

    // 创建新卡片
    const newCard: Flashcard = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
      status: CardStatus.NEW,
      reviewCount: 0,
      correctCount: 0,
      averageQualityScore: 0,
      totalStudyTime: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
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
          message: 'Invalid request body',
          details: error.errors
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