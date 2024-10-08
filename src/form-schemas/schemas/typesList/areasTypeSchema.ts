import { z } from 'zod';

import { emailRules, nameRules } from '@/form-schemas/rules/rules';

export const areasTypeSchema = z.object({
  title: nameRules(true, 75),
  responsibleEmail: emailRules(true),
});

export type AreasTypeSchema = z.infer<typeof areasTypeSchema>;
