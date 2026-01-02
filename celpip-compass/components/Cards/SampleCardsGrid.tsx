'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Flashcard, CardType, DifficultyLevel, CardStatus } from '@/types/flashcards';
import { DataService } from '@/services/data-service';
import { SampleCard } from './SampleCard';

interface SampleCardsGridProps {
  onCardSelect?: (card: Flashcard) => void;
  showFilters?: boolean;
  limit?: number;
}

export const SampleCardsGrid: React.FC<SampleCardsGridProps> = ({
  onCardSelect,
  showFilters = true,
  limit = 10
}) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allCards = DataService.getAllCards();
    setCards(allCards);
    setFilteredCards(allCards.slice(0, limit));
  }, [limit]);

  const filterCards = useCallback(() => {
    let filtered = cards;

    // 按类型过滤
    if (selectedType !== 'all') {
      filtered = filtered.filter(card => card.type === selectedType);
    }

    // 按难度过滤
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === selectedDifficulty);
    }

    // 搜索过滤
    if (searchQuery) {
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.scenario.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [cards, selectedType, selectedDifficulty, searchQuery]);

  useEffect(() => {
    setFilteredCards(filterCards().slice(0, limit));
  }, [filterCards, limit]);

  const handleCardClick = (card: Flashcard) => {
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  const getTypeCount = (type: CardType) => {
    return cards.filter(card => card.type === type).length;
  };

  const getDifficultyCount = (difficulty: DifficultyLevel) => {
    return cards.filter(card => card.difficulty === difficulty).length;
  };

  return (
    <div className="space-y-6">
      {/* 标题和统计 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          CELPIP 示例卡片
        </h2>
        <p className="text-gray-600 mb-4">
          精选的应试点句子，帮助您快速掌握CELPIP考试技巧
        </p>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {cards.length}
            </div>
            <div className="text-sm text-blue-600">总卡片数</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {cards.filter(c => c.status === CardStatus.MASTERED).length}
            </div>
            <div className="text-sm text-green-600">已掌握</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {cards.filter(c => c.status === CardStatus.LEARNING).length}
            </div>
            <div className="text-sm text-yellow-600">学习中</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {cards.filter(c => c.status === CardStatus.NEW).length}
            </div>
            <div className="text-sm text-purple-600">新卡片</div>
          </div>
        </div>
      </div>

      {/* 过滤器 */}
      {showFilters && (
        <div className="space-y-4">
          {/* 搜索框 */}
          <div>
            <input
              type="text"
              placeholder="搜索卡片标题或场景..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 过滤器选项 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 卡片类型过滤 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                卡片类型
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部 ({cards.length})
                </button>
                <button
                  onClick={() => setSelectedType(CardType.WRITING_TASK1)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === CardType.WRITING_TASK1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  邮件写作 ({getTypeCount(CardType.WRITING_TASK1)})
                </button>
                <button
                  onClick={() => setSelectedType(CardType.WRITING_TASK2)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === CardType.WRITING_TASK2
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  观点论证 ({getTypeCount(CardType.WRITING_TASK2)})
                </button>
                <button
                  onClick={() => setSelectedType(CardType.SPEAKING_TASK)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === CardType.SPEAKING_TASK
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  口语任务 ({getTypeCount(CardType.SPEAKING_TASK)})
                </button>
                <button
                  onClick={() => setSelectedType(CardType.LISTENING_KEYWORD)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === CardType.LISTENING_KEYWORD
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  听力关键词 ({getTypeCount(CardType.LISTENING_KEYWORD)})
                </button>
              </div>
            </div>

            {/* 难度过滤 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                难度等级
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDifficulty === 'all'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部 ({cards.length})
                </button>
                <button
                  onClick={() => setSelectedDifficulty(DifficultyLevel.CLB7)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDifficulty === DifficultyLevel.CLB7
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CLB 7 ({getDifficultyCount(DifficultyLevel.CLB7)})
                </button>
                <button
                  onClick={() => setSelectedDifficulty(DifficultyLevel.CLB8)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDifficulty === DifficultyLevel.CLB8
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CLB 8 ({getDifficultyCount(DifficultyLevel.CLB8)})
                </button>
                <button
                  onClick={() => setSelectedDifficulty(DifficultyLevel.CLB9)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDifficulty === DifficultyLevel.CLB9
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CLB 9 ({getDifficultyCount(DifficultyLevel.CLB9)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 卡片网格 */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            没有找到匹配的卡片
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <SampleCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      )}

      {/* 学习建议 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          学习建议
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          {DataService.getStudyRecommendations().map((recommendation, index) => (
            <li key={index}>• {recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
