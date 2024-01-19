import { z } from 'zod';

import { dniRules, passwordRules } from '@/form-schemas/rules/rules';

export const createReadOnlySchema = z.object({
  username: dniRules(true),
  password: passwordRules(true),
});

export type CreateReadOnlySchema = z.infer<typeof createReadOnlySchema>;
