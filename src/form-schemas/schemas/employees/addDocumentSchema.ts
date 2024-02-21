import { z } from 'zod';

import { fileNameRules, typeRules } from '@/form-schemas/rules/rules';

export const addDocumentSchema = z.object({
  name: fileNameRules(true),
  folder: typeRules(true, 'Carpeta'),
  file: z.instanceof(File, {
    message: 'El archivo es requerido',
  }),
});

export type AddDocumentSchema = z.infer<typeof addDocumentSchema>;
