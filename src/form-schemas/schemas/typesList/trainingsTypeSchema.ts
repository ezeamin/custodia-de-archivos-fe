import { z } from 'zod';

import { nameRules, textRules } from '@/form-schemas/rules/rules';

export const trainingTypeSchema = z.object({
  title: nameRules(true),
  description: textRules(true),
});

export type TrainingTypeSchema = z.infer<typeof trainingTypeSchema>;
