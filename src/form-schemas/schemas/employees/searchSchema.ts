import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().trim().min(2, {
    message: 'La búsqueda debe tener al menos 2 caracteres',
  }),
});

export type SearchSchema = z.infer<typeof searchSchema>;
