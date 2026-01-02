'use client';

import React from 'react';
import { Flashcard, CardType, CardStatus, DifficultyLevel } from '@/types/flashcards';

interface SampleCardProps {
  card: Flashcard;
  onClick?: () => void;
  showDetails?: boolean;
}

export const SampleCard: React.FC<SampleCardProps> = ({
  card,
  onClick,
  showDetails = false
}) => {
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

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.CLB7:
        return 'CLB 7';
      case DifficultyLevel.CLB8:
        return 'CLB 8';
      case DifficultyLevel.CLB9:
        return 'CLB 9';
      default:
        return difficulty;
    }
  };

  const getStatusLabel = (status: CardStatus) => {
    switch (status) {
      case CardStatus.NEW:
        return '新卡片';
      case CardStatus.LEARNING:
        return '学习中';
      case CardStatus.REVIEW:
        return '复习中';
      case CardStatus.MASTERED:
        return '已掌握';
      case CardStatus.ARCHIVED:
        return '已归档';
      default:
        return status;
    }
  };

  const getStatusColor = (status: CardStatus) => {
    switch (status) {
      case CardStatus.NEW:
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case CardStatus.LEARNING:
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case CardStatus.REVIEW:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case CardStatus.MASTERED:
        return 'bg-green-100 text-green-700 border-green-300';
      case CardStatus.ARCHIVED:
        return 'bg-gray-200 text-gray-500 border-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
        onClick ? 'hover:border-blue-500' : ''
      }`}
      onClick={onClick}
    >
      {/* 卡片头部 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {card.scenario}
          </p>
          <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getStatusColor(card.status)}`}>
            {getStatusLabel(card.status)}
          </span>
        </div>
        <div className="flex flex-col gap-1 ml-2">
          <span className="text-xs text-gray-500">
            {getDifficultyLabel(card.difficulty)}
          </span>
        </div>
      </div>

      {/* 核心短语 */}
      {card.practice && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-2">练习题目：</div>
          <p className="text-sm text-gray-700">
            {card.practice.question}
          </p>
        </div>
      )}

      {/* 学习统计 */}
      {card.reviewCount > 0 && (
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
          <span>复习 {card.reviewCount} 次</span>
          <span>正确率 {Math.round((card.correctCount / card.reviewCount) * 100)}%</span>
          {card.averageQualityScore > 0 && (
            <span>质量分 {card.averageQualityScore.toFixed(1)}</span>
          )}
        </div>
      )}

      {/* 查看详情按钮 */}
      {showDetails && (
        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          查看详情
        </button>
      )}

      {/* 卡片类型标签 */}
      <div className="mt-3">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
          {getCardTypeLabel(card.type)}
        </span>
        {card.tone && (
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 ml-2">
            {card.tone}
          </span>
        )}
      </div>
    </div>
  );
};
