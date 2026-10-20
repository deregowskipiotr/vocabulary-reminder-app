import React from 'react';
import { BookMarked, GitPullRequest, Award, Sparkles } from 'lucide-react';
import type { VocabularyEntry } from '@/data/vocabulary.types';

interface WordStatsProps {
  entries: VocabularyEntry[];
}

export const WordStats: React.FC<WordStatsProps> = ({ entries }) => {
  const totalCollocations = entries.reduce(
    (acc, curr) => acc + (curr.collocations?.length || 0),
    0
  );

  const totalExamples = entries.reduce(
    (acc, curr) => acc + (curr.examples?.length || 0),
    0
  );

  return (
    <section className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* Metric 1 */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-md border border-white/10 hover:border-decor/30 transition-colors duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase text-text-muted font-sans font-semibold truncate">
            Active Deck
          </span>
          <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-decor-soft shrink-0" />
        </div>
        <p className="text-xl sm:text-2xl font-normal font-primary text-white mt-1.5 sm:mt-2">
          {entries.length} Terms
        </p>
        <span className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 block truncate">
          Full vocabulary set
        </span>
      </div>

      {/* Metric 2 */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-md border border-white/10 hover:border-decor/30 transition-colors duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase text-text-muted font-sans font-semibold truncate">
            Collocations
          </span>
          <GitPullRequest className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-moonlight-cyan shrink-0" />
        </div>
        <p className="text-xl sm:text-2xl font-normal font-primary text-moonlight-cyan mt-1.5 sm:mt-2">
          {totalCollocations} Natural
        </p>
        <span className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 block truncate">
          Idiomatic pairings
        </span>
      </div>

      {/* Metric 3 */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-md border border-white/10 hover:border-decor/30 transition-colors duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase text-text-muted font-sans font-semibold truncate">
            Sentences
          </span>
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-decor-glow shrink-0" />
        </div>
        <p className="text-xl sm:text-2xl font-normal font-primary text-decor-soft mt-1.5 sm:mt-2">
          {totalExamples} Examples
        </p>
        <span className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 block truncate">
          Literature context
        </span>
      </div>

      {/* Metric 4 */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-md border border-white/10 hover:border-decor/30 transition-colors duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase text-text-muted font-sans font-semibold truncate">
            Display Engine
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric-blue shrink-0" />
        </div>
        <p className="text-xl sm:text-2xl font-normal font-primary text-white mt-1.5 sm:mt-2">
          Glass Obsidian
        </p>
        <span className="text-[11px] sm:text-xs text-text-muted mt-0.5 sm:mt-1 block truncate">
          Sapphire & Violet
        </span>
      </div>
    </section>
  );
};
