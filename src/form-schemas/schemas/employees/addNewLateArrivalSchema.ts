import { z } from 'zod';

import {
  dateBeforeOrToday,
  dateRules,
  hourRules,
} from '@/form-schemas/rules/rules';

export const addNewLateArrivalSchema = z
  .object({
    date: dateRules(true),
    hour: hourRules(true),
  })
  .refine(dateBeforeOrToday, dateBeforeOrToday.msg);

export type AddNewLateArrivalSchema = z.infer<typeof addNewLateArrivalSchema>;
