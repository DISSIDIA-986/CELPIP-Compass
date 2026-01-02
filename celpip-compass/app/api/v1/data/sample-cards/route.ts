import { NextRequest, NextResponse } from 'next/server';
import { Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';
import { sampleFlashcards, aiPrompts } from '@/data/sample-cards';

// GET /api/v1/data/sample-cards - 获取示例卡片数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;

    // 根据类型过滤卡片
    let filteredCards: Flashcard[] = sampleFlashcards;
    if (type && type !== 'all') {
      filteredCards = sampleFlashcards.filter(card => card.type === type);
    }

    // 限制返回数量
    const cards = filteredCards.slice(0, limit);

    const response: ApiResponse<{
      cards: Flashcard[];
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
