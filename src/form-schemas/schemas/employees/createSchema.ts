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
  name: nameRules(true),
  lastname: lastnameRules(true),
  email: emailRules(true),
  dni: dniRules(true),
  gender: typeRules(true, 'género'),
  startDate: dateRules(true),
  position: positionRules(true),
  area: typeRules(true, 'área'),
  fileNumber: z.coerce.number().int().positive(),
  imgFile: z.instanceof(File),
});

export type CreateSchema = z.infer<typeof createSchema>;
