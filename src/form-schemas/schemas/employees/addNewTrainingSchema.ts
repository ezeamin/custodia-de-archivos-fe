import { z } from 'zod';

import { dateRules, textRules, typeRules } from '@/form-schemas/rules/rules';

export const addNewTrainingSchema = z.object({
  date: dateRules(true),
  reason: textRules(true),
  type: typeRules(true, 'tipo de capacitación'),
  observations: textRules(false),
});

export type AddNewTrainingSchema = z.infer<typeof addNewTrainingSchema>;
