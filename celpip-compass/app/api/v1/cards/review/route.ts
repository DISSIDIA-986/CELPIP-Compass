import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CardStatus, Flashcard, QualityScores } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';
import { cardService } from '@/services/card-service';
import { SpacedRepetitionService } from '@/services/spaced-repetition-service';

// Review request schema
const ReviewSchema = z.object({
  cardId: z.string().min(1),
  quality: z.number().min(0).max(5),
  scores: z.object({
    accuracy: z.number().min(0).max(5),
    fluency: z.number().min(0).max(5),
    completeness: z.number().min(0).max(5),
    pronunciation: z.number().min(0).max(5).optional(),
    structure: z.number().min(0).max(5).optional()
  }).optional(),
  timeTaken: z.number().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ReviewSchema.parse(body);

    // Get the card using cardService
    const cardResult = await cardService.getCardById(validatedData.cardId);

    if (!cardResult.success || !cardResult.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'CARD_NOT_FOUND',
          message: 'Card not found'
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    const card = cardResult.data;

    // Calculate overall quality from scores if provided
    let overallQuality = validatedData.quality;
    if (validatedData.scores) {
      const scores: QualityScores = {
        accuracy: validatedData.scores.accuracy,
        fluency: validatedData.scores.fluency,
        completeness: validatedData.scores.completeness,
        pronunciation: validatedData.scores.pronunciation,
        structure: validatedData.scores.structure
      };
      overallQuality = SpacedRepetitionService.calculateOverallQuality(scores, card.type);
    }

    // Calculate next review using SM2 algorithm
    const updatedMetadata = SpacedRepetitionService.calculateNextReview(card, overallQuality);
    const newStatus = SpacedRepetitionService.updateCardStatus(card, overallQuality);

    // Calculate new average score
    const newAverageScore = card.reviewCount === 0
      ? overallQuality
      : Math.round(((card.averageQualityScore * card.reviewCount) + overallQuality) / (card.reviewCount + 1) * 10) / 10;

    // Update card using cardService
    const updateResult = await cardService.updateCard(validatedData.cardId, {
      metadata: updatedMetadata,
      nextReviewAt: updatedMetadata.dueDate,
      lastReviewedAt: new Date(),
      reviewCount: card.reviewCount + 1,
      correctCount: overallQuality >= 3 ? card.correctCount + 1 : card.correctCount,
      averageQualityScore: newAverageScore,
      totalStudyTime: card.totalStudyTime + (validatedData.timeTaken || 0),
      status: newStatus
    });

    if (!updateResult.success || !updateResult.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: updateResult.error || 'Failed to update card after review'
        }
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<{
      card: Flashcard;
      nextReviewDate: Date;
      interval: number;
      message: string;
      source: 'database' | 'mock';
    }> = {
      success: true,
      data: {
        card: updateResult.data,
        nextReviewDate: updatedMetadata.dueDate,
        interval: updatedMetadata.interval,
        message: getReviewMessage(overallQuality, newStatus),
        source: updateResult.source
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Invalid review data',
          details: error.issues
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.error('Review POST error:', error);
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

// GET - Get cards due for review
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const includeNew = searchParams.get('includeNew') !== 'false';

    // Get all cards using cardService
    const cardsResult = await cardService.getCards({ limit: 100 });

    if (!cardsResult.success || !cardsResult.data) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: cardsResult.error || 'Failed to fetch cards'
        }
      };
      return NextResponse.json(response, { status: 500 });
    }

    // Filter cards for review using SpacedRepetitionService
    const cardsForReview = SpacedRepetitionService.getCardsForReview(
      cardsResult.data.cards,
      limit,
      includeNew
    );

    const response: ApiResponse<{
      cards: Flashcard[];
      totalDue: number;
      reviewCount: number;
      source: 'database' | 'mock';
    }> = {
      success: true,
      data: {
        cards: cardsForReview,
        totalDue: cardsForReview.length,
        reviewCount: cardsForReview.length,
        source: cardsResult.source
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Review GET error:', error);
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

// Helper functions
function getReviewMessage(quality: number, status: CardStatus): string {
  if (quality >= 4.5) {
    return status === CardStatus.MASTERED
      ? '太棒了！这张卡片已掌握！'
      : '完美回忆！继续保持！';
  } else if (quality >= 3) {
    return '不错的回答！下次会更好！';
  } else if (quality >= 2) {
    return '需要更多练习，别气馁！';
  } else {
    return '这张卡片需要重点复习！';
  }
}
