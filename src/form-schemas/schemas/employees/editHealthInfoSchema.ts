import { z } from 'zod';

import { booleanRules, textRules } from '@/form-schemas/rules/rules';

export const editHealthInfoSchema = z.object({
  insuranceName: textRules(false, 'Nombre de la aseguradora'),
  affiliateNumber: textRules(false, 'Número de afiliado'),
  preoccupationalCheckupFit: z.union([textRules(false), booleanRules(false)]),
  preoccupationalCheckupObs: textRules(
    false,
    'Observaciones de preocupacionales'
  ),
});

export type EditHealthInfoSchema = z.infer<typeof editHealthInfoSchema>;
