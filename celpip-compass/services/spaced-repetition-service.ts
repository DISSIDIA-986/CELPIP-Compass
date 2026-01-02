import { Flashcard, CardType, DifficultyLevel, CardStatus, SpacedRepetitionMetadata, QualityScores } from '@/types/flashcards';

/**
 * 间隔重复算法服务
 * 基于 SM2 (SuperMemo 2) 算法的优化版本
 */
export class SpacedRepetitionService {
  /**
   * 计算下次复习日期（基于 SM2 算法）
   * @param card 当前卡片
   * @param quality 质量评分 (0-5)
   * @returns 更新后的卡片元数据
   */
  static calculateNextReview(card: Flashcard, quality: number): SpacedRepetitionMetadata {
    const ease = card.metadata?.ease || 2.5;
    const interval = card.metadata?.interval || 0;
    const repetitions = card.metadata?.repetitions || 0;

    let newInterval: number;
    let newRepetitions: number;
    let newEase: number;

    // SM2 算法核心逻辑
    if (quality >= 3) {
      // 答案正确
      newRepetitions = repetitions + 1;

      if (repetitions === 0) {
        newInterval = 1; // 第一次复习：1天后
      } else if (repetitions === 1) {
        newInterval = 6; // 第二次复习：6天后
      } else {
        newInterval = Math.round(interval * ease); // 后续复习：间隔 * 难度系数
      }

      newEase = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    } else {
      // 答案错误
      newRepetitions = 0;
      newInterval = 1; // 重置为1天后
      newEase = Math.max(1.3, ease - 0.2);
    }

    // 设置下次复习日期
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + newInterval);

