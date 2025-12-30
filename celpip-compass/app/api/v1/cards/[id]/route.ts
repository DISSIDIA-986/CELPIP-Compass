import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  CardType,
  DifficultyLevel,
  CardStatus,
  ApiResponse,
  Flashcard,
  QualityScores
} from '@/types/flashcards';

// 模拟数据库
let mockFlashcards: Flashcard[] = [
  {
    id: '1',
    type: CardType.WRITING_TASK1,
    title: '向邻居投诉噪音问题',
    scenario: '邻居在夜间产生过多噪音，影响休息',
    tone: 'semi-formal',
    difficulty: DifficultyLevel.CLB8,
    status: CardStatus.LEARNING,
    essentialPhrases: {
      opening: [
        'I hope this message finds you well.',
        'I\'m writing to discuss a matter that\'s been concerning me.',
        'I would appreciate it if we could address this issue.'
      ],
      purpose: [
        'The main reason for my message is to address the noise issue.',
        'I wanted to bring to your attention the excessive noise during evenings.',
        'My concern is about the disturbance this is causing.'
      ],
      details: [
        'The noise typically starts around 10 PM and continues until midnight.',
        'It\'s making it difficult for me to sleep and focus during work.',
        'I\'ve noticed this has been happening for the past two weeks.'
      ],
      closing: [
        'I would be grateful if we could find a solution to this matter.',
        'Thank you for your understanding and cooperation.',
        'I look forward to your response.'
      ]
    },
    upgrades: {
      vocabulary: {
        'noisy': ['excessive', 'disturbing', 'intrusive'],
        'problem': ['issue', 'concern', 'matter'],
        'make': ['cause', 'result in', 'lead to']
      },
      structure: {
        'I\'m worried about the noise.': 'I\'m deeply concerned about the excessive noise that has been occurring.',
        'Can you stop it?': 'I would greatly appreciate it if you could take measures to reduce the noise levels.'
      }
    },
    practice: {
      question: 'Write an email to your neighbor about noise disturbance during evenings.',
      keyPoints: ['specific times', 'impact on you', 'requested solution', 'polite tone']
    },
    reviewCount: 3,
    correctCount: 2,
    averageQualityScore: 4.2,
    totalStudyTime: 450,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  }
];

// GET /api/v1/cards/[id] - 获取单个卡片详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const card = mockFlashcards.find(c => c.id === params.id);

    if (!card) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: 'Card not found',
          details: `The card with ID ${params.id} does not exist or has been deleted.`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: card
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
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

// PUT /api/v1/cards/[id] - 更新卡片
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // 验证请求体
    const updateSchema = z.object({
      title: z.string().min(1).max(255).optional(),
      scenario: z.string().min(1).optional(),
      tone: z.string().optional(),
      difficulty: z.nativeEnum(DifficultyLevel).optional(),
      status: z.nativeEnum(CardStatus).optional(),
      essentialPhrases: z.object({
        opening: z.array(z.string()),
        purpose: z.array(z.string()).optional(),
        details: z.array(z.string()).optional(),
        closing: z.array(z.string()).optional()
      }).optional(),
      upgrades: z.object({
        vocabulary: z.record(z.string(), z.array(z.string())),
        structure: z.record(z.string(), z.string()).optional()
      }).optional(),
      practice: z.object({
        question: z.string(),
        keyPoints: z.array(z.string())
      }).optional(),
      tags: z.array(z.string()).optional()
    });

    const validatedData = updateSchema.parse(body);

    const cardIndex = mockFlashcards.findIndex(c => c.id === params.id);

    if (cardIndex === -1) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: 'Card not found',
          details: `The card with ID ${params.id} does not exist or has been deleted.`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 更新卡片
    const updatedCard: Flashcard = {
      ...mockFlashcards[cardIndex],
      ...validatedData,
      updatedAt: new Date()
    };

    mockFlashcards[cardIndex] = updatedCard;

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: updatedCard,
      message: 'Card updated successfully'
    };

    return NextResponse.json(response, { status: 200 });
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

// DELETE /api/v1/cards/[id] - 删除卡片
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardIndex = mockFlashcards.findIndex(c => c.id === params.id);

    if (cardIndex === -1) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: 'Card not found',
          details: `The card with ID ${params.id} does not exist or has been deleted.`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 软删除
    mockFlashcards[cardIndex].isDeleted = true;
    mockFlashcards[cardIndex].updatedAt = new Date();

    const response: ApiResponse<{ deleted: boolean }> = {
      success: true,
      data: { deleted: true },
      message: 'Card deleted successfully'
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
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