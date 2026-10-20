import React from 'react';
import { 
  Volume2, 
  Eye, 
  EyeOff, 
  Quote, 
  GitFork, 
  Info, 
  BookmarkCheck,
  Languages
} from 'lucide-react';
import type { VocabularyEntry } from '@/data/vocabulary.types';
import { MetallicButton } from '@/ui/MetallicButton';

interface WordCardProps {
  word: VocabularyEntry;
  currentIndex: number;
  totalCount: number;
  isPolishRevealed: boolean;
  onTogglePolish: () => void;
  onSpeak: (term: string) => void;
  isSpeaking: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  currentIndex,
  totalCount,
  isPolishRevealed,
  onTogglePolish,
  onSpeak,
  isSpeaking,
}) => {
  return (
    <article className="relative w-full glass-panel p-4 sm:p-7 md:p-10 border border-decor/20 rounded-md shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Top Metadata Row: Level Badge, Part of Speech & Word Index */}
      <div className="flex items-center justify-between gap-2.5 pb-4 sm:pb-6 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* CEFR Level Badge */}
          <span className="glass-pill px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md uppercase">
            Level {word.level}
          </span>

          {/* Part(s) of Speech */}
          {word.partOfSpeech.map((pos) => (
            <span
              key={pos}
              className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-text-muted capitalize font-sans"
            >
              {pos}
            </span>
          ))}
        </div>

        {/* Word Position Index */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted font-sans font-medium shrink-0">
          <span>Card</span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-text">
            {currentIndex + 1} / {totalCount}
          </span>
        </div>
      </div>

      {/* Hero Word Title & Pronunciation Audio Button */}
      <div className="pt-5 sm:pt-8 pb-4 sm:pb-6 flex flex-row items-center sm:items-baseline justify-between gap-3">
        <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gradient-celestial font-primary wrap-break-word">
            {word.term}
          </h2>
        </div>

        {/* Audio Sound Button */}
        <div className="shrink-0">
          <MetallicButton
            size="md"
            onClick={() => onSpeak(word.term)}
            disabled={isSpeaking}
            aria-label={`Listen to pronunciation of ${word.term}`}
            leftIcon={
              <Volume2
                className={`w-4 h-4 transition-colors duration-500 ease-in-out ${
                  isSpeaking ? 'text-moonlight-cyan animate-pulse' : 'text-decor-soft'
                }`}
              />
            }
          >
            {isSpeaking ? 'Speaking...' : 'Listen'}
          </MetallicButton>
        </div>
      </div>

      {/* 1px Divider */}
      <div className="luxury-divider my-3 sm:my-4" />

      {/* English Definition */}
      <div className="py-3 sm:py-4 space-y-1.5 sm:space-y-2">
        <h3 className="text-xs uppercase font-sans font-semibold text-text-muted flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-decor-soft" />
          English Definition
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-text font-light leading-relaxed">
          {word.definition}
        </p>
      </div>

      {/* Polish Explanation Section (Default Hidden - User Revealable with 500ms smooth animation) */}
      <div className="py-3 sm:py-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-moonlight-cyan" />
            <span className="text-sm font-medium text-text">
              Polish Meaning
            </span>
          </div>

          <MetallicButton
            size="sm"
            className="w-full sm:w-auto"
            onClick={onTogglePolish}
            aria-expanded={isPolishRevealed}
            leftIcon={
              isPolishRevealed ? (
                <EyeOff className="w-3.5 h-3.5 text-text-muted" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-decor-soft" />
              )
            }
          >
            {isPolishRevealed ? 'Hide Polish explanation' : 'Show Polish explanation'}
          </MetallicButton>
        </div>

        {/* Polish Content Container with smooth 500ms transition */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
            isPolishRevealed
              ? 'grid-rows-[1fr] opacity-100 mt-3 sm:mt-4'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-3 sm:p-4 rounded-md bg-decor/10 border border-decor/30 space-y-2">
              <span className="text-xs font-semibold text-decor-soft uppercase block">
                Polskie odpowiedniki
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {word.polishMeaning.map((meaning) => (
                  <span
                    key={meaning}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md bg-main/80 border border-decor/40 text-text"
                  >
                    <BookmarkCheck className="w-3.5 h-3.5 text-moonlight-cyan" />
                    {meaning}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples in Context */}
      {word.examples && word.examples.length > 0 && (
        <div className="py-4 sm:py-5 border-t border-white/10 space-y-2.5 sm:space-y-3">
          <h3 className="text-xs uppercase font-sans font-semibold text-text-muted flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-decor-soft" />
            Contextual Examples
          </h3>
          <div className="space-y-2">
            {word.examples.map((example, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-md bg-white/3 border border-white/10 text-xs sm:text-sm md:text-base text-text-muted italic leading-relaxed hover:border-decor/30 hover:bg-white/5 transition-colors duration-500 ease-in-out"
              >
                "{example}"
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collocations */}
      {word.collocations && word.collocations.length > 0 && (
        <div className="py-4 sm:py-5 border-t border-white/10 space-y-2">
          <h3 className="text-xs uppercase font-sans font-semibold text-text-muted flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5 text-moonlight-cyan" />
            Useful Collocations
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {word.collocations.map((collocation) => (
              <span
                key={collocation}
                className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/5 border border-white/10 text-text hover:border-decor/40 hover:bg-decor/10 hover:text-white transition-colors duration-500 ease-in-out"
              >
                {collocation}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Optional Synonyms & Usage Notes */}
      {(word.synonyms || word.usageNote) && (
        <div className="pt-4 sm:pt-5 border-t border-white/10 space-y-2.5 sm:space-y-3">
          {/* Synonyms */}
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="flex items-baseline gap-2 flex-wrap text-xs">
              <span className="font-semibold text-text-muted uppercase">Synonyms:</span>
              <div className="flex flex-wrap gap-1.5">
                {word.synonyms.map((syn) => (
                  <span
                    key={syn}
                    className="px-2 py-0.5 rounded-md bg-azure-accent/10 border border-azure-accent/25 text-[#a5b4fc]"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Usage Note */}
          {word.usageNote && (
            <div className="p-2.5 sm:p-3 rounded-md bg-white/2 border border-white/10 flex items-start gap-2 text-xs text-text-muted leading-relaxed">
              <Info className="w-3.5 h-3.5 text-decor-soft shrink-0 mt-0.5" />
              <span>{word.usageNote}</span>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
