import { useState, useMemo, useCallback } from 'react';
import { vocabulary } from '@/data/vocabulary';
import type { VocabularyEntry } from '@/data/vocabulary.types';

export function useVocabularyDashboard() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealedPolishMap, setRevealedPolishMap] = useState<Record<string, boolean>>({});

  // Filter list based on level and search
  const filteredEntries = useMemo(() => {
    return vocabulary.filter((item) => {
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;

      if (!matchesLevel) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTerm = item.term.toLowerCase().includes(q);
      const inDefinition = item.definition.toLowerCase().includes(q);
      const inPolish = item.polishMeaning.some((p) => p.toLowerCase().includes(q));
      const inCollocations = item.collocations.some((c) => c.toLowerCase().includes(q));
      const inSynonyms = item.synonyms ? item.synonyms.some((s) => s.toLowerCase().includes(q)) : false;

      return inTerm || inDefinition || inPolish || inCollocations || inSynonyms;
    });
  }, [selectedLevel, searchQuery]);

  // Ensure current index is within bounds of filtered list
  const safeIndex = useMemo(() => {
    if (filteredEntries.length === 0) return 0;
    if (currentIndex >= filteredEntries.length) return 0;
    return currentIndex;
  }, [currentIndex, filteredEntries.length]);

  const currentWord: VocabularyEntry | undefined = filteredEntries[safeIndex];

  // Check if Polish explanation is revealed for current word
  const isPolishRevealed = Boolean(currentWord && revealedPolishMap[currentWord.id]);

  const togglePolish = useCallback((id: string) => {
    setRevealedPolishMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const hidePolish = useCallback((id: string) => {
    setRevealedPolishMap((prev) => ({
      ...prev,
      [id]: false,
    }));
  }, []);

  const nextWord = useCallback(() => {
    if (filteredEntries.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredEntries.length);
  }, [filteredEntries.length]);

  const prevWord = useCallback(() => {
    if (filteredEntries.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredEntries.length) % filteredEntries.length);
  }, [filteredEntries.length]);

  const randomWord = useCallback(() => {
    if (filteredEntries.length <= 1) return;
    let nextIdx = safeIndex;
    while (nextIdx === safeIndex && filteredEntries.length > 1) {
      nextIdx = Math.floor(Math.random() * filteredEntries.length);
    }
    setCurrentIndex(nextIdx);
  }, [filteredEntries.length, safeIndex]);

  const selectWordById = useCallback(
    (id: string) => {
      const idx = filteredEntries.findIndex((item) => item.id === id);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    },
    [filteredEntries]
  );

  const resetToFirstWord = useCallback(() => {
    setSelectedLevel('all');
    setSearchQuery('');
    setCurrentIndex(0);
  }, []);

  // Available levels with counts in full dataset
  const levelStats = useMemo(() => {
    const stats: Record<string, number> = {
      all: vocabulary.length,
      B1: 0,
      B2: 0,
      C1: 0,
      C2: 0,
      unknown: 0,
    };
    vocabulary.forEach((item) => {
      stats[item.level] = (stats[item.level] || 0) + 1;
    });
    return stats;
  }, []);

  return {
    allEntries: vocabulary,
    filteredEntries,
    currentWord,
    currentIndex: safeIndex,
    totalFiltered: filteredEntries.length,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    isPolishRevealed,
    togglePolish,
    hidePolish,
    nextWord,
    prevWord,
    randomWord,
    selectWordById,
    resetToFirstWord,
    levelStats,
  };
}
