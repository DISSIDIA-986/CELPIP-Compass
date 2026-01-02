'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Flashcard, CardType, CardStatus } from '@/types/flashcards';
import { spacedRepetitionService } from '@/services/spaced-repetition-service';
import { dataService } from '@/services/data-service';
import { SampleCard } from '@/components/Cards/SampleCard';

interface StudySession {
  currentCard: Flashcard | null;
  sessionCards: Flashcard[];
  completedCards: Flashcard[];
  isSessionActive: boolean;
  currentQuality: number | null;
  showFeedback: boolean;
}

interface StudyStats {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  reviewCards: number;
  newCards: number;
  averageAccuracy: number;
  studyStreak: number;
}

export const StudyDashboard: React.FC = () => {
  const [session, setSession] = useState<StudySession>({
    currentCard: null,
    sessionCards: [],
    completedCards: [],
    isSessionActive: false,
    currentQuality: null,
    showFeedback: false
  });

  const [stats, setStats] = useState<StudyStats>({
    totalCards: 0,
    masteredCards: 0,
    learningCards: 0,
    reviewCards: 0,
    newCards: 0,
    averageAccuracy: 0,
    studyStreak: 0
  });

  const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
  const [sessionLimit, setSessionLimit] = useState<number>(10);
  const [studyMode, setStudyMode] = useState<'daily' | 'focused'>('daily');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Helper functions
  const calculateStudyStreak = (cards: Flashcard[]): number => {
    const recentReviews = cards.filter(card => {
      if (!card.nextReviewAt) return false;
      const daysSinceReview = (Date.now() - new Date(card.nextReviewAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceReview <= 7;
    });
    return Math.min(recentReviews.length, 7);
  };

  const updateStats = useCallback((cards: Flashcard[]) => {
    const learningStats = spacedRepetitionService.getLearningStats(cards);

    setStats({
      totalCards: learningStats.total,
      masteredCards: learningStats.masteredCards,
      learningCards: learningStats.learningCards,
      reviewCards: learningStats.reviewCards,
      newCards: learningStats.newCards,
      averageAccuracy: learningStats.averageAccuracy,
      studyStreak: calculateStudyStreak(cards)
    });
  }, []);


  const handleQualitySelect = (quality: number) => {
    if (!session.currentCard) return;

    const result = spacedRepetitionService.updateCardProgress(session.currentCard, quality);
    const updatedFlashcard = {
      ...session.currentCard,
      ...result.updatedCard,
      nextReviewAt: result.progress.nextReviewDate,
      reviewCount: session.currentCard.reviewCount + 1,
      status: result.updatedCard.status,
      lastReviewedAt: new Date()
    };

    const updatedCompletedCards = [...session.completedCards, updatedFlashcard];
    const remainingCards = session.sessionCards.filter(card => card.id !== session.currentCard?.id);

    let nextCard: Flashcard | null = null;
    if (remainingCards.length > 0) {
      nextCard = remainingCards[0];
    }

    setSession({
      currentCard: nextCard,
      sessionCards: remainingCards,
      completedCards: updatedCompletedCards,
      isSessionActive: remainingCards.length > 0,
      currentQuality: quality,
      showFeedback: true
    });

    // Save the updated card
    dataService.updateFlashcard(session.currentCard.id, updatedFlashcard);
  };

  const startNewSession = () => {
    loadStudyData();
  };

  const getPerformanceMessage = (quality: number): string => {
    if (quality >= 4.5) return "完美！继续保持这种水平！";
    if (quality >= 4.0) return "很好！你对这个知识点掌握得很好。";
    if (quality >= 3.0) return "不错！还可以再复习几次来巩固。";
    if (quality >= 2.0) return "需要加强，建议多加练习。";
    return "需要重点复习，不要灰心，继续努力！";
  };

  const getPerformanceColor = (quality: number): string => {
    if (quality >= 4.5) return "text-green-600 bg-green-50";
    if (quality >= 4.0) return "text-blue-600 bg-blue-50";
    if (quality >= 3.0) return "text-yellow-600 bg-yellow-50";
    if (quality >= 2.0) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  // Use useMemo for derived data computation
  const studyData = useMemo(() => {
    const allCards = dataService.getFlashcards();
    const filteredCards = selectedType === 'all'
      ? allCards
      : allCards.filter(card => card.type === selectedType);

    const cardsForReview = spacedRepetitionService.getCardsForReview(
      filteredCards,
      sessionLimit
    );

    return {
      cardsForReview,
      filteredCards
    };
  }, [selectedType, sessionLimit, refreshTrigger]);

  // Function to trigger data reload
  const loadStudyData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Initialize and reload study data when dependencies change
  useEffect(() => {
    // Wrap in async function to avoid synchronous setState in effect
    const initializeSession = async () => {
      const { cardsForReview, filteredCards } = studyData;

      // Use functional update to avoid dependency on session state
      setSession(prevSession => ({
        ...prevSession,
        sessionCards: cardsForReview,
        currentCard: cardsForReview.length > 0 ? cardsForReview[0] : null,
        isSessionActive: cardsForReview.length > 0,
        completedCards: []
      }));

      // Update stats separately after session update
      updateStats(filteredCards);
    };
    initializeSession();
  }, [studyData, updateStats]);

  const progressPercentage = session.sessionCards.length > 0
    ? ((session.sessionCards.length + session.completedCards.length) / (session.sessionCards.length + session.completedCards.length)) * 100
    : 0;

  const getCardTypeLabel = (type: CardType) => {
    switch (type) {
      case CardType.WRITING_TASK1:
        return '写作 Task 1';
      case CardType.WRITING_TASK2:
        return '写作 Task 2';
      case CardType.SPEAKING_TASK:
        return '口语';
      case CardType.LISTENING_KEYWORD:
        return '听力关键词';
      default:
        return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        {/* 头部统计信息 */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            CELPIP 学习中心
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            基于间隔重复算法的智能学习系统
          </p>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCards}</div>
              <div className="text-sm text-blue-600">总卡片</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.masteredCards}</div>
              <div className="text-sm text-green-600">已掌握</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.learningCards}</div>
              <div className="text-sm text-yellow-600">学习中</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.reviewCards}</div>
              <div className="text-sm text-purple-600">复习中</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{stats.newCards}</div>
              <div className="text-sm text-indigo-600">新卡片</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{stats.averageAccuracy}%</div>
              <div className="text-sm text-pink-600">正确率</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.studyStreak}</div>
              <div className="text-sm text-orange-600">连续天数</div>
            </div>
          </div>

          {/* 学习进度 */}
          {session.isSessionActive && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  本次学习进度
                </span>
                <span className="text-sm text-gray-500">
                  {session.completedCards.length} / {session.sessionCards.length + session.completedCards.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* 控制面板 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 卡片类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                学习类型
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as CardType | 'all')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部类型</option>
                <option value={CardType.WRITING_TASK1}>{getCardTypeLabel(CardType.WRITING_TASK1)}</option>
                <option value={CardType.WRITING_TASK2}>{getCardTypeLabel(CardType.WRITING_TASK2)}</option>
                <option value={CardType.SPEAKING_TASK}>{getCardTypeLabel(CardType.SPEAKING_TASK)}</option>
                <option value={CardType.LISTENING_KEYWORD}>{getCardTypeLabel(CardType.LISTENING_KEYWORD)}</option>
              </select>
            </div>

            {/* 学习模式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                学习模式
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStudyMode('daily')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    studyMode === 'daily'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  日常学习
                </button>
                <button
                  onClick={() => setStudyMode('focused')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    studyMode === 'focused'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  专注学习
                </button>
              </div>
            </div>

            {/* 会话设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                学习数量
              </label>
              <div className="flex gap-2">
                <select
                  value={sessionLimit}
                  onChange={(e) => setSessionLimit(parseInt(e.target.value))}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={5}>5张</option>
                  <option value={10}>10张</option>
                  <option value={15}>15张</option>
                  <option value={20}>20张</option>
                  <option value={30}>30张</option>
                </select>
                <button
                  onClick={startNewSession}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  开始学习
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 学习区域 */}
        {session.showFeedback && session.currentQuality && session.currentCard && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className={`p-4 rounded-lg mb-6 ${getPerformanceColor(session.currentQuality)}`}>
              <h3 className="font-semibold text-lg mb-2">
                学习反馈
              </h3>
              <p className="text-sm">
                {getPerformanceMessage(session.currentQuality)}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setSession(prev => ({ ...prev, showFeedback: false }))}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                继续学习
              </button>
            </div>
          </div>
        )}

        {/* 当前学习卡片 */}
        {!session.showFeedback && session.currentCard && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              当前卡片
            </h2>

            <SampleCard
              card={session.currentCard}
              showDetails={true}
            />

            {/* 质量评分选择 */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                请选择你对这张卡片掌握的程度
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[5, 4, 3, 2, 1].map((quality) => (
                  <button
                    key={quality}
                    onClick={() => handleQualitySelect(quality)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {quality}
                      </div>
                      <div className="text-sm text-gray-600">
                        {quality === 5 && "完美掌握"}
                        {quality === 4 && "很好掌握"}
                        {quality === 3 && "基本掌握"}
                        {quality === 2 && "需要加强"}
                        {quality === 1 && "需要重点复习"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 学习完成 */}
        {!session.currentCard && session.completedCards.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-4">
                学习完成！
              </div>
              <p className="text-lg text-gray-600 mb-6">
                本次学习已完成 {session.completedCards.length} 张卡片
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {session.completedCards.filter(c => c.status === CardStatus.MASTERED).length}
                  </div>
                  <div className="text-sm text-green-600">新掌握</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">
                    {Math.round(session.completedCards.reduce((sum: number, card: Flashcard) => sum + (card.correctCount / card.reviewCount) * 100, 0) / session.completedCards.length * 10) / 10}
                  </div>
                  <div className="text-sm text-blue-600">平均质量分</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {Math.round((session.completedCards.filter(c => (c.correctCount / c.reviewCount) * 100 >= 80).length / session.completedCards.length) * 100)}%
                  </div>
                  <div className="text-sm text-purple-600">优秀率</div>
                </div>
              </div>
              <button
                onClick={startNewSession}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                开始新的学习
              </button>
            </div>
          </div>
        )}

        {/* 无卡片可学 */}
        {!session.currentCard && session.sessionCards.length === 0 && session.completedCards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl text-gray-400 mb-4">
              📚
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              暂无需要学习的卡片
            </h3>
            <p className="text-gray-500 mb-6">
              所有卡片都已掌握，或者没有符合筛选条件的卡片
            </p>
            <button
              onClick={startNewSession}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              刷新卡片
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
