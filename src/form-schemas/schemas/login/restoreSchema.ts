import { emailRules } from '../../rules/rules';
import { z } from 'zod';

export const restoreSchema = z.object({
  email: emailRules(true),
});

export type RestoreSchema = z.infer<typeof restoreSchema>;
