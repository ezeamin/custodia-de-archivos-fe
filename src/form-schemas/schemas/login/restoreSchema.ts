import { z } from 'zod';

import { emailRules } from '../../rules/rules';

export const restoreSchema = z.object({
  email: emailRules(true),
});

export type RestoreSchema = z.infer<typeof restoreSchema>;
