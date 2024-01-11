import { z } from 'zod';

import {
  dateBeforeOrToday,
  dateRules,
  textRules,
} from '@/form-schemas/rules/rules';

export const addNewFormalWarningSchema = z
  .object({
    date: dateRules(true),
    reason: textRules(true),
  })
  .refine(dateBeforeOrToday, dateBeforeOrToday.msg);

export type AddNewFormalWarningSchema = z.infer<
  typeof addNewFormalWarningSchema
>;
