import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';
import { cardService } from '@/services/card-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use cardService to get card by ID (database with mock fallback)
    const result = await cardService.getCardById(id);

    if (!result.success || !result.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: `Card with ID ${id} not found`
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Flashcard & { source: 'database' | 'mock' }> = {
      success: true,
      data: {
        ...result.data,
        source: result.source
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Card GET error:', error);
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

// Update schema (Zod 4: z.enum() for native enums, z.record() with key type)
const UpdateCardSchema = z.object({
  title: z.string().min(1).optional(),
  scenario: z.string().optional(),
  tone: z.string().optional(),
  difficulty: z.enum(DifficultyLevel).optional(),
  status: z.enum(CardStatus).optional(),
  essentialPhrases: z.record(z.string(), z.array(z.string())).optional(),
  upgrades: z.object({
    vocabulary: z.record(z.string(), z.array(z.string())),
    structure: z.record(z.string(), z.string()).optional()
  }).optional(),
  practice: z.object({
    question: z.string(),
    keyPoints: z.array(z.string())
  }).optional()
}).partial();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate update data
    const validatedData = UpdateCardSchema.parse(body);

    // Use cardService to update card (database with mock fallback)
    const result = await cardService.updateCard(id, {
      ...(validatedData.title !== undefined && { title: validatedData.title }),
      ...(validatedData.scenario !== undefined && { scenario: validatedData.scenario }),
      ...(validatedData.tone !== undefined && { tone: validatedData.tone }),
      ...(validatedData.difficulty !== undefined && { difficulty: validatedData.difficulty }),
      ...(validatedData.status !== undefined && { status: validatedData.status }),
      ...(validatedData.essentialPhrases !== undefined && { essentialPhrases: validatedData.essentialPhrases as Flashcard['essentialPhrases'] }),
      ...(validatedData.upgrades !== undefined && { upgrades: validatedData.upgrades as Flashcard['upgrades'] }),
      ...(validatedData.practice !== undefined && { practice: validatedData.practice })
    });

    if (!result.success || !result.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: result.error === 'Card not found' ? 'CARD_NOT_FOUND' : 'UPDATE_ERROR',
          message: result.error || `Failed to update card with ID ${id}`
        }
      };
      return NextResponse.json(response, { status: result.error === 'Card not found' ? 404 : 500 });
    }

    const response: ApiResponse<Flashcard> = {
      success: true,
      data: result.data,
      message: 'Card updated successfully'
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST_BODY',
          message: 'Invalid update data',
          details: error.issues
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.error('Card PUT error:', error);
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

    // Use cardService to delete card (database with mock fallback)
    const result = await cardService.deleteCard(id);

    if (!result.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: result.error === 'Card not found' ? 'CARD_NOT_FOUND' : 'DELETE_ERROR',
          message: result.error || `Failed to delete card with ID ${id}`
        }
      };
      return NextResponse.json(response, { status: result.error === 'Card not found' ? 404 : 500 });
    }

    const response: ApiResponse<{ deleted: boolean; id: string }> = {
      success: true,
      data: { deleted: true, id },
      message: 'Card deleted successfully'
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Card DELETE error:', error);
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
