import { NextRequest, NextResponse } from 'next/server';
import { CardType, DifficultyLevel, CardStatus, Flashcard } from '@/types/flashcards';
import { ApiResponse } from '@/types/auth';

// Simple mock data matching the main flashcard interface
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    type: CardType.WRITING,
    question: 'Write a formal email to your landlord about repair issues',
    answer: 'Dear Landlord, I hope this message finds you well. I am writing to inform you about several repair issues in my apartment that need attention. The kitchen faucet has been leaking for the past week, and the heating system is not working properly. Could you please arrange for a maintenance visit to address these matters? Thank you for your attention to this issue.',
    explanation: 'This email demonstrates formal language, clear description of problems, and polite request for action.',
    tags: ['formal', 'email', 'repairs', 'landlord'],
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
    question: 'Listen to a conversation about renting an apartment and answer: What are the important factors when choosing an apartment?',
    answer: 'Important factors include location, rent price, size of the apartment, amenities included, lease terms, and condition of the property.',
    explanation: 'This tests listening comprehension for identifying key points in a conversation about housing.',
    tags: ['listening', 'conversation', 'renting', 'housing'],
    difficulty: DifficultyLevel.BEGINNER,
    status: CardStatus.REVIEW,
    reviewCount: 5,
    correctCount: 4,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date(),
    nextReviewDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simple validation
    if (!body.cards || !Array.isArray(body.cards)) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Cards array is required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Get cards due for review
    const now = new Date();
    const cardsForReview = mockFlashcards.filter(card => {
      if (!card.nextReviewDate) return false;
      return card.nextReviewDate <= now && card.status !== CardStatus.MASTERED;
    });

    // Limit results
    const limit = body.limit || 10;
    const reviewedCards = cardsForReview.slice(0, limit);

    const response: ApiResponse<{
      cards: Flashcard[];
      totalCards: number;
      reviewCount: number;
    }> = {
      success: true,
      data: {
        cards: reviewedCards,
        totalCards: cardsForReview.length,
        reviewCount: reviewedCards.length
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Review route error:', error);
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