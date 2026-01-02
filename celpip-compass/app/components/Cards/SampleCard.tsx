'use client';

import React from 'react';
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
  const getCardTypeLabel = (type: CardType) => {
    switch (type) {
      case CardType.WRITING:
        return '写作';
      case CardType.LISTENING:
        return '听力';
      case CardType.SPEAKING:
        return '口语';
      case CardType.READING:
        return '阅读';
      case CardType.GRAMMAR:
        return '语法';
      case CardType.VOCABULARY:
        return '词汇';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 p-4 cursor-pointer">
      <h3 className="font-semibold text-lg text-gray-900 mb-1">
        {card.question}
      </h3>
      <p className="text-sm text-gray-700">
        {card.answer}
      </p>
      <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 mt-2">
        {getCardTypeLabel(card.type)}
      </span>
    </div>
  );
};