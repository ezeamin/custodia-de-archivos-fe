import { z } from 'zod';

import { fileNameRules } from '@/form-schemas/rules/rules';

export const changeDocNameSchema = z.object({
  newName: fileNameRules(true),
});

export type ChangeDocNameSchema = z.infer<typeof changeDocNameSchema>;
