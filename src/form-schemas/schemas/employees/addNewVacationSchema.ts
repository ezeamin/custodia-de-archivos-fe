import { z } from 'zod';

import {
  dateRules,
  fromDateBeforeToDate,
  textRules,
} from '@/form-schemas/rules/rules';

export const addNewVacationSchema = z
  .object({
    fromDate: dateRules(true),
    toDate: dateRules(true),
    observations: textRules(false),
  })
  .refine(fromDateBeforeToDate, fromDateBeforeToDate.msg);

export type AddNewVacationSchema = z.infer<typeof addNewVacationSchema>;
