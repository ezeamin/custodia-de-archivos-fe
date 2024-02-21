import { z } from 'zod';

import { nameRules, textRules } from '@/form-schemas/rules/rules';

export const trainingsTypeSchema = z.object({
  title: nameRules(true),
  description: textRules(true),
});

export type TrainingsTypeSchema = z.infer<typeof trainingsTypeSchema>;
