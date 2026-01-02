'use client';

import React from 'react';

interface SampleCardProps {
  question: string;
  answer: string;
}

export const MinimalSampleCard: React.FC<SampleCardProps> = ({
  question,
  answer
}) => {
  return (
    <div className="bg-white rounded-lg border-2 p-4 cursor-pointer">
      <h3 className="font-semibold text-lg text-gray-900 mb-1">
        {question}
      </h3>
      <p className="text-sm text-gray-700">
        {answer}
      </p>
    </div>
  );
};