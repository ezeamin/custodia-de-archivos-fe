import { z } from 'zod';

export const searchDocumentSchema = z.object({
  query: z.string().trim().optional(),
});

export type SearchDocumentSchema = z.infer<typeof searchDocumentSchema>;
