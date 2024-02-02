import { z } from 'zod';

import {
  fromHourBeforeToHour,
  hourRules,
  multipleValuesRules,
  nameRules,
  textRules,
} from '@/form-schemas/rules/rules';

export const notificationTypeSchema = z
  .object({
    title: nameRules(true),
    description: textRules(true),
    startHour: hourRules(true),
    endHour: hourRules(true),
    allowedRoles: multipleValuesRules(true, 'Rol habilitado'),
  })
  .refine(fromHourBeforeToHour, fromHourBeforeToHour.msg);

export type NotificationTypeSchema = z.infer<typeof notificationTypeSchema>;
