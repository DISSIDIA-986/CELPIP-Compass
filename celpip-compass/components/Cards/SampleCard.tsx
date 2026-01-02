'use client';

import React, { useState } from 'react';
import { Flashcard, CardType, CardStatus } from '@/types/flashcards';

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
  const [isExpanded, setIsExpanded] = useState(false);
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

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'clb7':
        return 'CLB 7';
      case 'clb8':
        return 'CLB 8';
      case 'clb9':
        return 'CLB 9';
      default:
        return difficulty;
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
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'formal':
        return 'bg-purple-50 text-purple-700';
      case 'semi-formal':
        return 'bg-blue-50 text-blue-700';
      case 'informal':
        return 'bg-green-50 text-green-700';
      case 'neutral':
        return 'bg-gray-50 text-gray-700';
      default:
        return 'bg-gray-50 text-gray-700';
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
          <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getStatusColor(card.status)}`}>
            {card.status === CardStatus.NEW && '新卡片'}
            {card.status === CardStatus.LEARNING && '学习中'}
            {card.status === CardStatus.REVIEW && '复习中'}
            {card.status === CardStatus.MASTERED && '已掌握'}
            {card.status === CardStatus.NEW ? '新卡片' : card.status === CardStatus.LEARNING ? '学习中' : card.status === CardStatus.REVIEW ? '复习中' : card.status === CardStatus.MASTERED ? '已掌握' : ''}
          </span>
        </div>
        <div className="flex flex-col gap-1 ml-2">
          <span className="text-xs text-gray-500">
            {getDifficultyLabel(card.difficulty)}
          </span>
        </div>
      </div>


      {/* 核心短语 - 显示部分内容 */}
      {card.practice && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-2">核心短语：</div>
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              {card.practice.question}
            </p>
          </div>
        </div>
      )}

      {/* 学习统计 */}
      {card.reviewCount > 0 && (
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
          <span>复习 {card.reviewCount} 次</span>
          <span>正确率 {Math.round((card.correctCount / card.reviewCount) * 100)}%</span>
          {card.averageQualityScore > 0 && (
            <span>质量分 {card.averageQualityScore}</span>
          )}
        </div>
      )}

      {/* 查看详情按钮 */}
      {showDetails && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {isExpanded ? '收起详情' : '查看详情'}
        </button>
      )}

      {/* 展开的详细内容 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* 场景描述 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">场景描述</h4>
            <p className="text-sm text-gray-600">{card.scenario}</p>
          </div>

          {/* 核心短语 */}
          {card.essentialPhrases && Object.keys(card.essentialPhrases).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">核心短语</h4>
              <div className="space-y-2">
                {Object.entries(card.essentialPhrases).map(([key, phrases]) => (
                  <div key={key} className="bg-gray-50 p-2 rounded">
                    <span className="text-xs font-medium text-gray-500 uppercase">{key}</span>
                    <ul className="mt-1 space-y-1">
                      {(phrases as string[]).slice(0, 3).map((phrase, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {phrase}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 词汇升级 */}
          {card.upgrades?.vocabulary && Object.keys(card.upgrades.vocabulary).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">词汇升级</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(card.upgrades.vocabulary).slice(0, 4).map(([basic, advanced]) => (
                  <div key={basic} className="bg-blue-50 px-2 py-1 rounded text-xs">
                    <span className="text-gray-500">{basic}</span>
                    <span className="text-gray-400 mx-1">→</span>
                    <span className="text-blue-600">{(advanced as string[])[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 练习要点 */}
          {card.practice?.keyPoints && card.practice.keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">练习要点</h4>
              <ul className="space-y-1">
                {card.practice.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 卡片类型标签 */}
      <div className="mt-3">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
          {getCardTypeLabel(card.type)}
        </span>
      </div>
    </div>
  );
};
