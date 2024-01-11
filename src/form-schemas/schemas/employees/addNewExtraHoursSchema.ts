import { z } from 'zod';

import {
  dateBeforeOrToday,
  dateRules,
  textRules,
} from '@/form-schemas/rules/rules';

export const addNewExtraHoursSchema = z
  .object({
    date: dateRules(true),
    hours: z.coerce
      .number()
      .positive({
        message: 'Debe ingresar un número positivo',
      })
      .int({
        message: 'Debe ingresar un número entero positivo',
      }),
    observations: textRules(false),
  })
  .refine(dateBeforeOrToday, dateBeforeOrToday.msg);

export type AddNewExtraHoursSchema = z.infer<typeof addNewExtraHoursSchema>;
