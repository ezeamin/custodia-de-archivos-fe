import { z } from 'zod';

import { textRules, typeRules } from '@/form-schemas/rules/rules';

export const createSchema = z.object({
  type: typeRules(true, 'Tipo de Notificacion'),
  receivers: z.array(typeRules(true)).min(1, {
    message: 'Debe seleccionar al menos un receptor',
  }),
  message: textRules(true),
  files: z.optional(z.array(z.instanceof(File))),
});

export type CreateSchema = z.infer<typeof createSchema>;
