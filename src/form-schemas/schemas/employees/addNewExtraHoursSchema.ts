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
      .number({
        invalid_type_error: `Debe ingresar Cantidad de Horas válida`,
      })
      .positive({
        message: 'Debe ingresar un número positivo en Cantidad de Horas',
      })
      .int({
        message: 'Debe ingresar un número entero positivo en Cantidad de Horas',
      }),
    observations: textRules(false),
  })
  .refine(dateBeforeOrToday, dateBeforeOrToday.msg);

export type AddNewExtraHoursSchema = z.infer<typeof addNewExtraHoursSchema>;
