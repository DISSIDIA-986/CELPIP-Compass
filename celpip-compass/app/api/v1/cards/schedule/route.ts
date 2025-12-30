import { NextRequest, NextResponse } from 'next/server';
import { CardType, CardStatus, ApiResponse } from '@/types/flashcards';

// 模拟数据库
let mockFlashcards: any[] = [
  {
    id: '1',
    type: CardType.WRITING_TASK1,
    title: '向邻居投诉噪音问题',
    scenario: '邻居在夜间产生过多噪音，影响休息',
    tone: 'semi-formal',
    difficulty: 'clb8',
    status: CardStatus.LEARNING,
    essentialPhrases: {
      opening: ['I hope this message finds you well.', 'I\'m writing to discuss a matter that\'s been concerning me.', 'I would appreciate it if we could address this issue.'],
      purpose: ['The main reason for my message is to address the noise issue.', 'I wanted to bring to your attention the excessive noise during evenings.', 'My concern is about the disturbance this is causing.'],
      details: ['The noise typically starts around 10 PM and continues until midnight.', 'It\'s making it difficult for me to sleep and focus during work.', 'I\'ve noticed this has been happening for the past two weeks.'],
      closing: ['I would be grateful if we could find a solution to this matter.', 'Thank you for your understanding and cooperation.', 'I look forward to your response.']
    },
    upgrades: {
      vocabulary: {
        'noisy': ['excessive', 'disturbing', 'intrusive']
      }
    },
    practice: {
      question: 'Write an email to your neighbor about noise disturbance during evenings.',
      keyPoints: ['specific times', 'impact on you', 'requested solution', 'polite tone']
    },
    reviewCount: 3,
    correctCount: 2,
    averageQualityScore: 4.2,
    metadata: {
      ease: 2.5,
      interval: 3,
      repetitions: 2,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    nextReviewAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  },
  {
    id: '2',
    type: CardType.WRITING_TASK2,
    title: '远程工作的优势',
    scenario: '讨论远程工作对员工和雇主的积极影响',
    difficulty: 'clb8',
    status: CardStatus.NEW,
    essentialPhrases: {
      introduction: ['The concept of remote work has revolutionized...', ...],
      topicSentence: ['One primary advantage of remote work is...', ...],
      supporting: ['Employees gain the ability to structure...', ...],
      examples: ['For instance, parents can attend to...', ...],
      conclusion: ['In conclusion, the advantages of working...', ...]
    },
    reviewCount: 0,
    correctCount: 0,
    averageQualityScore: 0,
    metadata: {
      ease: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: new Date()
    },
    nextReviewAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false
  }
];

// GET /api/v1/cards/schedule - 获取复习计划
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const includeNew = searchParams.get('includeNew') === 'true';

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // 过滤待复习的卡片
    const dueCards = mockFlashcards
      .filter(card => !card.isDeleted)
      .filter(card => {
        // 包含到期的复习和新卡片
        const isDue = card.nextReviewAt && card.nextReviewAt <= now;
        const isNew = card.status === CardStatus.NEW && includeNew;
        return isDue || isNew;
      })
      .sort((a, b) => {
        // 优先级排序：到期日期在前，新卡片在后
        if (a.nextReviewAt && b.nextReviewAt) {
          return a.nextReviewAt.getTime() - b.nextReviewAt.getTime();
        }
        if (a.nextReviewAt && !b.nextReviewAt) return -1;
        if (!a.nextReviewAt && b.nextReviewAt) return 1;
        return 0;
      })
      .slice(0, limit);

    // 生成复习计划
    const schedule = dueCards.map(card => {
      let reviewType: 'review' | 'new' = 'review';
      let priority = 1;

      if (card.status === CardStatus.NEW) {
        reviewType = 'new';
        priority = 1;
      } else {
        // 根据复习次数和难度计算优先级
        const streakCount = Math.floor(card.reviewCount / 3);
        priority = streakCount + (card.difficulty === 'clb9' ? 2 : card.difficulty === 'clb8' ? 1 : 0);
      }

      return {
        cardId: card.id,
        type: card.type,
        title: card.title,
        reviewType,
        dueDate: card.nextReviewAt || card.createdAt,
        priority,
        streakCount: Math.floor(card.reviewCount / 3),
        estimatedTime: card.type.includes('writing') ? 300 : 120 // 写作5分钟，其他2分钟
      };
    });

    // 计算统计信息
    const todayCount = dueCards.filter(card =>
      card.nextReviewAt && card.nextReviewAt <= now
    ).length;

    const tomorrowCount = dueCards.filter(card =>
      card.nextReviewAt &&
      card.nextReviewAt > now &&
      card.nextReviewAt <= tomorrow
    ).length;

    const newAvailableCount = dueCards.filter(card =>
      card.status === CardStatus.NEW
    ).length;

    const totalPending = mockFlashcards.filter(card =>
      !card.isDeleted && (
        (card.nextReviewAt && card.nextReviewAt <= now) ||
        (card.status === CardStatus.NEW && includeNew)
      )
    ).length;

    const response: ApiResponse<{
      schedule: typeof schedule;
      summary: {
        dueToday: number;
        dueTomorrow: number;
        newAvailable: number;
        totalPending: number;
      };
    }> = {
      success: true,
      data: {
        schedule,
        summary: {
          dueToday: todayCount,
          dueTomorrow: tomorrowCount,
          newAvailable: newAvailableCount,
          totalPending
        }
      }
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