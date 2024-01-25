import { z } from 'zod';

import {
  dniRules,
  emailRules,
  lastnameRules,
  nameRules,
  textRules,
} from '@/form-schemas/rules/rules';

export const createReadOnlySchema = z.object({
  name: nameRules(true),
  lastname: lastnameRules(true),
  email: emailRules(true),
  dni: dniRules(true),
  description: textRules(true, 'descripción', 100),
});

export type CreateReadOnlySchema = z.infer<typeof createReadOnlySchema>;
