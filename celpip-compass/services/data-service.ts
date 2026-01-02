import { Flashcard, CardType, DifficultyLevel, CardStatus } from '@/types/flashcards';
import { sampleFlashcards, aiPrompts } from '@/data/sample-cards';

export class DataService {
  // 卡片数据管理
  static getAllCards(): Flashcard[] {
    return sampleFlashcards;
  }

  static getCardsByType(type: CardType): Flashcard[] {
    return sampleFlashcards.filter(card => card.type === type);
  }

  static getCardsByDifficulty(difficulty: DifficultyLevel): Flashcard[] {
    return sampleFlashcards.filter(card => card.difficulty === difficulty);
  }

  static getCardsByStatus(status: CardStatus): Flashcard[] {
    return sampleFlashcards.filter(card => card.status === status);
  }

  static getCardById(id: string): Flashcard | undefined {
    return sampleFlashcards.find(card => card.id === id);
  }

  static searchCards(query: string): Flashcard[] {
    const lowercaseQuery = query.toLowerCase();
    return sampleFlashcards.filter(card =>
      card.title.toLowerCase().includes(lowercaseQuery) ||
      card.scenario.toLowerCase().includes(lowercaseQuery) ||
      JSON.stringify(card.essentialPhrases).toLowerCase().includes(lowercaseQuery)
    );
  }

  static getCardsForReview(limit: number = 10): Flashcard[] {
    const now = new Date();
    return sampleFlashcards
      .filter(card =>
        (card.nextReviewAt && card.nextReviewAt <= now) ||
        (card.status === CardStatus.NEW)
      )
      .sort((a, b) => {
        // 优先显示新卡片，然后是到期复习的卡片
        if (a.status === CardStatus.NEW && b.status !== CardStatus.NEW) return -1;
        if (a.status !== CardStatus.NEW && b.status === CardStatus.NEW) return 1;

        // 都为新卡片时，按创建时间排序
        if (a.status === CardStatus.NEW && b.status === CardStatus.NEW) {
          return a.createdAt.getTime() - b.createdAt.getTime();
        }

        // 都为复习卡片时，按复习时间排序
        return (a.nextReviewAt?.getTime() || 0) - (b.nextReviewAt?.getTime() || 0);
      })
      .slice(0, limit);
  }

  // 统计数据
  static getStatistics() {
    const total = sampleFlashcards.length;
    const byType = sampleFlashcards.reduce((acc, card) => {
      acc[card.type] = (acc[card.type] || 0) + 1;
      return acc;
    }, {} as Record<CardType, number>);

    const byDifficulty = sampleFlashcards.reduce((acc, card) => {
      acc[card.difficulty] = (acc[card.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<DifficultyLevel, number>);

    const byStatus = sampleFlashcards.reduce((acc, card) => {
      acc[card.status] = (acc[card.status] || 0) + 1;
      return acc;
    }, {} as Record<CardStatus, number>);

    const newCards = sampleFlashcards.filter(card => card.status === CardStatus.NEW).length;
    const inProgress = sampleFlashcards.filter(card =>
      card.status === CardStatus.LEARNING || card.status === CardStatus.REVIEW
    ).length;
    const mastered = sampleFlashcards.filter(card => card.status === CardStatus.MASTERED).length;

    return {
      total,
      byType,
      byDifficulty,
      byStatus,
      newCards,
      inProgress,
      mastered
    };
  }

  // AI Prompt 管理
  static getAiPrompts() {
    return aiPrompts;
  }

  static getPromptsByCategory(category: string) {
    return aiPrompts.find(p => p.category === category)?.prompts || [];
  }

  static getPromptById(id: string) {
    for (const category of aiPrompts) {
      const prompt = category.prompts.find(p => p.id === id);
      if (prompt) return prompt;
    }
    return undefined;
  }

  // 数据导出（用于备份）
  static exportData() {
    return {
      cards: sampleFlashcards,
      prompts: aiPrompts,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  // 示例：获取卡片的学习建议
  static getStudyRecommendations() {
    const stats = this.getStatistics();
    const recommendations = [];

    if (stats.newCards > stats.total * 0.6) {
      recommendations.push('建议先从新卡片开始学习，建立基础知识');
    }

    if (stats.inProgress > stats.total * 0.3) {
      recommendations.push('当前有较多卡片正在学习中，建议加强复习频率');
    }

    if (stats.mastered < stats.total * 0.2) {
      recommendations.push('已掌握的卡片较少，建议保持持续学习和复习');
    }

    const writingTasks = stats.byType[CardType.WRITING_TASK1] + stats.byType[CardType.WRITING_TASK2];
    const speakingTasks = stats.byType[CardType.SPEAKING_TASK];
    const listeningTasks = stats.byType[CardType.LISTENING_KEYWORD];

    if (writingTasks > speakingTasks + listeningTasks) {
      recommendations.push('写作卡片较多，建议增加口语和听力练习的比重');
    }

    return recommendations;
  }

  static updateCard(updatedCard: Flashcard): void {
    const index = sampleFlashcards.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      sampleFlashcards[index] = updatedCard;
    }
  }
}