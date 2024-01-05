import { z } from 'zod';

import {
  fromHourBeforeToHour,
  hourRules,
  multipleValuesRules,
  nameRules,
  textRules,
} from '@/form-schemas/rules/rules';

export const typeSchema = z
  .object({
    title: nameRules(true),
    description: textRules(true),
    startHour: hourRules(true),
    endHour: hourRules(true),
    allowedRoles: multipleValuesRules(true),
  })
  .refine(fromHourBeforeToHour, fromHourBeforeToHour.msg);

export type TypeSchema = z.infer<typeof typeSchema>;
