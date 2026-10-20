export type VocabularyLevel =
  | "B1"
  | "B2"
  | "C1"
  | "C2"
  | "unknown";

export interface VocabularyEntry {
  /** Stable identifier used by React and future updates. */
  id: string;
  /** The word or expression in its dictionary form. */
  term: string;
  /** One or more grammatical categories, where relevant. */
  partOfSpeech: string[];
  /** CEFR level only when it can be established reliably. */
  level: VocabularyLevel;
  /** One clear, learner-friendly English definition for the main sense. */
  definition: string;
  /** Polish equivalents for the main sense; reveal these only when needed in the UI. */
  polishMeaning: string[];
  /** Original example sentences written in English. */
  examples: string[];
  /** Natural, useful word combinations. Leave empty if not confidently established. */
  collocations: string[];
  /** Optional clarification about register, grammar, or usage. */
  usageNote?: string;
  /** Optional close synonyms; include only when they fit the same sense and context. */
  synonyms?: string[];
}
