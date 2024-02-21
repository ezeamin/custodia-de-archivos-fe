import { z } from 'zod';

import { nameRules } from '@/form-schemas/rules/rules';

export const addFolderSchema = z.object({
  name: nameRules(true),
  color: z.string().optional(),
});

export type AddFolderSchema = z.infer<typeof addFolderSchema>;
