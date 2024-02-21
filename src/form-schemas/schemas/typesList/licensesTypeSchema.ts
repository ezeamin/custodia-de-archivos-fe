import { z } from 'zod';

import { nameRules, textRules } from '@/form-schemas/rules/rules';

export const licensesTypeSchema = z.object({
  title: nameRules(true),
  description: textRules(true),
});

export type LicensesTypeSchema = z.infer<typeof licensesTypeSchema>;
