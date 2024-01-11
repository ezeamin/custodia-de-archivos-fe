import { z } from 'zod';

import { fileNameRules } from '@/form-schemas/rules/rules';

export const addDocumentSchema = z.object({
  name: fileNameRules(true),
  file: z.instanceof(File, {
    message: 'El archivo es requerido',
  }),
});

export type AddDocumentSchema = z.infer<typeof addDocumentSchema>;
