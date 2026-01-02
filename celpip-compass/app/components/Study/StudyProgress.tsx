'use client';

import React, { useState } from 'react';
import { Flashcard, CardStatus } from '@/types/flashcards';
import { spacedRepetitionService } from '@/services/spaced-repetition-service';
import { dataService } from '@/services/data-service';

interface ProgressData {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  reviewCards: number;
  newCards: number;
  averageAccuracy: number;
  averageQualityScore: number;
  totalReviews: number;
  studyStreak: number;
  weeklyProgress: { date: string; completed: number; mastered: number }[];
  performanceByType: { type: string; total: number; mastered: number; averageScore: number }[];
  performanceByDifficulty: { difficulty: string; total: number; mastered: number; averageScore: number }[];
}

export const StudyProgress: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'all'>('week');
  // const [selectedType, setSelectedType] = useState<'all' | 'writing' | 'speaking' | 'listening'>('all');

  const calculateOverallAverageScore = (cards: Flashcard[]): number => {
    const cardsWithScores = cards.filter(card => card.reviewCount > 0);
    if (cardsWithScores.length === 0) return 0;
    const totalScore = cardsWithScores.reduce((sum, card) => sum + (card.correctCount / card.reviewCount) * 100, 0);
    return Math.round((totalScore / cardsWithScores.length) * 10) / 10;
  };

  const calculateStudyStreak = (cards: Flashcard[]): number => {
    const recentReviews = cards.filter(card => {
      if (!card.nextReviewDate) return false;
      const daysSinceReview = (Date.now() - card.nextReviewDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceReview <= 7;
    });
    return Math.min(recentReviews.length, 7);
  };

  const generateWeeklyProgress = () => {
    const progress = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];

      // Mock data - in real app, this would come from user review history
      progress.push({
        date: dateStr,
        completed: Math.floor(Math.random() * 10) + 1,
        mastered: Math.floor(Math.random() * 3)
      });
    }

    return progress;
  };

  const calculatePerformanceByType = (cards: Flashcard[]) => {
    const types = ['writing', 'speaking', 'listening'];
    return types.map(type => {
      const typeCards = cards.filter(card => {
        if (type === 'writing') return card.type.includes('WRITING');
        if (type === 'speaking') return card.type.includes('SPEAKING');
        if (type === 'listening') return card.type.includes('LISTENING');
        return false;
      });

      const mastered = typeCards.filter(card => card.status === CardStatus.MASTERED).length;
      const avgScore = typeCards.length > 0
        ? Math.round((typeCards.reduce((sum, card) => sum + (card.correctCount / card.reviewCount) * 100, 0) / typeCards.length) * 10) / 10
        : 0;

      return {
        type: type === 'writing' ? '写作' : type === 'speaking' ? '口语' : '听力',
        total: typeCards.length,
        mastered,
        averageScore: avgScore
      };
    });
  };

  const calculatePerformanceByDifficulty = (cards: Flashcard[]) => {
    const difficulties = ['clb7', 'clb8', 'clb9'];
    return difficulties.map(diff => {
      const diffCards = cards.filter(card => card.difficulty === diff);
      const mastered = diffCards.filter(card => card.status === CardStatus.MASTERED).length;
      const avgScore = diffCards.length > 0
        ? Math.round((diffCards.reduce((sum, card) => sum + (card.correctCount / card.reviewCount) * 100, 0) / diffCards.length) * 10) / 10
        : 0;

      return {
        difficulty: `CLB ${diff.slice(-1)}`,
        total: diffCards.length,
        mastered,
        averageScore: avgScore
      };
    });
  };

  
  // Initialize progress data
  React.useEffect(() => {
    const loadAndSetProgress = () => {
      const allCards = dataService.getFlashcards();
      const learningStats = spacedRepetitionService.getLearningStats(allCards);
      const weeklyProgress = generateWeeklyProgress();
      const performanceByType = calculatePerformanceByType(allCards);
      const performanceByDifficulty = calculatePerformanceByDifficulty(allCards);

      setProgressData({
        totalCards: learningStats.total,
        masteredCards: learningStats.masteredCards,
        learningCards: learningStats.learningCards,
        reviewCards: learningStats.reviewCards,
        newCards: learningStats.newCards,
        averageAccuracy: learningStats.averageAccuracy,
        averageQualityScore: calculateOverallAverageScore(allCards),
        totalReviews: allCards.reduce((sum, card) => sum + card.reviewCount, 0),
        studyStreak: calculateStudyStreak(allCards),
        weeklyProgress,
        performanceByType,
        performanceByDifficulty
      });
    };

    loadAndSetProgress();
  }, [selectedTimeRange]);

  const getMasteryPercentage = (total: number, mastered: number): number => {
    return total > 0 ? Math.round((mastered / total) * 100) : 0;
  };

  if (!progressData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        {/* 头部 */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            学习进度分析
          </h1>
          <p className="text-lg text-gray-600">
            查看你的详细学习数据和进步情况
          </p>

          {/* 时间范围选择 */}
          <div className="flex justify-center gap-2 mt-6">
            {[
              { key: 'week', label: '本周' },
              { key: 'month', label: '本月' },
              { key: 'all', label: '全部' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedTimeRange(key as 'week' | 'month' | 'all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeRange === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 总体统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.totalCards}</div>
            <div className="text-sm opacity-90">总学习卡片</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.masteredCards}</div>
            <div className="text-sm opacity-90">已掌握</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.learningCards}</div>
            <div className="text-sm opacity-90">学习中</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.totalReviews}</div>
            <div className="text-sm opacity-90">总复习次数</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.averageQualityScore}</div>
            <div className="text-sm opacity-90">平均质量分</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white">
            <div className="text-3xl font-bold mb-1">{progressData.studyStreak}</div>
            <div className="text-sm opacity-90">连续学习(天)</div>
          </div>
        </div>

        {/* 掌握率图表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 按类型掌握情况 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              按技能类型掌握情况
            </h3>
            <div className="space-y-4">
              {progressData.performanceByType.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{item.type}</span>
                    <span className="text-sm text-gray-600">
                      {item.mastered}/{item.total} ({getMasteryPercentage(item.total, item.mastered)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getMasteryPercentage(item.total, item.mastered)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">平均分: {item.averageScore}</span>
                    <span className="text-xs text-gray-500">
                      {getMasteryPercentage(item.total, item.mastered) >= 80 ? '优秀' :
                       getMasteryPercentage(item.total, item.mastered) >= 60 ? '良好' : '需加强'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 按难度掌握情况 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              按难度等级掌握情况
            </h3>
            <div className="space-y-4">
              {progressData.performanceByDifficulty.map((item, index) => {
                const mastery = getMasteryPercentage(item.total, item.mastered);
                const difficultyColor = item.difficulty === 'CLB 7' ? 'bg-green-500' :
                                      item.difficulty === 'CLB 8' ? 'bg-yellow-500' : 'bg-red-500';

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{item.difficulty}</span>
                      <span className="text-sm text-gray-600">
                        {item.mastered}/{item.total} ({mastery}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${difficultyColor} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${mastery}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">平均分: {item.averageScore}</span>
                      <span className={`text-xs font-medium ${
                        mastery >= 80 ? 'text-green-600' :
                        mastery >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {mastery >= 80 ? '优秀' : mastery >= 60 ? '良好' : '需加强'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 本周学习进度 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            本周学习进度
          </h3>
          <div className="flex items-end justify-between h-32 px-4">
            {progressData.weeklyProgress.map((day, index) => {
              const maxCompleted = Math.max(...progressData.weeklyProgress.map(d => d.completed));
              const heightPercentage = (day.completed / maxCompleted) * 100;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(day.date).toLocaleDateString('zh-CN', { weekday: 'short' })}
                  </div>
                  <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '100px' }}>
                    <div
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg absolute bottom-0 transition-all duration-500"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-700 mt-2 font-medium">
                    {day.completed}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    {day.mastered > 0 && `+${day.mastered}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 学习建议 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            个性化学习建议
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generateRecommendations(progressData).map((recommendation, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-1">💡</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{recommendation.title}</h4>
                    <p className="text-sm text-gray-600">{recommendation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 成就徽章 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            学习成就
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {generateAchievements(progressData).map((achievement, index) => (
              <div key={index} className={`text-center p-4 rounded-lg ${
                achievement.earned ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 opacity-50'
              }`}>
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                <div className="text-xs text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 辅助函数
const generateRecommendations = (data: ProgressData) => {
  const recommendations = [];

  if (data.averageQualityScore < 3.5) {
    recommendations.push({
      title: "提升学习质量",
      description: "建议在学习时更仔细地理解每个短语的使用场景，尝试在实际情境中练习。"
    });
  }

  if (data.masteredCards / data.totalCards < 0.3) {
    recommendations.push({
      title: "增加复习频率",
      description: "建议每天安排固定时间进行复习，利用间隔重复算法提高记忆效果。"
    });
  }

  const writingPerformance = data.performanceByType.find(t => t.type === '写作');
  if (writingPerformance && writingPerformance.averageScore < 3.0) {
    recommendations.push({
      title: "加强写作练习",
      description: "写作是你的薄弱环节，建议增加写作卡片的练习频率。"
    });
  }

  if (data.studyStreak < 3) {
    recommendations.push({
      title: "保持学习连贯性",
      description: "建议制定固定的学习计划，保持每天学习的习惯。"
    });
  }

  return recommendations;
};

const generateAchievements = (data: ProgressData) => {
  return [
    {
      icon: "🎯",
      title: "初学者",
      description: "完成第一次学习",
      earned: data.totalReviews > 0
    },
    {
      icon: "🔥",
      title: "连续7天",
      description: "连续学习7天",
      earned: data.studyStreak >= 7
    },
    {
      icon: "📚",
      title: "知识收集者",
      description: "学习50张卡片",
      earned: data.totalCards >= 50
    },
    {
      icon: "💎",
      title: "CELPIP达人",
      description: "掌握30张卡片",
      earned: data.masteredCards >= 30
    },
    {
      icon: "⭐",
      title: "高分学习者",
      description: "平均质量分4.5以上",
      earned: data.averageQualityScore >= 4.5
    },
    {
      icon: "🚀",
      title: "学习狂人",
      description: "总复习100次",
      earned: data.totalReviews >= 100
    }
  ];
};