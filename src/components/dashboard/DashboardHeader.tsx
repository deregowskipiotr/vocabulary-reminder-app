import React from 'react';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

interface DashboardHeaderProps {
  totalWords: number;
  filteredCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  totalWords,
  filteredCount,
}) => {
  return (
    <header className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/10">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-linear-to-br from-decor-glow to-azure-accent p-px shadow-[0_0_20px_rgba(123,90,245,0.35)] shrink-0">
          <div className="w-full h-full rounded-[5px] bg-main flex items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-decor-soft" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              Vocabulary Reminder
            </h1>
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-decor/15 text-decor-soft border border-decor/30 font-sans font-medium whitespace-nowrap">
              Read. Remember. Repeat.
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted font-sans mt-0.5 truncate">
            English Vocabulary Mastery
          </p>
        </div>
      </div>

      {/* Quick Metrics Badges */}
      <div className="flex items-center gap-2 self-stretch sm:self-auto w-full sm:w-auto">
        <div className="glass-pill flex-1 sm:flex-initial justify-center text-xs py-1.5 px-2.5">
          <BookOpen className="w-3.5 h-3.5 text-decor-soft shrink-0" />
          <span className="whitespace-nowrap">{totalWords} Terms</span>
        </div>

        <div className="glass-pill flex-1 sm:flex-initial justify-center text-xs py-1.5 px-2.5">
          <Layers className="w-3.5 h-3.5 text-moonlight-cyan shrink-0" />
          <span className="whitespace-nowrap">{filteredCount} Active</span>
        </div>
      </div>
    </header>
  );
};