    return {
      ease: newEase,
      interval: newInterval,
      repetitions: newRepetitions,
      dueDate
    };
  }

  /**
   * 根据质量评分更新卡片状态
   * @param card 当前卡片
   * @param quality 质量评分
   * @returns 更新后的卡片状态
   */
  static updateCardStatus(card: Flashcard, quality: number): CardStatus {
    const avgScore = card.averageQualityScore;
    const reviewCount = card.reviewCount;

    if (quality >= 4.5 && avgScore >= 4.0) {
      return CardStatus.MASTERED;
    } else if (reviewCount >= 3 && avgScore >= 3.0) {
      return CardStatus.REVIEW;
    } else if (quality >= 3.0) {
      return CardStatus.LEARNING;
    } else {
      return CardStatus.LEARNING; // 继续学习
    }
  }

  /**
   * 计算综合质量分数
   * @param scores 各维度评分
   * @returns 综合质量分数 (0-5)
   */
  static calculateOverallQuality(scores: QualityScores, cardType?: CardType): number {
    const weights = {
      accuracy: 0.3,      // 准确性权重
      fluency: 0.3,      // 流利度权重
      completeness: 0.2, // 完整性权重
      pronunciation: 0.1, // 发音权重（口语）
      structure: 0.1     // 结构权重（写作）
    };

    // 根据卡片类型调整权重
    if (cardType && this.isSpeakingCard(cardType)) {
      // 口语卡片：发音更重要
      weights.pronunciation = 0.2;
      weights.structure = 0;
    } else if (cardType && this.isWritingCard(cardType)) {
      // 写作卡片：结构更重要
      weights.structure = 0.2;
      weights.pronunciation = 0;
    } else {
      // 听力卡片：不需要发音和结构
      weights.pronunciation = 0;
      weights.structure = 0;
      weights.completeness = 0.4;
    }

    const overall =
      scores.accuracy * weights.accuracy +
      scores.fluency * weights.fluency +
      scores.completeness * weights.completeness +
      (scores.pronunciation || 0) * weights.pronunciation +
      (scores.structure || 0) * weights.structure;

    return Math.round(overall * 10) / 10; // 保留一位小数
  }

  /**
   * 获取需要复习的卡片
   * @param cards 所有卡片
   * @param limit 数量限制
   * @param includeNew 是否包含新卡片
   * @returns 需要复习的卡片列表
   */
  static getCardsForReview(
    cards: Flashcard[],
    limit: number = 20,
    includeNew: boolean = true
  ): Flashcard[] {
    const now = new Date();

    return cards
      .filter(card => !card.isDeleted)
      .filter(card => {
        const isDue = card.nextReviewAt && card.nextReviewAt <= now;
        const isNew = card.status === CardStatus.NEW && includeNew;
        return isDue || isNew;
      })
      .sort((a, b) => {
        // 优先级排序算法
        const aPriority = this.calculatePriority(a, now);
        const bPriority = this.calculatePriority(b, now);

        if (aPriority !== bPriority) {
          return aPriority - bPriority; // 优先级高的在前
        }

        // 同优先级按到期时间排序
        if (a.nextReviewAt && b.nextReviewAt) {
          return a.nextReviewAt.getTime() - b.nextReviewAt.getTime();
        }

        // 没有到期时间的（新卡片）排后面
        if (a.nextReviewAt) return -1;
        if (b.nextReviewAt) return 1;

        return 0;
      })
      .slice(0, limit);
  }

  /**
   * 计算卡片优先级
   * @param card 卡片
   * @param now 当前时间
   * @returns 优先级分数（越小越优先）
   */
  private static calculatePriority(card: Flashcard, now: Date): number {
    let priority = 0;

    // 1. 根据状态分配基础优先级
    switch (card.status) {
      case CardStatus.NEW:
        priority += 1;
        break;
      case CardStatus.LEARNING:
        priority += 10;
        break;
      case CardStatus.REVIEW:
        priority += 20;
        break;
      case CardStatus.MASTERED:
        priority += 100;
        break;
    }

    // 2. 根据难度调整优先级
    switch (card.difficulty) {
      case DifficultyLevel.CLB9:
        priority -= 5; // 高难度卡片优先级更高
        break;
      case DifficultyLevel.CLB8:
        priority -= 2; // 中等难度
        break;
      case DifficultyLevel.CLB7:
        priority += 0; // 基础难度
        break;
    }

    // 3. 根据逾期时间调整优先级
    if (card.nextReviewAt && card.nextReviewAt < now) {
      const overdueDays = Math.floor((now.getTime() - card.nextReviewAt.getTime()) / (1000 * 60 * 60 * 24));
      priority += overdueDays * 2; // 每逾期一天，优先级增加2
    }

    // 4. 根据复习次数调整（避免过度复习）
    if (card.reviewCount > 5) {
      priority += Math.log(card.reviewCount) * 5;
    }

    return priority;
  }

  /**
   * 判断是否为写作卡片
   */
  private static isWritingCard(type: CardType): boolean {
    return type === CardType.WRITING_TASK1 || type === CardType.WRITING_TASK2;
  }

  /**
   * 判断是否为口语卡片
   */
  private static isSpeakingCard(type: CardType): boolean {
    return type === CardType.SPEAKING_TASK;
  }

  /**
   * 获取学习统计信息
   * @param cards 卡片列表
   * @returns 统计信息
   */
  static getLearningStats(cards: Flashcard[]) {
    const total = cards.length;
    const now = new Date();

    const dueToday = cards.filter(card =>
      card.nextReviewAt &&
      card.nextReviewAt <= now &&
      card.nextReviewAt >= new Date(now.getTime() - 24 * 60 * 60 * 1000)
    ).length;

    const overdue = cards.filter(card =>
      card.nextReviewAt &&
      card.nextReviewAt < now
    ).length;

    const newCards = cards.filter(card =>
      card.status === CardStatus.NEW
    ).length;

    const learning = cards.filter(card =>
      card.status === CardStatus.LEARNING
    ).length;

    const review = cards.filter(card =>
      card.status === CardStatus.REVIEW
    ).length;

    const mastered = cards.filter(card =>
      card.status === CardStatus.MASTERED
    ).length;

    const totalReviews = cards.reduce((sum, card) => sum + card.reviewCount, 0);
    const totalAccuracy = cards.reduce((sum, card) =>
      sum + (card.reviewCount > 0 ? (card.correctCount / card.reviewCount) * 100 : 0), 0
    );

    return {
      total,
      dueToday,
      overdue,
      newCards,
      learning,
      review,
      mastered,
      avgAccuracy: totalReviews > 0 ? Math.round(totalAccuracy / total) : 0
    };
  }

  /**
   * 生成学习计划
   * @param cards 所有卡片
   * @param days 天数
   * @returns 每日复习计划
   */
  static generateStudyPlan(cards: Flashcard[], days: number = 7) {
    const plan: { [key: string]: Flashcard[] } = {};
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split('T')[0];

      const dailyCards = cards.filter(card => {
        return card.nextReviewAt &&
               card.nextReviewAt.toISOString().split('T')[0] === dateKey;
      });

      plan[dateKey] = dailyCards;
    }

    return plan;
  }

  /**
   * 导出学习数据
   * @param cards 卡片列表
   * @returns 导出数据
   */
  static exportLearningData(cards: Flashcard[]) {
    const stats = this.getLearningStats(cards);
    const plan = this.generateStudyPlan(cards);

    return {
      exportDate: new Date().toISOString(),
      statistics: stats,
      studyPlan: plan,
      cards: cards.map(card => ({
        id: card.id,
        title: card.title,
        type: card.type,
        status: card.status,
        reviewCount: card.reviewCount,
        averageQualityScore: card.averageQualityScore,
        nextReviewAt: card.nextReviewAt
      }))
    };
  }

  /**
   * 更新卡片学习进度（实例方法包装）
   */
  updateCardProgress(card: Flashcard, quality: number) {
    const metadata = SpacedRepetitionService.calculateNextReview(card, quality);
    const status = SpacedRepetitionService.updateCardStatus(card, quality);

    return {
      updatedCard: {
        ...card,
        metadata,
        status,
        nextReviewAt: metadata.dueDate
      },
      progress: {
        nextReviewDate: metadata.dueDate,
        interval: metadata.interval
      }
    };
  }

  /**
   * 获取学习统计（实例方法包装）
   */
  getLearningStats(cards: Flashcard[]) {
    const stats = SpacedRepetitionService.getLearningStats(cards);
    return {
      total: stats.total,
      masteredCards: stats.mastered,
      learningCards: stats.learning,
      reviewCards: stats.review,
      newCards: stats.newCards,
      averageAccuracy: stats.avgAccuracy,
      dueToday: stats.dueToday,
      overdue: stats.overdue
    };
  }

  /**
   * 获取需要复习的卡片（实例方法包装）
   */
  getCardsForReview(cards: Flashcard[], limit: number = 20, includeNew: boolean = true) {
    return SpacedRepetitionService.getCardsForReview(cards, limit, includeNew);
  }
}

// 导出实例用于向后兼容
export const spacedRepetitionService = new SpacedRepetitionService();