import { z } from 'zod';

import {
  dateRules,
  fromDateBeforeToDate,
  textRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const addNewLicenseSchema = z
  .object({
    fromDate: dateRules(true),
    toDate: dateRules(true),
    type: typeRules(true, 'tipo de licencia'),
    observations: textRules(false),
  })
  .refine(fromDateBeforeToDate, fromDateBeforeToDate.msg);

export type AddNewLicenseSchema = z.infer<typeof addNewLicenseSchema>;
