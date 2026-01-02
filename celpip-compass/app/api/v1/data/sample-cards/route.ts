import { NextRequest, NextResponse } from 'next/server';
import { CardType, DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';

// Simple mock data
const sampleFlashcards: Flashcard[] = [
  {
    id: '1',
    type: CardType.WRITING,
    question: 'Write a formal email to your landlord',
    answer: 'Dear Landlord, I hope this message finds you well...',
    explanation: 'Formal email with proper structure and tone.',
    tags: ['formal', 'email', 'landlord'],
    difficulty: DifficultyLevel.INTERMEDIATE,
    status: CardStatus.LEARNING,
    reviewCount: 1,
    correctCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const aiPrompts = [
  'Generate a CELPIP writing task about apartment rental',
  'Create a listening comprehension about job interviews',
  'Design a speaking prompt for describing a neighborhood'
];

// GET /api/v1/data/sample-cards - 获取示例卡片数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;

    // 根据类型过滤卡片
    let filteredCards = sampleFlashcards;
    if (type && type !== 'all') {
      filteredCards = sampleFlashcards.filter(card => card.type === type);
    }

    // 限制返回数量
    const cards = filteredCards.slice(0, limit);

    const response: ApiResponse<{
      cards: typeof cards;
      prompts: typeof aiPrompts;
      total: number;
    }> = {
      success: true,
      data: {
        cards,
        prompts: aiPrompts,
        total: filteredCards.length
      },
      message: 'Sample cards retrieved successfully'
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
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

// POST /api/v1/data/sample-cards/reset - 重置示例卡片数据
export async function POST() {
  try {
    // 这里将来可以连接到数据库来重置数据
    // 目前返回成功响应
    const response: ApiResponse<{ reset: boolean }> = {
      success: true,
      data: { reset: true },
      message: 'Sample cards reset successfully'
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
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