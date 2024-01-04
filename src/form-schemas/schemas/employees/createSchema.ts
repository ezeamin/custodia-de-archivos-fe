import { z } from 'zod';

import {
  dateRules,
  dniRules,
  emailRules,
  lastnameRules,
  nameRules,
  positionRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const createSchema = z.object({
  name: nameRules(),
  lastname: lastnameRules(),
  email: emailRules(),
  dni: dniRules(),
  gender: typeRules(true, 'género'),
  startDate: dateRules(),
  position: positionRules(),
  area: typeRules(true, 'área'),
  fileNumber: z.coerce.number().int().positive(),
  imgFile: z.instanceof(File).optional(),
});

export type CreateSchema = z.infer<typeof createSchema>;
