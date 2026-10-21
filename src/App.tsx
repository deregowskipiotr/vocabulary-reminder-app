import React, { useEffect, /*useRef */ } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { useVocabularyDashboard } from '@/hooks/useVocabularyDashboard';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { WordCard } from '@/components/dashboard/WordCard';
import { WordNavigation } from '@/components/dashboard/WordNavigation';
import { WordQuickList } from '@/components/dashboard/WordQuickList';
import { WordStats } from '@/components/dashboard/WordStats';
import { smoothScrollToTop } from '@/utils/scrollUtils';

export const App: React.FC = () => {
  const {
    allEntries,
    filteredEntries,
    currentWord,
    currentIndex,
    totalFiltered,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    isPolishRevealed,
    togglePolish,
    nextWord,
    prevWord,
    randomWord,
    selectWordById,
    resetToFirstWord,
    levelStats,
  } = useVocabularyDashboard();

  const { speak, isSpeaking } = useSpeech();
  //const isFirstRender = useRef(true);

  // Smooth scroll to top position on word navigation
  {/*useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    smoothScrollToTop();
  }, [currentIndex]); */}

  // Keyboard accessibility: Left/Right arrows for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting when user is typing in the search input
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        nextWord();
      } else if (e.key === 'ArrowLeft') {
        prevWord();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextWord, prevWord]);

  const handleSelectWord = (id: string) => {
    selectWordById(id);
    smoothScrollToTop();
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between px-3 py-4 sm:px-6 sm:py-6 md:px-12 md:py-10 selection:bg-decor/30 selection:text-white">
      {/* Dynamic Floating Luminous Accents */}
      <div className="ambient-orb-top" aria-hidden="true" />
      <div className="ambient-orb-cyan" aria-hidden="true" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 flex-1 flex flex-col">
        {/* Top Header */}
        <DashboardHeader
          totalWords={allEntries.length}
          filteredCount={totalFiltered}
        />

        {/* Dashboard Responsive Grid: Mobile First */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Main Word Centerpiece (Column 1) */}
          <div className="w-full lg:col-span-7 xl:col-span-8 flex flex-col gap-5 sm:gap-6">
            {currentWord ? (
              <>
                <WordCard
                  word={currentWord}
                  currentIndex={currentIndex}
                  totalCount={totalFiltered}
                  isPolishRevealed={isPolishRevealed}
                  onTogglePolish={() => togglePolish(currentWord.id)}
                  onSpeak={speak}
                  isSpeaking={isSpeaking}
                />

                <WordNavigation
                  currentIndex={currentIndex}
                  totalCount={totalFiltered}
                  onNext={nextWord}
                  onPrev={prevWord}
                  onRandom={randomWord}
                  onReset={resetToFirstWord}
                />
              </>
            ) : (
              <div className="w-full glass-panel p-8 sm:p-12 text-center rounded-md border border-white/10">
                <p className="text-base sm:text-lg text-text">No words match your current search.</p>
                <p className="text-xs sm:text-sm text-text-muted mt-2">
                  Try clearing the search query or selecting "All Levels".
                </p>
              </div>
            )}
          </div>

          {/* Deck Explorer & Quick Filter Sidebar (Column 2) */}
          <div className="w-full lg:col-span-5 xl:col-span-4">
            <WordQuickList
              entries={filteredEntries}
              activeId={currentWord?.id}
              onSelectWord={handleSelectWord}
              selectedLevel={selectedLevel}
              onSelectLevel={setSelectedLevel}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              levelStats={levelStats}
            />
          </div>
        </main>

        {/* Dashboard Overview Metrics */}
        <WordStats entries={allEntries} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-text-dim pt-6 sm:pt-8 mt-8 sm:mt-12 border-t border-white/10 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-md bg-moonlight-cyan shadow-[0_0_8px_#38bdf8]" />
          <span>Obsidian Midnight Engine: Sapphire • Velvet Violet • Blue Glow</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <span>Use &larr; &rarr; arrow keys</span>
          <span>&bull;</span>
          <span>Figma-Grade Polish</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
