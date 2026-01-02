import { NextRequest, NextResponse } from 'next/server';
import { CardType, DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';

// Simple mock data
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    type: CardType.WRITING,
    question: 'Sample writing question',
    answer: 'Sample answer',
    explanation: 'This is a sample explanation.',
    tags: ['sample', 'writing'],
    difficulty: DifficultyLevel.INTERMEDIATE,
    status: CardStatus.LEARNING,
    reviewCount: 1,
    correctCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const card = mockFlashcards.find(c => c.id === id);

    if (!card) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: `Card with ID ${id} not found`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: card
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cardIndex = mockFlashcards.findIndex(c => c.id === id);

    if (cardIndex === -1) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: `Card with ID ${id} not found`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Simple update
    const updatedCard: Flashcard = {
      ...mockFlashcards[cardIndex],
      ...body,
      updatedAt: new Date()
    };

    mockFlashcards[cardIndex] = updatedCard;

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: updatedCard,
      message: 'Card updated successfully'
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cardIndex = mockFlashcards.findIndex(c => c.id === id);

    if (cardIndex === -1) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: `Card with ID ${id} not found`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Remove the card
    mockFlashcards.splice(cardIndex, 1);

    const response: ApiResponse<{ deleted: boolean }> = {
      success: true,
      data: { deleted: true },
      message: 'Card deleted successfully'
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