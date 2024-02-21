import { z } from 'zod';

import { nameRules } from '@/form-schemas/rules/rules';

export const areasTypeSchema = z.object({
  title: nameRules(true),
});

export type AreasTypeSchema = z.infer<typeof areasTypeSchema>;
