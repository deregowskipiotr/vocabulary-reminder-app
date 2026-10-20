
import { z } from "zod";
import rawVocabulary from "./vocabulary.json";

const vocabularyEntrySchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  partOfSpeech: z.array(z.string()).min(1),
  level: z.enum(["B1", "B2", "C1", "C2", "unknown"]),
  definition: z.string().min(1),
  polishMeaning: z.array(z.string()).min(1),
  examples: z.array(z.string()),
  collocations: z.array(z.string()),
  usageNote: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
});

const vocabularySchema = z
  .array(vocabularyEntrySchema)
  .superRefine((entries, ctx) => {
    const ids = new Set<string>();

    entries.forEach((entry, index) => {
      if (ids.has(entry.id)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "id"],
          message: `Duplicate vocabulary ID: ${entry.id}`,
        });
      }

      ids.add(entry.id);
    });
  });

const result = vocabularySchema.safeParse(rawVocabulary);

if (!result.success) {
  console.error("Invalid vocabulary data:", result.error.issues);
  throw new Error("Vocabulary data validation failed.");
}

export const vocabulary = result.data;
export type VocabularyEntry = (typeof vocabulary)[number];
