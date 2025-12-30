'use client';

import React from 'react';
import { QualitySelectorProps } from '@/types/flashcards';

interface QualityButtonProps {
  quality: number;
  label: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
}

const QualityButton: React.FC<QualityButtonProps> = ({
  quality,
  label,
  description,
  selected = false,
  onClick
}) => {
  const getQualityColor = (q: number) => {
    if (q >= 4) return 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200';
    if (q >= 3) return 'bg-yellow-100 border-yellow-500 text-yellow-700 hover:bg-yellow-200';
    return 'bg-red-100 border-red-500 text-red-700 hover:bg-red-200';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
        selected
          ? 'ring-2 ring-blue-500 ring-offset-2 ' + getQualityColor(quality)
          : getQualityColor(quality)
      }`}
    >
      <div className="font-semibold text-lg">{label}</div>
      <div className="text-sm mt-1">{description}</div>
    </button>
  );
};

export const QualitySelector: React.FC<QualitySelectorProps> = ({
  onQualitySelect,
  disabled = false
}) => {
  const qualities = [
    {
      value: 0,
      label: '完全不会',
      description: '完全记不起来，需要重新学习'
    },
    {
      value: 1,
      label: '困难',
      description: '勉强想起，但不准确'
    },
    {
      value: 2,
      label: '一般',
      description: '记得部分内容，有错误'
    },
    {
      value: 3,
      label: '良好',
      description: '基本记得，有小错误'
    },
    {
      value: 4,
      label: '优秀',
      description: '记得很清楚，表达流畅'
    },
    {
      value: 5,
      label: '完美',
      description: '完全掌握，运用自如'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-center mb-4">
        请评估您的掌握程度
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {qualities.map((quality) => (
          <QualityButton
            key={quality.value}
            quality={quality.value}
            label={quality.label}
            description={quality.description}
            onClick={() => !disabled && onQualitySelect(quality.value)}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center mt-4">
        点击选择最符合您当前掌握程度的评分
      </div>
    </div>
  );
};