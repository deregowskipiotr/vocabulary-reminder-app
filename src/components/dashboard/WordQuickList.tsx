import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { VocabularyEntry } from '@/data/vocabulary.types';

interface WordQuickListProps {
  entries: VocabularyEntry[];
  activeId: string | undefined;
  onSelectWord: (id: string) => void;
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  levelStats: Record<string, number>;
}

const levels: Array<{ key: string; label: string }> = [
  { key: 'all', label: 'All Levels' },
  { key: 'C2', label: 'C2' },
  { key: 'C1', label: 'C1' },
  { key: 'B2', label: 'B2' },
  { key: 'B1', label: 'B1' },
  { key: 'unknown', label: 'Unranked' },
];

export const WordQuickList: React.FC<WordQuickListProps> = ({
  entries,
  activeId,
  onSelectWord,
  selectedLevel,
  onSelectLevel,
  searchQuery,
  onSearchChange,
  levelStats,
}) => {
  return (
    <aside className="w-full glass-panel p-3.5 sm:p-6 border border-decor/20 rounded-md flex flex-col gap-3.5 sm:gap-4">
      {/* Header & Filter Controls */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-decor-soft" />
          <h3 className="text-sm font-semibold text-white">Deck Explorer</h3>
        </div>
        <span className="text-xs text-text-muted font-sans">
          {entries.length} items
        </span>
      </div>

      {/* Search Input (1px border, rounded-md, normal tracking) */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search word, meaning, collocations..."
          className="w-full pl-9 pr-3 py-2 text-sm text-text bg-main/80 border border-white/10 rounded-md placeholder:text-text-dim focus:outline-none focus:border-decor transition-colors duration-500 ease-in-out"
        />
      </div>

      {/* Level Filters Pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {levels.map((lvl) => {
          const count = levelStats[lvl.key] || 0;
          if (lvl.key !== 'all' && count === 0) return null;

          const isActive = selectedLevel === lvl.key;

          return (
            <button
              key={lvl.key}
              onClick={() => onSelectLevel(lvl.key)}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors duration-500 ease-in-out ${
                isActive
                  ? 'bg-decor/20 border-decor text-white font-medium shadow-[0_0_12px_rgba(148,123,252,0.25)]'
                  : 'bg-white/5 border-white/10 text-text-muted hover:border-decor/40 hover:text-text hover:bg-white/10'
              }`}
            >
              {lvl.label} <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Quick Word List Items */}
      <div className="space-y-2 max-h-90 sm:max-h-110 overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="p-6 text-center text-xs text-text-muted border border-dashed border-white/10 rounded-md">
            No vocabulary matches found.
          </div>
        ) : (
          entries.map((item, index) => {
            const isSelected = item.id === activeId;

            return (
              <button
                key={item.id}
                onClick={() => onSelectWord(item.id)}
                className={`w-full text-left p-3 rounded-md border transition-colors duration-500 ease-in-out flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-decor/15 border-decor text-white shadow-[0_0_15px_rgba(148,123,252,0.2)]'
                    : 'bg-white/2 border-white/5 hover:border-decor/30 hover:bg-white/5 text-text-muted hover:text-text'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-dim font-mono">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-text'}`}>
                      {item.term}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5 pl-6">
                    {item.definition}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-decor-soft uppercase">
                    {item.level}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
