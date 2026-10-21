import React from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';
import { MetallicButton } from '@/ui/MetallicButton';


interface WordNavigationProps {
  currentIndex: number;
  totalCount: number;
  onNext: () => void;
  onPrev: () => void;
  onRandom: () => void;
  onReset: () => void;
}

export const WordNavigation: React.FC<WordNavigationProps> = ({
  currentIndex,
  totalCount,
  onNext,
  onPrev,
  onRandom,
  onReset,
}) => {
  const progressPercent = totalCount > 0 ? ((currentIndex + 1) / totalCount) * 100 : 0;

  const handleAction = (action: () => void) => {
    action();
  };

  return (
    <div className="w-full space-y-4">
      {/* 1px Progress Bar */}
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between text-xs text-text-muted font-sans">
          <span>Card Progression</span>
          <span>
            {currentIndex + 1} of {totalCount}
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-md overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-decor to-azure-accent transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Responsive Button Controls: 2x2 on Mobile, 4 in a row on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
        <MetallicButton
          size="md"
          className="w-full"
          onClick={() => handleAction(onPrev)}
          disabled={totalCount <= 1}
          leftIcon={<ChevronLeft className="w-4 h-4 text-decor-soft" />}
        >
          Prev Word
        </MetallicButton>

        <MetallicButton
          size="md"
          className="w-full"
          onClick={() => handleAction(onNext)}
          disabled={totalCount <= 1}
          rightIcon={<ChevronRight className="w-4 h-4 text-decor-soft" />}
        >
          Next Word
        </MetallicButton>

        <MetallicButton
          size="md"
          className="w-full"
          onClick={() => handleAction(onRandom)}
          disabled={totalCount <= 1}
          leftIcon={<Shuffle className="w-4 h-4 text-moonlight-cyan" />}
        >
          Random Word
        </MetallicButton>

        <MetallicButton
          size="md"
          className="w-full"
          onClick={() => handleAction(onReset)}
          title="Return to initial default word"
          leftIcon={<RotateCcw className="w-4 h-4 text-decor-soft" />}
        >
          First Word
        </MetallicButton>
      </div>
    </div>
  );
};
